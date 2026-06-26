#!/usr/bin/env python3
"""Fix broken SEO imports — move generateToolMetadata import + metadata export
after ALL imports (including multi-line imports like lucide-react)."""
import os, re

BASE = "/root/projects/toolinter/src/app"

# All pages that need generateToolMetadata
pages = [
    ("gaji/bersih", "Kalkulator Gaji Bersih", "Hitung take home pay setelah potongan PPh21, BPJS Kesehatan, dan BPJS Ketenagakerjaan."),
    ("gaji/pph21", "Kalkulator PPh21", "Hitung pajak penghasilan PPh21 bulanan dan tahunan sesuai tarif progresif Indonesia."),
    ("gaji/thr", "Kalkulator THR", "Hitung tunjangan hari raya (THR) berdasarkan masa kerja dan gaji terakhir."),
    ("gaji/bpjs", "Kalkulator BPJS", "Hitung iuran BPJS Kesehatan dan BPJS Ketenagakerjaan."),
    ("gaji/lembur", "Kalkulator Lembur", "Hitung upah lembur sesuai UU Ketenagakerjaan Indonesia."),
    ("gaji/prorata", "Kalkulator Gaji Prorata", "Hitung gaji prorata untuk karyawan yang masuk/tengah bulan."),
    ("keuangan/kpr", "Kalkulator KPR", "Simulasi cicilan KPR rumah: hitung cicilan bulanan, total bunga, dan amortisasi."),
    ("keuangan/pinjol", "Kalkulator Pinjol OJK", "Simulasi pinjaman online legal OJK: hitung cicilan, bunga, dan total bayar."),
    ("keuangan/cek-npwp", "Cek Format NPWP", "Validasi format nomor NPWP Indonesia secara online."),
    ("umkm/hpp", "Kalkulator HPP", "Hitung Harga Pokok Penjualan (HPP) produk UMKM Anda secara gratis."),
    ("umkm/harga-jual", "Kalkulator Harga Jual", "Tentukan harga jual produk berdasarkan HPP dan margin keuntungan."),
    ("umkm/food-cost", "Kalkulator Food Cost", "Hitung food cost percentage untuk bisnis kuliner dan restoran."),
    ("umkm/invoice", "Generator Invoice", "Buat invoice profesional untuk UMKM. Download PDF langsung."),
    ("umkm/catatan", "Catatan Keuangan UMKM", "Catat pemasukan dan pengeluaran usaha. Download laporan PDF."),
    ("umkm/margin-marketplace", "Kalkulator Margin Marketplace", "Hitung margin keuntungan jual di Tokopedia, Shopee, dan marketplace lain."),
    ("foto/resize-3x4", "Resize Foto 3x4 Online", "Ubah ukuran pas foto 3x4 untuk dokumen, CPNS, SNBP, dan lamaran kerja."),
    ("foto/resize-4x6", "Resize Foto 4x6 Online", "Ubah ukuran pas foto 4x6 untuk dokumen resmi."),
    ("foto/ktp", "Panduan Foto KTP", "Panduan ukuran dan format foto KTP elektronik (e-KTP)."),
    ("foto/kompres", "Kompres Foto Online", "Kecilkan ukuran foto tanpa blur. Langsung di browser."),
    ("foto/resize-2x3", "Resize Foto 2x3 Online", "Ubah ukuran pas foto 2x3 untuk dokumen."),
    ("foto/snbp", "Panduan Foto SNBP", "Panduan ukuran foto untuk pendaftaran SNBP."),
    ("foto/cpns", "Panduan Foto CPNS", "Panduan ukuran foto untuk pendaftaran CPNS."),
    ("pdf/kompres", "Kompres PDF Online", "Kecilkan ukuran PDF tanpa mengurangi kualitas."),
    ("pdf/gabung", "Gabung PDF Online", "Gabungkan beberapa file PDF jadi satu."),
    ("pdf/word-ke-pdf", "Word ke PDF", "Konversi dokumen Word (DOCX) ke PDF online."),
    ("pdf/pdf-ke-word", "PDF ke Word", "Konversi PDF ke dokumen Word (DOCX) online."),
    ("pdf/foto-ke-pdf", "Foto ke PDF", "Ubah foto/jadi PDF. Bisa gabung beberapa foto."),
    ("pdf/halaman", "Atur Halaman PDF", "Pisah, hapus, dan atur ulang halaman PDF."),
]

def find_import_end(lines):
    """Find the last line that's part of an import block (including multi-line imports)."""
    last_import_line = 0
    in_import = False
    brace_depth = 0
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        
        if stripped.startswith("import "):
            in_import = True
            last_import_line = i
            brace_depth = stripped.count("{") - stripped.count("}")
            if "{" not in stripped or brace_depth == 0:
                in_import = False
            continue
        
        if in_import:
            last_import_line = i
            brace_depth += stripped.count("{") - stripped.count("}")
            if brace_depth <= 0:
                in_import = False
    
    return last_import_line

def fix_page(slug, title, desc):
    path = os.path.join(BASE, slug, "page.tsx")
    if not os.path.exists(path):
        return "MISS"
    
    with open(path, "r") as f:
        content = f.read()
    
    # Remove any existing broken generateToolMetadata lines
    # Remove the import line if it's inside a multi-line import block
    content = re.sub(r'\nimport \{ generateToolMetadata \} from "@/lib/seo";\n', '\n', content)
    # Remove existing metadata export block if present
    content = re.sub(
        r'\nexport const metadata = generateToolMetadata\(\{[^}]*\}\);\n',
        '\n',
        content
    )
    
    lines = content.split("\n")
    
    # Find where imports end
    import_end = find_import_end(lines)
    
    # Generate metadata block
    meta_import = 'import { generateToolMetadata } from "@/lib/seo";'
    meta_export = f"""
export const metadata = generateToolMetadata({{
  title: "{title}",
  description: "{desc}",
  path: "/{slug}",
}});
"""
    
    # Insert after import block
    lines.insert(import_end + 1, meta_import)
    lines.insert(import_end + 2, meta_export)
    
    with open(path, "w") as f:
        f.write("\n".join(lines))
    
    return "OK"

updated = 0
for slug, title, desc in pages:
    result = fix_page(slug, title, desc)
    if result == "OK":
        updated += 1
    print(f"{result} {slug}")

print(f"\nFixed: {updated}")
