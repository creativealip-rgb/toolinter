#!/usr/bin/env python3
import os, re

BASE = "/root/projects/toolinter/src/app"

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

updated = 0
for slug, title, desc in pages:
    path = os.path.join(BASE, slug, "page.tsx")
    if not os.path.exists(path):
        print(f"MISS {slug}")
        continue
    
    with open(path, "r") as f:
        content = f.read()
    
    if "generateToolMetadata" in content:
        print(f"SKIP {slug}")
        continue
    
    lines = content.split("\n")
    
    # Add import after last import line
    last_import = 0
    for i, line in enumerate(lines):
        if line.strip().startswith("import "):
            last_import = i
    
    lines.insert(last_import + 1, 'import { generateToolMetadata } from "@/lib/seo";')
    
    # Find insertion point for metadata (after imports, before first code)
    meta_insert = last_import + 2
    for i in range(last_import + 2, len(lines)):
        stripped = lines[i].strip()
        if stripped and not stripped.startswith("//") and not stripped.startswith("import ") and not stripped.startswith("'use"):
            meta_insert = i
            break
    
    # Check if there's already a metadata export (replace it)
    existing_meta = -1
    for i in range(len(lines)):
        if "export const metadata" in lines[i]:
            existing_meta = i
            break
    
    meta_block = [
        "",
        "export const metadata = generateToolMetadata({",
        f'  title: "{title}",',
        f'  description: "{desc}",',
        f'  path: "/{slug}",',
        "});",
        "",
    ]
    
    if existing_meta >= 0:
        # Find end of existing metadata block
        brace = 0
        end = existing_meta
        for i in range(existing_meta, len(lines)):
            for c in lines[i]:
                if c == "{": brace += 1
                elif c == "}": brace -= 1
            if brace == 0:
                end = i
                break
        lines[existing_meta:end+1] = meta_block
    else:
        for j, ml in enumerate(meta_block):
            lines.insert(meta_insert + j, ml)
    
    with open(path, "w") as f:
        f.write("\n".join(lines))
    
    updated += 1
    print(f"OK {slug}")

print(f"\nTotal: {updated} updated")
