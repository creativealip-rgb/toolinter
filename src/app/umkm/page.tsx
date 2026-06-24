import { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  FileText,
  TrendingUp,
  BookOpen,
  ArrowRight,
  DollarSign,
  UtensilsCrossed,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tools UMKM & Bisnis — Toolinter",
  description:
    "Kumpulan tools gratis untuk UMKM dan bisnis Indonesia. Kalkulator HPP, generator invoice, kalkulator margin, dan catatan keuangan sederhana.",
};

const tools = [
  {
    title: "Kalkulator HPP",
    description:
      "Hitung Harga Pokok Penjualan (HPP) produk Anda. Masukkan biaya bahan baku, tenaga kerja, dan overhead untuk menentukan harga jual yang tepat.",
    href: "/umkm/hpp",
    icon: Calculator,
    color: "text-primary",
    bg: "bg-primary/10",
    ready: true,
  },
  {
    title: "Kalkulator Harga Jual",
    description:
      "Hitung harga jual produk berdasarkan HPP, target margin, biaya operasional, dan diskon marketplace.",
    href: "/umkm/harga-jual",
    icon: DollarSign,
    color: "text-primary",
    bg: "bg-primary/10",
    ready: true,
  },
  {
    title: "Kalkulator Food Cost",
    description:
      "Hitung food cost percentage untuk bisnis F&B. Ketahui apakah biaya bahan baku sudah optimal.",
    href: "/umkm/food-cost",
    icon: UtensilsCrossed,
    color: "text-warning",
    bg: "bg-warning/10",
    ready: true,
  },
  {
    title: "Generator Invoice",
    description:
      "Buat invoice profesional untuk pelanggan Anda. Cetak atau download sebagai PDF langsung dari browser.",
    href: "/umkm/invoice",
    icon: FileText,
    color: "text-warning",
    bg: "bg-warning/10",
    ready: false,
  },
  {
    title: "Kalkulator Margin",
    description:
      "Hitung margin keuntungan, markup, dan titik impas (break-even point) untuk produk atau jasa Anda.",
    href: "/umkm/margin",
    icon: TrendingUp,
    color: "text-success",
    bg: "bg-success/10",
    ready: false,
  },
  {
    title: "Catatan Keuangan Sederhana",
    description:
      "Catat pemasukan dan pengeluaran bisnis harian Anda. Lihat ringkasan laba rugi tanpa perlu aplikasi akuntansi yang rumit.",
    href: "/umkm/catatan",
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/10",
    ready: false,
  },
];

export default function UmkmPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Tools UMKM Indonesia
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
            Tools UMKM & Bisnis
          </h1>
          <p className="text-lg text-ink-tertiary max-w-2xl mx-auto">
            Kumpulan tools gratis untuk membantu UMKM dan pelaku bisnis
            Indonesia mengelola keuangan, menghitung harga jual, dan membuat
            dokumen bisnis.
          </p>
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const content = (
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg ${tool.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${tool.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-semibold text-ink">
                      {tool.title}
                    </h2>
                    {!tool.ready && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-surface text-ink-muted">
                        Segera
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink-tertiary">
                    {tool.description}
                  </p>
                  {tool.ready && (
                    <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Mulai hitung <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            );

            return tool.ready ? (
              <Link
                key={tool.href}
                href={tool.href}
                className="block rounded-xl border border-border bg-canvas p-6 transition-all hover:shadow-lg hover:border-primary/30 cursor-pointer"
              >
                {content}
              </Link>
            ) : (
              <div
                key={tool.href}
                className="rounded-xl border border-border bg-canvas p-6 transition-all opacity-70 cursor-default"
              >
                {content}
              </div>
            );
          })}
        </div>

        {/* SEO content */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-ink mb-4">
            Tools Gratis untuk UMKM Indonesia
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              UMKM (Usaha Mikro, Kecil, dan Menengah) adalah tulang punggung
              perekonomian Indonesia. Toolinter menyediakan kumpulan tools
              gratis yang dirancang khusus untuk membantu pelaku UMKM mengelola
              bisnis dengan lebih efisien tanpa perlu software mahal.
            </p>
            <p>
              <strong>Kalkulator HPP</strong> membantu Anda menghitung Harga
              Pokok Penjualan secara akurat. Dengan mengetahui HPP, Anda bisa
              menentukan harga jual yang tepat — tidak terlalu murah sehingga
              merugi, dan tidak terlalu mahal sehingga kalah saing.
            </p>
            <p>
              <strong>Generator Invoice</strong> (segera hadir) akan membantu
              Anda membuat faktur penjualan profesional yang bisa langsung
              dikirim ke pelanggan. Tidak perlu desain dari nol — cukup isi
              data, unduh PDF.
            </p>
            <p>
              <strong>Kalkulator Margin</strong> (segera hadir) memudahkan
              perhitungan margin keuntungan, markup, dan titik impas. Tools ini
              penting untuk perencanaan bisnis dan evaluasi kesehatan finansial
              usaha Anda.
            </p>
            <p>
              Semua tools di Toolinter berjalan langsung di browser. Data bisnis
              Anda tidak dikirim ke server manapun sehingga tetap aman dan
              privat.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
