# 🎪 Harlekids Website

Moderne, responsive Website für das Zirkuspädagogische Zentrum Harlekids.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.15-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.1.11-646CFF?logo=vite)

## 🚀 Quick Start

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Build für Produktion
npm run build

# Produktion-Build testen
npm run preview
```

Website läuft auf: **http://localhost:5173**

## 📚 Dokumentation

- **[DOKUMENTATION.md](./DOKUMENTATION.md)** - Vollständige technische Dokumentation
- **[WEBSITE-ANALYSE.md](./WEBSITE-ANALYSE.md)** - Analyse der aktuellen Website

## 🎨 Features

✅ Modernes, frisches Design  
✅ Vollständig responsive (Mobile/Tablet/Desktop)  
✅ Barrierefreie Gestaltung (WCAG AA)  
✅ Optimierte Performance  
✅ SEO-optimiert  
✅ CMS-Ready (Strapi/Contentful)  
✅ Harlekids-Farbschema beibehalten

## 📂 Struktur

```
src/
├── components/     # Wiederverwendbare UI-Komponenten
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   └── Section.jsx
├── pages/          # Seiten
│   ├── Home.jsx
│   ├── Termine.jsx
│   ├── Zirkuspaedagogik.jsx
│   ├── Jugendzirkus.jsx
│   ├── Ferien.jsx
│   ├── Herberge.jsx
│   ├── Kontakt.jsx
│   └── Blog.jsx
├── App.jsx         # Hauptkomponente mit Routing
└── main.jsx        # Entry Point
```

## 🎨 Farbschema

Die Website verwendet das authentische Harlekids-Farbschema:

- **Rot (#E63946)** - Hauptfarbe für CTAs und Akzente
- **Blau (#457B9D)** - Sections und Überschriften
- **Gelb (#F4A261)** - Highlights und Badges
- **Grün (#2A9D8F)** - Ergänzungsfarbe

Konfiguriert in `tailwind.config.js`

## 🔧 CMS-Integration

Die Website ist vorbereitet für ein Headless CMS (Strapi oder Contentful).  
**Alle CMS-Integrationspunkte sind mit `// CMS NOTE:` Kommentaren markiert.**

Details zur CMS-Einrichtung: Siehe [DOKUMENTATION.md](./DOKUMENTATION.md#cms-integration)

## 📦 Deployment

### Vercel (Empfohlen)

1. Repository auf GitHub pushen
2. Mit Vercel verbinden
3. Automatisches Deployment bei jedem Push

### Netlify

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

Details: Siehe [DOKUMENTATION.md](./DOKUMENTATION.md#deployment)

## 🛠️ Technologien

- **React 19.1.1** - UI Framework
- **React Router DOM** - Client-side Routing
- **Tailwind CSS 4.x** - Styling
- **React Icons** - Icon Library
- **Vite 7.x** - Build Tool

## 📝 Nächste Schritte

1. ⬜ Eigene Bilder in `src/assets/` hinzufügen
2. ⬜ Kontaktdaten in `src/pages/Kontakt.jsx` anpassen
3. ⬜ CMS einrichten (siehe Dokumentation)
4. ⬜ Domain konfigurieren
5. ⬜ Deployment einrichten

## 📖 Seiten

- **/** - Startseite mit Hero, Über uns, Angeboten
- **/termine** - Veranstaltungen und Termine
- **/zirkuspaedagogik** - Fortbildungsangebote
- **/jugendzirkus** - Kinder- und Jugendzirkus
- **/ferien** - Ferienprogramme
- **/herberge** - Jugendherberge
- **/kontakt** - Kontaktformular und Infos
- **/blog** - News und Aktuelles

## 🎯 Design-Prinzipien

- **Mobile First** - Optimiert für mobile Geräte
- **Accessibility** - WCAG AA konform
- **Performance** - Schnelle Ladezeiten
- **User Experience** - Intuitive Navigation
- **Content Focus** - Inhalte im Vordergrund

## 🤝 Support

Bei Fragen zur Website:

- Siehe [DOKUMENTATION.md](./DOKUMENTATION.md)
- GitHub Issues erstellen

## 📄 Lizenz

© 2025 Harlekids e.V. Alle Rechte vorbehalten.

---

**Entwickelt mit ❤️ für Harlekids** 🎪

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
