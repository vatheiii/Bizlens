# BizLens Frontend

Plain JavaScript React app (Vite + React Router), converted from the
uploaded TypeScript template. Same 5 screens, same styling, no TypeScript,
no UI kit — just React, React Router, and one CSS file.

## Structure

```
frontend/
├── index.html
├── vite.config.js
├── src/
│   ├── main.jsx        # entry point
│   ├── App.jsx          # routes
│   ├── global.css       # all styling
│   └── pages/
│       ├── Index.jsx      # welcome / login / signup slides
│       ├── Setup.jsx       # 4-step business setup wizard
│       ├── Complete.jsx    # setup finished screen
│       ├── Dashboard.jsx   # tabbed app (home, analytics, AI, reports, profile)
│       └── NotFound.jsx    # 404
```

## Run it

```bash
npm install
npm run dev
```

Opens on http://localhost:8080.

## Connecting to your backend

`vite.config.js` has a commented-out `server.proxy` block — uncomment it
and point it at your Express API so `/api/*` calls from the client reach
your Bizlens backend during development.
