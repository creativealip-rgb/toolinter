<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Toolinter — Aturan Kritis

## Publish artikel = TANPA rebuild (WordPress-style)
- Artikel disimpan di `persistent-data/posts.json` (Docker volume, mount ke `/app/data`). Halaman blog `force-dynamic` → tulis ke store = langsung live.
- Publish artikel: `node scripts/publish-article.mjs <file.json>`. JANGAN `docker compose build` untuk konten — buang 5-8 menit sia-sia.
- `docker compose build` HANYA untuk perubahan source code (komponen, tool, styling, SEO lib).
- `persistent-data/` dan `src/data/blog.ts` GITIGNORED. JANGAN `git add` keduanya. Commit hanya `scripts/`, komponen, docs.
- `src/data/blog.ts` = seed baseline (111 artikel) buat re-seed volume kosong; recovery net, bukan store aktif.

## Mesin artikel harian
- Cron Hermes tiap hari 09:00 WIB, 2 artikel berkualitas, dari `scripts/keyword-bank.json`.
- Skill: `toolinter-daily-article-engine`. Guard: min 400 kata, dedup slug, CTA wajib ke tool nyata.
- Kualitas > volume. Jangan spike volume — risiko doorway/thin-content (650 clone lama sudah didedup ke 111).

## Deploy source code
- `docker compose build && docker compose up -d` (image di-build dari source, bukan bind-mount).
- Verifikasi live via domain publik `https://toolinter.net` (curl ke container IP sering hang).
- Fokus pasar Indonesia — jangan pivot ke market luar negeri.
