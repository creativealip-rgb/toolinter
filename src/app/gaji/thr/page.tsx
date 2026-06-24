'use client';

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Gift,
  ChevronDown,
  Calculator,
  Info,
} from "lucide-react";

const TENURE_OPTIONS = [
  { months: 0, label: "Kurang dari 1 tahun", proRata: true },
  { months: 12, label: "1 – 2 tahun", proRata: false },
  { months: 24, label: "2 – 3 tahun", proRata: false },
  { months: 36, label: "3 – 4 tahun", proRata: false },
  { months: 48, label: "4 – 5 tahun", proRata: false },
  { months: 60, label: "5 – 10 tahun", proRata: false },
  { months: 120, label: "Lebih dari 10 tahun", proRata: false },
];

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

export default function THRPage() {
  const [gajiRaw, setGajiRaw] = useState("");
  const [tenureIdx, setTenureIdx] = useState(0);
  const [bulanKerjaRaw, setBulanKerjaRaw] = useState("");
  const [calculated, setCalculated] = useState(false);

  const [result, setResult] = useState({
    gaji: 0,
    thr: 0,
    isProRata: false,
    bulanKerja: 0,
  });

  function handleCalculate() {
    const gaji = parseInt(gajiRaw.replace(/\D/g, ""), 10) || 0;
    const tenure = TENURE_OPTIONS[tenureIdx];
    let thr = 0;
    let bulanKerja = 0;

    if (tenure.proRata) {
      bulanKerja = Math.min(parseInt(bulanKerjaRaw, 10) || 0, 11);
      thr = (gaji / 12) * bulanKerja;
    } else {
      thr = gaji;
    }

    setResult({ gaji, thr, isProRata: tenure.proRata, bulanKerja });
    setCalculated(true);
  }

  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/gaji" className="hover:text-primary transition-colors">
            Kalkulator Gaji
          </Link>
          <span>/</span>
          <span className="text-ink">THR</span>
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
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Gift className="w-5 h-5 text-success" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Kalkulator THR
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung Tunjangan Hari Raya (THR) berdasarkan gaji terakhir dan masa
          kerja sesuai PP 36/2021.
        </p>

        {/* Form */}
        <div className="bg-canvas border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-ink mb-4">
            Masukkan Data THR
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Gaji Terakhir / Bulan
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

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Masa Kerja
              </label>
              <div className="relative">
                <select
                  value={tenureIdx}
                  onChange={(e) => setTenureIdx(Number(e.target.value))}
                  className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                >
                  {TENURE_OPTIONS.map((opt, i) => (
                    <option key={i} value={i}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
              </div>
            </div>

            {TENURE_OPTIONS[tenureIdx].proRata && (
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">
                  Jumlah Bulan Kerja{" "}
                  <span className="text-ink-muted font-normal">(1–11)</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={11}
                  value={bulanKerjaRaw}
                  onChange={(e) => setBulanKerjaRaw(e.target.value)}
                  placeholder="6"
                  className="w-full pl-4 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            )}

            <button
              onClick={handleCalculate}
              className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Hitung THR
            </button>
          </div>
        </div>

        {/* Results */}
        {calculated && result.gaji > 0 && (
          <div className="space-y-6">
            {/* THR result */}
            <div className="bg-success rounded-xl p-6 text-center">
              <p className="text-white/80 text-sm font-medium mb-1">
                Besaran THR
              </p>
              <p className="text-3xl md:text-4xl font-bold text-white">
                {formatRp(result.thr)}
              </p>
            </div>

            {/* Formula explanation */}
            <div className="bg-canvas border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">
                Rincian Perhitungan
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-ink-tertiary">Gaji Terakhir / Bulan</div>
                <div className="text-ink font-medium text-right">
                  {formatRp(result.gaji)}
                </div>
                {result.isProRata && (
                  <>
                    <div className="text-ink-tertiary">Masa Kerja</div>
                    <div className="text-ink font-medium text-right">
                      {result.bulanKerja} bulan
                    </div>
                    <div className="text-ink-tertiary">Rumus</div>
                    <div className="text-ink font-medium text-right">
                      ({formatRp(result.gaji)} ÷ 12) × {result.bulanKerja}
                    </div>
                  </>
                )}
                <div className="border-t border-border pt-2 text-ink font-semibold">
                  Total THR
                </div>
                <div className="border-t border-border pt-2 text-ink font-semibold text-right">
                  {formatRp(result.thr)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* THR rules table */}
        <div className="mt-8 bg-canvas border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-ink mb-4">
            Aturan THR Berdasarkan Masa Kerja
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-ink-tertiary font-medium">
                    Masa Kerja
                  </th>
                  <th className="text-left py-2 pr-4 text-ink-tertiary font-medium">
                    Besaran THR
                  </th>
                  <th className="text-left py-2 text-ink-tertiary font-medium">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 text-ink">Kurang dari 1 tahun</td>
                  <td className="py-2 pr-4 text-ink">Pro-rata</td>
                  <td className="py-2 text-ink-tertiary">
                    (gaji ÷ 12) × jumlah bulan kerja
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-ink">1 tahun atau lebih</td>
                  <td className="py-2 pr-4 text-ink">1× gaji</td>
                  <td className="py-2 text-ink-tertiary">
                    Gaji terakhir 1 bulan penuh
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Info */}
        {calculated && (
          <div className="mt-6 flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-ink-secondary">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-ink mb-1">Catatan</p>
              <ul className="list-disc list-inside space-y-1 text-ink-tertiary">
                <li>
                  THR wajib dibayar paling lambat 7 hari sebelum hari raya (PP 36/2021).
                </li>
                <li>
                  Karyawan dengan masa kerja &lt; 1 tahun mendapat THR secara
                  proporsional.
                </li>
                <li>
                  Gaji terakhir termasuk gaji pokok dan tunjangan tetap.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Tentang Kalkulator THR Indonesia
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              Tunjangan Hari Raya (THR) adalah pendapatan non-upah yang wajib
              dibayarkan oleh pengusaha kepada pekerja menjelang hari raya
              keagamaan. Aturan THR diatur dalam{" "}
              <strong className="text-ink">PP 36/2021</strong> tentang
              Pengupahan dan Permenaker 6/2016 tentang THR Keagamaan.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Berapa besar THR yang diterima?
            </h3>
            <p>
              Karyawan dengan masa kerja 1 tahun atau lebih mendapat THR
              sebesar 1 bulan gaji. Karyawan dengan masa kerja kurang dari 1
              tahun mendapat THR secara proporsional: (gaji ÷ 12) × jumlah
              bulan kerja.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Kapan THR harus dibayar?
            </h3>
            <p>
              THR harus dibayarkan paling lambat 7 hari sebelum hari raya
              keagamaan masing-masing. Keterlambatan pembayaran THR dapat
              dikenakan denda sebesar 5% dari total THR.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
