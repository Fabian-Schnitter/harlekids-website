# 🎪 Decap CMS + Netlify Setup-Anleitung

## Übersicht

Diese Anleitung zeigt euch, wie ihr eure Harlekids-Website **komplett kostenlos** mit Decap CMS und Netlify hostet.

### Was ihr bekommt:

- ✅ Kostenlose Website-Hosting
- ✅ Automatisches Deployment
- ✅ Benutzerfreundliches Admin-Panel
- ✅ Event-/Termin-Verwaltung
- ✅ Blog-Verwaltung
- ✅ Bild-Upload
- ✅ SSL-Zertifikat (HTTPS)
- ✅ Eigene Domain möglich

### Kosten:

- **0€/Monat** (nur Domain optional ~10-15€/Jahr)

---

## Teil 1: GitHub Repository erstellen

### Schritt 1: GitHub Account erstellen (falls noch nicht vorhanden)

1. Geht zu [github.com](https://github.com)
2. Klickt auf **"Sign up"**
3. Erstellt einen Account (kostenlos)

### Schritt 2: Repository erstellen

1. Loggt euch in GitHub ein
2. Klickt oben rechts auf das **"+"** Symbol
3. Wählt **"New repository"**
4. **Repository name:** `harlekids-website`
5. **Visibility:** Public (für kostenloses Netlify)
6. ❌ **NICHT** "Initialize this repository with a README" ankreuzen
7. Klickt auf **"Create repository"**

### Schritt 3: Lokales Projekt mit GitHub verbinden

Öffnet ein Terminal in eurem Projekt-Ordner und führt folgende Befehle aus:

```bash
# Git initialisieren (falls noch nicht geschehen)
git init

# Alle Dateien hinzufügen
git add .

# Ersten Commit erstellen
git commit -m "Initial commit - Harlekids Website"

# GitHub Repository verbinden (URL von eurer GitHub-Seite kopieren)
git remote add origin https://github.com/EUER-USERNAME/harlekids-website.git

# Hochladen
git branch -M main
git push -u origin main
```

✅ **Fertig!** Euer Code ist jetzt auf GitHub.

---

## Teil 2: Decap CMS installieren und konfigurieren

### Schritt 1: Decap CMS Paket installieren

```bash
npm install decap-cms-app
```

### Schritt 2: Admin-Ordner erstellen

Erstellt folgende Dateien im `public` Ordner:

**`public/admin/index.html`**

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Harlekids CMS</title>
	</head>
	<body>
		<script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
	</body>
</html>
```

**`public/admin/config.yml`**

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  # TERMINE / EVENTS
  - name: "termine"
    label: "Termine"
    folder: "src/content/termine"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "Titel", name: "title", widget: "string" }
      - { label: "Datum", name: "date", widget: "datetime" }
      - {
          label: "Startzeit",
          name: "startTime",
          widget: "string",
          required: false,
        }
      - { label: "Endzeit", name: "endTime", widget: "string", required: false }
      - {
          label: "Kategorie",
          name: "category",
          widget: "select",
          options:
            [
              "Workshop",
              "Aufführung",
              "Ferienprogramm",
              "Training",
              "Sonstiges",
            ],
        }
      - { label: "Ort", name: "location", widget: "string", required: false }
      - { label: "Beschreibung", name: "description", widget: "markdown" }
      - { label: "Bild", name: "image", widget: "image", required: false }
      - { label: "Preis", name: "price", widget: "string", required: false }
      - {
          label: "Anmeldung erforderlich",
          name: "registrationRequired",
          widget: "boolean",
          default: false,
        }
      - {
          label: "Anmeldelink",
          name: "registrationLink",
          widget: "string",
          required: false,
        }
      - {
          label: "Veröffentlicht",
          name: "published",
          widget: "boolean",
          default: true,
        }

  # BLOG-POSTS
  - name: "blog"
    label: "Blog"
    folder: "src/content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "Titel", name: "title", widget: "string" }
      - { label: "Veröffentlichungsdatum", name: "date", widget: "datetime" }
      - { label: "Autor", name: "author", widget: "string" }
      - {
          label: "Kategorie",
          name: "category",
          widget: "select",
          options: ["Neuigkeiten", "Events", "Projekte", "Tipps"],
        }
      - { label: "Titelbild", name: "image", widget: "image" }
      - { label: "Kurzbeschreibung", name: "excerpt", widget: "text" }
      - { label: "Inhalt", name: "body", widget: "markdown" }
      - {
          label: "Veröffentlicht",
          name: "published",
          widget: "boolean",
          default: true,
        }

  # FERIENPROGRAMME
  - name: "ferienprogramme"
    label: "Ferienprogramme"
    folder: "src/content/ferienprogramme"
    create: true
    slug: "{{year}}-{{slug}}"
    fields:
      - { label: "Titel", name: "title", widget: "string" }
      - {
          label: "Ferien",
          name: "vacation",
          widget: "select",
          options:
            [
              "Sommerferien",
              "Herbstferien",
              "Winterferien",
              "Osterferien",
              "Pfingstferien",
            ],
        }
      - { label: "Jahr", name: "year", widget: "number" }
      - { label: "Startdatum", name: "startDate", widget: "datetime" }
      - { label: "Enddatum", name: "endDate", widget: "datetime" }
      - { label: "Beschreibung", name: "description", widget: "markdown" }
      - { label: "Bild", name: "image", widget: "image" }
      - { label: "Preis", name: "price", widget: "string" }
      - { label: "Altersgruppe", name: "ageGroup", widget: "string" }
      - {
          label: "Max. Teilnehmer",
          name: "maxParticipants",
          widget: "number",
          required: false,
        }
      - {
          label: "Anmeldelink",
          name: "registrationLink",
          widget: "string",
          required: false,
        }
      - {
          label: "Veröffentlicht",
          name: "published",
          widget: "boolean",
          default: true,
        }

  # EINSTELLUNGEN
  - name: "settings"
    label: "Einstellungen"
    files:
      - label: "Kontakt"
        name: "contact"
        file: "src/content/settings/contact.json"
        fields:
          - { label: "Telefon", name: "phone", widget: "string" }
          - { label: "E-Mail", name: "email", widget: "string" }
          - { label: "Adresse", name: "address", widget: "text" }
          - {
              label: "Facebook URL",
              name: "facebook",
              widget: "string",
              required: false,
            }
          - {
              label: "Instagram URL",
              name: "instagram",
              widget: "string",
              required: false,
            }
          - {
              label: "YouTube URL",
              name: "youtube",
              widget: "string",
              required: false,
            }
```

### Schritt 3: Content-Ordner erstellen

Erstellt diese Ordnerstruktur:

```
src/content/
  ├── termine/
  ├── blog/
  ├── ferienprogramme/
  └── settings/
      └── contact.json
```

**`src/content/settings/contact.json`** (Beispiel):

```json
{
	"phone": "+49 123 456789",
	"email": "info@harlekids.de",
	"address": "Musterstraße 123\n12345 Musterstadt",
	"facebook": "https://facebook.com/harlekids",
	"instagram": "https://instagram.com/harlekids",
	"youtube": ""
}
```

### Schritt 4: Änderungen zu GitHub pushen

```bash
git add .
git commit -m "Add Decap CMS configuration"
git push
```

---

## Teil 3: Netlify Account erstellen und Website deployen

### Schritt 1: Netlify Account erstellen

1. Geht zu [netlify.com](https://www.netlify.com)
2. Klickt auf **"Sign up"**
3. Wählt **"Sign up with GitHub"**
4. Autorisiert Netlify mit eurem GitHub-Account

### Schritt 2: Website deployen

1. Im Netlify Dashboard klickt auf **"Add new site"** → **"Import an existing project"**
2. Wählt **"Deploy with GitHub"**
3. Wählt euer Repository: **`harlekids-website`**
4. **Build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Klickt auf **"Deploy site"**

⏳ Netlify baut jetzt eure Website (dauert 1-2 Minuten)

✅ **Fertig!** Eure Website ist jetzt live unter einer URL wie: `https://random-name-123.netlify.app`

### Schritt 3: Eigene Domain verbinden (optional)

1. Kauft eine Domain bei einem Anbieter (z.B. namecheap.com, ionos.de)
2. In Netlify: **Site settings** → **Domain management** → **Add custom domain**
3. Gebt eure Domain ein (z.B. `harlekids.de`)
4. Folgt den Anweisungen zum DNS-Setup
5. Netlify erstellt automatisch ein SSL-Zertifikat (HTTPS)

---

## Teil 4: Decap CMS aktivieren (Git Gateway)

### Schritt 1: Identity Service aktivieren

1. In Netlify Dashboard → **Site settings** → **Identity**
2. Klickt auf **"Enable Identity"**

### Schritt 2: Git Gateway aktivieren

1. Scrollt runter zu **"Services"**
2. Klickt auf **"Enable Git Gateway"**

### Schritt 3: Registrierung konfigurieren

1. **Identity** → **Settings and usage**
2. **Registration preferences:** Wählt **"Invite only"** (sicherer!)
3. **External providers:** Optional könnt ihr Google/GitHub Login aktivieren

### Schritt 4: Ersten Admin-User einladen

1. **Identity** Tab → **"Invite users"**
2. Gebt eure E-Mail ein
3. Ihr bekommt eine Einladungs-Mail
4. Klickt auf den Link und setzt ein Passwort

---

## Teil 5: CMS nutzen - Erste Schritte

### Admin-Panel öffnen

Eure Website URL + `/admin`, z.B.:

```
https://eure-website.netlify.app/admin
```

### Login

- Loggt euch mit dem vorher gesetzten Passwort ein

### Ersten Event erstellen

1. Klickt links auf **"Termine"**
2. Klickt auf **"New Termine"**
3. Füllt das Formular aus:
   - Titel: "Zirkus-Workshop Frühlingsferien"
   - Datum: 15.04.2026
   - Kategorie: Workshop
   - Beschreibung: ...
   - Bild hochladen
4. Klickt auf **"Publish"**

✅ Der Event ist jetzt gespeichert!

### Ersten Blog-Post erstellen

1. Klickt links auf **"Blog"**
2. Klickt auf **"New Blog"**
3. Füllt das Formular aus
4. Klickt auf **"Publish"**

---

## Teil 6: Website-Code für Decap CMS anpassen

Jetzt müssen wir die React-Komponenten anpassen, damit sie die Daten aus den CMS-Dateien laden.

### Schritt 1: Hilfs-Funktion zum Laden der Content-Dateien

**`src/utils/contentLoader.js`** (neue Datei erstellen):

```javascript
// Lade alle Event-Dateien
export const loadEvents = async () => {
	const eventFiles = import.meta.glob("/src/content/termine/*.md", {
		eager: true,
		as: "raw",
	});
	const events = [];

	for (const path in eventFiles) {
		const content = eventFiles[path];
		const frontmatter = parseFrontmatter(content);
		events.push(frontmatter);
	}

	// Nach Datum sortieren (neueste zuerst)
	return events.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Lade alle Blog-Posts
export const loadBlogPosts = async () => {
	const blogFiles = import.meta.glob("/src/content/blog/*.md", {
		eager: true,
		as: "raw",
	});
	const posts = [];

	for (const path in blogFiles) {
		const content = blogFiles[path];
		const frontmatter = parseFrontmatter(content);
		posts.push(frontmatter);
	}

	return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Lade Ferienprogramme
export const loadFerienprogramme = async () => {
	const ferienFiles = import.meta.glob("/src/content/ferienprogramme/*.md", {
		eager: true,
		as: "raw",
	});
	const programme = [];

	for (const path in ferienFiles) {
		const content = ferienFiles[path];
		const frontmatter = parseFrontmatter(content);
		programme.push(frontmatter);
	}

	return programme;
};

// Lade Kontakt-Einstellungen
export const loadContactSettings = async () => {
	try {
		const settings = await import("/src/content/settings/contact.json");
		return settings.default;
	} catch (error) {
		console.error("Kontakt-Einstellungen konnten nicht geladen werden:", error);
		return {};
	}
};

// Einfacher Frontmatter Parser
function parseFrontmatter(content) {
	const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

	if (!match) return { body: content };

	const frontmatterText = match[1];
	const body = match[2];

	const frontmatter = {};
	frontmatterText.split("\n").forEach((line) => {
		const [key, ...valueParts] = line.split(":");
		if (key && valueParts.length) {
			const value = valueParts.join(":").trim();
			// Entferne Anführungszeichen
			frontmatter[key.trim()] = value.replace(/^["']|["']$/g, "");
		}
	});

	frontmatter.body = body.trim();
	return frontmatter;
}
```

### Schritt 2: Termine-Seite anpassen

Öffnet `src/pages/Termine.jsx` und passt sie an, damit Events aus CMS geladen werden:

```jsx
import { useState, useEffect } from "react";
import Section from "../components/Section";
import Card from "../components/Card";
import Button from "../components/Button";
import {
	FaCalendar,
	FaClock,
	FaMapMarkerAlt,
	FaEuroSign,
} from "react-icons/fa";
import { loadEvents } from "../utils/contentLoader";

function Termine() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadEvents().then((data) => {
			// Nur veröffentlichte Events anzeigen
			const publishedEvents = data.filter(
				(event) => event.published !== "false"
			);
			setEvents(publishedEvents);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-xl">Lade Termine...</p>
			</div>
		);
	}

	return (
		<div className="pt-16">
			{/* Hero Section */}
			<Section className="bg-gradient-to-r from-circus-red to-circus-yellow text-white py-20">
				<div className="text-center">
					<h1 className="text-5xl font-bold mb-4">Termine & Events</h1>
					<p className="text-xl max-w-2xl mx-auto">
						Entdeckt unsere kommenden Workshops, Aufführungen und
						Veranstaltungen
					</p>
				</div>
			</Section>

			{/* Events Liste */}
			<Section>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{events.length === 0 ? (
						<p className="col-span-full text-center text-gray-500">
							Derzeit sind keine Termine verfügbar.
						</p>
					) : (
						events.map((event, index) => (
							<Card key={index} className="flex flex-col">
								{event.image && (
									<img
										src={event.image}
										alt={event.title}
										className="w-full h-48 object-cover rounded-t-lg mb-4"
									/>
								)}

								<span className="inline-block px-3 py-1 bg-circus-blue text-white text-sm rounded-full mb-3 self-start">
									{event.category}
								</span>

								<h3 className="text-2xl font-bold mb-3">{event.title}</h3>

								<div className="space-y-2 mb-4 text-gray-600">
									<div className="flex items-center gap-2">
										<FaCalendar className="text-circus-red" />
										<span>
											{new Date(event.date).toLocaleDateString("de-DE")}
										</span>
									</div>

									{event.startTime && (
										<div className="flex items-center gap-2">
											<FaClock className="text-circus-blue" />
											<span>
												{event.startTime}{" "}
												{event.endTime && `- ${event.endTime}`} Uhr
											</span>
										</div>
									)}

									{event.location && (
										<div className="flex items-center gap-2">
											<FaMapMarkerAlt className="text-circus-green" />
											<span>{event.location}</span>
										</div>
									)}

									{event.price && (
										<div className="flex items-center gap-2">
											<FaEuroSign className="text-circus-yellow" />
											<span>{event.price}</span>
										</div>
									)}
								</div>

								<div
									className="text-gray-700 mb-4 flex-grow"
									dangerouslySetInnerHTML={{ __html: event.description }}
								/>

								{event.registrationRequired === "true" &&
									event.registrationLink && (
										<Button
											as="a"
											href={event.registrationLink}
											variant="primary"
											className="mt-auto"
										>
											Jetzt anmelden
										</Button>
									)}
							</Card>
						))
					)}
				</div>
			</Section>
		</div>
	);
}

export default Termine;
```

### Schritt 3: Blog-Seite anpassen

Ähnlich für `src/pages/Blog.jsx` - ich kann das auch für euch erstellen!

---

## Teil 7: Workflow - So arbeitet ihr täglich

### Für Entwickler (mit Code-Zugriff):

1. **Lokale Änderungen machen**

   ```bash
   # Code bearbeiten
   git add .
   git commit -m "Beschreibung der Änderung"
   git push
   ```

2. **Netlify deployed automatisch** (dauert 1-2 Minuten)

### Für Content-Manager (ohne Code-Kenntnisse):

1. **Admin-Panel öffnen:** `https://eure-website.netlify.app/admin`
2. **Einloggen**
3. **Inhalte bearbeiten:**
   - Neuen Event erstellen
   - Blog-Post schreiben
   - Bilder hochladen
   - Kontaktdaten ändern
4. **"Publish" klicken**
5. **Fertig!** Website aktualisiert sich automatisch

---

## Teil 8: Weitere Benutzer hinzufügen

1. Netlify Dashboard → **Identity** → **"Invite users"**
2. E-Mail eingeben
3. User bekommt Einladungs-Mail
4. User setzt Passwort
5. User kann sich im Admin-Panel einloggen

---

## Zusammenfassung

### ✅ Was ihr jetzt habt:

- Kostenlose Website-Hosting bei Netlify
- Benutzerfreundliches CMS für Events, Blog, Bilder
- Automatisches Deployment bei jeder Änderung
- SSL/HTTPS inklusive
- Eigene Domain möglich

### 💰 Kosten:

- **0€/Monat** (Domain optional ~10-15€/Jahr)

### 🎯 Nächste Schritte:

1. GitHub Repository erstellen
2. Code hochladen
3. Netlify Account erstellen
4. Website deployen
5. Decap CMS aktivieren
6. Ersten Admin-User anlegen
7. Inhalte verwalten! 🎪

---

## Hilfe & Support

### Häufige Probleme:

**Build schlägt fehl:**

- Checkt die Build-Logs in Netlify
- Stellt sicher, dass `package.json` alle Dependencies enthält

**CMS lädt nicht:**

- Checkt ob Git Gateway aktiviert ist
- Checkt ob Identity aktiviert ist

**Änderungen erscheinen nicht:**

- Wartet 1-2 Minuten (Build-Zeit)
- Leert Browser-Cache (Strg+Shift+R)

### Dokumentation:

- **Decap CMS:** https://decapcms.org/docs/
- **Netlify:** https://docs.netlify.com/

Bei Fragen: GitHub Issues erstellen oder Netlify Support kontaktieren (sehr hilfsbereit!)

---

**Viel Erfolg mit eurer neuen Harlekids-Website! 🎪🎉**
