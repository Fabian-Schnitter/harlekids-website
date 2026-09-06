import { access, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const outputDirectory = resolve(projectRoot, "src/content/blog");
const apiUrl = "https://www.zpz-harlekids.de/wp-json/wp/v2/posts";

const existingSources = new Set([
	"cosmic-zirkus",
	"endlich-wieder-ferien-im-zirkus",
	"trainingstermine",
]);

const namedEntities = {
	amp: "&",
	apos: "'",
	bdquo: "„",
	gt: ">",
	hellip: "…",
	laquo: "«",
	ldquo: "“",
	lsquo: "‘",
	lt: "<",
	mdash: "—",
	nbsp: " ",
	ndash: "–",
	quot: '"',
	raquo: "»",
	rdquo: "”",
	rsquo: "’",
};

const decodeHtml = (value) =>
	value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, code) => {
		if (code.startsWith("#x")) {
			return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
		}
		if (code.startsWith("#")) {
			return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
		}
		return namedEntities[code.toLowerCase()] ?? entity;
	});

const plainText = (html) =>
	decodeHtml(
		html
			.replace(/<script[\s\S]*?<\/script>/gi, "")
			.replace(/<style[\s\S]*?<\/style>/gi, "")
			.replace(/<[^>]+>/g, " "),
	)
		.replace(/\s+/g, " ")
		.trim();

const normalizeOldLinks = (value) =>
	value
		.replace(
			/https?:\/\/(?:www\.)?zpz-harlekids\.de\/ferienzirkus\/?/gi,
			"/ferien",
		)
		.replace(
			/https?:\/\/(?:www\.)?zpz-harlekids\.de\/(?:kinder-)?jugendzirkus\/?/gi,
			"/jugendzirkus",
		)
		.replace(
			/https?:\/\/(?:www\.)?zpz-harlekids\.de\/kontakt-zu-den-harlekids\/?/gi,
			"/kontakt",
		);

const htmlToMarkdown = (html) => {
	let result = html
		.replace(/<!--[\s\S]*?-->/g, "")
		.replace(/<script[\s\S]*?<\/script>/gi, "")
		.replace(/<style[\s\S]*?<\/style>/gi, "")
		.replace(/\[(?:gallery|ngg)[^\]]*\]/gi, "")
		.replace(/ngg_shortcode_\d+_placeholder/gi, "")
		.replace(/<a\s[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_match, href, label) => {
			const cleanLabel = plainText(label);
			return cleanLabel ? `[${cleanLabel}](${href})` : "";
		})
		.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_match, level, text) => {
			return `${"#".repeat(Math.min(Number(level), 3))} ${plainText(text)}\n\n`;
		})
		.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**")
		.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, "*$2*")
		.replace(/<li[^>]*>/gi, "- ")
		.replace(/<\/li>/gi, "\n")
		.replace(/<br\s*\/?\s*>/gi, "\n")
		.replace(/<\/(p|div|ul|ol|blockquote|figure|figcaption|table|tr)>/gi, "\n\n")
		.replace(/<[^>]+>/g, "");

	result = normalizeOldLinks(decodeHtml(result));
	return result
		.replace(/\u00a0/g, " ")
		.replace(/[ \t]+\n/g, "\n")
		.replace(/\n[ \t]+/g, "\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
};

const categoryFor = (title, body) => {
	const text = `${title} ${body}`.toLowerCase();
	if (/ferien|camp/.test(text)) return "Zirkusferien";
	if (/fortbild|schulung|seminar|juleica|workshop/.test(text)) {
		return "Fortbildungen";
	}
	if (/schule|projektwoche|projektag|projekt\b/.test(text)) return "Projekte";
	if (/trebnitz|kreisau|ausflug|austausch/.test(text)) return "Ausflüge";
	if (/training|kurs|einrad/.test(text)) return "Kurse";
	if (/festival|premiere|vorstellung|weihnacht|benefiz|convention|auftritt/.test(text)) {
		return "Events";
	}
	return "Neuigkeiten";
};

const yamlString = (value) => JSON.stringify(value.replace(/\u0000/g, ""));

const fileExists = async (file) => {
	try {
		await access(file);
		return true;
	} catch {
		return false;
	}
};

await mkdir(outputDirectory, { recursive: true });

const firstResponse = await fetch(`${apiUrl}?per_page=100&page=1`);
if (!firstResponse.ok) {
	throw new Error(`Die alten Beiträge konnten nicht geladen werden (${firstResponse.status}).`);
}

const totalPages = Number(firstResponse.headers.get("x-wp-totalpages") ?? 1);
const posts = await firstResponse.json();
for (let page = 2; page <= totalPages; page += 1) {
	const response = await fetch(`${apiUrl}?per_page=100&page=${page}`);
	if (!response.ok) throw new Error(`Seite ${page} konnte nicht geladen werden.`);
	posts.push(...(await response.json()));
}

let imported = 0;
let skipped = 0;

for (const post of posts) {
	if (existingSources.has(post.slug)) {
		skipped += 1;
		continue;
	}

	const date = post.date.slice(0, 10);
	const destination = resolve(outputDirectory, `${date}-${post.slug}.md`);
	if (await fileExists(destination)) {
		skipped += 1;
		continue;
	}

	const title = plainText(post.title.rendered);
	const body = htmlToMarkdown(post.content.rendered);
	const excerptSource = plainText(post.excerpt.rendered) || plainText(post.content.rendered);
	const excerpt = normalizeOldLinks(
		excerptSource.length > 260
			? `${excerptSource.slice(0, 257).trimEnd()}…`
			: excerptSource,
	);
	const category = categoryFor(title, body);
	const fileContent = `---\ntitle: ${yamlString(title)}\ndate: ${yamlString(post.date)}\nauthor: "Harlekids e.V."\ncategory: ${yamlString(category)}\nexcerpt: ${yamlString(excerpt)}\npublished: true\n---\n\n${body || excerpt}\n`;

	await writeFile(destination, fileContent, "utf8");
	imported += 1;
}

console.log(`${imported} alte Blogbeiträge übernommen, ${skipped} vorhandene übersprungen.`);
