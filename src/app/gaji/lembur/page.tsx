'use client';

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Info,
  ChevronDown,
  Calculator,
  TrendingUp,
} from "lucide-react";

// --- Helpers ---

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

// --- Overtime calculation per PP 35/2021 ---

const HARI_OPTIONS = [
  { value: "weekday", label: "Hari Kerja Biasa (Senin–Jumat)" },
  { value: "saturday", label: "Hari Sabtu / Minggu" },
  { value: "holiday", label: "Hari Libur Nasional" },
];

interface BreakdownItem {
  label: string;
  hours: number;
  rate: number;
  total: number;
}

function calcOvertime(
  gajiPerJam: number,
  jamLembur: number,
  jenisHari: string
): { tarif: number; total: number; breakdown: BreakdownItem[] } {
  const breakdown: BreakdownItem[] = [];
  let remaining = jamLembur;
  let total = 0;

  function addBreakdown(label: string, maxHours: number, rate: number) {
    if (remaining <= 0) return;
    const hours = Math.min(remaining, maxHours);
    const subtotal = gajiPerJam * rate * hours;
    breakdown.push({ label, hours, rate, total: subtotal });
    total += subtotal;
    remaining -= hours;
  }

  if (jenisHari === "weekday") {
    // Hari kerja: jam 1-2 = 1.5x, jam ke-3 = 2x, jam ke-4+ = 3x
    addBreakdown("Jam ke-1 s/d ke-2 (1.5×)", 2, 1.5);
    addBreakdown("Jam ke-3 (2×)", 1, 2);
    addBreakdown("Jam ke-4 dst (3×)", 999, 3);
  } else {
    // Sabtu/Minggu & Libur Nasional: jam 1-7 = 2x, jam ke-8 = 3x, jam ke-9+ = 4x
    addBreakdown("Jam ke-1 s/d ke-7 (2×)", 7, 2);
    addBreakdown("Jam ke-8 (3×)", 1, 3);
    addBreakdown("Jam ke-9 dst (4×)", 999, 4);
  }

  const avgRate = jamLembur > 0 ? total / (gajiPerJam * jamLembur) : 0;
  return { tarif: avgRate, total, breakdown };
}

// --- Component ---

export default function LemburPage() {
  const [gajiRaw, setGajiRaw] = useState("");
  const [jamLembur, setJamLembur] = useState("");
  const [hariLembur, setHariLembur] = useState("");
  const [jenisHari, setJenisHari] = useState("weekday");
  const [calculated, setCalculated] = useState(false);

  const [result, setResult] = useState({
    gajiPokok: 0,
    gajiPerJam: 0,
    tarifLembur: 0,
    totalPerHari: 0,
    totalPerBulan: 0,
    breakdown: [] as BreakdownItem[],
  });

  function handleCalculate() {
    const gajiPokok = parseInt(gajiRaw.replace(/\D/g, ""), 10) || 0;
    const jam = parseFloat(jamLembur) || 0;
    const hari = parseFloat(hariLembur) || 0;

    const gajiPerJam = gajiPokok / 173; // 173 standard hours/month
    const { tarif, total, breakdown } = calcOvertime(gajiPerJam, jam, jenisHari);

    setResult({
      gajiPokok,
      gajiPerJam,
      tarifLembur: tarif,
      totalPerHari: total,
      totalPerBulan: total * hari,
      breakdown,
    });
    setCalculated(true);
  }

  const infoCards = [
    {
      label: "Gaji Per Jam",
      value: formatRp(result.gajiPerJam),
      note: "Gaji pokok ÷ 173 jam/bulan",
      icon: Clock,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Tarif Lembur Rata-rata",
      value: `${result.tarifLembur.toFixed(2)}×`,
      note: "Rata-rata multiplier per jam",
      icon: TrendingUp,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      label: "Total Lembur / Bulan",
      value: formatRp(result.totalPerBulan),
      note: `${formatRp(result.totalPerHari)} × ${hariLembur || 0} hari`,
      icon: Calculator,
      color: "text-success",
      bg: "bg-success/10",
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
          <span className="text-ink">Lembur</span>
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
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Kalkulator Lembur
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung upah lembur berdasarkan PP 35/2021 tentang Pengupahan.
          Sesuaikan dengan jenis hari kerja.
        </p>

        {/* Form */}
        <div className="bg-canvas border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-ink mb-4">
            Masukkan Data Lembur
          </h2>

          <div className="space-y-4">
            {/* Gaji pokok */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Gaji Pokok / Bulan
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
                  placeholder="5.000.000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              {gajiRaw && (
                <p className="text-xs text-ink-muted mt-1">
                  {formatRp(parseInt(gajiRaw.replace(/\D/g, ""), 10) || 0)}
                </p>
              )}
            </div>

            {/* Jam lembur per hari */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Jam Lembur Per Hari
              </label>
              <input
                type="number"
                inputMode="decimal"
                min="0.5"
                max="8"
                step="0.5"
                value={jamLembur}
                onChange={(e) => setJamLembur(e.target.value)}
                placeholder="2"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
              <p className="text-xs text-ink-muted mt-1">
                Maksimal 3 jam/hari kerja, 8 jam/hari libur (PP 35/2021)
              </p>
            </div>

            {/* Hari lembur per bulan */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Hari Lembur Per Bulan
              </label>
              <input
                type="number"
                inputMode="numeric"
                min="1"
                max="30"
                value={hariLembur}
                onChange={(e) => setHariLembur(e.target.value)}
                placeholder="4"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>

            {/* Jenis hari */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Jenis Hari Lembur
              </label>
              <div className="relative">
                <select
                  value={jenisHari}
                  onChange={(e) => setJenisHari(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                >
                  {HARI_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
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
              Hitung Upah Lembur
            </button>
          </div>
        </div>

        {/* Results */}
        {calculated && result.gajiPokok > 0 && (
          <div className="space-y-6">
            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {infoCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="bg-canvas border border-border rounded-xl p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`}
                      >
                        <Icon className={`w-4 h-4 ${card.color}`} />
                      </div>
                      <span className="text-sm font-medium text-ink">
                        {card.label}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-ink">{card.value}</p>
                    <p className="text-xs text-ink-muted mt-1">{card.note}</p>
                  </div>
                );
              })}
            </div>

            {/* Breakdown table */}
            {result.breakdown.length > 0 && (
              <div className="bg-canvas border border-border rounded-xl p-6">
                <h2 className="text-lg font-semibold text-ink mb-4">
                  Rincian Perhitungan
                </h2>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-ink-tertiary font-medium">
                        Jam
                      </th>
                      <th className="text-center py-2 text-ink-tertiary font-medium">
                        Jam
                      </th>
                      <th className="text-center py-2 text-ink-tertiary font-medium">
                        Rate
                      </th>
                      <th className="text-right py-2 text-ink-tertiary font-medium">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.breakdown.map((item, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2.5 text-ink">{item.label}</td>
                        <td className="py-2.5 text-center text-ink">
                          {item.hours}
                        </td>
                        <td className="py-2.5 text-center text-ink">
                          {item.rate}×
                        </td>
                        <td className="py-2.5 text-right font-medium text-ink">
                          {formatRp(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-border">
                      <td
                        colSpan={3}
                        className="py-2.5 text-ink font-medium"
                      >
                        Total Lembur / Hari
                      </td>
                      <td className="py-2.5 text-right font-bold text-primary">
                        {formatRp(result.totalPerHari)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            {/* Total lembur/bulan */}
            <div className="bg-primary rounded-xl p-6 text-center">
              <p className="text-white/80 text-sm font-medium mb-1">
                Total Upah Lembur / Bulan
              </p>
              <p className="text-3xl md:text-4xl font-bold text-white">
                {formatRp(result.totalPerBulan)}
              </p>
              <p className="text-white/60 text-sm mt-2">
                {formatRp(result.totalPerHari)} × {hariLembur || 0} hari lembur
              </p>
            </div>
          </div>
        )}

        {/* Info callout */}
        {calculated && (
          <div className="mt-6 flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-ink-secondary">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-ink mb-1">
                Tentang Perhitungan Lembur
              </p>
              <ul className="list-disc list-inside space-y-1 text-ink-tertiary">
                <li>
                  Perhitungan mengacu pada{" "}
                  <strong className="text-ink">PP 35/2021</strong> tentang
                  Pengupahan.
                </li>
                <li>
                  Gaji per jam = gaji pokok ÷ 173 jam (standar jam kerja
                  bulanan).
                </li>
                <li>
                  Hari kerja: jam 1–2 sebesar 1.5×, jam ke-3 sebesar 2×, jam
                  ke-4+ sebesar 3×.
                </li>
                <li>
                  Sabtu/Minggu & Libur Nasional: jam 1–7 sebesar 2×, jam ke-8
                  sebesar 3×, jam ke-9+ sebesar 4×.
                </li>
                <li>
                  Perhitungan bersifat estimasi. Konsultasikan dengan HRD
                  perusahaan untuk angka pasti.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Tentang Kalkulator Lembur Indonesia
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              Kalkulator lembur Toolinter membantu karyawan di Indonesia
              menghitung <strong className="text-ink">upah lembur</strong>{" "}
              secara akurat sesuai peraturan perundang-undangan yang berlaku.
              Masukkan gaji pokok, jam lembur, dan jenis hari, lalu dapatkan
              rincian upah lembur per hari dan per bulan.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Apa itu PP 35/2021?
            </h3>
            <p>
              <strong className="text-ink">
                Peraturan Pemerintah Nomor 35 Tahun 2021
              </strong>{" "}
              tentang Pengupahan mengatur cara menghitung upah lembur bagi
              karyawan yang bekerja melebihi jam kerja normal. PP ini
              menggantikan aturan sebelumnya (PP 78/2015) dan menetapkan
              bahwa upah lembur dihitung berdasarkan upah per jam dari gaji
              pokok.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Bagaimana rumus upah lembur?
            </h3>
            <p>
              Upah per jam = gaji pokok ÷ 173 jam per bulan. Untuk hari
              kerja biasa, 2 jam pertama dibayar 1.5× upah per jam, jam
              ke-3 dibayar 2×. Untuk hari libur (termasuk Sabtu/Minggu
              bagi yang libur), 7 jam pertama dibayar 2×, jam ke-8 dibayar
              3×, dan jam ke-9 dst dibayar 4× upah per jam.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Berapa batas jam lembur?
            </h3>
            <p>
              Sesuai PP 35/2021, batas lembur adalah{" "}
              <strong className="text-ink">3 jam per hari</strong> untuk hari
              kerja dan <strong className="text-ink">8 jam per hari</strong>{" "}
              untuk hari libur. Total lembur dalam seminggu tidak boleh
              melebihi 14 jam.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Siapa yang berhak atas upah lembur?
            </h3>
            <p>
              Semua karyawan yang bekerja di atas jam kerja normal berhak
              mendapat upah lembur, kecuali karyawan dengan jabatan
              tertentu yang waktu kerjanya tidak dapat dibatasi (seperti
              direktur atau pejabat eksekutif). Upah lembur harus
              dibayarkan paling lambat akhir bulan berikutnya.
            </p>
            <p>
              Kalkulator ini bersifat estimasi untuk perencanaan keuangan
              pribadi. Untuk perhitungan resmi, konsultasikan dengan HRD
              perusahaan atau konsultan ketenagakerjaan profesional.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
