'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  AlertTriangle,
  Calculator,
  Info,
  ChevronDown,
  ShieldAlert,
  Clock,
  TrendingUp,
} from 'lucide-react';
import AiInsightBox from '@/components/ai-insight-box';

function formatRp(n: number): string {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}

const TENOR_OPTIONS = [7, 14, 21, 30, 60, 90, 180, 365];

interface PinjolResult {
  totalBunga: number;
  totalBayar: number;
  cicilanPerHari: number;
  biayaAdmin: number;
  simulasiTerlambat: { hari: number; denda: number; total: number }[];
}

function hitungPinjol(
  pinjaman: number,
  tenor: number,
  bungaPerHari: number,
  biayaAdminRaw: number,
  adminIsPercent: boolean,
  dendaPerHari: number,
): PinjolResult {
  const totalBunga = pinjaman * (bungaPerHari / 100) * tenor;
  const biayaAdmin = adminIsPercent
    ? pinjaman * (biayaAdminRaw / 100)
    : biayaAdminRaw;
  const totalBayar = pinjaman + totalBunga + biayaAdmin;
  const cicilanPerHari = totalBayar / tenor;

  const simulasiTerlambat = [7, 14, 30].map((hari) => {
    const denda = dendaPerHari * hari;
    return { hari, denda, total: totalBayar + denda };
  });

  return { totalBunga, totalBayar, cicilanPerHari, biayaAdmin, simulasiTerlambat };
}

interface TenorComparison {
  tenor: number;
  totalBunga: number;
  totalBayar: number;
  cicilanPerHari: number;
}

function bandingkanTenor(
  pinjaman: number,
  bungaPerHari: number,
  biayaAdminRaw: number,
  adminIsPercent: boolean,
): TenorComparison[] {
  const admin = adminIsPercent
    ? pinjaman * (biayaAdminRaw / 100)
    : biayaAdminRaw;
  return [7, 14, 30].map((t) => {
    const totalBunga = pinjaman * (bungaPerHari / 100) * t;
    const totalBayar = pinjaman + totalBunga + admin;
    return { tenor: t, totalBunga, totalBayar, cicilanPerHari: totalBayar / t };
  });
}

export default function PinjolPage() {
  const [pinjamanRaw, setPinjamanRaw] = useState('');
  const [tenor, setTenor] = useState('30');
  const [bungaPerHari, setBungaPerHari] = useState('0.3');
  const [biayaAdminRaw, setBiayaAdminRaw] = useState('');
  const [adminMode, setAdminMode] = useState<'rp' | 'pct'>('rp');
  const [dendaPerHariRaw, setDendaPerHariRaw] = useState('');

  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState<PinjolResult | null>(null);
  const [tenorComp, setTenorComp] = useState<TenorComparison[]>([]);

  const pinjaman = parseInt(pinjamanRaw.replace(/\D/g, ''), 10) || 0;
  const biayaAdminVal = adminMode === 'rp'
    ? (parseInt(biayaAdminRaw.replace(/\D/g, ''), 10) || 0)
    : (parseFloat(biayaAdminRaw) || 0);
  const dendaPerHari = parseInt(dendaPerHariRaw.replace(/\D/g, ''), 10) || 0;

  function handleCalculate() {
    if (pinjaman <= 0 || !bungaPerHari) return;

    const res = hitungPinjol(
      pinjaman,
      parseInt(tenor) || 30,
      parseFloat(bungaPerHari) || 0,
      biayaAdminVal,
      adminMode === 'pct',
      dendaPerHari,
    );
    setResult(res);

    const comp = bandingkanTenor(
      pinjaman,
      parseFloat(bungaPerHari) || 0,
      biayaAdminVal,
      adminMode === 'pct',
    );
    setTenorComp(comp);
    setCalculated(true);
  }

  const bungaVal = parseFloat(bungaPerHari) || 0;
  const isHighRate = bungaVal > 0.8;

  return (
    <main className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/keuangan" className="hover:text-primary transition-colors">
            Keuangan
          </Link>
          <span>/</span>
          <span className="text-ink">Kalkulator Pinjol</span>
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
          <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-error" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Kalkulator Pinjol OJK
          </h1>
        </div>
        <p className="text-ink-tertiary mb-6">
          Hitung total biaya pinjaman online, bandingkan tenor, dan lihat simulasi denda keterlambatan.
        </p>

        {/* Disclaimer */}
        <div className="bg-error/10 border border-error/30 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-error flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-error mb-2">⚠️ Peringatan Pinjaman Online</h2>
              <ul className="text-sm text-ink space-y-1.5 list-disc list-inside">
                <li>Pinjaman online legal <strong>harus terdaftar OJK</strong>. Cek daftar fintech legal di{' '}
                  <a href="https://ojk.go.id" target="_blank" rel="noopener noreferrer" className="text-primary underline">ojk.go.id</a>
                </li>
                <li>Pinjaman dengan bunga <strong>&gt;0.8%/hari termasuk sangat tinggi</strong></li>
                <li>Bayar tepat waktu untuk menghindari denda yang menumpuk</li>
                <li>Jangan pinjam lebih dari kemampuan bayar Anda</li>
                <li>Hindari &ldquo;gali lubang tutup lubang&rdquo; — pinjam dari satu fintech untuk bayar utang lain</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-canvas border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-ink mb-4">Data Pinjaman</h2>
          <div className="space-y-4">
            {/* Jumlah pinjaman */}
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                Jumlah Pinjaman
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={pinjamanRaw}
                  onChange={(e) => setPinjamanRaw(e.target.value.replace(/\D/g, ''))}
                  placeholder="1.000.000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              {pinjaman > 0 && (
                <p className="text-xs text-ink-muted mt-1">{formatRp(pinjaman)}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tenor */}
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                  Tenor (hari)
                </label>
                <div className="relative">
                  <select
                    value={tenor}
                    onChange={(e) => setTenor(e.target.value)}
                    className="w-full appearance-none pl-3 pr-10 py-2 rounded-lg border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  >
                    {TENOR_OPTIONS.map((t) => (
                      <option key={t} value={t}>{t} hari</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
                </div>
              </div>

              {/* Bunga per hari */}
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                  Bunga per Hari (%)
                </label>
                <input
                  type="number"
                  value={bungaPerHari}
                  onChange={(e) => setBungaPerHari(e.target.value)}
                  min="0"
                  max="5"
                  step="0.01"
                  placeholder="0.3"
                  className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {bungaVal > 0 && (
                  <p className={`text-xs mt-1 ${isHighRate ? 'text-error font-medium' : 'text-ink-muted'}`}>
                    {isHighRate ? '⚠️ Bunga sangat tinggi!' : `Efektif ~${(bungaVal * 30).toFixed(1)}%/bulan`}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Biaya admin */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="text-xs font-medium text-ink-tertiary">
                    Biaya Admin
                  </label>
                  <div className="flex gap-1">
                    {(['rp', 'pct'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setAdminMode(m)}
                        className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                          adminMode === m
                            ? 'bg-primary text-white'
                            : 'bg-surface border border-border text-ink-muted hover:text-ink'
                        }`}
                      >
                        {m === 'rp' ? 'Rp' : '%'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                    {adminMode === 'rp' ? 'Rp' : '%'}
                  </span>
                  <input
                    type={adminMode === 'rp' ? 'text' : 'number'}
                    inputMode={adminMode === 'rp' ? 'numeric' : 'decimal'}
                    value={biayaAdminRaw}
                    onChange={(e) => setBiayaAdminRaw(adminMode === 'rp' ? e.target.value.replace(/\D/g, '') : e.target.value)}
                    placeholder={adminMode === 'rp' ? '10.000' : '1'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Denda per hari */}
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                  Denda Keterlambatan per Hari
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                    Rp
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={dendaPerHariRaw}
                    onChange={(e) => setDendaPerHariRaw(e.target.value.replace(/\D/g, ''))}
                    placeholder="10.000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
                {dendaPerHari > 0 && (
                  <p className="text-xs text-ink-muted mt-1">{formatRp(dendaPerHari)}/hari</p>
                )}
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Hitung Pinjaman
            </button>
          </div>
        </div>

        {/* Results */}
        {calculated && result && (
          <div className="space-y-6">
            {/* High rate warning */}
            {isHighRate && (
              <div className="bg-error/10 border border-error/30 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-error">Bunga Sangat Tinggi!</p>
                  <p className="text-ink-tertiary mt-1">
                    Bunga {bungaPerHari}%/hari = ~{(bungaVal * 30).toFixed(1)}%/bulan = ~{(bungaVal * 365).toFixed(0)}%/tahun.
                    Ini termasuk bunga sangat tinggi. Pertimbangkan alternatif lain.
                  </p>
                </div>
              </div>
            )}

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-surface rounded-xl border border-border p-5 text-center">
                <p className="text-xs text-ink-tertiary mb-1">Total Bunga</p>
                <p className="text-xl font-bold text-error">{formatRp(result.totalBunga)}</p>
              </div>
              <div className="bg-surface rounded-xl border border-border p-5 text-center">
                <p className="text-xs text-ink-tertiary mb-1">Biaya Admin</p>
                <p className="text-xl font-bold text-ink">{formatRp(result.biayaAdmin)}</p>
              </div>
              <div className="bg-surface rounded-xl border border-border p-5 text-center">
                <p className="text-xs text-ink-tertiary mb-1">Total Bayar</p>
                <p className="text-xl font-bold text-primary">{formatRp(result.totalBayar)}</p>
              </div>
              <div className="bg-surface rounded-xl border border-border p-5 text-center">
                <p className="text-xs text-ink-tertiary mb-1">Bayar per Hari</p>
                <p className="text-xl font-bold text-ink">{formatRp(result.cicilanPerHari)}</p>
              </div>
            </div>

            {/* Ringkasan */}
            <div className="bg-canvas border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">Ringkasan Pinjaman</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-ink-tertiary">Jumlah Pinjaman</div>
                <div className="text-ink font-medium text-right">{formatRp(pinjaman)}</div>
                <div className="text-ink-tertiary">Tenor</div>
                <div className="text-ink font-medium text-right">{tenor} hari</div>
                <div className="text-ink-tertiary">Bunga per Hari</div>
                <div className="text-ink font-medium text-right">{bungaPerHari}%</div>
                <div className="text-ink-tertiary">Total Bunga</div>
                <div className="text-error font-medium text-right">{formatRp(result.totalBunga)}</div>
                <div className="text-ink-tertiary">Biaya Admin</div>
                <div className="text-ink font-medium text-right">{formatRp(result.biayaAdmin)}</div>
                <div className="text-ink-tertiary border-t border-border pt-2 font-semibold">Total Bayar</div>
                <div className="text-ink font-bold text-right border-t border-border pt-2">{formatRp(result.totalBayar)}</div>
              </div>
            </div>

            {/* Perbandingan Tenor */}
            <div className="bg-canvas border border-border rounded-xl p-6 overflow-x-auto">
              <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Perbandingan Tenor
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-ink-tertiary font-medium">Tenor</th>
                    <th className="text-right py-2 px-4 text-ink-tertiary font-medium">Total Bunga</th>
                    <th className="text-right py-2 px-4 text-ink-tertiary font-medium">Total Bayar</th>
                    <th className="text-right py-2 pl-4 text-ink-tertiary font-medium">Bayar/Hari</th>
                  </tr>
                </thead>
                <tbody>
                  {tenorComp.map((row) => (
                    <tr
                      key={row.tenor}
                      className={`border-b border-border/50 hover:bg-surface/50 ${
                        String(row.tenor) === tenor ? 'bg-primary/5 font-semibold' : ''
                      }`}
                    >
                      <td className="py-2.5 pr-4 text-ink">
                        {row.tenor} hari
                        {String(row.tenor) === tenor && (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">dipilih</span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-error text-right">{formatRp(row.totalBunga)}</td>
                      <td className="py-2.5 px-4 text-ink text-right">{formatRp(row.totalBayar)}</td>
                      <td className="py-2.5 pl-4 text-ink text-right">{formatRp(row.cicilanPerHari)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Simulasi Denda */}
            {dendaPerHari > 0 && (
              <div className="bg-canvas border border-border rounded-xl p-6">
                <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-error" />
                  Simulasi Keterlambatan
                </h2>
                <p className="text-sm text-ink-tertiary mb-4">
                  Denda keterlambatan {formatRp(dendaPerHari)}/hari. Berikut total yang harus dibayar jika terlambat:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 pr-4 text-ink-tertiary font-medium">Terlambat</th>
                        <th className="text-right py-2 px-4 text-ink-tertiary font-medium">Total Denda</th>
                        <th className="text-right py-2 px-4 text-ink-tertiary font-medium">Total Bayar + Denda</th>
                        <th className="text-right py-2 pl-4 text-ink-tertiary font-medium">Kenaikan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.simulasiTerlambat.map((row) => (
                        <tr key={row.hari} className="border-b border-border/50 hover:bg-surface/50">
                          <td className="py-2.5 pr-4 text-ink font-medium">{row.hari} hari</td>
                          <td className="py-2.5 px-4 text-error text-right">{formatRp(row.denda)}</td>
                          <td className="py-2.5 px-4 text-ink font-medium text-right">{formatRp(row.total)}</td>
                          <td className="py-2.5 pl-4 text-error text-right">
                            +{((row.denda / result.totalBayar) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error state */}
        {calculated && !result && (
          <div className="bg-error/10 text-error rounded-xl p-6 text-center">
            <p className="font-medium">Data tidak valid</p>
            <p className="text-sm mt-1">Pastikan jumlah pinjaman dan bunga terisi dengan benar.</p>
          </div>
        )}

        {/* AI Insight */}
        {calculated && result && (
          <div className="mt-6">
            <AiInsightBox
              title="AI Pinjol Advisor"
              description="Minta AI analisis pinjaman Anda dan beri saran keuangan."
              placeholder="Contoh: apakah pinjaman ini wajar? Berapa lama idealnya saya pinjam?"
              buttonLabel="Analisis Pinjaman dengan AI"
              context={`Data pinjaman online user:\nJumlah: ${formatRp(pinjaman)}\nTenor: ${tenor} hari\nBunga: ${bungaPerHari}%/hari\nBiaya admin: ${formatRp(result.biayaAdmin)}\nTotal bunga: ${formatRp(result.totalBunga)}\nTotal bayar: ${formatRp(result.totalBayar)}\nBayar/hari: ${formatRp(result.cicilanPerHari)}\nDenda/hari: ${formatRp(dendaPerHari)}\n${isHighRate ? 'PERINGATAN: Bunga sangat tinggi!' : ''}`}
              system="Kamu adalah penasihat keuangan Indonesia. Bantu user memahami biaya pinjaman online, apakah wajar atau tidak, dan beri saran alternatif jika bunga terlalu tinggi. Selalu sarankan cek legalitas fintech di ojk.go.id."
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
                <li>Bunga dihitung flat dari total pinjaman (bukan sisa pinjaman).</li>
                <li>Fintech legal wajib terdaftar dan diawasi OJK.</li>
                <li>Bunga &gt;0.8%/hari (~24%/bulan) termasuk sangat tinggi dan berisiko.</li>
                <li>Denda keterlambatan bisa menumpuk cepat — bayar tepat waktu!</li>
                <li>Perhitungan bersifat estimasi. Cek detail biaya di perjanjian pinjaman.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Disclaimer bottom */}
        <div className="mt-8 bg-error/10 border border-error/30 rounded-xl p-5">
          <p className="text-sm text-ink">
            <strong className="text-error">Disclaimer:</strong> Pinjaman online legal harus terdaftar OJK.
            Cek daftar fintech legal di{' '}
            <a href="https://ojk.go.id" target="_blank" rel="noopener noreferrer" className="text-primary underline">ojk.go.id</a>.
            Pinjaman dengan bunga &gt;0.8%/hari termasuk sangat tinggi. Gunakan kalkulator ini sebagai referensi,
            bukan saran keuangan profesional.
          </p>
        </div>

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Tentang Kalkulator Pinjol OJK
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              Kalkulator Pinjol OJK dari Toolinter membantu Anda menghitung total biaya pinjaman online
              sebelum mengajukan. Dengan memasukkan jumlah pinjaman, tenor, bunga harian, dan biaya admin,
              Anda bisa melihat gambaran lengkap biaya yang harus ditanggung.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Bagaimana cara cek pinjol legal?
            </h3>
            <p>
              Pastikan fintech yang Anda gunakan terdaftar di <strong className="text-ink">Otoritas Jasa Keuangan (OJK)</strong>.
              Cek daftar lengkapnya di situs resmi ojk.go.id. Hindari fintech ilegal yang menawarkan bunga
              tidak wajar dan melakukan penagihan dengan cara intimidasi.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Berapa bunga pinjol yang wajar?
            </h3>
            <p>
              OJK menetapkan batas bunga pinjaman fintech P2P lending maksimal <strong className="text-ink">0.8% per hari</strong>.
              Pinjaman dengan bunga di atas batas ini termasuk sangat tinggi dan berisiko. Bandingkan
              beberapa fintech sebelum meminjam.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
