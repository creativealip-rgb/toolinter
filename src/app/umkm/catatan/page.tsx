import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import CatatanKeuanganCalculator from "@/components/catatan-keuangan-calculator";

export const metadata: Metadata = {
  title: "Catatan Keuangan Sederhana — Toolinter",
  description:
    "Hitung saldo akhir bisnis UMKM Anda. Masukkan saldo awal, pemasukan, dan pengeluaran untuk mengetahui untung atau rugi. Gratis dan langsung di browser.",
};

export default function CatatanPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/umkm" className="hover:text-primary transition-colors">
            Tools UMKM
          </Link>
          <span>/</span>
          <span className="text-ink">Catatan Keuangan Sederhana</span>
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
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Catatan Keuangan Sederhana
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung saldo akhir bisnis Anda berdasarkan saldo awal, pemasukan, dan
          pengeluaran. Cepat dan tanpa perlu aplikasi akuntansi.
        </p>

        {/* Calculator component */}
        <CatatanKeuanganCalculator />

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Pentingnya Pencatatan Keuangan untuk UMKM
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              Banyak pelaku UMKM yang belum membiasakan diri mencatat arus
              keuangan bisnisnya. Padahal, pencatatan sederhana sekalipun bisa
              membantu Anda memahami kondisi keuangan usaha — apakah untung atau
              rugi dalam periode tertentu.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Rumus Dasar
            </h3>
            <div className="bg-surface rounded-lg p-4 border border-border">
              <p className="text-ink font-mono text-sm">
                Saldo Akhir = Saldo Awal + Pemasukan − Pengeluaran
              </p>
              <p className="text-ink font-mono text-sm mt-2">
                Selisih = Pemasukan − Pengeluaran
              </p>
            </div>
            <p>
              <strong className="text-ink">Selisih positif</strong> berarti
              bisnis Anda untung — pemasukan lebih besar dari pengeluaran.{" "}
              <strong className="text-ink">Selisih negatif</strong> berarti rugi
              dan Anda perlu mengevaluasi strategi bisnis.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Tips Mengelola Keuangan UMKM
            </h3>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Pisahkan rekening bisnis dan pribadi.</li>
              <li>Catat semua transaksi harian, sekecil apapun.</li>
              <li>Review laporan keuangan minimal satu bulan sekali.</li>
              <li>Sisihkan minimal 10% dari laba sebagai dana darurat.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
