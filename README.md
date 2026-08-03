# Science Revision App

Modular ES6 revision tool for the RAF Aerospace Engineering Technician **science** course (statics and dynamics). Same application shell as the Maths and Radar revision apps: registry, generators, Test Designer, print layout, and teacher solution window.

---

## Contents

1. [Quick start](#quick-start)
2. [Features](#features)
3. [Folder structure](#folder-structure)
4. [Architecture](#architecture)
5. [Generator interface](#generator-interface)
6. [Topics](#topics)
7. [Shared utilities](#shared-utilities)
8. [Test Designer](#test-designer)
9. [Teacher solution window](#teacher-solution-window)
10. [Print layout](#print-layout)
11. [Adding a topic](#adding-a-topic)
12. [Coding conventions](#coding-conventions)
13. [Troubleshooting](#troubleshooting)

---

## Quick start

Serve over HTTP (ES modules do not load from `file://`):

```bash
cd "Sci Revision"
npx serve .
# or
python3 -m http.server 8080
```

Open the printed URL (e.g. `http://localhost:3000`).

---

## Features

| Feature | Description |
|--------|-------------|
| Topic buttons | Random question per topic |
| Worked solutions | MathJax steps; optional diagrams |
| Training notes | Links into Sci Book 2 (Statics) and Book 3 (Dynamics) PDFs |
| Formula sheet | Available from the main UI |
| Test Designer | Multi-question tests, drag-reorder, print |
| Change question | Per-slot regenerate in test mode |
| Teacher SolnWin | Type **`chpz`** for a private always-on solution window |
| Background colour | Page background selector |
| Print CSS | Hides chrome; solutions on a new page |

---

## Folder structure

```
Sci Revision/
├── index.html
├── testCreate.html
├── SolnWin.html
├── README.md
├── GENERATORS.md
├── css/main.css
├── js/
│   ├── app.js
│   ├── registry.js
│   ├── utils.js
│   └── generators/
│       ├── vectors.js
│       ├── momentcofg.js
│       ├── pressure.js
│       ├── linmot.js
│       ├── angmot.js
│       ├── machines.js
│       ├── energy.js
│       └── friction.js
├── images/          Diagrams + Sci Book PDFs
└── SciHelp/
```

---

## Architecture

```
index.html → app.js → registry.js → generators/*.js
                └────── utils.js ◄──────┘
```

Display name → registry key mapping lives in `app.js` (`topicMap`).

---

## Generator interface

```js
export function generate() {
  return {
    question: string,
    solution: string,
    notesLink: string,
    canvas?: { width, height, withSolution, draw, questionDraw? }
  };
}
```

- Named imports from `utils.js`.
- Module-level `recentIds` + `QLimitRepeats` for variety.
- Known values: one `\(...\)` per line with `<br>`.
- Multi-part (a/b/c): each part ends with `<br>` (or use `aligned` with `\\`).

---

## Topics

| Button | Key | File | Course book (typical) |
|--------|-----|------|------------------------|
| Vectors | `vectors` | `vectors.js` | Sci Bk2 Statics |
| Moments & C of G | `momentcofg` | `momentcofg.js` | Sci Bk2 Statics |
| Pressure | `pressure` | `pressure.js` | Sci Bk2 Statics |
| Linear Motion | `linmot` | `linmot.js` | Sci Bk3 Dynamics |
| Angular Motion | `angmot` | `angmot.js` | Sci Bk3 Dynamics |
| Machines | `machines` | `machines.js` | Sci Bk3 Dynamics |
| Energy & Power | `energy` | `energy.js` | Sci Bk3 Dynamics |
| Friction | `friction` | `friction.js` | Sci Bk3 Dynamics |

See [GENERATORS.md](GENERATORS.md) for case counts and canvas behaviour.

---

## Shared utilities

Core helpers match the Maths app: `rndgen`, `dp`, `thouSep`, `QLimitRepeats`, `eqnformat`, `loadImages`, `images`.

Science-specific extras may include:

- `fromsecs` — format seconds as minutes + seconds text  
- Drawing helpers used by **vectors** (arrows, space diagrams, pin joints, jet climb/bank animations)

**Vectors animations:** UI “Show me how” relies on `window.animsel` (and related flags) so original animation callbacks keep working. Prefer not to remove that bridge without rewriting the animation entry points.

---

## Test Designer

Same flow as Maths: add topics → drag order → **Create Test** → `index.html?test=1`. Change question and print rules apply.

---

## Teacher solution window

Type **`chpz`** (no field — key sequence). `SolnWin.html` shows the current solution (and diagram) as soon as each question is generated.

---

## Print layout

`@media print` in `css/main.css` hides interactive UI and starts `.solutions-section` on a new page. Canvas scales to page width.

---

## Adding a topic

1. Add `js/generators/mytopic.js` with `export function generate()`.
2. Register in `registry.js`.
3. Add button + `topicMap` entry and Test Designer label.
4. Register any new images in `utils.js` `imageSources`.

---

## Coding conventions

- ES modules only; serve over HTTP.
- Import utils by name; avoid polluting `window` except intentional animation bridges.
- Keep solution step order aligned with the Science books.
- After range changes, exercise the topic repeatedly and check the console.

---

## Troubleshooting

| Symptom | Try |
|--------|-----|
| Modules fail | Use a local server, not `file://` |
| `X is not a function` | Check imports from `utils.js` |
| Missing diagram | `loadImages` / `imageSources` / canvas return object |
| Values on one line | Add `<br>` after each known-value or part line |
| Vector animation dead | Confirm `window.animsel` wiring and canvas stack |

---

## Related apps

- **Maths Revision** — same shell; pure maths generators  
- **Radar Revision** — same shell; radar theory generators  

---

*Aligned with the modular ES refactor used across the three revision packages.*
