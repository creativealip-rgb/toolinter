# Toolinter — Tool Online Gratis Indonesia

Kumpulan tool online gratis untuk kebutuhan sehari-hari. Cepat, ringan, dan bisa langsung download hasil. Proses 100% di browser — file tidak diupload ke server. Fokus pasar Indonesia (keunggulan lokal, bukan tool generik global).

**Live:** [toolinter.net](https://toolinter.net)

---

## Fitur Utama

### 7 Kategori Tool (~43 halaman tool; 65 jika tiap template surat dihitung)

| Kategori | Jumlah | Contoh Tool |
|----------|--------|-------------|
| **Surat & Dokumen** | 22 template | Surat resign, izin sekolah, lamaran kerja, kuasa, pernyataan |
| **Foto & Dokumen** | 8 | Resize 3×4/4×6/2×3, kompres, foto KTP/CPNS/SNBP, ganti background |
| **Gaji** | 8 | Gaji bersih, PPh21, THR, BPJS, lembur, prorata, UMR, pesangon |
| **PDF & Converter** | 6 | Gabung PDF, kompres, foto ke PDF, PDF ke Word, Word ke PDF |
| **CV & Lamaran** | 7 | CV ATS, fresh graduate, CV admin, BUMN, cover letter |
| **UMKM & Bisnis** | 7 | HPP, harga jual, food cost, invoice, margin marketplace, caption |
| **Keuangan** | 5 | KPR, investasi, zakat, pinjol OJK, cek NPWP/NIK |
| **Pendidikan** | 1 | Kalender akademik Indonesia |

Setiap halaman tool dilengkapi paket SEO lengkap: OG image dinamis (`/api/og`), breadcrumb JSON-LD, related tools, dan FAQ (visible + FAQPage schema).

### Fitur Pembeda

- **Share WhatsApp** — Bagikan hasil perhitungan langsung ke WA
- **Riwayat localStorage** — Simpan 10 hitungan terakhir di browser
- **Download PDF** — Export hasil kalkulasi ke PDF
- **PWA Installable** — Install sebagai app di HP/desktop
- **AI Insight** — Analisis otomatis dari AI untuk setiap kalkulasi
- **UMR Dropdown** — Pilih UMR berdasarkan kota

### Blog & SEO

- **115+ artikel unik** (didedup dari 650 doorway lama → 111 baseline, terus tumbuh via mesin harian)
- **Publish WordPress-style — TANPA rebuild.** Artikel disimpan di `persistent-data/posts.json` (Docker volume). Halaman blog `force-dynamic`, jadi artikel baru langsung live begitu ditulis ke store. Lihat [Arsitektur Konten](#arsitektur-konten).
- **Mesin artikel harian** — cron Hermes generate 2 artikel unik berkualitas/hari (`scripts/publish-article.mjs`), guard anti thin-content (min 400 kata, dedup, CTA wajib ke tool)
- **12 artikel per halaman** di listing `/blog` (grid 3 kolom penuh)
- **Sitemap.xml** + **robots.txt** ter-generate otomatis
- **JSON-LD Schema** (BlogPosting, FAQPage, BreadcrumbList) untuk SEO
- **View counter** per artikel

### Dashboard Admin

- `/dashboard` — Overview
- `/dashboard/posts` — Kelola artikel (CRUD, filter, pagination)
- `/dashboard/analytics` — Statistik views & tren
- `/dashboard/media` — Upload & kelola gambar
- **Basic Auth** — Protected dengan user/pass

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **AI:** OpenRouter API (GPT-4o, Claude, Gemini)
- **Database:** JSON file (`persistent-data/posts.json`, Docker volume — persisten lintas deploy)
- **Upload:** Sharp (WebP + MozJPEG compression)
- **Deploy:** Docker + Dokploy + Traefik
- **VPS:** DigitalOcean Singapore (168.144.37.19)

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Development

```bash
# Clone
git clone https://github.com/creativealip-rgb/toolinter.git
cd toolinter

# Install
pnpm install

# Environment
cp .env.example .env.local
# Edit .env.local with your keys

# Run
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
# AI (optional — for AI Insight feature)
OPENROUTER_API_KEY=your_key_here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1

# Dashboard Auth
DASHBOARD_USER=admin
DASHBOARD_PASS=your_password
```

---

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   │   ├── posts/        # Blog posts CRUD
│   │   ├── upload/       # Image upload (Sharp)
│   │   └── views/        # View counter
│   ├── blog/             # Blog listing & [slug]
│   ├── cv/               # CV tools
│   ├── dashboard/        # Admin dashboard
│   ├── foto/             # Photo tools
│   ├── gaji/             # Salary calculators
│   ├── keuangan/         # Financial tools
│   ├── pdf/              # PDF tools
│   ├── pendidikan/       # Education tools
│   ├── surat/            # Letter generator
│   ├── umkm/             # Business tools
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   ├── action-bar.tsx    # Share, PDF, History buttons
│   ├── ai-insight-box.tsx # AI analysis box
│   ├── category-card.tsx # Reusable card component
│   ├── site-header.tsx   # Navigation header
│   ├── site-footer.tsx   # Footer
│   ├── surat-workspace.tsx # Letter generator UI
│   ├── surat-generator.tsx # Letter form & preview
│   └── pwa-install.tsx   # PWA install prompt
├── data/
│   ├── blog.ts           # Blog seed/baseline (111 artikel — recovery)
│   ├── surat.ts          # Letter templates (22)
│   └── umr.ts            # UMR data by city
├── lib/
│   ├── utils-helpers.ts  # Share WA, PDF, History, UMR
│   ├── posts-store.ts    # Blog posts CRUD store
│   └── blog-links.ts     # Blog slug mapping
└── middleware.ts          # Dashboard auth
```

---

## Deploy

### Docker (recommended)

```bash
# Build (hanya perlu saat ubah SOURCE CODE, bukan saat publish artikel)
docker compose build --no-cache

# Run
docker compose up -d

# Check
docker ps | grep toolinter
```

> **Penting:** `docker-compose.yml` mount volume `./persistent-data:/app/data`. Direktori ini menyimpan `posts.json` (semua artikel) dan HARUS ikut ter-backup. Owner file harus UID `1001:65533` (user `nextjs`). Kalau volume kosong saat start, `posts.json` di-seed otomatis dari `src/data/blog.ts`.
>
> **Publish artikel TIDAK perlu build** — cukup tulis ke `persistent-data/posts.json` (via `scripts/publish-article.mjs`), langsung live. Build hanya untuk perubahan kode (komponen, tool, styling).

### Dokploy

1. Push to GitHub
2. Connect repo in Dokploy
3. Set environment variables
4. Deploy

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/posts` | GET | List all posts |
| `/api/posts` | POST | Create post |
| `/api/posts/[slug]` | GET | Get single post |
| `/api/posts/[slug]` | PUT | Update post |
| `/api/posts/[slug]` | DELETE | Delete post |
| `/api/upload` | POST | Upload image (Sharp compress) |
| `/api/views` | POST | Increment view count |
| `/api/views?slug=X` | GET | Get view count |

---

## Dashboard

Access: `https://toolinter.net/dashboard`

```
User: admin
Pass: (set in .env.local DASHBOARD_PASS)
```

Features:
- **Posts** — CRUD, filter (all/published/draft/scheduled), search, pagination (10/page)
- **Analytics** — Views per post, trends, top posts
- **Media** — Upload gallery with WebP compression

---

## Arsitektur Konten

**Model publish: WordPress-style, TANPA rebuild image** (sejak 14 Juli 2026).

### Cara kerja
- Artikel hidup di `persistent-data/posts.json` — di-mount sebagai Docker volume ke `/app/data` (lihat `docker-compose.yml`).
- Halaman `/blog` dan `/blog/[slug]` pakai `export const dynamic = "force-dynamic"` → dibaca ulang tiap request.
- Nulis artikel ke posts.json = **langsung live**, tanpa `docker compose build`, tanpa deploy.

### Dua jalur konten
| Jalur | File | Butuh rebuild? | Kapan dipakai |
|-------|------|----------------|---------------|
| **Runtime store** (utama) | `persistent-data/posts.json` | Tidak | Publish artikel harian |
| **Seed/baseline** | `src/data/blog.ts` | Ya | Ubah default set yang re-seed volume kosong |

`posts-store.ts` otomatis nge-seed posts.json dari `blog.ts` (111 artikel baseline) kalau store kosong. Jadi `blog.ts` = jaring pengaman recovery.

### Mesin artikel harian
- **Script:** `scripts/publish-article.mjs <file.json>` — validasi (dedup slug, min 400 kata, min 4 section, kategori valid, CTA), backup, tulis ke store.
- **Antrian topik:** `scripts/keyword-bank.json` (topik unik + angle + CTA, ditandai `used` setelah dipakai).
- **Cron Hermes:** tiap hari 09:00 WIB, 2 artikel/hari, deliver laporan ke Telegram.
- **Skill:** `toolinter-daily-article-engine` (workflow + quality bar lengkap).
- **Prinsip:** kualitas > volume. Konservatif 2/hari untuk hindari risiko doorway/thin-content (alasan 650 clone lama didedup).

> ⚠️ `persistent-data/` gitignored (data runtime, seperti DB). JANGAN `git add persistent-data/` atau `src/data/blog.ts`. Commit hanya `scripts/`.

---

## SEO

- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- Canonical URLs per page
- JSON-LD BlogPosting schema
- Meta tags (title, description, og:image)
- View counter per blog post

---

## License

Private — All rights reserved.
