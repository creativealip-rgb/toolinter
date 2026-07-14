import fs from "node:fs";
import path from "node:path";

// Proper human titles for wrap-layout routes (those had ugly derived titles).
const fixes = {
  "/foto/resize-3x4": "Resize Foto 3x4 Online",
  "/foto/resize-4x6": "Resize Foto 4x6 Online",
  "/foto/kompres": "Kompres Foto Online",
  "/foto/cpns": "Foto CPNS Sesuai SSCASN",
  "/foto/snbp": "Foto SNBP/SNBT",
  "/foto/ktp": "Foto KTP & Dokumen",
  "/pdf/gabung": "Gabung PDF Online",
  "/pdf/kompres": "Kompres PDF Online",
  "/pdf/pdf-ke-word": "Konversi PDF ke Word",
  "/pdf/word-ke-pdf": "Konversi Word ke PDF",
  "/pdf/foto-ke-pdf": "Konversi Foto ke PDF",
  "/pdf/halaman": "Atur & Hapus Halaman PDF",
  "/umkm/hpp": "Kalkulator HPP UMKM",
  "/umkm/harga-jual": "Kalkulator Harga Jual Produk",
  "/umkm/food-cost": "Kalkulator Food Cost",
  "/umkm/margin-marketplace": "Kalkulator Margin Marketplace",
  "/umkm/invoice": "Generator Invoice UMKM",
  "/umkm/catatan": "Catatan Keuangan UMKM",
};

let updated = 0;
for (const [route, title] of Object.entries(fixes)) {
  const layoutPath = path.join("src/app", route.slice(1), "layout.tsx");
  if (!fs.existsSync(layoutPath)) continue;
  let c = fs.readFileSync(layoutPath, "utf8");
  const re = new RegExp(`(<BreadcrumbJsonLd toolPath="${route.replace(/[/-]/g, "\\$&")}" title=)"[^"]*"`);
  if (re.test(c)) {
    c = c.replace(re, `$1${JSON.stringify(title)}`);
    fs.writeFileSync(layoutPath, c, "utf8");
    updated++;
    console.log("FIXED:", route, "→", title);
  }
}
console.log("\nTotal:", updated);
