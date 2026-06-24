'use client';

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Calculator,
  Info,
  Heart,
  Briefcase,
} from "lucide-react";

const BPJS_KES_RATE = 0.01;
const BPJS_KES_CAP = 12_000_000;
const BPJS_JHT_RATE = 0.02;
const BPJS_JP_RATE = 0.01;

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

export default function BPJSPage() {
  const [gajiRaw, setGajiRaw] = useState("");
  const [calculated, setCalculated] = useState(false);

  const [result, setResult] = useState({
    gaji: 0,
    bpjsKes: 0,
    bpjsKesCap: BPJS_KES_CAP,
    bpjsJht: 0,
    bpjsJp: 0,
    totalBulan: 0,
    totalTahun: 0,
  });

  function handleCalculate() {
    const gaji = parseInt(gajiRaw.replace(/\D/g, ""), 10) || 0;
    const bpjsKes = Math.min(gaji, BPJS_KES_CAP) * BPJS_KES_RATE;
    const bpjsJht = gaji * BPJS_JHT_RATE;
    const bpjsJp = gaji * BPJS_JP_RATE;
    const totalBulan = bpjsKes + bpjsJht + bpjsJp;

    setResult({
      gaji,
      bpjsKes,
      bpjsKesCap: BPJS_KES_CAP,
      bpjsJht,
      bpjsJp,
      totalBulan,
      totalTahun: totalBulan * 12,
    });
    setCalculated(true);
  }

  const components = [
    {
      label: "BPJS Kesehatan",
      rate: "1%",
      value: result.bpjsKes,
      icon: Heart,
      color: "text-primary",
      bg: "bg-primary/10",
      note: `Cap gaji ${formatRp(result.bpjsKesCap)}`,
    },
    {
      label: "JHT (Jaminan Hari Tua)",
      rate: "2%",
      value: result.bpjsJht,
      icon: Shield,
      color: "text-warning",
      bg: "bg-warning/10",
      note: "Tanpa batas gaji",
    },
    {
      label: "JP (Jaminan Pensiun)",
      rate: "1%",
      value: result.bpjsJp,
      icon: Briefcase,
      color: "text-success",
      bg: "bg-success/10",
      note: "Tanpa batas gaji",
    },
  ];

  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/gaji" className="hover:text-primary transition-colors">
            Kalkulator Gaji
          </Link>
          <span>/</span>
          <span className="text-ink">BPJS</span>
        </nav>

        {/* Header */}
        <Link
          href="/gaji"
          className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Kalkulator BPJS
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung iuran BPJS Kesehatan dan BPJS Ketenagakerjaan (JHT & JP) dari
          gaji bulanan.
        </p>

        {/* Form */}
        <div className="bg-canvas border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-ink mb-4">
            Masukkan Data Gaji
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Gaji / Bulan
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={gajiRaw}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    setGajiRaw(raw);
                  }}
                  placeholder="10.000.000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              {gajiRaw && (
                <p className="text-xs text-ink-muted mt-1">
                  {formatRp(parseInt(gajiRaw.replace(/\D/g, ""), 10) || 0)}
                </p>
              )}
            </div>

            <button
              onClick={handleCalculate}
              className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Hitung BPJS
            </button>
          </div>
        </div>

        {/* Results */}
        {calculated && result.gaji > 0 && (
          <div className="space-y-6">
            {/* Component cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {components.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.label}
                    className="bg-canvas border border-border rounded-xl p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}
                      >
                        <Icon className={`w-4 h-4 ${c.color}`} />
                      </div>
                      <span className="text-sm font-medium text-ink">
                        {c.label}
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted mb-2">
                      Tarif: {c.rate} dari gaji
                    </p>
                    <p className="text-xl font-bold text-ink">
                      {formatRp(c.value)}
                    </p>
                    <p className="text-xs text-ink-muted mt-1">{c.note}</p>
                  </div>
                );
              })}
            </div>

            {/* Totals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface border border-border rounded-xl p-5 flex items-center justify-between">
                <span className="font-medium text-ink">Total / Bulan</span>
                <span className="text-xl font-bold text-primary">
                  {formatRp(result.totalBulan)}
                </span>
              </div>
              <div className="bg-surface border border-border rounded-xl p-5 flex items-center justify-between">
                <span className="font-medium text-ink">Total / Tahun</span>
                <span className="text-xl font-bold text-primary">
                  {formatRp(result.totalTahun)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        {calculated && (
          <div className="mt-6 flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-ink-secondary">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-ink mb-1">Catatan Perhitungan</p>
              <ul className="list-disc list-inside space-y-1 text-ink-tertiary">
                <li>
                  Iuran di atas adalah <strong className="text-ink">bagian karyawan</strong>.
                  Pemberi kerja juga membayar porsi employer.
                </li>
                <li>
                  BPJS Kesehatan employer: 4% dari gaji (cap Rp 12 juta).
                </li>
                <li>
                  BPJS TK employer: JHT 3.7%, JKK 0.24%, JKM 0.3%, JP 2%.
                </li>
                <li>
                  Perhitungan bersifat estimasi. Cek iuran aktual di slip gaji.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Tentang Kalkulator BPJS Indonesia
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              BPJS (Badan Penyelenggara Jaminan Sosial) terdiri dari{" "}
              <strong className="text-ink">BPJS Kesehatan</strong> dan{" "}
              <strong className="text-ink">BPJS Ketenagakerjaan</strong>.
              Kedua program ini mewajibkan iuran dari karyawan dan pemberi
              kerja.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Berapa iuran BPJS Kesehatan?
            </h3>
            <p>
              Iuran BPJS Kesehatan karyawan sebesar 1% dari gaji dengan batas
              gaji Rp 12 juta. Pemberi kerja membayar 4%. Total iuran
              keseluruhan adalah 5% dari gaji.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Berapa iuran BPJS Ketenagakerjaan?
            </h3>
            <p>
              BPJS Ketenagakerjaan mencakup Jaminan Hari Tua (JHT) sebesar 2%
              dari karyawan + 3.7% dari employer, dan Jaminan Pensiun (JP)
              sebesar 1% dari karyawan + 2% dari employer. Terdapat juga JKK
              (0.24%) dan JKM (0.3%) yang ditanggung sepenuhnya oleh employer.
            </p>
            <p>
              Kalkulator ini menampilkan porsi karyawan saja. Untuk total biaya
              perusahaan, tambahkan porsi employer.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
