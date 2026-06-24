import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, DollarSign } from "lucide-react";
import HargaJualCalculator from "@/components/harga-jual-calculator";

export const metadata: Metadata = {
  title: "Kalkulator Harga Jual Online — Toolinter",
  description:
    "Hitung harga jual produk UMKM Anda secara gratis. Masukkan HPP, target margin, biaya operasional, dan diskon marketplace untuk mendapatkan harga jual yang optimal.",
};

export default function HargaJualPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/umkm" className="hover:text-primary transition-colors">
            Tools UMKM
          </Link>
          <span>/</span>
          <span className="text-ink">Kalkulator Harga Jual</span>
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
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Kalkulator Harga Jual
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung harga jual produk berdasarkan HPP, margin, biaya operasional,
          dan diskon marketplace. Gratis, cepat, dan langsung di browser.
        </p>

        {/* Calculator component */}
        <HargaJualCalculator />

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Cara Menentukan Harga Jual yang Tepat
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              Menentukan harga jual yang tepat adalah kunci keberhasilan UMKM.
              Terlalu murah berarti keuntungan berkurang, terlalu mahal bisa
              membuat pelanggan lari ke kompetitor.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Rumus Harga Jual
            </h3>
            <div className="bg-surface rounded-lg p-4 border border-border">
              <p className="text-ink font-mono text-sm">
                Harga Jual = HPP ÷ (1 - Margin%)
              </p>
              <p className="text-ink font-mono text-sm mt-2">
                Contoh: HPP Rp 10.000, Margin 30% → Harga Jual = 10.000 ÷ 0,7
                = Rp 14.286
              </p>
            </div>
            <h3 className="text-base font-semibold text-ink mt-6">
              Perbedaan Margin dan Markup
            </h3>
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                <strong className="text-ink">Margin</strong> — persentase
                keuntungan dari harga jual. Contoh: harga jual Rp 100.000,
                keuntungan Rp 30.000 = margin 30%.
              </li>
              <li>
                <strong className="text-ink">Markup</strong> — persentase
                tambahan dari HPP. Contoh: HPP Rp 70.000, keuntungan Rp 30.000
                = markup 42,8%.
              </li>
            </ul>
            <p>
              Kalkulator Harga Jual Toolinter menggunakan metode margin dari
              harga jual, yang lebih umum digunakan dalam bisnis ritel dan
              UMKM.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
