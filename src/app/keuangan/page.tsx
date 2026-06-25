import { Metadata } from "next";
import Link from "next/link";
import { Calculator, FileCheck, CreditCard, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Kalkulator Keuangan Online — Toolinter",
  description:
    "Kumpulan kalkulator keuangan: KPR, pinjol OJK, cek NPWP/NIK. Gratis, langsung pakai di browser.",
};

const tools = [
  {
    slug: "kpr",
    title: "Kalkulator KPR",
    description:
      "Simulasi cicilan KPR: hitung angsuran per bulan, total bunga, dan tabel amortisasi.",
    icon: Calculator,
  },
  {
    slug: "cek-npwp",
    title: "Cek NPWP & NIK",
    description:
      "Validasi format NPWP dan NIK. Decoder kode wilayah + generator contoh faktur.",
    icon: FileCheck,
  },
  {
    slug: "pinjol",
    title: "Kalkulator Pinjol OJK",
    description:
      "Simulasi pinjaman online: bunga harian, total bayar, perbandingan tenor, simulasi denda.",
    icon: CreditCard,
  },
];

export default function KeuanganPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
            Kalkulator Keuangan
          </h1>
          <p className="text-lg text-ink-tertiary max-w-2xl mx-auto">
            Simulasi KPR, validasi NPWP/NIK, dan kalkulator pinjaman online.
            Gratis, proses di browser.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/keuangan/${tool.slug}`}
              className="group bg-canvas rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all"
            >
              <tool.icon className="w-8 h-8 text-primary mb-3" />
              <h2 className="font-semibold text-ink text-lg mb-2 group-hover:text-primary transition-colors">
                {tool.title}
              </h2>
              <p className="text-ink-tertiary text-sm mb-4">{tool.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Pakai <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-ink mb-4">
            Kalkulator Keuangan untuk Kebutuhan Sehari-hari
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              Toolinter menyediakan kalkulator keuangan yang bisa Anda gunakan
              langsung di browser. Hitung cicilan KPR, validasi nomor NPWP dan
              NIK, serta simulasi pinjaman online — semua gratis tanpa registrasi.
            </p>
            <p>
              <strong>Kalkulator KPR</strong> membantu Anda memperkirakan cicilan
              rumah per bulan berdasarkan harga properti, uang muka, tenor, dan
              suku bunga. Dilengkapi tabel amortisasi untuk melihat breakdown
              pokok dan bunga per tahun.
            </p>
            <p>
              <strong>Cek NPWP & NIK</strong> memvalidasi format nomor identitas
              pajak dan kependudukan. Decoder NIK menampilkan kode provinsi,
              kabupaten, kecamatan, dan tanggal lahir dari nomor NIK Anda.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
