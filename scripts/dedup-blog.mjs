import fs from "node:fs";

const path = "src/data/blog.ts";
const raw = fs.readFileSync(path, "utf8");

// Split header (interfaces + declaration) from the array literal.
const marker = "export const blogPosts: BlogPost[] = ";
const idx = raw.indexOf(marker);
if (idx === -1) throw new Error("marker not found");
const header = raw.slice(0, idx);
let arrayLiteral = raw.slice(idx + marker.length).trim();
if (arrayLiteral.endsWith(";")) arrayLiteral = arrayLiteral.slice(0, -1);

// The array literal is pure data (object/array/string literals) — safe to eval.
const posts = new Function(`return (${arrayLiteral});`)();
console.log("Loaded posts:", posts.length);

// 1) Keep only originals (slug without -hari-N suffix).
const originals = posts.filter((p) => !/-hari-\d+$/.test(p.slug));
console.log("Originals kept:", originals.length);
console.log("Clones removed:", posts.length - originals.length);

// 2) Fix template-bleed. Common corruption: title text injected into "Apa Itu ..." / "Surat <title> adalah".
let fixed = 0;
const titleWord = (t) => t.replace(/\s*\[\d{4}\].*$/, "").trim();

for (const p of originals) {
  const before = JSON.stringify(p.content);
  for (const sec of p.content) {
    if (sec.heading) {
      // "Apa Itu Surat Cara membuat resign?" -> collapse duplicated lead-in
      sec.heading = sec.heading
        .replace(/Apa Itu Surat Cara [Mm]embuat /g, "Apa Itu Surat ")
        .replace(/Apa Itu Cara [Mm]embuat /g, "Apa Itu ")
        .replace(/\bSurat [Cc]ara [Mm]embuat /g, "Surat ")
        .replace(/\bcara membuat resign\b/gi, "resign")
        .replace(/\s{2,}/g, " ")
        .trim();
    }
    if (Array.isArray(sec.paragraphs)) {
      sec.paragraphs = sec.paragraphs.map((para) =>
        para
          .replace(/\bSurat cara membuat resign\b/gi, "Surat resign")
          .replace(/\bsurat cara membuat resign\b/gi, "surat resign")
          .replace(/\bcara membuat resign adalah dokumen resmi\b/gi, "surat resign adalah dokumen resmi")
          .replace(/\s{2,}/g, " ")
      );
    }
  }
  if (JSON.stringify(p.content) !== before) fixed++;
}
console.log("Articles with template-bleed fixed:", fixed);

// 3) Serialize back. Keep it as clean JSON data with the original header/interfaces.
const out =
  header +
  marker +
  JSON.stringify(originals, null, 2) +
  ";\n";

fs.writeFileSync(path, out, "utf8");
console.log("Written:", path, "size:", fs.statSync(path).size);
