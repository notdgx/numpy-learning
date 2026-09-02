# NumPy Learning Repository & Static Website Architecture

## 1. Purpose

This repository is the canonical source of truth for a structured NumPy-learning knowledge base and a statically compiled website that presents that knowledge base.

The architecture has two deliberately separated concerns:

1. **Learning content** lives under `notes/`, `practice/`, and `projects/`.
2. **Presentation** lives under `website/` and is compiled with **Vite + React + TypeScript** into static files for deployment on **Cloudflare Pages**.

The website is not the source of truth. It is a generated presentation layer over the repository content.

> Core rule: content must remain useful even if the `website/` directory is removed.

---

## 2. Repository Structure

```text
.
├── LICENSE
├── README.md
├── archive/
├── notes/
│   ├── index.md
│   ├── metadata.json
│   ├── notes-tracker.py
│   ├── requirements.txt
│   ├── 00-numpy-intro-1.md
│   └── ...
├── practice/
│   ├── index.md
│   ├── 00-numpy-1.ipynb
│   └── ...
├── projects/
│   └── index.md
└── website/
    ├── AGENTS.md
    ├── ARCHITECTURE.md
    ├── DESIGN.md
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── src/
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── types/
    │   │   └── content.ts
    │   ├── services/
    │   │   └── contentService.ts
    │   ├── utils/
    │   │   ├── markdown.ts
    │   │   └── ipynb.ts
    │   ├── components/
    │   │   ├── animations/
    │   │   │   ├── RibbonFieldBackground.tsx
    │   │   │   └── EmeraldHorizonBackground.tsx
    │   │   ├── layout/
    │   │   │   ├── Navbar.tsx
    │   │   │   ├── LinksDropdown.tsx
    │   │   │   └── Footer.tsx
    │   │   ├── notes/
    │   │   │   ├── TopicSidebar.tsx
    │   │   │   ├── TableOfContents.tsx
    │   │   │   ├── Breadcrumbs.tsx
    │   │   │   ├── PrevNextNav.tsx
    │   │   │   ├── ReferenceFileList.tsx
    │   │   │   ├── CodeViewerModal.tsx
    │   │   │   └── PracticeLinkCard.tsx
    │   │   ├── practice/
    │   │   │   ├── IpynbViewer.tsx
    │   │   │   └── TheoryLinkCard.tsx
    │   │   ├── donation/
    │   │   │   └── UpiModal.tsx
    │   │   └── common/
    │   │       ├── EmptyState.tsx
    │   │       └── ErrorBoundary.tsx
    │   ├── pages/
    │   │   ├── HomePage.tsx
    │   │   ├── NotesExplorerPage.tsx
    │   │   ├── NoteDetailPage.tsx
    │   │   ├── PracticePage.tsx
    │   │   ├── PracticeDetailPage.tsx
    │   │   ├── ProjectsPage.tsx
    │   │   ├── LinksPage.tsx
    │   │   ├── DonatePage.tsx
    │   │   └── NotFoundPage.tsx
    │   └── styles/
    │       ├── globals.css
    │       ├── prism-theme.css
    │       └── theme.css
    └── dist/
```

The archived material (`archive/`) is intentionally outside the active information architecture.

---

## 3. Architectural Principles

### 3.1 Content-first
Markdown and Jupyter Notebook source files are canonical learning artifacts. Website code must consume them rather than duplicate their content.

### 3.2 Deterministic Ordering & Session / "One Go" (`NN-`) Invariant
Numeric prefixes (`NN-`) encode sibling ordering and designate study sessions.

- **Session / "One Go"**: Files from different domains (e.g. `notes/` and `practice/`) sharing the same `NN-` prefix denote the same learning session or "one go" of study.
- For example, `00-numpy-intro-1.md` and `00-numpy-1.ipynb` belong to Session `00`.
- Display names automatically strip the `NN-` ordering prefix.

### 3.3 Generated artifacts are disposable
`notes/index.md`, `practice/index.md`, and `notes/metadata.json` are generated deterministically by `notes/notes-tracker.py`.

### 3.4 Static runtime
The production website requires zero server-side APIs, zero database calls, and zero runtime dependencies. It compiles into static HTML/CSS/JS in `website/dist/` ready for Cloudflare Pages.

### 3.5 One-way data flow
```text
Repository Content (notes/*.md, practice/*.ipynb)
              │
              ▼
       notes-tracker.py
              │
              ▼
   metadata.json + indices
              │
              ▼
      React components & Vite
              │
              ▼
        website/dist/
              │
              ▼
       Cloudflare Pages
```

---

## 4. Theory ↔ Practice Bidirectional Linking Contract

When a note exists in `notes/` and a corresponding practice file (`.ipynb` or `.md`) exists in `practice/`:

1. **Session Connection**:
   - If both are at the root (flat mode) with matching `NN-` prefix (e.g. `00-numpy-intro-1.md` and `00-numpy-1.ipynb`), they are connected.
   - If both are within matching subfolder hierarchies (e.g. `notes/00-Basics/00-Intro/00-note.md` and `practice/00-Basics/00-Intro/00-practice.ipynb`), they are connected.
2. **Resilience to File Movement**:
   - If a file is later moved into subdirectories, the metadata engine retains connections by searching for matching `NN-` session prefixes + normalized slugs across the repository.
3. **UI Integration**:
   - **On Note Pages (`NoteDetailPage`)**: The right-side rail renders a prominent **"Connected Practice"** card linking directly to `/practice/...`.
   - **On Practice Pages (`PracticeDetailPage`)**: The header renders a **"Connected Theory Note"** banner jumping directly back to the theory note in `/notes/...`.

---

## 5. Jupyter Notebook (`.ipynb`) Client-Side Rendering

The website natively renders interactive Jupyter Notebooks without a Python kernel runtime:
- **Markdown cells**: Parsed and rendered with heading anchors, formatting, and tables.
- **Code cells**: Syntax highlighted via Prism.js, annotated with cell execution counts `[n]`, and equipped with one-click copy buttons.
- **Output cells**: Formatted cleanly in dark terminal viewports, supporting text/plain output, array representations, stdout, and error traces.

---

## 6. Mobile Architecture & React Portals

- **Portal Isolation**: Mobile drawers (Navbar dropdown and mobile navigation) render directly to `document.body` via `createPortal` to avoid containing block clipping from backdrop filters and sticky headers.
- **Dual-mode Topic Sidebar (`TopicSidebar.tsx`)**:
  - Desktop (`>= 1024px`): Static sticky rail (280px).
  - Mobile (`< 1024px`): Off-canvas slide-out drawer with backdrop blur and body scroll locking.
- **Table of Contents Accordion**: On screens `< 1100px`, an accordion TOC is embedded directly before the note body.

---

## 7. WebGL Animation Architecture

- **Hero Ribbon Field (`RibbonFieldBackground.tsx`)**: High-performance GLSL WebGL background tuned for NumPy deep blues and cyans.
- **Footer Horizon (`EmeraldHorizonBackground.tsx`)**: Horizon shader rendered at `vignette = 0` for seamless canvas blending.
