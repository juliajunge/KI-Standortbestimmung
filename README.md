# KI-Standortbestimmung

Wo steht eure Organisation beim Thema KI, und was ist euer nächster Schritt?
Eine Selbsteinschätzung in 15 Fragen für NGOs und Vereine, mit Auswertung und Vorschlägen auf Grundlage des
[KI-Reifegradmodells](https://juliajunge.github.io/handouts/ki-reifegradmodell/) und des
[Leitfadens zur KI-Einführung](https://juliajunge.github.io/handouts/leitfaden-ki-einfuehrung/).

**Online:** https://juliajunge.github.io/KI-Standortbestimmung/

## Datenschutz

Die Seite speichert nichts und schickt nichts weg: keine Cookies, kein localStorage, kein Tracking und keine externen Schriften oder Skripte.
Die Antworten liegen nur im Arbeitsspeicher des Browsers und sind weg, sobald die Seite geschlossen wird.

Einzige Ausnahme ist die Newsletter-Anmeldung am Ende der Ergebnisseite. Erst wenn jemand auf „Newsletter abonnieren“ klickt, gehen E-Mail-Adresse, Name und Organisation an Brevo. Die Antworten der Standortbestimmung gehen nicht mit. Dafür wird kein Skript von Brevo geladen. Die Formular-Adresse steht in `inhalt.js` unter `links.newsletterFormular`.

## Texte ändern

Alle Fragen, Antworten, Ergebnistexte, Vorschläge und Links stehen in **`inhalt.js`**.

1. Auf github.com die Datei `inhalt.js` öffnen und auf den Stift (Bearbeiten) klicken.
2. Nur den Text zwischen den Anführungszeichen ändern. Anführungszeichen, Kommas und Klammern müssen stehen bleiben.
3. **Commit changes** klicken. Nach 1–2 Minuten ist die Seite aktualisiert.

Häufige Änderungen:
- **Nächster Start der Lernreise:** ganz oben unter `einstellungen` → `lernreiseStart`
- **Links zu Angeboten:** unter `links`
- **Texte der Vorschläge:** unter `schritte`

Wenn Text fett sein soll, schreib `<strong>Text</strong>`. Das funktioniert in den Texten unter `spreizung`, `du` und `lernschleife`.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Seitengerüst mit Kopf und Fuß |
| `inhalt.js` | Alle Texte, Fragen und Links |
| `app.js` | Ablauf, Auswertung und Regeln, nach welchen Vorschlägen und Angeboten ausgewählt wird |
| `style.css` | Gestaltung im CD von juliajunge.de |
| `konzept.md` | Konzept mit Auswertungslogik |

Lizenz der Inhalte: CC BY-SA. Grundlage: KI-Reifegradmodell 2025, adaptiert nach T. Off/Paul Meyrat, erstellt von Julia Junge.
