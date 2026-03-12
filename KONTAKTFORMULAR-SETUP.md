# 📧 Kontaktformular Installation - Harlekids

## 🎯 Was ist neu?

Das Kontaktformular wurde komplett überarbeitet mit:

- ✅ **3-facher Spam-Schutz** (Honeypot, Zeit-Check, Keyword-Filter)
- ✅ **PHP-Backend** für euren Variomedia-Server
- ✅ **Live-Feedback** (Loading, Erfolg, Fehler)
- ✅ **E-Mail-Validierung**
- ✅ **Professionelles Design**

---

## 📋 Installation auf Variomedia Server

### Schritt 1: PHP-Datei hochladen

1. **FTP-Programm öffnen** (z.B. FileZilla)
2. **Mit Server verbinden** (Zugangsdaten von Variomedia)
3. **Ordner erstellen:** `/public_html/api/`
4. **Datei hochladen:**
   - Nehmt die Datei: `public/contact.php`
   - Hochladen nach: `/public_html/api/contact.php`

### Schritt 2: E-Mail-Adresse anpassen

Öffnet die `contact.php` auf dem Server und ändert Zeile 31:

```php
// VORHER:
$to = 'info@harlekids.de';

// ÄNDERN ZU EURER E-MAIL:
$to = 'eure-richtige-email@harlekids.de';
```

### Schritt 3: Domain anpassen

Wenn die Website live geht, ändert in `contact.php` Zeile 9:

```php
// Beim Entwickeln:
header('Access-Control-Allow-Origin: https://neu.harlekids.de');

// Wenn live:
header('Access-Control-Allow-Origin: https://harlekids.de');
```

### Schritt 4: React-App anpassen

In `src/pages/Kontakt.jsx` ist bereits die richtige URL eingetragen:

```javascript
const API_URL = "https://harlekids.de/api/contact.php";
```

✅ **Passt!** Muss nicht geändert werden.

---

## 🛡️ Spam-Schutz erklärt

### 1. Honeypot-Feld

- Unsichtbares Feld "website" im Formular
- Echte Menschen sehen es nicht
- Bots füllen es automatisch aus
- → Nachricht wird ignoriert (aber "Erfolg" gemeldet, um Bots zu täuschen)

### 2. Zeit-Check

- Formular misst, wie lange User brauchen
- Weniger als 3 Sekunden = verdächtig schnell = Bot
- → Fehlermeldung

### 3. Keyword-Filter

- Prüft Nachricht auf Spam-Wörter (viagra, casino, bitcoin, etc.)
- Bei Treffer → Nachricht ignoriert, aber "Erfolg" gemeldet
- → Bot merkt nicht, dass er blockiert wurde

### 4. Längen-Limit

- Nachrichten max. 5000 Zeichen
- Verhindert Overload-Angriffe

### 5. E-Mail-Validierung

- Prüft, ob E-Mail gültig ist
- Serverseitig mit PHP `filter_var()`

---

## 🧪 Testen

### Lokal testen (vor Upload):

1. In `Kontakt.jsx` temporär ändern:
   ```javascript
   const API_URL = "http://localhost/contact.php"; // Lokaler Test
   ```
2. XAMPP/MAMP starten
3. `contact.php` in htdocs kopieren
4. Formular testen

### Auf Server testen:

1. PHP-Datei hochgeladen? ✅
2. E-Mail-Adresse angepasst? ✅
3. Website aufrufen: `https://neu.harlekids.de/kontakt`
4. Formular ausfüllen und senden
5. E-Mail sollte ankommen!

### Fehlersuche:

- **Keine E-Mail angekommen?**
  - Spam-Ordner prüfen!
  - PHP-Fehler-Log auf Server prüfen
  - Variomedia-Support kontaktieren (evtl. mail() funktion deaktiviert)

- **CORS-Fehler in Browser-Konsole?**
  - Domain in `contact.php` Zeile 9 prüfen
  - Muss mit Website-URL übereinstimmen

- **500 Fehler?**
  - Datei-Rechte auf Server prüfen (644 oder 755)
  - PHP-Version prüfen (min. PHP 7.0)

---

## 📧 Wie die E-Mail aussieht

```
Von: noreply@harlekids.de
Antworten an: kunde@example.com
Betreff: Kontaktanfrage: Jugendzirkus - Max Mustermann

Neue Kontaktanfrage über die Website
=====================================

Name: Max Mustermann
E-Mail: kunde@example.com
Telefon: 0123 456789
Betreff: Jugendzirkus

Nachricht:
----------
Hallo, ich interessiere mich für den Jugendzirkus
für meine Tochter (10 Jahre). Wann sind die
Trainingszeiten?

=====================================
IP-Adresse: 123.456.789.0
Datum: 12.03.2026 14:35:22
```

---

## 🔧 Weitere Anpassungen

### E-Mail-Template ändern:

In `contact.php` ab Zeile 133 könnt ihr das E-Mail-Format anpassen.

### Betreff-Optionen ändern:

In `Kontakt.jsx` Zeile ~250:

```jsx
<option value="jugendzirkus">Jugendzirkus</option>
<option value="ferien">Zirkusferien</option>
// ... mehr Optionen hinzufügen
```

### Spam-Wörter anpassen:

In `contact.php` Zeile 91:

```php
$spam_words = ['viagra', 'cialis', 'casino', ...];
```

---

## ✅ Checkliste für Go-Live

- [ ] `contact.php` auf Server hochgeladen nach `/api/contact.php`
- [ ] E-Mail-Adresse in PHP angepasst
- [ ] Domain in CORS-Header angepasst
- [ ] Testmail gesendet und erhalten
- [ ] Spam-Ordner geprüft
- [ ] Verschiedene Browser getestet (Chrome, Firefox, Safari)
- [ ] Mobile ansicht getestet

---

## 🆘 Support

Bei Problemen:

1. Browser-Konsole prüfen (F12 → Console)
2. Network-Tab prüfen (Welcher Status-Code?)
3. PHP-Error-Log auf Server prüfen
4. Variomedia-Support kontaktieren

**Viel Erfolg! 🎪**
