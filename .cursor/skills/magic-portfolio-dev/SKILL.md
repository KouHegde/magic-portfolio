---
name: magic-portfolio-dev
description: >-
  Develop and extend the Astra Archive magic-portfolio Vite + React SPA.
  Use when adding pages, editing content, adjusting animations, fixing styling,
  or modifying navigation in this portfolio project.
---

# Magic Portfolio Development

## Project Overview

A **Vite 5 + React 18** single-page portfolio app themed as "Astra Archive". Navigation is state-driven (no router). A 3D flip-card (`CardDeck`) renders the active page while a sidebar allows direct jumps.

## Key Files

| File | Role |
|------|------|
| `src/App.jsx` | Root layout, `activePage` state, page registry, cycle logic |
| `src/components/CardDeck.jsx` | 3D flip card: front portal, back = active page |
| `src/components/Sidebar.jsx` | Vertical nav with Lucide icons |
| `src/pages/*.jsx` | Individual page components (self-contained) |
| `src/pages/*Animation.css` | Co-located keyframe animations per page |
| `src/index.css` | Global styles, CSS custom-properties, card system |
| `index.html` | HTML shell, Google Fonts (Inter, Playfair Display) |

## Page Inventory

| Page | Interaction Metaphor | Data Source |
|------|---------------------|-------------|
| `Intro.jsx` | Scroll-lock slides, smoke transition, mind-reader modal | `introLines` array |
| `Reveal.jsx` | Stacked experience deck shuffle, spark particles | `experiences` array |
| `Projects.jsx` | Chain/padlock carousel, GitHub links | `projectsData` array |
| `Skills.jsx` | Snap-explosion flying badges, category cards | `skillCategories` array |
| `Contact.jsx` | Static email CTA (no backend) | Inline JSX |

## How to Add a New Page

1. Create `src/pages/NewPage.jsx` (and optional `NewPageAnimation.css`).
2. Register in `App.jsx` → `pages` object (key order = cycle order).
3. Add nav entry in `Sidebar.jsx` → `navItems` array with matching `id` and a Lucide icon.
4. Design a unique interaction metaphor for the page.

## Styling Guide

- **Theme**: gold-on-dark. CSS vars in `:root` of `index.css`.
- Page-specific styles go in the page's own `*Animation.css`.
- Inline `style={{ }}` for dynamic values only.
- Fonts: Inter (body), Playfair Display (headings) — loaded via `index.html`.

## Content Editing

All content lives inline in JSX arrays inside each page component. There is no external CMS or JSON data layer. To update content, edit the arrays directly (`introLines`, `experiences`, `projectsData`, `skillCategories`).

## Common Tasks

### Edit experience entries
Open `src/pages/Reveal.jsx` and modify the `experiences` array (company, title, period, bullets).

### Edit project entries
Open `src/pages/Projects.jsx` and modify the `projectsData` array (id, name, description, url).

### Edit skills
Open `src/pages/Skills.jsx` and modify the `skillCategories` array (title + skill strings).

### Adjust animations
Edit the matching `*Animation.css` file for keyframes and timing. Card flip timing lives in `CardDeck.jsx` `useEffect` delays.

## Known Issues

- `--color-background` used in `.card-back` but not defined in `:root` (may render transparent).
- `Layout` imported but unused in `Sidebar.jsx`.
- Interactive elements use `div` + `onClick` instead of semantic `<button>` / `<a>`.
- `body { overflow: hidden }` locks scroll globally.
