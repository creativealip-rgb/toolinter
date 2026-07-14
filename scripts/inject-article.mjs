#!/usr/bin/env node
/**
 * inject-article.mjs — sisipkan artikel baru ke src/data/blog.ts dengan aman.
 *
 * Dipakai mesin artikel harian. Membaca objek artikel dari file JSON (argv[2]),
 * memvalidasi, cek duplikat slug, set tanggal hari ini (status "published"),
 * lalu sisipkan ke awal array blogPosts di blog.ts.
 *
 * Usage: node scripts/inject-article.mjs path/to/article.json
 * article.json boleh 1 objek atau array objek.
 *
 * Exit codes: 0 sukses, 1 error validasi/duplikat, 2 error file.
 */
import fs from "node:fs";
import path from "node:path";

const BLOG = path.join(process.cwd(), "src/data/blog.ts");
const REQUIRED = ["slug", "title", "excerpt", "category", "ctaLabel", "ctaHref", "content"];
const VALID_CAT = ["Surat", "CV", "Foto", "Gaji", "Keuangan", "PDF", "UMKM"];

function fail(msg, code = 1) { console.error("ERROR: " + msg); process.exit(code); }

const inFile = process.argv[2];
if (!inFile || !fs.existsSync(inFile)) fail(`file artikel tidak ditemukan: ${inFile}`, 2);

let incoming;
try { incoming = JSON.parse(fs.readFileSync(inFile, "utf-8")); }
catch (e) { fail("JSON artikel tidak valid: " + e.message, 2); }
if (!Array.isArray(incoming)) incoming = [incoming];
if (incoming.length === 0) fail("tidak ada artikel di input");

const src = fs.readFileSync(BLOG, "utf-8");

// Slug yang sudah ada (hindari duplikat/doorway)
const existingSlugs = new Set([...src.matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]));

const today = new Date().toISOString().split("T")[0];
const toInsert = [];

for (const a of incoming) {
  for (const k of REQUIRED) {
    if (!a[k] || (k === "content" && !Array.isArray(a.content))) fail(`artikel '${a.slug || "?"}' kurang field: ${k}`);
  }
  if (!VALID_CAT.includes(a.category)) fail(`kategori invalid '${a.category}' (harus salah satu: ${VALID_CAT.join(", ")})`);
  if (existingSlugs.has(a.slug)) { console.warn(`SKIP duplikat slug: ${a.slug}`); continue; }
  if (a.content.length < 4) fail(`artikel '${a.slug}' terlalu pendek (<4 section) — hindari thin content`);

  // Word count guard: minimal ~400 kata agar bukan thin content
  const words = a.content.flatMap((s) => s.paragraphs || []).join(" ").split(/\s+/).length;
  if (words < 400) fail(`artikel '${a.slug}' cuma ~${words} kata (<400) — hindari thin content`);

  const post = {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    date: today,
    category: a.category,
    readTime: a.readTime || `${Math.max(3, Math.round(words / 200))} menit`,
    ctaLabel: a.ctaLabel,
    ctaHref: a.ctaHref,
    content: a.content,
    status: "published",
    metaDescription: a.metaDescription || a.excerpt,
    focusKeyword: a.focusKeyword || "",
    tags: a.tags || [],
    author: a.author || "Toolinter",
    featuredImage: a.featuredImage || "",
    ogImage: a.ogImage || "",
    views: 0,
  };
  toInsert.push(post);
  existingSlugs.add(a.slug);
}

if (toInsert.length === 0) { console.log("Tidak ada artikel baru untuk disisipkan (semua duplikat)."); process.exit(0); }

// Sisip setelah "export const blogPosts: BlogPost[] = ["
const marker = "export const blogPosts: BlogPost[] = [";
const idx = src.indexOf(marker);
if (idx === -1) fail("marker array blogPosts tidak ditemukan di blog.ts", 2);
const insertAt = idx + marker.length;

const block = toInsert.map((p) => "\n" + JSON.stringify(p, null, 2).split("\n").map((l) => "  " + l).join("\n") + ",").join("");
const out = src.slice(0, insertAt) + block + src.slice(insertAt);

// Backup + tulis
fs.copyFileSync(BLOG, BLOG + ".bak-inject-" + today.replace(/-/g, ""));
fs.writeFileSync(BLOG, out);

console.log(`OK: ${toInsert.length} artikel disisipkan (tanggal ${today}):`);
toInsert.forEach((p) => console.log(`  + ${p.slug} [${p.category}] → ${p.ctaHref}`));
