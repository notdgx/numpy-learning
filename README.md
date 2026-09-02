# numpy-learning

A structured, in-depth technical NumPy knowledge repository and static web application maintained by **notdgx**.

---

## Overview

`numpy-learning` covers NumPy from low-level C-extensions, ndarray memory layout, striding, vectorization, and broadcasting mechanics to multi-dimensional array computing, linear algebra, and hands-on practice notebooks.

The repository is organized into three content domains and a static presentation website:

- **`notes/`**: Canonical learning notes written in Markdown with embedded reference files.
- **`practice/`**: Structured practice notebooks (`.ipynb`) and challenge exercises mirroring theory notes for bidirectional jumping.
- **`projects/`**: Hands-on numerical implementations, vectorized algorithms, and data pipelines.
- **`website/`**: Static React + Vite + TypeScript web application compiled for static hosting on Cloudflare Pages.

---

## Architecture & Core Principles

1. **Content First**: Markdown and Jupyter Notebook source files are the authoritative source of truth.
2. **Deterministic Ordering & Session Model**: Numeric ordering prefixes (`NN-`) define sequence and designate atomic learning sessions across `notes/` and `practice/`.
3. **Automated Metadata Pipeline**: `notes/notes-tracker.py` normalizes YAML frontmatter, extracts headings, connects theory and practice pairs, and generates `notes/metadata.json` and `notes/index.md`.
4. **Static Runtime**: Zero runtime backend dependencies; completely statically compilable into `website/dist/`.
5. **Interactive Jupyter Notebook Showcase**: Direct client-side rendering of `.ipynb` cells, syntax-highlighted code, cell numbers `[n]`, and formatted array execution outputs.
6. **Connected Theory & Practice**: Notes and practice items sharing the same session prefix (`NN-`) and topic structure are linked with bidirectional jump cards that persist even if files are moved into subfolders.

---

## Getting Started

### 1. Synchronize & Validate Content Metadata
From the repository root:
```bash
# Normalize note frontmatter and regenerate metadata.json + index.md
python3 notes/notes-tracker.py

# Or check content integrity
python3 notes/notes-tracker.py check
```

### 2. Run Website in Development
```bash
cd website
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Build for Production
```bash
cd website
npm run build
```
The optimized static build output will be generated in `website/dist/`.

### 4. Preview Production Build
```bash
cd website
npm run preview
```

---

## Documentation & Specifications

- **[ARCHITECTURE.md](website/ARCHITECTURE.md)**: Full technical architecture, data flow, session model (`NN-`), notebook rendering, metadata schemas, and routing invariants.
- **[AGENTS.md](website/AGENTS.md)**: Operating rules, content contracts, commit guidelines, and engineering standards for AI agents and contributors.
- **[DESIGN.md](website/DESIGN.md)**: Dark developer design system, color tokens, typography scales, component specifications, and WebGL background invariants (`vignette = 0`).

---

## License & Attribution

Crafted for high-performance developer learning by **notdgx**.  
Copyright &copy; 2026 notdgx. All rights reserved.
