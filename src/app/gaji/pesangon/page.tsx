'use client';

import { useState } from "react";
import Link from "next/link";
import { ActionBar } from "@/components/action-bar";
import BlogLink from "@/components/blog-link";
import { ArrowLeft, Scale, Calculator, Info } from "lucide-react";

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}
function parseNum(raw: string): number {
  return parseInt(raw.replace(/\D/g, ""), 10) || 0;
}

// Uang Pesangon (UP) — bulan upah per masa kerja. PP 35/2021 Pasal 40 ayat (2).
function uangPesangonBulan(tahun: number): number {
  if (tahun < 1) return 1;
  if (tahun < 2) return 2;
  if (tahun < 3) return 3;
  if (tahun < 4) return 4;
  if (tahun < 5) return 5;
  if (tahun < 6) return 6;
  if (tahun < 7) return 7;
  if (tahun < 8) return 8;
  return 9;
}
// Uang Penghargaan Masa Kerja (UPMK) — PP 35/2021 Pasal 40 ayat (3).
function upmkBulan(tahun: number): number {
  if (tahun < 3) return 0;
  if (tahun < 6) return 2;
  if (tahun < 9) return 3;
  if (tahun < 12) return 4;
  if (tahun < 15) return 5;
  if (tahun < 18) return 6;
  if (tahun < 21) return 7;
  if (tahun < 24) return 8;
  return 10;
}

// Skenario PHK umum + faktor pengali UP & UPMK (PP 35/2021).
const SKENARIO = [
  { id: "efisiensi-rugi", label: "PHK efisiensi (perusahaan rugi)", up: 0.5, upmk: 1 },
  { id: "efisiensi-cegah", label: "PHK efisiensi (cegah kerugian)", up: 1, upmk: 1 },
  { id: "tutup-rugi", label: "Perusahaan tutup karena rugi", up: 0.5, upmk: 1 },
  { id: "tutup-nonrugi", label: "Perusahaan tutup (bukan karena rugi)", up: 1, upmk: 1 },
  { id: "pailit", label: "Perusahaan pailit", up: 0.5, upmk: 1 },
  { id: "pelanggaran", label: "PHK karena pelanggaran (setelah SP3)", up: 0.5, upmk: 1 },
  { id: "sakit-berkepanjangan", label: "Sakit berkepanjangan / cacat kerja", up: 2, upmk: 1 },
  { id: "pensiun", label: "Memasuki usia pensiun", up: 1.75, upmk: 1 },
  { id: "meninggal", label: "Pekerja meninggal dunia", up: 2, upmk: 1 },
];

export default function PesangonPage() {
  const [gajiRaw, setGajiRaw] = useState("5000000");
  const [tahunRaw, setTahunRaw] = useState("4");
  const [bulanRaw, setBulanRaw] = useState("0");
  const [uphRaw, setUphRaw] = useState("0");
  const [skenarioId, setSkenarioId] = useState(SKENARIO[1].id);
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState({
    gaji: 0, masaTahun: 0, upBulan: 0, upmkBulan: 0,
    upFaktor: 1, upmkFaktor: 1, up: 0, upmk: 0, uph: 0, total: 0, skenarioLabel: "",
  });

  function handleCalculate() {
    const gaji = parseNum(gajiRaw);
    const tahun = parseInt(tahunRaw, 10) || 0;
    const bulan = parseInt(bulanRaw, 10) || 0;
    const uph = parseNum(uphRaw);
    if (gaji <= 0) return;
    const masaTahun = tahun + bulan / 12;
    const sk = SKENARIO.find((s) => s.id === skenarioId) || SKENARIO[1];

    const upBulan = uangPesangonBulan(masaTahun);
    const upmkB = upmkBulan(masaTahun);
    const up = gaji * upBulan * sk.up;
    const upmk = gaji * upmkB * sk.upmk;
    const total = up + upmk + uph;

    setResult({
      gaji, masaTahun, upBulan, upmkBulan: upmkB,
      upFaktor: sk.up, upmkFaktor: sk.upmk, up, upmk, uph, total, skenarioLabel: sk.label,
    });
    setCalculated(true);
  }

  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/gaji" className="hover:text-primary transition-colors">Kalkulator Gaji</Link>
          <span>/</span>
          <span className="text-ink">Pesangon PHK</span>
        </nav>

        <Link href="/gaji" className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Scale className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">Kalkulator Pesangon PHK</h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung estimasi pesangon PHK sesuai UU Cipta Kerja &amp; PP 35/2021: uang pesangon, penghargaan masa kerja, dan penggantian hak.
        </p>

        <div className="bg-canvas border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-ink mb-4">Masukkan Data</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Gaji + Tunjangan Tetap per Bulan</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">Rp</span>
                <input
                  type="text" inputMode="numeric" value={gajiRaw}
                  onChange={(e) => setGajiRaw(e.target.value.replace(/\D/g, ""))}
                  placeholder="5.000.000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              {gajiRaw && <p className="text-xs text-ink-muted mt-1">{formatRp(parseNum(gajiRaw))}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Masa Kerja (Tahun)</label>
                <input
                  type="number" min={0} max={50} value={tahunRaw}
                  onChange={(e) => setTahunRaw(e.target.value)} placeholder="4"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Tambahan (Bulan)</label>
                <input
                  type="number" min={0} max={11} value={bulanRaw}
                  onChange={(e) => setBulanRaw(e.target.value)} placeholder="0"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Alasan / Jenis PHK</label>
              <select
                value={skenarioId} onChange={(e) => setSkenarioId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              >
                {SKENARIO.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Uang Penggantian Hak / UPH (opsional)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">Rp</span>
                <input
                  type="text" inputMode="numeric" value={uphRaw}
                  onChange={(e) => setUphRaw(e.target.value.replace(/\D/g, ""))}
                  placeholder="cuti belum diambil, dll"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button onClick={handleCalculate} className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <Calculator className="w-4 h-4" />
              Hitung Pesangon
            </button>
          </div>
        </div>

        {calculated && (
          <div id="hasil-perhitungan" className="space-y-6 mb-8">
            <div className="bg-primary rounded-xl p-6 text-center">
              <p className="text-white/80 text-sm font-medium mb-1">Estimasi Total Pesangon</p>
              <p className="text-3xl md:text-4xl font-bold text-white">{formatRp(result.total)}</p>
              <p className="text-white/60 text-sm mt-2">{result.skenarioLabel}</p>
            </div>
            <div className="bg-canvas border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">Rincian Perhitungan</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-ink-tertiary">Uang Pesangon (UP)</div>
                <div className="text-ink font-medium text-right">{result.upBulan} bln × {result.upFaktor}× = {formatRp(result.up)}</div>
                <div className="text-ink-tertiary">Penghargaan Masa Kerja (UPMK)</div>
                <div className="text-ink font-medium text-right">{result.upmkBulan} bln × {result.upmkFaktor}× = {formatRp(result.upmk)}</div>
                <div className="text-ink-tertiary">Penggantian Hak (UPH)</div>
                <div className="text-ink font-medium text-right">{formatRp(result.uph)}</div>
                <div className="border-t border-border pt-2 text-ink font-semibold">Total Estimasi</div>
                <div className="border-t border-border pt-2 text-ink font-semibold text-right">{formatRp(result.total)}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-ink-secondary mb-8">
          <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-ink mb-1">Catatan Penting</p>
            <p>Hasil ini estimasi berdasarkan PP 35/2021. Faktor pengali (0,5×–2×) berbeda tiap jenis PHK, dan bisa lebih besar bila diatur di Perjanjian Kerja/PKB/Perjanjian Bersama. Untuk kepastian hukum, konsultasikan dengan Dinas Ketenagakerjaan atau ahli hukum.</p>
          </div>
        </div>

        <div className="mb-8">
          <BlogLink toolPath="/gaji/pesangon" />
        </div>

        <ActionBar
          tool="pesangon-phk"
          toolName="Kalkulator Pesangon PHK"
          shareItems={[["Gaji", formatRp(result.gaji)], ["Skenario", result.skenarioLabel], ["Total Pesangon", formatRp(result.total)]]}
          resultElementId="hasil-perhitungan"
          filename="pesangon-phk.pdf"
          show={calculated}
        />

        <section className="border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">Komponen Pesangon Menurut UU Cipta Kerja</h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>Berdasarkan UU Cipta Kerja dan PP 35/2021, hak pekerja yang di-PHK terdiri dari tiga komponen:</p>
            <p><strong className="text-ink">1. Uang Pesangon (UP)</strong> — dihitung dari masa kerja, mulai 1 bulan upah (kurang dari 1 tahun) hingga maksimal 9 bulan upah (8 tahun atau lebih).</p>
            <p><strong className="text-ink">2. Uang Penghargaan Masa Kerja (UPMK)</strong> — untuk masa kerja minimal 3 tahun, mulai 2 bulan upah hingga maksimal 10 bulan upah (24 tahun atau lebih).</p>
            <p><strong className="text-ink">3. Uang Penggantian Hak (UPH)</strong> — sisa cuti tahunan yang belum diambil, biaya pemulangan, dan hak lain sesuai perjanjian.</p>
            <p>Besaran akhir dikalikan faktor sesuai alasan PHK. Contoh: PHK efisiensi karena rugi memakai faktor 0,5× untuk UP, sedangkan pensiun memakai 1,75×.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
