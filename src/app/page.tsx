import { Search, FileText, Image, Calculator, FileDown, Briefcase, Wrench, Zap, Shield, Download, Users, TrendingUp, Star, GraduationCap, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";

// ─── Data ───

const categories = [
  {
    icon: FileText,
    title: "Surat & Dokumen",
    desc: "Generator surat resign, izin sekolah, lamaran kerja, dan 20+ template lain",
    count: 22,
    badge: "badge-blue",
    href: "/surat",
  },
  {
    icon: Image,
    title: "Foto & Dokumen",
    desc: "Resize pas foto 3x4, 4x6, 2x3, kompres, dan panduan foto KTP/CPNS/SNBP",
    count: 7,
    badge: "badge-red",
    href: "/foto",
  },
  {
    icon: Calculator,
    title: "Gaji & Keuangan",
    desc: "Kalkulator gaji bersih, PPh21, THR, BPJS, lembur, prorata",
    count: 6,
    badge: "badge-green",
    href: "/gaji",
  },
  {
    icon: FileDown,
    title: "PDF & Converter",
    desc: "Gabung PDF, kompres PDF, PDF ke Word, dan konversi dokumen lainnya",
    count: 6,
    badge: "badge-teal",
    href: "/pdf",
  },
  {
    icon: Briefcase,
    title: "CV & Lamaran",
    desc: "Generator CV ATS, surat lamaran kerja, dan template profesional",
    count: 5,
    badge: "badge-purple",
    href: "/cv",
  },
  {
    icon: Wrench,
    title: "UMKM & Bisnis",
    desc: "Hitung HPP, harga jual, food cost, invoice, margin marketplace",
    count: 6,
    badge: "badge-orange",
    href: "/umkm",
  },
];

const popularTools = [
  { title: "Buat Surat Resign Online", desc: "Download surat pengunduran diri PDF", icon: FileText, href: "/surat/resign" },
  { title: "Resize Foto 3x4 Online", desc: "Ubah ukuran pas foto untuk dokumen", icon: Image, href: "/foto/resize-3x4" },
  { title: "Kalkulator Gaji Bersih", desc: "Hitung take home pay setelah pajak", icon: Calculator, href: "/gaji/bersih" },
  { title: "Generator CV ATS", desc: "Buat CV ramah ATS untuk lamaran kerja", icon: Briefcase, href: "/cv/ats" },
  { title: "Kompres PDF Online", desc: "Kecilkan ukuran PDF tanpa blur", icon: FileDown, href: "/pdf/kompres" },
  { title: "Surat Izin Sekolah", desc: "Contoh surat izin tidak masuk sekolah", icon: FileText, href: "/surat/izin-sekolah" },
  { title: "Kalkulator PPh21", desc: "Hitung pajak penghasilan karyawan", icon: Calculator, href: "/gaji/pph21" },
  { title: "Resize Foto 4x6", desc: "Ubah ukuran foto untuk SKCK, visa", icon: Image, href: "/foto/resize-4x6" },
  { title: "Surat Pernyataan", desc: "Buat surat pernyataan berbagai keperluan", icon: FileText, href: "/surat/pernyataan" },
  { title: "Hitung HPP Produk", desc: "Kalkulator harga pokok penjualan UMKM", icon: Wrench, href: "/umkm/hpp" },
];

const popularQueries = [
  "contoh surat resign pdf",
  "resize foto 200kb cpns",
  "kalkulator gaji bersih 5 juta",
  "surat izin sekolah sakit",
  "kompres pdf online",
  "cv ats fresh graduate",
  "hitung pajak gaji",
  "foto 3x4 online",
  "surat lamaran kerja",
  "invoice umkm",
];

const whyUs = [
  { icon: Zap, title: "Cepat & Ringan", desc: "Tidak perlu install aplikasi. Langsung pakai di browser HP atau laptop." },
  { icon: Download, title: "Download Langsung", desc: "Hasil bisa langsung download dalam format PDF, DOCX, atau JPG." },
  { icon: Shield, title: "Privasi Terjaga", desc: "File diproses di browser. Tidak disimpan di server kami." },
  { icon: Users, title: "100% Gratis", desc: "Semua tool bisa dipakai tanpa bayar. Tanpa registrasi wajib." },
];

const faq = [
  { q: "Apakah Toolinter benar-benar gratis?", a: "Ya, semua tool di Toolinter bisa dipakai secara gratis tanpa perlu registrasi. Beberapa fitur premium mungkin tersedia di masa depan, tapi fitur dasar akan selalu gratis." },
  { q: "Apakah file saya aman?", a: "Privasi Anda adalah prioritas kami. File diproses langsung di browser Anda dan tidak disimpan di server kami. Setelah proses selesai, file langsung hilang." },
  { q: "Bisa dipakai di HP?", a: "Tentu! Semua tool dioptimalkan untuk mobile. Buka browser HP Anda, kunjungi Toolinter, dan langsung pakai." },
  { q: "Format apa saja yang didukung?", a: "Kami mendukung PDF, DOCX, JPG, PNG, dan format populer lainnya. Setiap tool memiliki keterangan format yang didukung." },
];

// ─── Components ───

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-canvas border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-ink-deep">
          Tool<span className="text-primary">inter</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {categories.slice(0, 4).map((cat) => (
            <a key={cat.href} href={cat.href} className="text-sm font-medium text-ink-tertiary hover:text-primary transition-colors">
              {cat.title.split(" & ")[0]}
            </a>
          ))}
        </nav>
        <a href="/tools" className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors">
          Semua Tool →
        </a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="py-20 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4 leading-tight">
        Tool Online Gratis untuk<br />
        <span className="text-primary">Surat, Foto, CV, PDF & Keuangan</span>
      </h1>
      <p className="text-lg text-ink-tertiary mb-8 max-w-2xl mx-auto">
        Pilih tool, isi data, download hasil. Tanpa install, tanpa ribet, tanpa registrasi.
      </p>
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted w-5 h-5" />
        <input
          type="text"
          placeholder="Cari tool... contoh: 'buat surat resign', 'resize foto 3x4'"
          className="w-full py-4 pl-12 pr-24 rounded-full bg-surface border border-border text-ink placeholder:text-ink-muted text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 px-6 rounded-full transition-colors">
          Cari
        </button>
      </div>
    </section>
  );
}

function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-8 py-6 px-6 bg-surface">
      {[
        { value: "100%", label: "Gratis" },
        { value: "70+", label: "Tool Tersedia" },
        { value: "Tanpa", label: "Install" },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="text-2xl font-bold text-ink-deep">{item.value}</div>
          <div className="text-sm text-ink-tertiary">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function CategoryGrid() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-ink mb-2">Kategori Tool</h2>
        <p className="text-ink-tertiary mb-8">Pilih kategori untuk menemukan tool yang Anda butuhkan</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.href}
              href={cat.href}
              className="group block p-6 bg-canvas border border-border rounded-xl hover:shadow-lg hover:border-primary/20 transition-all"
            >
              <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4`}>
                <cat.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm text-ink-tertiary mb-3">{cat.desc}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {cat.count} tool
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularTools() {
  return (
    <section className="py-16 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-ink mb-2">Tool Populer</h2>
        <p className="text-ink-tertiary mb-8">Tool yang paling sering digunakan pengunjung kami</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTools.slice(0, 6).map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="group flex items-start gap-4 p-4 bg-canvas border border-border rounded-lg hover:shadow-md hover:border-primary/20 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <tool.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-ink group-hover:text-primary transition-colors mb-1">
                  {tool.title}
                </h3>
                <p className="text-sm text-ink-tertiary">{tool.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularQueries() {
  return (
    <section className="py-12 px-6 content-visibility-auto">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-xl font-semibold text-ink mb-6">Pencarian Populer</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {popularQueries.map((query) => (
            <a
              key={query}
              href={`/search?q=${encodeURIComponent(query)}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface hover:bg-primary/10 border border-border hover:border-primary/30 rounded-full text-sm text-ink-secondary hover:text-primary transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              {query}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedBanner() {
  return (
    <section className="py-12 px-6 content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-hover p-8 md:p-12 text-white">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Butuh Surat atau Foto untuk Kebutuhan Sekolah/Kerja?</h2>
              <p className="text-white/80 text-lg">Buat surat resmi, resize foto dokumen, dan hitung gaji — semua gratis, tanpa install.</p>
            </div>
            <a href="/surat" className="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-full hover:bg-white/90 transition-colors flex-shrink-0">
              Coba Sekarang
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  const posts = blogPosts.slice(0, 3);
  return (
    <section className="py-16 px-6 bg-surface content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-ink mb-2">Panduan Terbaru</h2>
            <p className="text-ink-tertiary">Tips dan panduan untuk kebutuhan dokumen Anda</p>
          </div>
          <a href="/blog" className="hidden md:inline-flex text-sm font-semibold text-primary hover:text-primary-hover transition-colors">
            Lihat Semua Panduan →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-6 bg-canvas border border-border rounded-xl hover:shadow-lg hover:border-primary/20 transition-all"
            >
              <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                {post.category}
              </span>
              <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-ink-tertiary mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-xs text-ink-muted">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-6 text-center md:hidden">
          <a href="/blog" className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors">
            Lihat Semua Panduan →
          </a>
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section className="py-16 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-ink mb-2 text-center">Kenapa Toolinter?</h2>
        <p className="text-ink-tertiary mb-12 text-center">Alasan mengapa jutaan orang memilih Toolinter</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUs.map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-ink mb-2">{item.title}</h3>
              <p className="text-sm text-ink-tertiary">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-ink mb-2 text-center">Pertanyaan Umum</h2>
        <p className="text-ink-tertiary mb-10 text-center">Jawaban atas pertanyaan yang sering diajukan</p>
        <div className="space-y-4">
          {faq.map((item, i) => (
            <details key={i} className="group border border-border rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-surface transition-colors">
                <span className="font-medium text-ink">{item.q}</span>
                <span className="ml-4 text-ink-muted group-open:rotate-180 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </summary>
              <div className="px-5 pb-5 text-ink-secondary leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-ink-deep text-on-dark">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="font-bold text-lg mb-4">Toolinter</h3>
            <p className="text-sm text-on-dark/70 leading-relaxed">
              Kumpulan tool online gratis untuk kebutuhan sehari-hari. Cepat, ringan, dan bisa langsung download hasil.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kategori</h4>
            <ul className="space-y-2 text-sm text-on-dark/70">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.href}><a href={cat.href} className="hover:text-white transition-colors">{cat.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Populer</h4>
            <ul className="space-y-2 text-sm text-on-dark/70">
              {popularTools.slice(0, 4).map((tool) => (
                <li key={tool.href}><a href={tool.href} className="hover:text-white transition-colors">{tool.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-sm text-on-dark/70">
              <li><a href="/about" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Hubungi Kami</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-on-dark/10 text-center text-sm text-on-dark/50">
          <p>© {new Date().getFullYear()} Toolinter. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ───

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <CategoryGrid />
        <PopularTools />
        <PopularQueries />
        <FeaturedBanner />
        <BlogPreview />
        <WhyUsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
