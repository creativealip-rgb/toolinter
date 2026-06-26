'use client';

import { useState } from 'react';
import BlogLink from "@/components/blog-link";
import Link from 'next/link';
import {
  ArrowLeft,
  Home,
  Calculator,
  Info,
  ChevronDown,
} from 'lucide-react';
import AiInsightBox from "@/components/ai-insight-box";
import { ActionBar, CompareWrapper } from "@/components/action-bar";
import { Metadata } from 'next';

// metadata exported from layout or parent, but we add via head for client
// Actually for client components we can't export metadata. We'll handle via head or just note.

function formatRp(n: number): string {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}

interface AmortRow {
  year: number;
  principal: number;
  interest: number;
  payment: number;
  remaining: number;
}

export default function KprPage() {
  const [hargaRaw, setHargaRaw] = useState('500000000');
  const [dpPct, setDpPct] = useState('20');
  const [tenor, setTenor] = useState('20');
  const [bunga, setBunga] = useState('8.5');
  const [bungaType, setBungaType] = useState<'fixed' | 'floating'>('fixed');
  const [notarisRaw, setNotarisRaw] = useState('0');
  const [useCustomNotaris, setUseCustomNotaris] = useState(false);

  const [calculated, setCalculated] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [bunga2, setBunga2] = useState('7.5');
  const [result, setResult] = useState({
    pinjaman: 0,
    cicilan: 0,
    totalBayar: 0,
    totalBunga: 0,
    dp: 0,
    notaris: 0,
    amortTable: [] as AmortRow[],
  });

  function handleCalculate() {
    const harga = parseInt(hargaRaw.replace(/\D/g, ''), 10) || 0;
    const dp = harga * (parseFloat(dpPct) || 0) / 100;
    const pinjaman = harga - dp;
    const tenorYears = parseInt(tenor) || 0;
    const n = tenorYears * 12;
    const r = (parseFloat(bunga) || 0) / 100 / 12;
    const notaris = useCustomNotaris
      ? parseInt(notarisRaw.replace(/\D/g, ''), 10) || 0
      : harga * 0.01;

    if (pinjaman <= 0 || n <= 0 || r <= 0) {
      setCalculated(true);
      setResult({ pinjaman: 0, cicilan: 0, totalBayar: 0, totalBunga: 0, dp, notaris, amortTable: [] });
      return;
    }

    // Annuity formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const pow = Math.pow(1 + r, n);
    const cicilan = pinjaman * (r * pow) / (pow - 1);
    const totalBayar = cicilan * n;
    const totalBunga = totalBayar - pinjaman;

    // Amortization by year
    const amortTable: AmortRow[] = [];
    let remaining = pinjaman;
    for (let year = 1; year <= tenorYears; year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      let yearPayment = 0;
      for (let m = 0; m < 12; m++) {
        if (remaining <= 0) break;
        const interestMonth = remaining * r;
        const principalMonth = cicilan - interestMonth;
        yearInterest += interestMonth;
        yearPrincipal += principalMonth;
        yearPayment += cicilan;
        remaining -= principalMonth;
      }
      amortTable.push({
        year,
        principal: yearPrincipal,
        interest: yearInterest,
        payment: yearPayment,
        remaining: Math.max(0, remaining),
      });
    }

    setResult({ pinjaman, cicilan, totalBayar, totalBunga, dp, notaris, amortTable });
    setCalculated(true);
  }

  const harga = parseInt(hargaRaw.replace(/\D/g, ''), 10) || 0;

  return (
    <main className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/keuangan" className="hover:text-primary transition-colors">
            Keuangan
          </Link>
          <span>/</span>
          <span className="text-ink">Kalkulator KPR</span>
        </nav>

        {/* Back link */}
        <Link
          href="/keuangan"
          className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Home className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Kalkulator KPR
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung cicilan KPR rumah impian Anda. Masukkan harga properti, uang muka,
          tenor, dan suku bunga untuk melihat estimasi cicilan bulanan.
        </p>

        {/* Form */}
        <div className="bg-canvas border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-ink mb-4">
            Data Properti & Pinjaman
          </h2>

          <div className="space-y-4">
            {/* Harga properti */}
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                Harga Properti
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={hargaRaw}
                  onChange={(e) => setHargaRaw(e.target.value.replace(/\D/g, ''))}
                  placeholder="500.000.000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              {hargaRaw && (
                <p className="text-xs text-ink-muted mt-1">{formatRp(harga)}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DP */}
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                  Uang Muka (DP) %
                </label>
                <input
                  type="number"
                  value={dpPct}
                  onChange={(e) => setDpPct(e.target.value)}
                  min="0"
                  max="100"
                  placeholder="20"
                  className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {harga > 0 && (
                  <p className="text-xs text-ink-muted mt-1">
                    DP: {formatRp(harga * (parseFloat(dpPct) || 0) / 100)}
                  </p>
                )}
              </div>

              {/* Tenor */}
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                  Tenor (tahun)
                </label>
                <div className="relative">
                  <select
                    value={tenor}
                    onChange={(e) => setTenor(e.target.value)}
                    className="w-full appearance-none pl-3 pr-10 py-2 rounded-lg border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  >
                    {[5, 10, 15, 20, 25, 30].map((t) => (
                      <option key={t} value={t}>{t} tahun</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Suku bunga */}
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                  Suku Bunga (% per tahun)
                </label>
                <input
                  type="number"
                  value={bunga}
                  onChange={(e) => setBunga(e.target.value)}
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="8.5"
                  className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Bunga type */}
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                  Tipe Bunga
                </label>
                <div className="flex gap-2">
                  {(['fixed', 'floating'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setBungaType(type)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        bungaType === type
                          ? 'bg-primary text-white'
                          : 'bg-surface border border-border text-ink hover:bg-surface/80'
                      }`}
                    >
                      {type === 'fixed' ? 'Fixed' : 'Floating'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notaris */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="text-xs font-medium text-ink-tertiary">
                  Biaya Notaris
                </label>
                <button
                  onClick={() => setUseCustomNotaris(!useCustomNotaris)}
                  className="text-xs text-primary hover:underline"
                >
                  {useCustomNotaris ? 'Gunakan default (1%)' : 'Ubah manual'}
                </button>
              </div>
              {useCustomNotaris ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                    Rp
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={notarisRaw}
                    onChange={(e) => setNotarisRaw(e.target.value.replace(/\D/g, ''))}
                    placeholder="5.000.000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
              ) : (
                <p className="text-sm text-ink-muted py-2">
                  {harga > 0 ? formatRp(harga * 0.01) : 'Rp 0'} (1% dari harga properti)
                </p>
              )}
            </div>

            <button
              onClick={handleCalculate}
              className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Hitung Cicilan KPR
            </button>

            <button
              type="button"
              onClick={() => setCompareMode(!compareMode)}
              className="w-full rounded-lg border border-primary/30 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
            >
              {compareMode ? '✕ Tutup' : '🔀 Bandingkan Bank'}
            </button>

            {compareMode && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <label className="block text-sm font-medium text-ink mb-2">
                  Bunga Bank Lain (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={bunga2}
                  onChange={(e) => setBunga2(e.target.value)}
                  className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-ink focus:border-primary focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {calculated && (
          <div id="hasil-perhitungan" className="space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface rounded-xl border border-border p-6 text-center">
                <p className="text-sm text-ink-tertiary mb-1">Cicilan / Bulan</p>
                <p className="text-2xl font-bold text-primary">{formatRp(result.cicilan)}</p>
              </div>
              <div className="bg-surface rounded-xl border border-border p-6 text-center">
                <p className="text-sm text-ink-tertiary mb-1">Total Bunga</p>
                <p className="text-2xl font-bold text-error">{formatRp(result.totalBunga)}</p>
              </div>
              <div className="bg-surface rounded-xl border border-border p-6 text-center">
                <p className="text-sm text-ink-tertiary mb-1">Total Bayar</p>
                <p className="text-2xl font-bold text-ink">{formatRp(result.totalBayar)}</p>
              </div>
            </div>

            {/* Detail ringkasan */}
            <div className="bg-canvas border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">Ringkasan Pinjaman</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-ink-tertiary">Harga Properti</div>
                <div className="text-ink font-medium text-right">{formatRp(harga)}</div>
                <div className="text-ink-tertiary">Uang Muka ({dpPct}%)</div>
                <div className="text-ink font-medium text-right">{formatRp(result.dp)}</div>
                <div className="text-ink-tertiary">Pinjaman</div>
                <div className="text-ink font-medium text-right">{formatRp(result.pinjaman)}</div>
                <div className="text-ink-tertiary">Suku Bunga</div>
                <div className="text-ink font-medium text-right">{bunga}% ({bungaType})</div>
                <div className="text-ink-tertiary">Tenor</div>
                <div className="text-ink font-medium text-right">{tenor} tahun ({parseInt(tenor) * 12} bulan)</div>
                <div className="text-ink-tertiary">Biaya Notaris</div>
                <div className="text-ink font-medium text-right">{formatRp(result.notaris)}</div>
              </div>
            </div>

            {/* Amortization table */}
            <div className="bg-canvas border border-border rounded-xl p-6 overflow-x-auto">
              <h2 className="text-lg font-semibold text-ink mb-4">Tabel Amortisasi</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-ink-tertiary font-medium">Tahun</th>
                    <th className="text-right py-2 px-4 text-ink-tertiary font-medium">Cicilan</th>
                    <th className="text-right py-2 px-4 text-ink-tertiary font-medium">Pokok</th>
                    <th className="text-right py-2 px-4 text-ink-tertiary font-medium">Bunga</th>
                    <th className="text-right py-2 pl-4 text-ink-tertiary font-medium">Sisa Pinjaman</th>
                  </tr>
                </thead>
                <tbody>
                  {result.amortTable.map((row) => (
                    <tr key={row.year} className="border-b border-border/50 hover:bg-surface/50">
                      <td className="py-2 pr-4 text-ink">{row.year}</td>
                      <td className="py-2 px-4 text-ink text-right">{formatRp(row.payment)}</td>
                      <td className="py-2 px-4 text-ink text-right">{formatRp(row.principal)}</td>
                      <td className="py-2 px-4 text-error text-right">{formatRp(row.interest)}</td>
                      <td className="py-2 pl-4 text-ink text-right">{formatRp(row.remaining)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Error state */}
        {calculated && result.pinjaman <= 0 && (
          <div className="bg-error/10 text-error rounded-xl p-6 text-center">
            <p className="font-medium">Data tidak valid</p>
            <p className="text-sm mt-1">Pastikan harga properti, tenor, dan suku bunga terisi dengan benar.</p>
          </div>
        )}

        {/* AI Insight */}
        {calculated && (
          <div className="mt-6">
            <AiInsightBox
              title="AI KPR Advisor"
              description="Minta AI analisis cicilan KPR Anda dan beri saran strategi pelunasan."
              placeholder="Contoh: cicilan KPR saya wajar gak? Apakah ada strategi untuk kurangi total bunga?"
              buttonLabel="Analisis KPR dengan AI"
              context={`Data KPR user:\nHarga properti: ${formatRp(harga)}\nDP: ${dpPct}% = ${formatRp(result.dp)}\nPinjaman: ${formatRp(result.pinjaman)}\nTenor: ${tenor} tahun\nBunga: ${bunga}% (${bungaType})\nCicilan/bulan: ${formatRp(result.cicilan)}\nTotal bunga: ${formatRp(result.totalBunga)}\nTotal bayar: ${formatRp(result.totalBayar)}\nBiaya notaris: ${formatRp(result.notaris)}`}
              system="Kamu adalah asisten perencanaan KPR Indonesia. Beri saran praktis tentang cicilan KPR, strategi pelunasan dipercepat, dan tips negosiasi bunga bank."
            />
          </div>
        )}

        {/* Info */}
        {calculated && (
          <div className="mt-6 flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-ink-secondary">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-ink mb-1">Catatan Perhitungan</p>
              <ul className="list-disc list-inside space-y-1 text-ink-tertiary">
                <li>Perhitungan menggunakan metode anuitas (annuity) dengan bunga flat per bulan.</li>
                <li>Bunga floating dapat berubah sewaktu-waktu sesuai kebijakan bank.</li>
                <li>Biaya notaris default 1% dari harga properti, dapat diubah manual.</li>
                <li>Belum termasuk biaya lain seperti provisi, administrasi, dan asuransi.</li>
                <li>Perhitungan bersifat estimasi. Ajukan simulasi resmi ke bank untuk angka pasti.</li>
              </ul>
            </div>
          </div>
        )}

        <BlogLink toolPath="/keuangan/kpr" />
            <ActionBar
          tool="keuangan-kpr"
          toolName="Kalkulator KPR"
          shareItems={[["Cicilan/Bulan", formatRp(result.cicilan)], ["Total Bunga", formatRp(result.totalBunga)], ["Total Bayar", formatRp(result.totalBayar)]]}
          resultElementId="hasil-perhitungan"
          filename="kpr.pdf"
          show={calculated}
        />

        {compareMode && calculated && (() => {
          const harga2 = parseInt(hargaRaw.replace(/\D/g, ""), 10) || 0;
          const dp2 = harga2 * (parseFloat(dpPct) || 0) / 100;
          const pinjaman2 = harga2 - dp2;
          const tenorYears2 = parseInt(tenor) || 0;
          const n2 = tenorYears2 * 12;
          const r2 = (parseFloat(bunga2) || 0) / 100 / 12;
          const pow2 = Math.pow(1 + r2, n2);
          const cicilan2 = pinjaman2 > 0 && n2 > 0 && r2 > 0 ? pinjaman2 * (r2 * pow2) / (pow2 - 1) : 0;
          const totalBayar2 = cicilan2 * n2;
          const totalBunga2 = totalBayar2 - pinjaman2;
          const bedaCicilan = result.cicilan - cicilan2;
          const bedaBunga = result.totalBunga - totalBunga2;

          return (
            <div className="mt-6 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
              <h3 className="text-lg font-bold text-ink mb-4 text-center">🔀 Perbandingan Bank</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-white border border-blue-200 p-4 text-center">
                  <p className="text-sm font-bold text-blue-700 mb-2">Bank A — Bunga {bunga}%</p>
                  <p className="text-xs text-ink-tertiary mb-1">Cicilan/bulan</p>
                  <p className="text-xl font-bold text-ink">{formatRp(result.cicilan)}</p>
                  <p className="text-xs text-ink-tertiary mt-2">Total bunga</p>
                  <p className="text-sm font-semibold text-error">{formatRp(result.totalBunga)}</p>
                </div>
                <div className="rounded-lg bg-white border border-emerald-200 p-4 text-center">
                  <p className="text-sm font-bold text-emerald-700 mb-2">Bank B — Bunga {bunga2}%</p>
                  <p className="text-xs text-ink-tertiary mb-1">Cicilan/bulan</p>
                  <p className="text-xl font-bold text-ink">{formatRp(cicilan2)}</p>
                  <p className="text-xs text-ink-tertiary mt-2">Total bunga</p>
                  <p className="text-sm font-semibold text-error">{formatRp(totalBunga2)}</p>
                </div>
              </div>
              {bedaCicilan !== 0 && (
                <p className="mt-4 text-center text-sm font-semibold text-ink">
                  {bedaCicilan > 0 ? "🏆 Bank B lebih hemat" : "🏆 Bank A lebih hemat"} {formatRp(Math.abs(bedaCicilan))}/bulan — Total hemat {formatRp(Math.abs(bedaBunga))}
                </p>
              )}
            </div>
          );
        })()}

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Tentang Kalkulator KPR Indonesia
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              Kalkulator KPR Toolinter membantu Anda mengestimasi cicilan bulanan
              Kredit Pemilikan Rumah sebelum mengajukan ke bank. Dengan memasukkan
              harga properti, persentase uang muka (DP), tenor, dan suku bunga,
              Anda bisa langsung melihat cicilan per bulan, total bunga yang harus
              dibayar, serta tabel amortisasi per tahun.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Berapa DP minimal KPR?
            </h3>
            <p>
              Sesuai regulasi Bank Indonesia, uang muka (DP) minimal KPR umumnya
              adalah <strong className="text-ink">10-20%</strong> dari harga
              properti, tergantung jenis properti dan kebijakan bank. Beberapa
              bank menawarkan promo DP rendah bahkan 0% untuk properti tertentu.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
