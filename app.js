/*
  KI-Standortbestimmung – Ablauf und Auswertung.
  Die Antworten liegen nur in der Variable `antworten` im Arbeitsspeicher des Browsers.
  Es gibt kein localStorage, keine Cookies und keine Netzwerkanfragen.
*/
(function () {
  "use strict";

  var I = window.INHALT;
  var app = document.getElementById("app");
  var fragen = I.fragen;
  var antworten = {};
  var position = -1; // -1 Start, 0..n-1 Fragen, n Ergebnis

  // ---------- Hilfen ----------
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function zahl(id) { return typeof antworten[id] === "number" ? antworten[id] : null; }
  function bis(id, n) { var v = zahl(id); return v !== null && v <= n; }
  function ab(id, n) { var v = zahl(id); return v !== null && v >= n; }
  function mittel(werte) {
    var z = werte.filter(function (w) { return typeof w === "number"; });
    if (!z.length) return null;
    return z.reduce(function (a, b) { return a + b; }, 0) / z.length;
  }
  function komma(x) { return x.toFixed(1).replace(".", ","); }
  function teilVon(id) { return I.teile.filter(function (t) { return t.id === id; })[0]; }
  function frageNr(id) { for (var i = 0; i < fragen.length; i++) if (fragen[i].id === id) return i; return -1; }
  function link(name) { return I.links[name]; }
  function leitfadenLink(anker) { return anker === "leitlinien" ? link("leitlinien") : link("leitfaden") + "#" + anker; }
  function ersetze(text) { return text.replace("{lernreiseStart}", I.einstellungen.lernreiseStart); }

  function anzeigen(html) {
    app.innerHTML = html;
    window.scrollTo(0, 0);
    var h = app.querySelector("h1, h2");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }

  // Schutz vor versehentlichem Schließen – die Antworten wären sonst weg
  window.addEventListener("beforeunload", function (e) {
    if (Object.keys(antworten).length) { e.preventDefault(); e.returnValue = ""; }
  });

  // ---------- Start ----------
  function start() {
    position = -1;
    anzeigen(
      '<section class="hero">' +
        '<div class="hero-text">' +
          '<span class="label">Standortbestimmung</span>' +
          "<h1>Wo steht eure Organisation beim Thema KI?</h1>" +
          '<p class="unterzeile">Und was ist euer nächster Schritt?</p>' +
          '<div class="strich"></div>' +
        "</div>" +
        '<img class="hero-bild" src="bilder/drache-kompass.png" alt="Drache mit Kompass">' +
      "</section>" +
      "<p>In <strong>15 kurzen Fragen</strong> findest du heraus, wo deine Organisation beim Thema generative KI steht, wie weit ihr untereinander auseinanderliegt und wo du selbst stehst. Am Ende bekommst du eine Einschätzung und konkrete Vorschläge, welche Schritte jetzt sinnvoll sind.</p>" +
      "<p>Es gibt kein Richtig oder Falsch. Antworte so, wie es bei euch <em>heute</em> ist – nicht, wie es sein sollte.</p>" +
      '<div class="rahmen">' +
        '<span class="kleinlabel">Deine Antworten bleiben bei dir</span>' +
        "<p>Deine Antworten werden <strong>nicht gespeichert</strong> und nirgendwohin geschickt. Sie existieren nur in deinem Browser – ich kann sie nicht sehen.</p>" +
        "<p>Das heißt aber auch: Wenn du die Seite schließt oder neu lädst, sind sie weg. Wenn du dein Ergebnis behalten willst, speichere es am Ende als PDF.</p>" +
      "</div>" +
      '<div class="start-aktion">' +
        '<button class="knopf" type="button" id="los">&gt; Los geht’s</button>' +
        "<span>Dauer: etwa 7 Minuten</span>" +
      "</div>"
    );
    document.getElementById("los").addEventListener("click", function () { zeigeFrage(0); });
  }

  // ---------- Fragen ----------
  function punkteSvg(punkte) {
    var zaehler = {}, kreise = "";
    punkte.forEach(function (v) {
      var k = zaehler[v] = (zaehler[v] || 0) + 1;
      var spalte = (k - 1) % 2, reihe = Math.floor((k - 1) / 2);
      var x = 8 + (v - 1) * 28 + spalte * 8;
      var y = 30 - reihe * 8;
      kreise += '<circle cx="' + x + '" cy="' + y + '" r="3.2"/>';
    });
    return '<svg class="punkte" viewBox="0 0 132 40" aria-hidden="true">' +
      '<line x1="2" y1="37" x2="130" y2="37" stroke="#006633" stroke-width="1"/>' +
      '<g fill="#006633">' + kreise + "</g></svg>";
  }

  function optionHtml(name, wert, inhalt, gewaehlt, klasse) {
    return '<label class="option' + (klasse ? " " + klasse : "") + '">' +
      '<input type="radio" name="' + name + '" value="' + esc(wert) + '"' + (gewaehlt ? " checked" : "") + ">" +
      "<span>" + inhalt + "</span></label>";
  }

  function frageInhalt(f) {
    var a = antworten[f.id], html = "";
    if (f.typ === "stufe") {
      html += '<div class="optionen">';
      f.optionen.forEach(function (text, i) {
        html += optionHtml(f.id, i + 1, esc(text), a === i + 1);
      });
      if (f.weissNicht) html += optionHtml(f.id, "wn", "Weiß ich nicht", a === "wn", "option--leise");
      html += "</div>";
    } else if (f.typ === "wahl") {
      html += '<div class="optionen">';
      f.optionen.forEach(function (o) {
        var leise = o.wert === "wn" || o.wert === "nz";
        if (o.punkte) {
          html += optionHtml(f.id, o.wert,
            "<span><strong>" + esc(o.text) + "</strong><small>" + esc(o.erklaerung) + "</small></span>" + punkteSvg(o.punkte),
            a === o.wert, "option--bild");
        } else {
          html += optionHtml(f.id, o.wert, esc(o.text), a === o.wert, leise ? "option--leise" : "");
        }
      });
      html += "</div>";
    } else if (f.typ === "bereiche") {
      var werte = a || {};
      f.bereiche.forEach(function (b) {
        html += '<fieldset class="bereich"><legend>' + esc(b.text) + "<small>" + esc(b.beispiel) + "</small></legend>" +
          '<div class="skala">';
        f.skala.forEach(function (s) {
          html += optionHtml(f.id + "-" + b.id, s.wert, esc(s.text), werte[b.id] === s.wert);
        });
        html += "</div></fieldset>";
      });
    }
    return html;
  }

  function beantwortet(f) {
    var a = antworten[f.id];
    if (f.typ === "bereiche") {
      return !!a && f.bereiche.every(function (b) { return a[b.id] !== undefined; });
    }
    return a !== undefined;
  }

  function zeigeFrage(i) {
    position = i;
    var f = fragen[i];
    var teil = teilVon(f.teil);
    var ersteImTeil = i === 0 || fragen[i - 1].teil !== f.teil;
    var teilNr = I.teile.indexOf(teil) + 1;
    var prozent = Math.round((i / fragen.length) * 100);

    anzeigen(
      '<div class="fortschritt">' +
        '<div class="fortschritt-zeile"><span class="kleinlabel">Teil ' + teilNr + " von " + I.teile.length + " · " + esc(teil.titel) + "</span>" +
        "<span>Frage " + (i + 1) + " von " + fragen.length + "</span></div>" +
        '<div class="balken" role="progressbar" aria-valuemin="0" aria-valuemax="' + fragen.length + '" aria-valuenow="' + i + '" aria-label="Fortschritt"><span style="width:' + prozent + '%"></span></div>' +
      "</div>" +
      (ersteImTeil ? '<p class="teil-intro">' + esc(teil.intro) + "</p>" : "") +
      '<form class="frage" id="frage" novalidate>' +
        "<fieldset><legend class=\"versteckt\">" + esc(f.frage) + "</legend>" +
        "<h2>" + esc(f.frage) + "</h2>" +
        (f.hinweis ? '<p class="hinweis">' + esc(f.hinweis) + "</p>" : "") +
        frageInhalt(f) +
        "</fieldset>" +
        '<div class="navigation">' +
          '<button class="knopf knopf--leise" type="button" id="zurueck">Zurück</button>' +
          '<button class="knopf" type="submit" id="weiter">' + (i === fragen.length - 1 ? "&gt; Zum Ergebnis" : "&gt; Weiter") + "</button>" +
        "</div>" +
      "</form>"
    );

    var form = document.getElementById("frage");
    var weiter = document.getElementById("weiter");
    weiter.disabled = !beantwortet(f);

    form.addEventListener("change", function (e) {
      var t = e.target;
      if (t.type !== "radio") return;
      var wert = /^\d+$/.test(t.value) ? Number(t.value) : t.value;
      if (f.typ === "bereiche") {
        var bereichId = t.name.slice(f.id.length + 1);
        antworten[f.id] = antworten[f.id] || {};
        antworten[f.id][bereichId] = wert;
      } else {
        antworten[f.id] = wert;
      }
      weiter.disabled = !beantwortet(f);
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!beantwortet(f)) return;
      if (i + 1 < fragen.length) zeigeFrage(i + 1); else ergebnis();
    });
    document.getElementById("zurueck").addEventListener("click", function () {
      if (i === 0) start(); else zeigeFrage(i - 1);
    });
  }

  // ---------- Auswertung ----------
  function auswerten() {
    var r = {};

    r.dims = I.dimensionen.map(function (d) {
      return { id: d.id, titel: d.titel, stufen: d.stufen, wert: mittel(d.fragen.map(function (id) { return antworten[id]; })) };
    });
    var bekannte = r.dims.filter(function (d) { return d.wert !== null; });
    r.gesamt = mittel(bekannte.map(function (d) { return d.wert; }));
    r.dim = {};
    r.dims.forEach(function (d) { r.dim[d.id] = d.wert; });

    var g = r.gesamt;
    if (g === null) { r.phase = "A"; r.uebergang = null; }
    else if (g < 2.5) { r.phase = "A"; r.uebergang = g >= 2.2 ? ["A", "B"] : null; }
    else if (g <= 3.5) { r.phase = "B"; r.uebergang = g < 2.8 ? ["A", "B"] : (g > 3.2 ? ["B", "C"] : null); }
    else { r.phase = "C"; r.uebergang = g < 3.8 ? ["B", "C"] : null; }

    if (bekannte.length >= 2 && g !== null) {
      var sortiert = bekannte.slice().sort(function (a, b) { return a.wert - b.wert; });
      r.engpass = g - sortiert[0].wert >= 1 ? sortiert[0] : null;
      r.staerke = sortiert[sortiert.length - 1].wert - g >= 1 ? sortiert[sortiert.length - 1] : null;
    }

    var bereiche = antworten.U1 || {};
    var bw = Object.keys(bereiche).map(function (k) { return bereiche[k]; }).filter(function (w) { return typeof w === "number"; });
    r.bereicheGross = bw.length >= 2 && Math.max.apply(null, bw) - Math.min.apply(null, bw) >= 2;
    r.bereicheBekannt = bw.length >= 2;
    r.menschen = antworten.U2;
    r.menschenGross = r.menschen === "vorreiter" || r.menschen === "lager";
    r.spreizungGross = r.bereicheGross || r.menschenGross;
    r.spreizungUnbekannt = !r.bereicheBekannt && (r.menschen === "wn" || !r.menschen);

    r.person = mittel([antworten.P2, antworten.P3]);
    r.vergleich = (r.person === null || g === null) ? "schnitt" :
      (r.person - g >= 1 ? "weiter" : (r.person - g <= -1 ? "anfang" : "schnitt"));

    r.weissNicht = fragen.filter(function (f) { return f.teil === "org" && antworten[f.id] === "wn"; }).length;
    r.risiko = ab("T2", 3) && bis("E1", 2);
    return r;
  }

  function bedingungen(r) {
    var B = r.phase === "B", C = r.phase === "C";
    return {
      A1: bis("S1", 2), A2: bis("K1", 2), A3: bis("K1", 2), A4: bis("E1", 2), A5: bis("T1", 2), A7: bis("K2", 2), A8: bis("S1", 2),
      B1: B, B2: B, B3: bis("S1", 3), B4: bis("E2", 3), B5: bis("T1", 3), B6: ab("T2", 3) && bis("E1", 3), B7: bis("E2", 2), B8: bis("K1", 3),
      C1: C, C2: C, C3: C && bis("K2", 4), C4: ab("T1", 4),
      D1: C || zahl("K2") === 5,
      X1: r.risiko, X2: r.weissNicht >= 3, X3: antworten.U3 === "nein"
    };
  }

  function schritteWaehlen(r) {
    var gilt = bedingungen(r);
    var benutzt = {};
    function nimm(liste, max) {
      var aus = [];
      liste.forEach(function (id) { if (aus.length < max && gilt[id] && !benutzt[id]) { aus.push(id); benutzt[id] = true; } });
      return aus;
    }

    var engpass = [];
    if (r.engpass) {
      engpass = nimm(I.engpassSchritte[r.engpass.id], 2);
      if (!engpass.length) { engpass = [I.engpassSchritte[r.engpass.id][0]]; benutzt[engpass[0]] = true; }
    }

    var reihen = {
      A: ["A1", "A2", "A3", "A4", "A5", "A7", "A8"],
      B: ["A1", "A4", "A2", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
      C: ["A4", "B6", "B7", "C1", "C2", "C3", "C4", "D1"]
    };
    if (r.gesamt === null) reihen.A = ["A1", "A2", "A4", "A5"];
    var haupt = nimm(["X1", "X2"], 2);
    haupt = haupt.concat(nimm(reihen[r.phase], 5 - haupt.length));
    haupt = haupt.concat(nimm(["X3"], 5 - haupt.length));
    // Mindestens drei Vorschläge: notfalls aus der nächsten Phase ergänzen
    if (haupt.length < 3) {
      var naechste = r.phase === "A" ? ["B1", "B3", "B5"] : ["C1", "C2", "D1"];
      naechste.forEach(function (id) { if (haupt.length < 3 && !benutzt[id]) { haupt.push(id); benutzt[id] = true; } });
    }
    return { engpass: engpass, haupt: haupt };
  }

  // ---------- Ergebnis-Bausteine ----------
  function phaseText(p) { return I.phasen[p].name; }

  function zusammenfassung(r) {
    var s = [];
    if (r.gesamt === null) {
      s.push("Zu eurer Organisation hast du überall „Weiß ich nicht“ gewählt. Wo ihr steht, lässt sich deshalb noch nicht sagen – die Vorschläge unten setzen beim Anfang an.");
    } else if (r.uebergang) {
      s.push("Eure Organisation steht am Übergang von " + phaseText(r.uebergang[0]) + " zu " + phaseText(r.uebergang[1]) + ": " + kernsatz(r).charAt(0).toLowerCase() + kernsatz(r).slice(1) + ".");
    } else {
      s.push("Eure Organisation steht in " + phaseText(r.phase) + ": " + I.phasen[r.phase].titel + ".");
    }
    if (r.staerke) s.push("Am weitesten seid ihr bei <strong>" + esc(r.staerke.titel) + "</strong>.");
    if (r.engpass) s.push("Euer Engpass ist <strong>" + esc(r.engpass.titel) + "</strong> – hier lohnt es sich, zuerst anzusetzen.");
    if (!r.staerke && !r.engpass && r.gesamt !== null) s.push("Technik, Kompetenzen, Strategie sowie Ethik und Recht sind bei euch ungefähr gleich weit entwickelt.");
    if (r.bereicheGross && r.menschenGross) s.push("Zwischen euren Arbeitsbereichen und zwischen den Menschen bei euch liegen große Unterschiede.");
    else if (r.bereicheGross) s.push("Zwischen euren Arbeitsbereichen liegen große Unterschiede.");
    else if (r.menschenGross) s.push("Zwischen den Menschen bei euch liegen große Unterschiede.");
    if (r.gesamt !== null) s.push({
      weiter: "Du selbst bist schon weiter als eure Organisation im Schnitt.",
      anfang: "Du selbst stehst noch eher am Anfang – andere bei euch sind schon weiter.",
      schnitt: "Du selbst stehst ungefähr da, wo auch eure Organisation steht."
    }[r.vergleich]);
    return s.join(" ");
  }

  function kernsatz(r) {
    if (r.uebergang) return "Vom " + (r.uebergang[0] === "A" ? "Ausprobieren ins strategische Experimentieren" : "Experimentieren zum Ausweiten");
    return I.phasen[r.phase].titel;
  }

  function profilHtml(r) {
    var html = '<div class="profil">';
    r.dims.forEach(function (d) {
      var stufe = d.wert === null ? 0 : Math.round(d.wert);
      var engpass = r.engpass && r.engpass.id === d.id;
      var balken = "";
      for (var k = 1; k <= 5; k++) balken += "<i" + (k <= stufe ? ' class="an"' : "") + "></i>";
      html += '<div class="dim' + (engpass ? " dim--engpass" : "") + '">' +
        '<div class="dim-kopf"><h3>' + esc(d.titel) + "</h3><span>" +
          (d.wert === null ? "keine Angabe" : "Stufe " + stufe + " · " + esc(I.stufen[stufe - 1]) + (engpass ? " · Engpass" : "")) +
        "</span></div>" +
        '<div class="dim-skala" aria-hidden="true">' + balken + "</div>" +
        '<p class="dim-text">' + (d.wert === null ? "Hier hast du „Weiß ich nicht“ gewählt." : esc(d.stufen[stufe - 1])) + "</p>" +
      "</div>";
    });
    return html + "</div>";
  }

  function phasenHtml(r) {
    var aktiv = r.uebergang || [r.phase];
    return '<div class="phasen">' + ["A", "B", "C"].map(function (p) {
      var x = I.phasen[p];
      var schritte = { A: "Schritt 1–2", B: "Schritt 3–5", C: "Schritt 6–7" }[p];
      return '<div class="phase' + (aktiv.indexOf(p) >= 0 ? " phase--aktiv" : "") + '"><b>' + x.name + "</b>" + esc(x.titel) + "<br><small>" + schritte + "</small></div>";
    }).join("") + "</div>";
  }

  function unterschiedeHtml(r) {
    var f = fragen[frageNr("U1")];
    var werte = antworten.U1 || {};
    var html = "";
    var zeilen = f.bereiche.filter(function (b) { return werte[b.id] !== "nz"; }).map(function (b) {
      var w = werte[b.id], balken = "";
      if (typeof w === "number") { for (var k = 1; k <= 4; k++) balken += "<i" + (k <= w ? ' class="an"' : "") + "></i>"; }
      return '<div class="bereichszeile"><span>' + esc(b.text) + "</span>" +
        (typeof w === "number" ? '<div class="bereichsskala" aria-label="' + esc(f.skala.filter(function (s) { return s.wert === w; })[0].text) + '">' + balken + "</div>" : "<small>weiß nicht</small>") +
        "</div>";
    });
    if (zeilen.length) {
      html += '<div class="bereichsband">' + zeilen.join("") +
        '<div class="bereichsachse"><span></span><div><span>Noch gar nicht</span><span>Vereinzelt</span><span>Regelmäßig</span><span>Systematisch</span></div></div></div>';
    }
    var bild = fragen[frageNr("U2")].optionen.filter(function (o) { return o.wert === r.menschen; })[0];
    if (bild && bild.punkte) {
      html += '<div class="karte" style="display:grid;grid-template-columns:minmax(0,1fr) 132px;gap:16px;align-items:center">' +
        '<p style="margin:0"><span class="kleinlabel">Die Menschen bei euch</span><strong>' + esc(bild.text) + "</strong> – " + esc(bild.erklaerung) + "</p>" + punkteSvg(bild.punkte) + "</div>";
    }
    var S = I.spreizung;
    if (r.spreizungGross) {
      S.gross.forEach(function (t) { html += "<p>" + t + "</p>"; });
      if (r.menschen === "lager") html += "<p>" + S.lager + "</p>";
    } else if (r.spreizungUnbekannt) {
      html += "<p>" + S.unbekannt + "</p>";
    } else {
      html += "<p>" + S.klein + "</p>";
    }
    if (zahl("K2") === 1) html += "<p>" + S.wenigAustausch + "</p>";
    if (antworten.U3 === "nein") html += "<p>" + S.ehrenamtNein + "</p>";
    return html;
  }

  function duHtml(r) {
    var D = I.du, teile = [];
    var rolle = antworten.P1, haltung = antworten.P4;
    if (rolle === "leitung") teile.push(r.phase === "A" ? D.leitungA : D.leitungBC);
    if (rolle === "koordination") teile.push(D.koordination);
    teile.push(D[r.vergleich]);
    if (haltung === "kritisch" || haltung === "unsicher" || haltung === "neugierig") teile.push(D[haltung]);
    return teile.slice(0, 3).map(function (t) { return "<p>" + t + "</p>"; }).join("");
  }

  function schrittHtml(id) {
    var s = I.schritte[id];
    var ziel = leitfadenLink(s.ziel);
    var wohin = s.ziel === "leitlinien" ? "Zur Leitlinien-Vorlage" : "Im Leitfaden: " + s.label;
    return '<li class="' + (s.warnung ? "warnung" : "") + '"><div><p>' + esc(s.text) + "</p>" +
      '<span class="verweis"><a href="' + ziel + '" target="_blank" rel="noopener">&gt; ' + esc(wohin) + "</a></span></div></li>";
  }

  function angeboteHtml(r) {
    var A = I.angebote, haupt, neben = [];
    if (r.gesamt === null || r.gesamt <= 2.5) {
      haupt = r.menschenGross ? "lernreise" : "selbstlernkurs";
      neben = [haupt === "lernreise" ? "selbstlernkurs" : "lernreise"];
    } else {
      haupt = "erstberatung";
      if (r.dim.kompetenzen !== null && r.dim.kompetenzen <= 2) neben = ["selbstlernkurs", "lernreise"];
    }
    var h = A[haupt];
    var html = '<div class="angebot-haupt"><span class="kleinlabel">Meine Empfehlung für euch</span>' +
      "<h3>" + esc(h.titel) + "</h3>" +
      '<p class="angebot-format">' + esc(ersetze(h.format)) + "</p>" +
      "<p>" + esc(h.text) + "</p>" +
      '<a class="knopf' + (haupt === "erstberatung" ? "" : " knopf--orange") + '" href="' + link(h.link) + '" target="_blank" rel="noopener">&gt; ' + esc(h.knopf) + "</a></div>";
    if (neben.length) {
      html += '<div class="angebote-neben">' + neben.map(function (n) {
        var x = A[n];
        return '<div class="karte"><h3>' + esc(x.titel) + "</h3><p>" + esc(ersetze(x.format)) + '</p><a href="' + link(x.link) + '" target="_blank" rel="noopener">&gt; ' + esc(x.knopf) + "</a></div>";
      }).join("") + "</div>";
    }
    html += '<p style="margin-top:16px">Du willst auf dem Laufenden bleiben? <a href="' + link("newsletter") + '" target="_blank" rel="noopener">&gt; Newsletter abonnieren</a></p>';
    return html;
  }

  function ergebnis() {
    position = fragen.length;
    var r = auswerten();
    var schritte = schritteWaehlen(r);
    var phase = I.phasen[r.phase];
    var heute = new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
    var L = I.lernschleife;

    var html =
      '<section class="hero">' +
        '<div class="hero-text">' +
          '<span class="label">Dein Ergebnis</span>' +
          "<h1>Hier steht eure Organisation</h1>" +
          '<p class="unterzeile">Standortbestimmung vom ' + heute + "</p>" +
          '<div class="strich"></div>' +
        "</div>" +
        '<img class="hero-bild" src="bilder/drache-fernglas.png" alt="Drache mit Fernglas">' +
      "</section>" +

      '<div class="kernsatz"><span class="kleinlabel">' + (r.uebergang ? "Am Übergang von Phase " + r.uebergang[0] + " zu " + r.uebergang[1] : phase.name) + "</span>" +
        "<p>" + esc(kernsatz(r)) + "</p></div>" +
      '<p class="zusammenfassung">' + zusammenfassung(r) + "</p>" +

      '<section class="abschnitt"><h2>Eure Phase</h2>' +
        "<p>Der Leitfaden zur KI-Einführung beschreibt drei Schleifen, in denen Organisationen lernen. Jede Schleife baut auf der vorigen auf – und wird immer wieder ausgewertet.</p>" +
        phasenHtml(r) +
        "<p>" + esc(phase.text) + "</p>" +
        (r.uebergang ? "<p>Weil ihr am Übergang steht, lohnt es sich, den Blick schon auf " + phaseText(r.uebergang[1]) + " zu richten – und zu prüfen, ob in " + phaseText(r.uebergang[0]) + " noch etwas offen ist.</p>" : "") +
      "</section>" +

      '<section class="abschnitt"><h2>Euer Profil</h2>' +
        "<p>So sieht es in den vier Bereichen des KI-Reifegradmodells aus. Die Stufen reichen von 1 (Initiierung) bis 5 (Optimierung).</p>" +
        profilHtml(r) +
      "</section>" +

      '<section class="abschnitt"><h2>Wie unterschiedlich ihr seid</h2>' + unterschiedeHtml(r) + "</section>" +

      '<section class="abschnitt"><h2>Und du?</h2>' + duHtml(r) + "</section>" +

      '<section class="abschnitt"><h2>Eure nächsten Schritte</h2>' +
        (schritte.engpass.length ?
          '<div class="rahmen"><span class="kleinlabel">Zuerst: euer Engpass ' + esc(r.engpass.titel) + "</span>" +
          '<ol class="schrittliste">' + schritte.engpass.map(schrittHtml).join("") + "</ol></div>" : "") +
        "<p>" + (schritte.engpass.length ? "Danach" : "Diese Schritte") + " passen zu eurem Stand – ausgewählt nach deinen Antworten. Was ihr schon habt, ist nicht dabei.</p>" +
        '<ol class="schrittliste">' + schritte.haupt.map(schrittHtml).join("") + "</ol>" +
      "</section>" +

      '<section class="abschnitt"><h2>' + esc(L.titel) + "</h2>" +
        '<div class="schleife"><div>' +
          "<p>" + L.text + "</p>" +
          '<ul class="chevronliste">' + L.fragen.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" +
          '<div class="karte"><span class="kleinlabel">Tipp</span><p>' + esc(L.tipp) + "</p></div>" +
        '</div><img src="bilder/spirale-agil.jpg" alt="Spirale: ausprobieren, auswerten, ausweiten – in Schleifen lernen"></div>' +
      "</section>" +

      '<section class="abschnitt"><h2>So kann ich euch unterstützen</h2>' + angeboteHtml(r) + "</section>" +

      '<section class="abschnitt"><h2>Zum Weiterlesen</h2><ul class="chevronliste">' +
        '<li><a href="' + link("reifegradmodell") + '" target="_blank" rel="noopener">KI-Reifegradmodell</a> – alle Stufen und Arbeitsbereiche auf zwei Seiten</li>' +
        '<li><a href="' + link("leitfaden") + "#" + phase.anker + '" target="_blank" rel="noopener">Leitfaden zur KI-Einführung</a> – die drei Phasen und sieben Schritte mit Checklisten, direkt bei ' + phase.name + "</li>" +
        '<li><a href="' + link("leitlinien") + '" target="_blank" rel="noopener">Leitlinien-Vorlage für die KI-Nutzung</a> – eine eigene, laufend aktualisierte Vorlage für eure Regeln</li>' +
      "</ul></section>" +

      '<div class="ergebnis-aktionen">' +
        '<button class="knopf" type="button" id="drucken">&gt; Ergebnis als PDF speichern</button>' +
        '<button class="knopf knopf--leise" type="button" id="neu">Neu beginnen</button>' +
      "</div>" +
      '<p class="hinweis-fluechtig">Deine Antworten wurden nicht gespeichert. Wenn du diese Seite schließt, sind sie weg. Im Druckdialog kannst du „Als PDF speichern“ wählen.</p>';

    anzeigen(html);
    document.getElementById("drucken").addEventListener("click", function () { window.print(); });
    document.getElementById("neu").addEventListener("click", function () {
      if (window.confirm("Neu beginnen? Deine bisherigen Antworten werden gelöscht.")) { antworten = {}; start(); }
    });
  }

  start();
})();
