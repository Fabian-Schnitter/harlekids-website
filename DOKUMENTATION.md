# Harlekids Website - Dokumentation

## 📋 Inhaltsverzeichnis

1. [Projektübersicht](#projektübersicht)
2. [Website-Analyse](#website-analyse)
3. [Technologie-Stack](#technologie-stack)
4. [Installation & Setup](#installation--setup)
5. [Projektstruktur](#projektstruktur)
6. [CMS-Integration](#cms-integration)
7. [Deployment](#deployment)
8. [Wartung & Pflege](#wartung--pflege)
9. [Design & Optimierungen](#design--optimierungen)

---

## 🎪 Projektübersicht

Die neue Harlekids-Website ist eine moderne, responsive React-Anwendung für das Zirkuspädagogische Zentrum Harlekids. Die Website behält die Identität und das Farbschema der bestehenden Website bei, bietet aber eine frischere, modernere Benutzererfahrung.

### Hauptziele

- ✅ Modernes, frisches Design
- ✅ Responsive (Mobile/Tablet/Desktop)
- ✅ Barrierefreie Gestaltung
- ✅ Einfache Content-Verwaltung über CMS
- ✅ Schnelle Ladezeiten
- ✅ SEO-optimiert

---

## 🔍 Website-Analyse

### Aktuelle Website (zpz-harlekids.de)

**Stärken:**

- ✅ Klare Navigationsstruktur
- ✅ Umfangreiche Informationen zu allen Angeboten
- ✅ Sympathisches, authentisches Farbschema
- ✅ Aktiver Blog mit regelmäßigen Updates

**Schwächen:**

- ❌ Veraltetes Design
- ❌ Nicht vollständig responsive
- ❌ Langsame Ladezeiten
- ❌ Unübersichtliche Startseite
- ❌ Fehlende moderne Elemente (Hero-Section, CTA-Buttons)

### Neue Website - Verbesserungen

1. **Startseite**

   - Große Hero-Section mit emotionalem Bild
   - Klare Call-to-Actions
   - Übersichtliche Angebots-Karten
   - "Warum Zirkus?" Section
   - Blog-Teaser

2. **Navigation**

   - Sticky Navigation
   - Mobile-optimiertes Burger-Menü
   - Schnelle Zugänglichkeit

3. **Unterseiten**

   - Strukturierte Informationen
   - Visuelle Highlights
   - Einfache Anmeldeprozesse
   - Bildergalerien

4. **Performance**
   - Lazy Loading für Bilder
   - Optimierte Asset-Größen
   - Schnelle Renderzeiten

---

## 🛠 Technologie-Stack

### Frontend

- **React 19.1.1** - UI-Framework
- **React Router DOM 7.x** - Client-side Routing
- **Tailwind CSS 4.x** - Utility-first CSS Framework
- **React Icons** - Icon-Bibliothek
- **Vite 7.x** - Build Tool & Dev Server

### Empfohlenes CMS

- **Strapi** (bevorzugt) oder **Contentful**
- Beide sind Headless CMS-Lösungen
- Einfache Bedienung für nicht-technische Nutzer
- REST API Integration

### Deployment-Optionen

- **Vercel** (empfohlen) - Einfach, schnell, kostenlos
- **Netlify** - Alternative mit ähnlichen Features
- **GitHub Pages** - Für statische Deployment
- **Eigener Server** - Mit Node.js

---

## 🚀 Installation & Setup

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn
- Git

### Schritt 1: Repository klonen

```bash
git clone https://github.com/[IHR-USERNAME]/harlekids-website.git
cd harlekids-website
```

### Schritt 2: Dependencies installieren

```bash
npm install
```

### Schritt 3: Entwicklungsserver starten

```bash
npm run dev
```

Die Website ist jetzt unter `http://localhost:5173` erreichbar.

### Schritt 4: Build für Produktion

```bash
npm run build
```

Der fertige Build befindet sich im `dist/` Ordner.

### Schritt 5: Produktion-Build testen

```bash
npm run preview
```

---

## 📁 Projektstruktur

```
harlekids-website/
├── public/                  # Statische Dateien (Bilder, Icons)
├── src/
│   ├── assets/             # Bilder, Logos, etc.
│   ├── components/         # Wiederverwendbare Komponenten
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   └── Section.jsx
│   ├── pages/              # Seiten-Komponenten
│   │   ├── Blog.jsx
│   │   ├── Ferien.jsx
│   │   ├── Herberge.jsx
│   │   ├── Home.jsx
│   │   ├── Jugendzirkus.jsx
│   │   ├── Kontakt.jsx
│   │   ├── Termine.jsx
│   │   └── Zirkuspaedagogik.jsx
│   ├── App.css             # Globale Styles
│   ├── App.jsx             # Haupt-App-Komponente mit Routing
│   ├── index.css           # Tailwind Imports
│   └── main.jsx            # Entry Point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js      # Tailwind Konfiguration (Farben!)
└── vite.config.js
```

---

## 🎨 CMS-Integration

**WICHTIG:** Die CMS-Integration ist vorbereitet, aber noch NICHT implementiert. Alle Stellen sind mit `// CMS NOTE:` Kommentaren markiert.

### Option 1: Strapi (Empfohlen)

#### Strapi Installation

```bash
# In einem separaten Ordner
npx create-strapi-app@latest harlekids-cms
cd harlekids-cms
npm run develop
```

#### Content Types in Strapi erstellen

1. **Blog Posts**

   - title (Text)
   - date (Date)
   - author (Text)
   - category (Enumeration)
   - excerpt (Text)
   - content (Rich Text)
   - image (Media)

2. **Events/Termine**

   - title (Text)
   - date (Text/Date)
   - time (Text)
   - location (Text)
   - category (Enumeration)
   - description (Text)
   - image (Media)
   - spotsLeft (Number)

3. **Training Groups**

   - name (Text)
   - age (Text)
   - day (Text)
   - time (Text)
   - location (Text)
   - description (Text)
   - level (Text)

4. **Hero Section**
   - title (Text)
   - subtitle (Text)
   - backgroundImage (Media)
   - primaryCTA_text (Text)
   - primaryCTA_link (Text)
   - secondaryCTA_text (Text)
   - secondaryCTA_link (Text)

#### Integration in React

```javascript
// Beispiel: Blog-Posts laden
import { useEffect, useState } from "react";

const Blog = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("http://localhost:1337/api/posts?populate=*")
			.then((res) => res.json())
			.then((data) => {
				setPosts(data.data);
				setLoading(false);
			})
			.catch((error) => console.error("Error:", error));
	}, []);

	if (loading) return <div>Laden...</div>;

	return (
		<div>
			{posts.map((post) => (
				<Card key={post.id}>
					<h3>{post.attributes.title}</h3>
					<p>{post.attributes.excerpt}</p>
				</Card>
			))}
		</div>
	);
};
```

### Option 2: Contentful

#### Contentful Setup

1. Account erstellen auf contentful.com
2. Space erstellen
3. Content Models anlegen (siehe oben)
4. API Keys generieren

#### Environment Variables

Erstelle eine `.env` Datei:

```
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token
```

#### Installation

```bash
npm install contentful
```

#### Integration

```javascript
import { createClient } from "contentful";

const client = createClient({
	space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
	accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

// Posts laden
const posts = await client.getEntries({ content_type: "blogPost" });
```

### CMS-Bedienung für Mitarbeitende

#### Strapi-Oberfläche

1. **Login:** `http://localhost:1337/admin`
2. **Neuen Blog-Post erstellen:**

   - Content Manager → Blog Posts → "Create new entry"
   - Felder ausfüllen
   - Bild hochladen
   - "Save" und "Publish" klicken

3. **Event/Termin bearbeiten:**

   - Content Manager → Events
   - Eintrag auswählen
   - Änderungen vornehmen
   - "Save" klicken

4. **Bilder verwalten:**
   - Media Library
   - Upload via Drag & Drop
   - Verwendete Bilder werden automatisch verknüpft

**Wichtig:** Ohne technisches Wissen möglich! Intuitive Oberfläche.

---

## 🌐 Deployment

### Option 1: Vercel (Empfohlen)

#### Erstmaliges Setup

1. Account erstellen auf vercel.com
2. GitHub Repository verbinden
3. Import-Settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy klicken

#### Automatische Deploys

- Jeder Push auf `main` Branch löst automatisch Deployment aus
- Preview-Deployments für Pull Requests

#### Custom Domain

- Vercel Dashboard → Domain Settings
- Domain hinzufügen und DNS konfigurieren

### Option 2: Netlify

```bash
# Netlify CLI installieren
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Option 3: Eigener Server

```bash
# Build erstellen
npm run build

# dist/ Ordner auf Server hochladen (z.B. via FTP)
# Nginx/Apache konfigurieren
```

#### Nginx Beispiel-Konfiguration

```nginx
server {
    listen 80;
    server_name zpz-harlekids.de;
    root /var/www/harlekids-website/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🔧 Wartung & Pflege

### Regelmäßige Aufgaben

#### Bilder hinzufügen/austauschen

1. Über CMS hochladen ODER
2. In `src/assets/` speichern und Pfad in Komponente ändern

#### Texte ändern

- **Mit CMS:** Direkt im CMS bearbeiten
- **Ohne CMS:** In der jeweiligen Seiten-Datei (`src/pages/`)

#### Farben anpassen

- Datei: `tailwind.config.js`
- Section: `theme.extend.colors`

```javascript
colors: {
  'circus-red': '#E63946',
  'circus-blue': '#457B9D',
  'circus-yellow': '#F4A261',
}
```

### Dependencies aktualisieren

```bash
# Prüfen auf Updates
npm outdated

# Updates installieren
npm update

# Oder interaktiv
npx npm-check-updates -u
npm install
```

### Fehlerbehandlung

#### Website lädt nicht

1. Konsole im Browser öffnen (F12)
2. Fehler prüfen
3. `npm run dev` im Terminal prüfen

#### Build schlägt fehl

```bash
# Cache löschen
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

---

## 🎨 Design & Optimierungen

### Farbschema (Harlekids)

Das Farbschema wurde von der aktuellen Website übernommen:

- **Rot (#E63946):** Hauptfarbe für CTAs, Akzente, wichtige Elemente
- **Blau (#457B9D):** Sections, Überschriften, ruhigere Bereiche
- **Gelb/Orange (#F4A261):** Highlights, Badges, warme Akzente
- **Grün (#2A9D8F):** Ergänzungsfarbe für Vielfalt

### Typografie

- System-Font-Stack für beste Performance
- Klare Hierarchie (h1-h6)
- Gute Lesbarkeit auf allen Geräten

### Responsivität

#### Breakpoints (Tailwind)

- `sm`: 640px (Tablets hoch)
- `md`: 768px (Tablets quer)
- `lg`: 1024px (Laptops)
- `xl`: 1280px (Desktops)

### Barrierefreiheit

#### Implementiert

- ✅ Semantisches HTML
- ✅ Alt-Texte für Bilder
- ✅ Keyboard-Navigation
- ✅ Focus-Styles
- ✅ Kontrastreiche Farben
- ✅ ARIA-Labels wo nötig

#### Best Practices

- Überschriften-Hierarchie einhalten
- Links deutlich erkennbar
- Formulare mit Labels
- Fehlermeldungen klar formuliert

### Performance-Optimierungen

#### Bilder

- **Format:** WebP mit JPEG-Fallback
- **Größe:** Max. 1920px Breite
- **Kompression:** 80% Qualität
- **Lazy Loading:** Native browser lazy loading

```html
<img loading="lazy" src="image.jpg" alt="Beschreibung" />
```

#### Code Splitting

- React Router macht automatisches Code Splitting
- Jede Route lädt nur benötigten Code

### SEO-Optimierungen

#### Meta Tags (in index.html)

```html
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta
		name="description"
		content="Zirkuspädagogisches Zentrum Harlekids - Zirkus für Kinder und Jugendliche in Brandenburg"
	/>
	<meta
		name="keywords"
		content="Zirkus, Zirkuspädagogik, Kinder, Jugendliche, Brandenburg, Harlekids"
	/>
	<meta name="author" content="Harlekids e.V." />

	<!-- Open Graph -->
	<meta property="og:title" content="Harlekids - Zirkuspädagogisches Zentrum" />
	<meta
		property="og:description"
		content="Zirkuspädagogik für Kinder und Jugendliche"
	/>
	<meta property="og:image" content="https://zpz-harlekids.de/og-image.jpg" />
	<meta property="og:url" content="https://zpz-harlekids.de" />

	<title>Harlekids - Zirkuspädagogisches Zentrum</title>
</head>
```

#### Sitemap generieren

```bash
# Nach dem Build
npm run build
# Sitemap-Generator nutzen (optional)
```

---

## 📸 Bild-Empfehlungen

### Stil & Stimmung

- **Authentisch:** Echte Fotos von Harlekids-Events
- **Lebendig:** Kinder in Aktion, Bewegung, Freude
- **Farbenfroh:** Zirkus-typische bunte Elemente
- **Emotional:** Gesichter, Interaktionen, Momente

### Wo Bilder benötigt werden

1. **Hero-Section (Startseite)**

   - Größe: 1920x1080px
   - Motiv: Gruppe beim Zirkus, Luftaufnahme Zelt

2. **Angebots-Karten**

   - Größe: 800x600px
   - Motive: Spezifisch je Angebot (Jonglage, Akrobatik, etc.)

3. **Blog-Beiträge**

   - Größe: 800x500px
   - Motive: Event-bezogen

4. **Team/Trainer**
   - Größe: 400x400px (quadratisch)
   - Motive: Portraits

### Bild-Quellen

- **Eigene Fotos:** Am besten!
- **Unsplash.com:** Kostenlose Stock-Fotos (aktuell genutzt als Platzhalter)
- **Pexels.com:** Alternative zu Unsplash

---

## 🔐 Sicherheit & Datenschutz

### DSGVO-Compliance

#### Erforderliche Seiten

1. **Impressum** (erstellen!)
2. **Datenschutzerklärung** (erstellen!)
3. **Cookie-Banner** (bei Tracking)

#### Formulare

- Datenschutz-Checkbox bei Kontaktformular
- SSL-Verschlüsselung (HTTPS)
- Keine unnötigen Daten sammeln

### Environment Variables

Sensible Daten NIEMALS im Code!

```bash
# .env Datei (NICHT committen!)
VITE_API_URL=https://api.example.com
VITE_CMS_TOKEN=your_secret_token
```

```javascript
// Verwendung
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🆘 Support & Hilfe

### Häufige Fragen

**Q: Wie füge ich eine neue Seite hinzu?**
A:

1. Neue Datei in `src/pages/` erstellen
2. In `src/App.jsx` Route hinzufügen
3. In `src/components/Navbar.jsx` Link hinzufügen

**Q: Wie ändere ich die Farben?**
A: In `tailwind.config.js` unter `theme.extend.colors`

**Q: Wie deploye ich Updates?**
A: Bei Vercel/Netlify: Einfach `git push` - automatisches Deployment!

### Weiterführende Ressourcen

- [React Dokumentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Strapi Dokumentation](https://docs.strapi.io/)
- [Vercel Docs](https://vercel.com/docs)

### Kontakt

Bei technischen Fragen:

- GitHub Issues erstellen
- E-Mail an den Entwickler

---

## 📝 Nächste Schritte

### Sofort

1. ✅ Lokale Entwicklung testen
2. ⬜ Eigene Bilder hinzufügen
3. ⬜ Kontaktdaten anpassen
4. ⬜ CMS wählen und einrichten

### Kurzfristig

5. ⬜ Domain registrieren/vorbereiten
6. ⬜ Hosting/Deployment einrichten
7. ⬜ Impressum & Datenschutz erstellen
8. ⬜ Google Analytics/Matomo einrichten (optional)

### Langfristig

9. ⬜ Team-Seite mit Mitarbeiter-Profilen
10. ⬜ Bildergalerie ausbauen
11. ⬜ Newsletter-System integrieren
12. ⬜ Online-Anmeldeformulare erweitern

---

**Viel Erfolg mit der neuen Harlekids-Website! 🎪✨**
