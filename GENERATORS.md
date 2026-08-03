# Science Revision — Generator reference

Each file: `js/generators/<name>.js`, exports `generate()`.

---

## vectors.js — Vectors

| | |
|--|--|
| **Key** | `vectors` |
| **Notes** | Sci Bk2 Statics (e.g. `#page=8`) |
| **Cases** | 4 main families (`QLimitRepeats` 4) |
| **Canvas** | Yes — space diagram, pin joint, jet climb/bank |

**Families (`TYPE` enum, `QLimitRepeats` 4):**

1. **`TYPE.SPACE`** — space diagram; question diagram + solution overlay (canvas stack).
2. **`TYPE.CLIMB`** — jet climb (weight / thrust / lift).
3. **`TYPE.BANK`** — jet bank (weight / CF / lift).
4. **`TYPE.PIN`** — pin-jointed structure (FA / FB); tall canvas so the full frame fits.

**Show me how:** each type has a paired animation (`animsolnspace`, `animsolnclimb`, `animsolnroll`, `animsolnpin`). The UI calls `window.animsel`, which routes using module flags (`space`, `jetup`, `jetroll`, `pinjt`) also published on `window`.

**Internal structure (refactored):** sectioned file (constants → shared drawing state → helpers → four question blocks → `pickVectorQuestion` / `generate` / `animsel`). Helpers include `resetTypeFlags`, `bindContexts`, `publishTypeFlags`. Drawing geometry and animation timings are intentionally unchanged — module-level state is required so timed steps reuse the last question.

**Maintain:** force arrows should be shaft + head pointing toward the force label; solution overlay must sit on the question diagram for space diagrams; pin-joint height **850px** so the solution is not clipped; do not remove `window.animsel` without rewiring the Show-me-how button.

---

## momentcofg.js — Moments & Centre of Gravity

| | |
|--|--|
| **Key** | `momentcofg` |
| **Notes** | Sci Bk2 Statics `#page=39` |
| **Cases** | 6 (`QLimitRepeats` 6) |
| **Canvas** | Yes — beam with forces / supports |

**Behaviour:** Moments about a point, reactions, C of G of simple systems. Diagram shows the beam and force arrows (line + arrow toward the label). Image assets include `cofg.png` where used.

---

## pressure.js — Pressure

| | |
|--|--|
| **Key** | `pressure` |
| **Notes** | Sci Bk2 Statics `#page=49`–60 |
| **Cases** | 14 (`QLimitRepeats` 14) |
| **Canvas** | No |

**Coverage:**

- Gas laws: Boyle, Charles, combined \(PV/T\) (with °C → K).
- Absolute / gauge pressure, manometer + barometer (case 13 uses spelling `pguage` in the original working).
- Hydrostatics \(P = \rho g h\).
- ISA table interpolation (case 14): random row/column and mid-altitude; setup must assign `isarow`, `isacol`, `alt`, `figurediff`, `unit` before the solution.

Known values and multi-part lines should use `<br>` so they stack.

---

## linmot.js — Linear Motion

| | |
|--|--|
| **Key** | `linmot` |
| **Notes** | Sci Bk3 Dynamics `#page=5` |
| **Cases** | 11 (`QLimitRepeats` 11) |
| **Canvas** | No |

**Behaviour:** \(s,u,v,a,t\) equations; braking, falling, multi-phase journeys, incline problems. Solutions list givens one-per-line then `aligned` working. Parts i / ii / iii use `aligned` with `i.\\` markers.

---

## angmot.js — Angular Motion

| | |
|--|--|
| **Key** | `angmot` |
| **Notes** | Sci Bk3 Dynamics `#page=25` |
| **Cases** | 8 (`QLimitRepeats` 8) |
| **Canvas** | No |

**Behaviour:** Centripetal force, \(\omega\), conversions between degrees, radians, revolutions, rpm. Multi-part conversion solutions must put each of a–d on its own line (`\)<br>`).

---

## machines.js — Machines

| | |
|--|--|
| **Key** | `machines` |
| **Notes** | Sci Bk3 Dynamics `#page=47` |
| **Cases** | 8 (`QLimitRepeats` 8) |
| **Canvas** | No |

**Behaviour:** MA, VR, efficiency, screw jacks / simple machines style numerical questions.

---

## energy.js — Energy & Power

| | |
|--|--|
| **Key** | `energy` |
| **Notes** | Sci Bk3 Dynamics `#page=70` |
| **Cases** | 6 (`QLimitRepeats` 6) |
| **Canvas** | No |

**Behaviour:** KE, PE, work, power; conservation-style numerical problems.

---

## friction.js — Friction

| | |
|--|--|
| **Key** | `friction` |
| **Notes** | Sci Bk3 Dynamics `#page=79` |
| **Cases** | 4 internal types |
| **Canvas** | No |

**Behaviour:** \(\mu\), limiting friction, inclined plane style questions. Ensure case selector variables (e.g. `qsel` / `sum`) are declared at module scope — missing declarations were a past source of runtime errors after the ES refactor.

---

## Canvas summary

| Topic | Role of canvas |
|-------|----------------|
| `vectors` | Space diagram + overlay; pin joint; animation frames |
| `momentcofg` | Beam / force diagram |

All others are text + MathJax only.

---

## File ↔ registry

```
vectors.js     → vectors
momentcofg.js  → momentcofg
pressure.js    → pressure
linmot.js      → linmot
angmot.js      → angmot
machines.js    → machines
energy.js      → energy
friction.js    → friction
```
