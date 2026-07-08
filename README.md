
# Gödöllői Szív Maraton (Gödöllő Heart Marathon)

This repository contains a static, public single-page website template for the Gödöllői Szív Maraton instant tour.

## Overview

- Single-page HTML/CSS/JavaScript site
- Leaflet map using OpenStreetMap base tiles
- Leaflet GPX plugin to load a local GPX file
- GPX download button
- Route description section with photo stops
- Completion list section prepared for geogo.hu integration

## File layout

```text
.
├── index.html
├── README.md
├── assets/
│   └── gpx/
│       └── godolloi-sziv-maraton.gpx
├── css/
│   └── styles.css
└── js/
    ├── app.js
    └── completions.js
```

## Local development

Because the GPX file is loaded from the browser, run a local web server to test the site:

```powershell
python -m http.server 8000
```

Then open:

http://localhost:8000

## TODO (planned enhancements)

- Add support for multiple routes and an in-site route selector:
  - store additional GPX files under `assets/gpx/` (e.g., `assets/gpx/new-route.gpx`)
  - provide a UI to select and load different GPX routes
  - update the GPX download button to offer the currently selected route

- Add English / Hungarian language switching (i18n):
  - extract static text to language resource files (e.g., `i18n/en.json`, `i18n/hu.json`)
  - implement a language toggle in the UI and persist the choice (localStorage)
  - load translated strings on page init and when the user switches language

Contributions and pull requests are welcome. If you need help implementing any TODO item, open an issue describing the desired change.
