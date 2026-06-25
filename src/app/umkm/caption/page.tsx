'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ShoppingBag,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import AiInsightBox from '@/components/ai-insight-box';

function formatRp(n: number): string {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}

const KATEGORI = ['Makanan', 'Fashion', 'Elektronik', 'Kecantikan', 'Rumah Tangga', 'Lainnya'];
const MARKETPLACE = ['Shopee', 'Tokopedia', 'Lazada', 'TikTok Shop', 'Umum'];

function generateTitle(nama: string, kategori: string, marketplace: string): string {
  const prefix: Record<string, string> = {
    'Makanan': '🔥',
    'Fashion': '✨',
    'Elektronik': '⚡',
    'Kecantikan': '💎',
    'Rumah Tangga': '🏠',
    'Lainnya': '🛒',
  };
  const mp: Record<string, string> = {
    'Shopee': '| Shopee',
    'Tokopedia': '| Tokopedia',
    'Lazada': '| Lazada',
    'TikTok Shop': '| TikTok Shop',
    'Umum': '',
  };
  const emoji = prefix[kategori] || '🛒';
  const suffix = mp[marketplace] || '';
  let title = `${emoji} ${nama} ${suffix}`.trim();
  if (title.length > 80) title = title.slice(0, 77) + '...';
  return title;
}

function generateDescription(nama: string, kategori: string, keunggulan: string, harga: string): string {
  const price = parseInt(harga.replace(/\D/g, ''), 10) || 0;
  const priceStr = price > 0 ? formatRp(price) : '';
  const keunggulanList = keunggulan.split('\n').filter((k) => k.trim()).map((k) => k.replace(/^[-•*]\s*/, '').trim());

  let desc = `${nama} — pilihan terbaik untuk kebutuhan ${kategori.toLowerCase()} Anda!`;
  if (priceStr) desc += ` Harga spesial ${priceStr}.`;
  if (keunggulanList.length > 0) {
    desc += ` Keunggulan: ${keunggulanList.slice(0, 3).join(', ')}.`;
  }
  desc += ' Pesan sekarang dan nikmati pengiriman cepat! Stok terbatas, jangan sampai kehabisan.';

  if (desc.length > 300) desc = desc.slice(0, 297) + '...';
  return desc;
}

function generateHashtags(nama: string, kategori: string, marketplace: string): string[] {
  const cleanNama = nama.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  const words = cleanNama.split(/\s+/).filter((w) => w.length > 2);

  const tags: string[] = [];

  // Product name tag
  if (words.length > 0) {
    tags.push('#' + words.join(''));
  }

  // Category tags
  const catTags: Record<string, string[]> = {
    'Makanan': ['#MakananOnline', '#JajananEnak', '#FoodLovers'],
    'Fashion': ['#FashionIndonesia', '#OOTD', '#StyleKekinian'],
    'Elektronik': ['#ElektronikMurah', '#GadgetOriginal', '#TechDeals'],
    'Kecantikan': ['#SkincareLovers', '#BeautyIndonesia', '#CantikAlami'],
    'Rumah Tangga': ['#PeralatanRumah', '#HomeDecor', '#RumahImpian'],
    'Lainnya': ['#BelanjaOnline', '#ProdukOriginal', '#BestDeal'],
  };

  const categoryTags = catTags[kategori] || catTags['Lainnya'];
  tags.push(...categoryTags);

  // Marketplace tag
  if (marketplace !== 'Umum') {
    tags.push(`#${marketplace.replace(/\s/g, '')}`);
  }

  return tags.slice(0, 5);
}

type GeneratedResult = {
  title: string;
  description: string;
  hashtags: string[];
};

export default function CaptionMarketplacePage() {
  const [nama, setNama] = useState('');
  const [kategori, setKategori] = useState('Makanan');
  const [harga, setHarga] = useState('');
  const [keunggulan, setKeunggulan] = useState('');
  const [marketplace, setMarketplace] = useState('Shopee');

  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  function handleGenerate() {
    if (!nama.trim()) return;

    const title = generateTitle(nama, kategori, marketplace);
    const description = generateDescription(nama, kategori, keunggulan, harga);
    const hashtags = generateHashtags(nama, kategori, marketplace);

    setResult({ title, description, hashtags });
  }

  function copyText(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  function copyAll() {
    if (!result) return;
    const all = [
      `JUDUL:\n${result.title}`,
      `\nDESKRIPSI:\n${result.description}`,
      `\nHASHTAG:\n${result.hashtags.join(' ')}`,
    ].join('\n');
    copyText(all, 'all');
  }

  return (
    <main className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/umkm" className="hover:text-primary transition-colors">
            Tools UMKM
          </Link>
          <span>/</span>
          <span className="text-ink">Generator Caption Marketplace</span>
        </nav>

        {/* Back link */}
        <Link
          href="/umkm"
          className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Generator Caption Marketplace
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Buat judul produk, deskripsi, dan hashtag yang menarik untuk listing marketplace Shopee, Tokopedia, Lazada, dan TikTok Shop.
        </p>

        {/* Form */}
        <div className="bg-canvas border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-ink mb-4">
            Informasi Produk
          </h2>

          <div className="space-y-4">
            {/* Nama produk */}
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                Nama Produk
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Kripik Singkong Pedas Original 250gr"
                className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kategori */}
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                  Kategori
                </label>
                <div className="relative">
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="w-full appearance-none pl-3 pr-10 py-2 rounded-lg border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  >
                    {KATEGORI.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
                </div>
              </div>

              {/* Marketplace */}
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                  Target Marketplace
                </label>
                <div className="relative">
                  <select
                    value={marketplace}
                    onChange={(e) => setMarketplace(e.target.value)}
                    className="w-full appearance-none pl-3 pr-10 py-2 rounded-lg border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  >
                    {MARKETPLACE.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Harga */}
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                Harga
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value.replace(/\D/g, ''))}
                  placeholder="25.000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Keunggulan */}
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                Keunggulan Produk <span className="text-ink-muted">(satu per baris)</span>
              </label>
              <textarea
                value={keunggulan}
                onChange={(e) => setKeunggulan(e.target.value)}
                placeholder={`- Renyah dan gurih\n- Tanpa pengawet\n- Kemasan zip lock\n- Bisa custom label`}
                rows={4}
                className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!nama.trim()}
              className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              Generate Caption
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Copy all */}
            <div className="flex justify-end">
              <button
                onClick={copyAll}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-colors"
              >
                {copied === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'all' ? 'Tersalin!' : 'Salin Semua'}
              </button>
            </div>

            {/* Judul */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-ink">Judul Produk</h3>
                <button
                  onClick={() => copyText(result.title, 'title')}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-ink-tertiary hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  {copied === 'title' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === 'title' ? 'Tersalin' : 'Salin'}
                </button>
              </div>
              <p className="text-ink font-medium">{result.title}</p>
              <p className="text-xs text-ink-muted mt-2">{result.title.length}/80 karakter</p>
            </div>

            {/* Deskripsi */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-ink">Deskripsi</h3>
                <button
                  onClick={() => copyText(result.description, 'desc')}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-ink-tertiary hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  {copied === 'desc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === 'desc' ? 'Tersalin' : 'Salin'}
                </button>
              </div>
              <p className="text-sm text-ink leading-relaxed">{result.description}</p>
              <p className="text-xs text-ink-muted mt-2">{result.description.length} karakter</p>
            </div>

            {/* Hashtags */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-ink">Hashtag</h3>
                <button
                  onClick={() => copyText(result.hashtags.join(' '), 'tags')}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-ink-tertiary hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  {copied === 'tags' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === 'tags' ? 'Tersalin' : 'Salin'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Insight */}
        {result && (
          <div className="mt-6">
            <AiInsightBox
              title="AI Caption Advisor"
              description="Minta AI tingkatkan caption produk Anda — saran judul lebih menarik, deskripsi SEO-friendly, dan hashtag trending."
              placeholder="Contoh: bikin deskripsi lebih persuasif, tambah hashtag viral untuk Shopee"
              buttonLabel="Optimasi Caption dengan AI"
              context={`Data produk user:\nNama: ${nama}\nKategori: ${kategori}\nHarga: ${formatRp(parseInt(harga.replace(/\D/g, ''), 10) || 0)}\nKeunggulan: ${keunggulan}\nMarketplace: ${marketplace}\n\nHasil generate:\nJudul: ${result.title}\nDeskripsi: ${result.description}\nHashtag: ${result.hashtags.join(' ')}`}
              system="Kamu adalah ahli copywriting marketplace Indonesia. Bantu optimasi judul produk, deskripsi yang menjual, dan hashtag yang trending untuk Shopee, Tokopedia, Lazada, dan TikTok Shop."
            />
          </div>
        )}

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Tentang Generator Caption Marketplace
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              Generator caption marketplace Toolinter membantu UMKM dan penjual
              online membuat judul produk, deskripsi, dan hashtag yang optimal
              untuk marketplace populer di Indonesia. Caption yang baik dapat
              meningkatkan visibilitas produk dan konversi penjualan.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Tips judul produk yang efektif
            </h3>
            <p>
              Judul produk yang baik mengandung <strong className="text-ink">kata kunci utama</strong>,
              spesifikasi (ukuran, warna, varian), dan benefit. Hindari spam kata
              kunci — marketplace seperti Shopee dan Tokopedia bisa menurunkan
              ranking produk yang judulnya tidak relevan.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Bagaimana cara menulis deskripsi yang menjual?
            </h3>
            <p>
              Mulai dengan benefit utama, lalu sebutkan keunggulan produk secara
              singkat. Gunakan bahasa yang mudah dipahami dan sertakan call to
              action seperti &quot;Pesan sekarang&quot; atau &quot;Stok terbatas&quot;.
              Deskripsi yang informatif meningkatkan kepercayaan pembeli.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Pentingnya hashtag di marketplace
            </h3>
            <p>
              Hashtag membantu produk Anda muncul di pencarian internal marketplace.
              Gunakan kombinasi hashtag umum (populer) dan niche (spesifik) untuk
              jangkauan optimal. TikTok Shop sangat mengandalkan hashtag untuk
              discoverability produk.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
