'use client';

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Wallet,
  TrendingDown,
  Shield,
  Receipt,
  Info,
  ChevronDown,
  Calculator,
} from "lucide-react";

// --- Tax & contribution constants ---

const PTKP_OPTIONS = [
  { value: 54000000, label: "TK/0 — Tidak Kawin, 0 tanggungan" },
  { value: 58500000, label: "K/0 — Kawin, 0 tanggungan" },
  { value: 63000000, label: "K/1 — Kawin, 1 tanggungan" },
  { value: 67500000, label: "K/2 — Kawin, 2 tanggungan" },
  { value: 72000000, label: "K/3 — Kawin, 3 tanggungan" },
];

const PPH21_BRACKETS = [
  { limit: 60_000_000, rate: 0.05 },
  { limit: 250_000_000, rate: 0.15 },
  { limit: 500_000_000, rate: 0.25 },
  { limit: 5_000_000_000, rate: 0.30 },
  { limit: Infinity, rate: 0.35 },
];

const BPJS_KES_RATE = 0.01;
const BPJS_KES_CAP = 12_000_000;
const BPJS_JHT_RATE = 0.02;
const BPJS_JP_RATE = 0.01;

// --- Helpers ---

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

function calcPPh21(kpkPerYear: number): number {
  if (kpkPerYear <= 0) return 0;
  let remaining = kpkPerYear;
  let tax = 0;
  let prev = 0;
  for (const bracket of PPH21_BRACKETS) {
    const band = bracket.limit - prev;
    const taxable = Math.min(remaining, band);
    tax += taxable * bracket.rate;
    remaining -= taxable;
    prev = bracket.limit;
    if (remaining <= 0) break;
  }
  return tax;
}

// --- Component ---

export default function GajiBersihPage() {
  const [gajiRaw, setGajiRaw] = useState("");
  const [tunjanganRaw, setTunjanganRaw] = useState("");
  const [ptkpIdx, setPtkpIdx] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const [result, setResult] = useState({
    gajiKotor: 0,
    ptkp: 0,
    pkp: 0,
    pph21Year: 0,
    pph21Month: 0,
    bpjsKes: 0,
    bpjsJht: 0,
    bpjsJp: 0,
    totalPotongan: 0,
    gajiBersih: 0,
  });

  function handleCalculate() {
    const gaji = parseInt(gajiRaw.replace(/\D/g, ""), 10) || 0;
    const tunjangan = parseInt(tunjanganRaw.replace(/\D/g, ""), 10) || 0;
    const gross = gaji + tunjangan;
    const ptkp = PTKP_OPTIONS[ptkpIdx].value;
    const pkpYear = Math.max(0, gross * 12 - ptkp);
    const pph21Year = calcPPh21(pkpYear);
    const pph21Month = pph21Year / 12;
    const bpjsKes = Math.min(gross, BPJS_KES_CAP) * BPJS_KES_RATE;
    const bpjsJht = gross * BPJS_JHT_RATE;
    const bpjsJp = gross * BPJS_JP_RATE;
    const totalPotongan = pph21Month + bpjsKes + bpjsJht + bpjsJp;
    const gajiBersih = gross - totalPotongan;

    setResult({
      gajiKotor: gross,
      ptkp,
      pkp: pkpYear,
      pph21Year,
      pph21Month,
      bpjsKes,
      bpjsJht,
      bpjsJp,
      totalPotongan,
      gajiBersih,
    });
    setCalculated(true);
  }

  const deductions = [
    {
      label: "PPh21",
      value: result.pph21Month,
      icon: Receipt,
      color: "text-error",
      bg: "bg-error/10",
      note: `${formatRp(result.pph21Year)} / tahun`,
    },
    {
      label: "BPJS Kesehatan (1%)",
      value: result.bpjsKes,
      icon: Shield,
      color: "text-primary",
      bg: "bg-primary/10",
      note: `Cap gaji ${formatRp(BPJS_KES_CAP)}`,
    },
    {
      label: "BPJS Ketenagakerjaan (JHT 2% + JP 1%)",
      value: result.bpjsJht + result.bpjsJp,
      icon: TrendingDown,
      color: "text-warning",
      bg: "bg-warning/10",
      note: `JHT ${formatRp(result.bpjsJht)} + JP ${formatRp(result.bpjsJp)}`,
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
          <span className="text-ink">Gaji Bersih</span>
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
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Kalkulator Gaji Bersih
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung take home pay setelah potongan PPh21, BPJS Kesehatan, dan BPJS
          Ketenagakerjaan.
        </p>

        {/* Form */}
        <div className="bg-canvas border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-ink mb-4">
            Masukkan Data Gaji
          </h2>

          <div className="space-y-4">
            {/* Gaji bulanan */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Gaji Kotor / Bulan
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

            {/* Tunjangan lain */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Tunjangan Lain{" "}
                <span className="text-ink-muted font-normal">(opsional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={tunjanganRaw}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    setTunjanganRaw(raw);
                  }}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Status PTKP */}
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
              Hitung Gaji Bersih
            </button>
          </div>
        </div>

        {/* Results */}
        {calculated && result.gajiKotor > 0 && (
          <div className="space-y-6">
            {/* Summary row */}
            <div className="bg-canvas border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">
                Ringkasan Perhitungan
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-ink-tertiary">Gaji Kotor / Bulan</div>
                <div className="text-ink font-medium text-right">
                  {formatRp(result.gajiKotor)}
                </div>
                <div className="text-ink-tertiary">PTKP / Tahun</div>
                <div className="text-ink font-medium text-right">
                  {formatRp(result.ptkp)}
                </div>
                <div className="text-ink-tertiary">PKP / Tahun</div>
                <div className="text-ink font-medium text-right">
                  {formatRp(result.pkp)}
                </div>
              </div>
            </div>

            {/* Deduction cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deductions.map((d) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.label}
                    className="bg-canvas border border-border rounded-xl p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`w-8 h-8 rounded-lg ${d.bg} flex items-center justify-center`}
                      >
                        <Icon className={`w-4 h-4 ${d.color}`} />
                      </div>
                      <span className="text-sm font-medium text-ink">
                        {d.label}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-ink">
                      {formatRp(d.value)}
                    </p>
                    <p className="text-xs text-ink-muted mt-1">{d.note}</p>
                  </div>
                );
              })}
            </div>

            {/* Total potongan */}
            <div className="bg-surface border border-border rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-ink-tertiary" />
                <span className="font-medium text-ink">
                  Total Potongan / Bulan
                </span>
              </div>
              <span className="text-xl font-bold text-error">
                - {formatRp(result.totalPotongan)}
              </span>
            </div>

            {/* Net salary */}
            <div className="bg-primary rounded-xl p-6 text-center">
              <p className="text-white/80 text-sm font-medium mb-1">
                Take Home Pay / Bulan
              </p>
              <p className="text-3xl md:text-4xl font-bold text-white">
                {formatRp(result.gajiBersih)}
              </p>
              <p className="text-white/60 text-sm mt-2">
                Gaji bersih setelah semua potongan
              </p>
            </div>
          </div>
        )}

        {/* Info tooltip */}
        {calculated && (
          <div className="mt-6 flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-ink-secondary">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-ink mb-1">Catatan Perhitungan</p>
              <ul className="list-disc list-inside space-y-1 text-ink-tertiary">
                <li>
                  PPh21 menggunakan tarif progresif sesuai UU HUP (UU 7/2021).
                </li>
                <li>
                  BPJS Kesehatan 1% dari gaji, maksimal gaji {formatRp(BPJS_KES_CAP)}.
                </li>
                <li>
                  BPJS TK: JHT 2% + JP 1% dari gaji tanpa batas.
                </li>
                <li>
                  Perhitungan bersifat estimasi. Konsultasikan dengan bagian
                  keuangan atau konsultan pajak untuk angka pasti.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Tentang Kalkulator Gaji Bersih Indonesia
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              Kalkulator gaji bersih Toolinter membantu karyawan di Indonesia
              menghitung <strong className="text-ink">take home pay</strong>{" "}
              secara instan. Masukkan gaji kotor bulanan, status PTKP, dan
              tunjangan lain, lalu dapatkan rincian potongan serta gaji bersih
              yang diterima setiap bulan.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Apa saja potongan gaji di Indonesia?
            </h3>
            <p>
              Potongan wajib pada slip gaji karyawan Indonesia umumnya terdiri
              dari <strong className="text-ink">PPh21</strong> (pajak penghasilan
              pasal 21),{" "}
              <strong className="text-ink">BPJS Kesehatan</strong> (iuran jaminan
              kesehatan), dan{" "}
              <strong className="text-ink">BPJS Ketenagakerjaan</strong> yang
              mencakup Jaminan Hari Tua (JHT) dan Jaminan Pensiun (JP).
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Bagaimana PPh21 dihitung?
            </h3>
            <p>
              PPh21 dihitung secara progresif dari Penghasilan Kena Pajak (PKP),
              yaitu penghasilan bruto setahun dikurangi PTKP. Tarif progresif
              berlaku: 5% untuk PKP sampai Rp 60 juta, 15% untuk Rp 60–250
              juta, 25% untuk Rp 250–500 juta, 30% untuk Rp 500 juta–5 miliar,
              dan 35% untuk di atas Rp 5 miliar.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Apa itu PTKP?
            </h3>
            <p>
              PTKP (Penghasilan Tidak Kena Pajak) adalah batas penghasilan yang
              tidak dikenakan pajak. Besarnya tergantung status perkawinan dan
              jumlah tanggungan. TK/0 sebesar Rp 54 juta/tahun, K/0 Rp 58,5
              juta, K/1 Rp 63 juta, K/2 Rp 67,5 juta, dan K/3 Rp 72
              juta/tahun.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Berapa iuran BPJS?
            </h3>
            <p>
              Iuran BPJS Kesehatan sebesar 1% dari gaji (maksimal gaji Rp 12
              juta). BPJS Ketenagakerjaan terdiri dari JHT 2% dan JP 1% dari
              gaji. Total iuran yang dipotong dari gaji karyawan adalah 3% untuk
              BPJS TK ditambah 1% BPJS Kesehatan.
            </p>
            <p>
              Kalkulator ini bersifat estimasi untuk perencanaan keuangan
              pribadi. Untuk perhitungan resmi, konsultasikan dengan HRD
              perusahaan atau konsultan pajak profesional.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
