#!/usr/bin/env python3
"""Deterministic metadata/index manager for the NumPy learning repository.

Usage:
    python notes/notes-tracker.py                 # check + normalize + generate
    python notes/notes-tracker.py check           # validate only
    python notes/notes-tracker.py normalize       # normalize YAML frontmatter
    python notes/notes-tracker.py generate        # generate index + metadata

This script treats active notes and practice files as source-of-truth.
It discovers notes and practice files (both flat and hierarchical topic structures),
implements the Session / "One Go" (NN- prefix) model, bidirectionally connects
theory notes and practice exercises (.ipynb / .md), and generates:
- notes/metadata.json
- notes/index.md
- practice/index.md
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from dataclasses import dataclass, asdict
from datetime import datetime
from pathlib import Path
from typing import Any, Iterable

try:
    import yaml  # PyYAML for frontmatter
except ImportError:
    yaml = None

ORDER_RE = re.compile(r"^(\d+)-(.*)$")
FRONTMATTER_RE = re.compile(r"\A\ufeff?---[ \t]*\r?\n(?P<body>.*?)(?:\r?\n)?---[ \t]*(?:\r?\n|\Z)", re.DOTALL)
HEADING_RE = re.compile(r"^(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$", re.MULTILINE)
REF_RE = re.compile(r"^(?P<order>\d+)-reference-file-(?P<index>\d+)\.py$", re.IGNORECASE)
SAFE_SLUG_RE = re.compile(r"[^a-z0-9]+")
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
TIME_RE = re.compile(r"^\d{2}:\d{2}:\d{2}(?:[+-]\d{2}:?\d{2}|Z)?$")

GENERATED_NAMES = {"index.md", "metadata.json", "notes-tracker.py", "requirements.txt"}
IGNORED_DIRS = {"archive", ".git", "__pycache__", "node_modules", ".ipynb_checkpoints", ".vite", "dist", "tmp"}


class TrackerError(Exception):
    """Expected, user-actionable tracker failure."""


@dataclass(frozen=True)
class Heading:
    id: str
    text: str
    level: int


@dataclass(frozen=True)
class ReferenceFile:
    name: str
    sourcePath: str
    order: int
    referenceIndex: int
    sha256: str
    sizeBytes: int


@dataclass
class Note:
    id: str
    title: str
    route: str
    sourcePath: str
    order: int
    date: str
    time: str
    headings: tuple[Heading, ...]
    references: tuple[ReferenceFile, ...]
    sha256: str
    sizeBytes: int
    topicTitle: str
    subtopicTitle: str
    topicSlug: str
    subtopicSlug: str
    practiceRoute: str | None = None
    practiceTitle: str | None = None
    practiceSourcePath: str | None = None
    practiceType: str | None = None


@dataclass
class PracticeItem:
    id: str
    title: str
    route: str
    sourcePath: str
    order: int
    fileType: str  # "ipynb" or "md"
    sha256: str
    sizeBytes: int
    topicTitle: str
    subtopicTitle: str
    topicSlug: str
    subtopicSlug: str
    noteRoute: str | None = None
    noteTitle: str | None = None
    noteSourcePath: str | None = None


def now_local() -> datetime:
    return datetime.now().astimezone()


def parse_order(name: str) -> tuple[int, str]:
    match = ORDER_RE.match(name)
    if not match:
        raise TrackerError(
            f"Invalid ordered name '{name}'. Expected '<NN>-<name>' (for example '00-numpy-intro-1.md')."
        )
    return int(match.group(1)), match.group(2)


def strip_order(name: str) -> str:
    match = ORDER_RE.match(name)
    return match.group(2) if match else name


def humanize(stem_or_name: str) -> str:
    text = Path(stem_or_name).stem
    text = strip_order(text)
    text = text.replace("_", " ").replace("-", " ")
    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        return "Untitled"
    # Special casing common words like numpy
    words = []
    for word in text.split():
        w_lower = word.lower()
        if w_lower == "numpy":
            words.append("NumPy")
        elif w_lower == "ipynb":
            words.append("Notebook")
        elif word.isupper():
            words.append(word)
        else:
            words.append(word[:1].upper() + word[1:])
    return " ".join(words)


def slugify(text: str) -> str:
    value = text.strip().lower().replace("_", "-")
    value = SAFE_SLUG_RE.sub("-", value).strip("-")
    return value or "untitled"


def relative_posix(path: Path, repo_root: Path) -> str:
    return path.relative_to(repo_root).as_posix()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8-sig")
    except UnicodeDecodeError as exc:
        raise TrackerError(f"Unable to decode UTF-8 Markdown file: {path}: {exc}") from exc
    except OSError as exc:
        raise TrackerError(f"Unable to read {path}: {exc}") from exc


def write_text_if_changed(path: Path, content: str) -> bool:
    current = None
    if path.exists():
        try:
            current = path.read_text(encoding="utf-8")
        except UnicodeDecodeError as exc:
            raise TrackerError(f"Generated file is not valid UTF-8: {path}: {exc}") from exc
    if current == content:
        return False
    path.write_text(content, encoding="utf-8", newline="\n")
    return True


def parse_frontmatter(text: str) -> tuple[dict[str, Any], str, bool]:
    match = FRONTMATTER_RE.match(text)
    if not match:
        return {}, text, False
    body = match.group("body")
    remainder = text[match.end():]
    if yaml is None:
        raise TrackerError(
            "PyYAML is required to parse Markdown frontmatter. Install it with: pip install pyyaml"
        )
    try:
        data = yaml.safe_load(body) or {}
    except Exception as exc:
        raise TrackerError(f"Invalid YAML frontmatter: {exc}") from exc
    if not isinstance(data, dict):
        raise TrackerError("Frontmatter must be a YAML mapping/object.")
    return data, remainder, True


def normalize_date(value: Any, default: str) -> str:
    if value is None or value == "":
        return default
    text = str(value).strip()
    if not DATE_RE.fullmatch(text):
        if hasattr(value, "isoformat"):
            text = value.isoformat()[:10]
        if not DATE_RE.fullmatch(text):
            raise TrackerError(f"Invalid frontmatter date '{value}'. Expected YYYY-MM-DD.")
    try:
        datetime.strptime(text, "%Y-%m-%d")
    except ValueError as exc:
        raise TrackerError(f"Invalid frontmatter date '{text}'.") from exc
    return text


def normalize_time(value: Any, default: str) -> str:
    if value is None or value == "":
        return default
    text = str(value).strip()
    if hasattr(value, "isoformat") and not isinstance(value, str):
        text = value.isoformat()
    text = text.replace(" ", "")
    if not TIME_RE.fullmatch(text):
        raise TrackerError(
            f"Invalid frontmatter time '{value}'. Expected HH:MM:SS, optionally with timezone offset."
        )
    if len(text) == 13 and (text[8] == "+" or text[8] == "-"):
        text = text[:11] + ":" + text[11:]
    return text


def yaml_quote_time(value: str) -> str:
    escaped = value.replace('"', '\\"')
    return f'"{escaped}"'


def canonical_frontmatter(date_value: str, time_value: str) -> str:
    return f"---\ndate: {date_value}\ntime: {yaml_quote_time(time_value)}\n---\n"


def normalize_note(path: Path) -> tuple[str, str, bool]:
    original = read_text(path)
    data, body, has_frontmatter = parse_frontmatter(original)
    current = now_local()

    date_default = current.date().isoformat()
    z = current.strftime("%z")
    if z and len(z) == 5:
        z = z[:3] + ":" + z[3:]
    time_default = current.strftime("%H:%M:%S") + z

    date_value = normalize_date(data.get("date"), date_default)
    time_value = normalize_time(data.get("time"), time_default)

    body = body.lstrip("\ufeff")
    if body and not body.startswith("\n"):
        body = "\n" + body
    if has_frontmatter:
        new_text = canonical_frontmatter(date_value, time_value) + body.lstrip("\n")
    else:
        new_text = canonical_frontmatter(date_value, time_value)
        if original:
            new_text += "\n" + original

    changed = new_text != original
    if changed:
        write_text_if_changed(path, new_text)
    return date_value, time_value, changed


def strip_inline_markup(text: str) -> str:
    value = re.sub(r"!\[([^]]*)\]\([^)]*\)", r"\1", text)
    value = re.sub(r"\[([^]]+)\]\([^)]*\)", r"\1", value)
    value = re.sub(r"[`*_~]", "", value)
    return value.strip()


def heading_ids(headings: Iterable[tuple[int, str]]) -> tuple[Heading, ...]:
    used: dict[str, int] = {}
    output: list[Heading] = []
    for level, raw in headings:
        text = strip_inline_markup(raw)
        base = slugify(text)
        count = used.get(base, 0)
        used[base] = count + 1
        identifier = base if count == 0 else f"{base}-{count + 1}"
        output.append(Heading(identifier, text, level))
    return tuple(output)


def extract_headings(text: str) -> tuple[Heading, ...]:
    _, body, _ = parse_frontmatter(text)
    candidates: list[tuple[int, str]] = []
    in_fence = False
    fence_char = ""
    for line in body.splitlines():
        stripped = line.strip()
        fence = re.match(r"^(```+|~~~+)", stripped)
        if fence:
            token = fence.group(1)
            if not in_fence:
                in_fence = True
                fence_char = token[0]
            elif token[0] == fence_char:
                in_fence = False
            continue
        if in_fence:
            continue
        match = re.match(r"^(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$", line)
        if match:
            candidates.append((len(match.group(1)), match.group(2)))
    return heading_ids(candidates)


def find_references(note_path: Path, note_order: int, repo_root: Path) -> tuple[ReferenceFile, ...]:
    found: list[ReferenceFile] = []
    candidates = []
    for path in note_path.parent.glob("*.py"):
        match = REF_RE.fullmatch(path.name)
        if not match:
            continue
        if int(match.group("order")) == note_order:
            candidates.append((path, int(match.group("index"))))
    candidates.sort(key=lambda pair: (pair[1], pair[0].name))
    seen_indices: set[int] = set()
    for path, index in candidates:
        if index in seen_indices:
            raise TrackerError(f"Duplicate reference file index {index} beside {note_path}.")
        seen_indices.add(index)
        found.append(
            ReferenceFile(
                name=path.name,
                sourcePath=relative_posix(path, repo_root),
                order=note_order,
                referenceIndex=index,
                sha256=sha256_file(path),
                sizeBytes=path.stat().st_size,
            )
        )
    return tuple(found)


def discover_note_files(notes_root: Path) -> list[Path]:
    files: list[Path] = []
    for path in notes_root.rglob("*.md"):
        relative = path.relative_to(notes_root)
        parts = relative.parts
        if any(part in IGNORED_DIRS or part.startswith(".") for part in parts):
            continue
        if path.name in GENERATED_NAMES:
            continue
        # Support depth 1 (flat notes), depth 2 (topic/note), depth 3 (topic/subtopic/note)
        if len(parts) not in (1, 2, 3):
            raise TrackerError(
                f"Invalid note depth for {path}. Expected notes/<note>.md or notes/<topic>/<subtopic>/<note>.md."
            )
        files.append(path)
    return sorted(files, key=lambda p: tuple(parse_order(part)[0] for part in p.relative_to(notes_root).parts))


def discover_practice_files(practice_root: Path) -> list[Path]:
    if not practice_root.exists():
        return []
    files: list[Path] = []
    for ext in ("*.ipynb", "*.md"):
        for path in practice_root.rglob(ext):
            relative = path.relative_to(practice_root)
            parts = relative.parts
            if any(part in IGNORED_DIRS or part.startswith(".") for part in parts):
                continue
            if path.name in GENERATED_NAMES:
                continue
            if len(parts) not in (1, 2, 3):
                raise TrackerError(
                    f"Invalid practice depth for {path}. Expected practice/<file> or practice/<topic>/<subtopic>/<file>."
                )
            files.append(path)
    return sorted(files, key=lambda p: tuple(parse_order(part)[0] for part in p.relative_to(practice_root).parts))


def make_route(path: Path, root: Path, prefix: str = "/notes/") -> str:
    rel = path.relative_to(root).with_suffix("")
    pieces = [slugify(strip_order(part)) for part in rel.parts]
    return prefix + "/".join(pieces)


def build_notes(notes_root: Path, repo_root: Path, normalize: bool) -> list[Note]:
    files = discover_note_files(notes_root)
    notes: list[Note] = []
    for path in files:
        rel_parts = path.relative_to(notes_root).parts
        order, _ = parse_order(path.name)
        if normalize:
            date_value, time_value, _ = normalize_note(path)
        else:
            text = read_text(path)
            data, _, has = parse_frontmatter(text)
            if not has:
                raise TrackerError(f"Missing YAML frontmatter: {path}. Run the tracker to normalize.")
            date_value = normalize_date(data.get("date"), "")
            time_value = normalize_time(data.get("time"), "")

        text = read_text(path)
        headings = extract_headings(text)
        references = find_references(path, order, repo_root)
        route = make_route(path, notes_root, prefix="/notes/")
        source_rel = relative_posix(path, repo_root)
        note_id = hashlib.sha256(source_rel.encode("utf-8")).hexdigest()[:16]

        if len(rel_parts) == 1:
            topic_title = "NumPy Fundamentals"
            subtopic_title = "Overview & Core Mechanics"
            topic_slug = "fundamentals"
            subtopic_slug = "overview"
        elif len(rel_parts) == 2:
            topic_title = humanize(rel_parts[0])
            subtopic_title = humanize(rel_parts[0])
            topic_slug = slugify(strip_order(rel_parts[0]))
            subtopic_slug = "general"
        else:
            topic_title = humanize(rel_parts[0])
            subtopic_title = humanize(rel_parts[1])
            topic_slug = slugify(strip_order(rel_parts[0]))
            subtopic_slug = slugify(strip_order(rel_parts[1]))

        notes.append(
            Note(
                id=note_id,
                title=humanize(path.name),
                route=route,
                sourcePath=source_rel,
                order=order,
                date=date_value,
                time=time_value,
                headings=headings,
                references=references,
                sha256=sha256_file(path),
                sizeBytes=path.stat().st_size,
                topicTitle=topic_title,
                subtopicTitle=subtopic_title,
                topicSlug=topic_slug,
                subtopicSlug=subtopic_slug,
            )
        )
    return notes


def build_practice(practice_root: Path, repo_root: Path) -> list[PracticeItem]:
    files = discover_practice_files(practice_root)
    items: list[PracticeItem] = []
    for path in files:
        rel_parts = path.relative_to(practice_root).parts
        order, _ = parse_order(path.name)
        route = make_route(path, practice_root, prefix="/practice/")
        source_rel = relative_posix(path, repo_root)
        practice_id = hashlib.sha256(source_rel.encode("utf-8")).hexdigest()[:16]
        file_type = "ipynb" if path.suffix.lower() == ".ipynb" else "md"

        if len(rel_parts) == 1:
            topic_title = "NumPy Practice"
            subtopic_title = "Hands-on Notebooks"
            topic_slug = "practice"
            subtopic_slug = "notebooks"
        elif len(rel_parts) == 2:
            topic_title = humanize(rel_parts[0])
            subtopic_title = humanize(rel_parts[0])
            topic_slug = slugify(strip_order(rel_parts[0]))
            subtopic_slug = "general"
        else:
            topic_title = humanize(rel_parts[0])
            subtopic_title = humanize(rel_parts[1])
            topic_slug = slugify(strip_order(rel_parts[0]))
            subtopic_slug = slugify(strip_order(rel_parts[1]))

        items.append(
            PracticeItem(
                id=practice_id,
                title=humanize(path.name),
                route=route,
                sourcePath=source_rel,
                order=order,
                fileType=file_type,
                sha256=sha256_file(path),
                sizeBytes=path.stat().st_size,
                topicTitle=topic_title,
                subtopicTitle=subtopic_title,
                topicSlug=topic_slug,
                subtopicSlug=subtopic_slug,
            )
        )
    return items


def link_notes_and_practice(notes: list[Note], practice: list[PracticeItem], notes_root: Path, practice_root: Path, repo_root: Path) -> None:
    """Bidirectionally link notes and practice based on the Session / One-Go (NN-) model.
    
    Resolution Strategy:
    1. Exact relative subfolder path + matching NN- order or slug.
    2. Same flat directory + matching NN- order or slug.
    3. Global fallback: matching NN- session order across repo if only one note/practice with that order exists,
       or matching normalized slug, guaranteeing links persist even when moved.
    """
    for note in notes:
        note_stem = Path(note.sourcePath).stem
        note_slug = slugify(strip_order(note_stem))
        note_subpath = Path(note.sourcePath).parent.relative_to("notes")

        # 1. Search matching relative subfolder in practice
        match: PracticeItem | None = None
        for p in practice:
            p_subpath = Path(p.sourcePath).parent.relative_to("practice")
            p_stem = Path(p.sourcePath).stem
            p_slug = slugify(strip_order(p_stem))

            if p_subpath == note_subpath:
                if p.order == note.order or p_slug == note_slug or p_slug.startswith(note_slug) or note_slug.startswith(p_slug):
                    match = p
                    break

        # 2. Global session fallback: if no match in subfolder, match across repository by session order (NN-)
        if not match:
            candidates = [p for p in practice if p.order == note.order]
            if len(candidates) == 1:
                match = candidates[0]
            elif len(candidates) > 1:
                # Disambiguate by slug similarity
                for cand in candidates:
                    c_slug = slugify(strip_order(Path(cand.sourcePath).stem))
                    if c_slug == note_slug or c_slug.startswith(note_slug) or note_slug.startswith(c_slug):
                        match = cand
                        break
                if not match:
                    match = candidates[0]

        # 3. Slug-only fallback (if NN- was reassigned but slug matches)
        if not match:
            for p in practice:
                p_slug = slugify(strip_order(Path(p.sourcePath).stem))
                if p_slug == note_slug:
                    match = p
                    break

        if match:
            note.practiceRoute = match.route
            note.practiceTitle = match.title
            note.practiceSourcePath = match.sourcePath
            note.practiceType = match.fileType

            match.noteRoute = note.route
            match.noteTitle = note.title
            match.noteSourcePath = note.sourcePath


def generate_notes_index(notes: list[Note]) -> str:
    groups: dict[str, dict[str, list[Note]]] = {}
    for note in notes:
        groups.setdefault(note.topicTitle, {}).setdefault(note.subtopicTitle, []).append(note)

    lines = ["# NumPy Learning Notes", "", ""]
    for topic_title in sorted(groups.keys()):
        lines.append(f"- {topic_title}")
        subtopics = groups[topic_title]
        for subtopic_title in sorted(subtopics.keys()):
            lines.append(f"  - {subtopic_title}")
            for note in sorted(subtopics[subtopic_title], key=lambda n: (n.order, n.sourcePath)):
                lines.append(f"    - [{note.title}]({note.route})")
    return "\n".join(lines).rstrip() + "\n"


def generate_practice_index(practice: list[PracticeItem]) -> str:
    groups: dict[str, dict[str, list[PracticeItem]]] = {}
    for p in practice:
        groups.setdefault(p.topicTitle, {}).setdefault(p.subtopicTitle, []).append(p)

    lines = ["# NumPy Practice & Notebooks", "", ""]
    for topic_title in sorted(groups.keys()):
        lines.append(f"- {topic_title}")
        subtopics = groups[topic_title]
        for subtopic_title in sorted(subtopics.keys()):
            lines.append(f"  - {subtopic_title}")
            for item in sorted(subtopics[subtopic_title], key=lambda p: (p.order, p.sourcePath)):
                lines.append(f"    - [{item.title}]({item.route}) ({item.fileType})")
    return "\n".join(lines).rstrip() + "\n"


def build_metadata(notes: list[Note], practice: list[PracticeItem], generated_at: str) -> dict[str, Any]:
    # Topic tree for notes
    topics_map: dict[str, dict[str, Any]] = {}
    for note in notes:
        t_slug = note.topicSlug
        st_slug = note.subtopicSlug
        topic = topics_map.setdefault(
            t_slug,
            {
                "id": hashlib.sha256(t_slug.encode()).hexdigest()[:16],
                "title": note.topicTitle,
                "order": note.order,
                "slug": t_slug,
                "subtopics": {},
            }
        )
        subtopics = topic["subtopics"]
        subtopic = subtopics.setdefault(
            st_slug,
            {
                "id": hashlib.sha256(f"{t_slug}/{st_slug}".encode()).hexdigest()[:16],
                "title": note.subtopicTitle,
                "order": note.order,
                "slug": st_slug,
                "notes": [],
            }
        )
        subtopic["notes"].append({
            "id": note.id,
            "title": note.title,
            "route": note.route,
            "sourcePath": note.sourcePath,
            "order": note.order,
            "date": note.date,
            "time": note.time,
            "headings": [asdict(h) for h in note.headings],
            "references": [asdict(r) for r in note.references],
            "sha256": note.sha256,
            "sizeBytes": note.sizeBytes,
            "practiceRoute": note.practiceRoute,
            "practiceTitle": note.practiceTitle,
            "practiceSourcePath": note.practiceSourcePath,
            "practiceType": note.practiceType,
        })

    topic_list = []
    for topic_key in sorted(topics_map, key=lambda x: (topics_map[x]["order"], x)):
        topic = topics_map[topic_key]
        topic["subtopics"] = [
            topic["subtopics"][key]
            for key in sorted(topic["subtopics"], key=lambda x: (topic["subtopics"][x]["order"], x))
        ]
        for subtopic in topic["subtopics"]:
            subtopic["notes"].sort(key=lambda n: (n["order"], n["sourcePath"]))
        topic_list.append(topic)

    practice_list = []
    for p in practice:
        practice_list.append({
            "id": p.id,
            "title": p.title,
            "route": p.route,
            "sourcePath": p.sourcePath,
            "order": p.order,
            "fileType": p.fileType,
            "sha256": p.sha256,
            "sizeBytes": p.sizeBytes,
            "topicTitle": p.topicTitle,
            "subtopicTitle": p.subtopicTitle,
            "topicSlug": p.topicSlug,
            "subtopicSlug": p.subtopicSlug,
            "noteRoute": p.noteRoute,
            "noteTitle": p.noteTitle,
            "noteSourcePath": p.noteSourcePath,
        })

    return {
        "schemaVersion": 1,
        "generatedAt": generated_at,
        "contentRoot": "notes",
        "sections": {
            "notes": {
                "id": "notes",
                "title": "NumPy Learning Notes",
                "topics": topic_list,
            },
            "practice": {
                "id": "practice",
                "title": "NumPy Practice & Notebooks",
                "items": practice_list,
            }
        },
        "stats": {
            "topics": len(topic_list),
            "subtopics": sum(len(t["subtopics"]) for t in topic_list),
            "notes": len(notes),
            "practiceItems": len(practice),
            "referenceFiles": sum(len(n.references) for n in notes),
        },
    }


def generate(repo_root: Path, *, normalize: bool) -> tuple[int, list[str]]:
    notes_root = repo_root / "notes"
    practice_root = repo_root / "practice"

    notes = build_notes(notes_root, repo_root, normalize=normalize)
    practice = build_practice(practice_root, repo_root)
    link_notes_and_practice(notes, practice, notes_root, practice_root, repo_root)

    generated_at = now_local().isoformat(timespec="seconds")
    notes_index = generate_notes_index(notes)
    practice_index = generate_practice_index(practice)
    metadata = build_metadata(notes, practice, generated_at)

    changes = []
    if write_text_if_changed(notes_root / "index.md", notes_index):
        changes.append("updated notes/index.md")
    if write_text_if_changed(practice_root / "index.md", practice_index):
        changes.append("updated practice/index.md")
    metadata_text = json.dumps(metadata, indent=2, ensure_ascii=False) + "\n"
    if write_text_if_changed(notes_root / "metadata.json", metadata_text):
        changes.append("updated notes/metadata.json")

    return 0, changes


def check(repo_root: Path) -> int:
    notes_root = repo_root / "notes"
    practice_root = repo_root / "practice"

    notes = build_notes(notes_root, repo_root, normalize=False)
    practice = build_practice(practice_root, repo_root)
    link_notes_and_practice(notes, practice, notes_root, practice_root, repo_root)

    expected_notes_index = generate_notes_index(notes)
    expected_practice_index = generate_practice_index(practice)
    expected_metadata = build_metadata(notes, practice, generated_at="__ignored__")

    warnings: list[str] = []
    if not (notes_root / "index.md").exists():
        warnings.append("notes/index.md is missing")
    elif read_text(notes_root / "index.md") != expected_notes_index:
        warnings.append("notes/index.md is stale")

    if not (practice_root / "index.md").exists():
        warnings.append("practice/index.md is missing")
    elif read_text(practice_root / "index.md") != expected_practice_index:
        warnings.append("practice/index.md is stale")

    metadata_path = notes_root / "metadata.json"
    if not metadata_path.exists():
        warnings.append("notes/metadata.json is missing")
    else:
        try:
            current = json.loads(metadata_path.read_text(encoding="utf-8"))
            current.pop("generatedAt", None)
            expected_copy = dict(expected_metadata)
            expected_copy.pop("generatedAt", None)
            if current != expected_copy:
                warnings.append("notes/metadata.json is stale")
        except Exception as exc:
            warnings.append(f"notes/metadata.json error: {exc}")

    if warnings:
        for w in warnings:
            print(f"WARNING: {w}", file=sys.stderr)
        return 2
    print(f"OK: {len(notes)} notes and {len(practice)} practice items validated; generated artifacts are current.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", nargs="?", choices=["check", "normalize", "generate"], default="generate")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parent.parent, help="Repository root directory")
    args = parser.parse_args()
    repo_root = args.root.resolve()

    try:
        if args.command == "check":
            return check(repo_root)
        if args.command == "normalize":
            code, changes = generate(repo_root, normalize=True)
            print("OK: normalization complete." if not changes else "OK: " + "; ".join(changes))
            return code
        code, changes = generate(repo_root, normalize=True)
        if changes:
            print("OK: " + "; ".join(changes))
        else:
            print("OK: no generated changes required.")
        return code
    except TrackerError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        print("ERROR: interrupted by user.", file=sys.stderr)
        return 130
    except OSError as exc:
        print(f"ERROR: filesystem operation failed: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
