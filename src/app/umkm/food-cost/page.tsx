import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import FoodCostCalculator from "@/components/food-cost-calculator";

export const metadata: Metadata = {
  title: "Kalkulator Food Cost F&B — Toolinter",
  description:
    "Hitung food cost percentage usaha F&B Anda secara gratis. Masukkan biaya bahan baku dan total penjualan untuk mengetahui apakah bisnis kuliner Anda sudah efisien.",
};

export default function FoodCostPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/umkm" className="hover:text-primary transition-colors">
            Tools UMKM
          </Link>
          <span>/</span>
          <span className="text-ink">Kalkulator Food Cost</span>
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
            <UtensilsCrossed className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Kalkulator Food Cost F&B
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung persentase food cost bisnis kuliner Anda. Ketahui apakah biaya
          bahan baku sudah optimal atau perlu ditekan. Gratis dan langsung di
          browser.
        </p>

        {/* Calculator component */}
        <FoodCostCalculator />

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Pentingnya Menghitung Food Cost untuk Bisnis F&B
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              <strong className="text-ink">Food cost</strong> adalah persentase
              biaya bahan baku terhadap total penjualan. Ini adalah metrik paling
              penting dalam bisnis food &amp; beverage karena menentukan
              profitabilitas usaha Anda.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Rumus Food Cost
            </h3>
            <div className="bg-surface rounded-lg p-4 border border-border">
              <p className="text-ink font-mono text-sm">
                Food Cost % = (Total Bahan Baku ÷ Total Penjualan) × 100%
              </p>
            </div>
            <h3 className="text-base font-semibold text-ink mt-6">
              Tips Menekan Food Cost
            </h3>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Cari supplier bahan baku yang lebih murah tanpa mengorbankan kualitas.</li>
              <li>Kurangi food waste dengan mengelola stok bahan secara lebih baik.</li>
              <li>Standarisasi resep agar porsi dan penggunaan bahan konsisten.</li>
              <li>Evaluasi menu — hapus menu yang food cost-nya terlalu tinggi.</li>
              <li>Naikkan harga secara bertahap jika food cost terus naik.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
