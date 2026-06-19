# Gödöllői Szív Maraton

Statikus publikus weboldal alap a Gödöllői Szív Maraton instant túrához.

## Tartalom

- egyoldalas HTML/CSS/JavaScript oldal
- Leaflet térkép OpenStreetMap alaptérképpel
- Leaflet GPX plugin helyi GPX fájl betöltéséhez
- GPX letöltési gomb
- túraleírás szekció fotóhelyekkel
- teljesítési lista szekció geogo.hu integráció előkészítéséhez

## Fájlkiosztás

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

## Helyi futtatás

A GPX fájl böngészős betöltése miatt érdemes helyi webszerverrel futtatni:

```powershell
python -m http.server 8000
```

Ezután nyisd meg:

```text
http://localhost:8000
```

## Következő lépések

1. Cseréld le az `assets/gpx/godolloi-sziv-maraton.gpx` fájlt a végleges útvonalra.
2. A túraadatokat pontosítsd az `index.html` fő adataiban.
3. A fotóhelyeket cseréld valós képekre.
4. A `js/completions.js` fájlban a mintaadatokat váltsa fel geogo.hu iframe vagy API integráció.
