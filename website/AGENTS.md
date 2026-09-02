# AGENTS.md — Repository Website Engineering Rules

This file is the operating contract for AI agents working on this repository's website and its content/build integration.

The website is a **static presentation layer** over the learning repository. Agents must preserve that architecture.

---

# 1. Mission

Build and maintain a polished static learning website that presents the repository's NumPy notes, interactive practice notebooks, and projects.

The website must remain:
- static at production runtime;
- content-driven;
- deterministic;
- accessible;
- compliant with `ARCHITECTURE.md` and `DESIGN.md`;
- safe to regenerate from repository source files.

The repository content is the source of truth. The website must not become the canonical storage location for learning notes.

---

# 2. Read These Files First

Before making any meaningful change, inspect:
```text
README.md
website/ARCHITECTURE.md
website/DESIGN.md
website/AGENTS.md
```

Then inspect the active content under:
```text
notes/
practice/
projects/
```

Do not use archived material as current website content unless explicitly requested.

---

# 3. Authority Hierarchy

When instructions conflict, use this priority order:
1. Explicit user request in the current task.
2. Repository architecture in `website/ARCHITECTURE.md`.
3. Visual requirements in `website/DESIGN.md`.
4. Durable operating rules in this `AGENTS.md`.
5. Existing implementation details.

---

# 4. Session / "One Go" (NN- prefix) Contract

1. Notes and practice items that share the same `NN-` prefix denote a single study session ("one go").
2. Bidirectional linking between theory notes and practice notebooks must be preserved across repository operations.
3. If files are reorganized or moved into subfolders, connections must be verified using `notes/notes-tracker.py check`.

---

# 5. Content Is Not React Code

Do not create hardcoded React pages for individual Markdown notes or Jupyter Notebooks. All content must be rendered dynamically through `contentService.ts`, `markdown.ts`, and `ipynb.ts` from generated metadata.

---

# 6. Generated Files Are Disposable

`notes/index.md`, `practice/index.md`, and `notes/metadata.json` are generated artifacts. Do not manually edit them; update source notes or tracker logic and run `python3 notes/notes-tracker.py`.
