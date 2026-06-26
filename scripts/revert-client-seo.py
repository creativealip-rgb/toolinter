#!/usr/bin/env python3
"""Remove generateToolMetadata from 'use client' pages — not supported in Next.js 16."""
import os, re

BASE = "/root/projects/toolinter/src/app"

client_pages = [
    "gaji/bersih", "gaji/pph21", "gaji/thr", "gaji/bpjs", "gaji/lembur", "gaji/prorata",
    "keuangan/kpr", "keuangan/pinjol", "keuangan/cek-npwp",
    "umkm/hpp", "umkm/harga-jual", "umkm/food-cost", "umkm/invoice", "umkm/catatan", "umkm/margin-marketplace",
    "foto/resize-3x4", "foto/resize-4x6", "foto/ktp", "foto/kompres", "foto/resize-2x3", "foto/snbp", "foto/cpns",
    "pdf/kompres", "pdf/gabung", "pdf/word-ke-pdf", "pdf/pdf-ke-word", "pdf/foto-ke-pdf", "pdf/halaman",
]

fixed = 0
for slug in client_pages:
    path = os.path.join(BASE, slug, "page.tsx")
    if not os.path.exists(path):
        continue
    
    with open(path, "r") as f:
        content = f.read()
    
    if "'use client'" not in content:
        continue
    
    # Remove generateToolMetadata import
    content = re.sub(r'\nimport \{ generateToolMetadata \} from "@/lib/seo";\n', '\n', content)
    
    # Remove metadata export block
    content = re.sub(
        r'\nexport const metadata = generateToolMetadata\(\{[^}]*\}\);\n',
        '\n',
        content
    )
    
    # Clean up extra blank lines
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    # Fix broken multi-line imports (extra blank lines after opening brace)
    content = re.sub(r'(import \{)\n\n+(\s+\w)', r'\1\n\2', content)
    
    with open(path, "w") as f:
        f.write(content)
    
    fixed += 1
    print(f"OK {slug}")

print(f"\nReverted: {fixed}")
