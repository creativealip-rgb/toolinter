'use client';

import { useState } from "react";
import Link from "next/link";
import AiInsightBox from "@/components/ai-insight-box";
import { ActionBar } from "@/components/action-bar";
import { ArrowLeft, CalendarDays, Calculator, Info } from "lucide-react";

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

export default function GajiProrataPage() {
  const [gajiRaw, setGajiRaw] = useState("5000000");
  const [hariKerjaRaw, setHariKerjaRaw] = useState("1");
  const [totalHariRaw, setTotalHariRaw] = useState("22");
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState({ gaji: 0, hariKerja: 0, totalHari: 22, prorata: 0, perHari: 0 });

  function parseNum(raw: string): number {
    return parseInt(raw.replace(/\D/g, ""), 10) || 0;
  }

  function handleCalculate() {
    const gaji = parseNum(gajiRaw);
    const hariKerja = parseNum(hariKerjaRaw);
    const totalHari = parseNum(totalHariRaw) || 22;
    if (gaji <= 0 || hariKerja <= 0 || totalHari <= 0) return;

    const perHari = gaji / totalHari;
    const prorata = perHari * Math.min(hariKerja, totalHari);
    setResult({ gaji, hariKerja, totalHari, prorata, perHari });
    setCalculated(true);
  }

  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/gaji" className="hover:text-primary transition-colors">Kalkulator Gaji</Link>
          <span>/</span>
          <span className="text-ink">Gaji Prorata</span>
        </nav>

        <Link href="/gaji" className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">Kalkulator Gaji Prorata</h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung gaji prorata untuk karyawan yang masuk atau resign di tengah bulan. Cocok untuk HR, payroll, dan karyawan.
        </p>

        <div className="bg-canvas border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-ink mb-4">Masukkan Data Prorata</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Gaji Bulanan Penuh</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">Rp</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={gajiRaw}
                  onChange={(e) => setGajiRaw(e.target.value.replace(/\D/g, ""))}
                  placeholder="10.000.000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              {gajiRaw && <p className="text-xs text-ink-muted mt-1">{formatRp(parseNum(gajiRaw))}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Hari Kerja Aktual</label>
                <input
                  type="number"
                  min={1}
                  max={31}
                  value={hariKerjaRaw}
                  onChange={(e) => setHariKerjaRaw(e.target.value)}
                  placeholder="10"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Total Hari Kerja Bulan Itu</label>
                <input
                  type="number"
                  min={1}
                  max={31}
                  value={totalHariRaw}
                  onChange={(e) => setTotalHariRaw(e.target.value)}
                  placeholder="22"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button onClick={handleCalculate} className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <Calculator className="w-4 h-4" />
              Hitung Gaji Prorata
            </button>
          </div>
        </div>

        {calculated && (
          <div id="hasil-perhitungan" className="space-y-6 mb-8">
            <div className="bg-primary rounded-xl p-6 text-center">
              <p className="text-white/80 text-sm font-medium mb-1">Gaji Prorata</p>
              <p className="text-3xl md:text-4xl font-bold text-white">{formatRp(result.prorata)}</p>
              <p className="text-white/60 text-sm mt-2">untuk {result.hariKerja} dari {result.totalHari} hari kerja</p>
            </div>
            <div className="bg-canvas border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">Rincian Perhitungan</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-ink-tertiary">Gaji Bulanan Penuh</div>
                <div className="text-ink font-medium text-right">{formatRp(result.gaji)}</div>
                <div className="text-ink-tertiary">Gaji per Hari Kerja</div>
                <div className="text-ink font-medium text-right">{formatRp(result.perHari)}</div>
                <div className="text-ink-tertiary">Rumus</div>
                <div className="text-ink font-medium text-right">{formatRp(result.perHari)} × {result.hariKerja}</div>
                <div className="border-t border-border pt-2 text-ink font-semibold">Total</div>
                <div className="border-t border-border pt-2 text-ink font-semibold text-right">{formatRp(result.prorata)}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-ink-secondary mb-8">
          <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-ink mb-1">Catatan</p>
            <p>Metode umum: gaji bulanan ÷ total hari kerja bulan tersebut × hari kerja aktual. Kebijakan perusahaan bisa berbeda, misalnya pakai hari kalender atau 30 hari tetap.</p>
          </div>
        </div>

        {/* AI Insight */}
        {calculated && (
          <div className="mb-8">
            <AiInsightBox
              title="AI Prorata Advisor"
              description="Minta AI analisis gaji prorata dan saran."
              placeholder="Contoh: gaji prorata saya adil gak?"
              buttonLabel="Analisis Prorata dengan AI"
              context={`Data prorata user:\nGaji bulanan: ${formatRp(result.gaji)}\nGaji/hari: ${formatRp(result.perHari)}\nHari kerja: ${result.hariKerja} dari ${result.totalHari}\nGaji prorata: ${formatRp(result.prorata)}`}
              system="Kamu adalah asisten edukasi gaji Indonesia. Jelaskan perhitungan gaji prorata, kapan berlaku, dan saran praktis."
            />
          </div>
        )}

        <ActionBar
          tool="gaji-prorata"
          toolName="Kalkulator Gaji Prorata"
          shareItems={[["Gaji Bulanan", formatRp(result.gaji)], ["Gaji Prorata", formatRp(result.prorata)]]}
          resultElementId="hasil-perhitungan"
          filename="gaji-prorata.pdf"
          show={calculated}
        />

        <section className="border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">Kapan Gaji Prorata Dipakai?</h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>Gaji prorata biasanya dipakai saat karyawan mulai bekerja di tengah bulan, resign sebelum akhir bulan, cuti tidak dibayar, atau ada perubahan status kerja.</p>
            <h3 className="text-base font-semibold text-ink mt-6">Rumus Gaji Prorata</h3>
            <div className="bg-surface rounded-lg p-4 border border-border">
              <p className="text-ink font-mono text-sm">Gaji Prorata = Gaji Bulanan ÷ Total Hari Kerja × Hari Kerja Aktual</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}