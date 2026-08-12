# Interactieve Leeromgeving

Deze map bevat een webgebaseerde leeromgeving voor alle 15 labs.

## Starten

Omdat browsers standaard `fetch` naar lokale markdownbestanden blokkeren via `file://`, start je deze omgeving via een lokale webserver.

### Optie 1: Python

1. Open een terminal in de repository root.
2. Start server:

```bash
python -m http.server 5500
```

3. Open:

`http://localhost:5500/interactive-learning/`

### Optie 2: VS Code Live Server

1. Installeer de extensie "Live Server".
2. Open `interactive-learning/index.html`.
3. Start "Open with Live Server".

## Wat zit erin

- Navigatie door alle labs
- Zoekfunctie op labnaam
- Voortgangsbalk + voltooidstatus per lab
- Task-checklist op basis van `## Task ...` secties
- Notities per lab (opgeslagen in `localStorage`)
- Volgende/vorige knoppen

## Bronbestanden

De leeromgeving leest direct uit de bestaande markdown-labs in de repository root. Er is geen duplicatie van de labinhoud.
