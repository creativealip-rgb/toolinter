'use client';

import { useState } from "react";
import Link from "next/link";
import { ActionBar } from "@/components/action-bar";
import BlogLink from "@/components/blog-link";
import { ArrowLeft, HandCoins, Calculator, Info } from "lucide-react";

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}
function parseNum(raw: string): number {
  return parseInt(raw.replace(/\D/g, ""), 10) || 0;
}

// Nisab acuan: 85 gram emas (zakat mal/emas/perdagangan) dan setara 85 gram emas per tahun
// untuk zakat penghasilan (BAZNAS). Kadar zakat 2,5%.
const NISAB_GRAM_EMAS = 85;
const KADAR = 0.025;

type Mode = "penghasilan" | "mal" | "perdagangan";

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: "penghasilan", label: "Zakat Penghasilan", desc: "Dari gaji/pendapatan profesi rutin (dihitung bulanan)." },
  { id: "mal", label: "Zakat Mal (Tabungan & Emas)", desc: "Dari simpanan uang + emas yang mengendap 1 tahun (haul)." },
  { id: "perdagangan", label: "Zakat Perdagangan", desc: "Dari aset lancar usaha setelah 1 tahun (haul)." },
];

export default function ZakatPage() {
  const [mode, setMode] = useState<Mode>("penghasilan");
  const [hargaEmasRaw, setHargaEmasRaw] = useState("1350000"); // harga emas per gram, bisa diedit user

  // Penghasilan
  const [gajiRaw, setGajiRaw] = useState("10000000");
  const [pendapatanLainRaw, setPendapatanLainRaw] = useState("0");

  // Mal
  const [tabunganRaw, setTabunganRaw] = useState("0");
  const [emasGramRaw, setEmasGramRaw] = useState("0");

  // Perdagangan
  const [asetLancarRaw, setAsetLancarRaw] = useState("0");
  const [utangJatuhTempoRaw, setUtangJatuhTempoRaw] = useState("0");

  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState({
    modeLabel: "", dasar: 0, nisab: 0, wajib: false, zakat: 0, periode: "",
  });

  function handleCalculate() {
    const hargaEmas = parseNum(hargaEmasRaw);
    if (hargaEmas <= 0) return;
    const nisabTahun = NISAB_GRAM_EMAS * hargaEmas;
    const nisabBulan = nisabTahun / 12;

    let dasar = 0, nisab = 0, periode = "";
    const m = MODES.find((x) => x.id === mode)!;

    if (mode === "penghasilan") {
      dasar = parseNum(gajiRaw) + parseNum(pendapatanLainRaw);
      nisab = nisabBulan;
      periode = "per bulan";
    } else if (mode === "mal") {
      dasar = parseNum(tabunganRaw) + parseNum(emasGramRaw) * hargaEmas;
      nisab = nisabTahun;
      periode = "per tahun (haul)";
    } else {
      dasar = parseNum(asetLancarRaw) - parseNum(utangJatuhTempoRaw);
      if (dasar < 0) dasar = 0;
      nisab = nisabTahun;
      periode = "per tahun (haul)";
    }

    const wajib = dasar >= nisab;
    const zakat = wajib ? dasar * KADAR : 0;
    setResult({ modeLabel: m.label, dasar, nisab, wajib, zakat, periode });
    setCalculated(true);
  }

  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/keuangan" className="hover:text-primary transition-colors">Kalkulator Keuangan</Link>
          <span>/</span>
          <span className="text-ink">Kalkulator Zakat</span>
        </nav>

        <Link href="/keuangan" className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <HandCoins className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">Kalkulator Zakat</h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung zakat penghasilan, zakat mal (tabungan &amp; emas), dan zakat perdagangan sesuai nisab dan kadar 2,5% menurut ketentuan BAZNAS.
        </p>

        <div className="bg-canvas border border-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-ink mb-4">Jenis Zakat</h2>

          <div className="grid gap-2 sm:grid-cols-3 mb-5">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => { setMode(m.id); setCalculated(false); }}
                className={`text-left rounded-lg border px-4 py-3 text-sm transition-colors ${
                  mode === m.id
                    ? "border-primary bg-primary/5 text-ink"
                    : "border-border text-ink-secondary hover:border-primary/50"
                }`}
              >
                <span className="font-medium block">{m.label}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-ink-muted mb-5">{MODES.find((m) => m.id === mode)!.desc}</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Harga Emas per Gram (untuk nisab)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">Rp</span>
                <input
                  type="text" inputMode="numeric" value={hargaEmasRaw}
                  onChange={(e) => setHargaEmasRaw(e.target.value.replace(/\D/g, ""))}
                  placeholder="1.350.000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <p className="text-xs text-ink-muted mt-1">Nisab = 85 gram emas. Perbarui sesuai harga emas terkini agar akurat.</p>
            </div>

            {mode === "penghasilan" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Penghasilan per Bulan (gaji + tunjangan)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">Rp</span>
                    <input
                      type="text" inputMode="numeric" value={gajiRaw}
                      onChange={(e) => setGajiRaw(e.target.value.replace(/\D/g, ""))}
                      placeholder="10.000.000"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Pendapatan Lain per Bulan (opsional)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">Rp</span>
                    <input
                      type="text" inputMode="numeric" value={pendapatanLainRaw}
                      onChange={(e) => setPendapatanLainRaw(e.target.value.replace(/\D/g, ""))}
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </>
            )}

            {mode === "mal" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Total Tabungan &amp; Uang Tunai</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">Rp</span>
                    <input
                      type="text" inputMode="numeric" value={tabunganRaw}
                      onChange={(e) => setTabunganRaw(e.target.value.replace(/\D/g, ""))}
                      placeholder="100.000.000"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Emas yang Dimiliki (gram)</label>
                  <input
                    type="number" min={0} value={emasGramRaw}
                    onChange={(e) => setEmasGramRaw(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
              </>
            )}

            {mode === "perdagangan" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Aset Lancar Usaha (kas + stok + piutang)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">Rp</span>
                    <input
                      type="text" inputMode="numeric" value={asetLancarRaw}
                      onChange={(e) => setAsetLancarRaw(e.target.value.replace(/\D/g, ""))}
                      placeholder="300.000.000"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Utang Jatuh Tempo (pengurang)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">Rp</span>
                    <input
                      type="text" inputMode="numeric" value={utangJatuhTempoRaw}
                      onChange={(e) => setUtangJatuhTempoRaw(e.target.value.replace(/\D/g, ""))}
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </>
            )}

            <button onClick={handleCalculate} className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <Calculator className="w-4 h-4" />
              Hitung Zakat
            </button>
          </div>
        </div>

        {calculated && (
          <div id="hasil-perhitungan" className="space-y-6 mb-8">
            <div className={`rounded-xl p-6 text-center ${result.wajib ? "bg-primary" : "bg-canvas border border-border"}`}>
              {result.wajib ? (
                <>
                  <p className="text-white/80 text-sm font-medium mb-1">Zakat yang Perlu Ditunaikan ({result.periode})</p>
                  <p className="text-3xl md:text-4xl font-bold text-white">{formatRp(result.zakat)}</p>
                  <p className="text-white/60 text-sm mt-2">{result.modeLabel} · kadar 2,5%</p>
                </>
              ) : (
                <>
                  <p className="text-ink-tertiary text-sm font-medium mb-1">{result.modeLabel}</p>
                  <p className="text-xl font-bold text-ink">Belum wajib zakat</p>
                  <p className="text-ink-tertiary text-sm mt-2">Harta belum mencapai nisab ({formatRp(result.nisab)} {result.periode}).</p>
                </>
              )}
            </div>
            <div className="bg-canvas border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">Rincian Perhitungan</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-ink-tertiary">Dasar perhitungan harta</div>
                <div className="text-ink font-medium text-right">{formatRp(result.dasar)}</div>
                <div className="text-ink-tertiary">Nisab ({result.periode})</div>
                <div className="text-ink font-medium text-right">{formatRp(result.nisab)}</div>
                <div className="text-ink-tertiary">Status</div>
                <div className="text-ink font-medium text-right">{result.wajib ? "Mencapai nisab" : "Belum mencapai nisab"}</div>
                <div className="border-t border-border pt-2 text-ink font-semibold">Zakat ({result.periode})</div>
                <div className="border-t border-border pt-2 text-ink font-semibold text-right">{formatRp(result.zakat)}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-ink-secondary mb-8">
          <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-ink mb-1">Catatan Penting</p>
            <p>Hasil ini estimasi berdasarkan kadar 2,5% dan nisab setara 85 gram emas. Nilai nisab mengikuti harga emas terkini yang kamu masukkan. Untuk kepastian, tunaikan dan verifikasi melalui lembaga amil zakat resmi seperti BAZNAS atau Dompet Dhuafa.</p>
          </div>
        </div>

        <div className="mb-8">
          <BlogLink toolPath="/keuangan/zakat" />
        </div>

        <ActionBar
          tool="zakat"
          toolName="Kalkulator Zakat"
          shareItems={[["Jenis", result.modeLabel], ["Dasar Harta", formatRp(result.dasar)], ["Zakat", formatRp(result.zakat)]]}
          resultElementId="hasil-perhitungan"
          filename="kalkulator-zakat.pdf"
          show={calculated}
        />

        <section className="border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">Cara Menghitung Zakat</h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>Zakat wajib ditunaikan bila harta telah mencapai <strong className="text-ink">nisab</strong> (batas minimal, setara 85 gram emas) dengan kadar <strong className="text-ink">2,5%</strong>.</p>
            <p><strong className="text-ink">Zakat Penghasilan</strong> — dari gaji dan pendapatan rutin. Nisab dihitung bulanan (setara 85 gram emas dibagi 12). Bisa ditunaikan tiap bulan saat menerima gaji.</p>
            <p><strong className="text-ink">Zakat Mal</strong> — dari tabungan, uang tunai, dan emas yang mengendap selama satu tahun (haul). Nisab setara 85 gram emas.</p>
            <p><strong className="text-ink">Zakat Perdagangan</strong> — dari aset lancar usaha (kas, stok, piutang) dikurangi utang jatuh tempo, setelah mencapai haul.</p>
            <p>Nilai nisab bergantung pada harga emas yang berfluktuasi, jadi selalu perbarui harga emas dan verifikasi ke lembaga amil zakat resmi.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
