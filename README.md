# Study Hub — Phase 1

A homework, exam, and study tracker built for a 14-year-old on a phone-friendly,
pink/white theme. Everything runs in the browser — no backend, no server costs.

**This is Phase 1.** Daily email summaries and Google Drive auto-sync are Phase 2,
built separately once this is working the way you want.

## What's included

- Weekly schedule view
- Homework tracker (add, check off, due dates)
- Exam tracker with day countdowns
- Syllabus/notes per class
- Practice mode: flashcards (manual or AI-generated from notes) — English and
  Computer Science are flagged as priority subjects
- Daily upload → auto-generated quiz from note content, with a check for which
  of today's classes are still missing an upload
- 85% mastery threshold — quizzes below that show exactly which topics to review
- Subject performance tracker with per-subject trend (improving/steady/slipping)

All data (homework, exams, notes, flashcards, quiz history) is saved in the
browser's local storage — it stays on whichever device it's used on.

## Known limitation (Phase 1)

Quiz/flashcard generation reads plain text. `.txt`/`.md` uploads are read
automatically; PDFs, PowerPoints, and photos are **not** auto-extracted yet —
paste the key text from those into the box provided instead. Automatic
extraction (PDF text layer + OCR for photos) is a good Phase 1.5 addition once
the core flow is confirmed to work well.

## 1. Get a free Gemini API key

Quiz/flashcard generation calls Google's Gemini API, which has a free tier.

1. Go to https://aistudio.google.com/apikey
2. Sign in and click "Create API key"
3. Copy the key — paste it into the app's **Settings** tab once it's running
   (it's stored only in the browser, never committed to GitHub)

## 2. Run it locally

Requires Node.js (18+) — download from https://nodejs.org if you don't have it.

```bash
cd study-hub
npm install
npm run dev
```

Open the printed localhost URL. Add the Gemini key in Settings and try it out.

## 3. Put it in your GitHub repo

```bash
# from inside the study-hub folder
git init
git add .
git commit -m "Study Hub - Phase 1"
git branch -M main
git remote add origin https://github.com/hhanng/study-hub.git
git push -u origin main
```

(Create the empty `study-hub` repo on GitHub first if it doesn't exist yet.)

## 4. Deploy to GitHub Pages

This project is already configured for Pages (see `vite.config.js`,
`base: '/study-hub/'`).

```bash
npm run deploy
```

This builds the app and pushes the `dist/` folder to a `gh-pages` branch.
Then in the repo's GitHub Settings → Pages, set the source to the `gh-pages`
branch. It'll be live at:

```
https://hhanng.github.io/study-hub/
```

If you rename the repo, update `base` in `vite.config.js` to match.

## 5. Link it from your portfolio

Add a card to the "AI Projects" section of hhanng.github.io pointing to the
live URL above, matching your existing project card styling.

## 6. Add her real schedule and subjects

Open `src/data/seedData.js` — everything marked `REPLACE ME` is placeholder.
Swap in her actual subjects, weekly schedule, homework, and exam dates.
