# Toolinter — 70+ Tool Online Gratis Indonesia

Kumpulan tool online gratis untuk kebutuhan sehari-hari. Cepat, ringan, dan bisa langsung download hasil. Proses 100% di browser — file tidak diupload ke server.

**Live:** [toolinter.net](https://toolinter.net)

---

## Fitur Utama

### 7 Kategori Tool

| Kategori | Jumlah | Contoh Tool |
|----------|--------|-------------|
| **Surat & Dokumen** | 22 | Surat resign, izin sekolah, lamaran kerja, kuasa, pernyataan |
| **Foto & Dokumen** | 4 | Resize 3×4, 4×6, 2×3 cm, kompres foto |
| **Gaji & Keuangan** | 6 | Gaji bersih, PPh21, THR, BPJS, lembur, prorata |
| **PDF & Converter** | 6 | Gabung PDF, kompres, foto ke Word, PDF ke Word |
| **CV & Lamaran** | 7 | CV ATS, fresh graduate, CV admin, BUMN, cover letter |
| **UMKM & Bisnis** | 7 | HPP, harga jual, food cost, invoice, margin marketplace |
| **Keuangan** | 3 | KPR, pinjol OJK, cek NPWP/NIK |
| **Pendidikan** | 1 | Kalender akademik Indonesia |

### Fitur Pembeda

- **Share WhatsApp** — Bagikan hasil perhitungan langsung ke WA
- **Riwayat localStorage** — Simpan 10 hitungan terakhir di browser
- **Download PDF** — Export hasil kalkulasi ke PDF
- **PWA Installable** — Install sebagai app di HP/desktop
- **AI Insight** — Analisis otomatis dari AI untuk setiap kalkulasi
- **UMR Dropdown** — Pilih UMR berdasarkan kota

### Blog & SEO

- **650 artikel** (20 published + 630 scheduled Jul-Sep 2026)
- **7 artikel/hari** — 1 per kategori, auto-publish berdasarkan tanggal
- **Date-gated** — Artikel scheduled return 404 sampai tanggal rilis
- **Sitemap.xml** + **robots.txt** ter-generate otomatis
- **JSON-LD Schema** untuk SEO
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
- **Database:** JSON file (`data/posts.json`)
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
│   ├── blog.ts           # Blog articles (650)
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
# Build
docker compose build --no-cache

# Run
docker compose up -d

# Check
docker ps | grep toolinter
```

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

## Content Calendar

650 artikel terjadwal 3 bulan (Jul-Sep 2026):

- **7 artikel/hari** — 1 per kategori
- **Auto-publish** — Artikel muncul di listing saat tanggal rilis
- **Scheduled = 404** — Artikel masa depan tidak bisa diakses publik

| Status | Jumlah |
|--------|--------|
| Published | 20 |
| Scheduled | 630 |
| **Total** | **650** |

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
