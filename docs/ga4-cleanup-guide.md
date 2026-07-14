# Toolinter — GA4 Cleanup Guide (buang traffic bot/spam)

_Measurement ID: G-CNK84V0DY8 · VPS IP: 168.144.37.19_

## Kenapa ada "US direct" di web baru?

Bukan user/pembeli. Web ID umur 2 minggu tidak dapat human US organik. Penyebab nyata:

- **Ghost/referral spam** — spammer kirim hit palsu via Measurement Protocol ke Measurement ID yang terlihat di page source. Klasik untuk situs baru.
- **Bot headless** yang mengeksekusi JS.

**PENTING (koreksi):** Uptime Kuma, health-cron, dan `curl` **TIDAK** muncul di GA4 — mereka HTTP request polos tanpa eksekusi JavaScript gtag. Jadi bukan sumber "US direct".

## Cara verifikasi cepat (di GA4)

Reports → Acquisition → Traffic acquisition, filter US/Direct. Kalau:
- Engagement rate ~0%, avg engagement time 0s, 1 event/session → **BOT, buang.**
- Ada engagement nyata (>30s, klik tool) → baru menarik.

## Langkah bersihin (GA4 Admin UI — tidak bisa via CLI)

### 1. Internal traffic filter (buang akses dari VPS sendiri)
1. Admin (⚙️ kiri bawah) → **Data streams** → pilih stream toolinter.net
2. **Configure tag settings** → **Show all** → **Define internal traffic**
3. **Create** → Rule name: `VPS`, Match type: `IP address equals`, Value: `168.144.37.19`
4. Balik ke Admin → **Data settings** → **Data filters**
5. Filter `Internal Traffic` → ubah state dari **Testing** ke **Active**

### 2. Bot filtering (sudah otomatis, pastikan aktif)
- Admin → Data streams → stream → **Configure tag settings** → pastikan "exclude known bots and spiders" aktif (default ON di GA4). Ini hanya block known-bot IAB list, tidak semua.

### 3. Lawan referral/ghost spam
GA4 tidak punya "referral exclusion" seperti UA. Cara terbaik:
- **Report-level filter:** saat lihat report, tambah filter `Session source/medium` → exclude source spam yang muncul (mis. domain aneh).
- **Custom dimension + audience trigger** kalau spam persisten: buat audience `NOT hostname = toolinter.net` lalu analisis. Ghost spam biasanya hostname-nya kosong/palsu.
- **Hostname filter (paling ampuh):** Explore → tambah dimension `Hostname`. Hit sah pasti `toolinter.net`/`www.toolinter.net`. Selain itu = ghost spam, abaikan.

### 4. Baseline sehat
- Fokus metrik: **Engaged sessions** dari **Organic Search / Indonesia**, bukan total sessions.
- Set **Reporting identity** → Blended, dan andalkan Search Console untuk data organik yang bersih (SC tidak kena ghost spam).

## Kesimpulan

Jangan ambil keputusan target market dari angka "US direct" — itu noise. Pakai **Google Search Console** (query + negara + klik nyata) sebagai sumber kebenaran untuk keputusan SEO/market.
