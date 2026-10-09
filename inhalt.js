/*
  KI-Standortbestimmung – alle Inhalte an einer Stelle.
  Texte hier ändern; app.js muss dafür nicht angefasst werden.
  Werte 1–5 entsprechen den Stufen des KI-Reifegradmodells.
*/
window.INHALT = {

  einstellungen: {
    lernreiseStart: "April 2027"
  },

  links: {
    reifegradmodell: "https://juliajunge.github.io/handouts/ki-reifegradmodell/",
    leitfaden: "https://juliajunge.github.io/handouts/leitfaden-ki-einfuehrung/",
    leitlinien: "https://www.juliajunge.de/leitlinien-ki-nutzung/",
    selbstlernkurs: "https://www.juliajunge.de/ki-selbstlernkurs2026/",
    lernreise: "https://www.juliajunge.de/ki-lernreise-klassik/",
    erstberatung: "https://meet.brevo.com/julia-junge/30-minutiges-meeting",
    newsletter: "https://juliajunge.de/newsletter",
    website: "https://juliajunge.de",
    impressum: "https://www.juliajunge.de/kontakt-und-impressum/"
  },

  teile: [
    { id: "du", titel: "Du selbst", intro: "Zum Aufwärmen: ein paar Fragen zu dir." },
    { id: "org", titel: "Eure Organisation", intro: "Jetzt geht es um eure Organisation. Antworte so, wie es heute ist – nicht, wie es sein sollte. Wenn du etwas nicht weißt, ist „Weiß ich nicht“ eine gute Antwort." },
    { id: "unterschiede", titel: "Wie unterschiedlich seid ihr?", intro: "Zum Schluss: Wie weit liegen Bereiche und Menschen bei euch auseinander?" }
  ],

  stufen: ["Initiierung", "Entwicklung", "Anwendung", "Integration", "Optimierung"],

  dimensionen: [
    { id: "technik", titel: "Technik", fragen: ["T1", "T2"], stufen: [
      "Es sind noch keine KI-Tools erlaubt oder eingerichtet.",
      "Einzelne nutzen kostenlose Tools auf eigene Faust.",
      "Es gibt empfohlene Tools, erste Lizenzen, und einzelne Tools arbeiten mit euren Daten.",
      "Ihr seid in allen Bereichen solide ausgestattet, KI ist mit euren Systemen verbunden.",
      "Ihr habt eine umfassende, flexible Ausstattung mit verlässlichem Support."
    ]},
    { id: "kompetenzen", titel: "Kompetenzen", fragen: ["K1", "K2"], stufen: [
      "Es gibt kaum Wissen und keine Lernangebote, viele sind unsicher.",
      "Es gibt erste Infoveranstaltungen, Einzelne probieren aus und erzählen davon.",
      "Interessierte werden geschult, Einzelne haben vertieftes Wissen.",
      "Regelmäßige Schulungen und Tandems – viele kennen Möglichkeiten und Grenzen.",
      "Ihr habt eigene Expertise und teilt sie auch mit anderen."
    ]},
    { id: "strategie", titel: "Strategie", fragen: ["S1", "S2"], stufen: [
      "KI ist noch kein Thema der Leitung, niemand ist zuständig.",
      "KI wird geduldet, jemand kümmert sich nebenbei.",
      "Es gibt ein klares Ja der Leitung, Zuständige und erste Ziele.",
      "KI ist Teil eurer Strategie, Zuständigkeiten sind fest verteilt.",
      "Ihr entwickelt eure KI-Nutzung in festen Schleifen weiter."
    ]},
    { id: "ethik", titel: "Ethik & Recht", fragen: ["E1", "E2"], stufen: [
      "Es gibt keine Regeln (oder ein Verbot), Fragen werden nicht besprochen.",
      "Es gibt erste Gespräche, Bedenken werden gesammelt.",
      "Es gibt schriftliche Leitlinien zu Datenschutz und Urheberrecht.",
      "Leitlinien werden aktualisiert, neue Tools geprüft, für Pannen gibt es einen klaren Ablauf.",
      "Ihr habt ein umfassendes Rahmenwerk und bringt euch in die Debatte ein."
    ]}
  ],

  fragen: [
    // ---------- Teil 1: Du selbst ----------
    { id: "P1", teil: "du", typ: "wahl", frage: "Welche Rolle hast du in deiner Organisation?", optionen: [
      { wert: "leitung", text: "Leitung, Geschäftsführung oder Vorstand" },
      { wert: "koordination", text: "Koordination oder KI-Ansprechperson" },
      { wert: "hauptamt", text: "Hauptamtliche*r Mitarbeiter*in" },
      { wert: "ehrenamt", text: "Ehrenamtliche*r" },
      { wert: "andere", text: "Etwas anderes (z. B. extern, Beratung)" }
    ]},
    { id: "P2", teil: "du", typ: "stufe", frage: "Wie oft nutzt du generative KI wie ChatGPT, Claude oder Copilot?", optionen: [
      "Noch nie",
      "Ich habe es ein paar Mal ausprobiert",
      "Ab und zu, für einzelne Aufgaben",
      "Mehrmals pro Woche",
      "Täglich, sie ist fester Teil meiner Arbeit"
    ]},
    { id: "P3", teil: "du", typ: "stufe", frage: "Wie sicher fühlst du dich im Umgang mit KI?", optionen: [
      "Sehr unsicher, ich weiß kaum, wie das funktioniert",
      "Ich komme zurecht, bin aber oft unsicher, ob ich das darf oder ob das Ergebnis stimmt",
      "Ich bekomme meist gute Ergebnisse und kenne die wichtigsten Regeln, z. B. zum Datenschutz",
      "Ich kenne Möglichkeiten und Grenzen gut und kann anderen helfen",
      "Ich habe vertieftes Wissen, auch zu Technik, Recht oder Ethik"
    ]},
    { id: "P4", teil: "du", typ: "wahl", frage: "Was beschreibt deine Haltung zu KI gerade am besten?", optionen: [
      { wert: "neugierig", text: "Neugierig – ich will mehr ausprobieren" },
      { wert: "pragmatisch", text: "Pragmatisch – wenn es hilft, nutze ich es" },
      { wert: "unsicher", text: "Unsicher – ich weiß noch nicht, was ich davon halten soll" },
      { wert: "kritisch", text: "Kritisch – ich sehe vor allem Risiken" },
      { wert: "gemischt", text: "Gemischt – von allem ein bisschen" }
    ]},

    // ---------- Teil 2: Eure Organisation ----------
    { id: "T1", teil: "org", dimension: "technik", typ: "stufe", weissNicht: true, frage: "Welche KI-Tools stehen euch zur Verfügung?", optionen: [
      "Keine sind erlaubt oder eingerichtet",
      "Jede*r nutzt auf eigene Faust kostenlose Tools",
      "Es gibt eine Liste empfohlener Tools und erste bezahlte Lizenzen",
      "In allen Bereichen gibt es eine solide Ausstattung mit Lizenzen",
      "Wir haben eine umfassende, flexible Ausstattung mit verlässlichem Support"
    ]},
    { id: "T2", teil: "org", dimension: "technik", typ: "stufe", weissNicht: true, frage: "Arbeitet KI bei euch mit euren eigenen Daten und Systemen?", optionen: [
      "Nein, gar nicht",
      "Nur per Kopieren und Einfügen von unkritischen Texten",
      "Einzelne Tools arbeiten mit unseren Dokumenten, z. B. als Wissensdatenbank",
      "KI-Tools sind mit unseren Datenbanken oder Fachsystemen verbunden",
      "Das passiert vielfältig und abgesichert, und wir entwickeln es laufend weiter"
    ]},
    { id: "K1", teil: "org", dimension: "kompetenzen", typ: "stufe", weissNicht: true, frage: "Welche Lernangebote zu KI gibt es bei euch?", optionen: [
      "Keine",
      "Einzelne Infoveranstaltungen oder Vorträge",
      "Schulungen für Interessierte, z. B. Grundlagen und Prompting",
      "Regelmäßige Schulungen, KI ist auch Teil des Onboardings",
      "Ein umfassendes Lernprogramm, auch mit vertiefenden Angeboten zu Spezialthemen"
    ]},
    { id: "K2", teil: "org", dimension: "kompetenzen", typ: "stufe", weissNicht: true, frage: "Wie teilt ihr Wissen und Erfahrungen zu KI – auch zwischen Teams und Bereichen?", optionen: [
      "Gar nicht – jede*r ist auf sich gestellt, die Bereiche wissen kaum voneinander",
      "Einzelne erzählen informell von ihren Erfahrungen",
      "Es gibt einen Kanal, eine Infoecke oder Ansprechpersonen und regelmäßige Austauschtreffen",
      "Es gibt Tandems oder Mentor*innen, die Bereiche lernen gezielt voneinander",
      "Wir haben eigene Expertise und teilen sie auch mit anderen Organisationen"
    ]},
    { id: "S1", teil: "org", dimension: "strategie", typ: "stufe", weissNicht: true, frage: "Wie ist KI bei euch verankert?", hinweis: "Gemeint sind Leitung, Zuständigkeiten und Ziele.", optionen: [
      "Gar nicht – die Leitung hat sich noch nicht damit beschäftigt, niemand ist zuständig",
      "KI wird geduldet, jemand kümmert sich nebenbei oder inoffiziell darum",
      "Die Leitung hat klar Ja gesagt, eine beauftragte Person oder ein Team hat Zeit dafür, für einzelne Bereiche gibt es Ziele",
      "Es gibt feste Zuständigkeiten in allen Bereichen, KI ist Teil unserer Strategie bzw. Roadmap",
      "Wir denken unsere Arbeit von unserer Mission her mit KI neu und setzen neue Ideen schnell um"
    ]},
    { id: "S2", teil: "org", dimension: "strategie", typ: "stufe", weissNicht: true, frage: "Wertet ihr eure Erfahrungen mit KI gezielt aus?", optionen: [
      "Nein",
      "Höchstens im Nachhinein, wenn etwas schiefgegangen ist",
      "Wir schauen uns einzelne Projekte oder Anwendungen gezielt an",
      "Ja, regelmäßig – und daraus folgen Entscheidungen, was wir ausweiten und was wir lassen",
      "Ja, in festen Schleifen: Wir prüfen Erfolg und Kosten, die Ergebnisse fließen in unsere Strategie"
    ]},
    { id: "E1", teil: "org", dimension: "ethik", typ: "stufe", weissNicht: true, frage: "Welche Regeln gibt es bei euch für die KI-Nutzung?", optionen: [
      "Keine Regeln – oder ein generelles Verbot",
      "Es gibt mündliche Absprachen, Bedenken werden gesammelt",
      "Es gibt schriftliche Leitlinien, die Datenschutz und Urheberrecht berücksichtigen",
      "Unsere Leitlinien werden regelmäßig aktualisiert, neue Tools werden vor dem Einsatz geprüft",
      "Wir haben ein umfassendes Rahmenwerk und bringen uns auch öffentlich in die Debatte ein"
    ]},
    { id: "E2", teil: "org", dimension: "ethik", typ: "stufe", weissNicht: true, frage: "Wie geht ihr mit Bedenken und Fehlern rund um KI um?", optionen: [
      "Darüber wird nicht gesprochen",
      "Das kommt mal informell zur Sprache",
      "Es gibt eine Ansprechperson, und Bedenken fließen in Entscheidungen ein",
      "Es gibt einen klaren Ablauf bei Pannen (z. B. Datenschutzverstoß, veröffentlichter Fehler), Betriebsrat und Datenschutzbeauftragte sind eingebunden",
      "Wir prüfen außerdem regelmäßig Bias und die Auswirkungen auf Zielgruppen und Team"
    ]},

    // ---------- Teil 3: Unterschiede ----------
    { id: "U1", teil: "unterschiede", typ: "bereiche", frage: "Wie stark wird KI in euren Arbeitsbereichen genutzt?", hinweis: "Wähle für jeden Bereich eine Antwort. Wenn du einen Bereich nicht kennst, wähle „Weiß nicht“.",
      bereiche: [
        { id: "mittel", text: "Mittelakquise und Fundraising", beispiel: "Förderanträge, Spendenbriefe" },
        { id: "oeffentlichkeit", text: "Öffentlichkeitsarbeit", beispiel: "Social Media, Newsletter, Presse" },
        { id: "advocacy", text: "Advocacy und Interessenvertretung", beispiel: "Stellungnahmen, Positionspapiere" },
        { id: "zielgruppen", text: "Zielgruppenkommunikation", beispiel: "Anschreiben, Infomaterial" },
        { id: "verwaltung", text: "Personal und Verwaltung", beispiel: "Ausschreibungen, Onboarding, Dokumentation" },
        { id: "facharbeit", text: "Eure Facharbeit", beispiel: "z. B. Bildung, Beratung, Pflege, Jugendarbeit" }
      ],
      skala: [
        { wert: 1, text: "Noch gar nicht" },
        { wert: 2, text: "Vereinzelt" },
        { wert: 3, text: "Regelmäßig" },
        { wert: 4, text: "Systematisch" },
        { wert: "nz", text: "Trifft nicht zu" },
        { wert: "wn", text: "Weiß nicht" }
      ]
    },
    { id: "U2", teil: "unterschiede", typ: "wahl", frage: "Welches Bild passt am ehesten zu den Menschen bei euch?", hinweis: "Jeder Punkt steht für eine Person – je weiter rechts, desto mehr nutzt sie KI.", optionen: [
      { wert: "aehnlich", text: "Alle ähnlich", erklaerung: "Die meisten sind ungefähr gleich weit", punkte: [2,2,2,2,2,3,3,2,2,3] },
      { wert: "vorreiter", text: "Wenige Vorreiter*innen", erklaerung: "Ein paar nutzen KI intensiv, die meisten (noch) nicht", punkte: [1,1,1,1,1,1,1,2,5,5] },
      { wert: "mitte", text: "Breite Mitte", erklaerung: "Viele nutzen KI ab und zu, wenige sind noch gar nicht dabei", punkte: [1,2,3,3,3,3,3,3,4,4] },
      { wert: "lager", text: "Zwei Lager", erklaerung: "Begeisterte auf der einen, deutlich Ablehnende auf der anderen Seite", punkte: [1,1,1,1,1,5,5,5,5,5] },
      { wert: "wn", text: "Weiß ich nicht" }
    ]},
    { id: "U3", teil: "unterschiede", typ: "wahl", frage: "Sind Ehrenamtliche beim Thema KI mit dabei?", optionen: [
      { wert: "nz", text: "Betrifft uns nicht" },
      { wert: "nein", text: "Nein, bisher nicht" },
      { wert: "teilweise", text: "Teilweise" },
      { wert: "ja", text: "Ja, genauso wie Hauptamtliche" }
    ]}
  ],

  // ---------- Ergebnis ----------
  phasen: {
    A: { name: "Phase A", titel: "„Einfach“ anfangen", anker: "phase-a",
      text: "Jetzt geht es darum, dass möglichst viele KI gut genug verstehen, um sicher damit zu experimentieren. Ihr braucht dafür keine fertige Strategie, sondern einen sicheren Rahmen: ein Ja der Leitung, Grundlagenwissen und ein paar klare Regeln." },
    B: { name: "Phase B", titel: "Strategisch experimentieren", anker: "phase-b",
      text: "Ihr habt Erfahrungen gesammelt. Jetzt geht es darum herauszufinden, wo KI euch wirklich entlastet oder eure Arbeit besser macht – und euch auf diese Bereiche zu konzentrieren. Dazu gehört auch, sich bewusst gegen manche Ideen zu entscheiden." },
    C: { name: "Phase C", titel: "Organisationsweit ausweiten", anker: "phase-c",
      text: "KI läuft in einzelnen Bereichen produktiv. Jetzt wertet ihr aus, was gelingt, weitet es aus und macht es zum Standard. Und ihr teilt euer Wissen mit anderen Organisationen." }
  },

  spreizung: {
    gross: [
      "<strong>Bei euch liegen Welten dazwischen – und das ist normal.</strong> Große Unterschiede sind eine echte Chance: Ihr habt eigene Vorreiter*innen, die zeigen können, was funktioniert, und Bereiche, die von anderen lernen können, statt bei null anzufangen.",
      "<strong>Das Risiko:</strong> Wenn die Weiten unbemerkt weiterziehen, entstehen Insellösungen, Wissen bleibt bei Einzelnen, und die anderen fühlen sich abgehängt oder überrollt.",
      "<strong>Was hilft:</strong> Tandems aus Erfahrenen und Einsteiger*innen, regelmäßige „Zeig mal“-Runden zwischen den Bereichen – und kritische Stimmen bewusst einbinden: Sie helfen, die Kriterien für gute KI-Nutzung festzulegen."
    ],
    lager: "Bei „zwei Lagern“ droht KI zum Streitthema zu werden statt zum gemeinsamen Lernfeld. Holt beide Seiten an einen Tisch: Die Begeisterten zeigen, was geht, die Kritischen helfen, Grenzen und Kriterien festzulegen.",
    klein: "Ihr seid ungefähr gleich weit. Das ist eine gute Voraussetzung, um gemeinsam den nächsten Schritt zu gehen. Achtet darauf, dass ihr euch nicht gegenseitig ausbremst: Wer schneller vorangehen möchte, darf das als „Early Adopter“ für alle tun.",
    unbekannt: "Wie weit ihr auseinanderliegt, lässt sich aus deinen Antworten nicht sicher sagen. Das ist schon eine Erkenntnis: Fragt doch einmal in die Runde, wer KI wofür nutzt.",
    wenigAustausch: "Eure Bereiche wissen wenig voneinander. Ein gemeinsamer Kanal oder eine Infoecke ist ein schneller Gewinn.",
    ehrenamtNein: "Denkt eure Ehrenamtlichen mit: Viele nutzen KI längst privat – und bringen damit Erfahrung, aber auch Datenschutzfragen mit."
  },

  du: {
    leitungA: "<strong>Als Leitung</strong> ist dein wichtigster Hebel gerade kein Tool, sondern ein klares Ja: Gib Zeit und begrenzte Mittel zum Ausprobieren frei und benenne, wer koordiniert.",
    leitungBC: "<strong>Als Leitung</strong> ist deine Rolle jetzt, Entscheidungen zu ermöglichen: Fokusbereiche festlegen, auch Ideen verabschieden und die Auswertungsschleifen verbindlich machen.",
    koordination: "<strong>Du koordinierst das Thema.</strong> Der Leitfaden hat einen Zeitplan für 6–12 Monate, den du als Vorlage nutzen kannst – und denk daran, dir selbst Zeit dafür einräumen zu lassen.",
    weiter: "<strong>Du bist bei euch Vorreiter*in.</strong> Das ist wertvoll: Du kannst anderen zeigen, wie du arbeitest, oder Ansprechperson werden. Achte darauf, dass dafür Zeit eingeplant wird und es nicht „nebenbei“ an dir hängen bleibt.",
    anfang: "<strong>Bei euch sind andere schon weiter als du.</strong> Das ist eine gute Nachricht: Du kannst von ihnen lernen. Frag nach, wie sie KI nutzen, und probiere es an einer kleinen, unkritischen Aufgabe aus.",
    schnitt: "<strong>Du stehst ungefähr da, wo auch eure Organisation steht.</strong> Damit hast du ein gutes Gespür dafür, welcher nächste Schritt für viele machbar ist.",
    kritisch: "<strong>Deine Skepsis ist kein Bremsklotz, sondern gebraucht.</strong> Kritische Stimmen helfen, blinde Flecken zu erkennen und gute Kriterien für KI-Projekte zu entwickeln. Bring sie dort ein, wo Regeln und Ziele festgelegt werden.",
    unsicher: "<strong>Unsicherheit ist bei einer so neuen Technologie völlig normal.</strong> Ein Grundlagen-Workshop und ein sicherer Rahmen zum Ausprobieren helfen am meisten.",
    neugierig: "<strong>Deine Neugier ist ein Motor.</strong> Nutze sie, um auszuprobieren – und teile, was du lernst, damit nicht nur du davon profitierst."
  },

  // Bedingungen stehen in app.js (Funktion bedingungen), hier nur Texte und Verweise.
  schritte: {
    A1: { text: "Holt ein klares Ja der Leitung ein, schafft einen Spielraum mit Zeit und begrenzten Mitteln und benennt eine KI-Ansprechperson oder ein kleines Team.", ziel: "schritt-1", label: "Schritt 1–2" },
    A2: { text: "Organisiert einen KI-Grundlagen-Workshop: Wie funktioniert generative KI, und was ist bei der Nutzung zu beachten?", ziel: "schritt-1", label: "Schritt 1" },
    A3: { text: "Bietet eine Einführung ins Prompting an und teilt gute Beispiele.", ziel: "schritt-1", label: "Schritt 1" },
    A4: { text: "Schreibt erste Leitlinien für die KI-Nutzung. Meine Leitlinien-Vorlage hilft beim Start.", ziel: "leitlinien", label: "Leitlinien-Vorlage" },
    A5: { text: "Stellt eine Liste mit Tools zum Ausprobieren zusammen – wo möglich auch mit Bezahl-Lizenzen.", ziel: "schritt-2", label: "Schritt 2" },
    A7: { text: "Richtet einen KI-Kanal oder eine Infoecke ein und schafft regelmäßigen Austausch.", ziel: "schritt-2", label: "Schritt 2" },
    A8: { text: "Entwerft einen groben Zeitplan für die nächsten 6–12 Monate.", ziel: "zeitplan", label: "Zeitplan" },
    B1: { text: "Macht KI-Bedarfs-Workshops: Wo drückt der Schuh? Sammelt eine „KI-Wunschliste“, zunächst ohne auf Machbarkeit zu achten.", ziel: "schritt-3", label: "Schritt 3" },
    B2: { text: "Führt kurze KI-Interviews mit Mitarbeitenden, Ehrenamtlichen und Zielgruppen über ihre täglichen Herausforderungen.", ziel: "schritt-3", label: "Schritt 3" },
    B3: { text: "Trefft Entscheidungen über zwei, drei Fokusbereiche und haltet sie in einer KI-Roadmap für die nächsten 3–6 Monate fest.", ziel: "schritt-3", label: "Schritt 3" },
    B4: { text: "Bindet Betriebsrat, Datenschutzbeauftragte und Schwerbehindertenvertretung ein.", ziel: "schritt-3", label: "Schritt 3" },
    B5: { text: "Erstellt eine Tool-Landkarte und eine Kostenübersicht für die nächsten 6 Monate.", ziel: "schritt-4", label: "Schritt 4" },
    B6: { text: "Sichert die Datennutzung ab: Richtlinien für eure Daten in KI-Systemen, Auftragsverarbeitungsverträge, ein KI-Sicherheits-Check.", ziel: "schritt-4", label: "Schritt 4" },
    B7: { text: "Legt fest, was bei Fehlern und Pannen passiert und wer informiert wird.", ziel: "schritt-5", label: "Schritt 5" },
    B8: { text: "Bietet vertiefende Schulungen an und nehmt KI ins Onboarding auf.", ziel: "schritt-5", label: "Schritt 5" },
    C1: { text: "Macht Auswertungs-Workshops zu Erfolgen und Misserfolgen – auch zum Verhältnis von Kosten und Nutzen.", ziel: "schritt-6", label: "Schritt 6" },
    C2: { text: "Weitet aus, was funktioniert, und macht es zum Standard für alle. Verabschiedet euch von dem, was nicht trägt.", ziel: "schritt-7", label: "Schritt 7" },
    C3: { text: "Ermöglicht Mitarbeitenden, KI-Expert*innen in ihrem Bereich zu werden, und fördert den Austausch zwischen Abteilungen.", ziel: "schritt-7", label: "Schritt 7" },
    C4: { text: "Behaltet die Tool-Entwicklung im Blick, damit ihr nicht in einer Technik feststeckt.", ziel: "schritt-7", label: "Schritt 7" },
    D1: { text: "Teilt euer Wissen mit anderen NGOs und setzt euch gemeinsam für ethische, sichere und ökologische KI ein.", ziel: "bonus", label: "Bonus" },
    X1: { text: "Ihr arbeitet schon mit eigenen Daten, habt aber keine schriftlichen Regeln. Das sollte jetzt Vorrang haben – startet mit Leitlinien und prüft, welche Daten wohin gehen.", ziel: "leitlinien", label: "Leitlinien-Vorlage", warnung: true },
    X2: { text: "Du hast oft „Weiß ich nicht“ gewählt. Macht sichtbar, was es bei euch schon gibt: Regeln, Ansprechpersonen, Tools. Das hilft allen.", ziel: "schritt-2", label: "Schritt 2" },
    X3: { text: "Bindet eure Ehrenamtlichen ein – mit Grundlagen und klaren Regeln.", ziel: "schritt-1", label: "Schritt 1" }
  },

  // Welche Schritte helfen bei welchem Engpass (in dieser Reihenfolge geprüft)
  engpassSchritte: {
    technik: ["A5", "B5", "B6"],
    kompetenzen: ["A2", "A3", "B8"],
    strategie: ["A1", "A8", "B3"],
    ethik: ["A4", "B7", "B4"]
  },

  lernschleife: {
    titel: "Denkt in Schleifen, nicht in Plänen",
    text: "KI entwickelt sich zu schnell für fertige Strategien. Was trägt, ist ein Rhythmus: ausprobieren, auswerten, besser weitermachen, wieder auswerten. <strong>Legt jetzt einen Auswertungstermin fest – in etwa drei Monaten.</strong> Diese Fragen helfen dabei:",
    fragen: [
      "Wo haben wir KI erfolgreich eingesetzt – und wo nicht?",
      "Was wollen wir ausweiten, und was lassen wir bewusst bleiben?",
      "Welche Bedenken haben sich bestätigt, welche nicht?",
      "Was wollen wir selbst machen und nicht an KI abgeben?"
    ],
    tipp: "Speichere dieses Ergebnis als PDF und mach die Standortbestimmung beim Auswertungstermin noch einmal. So seht ihr, was sich bewegt hat. Und wenn mehrere von euch sie ausfüllen, sind die Stellen, an denen ihr unterschiedlich antwortet, euer bester Gesprächsstoff."
  },

  angebote: {
    selbstlernkurs: { titel: "Selbstlernkurs", format: "6 Module mit Videos, Erklärungen und Aufgaben – jederzeit startbar", link: "selbstlernkurs", knopf: "Zum Selbstlernkurs",
      text: "Damit alle bei euch eine gemeinsame Grundlage bekommen: Im Selbstlernkurs lernt jede*r im eigenen Tempo, und ihr könnt sofort starten. Ideal für Teams, die selbstbestimmt lernen wollen." },
    lernreise: { titel: "Lernreise", format: "4 Wochen mit 4 Live-Workshops und Transferaufgaben – nächster Start: {lernreiseStart}", link: "lernreise", knopf: "Zur Lernreise",
      text: "Wenn bei euch Welten dazwischen liegen, hilft gemeinsames Live-Lernen am meisten: In der Lernreise kommt ihr in vier Wochen als Team auf einen Stand und übertragt das Gelernte direkt in euren Alltag." },
    erstberatung: { titel: "Kostenlose Erstberatung", format: "30 Minuten online", link: "erstberatung", knopf: "Termin buchen",
      text: "Ihr seid schon ein gutes Stück weit. In einem kostenlosen Erstgespräch schauen wir gemeinsam, was ihr braucht, um in die nächste Schleife zu kommen. Gerade der Schritt ins strategische Experimentieren gelingt mit Begleitung oft schneller." }
  }
};
