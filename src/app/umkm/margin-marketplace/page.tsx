import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import MarginMarketplaceCalculator from "@/components/margin-marketplace-calculator";
import { generateToolMetadata } from "@/lib/seo";

export const metadata = generateToolMetadata({
  title: "Kalkulator Margin Marketplace",
  description: "Hitung margin keuntungan jual di Tokopedia, Shopee, dan marketplace lain.",
  path: "/umkm/margin-marketplace",
});





export default function MarginMarketplacePage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/umkm" className="hover:text-primary transition-colors">
            Tools UMKM
          </Link>
          <span>/</span>
          <span className="text-ink">Kalkulator Margin Marketplace</span>
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
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Kalkulator Margin Marketplace
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung margin keuntungan produk setelah dipotong fee marketplace.
          Dukung Tokopedia, Shopee, Lazada, atau custom fee.
        </p>

        {/* Calculator component */}
        <MarginMarketplaceCalculator />

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Mengapa Hitung Margin Marketplace?
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              Setiap marketplace mengambil persentase dari harga jual produk
              sebagai biaya layanan (fee). Persentase ini bervariasi antar
              platform dan bisa memotong keuntungan Anda secara signifikan jika
              tidak diperhitungkan sejak awal.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Fee Marketplace Populer di Indonesia
            </h3>
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                <strong className="text-ink">Tokopedia</strong> — fee dasar
                sekitar 1,8% dari harga jual.
              </li>
              <li>
                <strong className="text-ink">Shopee</strong> — fee dasar
                sekitar 2% dari harga jual.
              </li>
              <li>
                <strong className="text-ink">Lazada</strong> — fee dasar
                sekitar 2% dari harga jual.
              </li>
            </ul>
            <h3 className="text-base font-semibold text-ink mt-6">
              Rumus Perhitungan
            </h3>
            <div className="bg-surface rounded-lg p-4 border border-border">
              <p className="text-ink font-mono text-sm">
                Potongan = Harga Jual × Fee%
              </p>
              <p className="text-ink font-mono text-sm mt-2">
                Revenue Bersih = Harga Jual − Potongan
              </p>
              <p className="text-ink font-mono text-sm mt-2">
                Keuntungan = Revenue Bersih − HPP
              </p>
              <p className="text-ink font-mono text-sm mt-2">
                Margin = (Keuntungan ÷ Revenue Bersih) × 100%
              </p>
            </div>
            <p>
              Dengan mengetahui margin bersih setelah potongan marketplace, Anda
              bisa menentukan harga jual yang tetap menguntungkan di setiap
              platform. Tool ini membantu Anda membandingkan profitabilitas
              antar marketplace sebelum memutuskan strategi penjualan.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
