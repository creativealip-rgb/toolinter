'use client';

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Receipt,
  ChevronDown,
  Calculator,
  Info,
} from "lucide-react";

const PTKP_OPTIONS = [
  { value: 54000000, label: "TK/0 — Tidak Kawin, 0 tanggungan" },
  { value: 58500000, label: "K/0 — Kawin, 0 tanggungan" },
  { value: 63000000, label: "K/1 — Kawin, 1 tanggungan" },
  { value: 67500000, label: "K/2 — Kawin, 2 tanggungan" },
  { value: 72000000, label: "K/3 — Kawin, 3 tanggungan" },
];

const PPH21_BRACKETS = [
  { limit: 60_000_000, rate: 0.05, label: "5%" },
  { limit: 250_000_000, rate: 0.15, label: "15%" },
  { limit: 500_000_000, rate: 0.25, label: "25%" },
  { limit: 5_000_000_000, rate: 0.30, label: "30%" },
  { limit: Infinity, rate: 0.35, label: "35%" },
];

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

interface BracketResult {
  label: string;
  range: string;
  taxable: number;
  tax: number;
}

function calcPPh21Progressive(pkp: number): BracketResult[] {
  if (pkp <= 0) return [];
  const results: BracketResult[] = [];
  let remaining = pkp;
  let prev = 0;
  for (const bracket of PPH21_BRACKETS) {
    const band = bracket.limit - prev;
    const taxable = Math.min(remaining, band);
    if (taxable <= 0) break;
    results.push({
      label: bracket.label,
      range: `${formatRp(prev)} – ${bracket.limit === Infinity ? "∞" : formatRp(bracket.limit)}`,
      taxable,
      tax: taxable * bracket.rate,
    });
    remaining -= taxable;
    prev = bracket.limit;
    if (remaining <= 0) break;
  }
  return results;
}

export default function PPh21Page() {
  const [brutoRaw, setBrutoRaw] = useState("");
  const [ptkpIdx, setPtkpIdx] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const [result, setResult] = useState({
    bruto: 0,
    ptkp: 0,
    pkp: 0,
    brackets: [] as BracketResult[],
    totalTax: 0,
  });

  function handleCalculate() {
    const bruto = parseInt(brutoRaw.replace(/\D/g, ""), 10) || 0;
    const ptkp = PTKP_OPTIONS[ptkpIdx].value;
    const pkp = Math.max(0, bruto - ptkp);
    const brackets = calcPPh21Progressive(pkp);
    const totalTax = brackets.reduce((s, b) => s + b.tax, 0);

    setResult({ bruto, ptkp, pkp, brackets, totalTax });
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
          <span className="text-ink">PPh21</span>
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
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
            <Receipt className="w-5 h-5 text-warning" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Kalkulator PPh21
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung pajak penghasilan PPh21 berdasarkan tarif progresif dan status
          PTKP sesuai UU HUP.
        </p>

        {/* Form */}
        <div className="bg-canvas border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-ink mb-4">
            Masukkan Data Penghasilan
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Penghasilan Bruto / Tahun
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={brutoRaw}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    setBrutoRaw(raw);
                  }}
                  placeholder="120.000.000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              {brutoRaw && (
                <p className="text-xs text-ink-muted mt-1">
                  {formatRp(parseInt(brutoRaw.replace(/\D/g, ""), 10) || 0)} / tahun
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Status PTKP
              </label>
              <div className="relative">
                <select
                  value={ptkpIdx}
                  onChange={(e) => setPtkpIdx(Number(e.target.value))}
                  className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                >
                  {PTKP_OPTIONS.map((opt, i) => (
                    <option key={opt.value} value={i}>
                      {opt.label} — {formatRp(opt.value)}/tahun
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Hitung PPh21
            </button>
          </div>
        </div>

        {/* Results */}
        {calculated && result.bruto > 0 && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-canvas border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">
                Ringkasan Perhitungan
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-ink-tertiary">Penghasilan Bruto / Tahun</div>
                <div className="text-ink font-medium text-right">
                  {formatRp(result.bruto)}
                </div>
                <div className="text-ink-tertiary">PTKP / Tahun</div>
                <div className="text-ink font-medium text-right">
                  - {formatRp(result.ptkp)}
                </div>
                <div className="border-t border-border pt-2 text-ink-tertiary">
                  PKP / Tahun
                </div>
                <div className="border-t border-border pt-2 text-ink font-medium text-right">
                  {formatRp(result.pkp)}
                </div>
              </div>
            </div>

            {/* Bracket breakdown */}
            <div className="bg-canvas border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">
                Rincian Pajak per Bracket
              </h2>
              <div className="space-y-3">
                {result.brackets.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div>
                      <span className="text-sm font-medium text-ink">
                        Tarif {b.label}
                      </span>
                      <p className="text-xs text-ink-muted">{b.range}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-ink">
                        {formatRp(b.tax)}
                      </p>
                      <p className="text-xs text-ink-muted">
                        dari {formatRp(b.taxable)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface border border-border rounded-xl p-5 text-center">
                <p className="text-sm text-ink-tertiary mb-1">PPh21 / Tahun</p>
                <p className="text-2xl font-bold text-error">
                  {formatRp(result.totalTax)}
                </p>
              </div>
              <div className="bg-surface border border-border rounded-xl p-5 text-center">
                <p className="text-sm text-ink-tertiary mb-1">PPh21 / Bulan</p>
                <p className="text-2xl font-bold text-warning">
                  {formatRp(result.totalTax / 12)}
                </p>
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
                  Tarif progresif sesuai UU HUP (UU 7/2021): 5%, 15%, 25%, 30%, 35%.
                </li>
                <li>
                  PKP = Penghasilan Bruto – PTKP. Jika negatif, PKP = 0.
                </li>
                <li>
                  Perhitungan bersifat estimasi. Konsultasikan dengan konsultan
                  pajak untuk angka pasti.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Tentang Kalkulator PPh21 Indonesia
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              PPh21 adalah pajak penghasilan yang dipotong oleh pemberi kerja
              dari penghasilan karyawan setiap bulan. Kalkulator ini menghitung
              PPh21 berdasarkan <strong className="text-ink">tarif progresif</strong>{" "}
              sesuai Undang-Undang Harmonisasi Peraturan Perpajakan (UU 7/2021).
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Bagaimana cara menghitung PPh21?
            </h3>
            <p>
              Langkah pertama adalah menentukan Penghasilan Kena Pajak (PKP),
              yaitu penghasilan bruto setahun dikurangi PTKP. Kemudian tarif
              progresif diterapkan: 5% untuk PKP sampai Rp 60 juta, 15% untuk
              Rp 60–250 juta, 25% untuk Rp 250–500 juta, 30% untuk Rp 500
              juta–5 miliar, dan 35% untuk di atas Rp 5 miliar.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Apa itu PTKP?
            </h3>
            <p>
              PTKP (Penghasilan Tidak Kena Pajak) adalah penghasilan yang tidak
              dikenakan pajak. Besarnya tergantung status perkawinan dan jumlah
              tanggungan: TK/0 = Rp 54 juta, K/0 = Rp 58,5 juta, K/1 = Rp 63
              juta, K/2 = Rp 67,5 juta, K/3 = Rp 72 juta per tahun.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
