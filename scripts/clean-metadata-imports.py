#!/usr/bin/env python3
"""Remove unused Metadata import from server pages that now use generateToolMetadata."""
import os, re

BASE = "/root/projects/toolinter/src/app"

files = [
    "umkm/hpp", "umkm/harga-jual", "umkm/food-cost", "umkm/invoice", "umkm/catatan", "umkm/margin-marketplace",
    "foto/resize-3x4", "foto/resize-4x6", "foto/ktp", "foto/kompres", "foto/resize-2x3", "foto/snbp", "foto/cpns",
    "pdf/kompres", "pdf/gabung", "pdf/word-ke-pdf", "pdf/pdf-ke-word", "pdf/foto-ke-pdf", "pdf/halaman",
]

fixed = 0
for slug in files:
    path = os.path.join(BASE, slug, "page.tsx")
    if not os.path.exists(path):
        continue
    
    with open(path, "r") as f:
        content = f.read()
    
    if "generateToolMetadata" not in content:
        continue
    
    # Remove unused Metadata import
    content = content.replace('import { Metadata } from "next";\n', '')
    content = content.replace("import { Metadata } from 'next';\n", '')
    
    # Fix old metadata export if it was replaced with generateToolMetadata but left remnants
    # Remove any "export const metadata: Metadata = {" blocks that were replaced
    
    with open(path, "w") as f:
        f.write(content)
    
    fixed += 1
    print(f"OK {slug}")

print(f"\nCleaned: {fixed}")
