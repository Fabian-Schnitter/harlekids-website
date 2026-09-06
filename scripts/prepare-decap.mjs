import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(
	projectRoot,
	"node_modules/decap-cms/dist/decap-cms.js",
);
const destination = resolve(projectRoot, "public/admin/decap-cms.js");
const mediaDirectory = resolve(projectRoot, "public/uploads");

await mkdir(dirname(destination), { recursive: true });
await mkdir(mediaDirectory, { recursive: true });
await copyFile(source, destination);
console.log("Decap CMS wurde für die lokale Auslieferung vorbereitet.");
