# Change Log — Task Reference Catalog + Installable PWA (June 2026)

This note documents a set of changes to the JazzyTraining app so a future
developer (or AI session) can understand what was added, how, and what to
watch out for. Plain-language summary first, technical details after.

---

## Plain-language summary

Two things were added on top of the existing training course:

1. **A Task Reference catalog** — a searchable "owner's manual" of how to do
   every recurring back-office task (post a Google photo, log a payment, clock
   in, etc.). The course teaches the *why*; the reference is the *how* you
   follow each time until it becomes habit.
2. **The app is now installable on a phone** ("Add to Home Screen"), so it
   lives as an app icon instead of a buried browser bookmark.

A build-breaking bug that already existed on `main` was also fixed (see below).

---

## 1. Task Reference Catalog

### Files
| File | Role |
|------|------|
| `src/data/referenceTasks.js` | **All catalog content** — categories + tasks. This is the only file you edit to change reference content. |
| `src/pages/Reference.jsx` | The catalog **index** page (`/reference`): category-grouped task cards, live search box, plus Systems & Links, Key Contact, and Claude prompt templates. |
| `src/pages/ReferenceTask.jsx` | The **single-task** page (`/reference/:taskId`): renders one task's SOP. |
| `src/App.jsx` | Added the `/reference/:taskId` route. |

### Data model (`referenceTasks.js`)
```js
export const LINKS = { /* shared external links, e.g. bhsApp, gmb, claude */ };
export const categories = [{ id, title, icon, blurb }, ...]; // 6 categories
export const tasks = [{
  id,            // unique slug, used in the URL: /reference/<id>
  category,      // must match a categories[].id
  title, icon, summary,
  frequency,     // e.g. "Weekly", "Every job"
  why,           // why it matters (string)
  tools,         // array of LINKS entries shown as link chips
  sop,           // array of { action, detail } steps (the SOP)
  best,          // array of best-practice strings
  watch,         // (optional) array of "watch out" strings
  prompt,        // (optional) a copy-ready Claude prompt
  related,       // array of other task ids -> cross-link cards
}];
export function getTask(id) {}
export function tasksByCategory(catId) {}
```

### How to add or edit a task
1. Open `src/data/referenceTasks.js`.
2. Add an object to `tasks` (copy an existing one as a template).
3. Make sure `category` matches a `categories[].id` and every id in `related`
   exists. There are no broken-link guards at runtime — keep them consistent.
4. That's it: the index page and routing pick it up automatically.

There are currently **6 categories / 22 tasks**.

---

## 2. Installable PWA ("Add to Home Screen")

### Files
| File | Role |
|------|------|
| `index.html` | Added `<link rel="manifest">`, `theme-color`, `apple-touch-icon`, and `apple-mobile-web-app-*` meta tags. |
| `public/manifest.webmanifest` | Web app manifest (name, icons, `display: standalone`, teal theme). |
| `public/icon-192.png`, `public/icon-512.png` | PNG app icons (512 also serves as the **maskable** icon). |
| `public/apple-touch-icon.png` | 180×180 icon for iOS home screen. |
| `public/favicon.svg` | Pre-existing; still the browser-tab/SVG icon. |

### How the icons were made
Generated with Python **Pillow**: a full-bleed teal (`#0d9488`) square with
centered white "BHS" in Liberation Sans Bold. Full-bleed + centered text keeps
it safe inside Android's maskable "safe zone." To regenerate or restyle, render
new PNGs at 192/512/180 and drop them in `public/` with the same names.

### Behavior
- **Android/Chrome**: shows an "Install app" prompt; uses the manifest PNG icons.
- **iOS/Safari**: Share → "Add to Home Screen"; uses `apple-touch-icon.png`,
  opens standalone (no browser chrome) because of the `apple-mobile-web-app-capable` meta.
- There is **no service worker** — this is an installable shell, not offline-capable.
  If offline support is ever wanted, add a service worker (e.g. `vite-plugin-pwa`).

---

## 3. Build fix (important gotcha)

`src/data/curriculum.js` had several `callout` `body` strings written across
multiple lines **inside double quotes**, e.g.:
```js
body: "Line one...
                    // <-- raw line break inside a "..." string = invalid JS
Line two..."
```
JavaScript does not allow a literal newline inside a `"..."` or `'...'` string,
so **`vite build` failed** and Railway could not deploy the latest content.
Fixed by escaping the in-string newlines to `\n`. No wording changed.

**Rule for the future:** in data files, multi-line text must use either `\n`
escapes inside a normal string, or a backtick template literal. Never a raw
line break inside `"..."`.

---

## Placeholders — now filled in
These were previously `[ASK BRIAN — ...]` and are now live:
- **BHS App URL**: `https://bhsmobileapp-production.up.railway.app`
- **Facebook page**: `https://www.facebook.com/BeardsHomeServices`
- **Brian's phone**: tap-to-call on the Key Contact card
- **Google review link**: `https://g.page/r/CUrGh1kg98pPEAE/review` (used by the
  "Ask for a Google Review" task)

They live in two places: the `LINKS` object in `referenceTasks.js` and the
`systems`/Key-Contact section of `Reference.jsx`.

---

## Tech stack reminders
- **React 19 + Vite 8** (Vite 8 uses the Rolldown bundler — build errors look
  a little different from older Vite).
- **Tailwind CSS v3**. Fonts: `font-display` = Space Grotesk, `font-body` =
  Inter. Accent color is **teal** (`teal-600` / `#0d9488`).
- **React Router v7**.
- **No backend, no env vars.** Progress is stored in the browser via
  `localStorage` (keys like `jazzy_bhs_progress`, `jazzy_sim_step`), so it
  survives redeploys but is per-device/per-browser.

## Deployment
- Railway is connected to this repo and **deploys the `main` branch**.
- Build: `npm run build`. Serve: `npx serve -s dist -l $PORT` (see `railway.json`).
- Pushing to `main` triggers an automatic rebuild + deploy. Nothing else to configure.

## Gotcha for the next session: don't build on a stale base
When these changes were made, the local checkout was an **older snapshot** than
the deployed `main` (different/disconnected history). The work was deliberately
rebuilt on top of the live `main` so the newer curriculum/simulation content was
**not** overwritten. Before starting new work, always `git fetch` and base it on
the current `origin/main`.
