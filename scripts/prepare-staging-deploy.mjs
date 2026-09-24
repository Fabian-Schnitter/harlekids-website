import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const siteOrigin = process.env.STAGING_SITE_ORIGIN;
const authUserFile = process.env.STAGING_AUTH_USER_FILE;

if (!siteOrigin?.startsWith("https://")) {
	throw new Error("STAGING_SITE_ORIGIN muss eine HTTPS-Adresse sein.");
}

if (!authUserFile?.startsWith("/homepages/")) {
	throw new Error("STAGING_AUTH_USER_FILE muss ein absoluter Serverpfad sein.");
}

const adminConfigPath = resolve(projectRoot, "dist/admin/config.yml");
const adminConfig = await readFile(adminConfigPath, "utf8");
const stagingHost = new URL(siteOrigin).host;
const stagingAdminConfig = adminConfig
	.replaceAll("https://zpz-harlekids.de", siteOrigin)
	.replaceAll("site_domain: zpz-harlekids.de", `site_domain: ${stagingHost}`);

await writeFile(adminConfigPath, stagingAdminConfig, "utf8");

const htaccessPath = resolve(projectRoot, "dist/.htaccess");
const htaccess = await readFile(htaccessPath, "utf8");
const protection = `# Passwortschutz und Suchmaschinen-Sperre der Testumgebung.
AuthName "Harlekids Testumgebung"
AuthType Basic
AuthUserFile ${authUserFile}
Require valid-user

<IfModule mod_headers.c>
\tHeader always set X-Robots-Tag "noindex, nofollow, noarchive"
</IfModule>

`;

await writeFile(htaccessPath, protection + htaccess, "utf8");
console.log(`Test-Build für ${siteOrigin} wurde geschützt.`);
