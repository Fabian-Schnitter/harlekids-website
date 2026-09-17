# Decap CMS und Variomedia einrichten

Die Website wird bei Variomedia ausgeliefert. Decap CMS verwendet persönliche
GitHub-Konten zur Anmeldung und speichert Änderungen im Repository
`Fabian-Schnitter/harlekids-website`. Netlify wird nicht verwendet.
Die CMS-Oberfläche wird beim Bauen mit in die Website gepackt und ebenfalls
direkt von Variomedia ausgeliefert; es wird kein fremder Skript-Server benötigt.

Für die lokale Entwicklung kann parallel zur Website `npm run cms:local`
gestartet werden. Unter `http://127.0.0.1:5173/admin/` ist dann keine
GitHub-Anmeldung nötig; lokale CMS-Änderungen werden direkt in diesem
Arbeitsordner gespeichert. Auf der veröffentlichten Website bleibt weiterhin
die GitHub-Anmeldung aktiv.

## 1. Mitarbeiter zu GitHub einladen

Jede Person benötigt ein eigenes GitHub-Konto mit aktivierter
Zwei-Faktor-Authentifizierung. Die Konten werden mit Schreibrechten als
Mitwirkende zum Repository eingeladen. Ohne Schreibrecht lehnt der
OAuth-Endpunkt die Anmeldung ab.

## 2. GitHub OAuth App anlegen

Im GitHub-Konto des Repository-Eigentümers unter **Settings → Developer
settings → OAuth Apps → New OAuth App** folgende Werte eintragen:

- Application name: `Harlekids CMS`
- Homepage URL: `https://harlekids.de/admin/`
- Authorization callback URL: `https://harlekids.de/api/decap-callback.php`

Anschließend Client ID und Client Secret kopieren. Das Secret niemals in dieses
Repository oder in das öffentliche Web-Verzeichnis schreiben.

Der Login fordert ausschließlich Zugriff auf öffentliche Repositories an. Falls
das CMS schon einmal mit der früheren Berechtigung `repo` verwendet wurde, muss
jede betroffene Person die **Harlekids CMS** OAuth-App einmal unter **GitHub →
Settings → Applications → Authorized OAuth Apps** widerrufen und sich danach
neu anmelden. Erst dann ist der Zugriff auf private Repositories sicher entfernt.

## 3. OAuth-Konfiguration bei Variomedia hinterlegen

Die mitgelieferte `.htaccess` stellt die Domain bei Variomedia auf PHP 8.4.
Diese unterstützte PHP-Version wird für den sicheren Login-Endpunkt verwendet.

Die Vorlage `server-config/harlekids-oauth.example.php` kopieren, in
`harlekids-oauth.php` umbenennen und mit Client ID sowie Client Secret füllen.
Die Datei kommt außerhalb des Web-Verzeichnisses in einen Ordner `private`.

Beispiel bei einem Web-Verzeichnis `/pfad/zur/domain`:

```text
/pfad/zur/private/harlekids-oauth.php
/pfad/zur/domain/index.html
```

Der PHP-Prozess muss die Datei lesen können; andere Benutzer sollten keine
Leserechte erhalten. Falls der Serveraufbau abweicht, kann der absolute Pfad
über die Server-Umgebungsvariable `DECAP_OAUTH_CONFIG` gesetzt werden.

## 4. Automatische Übertragung aktivieren

Im Variomedia-Kundenmenü beim Paket unter **FTP/SFTP/SSH** zuerst den
SSH-Zugang aktivieren und einen eigenen SSH-Schlüssel für die automatische
Übertragung hinterlegen.

Im GitHub-Repository unter **Settings → Secrets and variables → Actions** diese
Secrets hinterlegen:

- `VARIOMEDIA_SSH_HOST`
- `VARIOMEDIA_SSH_USER`
- `VARIOMEDIA_SSH_PORT` (optional, Standard: `22`)
- `VARIOMEDIA_DEPLOY_PATH` (genauer absoluter Web-Pfad)
- `VARIOMEDIA_SSH_PRIVATE_KEY`
- `VARIOMEDIA_SSH_KNOWN_HOSTS`

Danach unter **Variables** die Variable `ENABLE_VARIOMEDIA_DEPLOY` mit dem Wert
`true` anlegen. Vorher baut und prüft die Aktion die Website, überträgt aber
nichts. Der bekannte SSH-Hostschlüssel muss aus einer vertrauenswürdigen Quelle
stammen und darf nicht blind während des Deployments ermittelt werden.

Die automatische Übertragung überschreibt gleichnamige Website-Dateien, löscht
aber vorsichtshalber keine anderen Dateien auf dem Variomedia-Webspace.

## 5. Funktion prüfen

1. `https://harlekids.de/admin/` öffnen.
2. Mit einem eingeladenen GitHub-Konto anmelden.
3. Einen Testbeitrag speichern und veröffentlichen.
4. In GitHub unter **Actions** den erfolgreichen Build und Upload prüfen.
5. Kontrollieren, ob der Beitrag auf der Website sichtbar ist.

## 6. Kontaktformular aktivieren

Das Formular versendet Nachrichten über das Variomedia-Postfach
`info@zpz-harlekids.de`. Die benötigte Mailer-Bibliothek wird beim automatischen
Build installiert und zusammen mit der Website übertragen.

Die Vorlage `server-config/harlekids-contact.example.php` kopieren, in
`harlekids-contact.php` umbenennen und nur das echte Passwort des Postfachs
eintragen. Die Datei anschließend neben der OAuth-Konfiguration außerhalb des
Web-Verzeichnisses im Ordner `private` ablegen:

```text
/pfad/zur/private/harlekids-contact.php
/pfad/zur/private/harlekids-oauth.php
/pfad/zur/domain/index.html
```

Das Passwort darf weder in GitHub noch im öffentlichen Web-Verzeichnis liegen.
Falls der Serveraufbau abweicht, kann der absolute Dateipfad über die
Server-Umgebungsvariable `HARLEKIDS_CONTACT_CONFIG` gesetzt werden.

Danach eine Testnachricht über die veröffentlichte Kontaktseite senden, den
Posteingang sowie den Spam-Ordner prüfen und direkt auf die Nachricht antworten.
