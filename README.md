# Science Revision App (refactored)

Modular ES6 rewrite of the Science Revision Questions app, structured to match the Maths Revision refactor.

## Structure

```
index.html              Main UI
testCreate.html         Test Designer (drag-and-drop order)
css/main.css            App + print styles
js/
  app.js                UI orchestration, single-question + test mode
  registry.js           Topic → generator registry
  utils.js              Shared helpers (rndgen, dp, canvas arrows, etc.)
  generators/
    vectors.js          Vectors (space diagram, jet climb/bank, pin joint)
    momentcofg.js       Moments & centre of gravity
    pressure.js         Pressure
    linmot.js           Linear motion
    angmot.js           Angular motion
    machines.js         Machines
    energy.js           Energy & power
    friction.js         Friction
images/                 Diagrams, notes PDFs, formula sheet
SciHelp/                User help
SolnWin.html            Optional solution window
```

## Features

- ES modules with a central registry
- Consistent `generate()` return shape: `{ question, solution, notesLink, canvas? }`
- Test Designer with drag-reorder
- Multi-question test mode with Show/Hide solution, Change question, and print layout
- Background colour selector
- Formula sheet + training notes links

## Running

Serve the folder over HTTP (modules require a server, not `file://`):

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080` (or the port you used).

## Notes

- Vector “Show me how” animations depend on legacy animation helpers; the solution diagrams are captured for display. Full step-by-step animation may need further porting of `animsoln*` functions if they are missing from the bundled vector sources.
- Open the app via a local web server so ES module imports work.
