'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Search, TrendingUp, ArrowRight } from 'lucide-react';
import AiInsightBox from '@/components/ai-insight-box';
import { ActionBar } from '@/components/action-bar';

const UMR_DATA = [
  { kota: 'Jakarta', umr: 5396761 },
  { kota: 'Surabaya', umr: 4525000 },
  { kota: 'Bandung', umr: 4419000 },
  { kota: 'Semarang', umr: 3254000 },
  { kota: 'Yogyakarta', umr: 2267000 },
  { kota: 'Medan', umr: 3446000 },
  { kota: 'Makassar', umr: 3530000 },
  { kota: 'Denpasar', umr: 2942000 },
  { kota: 'Palembang', umr: 3467000 },
  { kota: 'Batam', umr: 4568000 },
  { kota: 'Balikpapan', umr: 3468000 },
  { kota: 'Malang', umr: 3279000 },
  { kota: 'Bogor', umr: 4478000 },
  { kota: 'Bekasi', umr: 5148000 },
  { kota: 'Tangerang', umr: 4501000 },
  { kota: 'Depok', umr: 4743000 },
  { kota: 'Solo', umr: 2267000 },
  { kota: 'Manado', umr: 3585000 },
  { kota: 'Banjarmasin', umr: 3317000 },
  { kota: 'Pontianak', umr: 2678000 },
  { kota: 'Samarinda', umr: 3375000 },
  { kota: 'Padang', umr: 2742000 },
  { kota: 'Pekanbaru', umr: 3196000 },
  { kota: 'Lampung', umr: 2718000 },
  { kota: 'Serang', umr: 2912000 },
  { kota: 'Cilegon', umr: 4544000 },
  { kota: 'Karawang', umr: 5298000 },
  { kota: 'Cikarang', umr: 5148000 },
  { kota: 'Sidoarjo', umr: 4525000 },
  { kota: 'Gresik', umr: 4525000 },
  { kota: 'Pasuruan', umr: 3279000 },
  { kota: 'Probolinggo', umr: 2603000 },
  { kota: 'Banyuwangi', umr: 2416000 },
  { kota: 'Tuban', umr: 2373000 },
].sort((a, b) => b.umr - a.umr);

function formatRp(n: number): string {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export default function UmrPage() {
  const [search, setSearch] = useState('');
  const [compareA, setCompareA] = useState('');
  const [compareB, setCompareB] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return UMR_DATA;
    const q = search.toLowerCase();
    return UMR_DATA.filter((d) => d.kota.toLowerCase().includes(q));
  }, [search]);

  const kotaA = UMR_DATA.find((d) => d.kota === compareA);
  const kotaB = UMR_DATA.find((d) => d.kota === compareB);
  const showCompare = kotaA && kotaB;

  const aiTitle = "AI UMR Analyst";
const aiDesc = "Minta AI analisis UMR dan cost of living kota pilihan Anda.";
const aiPlaceholder = "Contoh: apakah UMR Jakarta cukup untuk hidup nyaman?";
const aiContext = `Data UMR 2025:\nKota tertinggi: ${UMR_DATA[0].kota} (${formatRp(UMR_DATA[0].umr)})\nKota terendah: ${UMR_DATA[UMR_DATA.length-1].kota} (${formatRp(UMR_DATA[UMR_DATA.length-1].umr)})\nJumlah kota: ${UMR_DATA.length}\nPencarian: ${search || 'Semua'}`;

  return (
    <div className="min-h-screen bg-canvas">
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Link href="/gaji" className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <h1 className="text-2xl font-bold text-ink mb-6">UMR 2025 — 34 Kota</h1>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-primary font-medium">📊 Daftar UMR 2025 seluruh Indonesia. Bisa cari kota dan bandingkan 2 kota.</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted w-5 h-5" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari kota..." className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
        </div>

        {/* Compare */}
        <div className="bg-surface border border-border rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-ink mb-3">🔀 Bandingkan 2 Kota</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <select value={compareA} onChange={e => setCompareA(e.target.value)} className="px-4 py-2.5 bg-canvas border border-border rounded-lg text-ink focus:border-primary outline-none">
              <option value="">Pilih Kota A</option>
              {UMR_DATA.map((d) => <option key={d.kota} value={d.kota}>{d.kota}</option>)}
            </select>
            <select value={compareB} onChange={e => setCompareB(e.target.value)} className="px-4 py-2.5 bg-canvas border border-border rounded-lg text-ink focus:border-primary outline-none">
              <option value="">Pilih Kota B</option>
              {UMR_DATA.map((d) => <option key={d.kota} value={d.kota}>{d.kota}</option>)}
            </select>
          </div>
          {showCompare && (
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-canvas rounded-lg p-3 border border-border">
                <div className="text-xs text-ink-tertiary mb-1">{kotaA!.kota}</div>
                <div className="font-bold text-ink">{formatRp(kotaA!.umr)}</div>
              </div>
              <div className="flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-ink-muted" />
              </div>
              <div className="bg-canvas rounded-lg p-3 border border-border">
                <div className="text-xs text-ink-tertiary mb-1">{kotaB!.kota}</div>
                <div className="font-bold text-ink">{formatRp(kotaB!.umr)}</div>
              </div>
            </div>
          )}
          {showCompare && (
            <div className="mt-3 text-center text-sm">
              {kotaA!.umr > kotaB!.umr ? (
                <span className="text-primary font-medium">{kotaA!.kota} lebih tinggi {formatRp(kotaA!.umr - kotaB!.umr)}/bulan ({((kotaA!.umr / kotaB!.umr - 1) * 100).toFixed(1)}%)</span>
              ) : kotaB!.umr > kotaA!.umr ? (
                <span className="text-primary font-medium">{kotaB!.kota} lebih tinggi {formatRp(kotaB!.umr - kotaA!.umr)}/bulan ({((kotaB!.umr / kotaA!.umr - 1) * 100).toFixed(1)}%)</span>
              ) : (
                <span className="text-ink-tertiary">UMR sama</span>
              )}
            </div>
          )}
        </div>

        {/* Table */}
        <div id="hasil-perhitungan" className="bg-canvas border border-border rounded-xl overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface">
                  <th className="text-left py-3 px-4 text-ink-tertiary font-medium">#</th>
                  <th className="text-left py-3 px-4 text-ink-tertiary font-medium">Kota/Kabupaten</th>
                  <th className="text-right py-3 px-4 text-ink-tertiary font-medium">UMR 2025</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <tr key={d.kota} className="border-t border-border/50 hover:bg-surface/50">
                    <td className="py-2.5 px-4 text-ink-muted">{i + 1}</td>
                    <td className="py-2.5 px-4 text-ink font-medium">{d.kota}</td>
                    <td className="py-2.5 px-4 text-right text-ink font-semibold">{formatRp(d.umr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ActionBar
          tool="gaji-umr"
          toolName="UMR 2025"
          shareItems={[["Tertinggi", UMR_DATA[0].kota + ": " + formatRp(UMR_DATA[0].umr)], ["Terendah", UMR_DATA[UMR_DATA.length-1].kota + ": " + formatRp(UMR_DATA[UMR_DATA.length-1].umr)]]}
          resultElementId="hasil-perhitungan"
          filename="umr-2025"
          show={true}
        />
        <AiInsightBox title={aiTitle} description={aiDesc} placeholder={aiPlaceholder} buttonLabel="Analisis UMR" context={aiContext} system="Anda adalah analis ekonomi. Analisis UMR dan beri insight tentang daya beli dan cost of living." />
      </main>
    </div>
  );
}
