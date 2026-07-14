#!/usr/bin/env node
/**
 * publish-article.mjs — WORDPRESS-STYLE publish (NO rebuild).
 *
 * Menulis artikel langsung ke persistent-data/posts.json (volume persisten).
 * Halaman blog force-dynamic → artikel LANGSUNG live tanpa build/deploy.
 *
 * Usage: node scripts/publish-article.mjs path/to/article.json
 * article.json boleh 1 objek atau array objek.
 *
 * Guard: dedup slug, min 400 kata, min 4 section (anti thin-content/doorway).
 * Exit: 0 sukses, 1 validasi/dup gagal, 2 error file.
 */
import fs from "node:fs";
import path from "node:path";

const STORE = path.join(process.cwd(), "persistent-data/posts.json");
const REQUIRED = ["slug", "title", "excerpt", "category", "ctaLabel", "ctaHref", "content"];
const VALID_CAT = ["Surat", "CV", "Foto", "Gaji", "Keuangan", "PDF", "UMKM"];

function fail(msg, code = 1) { console.error("ERROR: " + msg); process.exit(code); }

const inFile = process.argv[2];
if (!inFile || !fs.existsSync(inFile)) fail(`file artikel tidak ditemukan: ${inFile}`, 2);
if (!fs.existsSync(STORE)) fail(`store tidak ditemukan: ${STORE} (volume persistent-data belum ter-mount?)`, 2);

let incoming;
try { incoming = JSON.parse(fs.readFileSync(inFile, "utf-8")); }
catch (e) { fail("JSON artikel tidak valid: " + e.message, 2); }
if (!Array.isArray(incoming)) incoming = [incoming];
if (incoming.length === 0) fail("tidak ada artikel di input");

let posts;
try { posts = JSON.parse(fs.readFileSync(STORE, "utf-8")); }
catch (e) { fail("posts.json korup: " + e.message, 2); }

const existingSlugs = new Set(posts.map((p) => p.slug));
const today = new Date().toISOString().split("T")[0];
const added = [];

for (const a of incoming) {
  for (const k of REQUIRED) {
    if (!a[k] || (k === "content" && !Array.isArray(a.content))) fail(`artikel '${a.slug || "?"}' kurang field: ${k}`);
  }
  if (!VALID_CAT.includes(a.category)) fail(`kategori invalid '${a.category}'`);
  if (existingSlugs.has(a.slug)) { console.warn(`SKIP duplikat slug: ${a.slug}`); continue; }
  if (a.content.length < 4) fail(`artikel '${a.slug}' <4 section — thin content`);
  const words = a.content.flatMap((s) => s.paragraphs || []).join(" ").split(/\s+/).length;
  if (words < 400) fail(`artikel '${a.slug}' ~${words} kata (<400) — thin content`);

  posts.unshift({
    slug: a.slug, title: a.title, excerpt: a.excerpt, date: today,
    category: a.category, readTime: a.readTime || `${Math.max(3, Math.round(words / 200))} menit`,
    ctaLabel: a.ctaLabel, ctaHref: a.ctaHref, content: a.content,
    status: "published", metaDescription: a.metaDescription || a.excerpt,
    focusKeyword: a.focusKeyword || "", tags: a.tags || [], author: a.author || "Toolinter",
    featuredImage: a.featuredImage || "", ogImage: a.ogImage || "", views: 0,
  });
  existingSlugs.add(a.slug);
  added.push(a.slug);
}

if (added.length === 0) { console.log("Tidak ada artikel baru (semua duplikat)."); process.exit(0); }

// Backup + atomic write
fs.copyFileSync(STORE, STORE + ".bak-" + today.replace(/-/g, ""));
const tmp = STORE + ".tmp";
fs.writeFileSync(tmp, JSON.stringify(posts, null, 2));
fs.renameSync(tmp, STORE);

console.log(`OK: ${added.length} artikel PUBLISHED (live tanpa rebuild), tanggal ${today}:`);
added.forEach((s) => console.log(`  + https://toolinter.net/blog/${s}`));
console.log(`Total artikel sekarang: ${posts.length}`);
