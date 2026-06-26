'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Calculator, Sparkles } from 'lucide-react';
import AiInsightBox from '@/components/ai-insight-box';
import { ActionBar } from '@/components/action-bar';

function formatRp(n: number): string {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}

interface YearBreakdown {
  year: number;
  invested: number;
  value: number;
  gain: number;
}

export default function InvestasiPage() {
  const [modalRaw, setModalRaw] = useState('10000000');
  const [tambahanRaw, setTambahanRaw] = useState('1000000');
  const [tahunRaw, setTahunRaw] = useState('10');
  const [returnRaw, setReturnRaw] = useState('8');
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState({ totalAkhir: 0, totalInvestasi: 0, totalGain: 0, breakdown: [] as YearBreakdown[] });

  const handleHitung = () => {
    const modal = parseInt(modalRaw.replace(/\D/g, ''), 10) || 0;
    const tambahan = parseInt(tambahanRaw.replace(/\D/g, ''), 10) || 0;
    const tahun = parseInt(tahunRaw, 10) || 0;
    const ret = parseFloat(returnRaw) || 0;
    const r = ret / 100;

    const breakdown: YearBreakdown[] = [];
    let value = modal;
    let totalInvested = modal;

    for (let y = 1; y <= tahun; y++) {
      value = value * (1 + r) + tambahan * 12;
      totalInvested += tambahan * 12;
      breakdown.push({ year: y, invested: totalInvested, value: Math.round(value), gain: Math.round(value - totalInvested) });
    }

    setResult({
      totalAkhir: Math.round(value),
      totalInvestasi: totalInvested,
      totalGain: Math.round(value - totalInvested),
      breakdown,
    });
    setCalculated(true);
  };

  const aiTitle = "AI Investment Advisor";
const aiDesc = "Minta AI analisis proyeksi investasi Anda dan beri rekomendasi.";
const aiPlaceholder = "Contoh: apakah return 8% realistis? Instrumen apa yang cocok?";
const aiContext = calculated ? `Data Investasi:\nModal awal: ${formatRp(parseInt(modalRaw.replace(/\D/g,''),10)||0)}\nTambah bulanan: ${formatRp(parseInt(tambahanRaw.replace(/\D/g,''),10)||0)}\nJangka waktu: ${tahunRaw} tahun\nReturn: ${returnRaw}%/tahun\nTotal akhir: ${formatRp(result.totalAkhir)}\nTotal keuntungan: ${formatRp(result.totalGain)}` : '';

  return (
    <div className="min-h-screen bg-canvas">
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Link href="/keuangan" className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <h1 className="text-2xl font-bold text-ink mb-6">Kalkulator Investasi</h1>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-primary font-medium">📈 Hitung proyeksi pertumbuhan investasi Anda dengan compound interest.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Modal Awal (Rp)</label>
            <input value={modalRaw} onChange={e => setModalRaw(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="10000000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Tambah per Bulan (Rp)</label>
            <input value={tambahanRaw} onChange={e => setTambahanRaw(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="1000000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Jangka Waktu (tahun)</label>
            <input value={tahunRaw} onChange={e => setTahunRaw(e.target.value)} type="number" className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Return per Tahun (%)</label>
            <input value={returnRaw} onChange={e => setReturnRaw(e.target.value)} type="number" step="0.1" className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
        </div>

        <button onClick={handleHitung} className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5" /> Hitung Proyeksi
        </button>

        {calculated && (
          <div id="hasil-perhitungan">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Total Akhir', value: formatRp(result.totalAkhir), color: 'text-primary' },
                { label: 'Total Investasi', value: formatRp(result.totalInvestasi), color: 'text-ink' },
                { label: 'Total Keuntungan', value: formatRp(result.totalGain), color: 'text-green-600' },
              ].map((item) => (
                <div key={item.label} className="bg-canvas border border-border rounded-xl p-4 text-center">
                  <div className="text-sm text-ink-tertiary mb-1">{item.label}</div>
                  <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
                </div>
              ))}
            </div>

            <div className="bg-canvas border border-border rounded-xl p-6 mb-6 overflow-x-auto">
              <h3 className="font-semibold text-ink mb-4">Breakdown per Tahun</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-ink-tertiary font-medium">Tahun</th>
                    <th className="text-right py-2 text-ink-tertiary font-medium">Total Investasi</th>
                    <th className="text-right py-2 text-ink-tertiary font-medium">Nilai</th>
                    <th className="text-right py-2 text-ink-tertiary font-medium">Keuntungan</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map((row) => (
                    <tr key={row.year} className="border-b border-border/50">
                      <td className="py-2 text-ink">{row.year}</td>
                      <td className="py-2 text-right text-ink-secondary">{formatRp(row.invested)}</td>
                      <td className="py-2 text-right text-ink font-medium">{formatRp(row.value)}</td>
                      <td className="py-2 text-right text-green-600">{formatRp(row.gain)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {calculated && <ActionBar tool="keuangan-investasi" toolName="Kalkulator Investasi" shareItems={[["Total Akhir", formatRp(result.totalAkhir)], ["Keuntungan", formatRp(result.totalGain)]]} resultElementId="hasil-perhitungan" filename="proyeksi-investasi" show={true} />}
        {calculated && (
          <div className="mt-6">
            <AiInsightBox title={aiTitle} description={aiDesc} placeholder={aiPlaceholder} buttonLabel="Analisis Investasi" context={aiContext} system="Anda adalah financial advisor. Analisis proyeksi investasi dan beri rekomendasi instrumen." />
          </div>
        )}
      </main>
    </div>
  );
}
