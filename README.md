# JazzyTraining — BHS Remote Operations Training App

A self-paced training curriculum for Jazzlyn Beard to manage the business operations side of Beard's Home Services remotely.

## What This Is

A React web app with 6 training phases (18 modules) and a 10-step interactive simulation of a full job lifecycle from first call to final review.

## Phases

- **Phase 0** — Orientation (2 modules)
- **Phase 1** — The Public Face: GMB, Facebook, Website (3 modules)
- **Phase 2** — Customer Operations: lead flow, communication, estimates & scheduling (3 modules)
- **Phase 3** — The BHS App: Leads Inbox, Clock, Filing Cabinet, Expense (4 modules)
- **Phase 4** — AI & Automation: Bill, Claude (2 modules)
- **Phase 5** — The Tech Stack: GitHub, VS Code/Claude Code, Railway (3 modules)

## The Simulation

An interactive 10-step walkthrough of a real job (Terry Webb's fence install) — from Bill answering the phone to the Google review and social post. Each step has a mock UI and interactive elements.

## Tech Stack

- React 18 + Vite
- Tailwind CSS v3
- React Router v6
- localStorage for progress tracking
- Hosted on Railway

## Deployment (Railway)

1. Push to this GitHub repo
2. Connect the repo in Railway
3. Railway auto-builds on push (`npm run build`)
4. Start command: `npx serve -s dist -l $PORT` (set in `railway.json`)

## Updating Content

All training content lives in `src/data/curriculum.js`. Each module has:
- `content` — array of sections (text, tip, callout, steps, example, link)
- `checklist` — array of strings shown as interactive checkboxes

Simulation steps live in `src/data/simulation.js`.

## Filling in Placeholders

After deployment, update these in the app:
- `src/pages/Reference.jsx` — BHS App Railway URL, Facebook page URL, Brian's phone number
- `src/pages/ModuleView.jsx` → Module 3-1 link — Railway URL for BHS App

## Adding a New Module

1. Open `src/data/curriculum.js`
2. Find the target phase
3. Add a new module object to the `modules` array
4. The app auto-includes it in navigation and progress tracking
