'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Info, TrendingUp, TrendingDown } from "lucide-react";

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

function parseNum(raw: string): number {
  return parseInt(raw.replace(/\D/g, ""), 10) || 0;
}

export default function CatatanKeuanganCalculator() {
  const [saldoAwalRaw, setSaldoAwalRaw] = useState("");
  const [pemasukanRaw, setPemasukanRaw] = useState("");
  const [pengeluaranRaw, setPengeluaranRaw] = useState("");
  const [calculated, setCalculated] = useState(false);

  const [result, setResult] = useState({
    saldoAwal: 0,
    pemasukan: 0,
    pengeluaran: 0,
    saldoAkhir: 0,
    selisih: 0,
    untung: true,
  });

  function handleCalculate() {
    const awal = parseNum(saldoAwalRaw);
    const masuk = parseNum(pemasukanRaw);
    const keluar = parseNum(pengeluaranRaw);

    const saldoAkhir = awal + masuk - keluar;
    const selisih = masuk - keluar;

    setResult({
      saldoAwal: awal,
      pemasukan: masuk,
      pengeluaran: keluar,
      saldoAkhir,
      selisih,
      untung: selisih >= 0,
    });
    setCalculated(true);
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="rounded-xl border border-border bg-canvas p-6 space-y-5">
        <h2 className="text-lg font-semibold text-ink">Input Data</h2>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Saldo Awal (Rp)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={saldoAwalRaw}
            onChange={(e) => setSaldoAwalRaw(e.target.value)}
            placeholder="Contoh: 5000000"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Total Pemasukan (Rp)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={pemasukanRaw}
            onChange={(e) => setPemasukanRaw(e.target.value)}
            placeholder="Contoh: 3000000"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Total Pengeluaran (Rp)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={pengeluaranRaw}
            onChange={(e) => setPengeluaranRaw(e.target.value)}
            placeholder="Contoh: 2000000"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full rounded-lg bg-primary text-white font-semibold py-2.5 hover:bg-primary/90 transition-colors"
        >
          Hitung Saldo Akhir
        </button>
      </div>

      {/* Results */}
      {calculated && (
        <div className="rounded-xl border border-border bg-canvas p-6 space-y-4">
          <h2 className="text-lg font-semibold text-ink">Ringkasan</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ResultCard
              label="Saldo Awal"
              value={formatRp(result.saldoAwal)}
              color="text-ink"
            />
            <ResultCard
              label="Total Pemasukan"
              value={formatRp(result.pemasukan)}
              color="text-success"
            />
            <ResultCard
              label="Total Pengeluaran"
              value={formatRp(result.pengeluaran)}
              color="text-warning"
            />
            <ResultCard
              label="Saldo Akhir"
              value={formatRp(result.saldoAkhir)}
              color="text-primary"
            />
          </div>

          {/* Status card */}
          <div
            className={`flex items-center gap-3 rounded-lg p-4 border ${
              result.untung
                ? "bg-success/10 border-success/20"
                : "bg-warning/10 border-warning/20"
            }`}
          >
            {result.untung ? (
              <TrendingUp className="w-5 h-5 text-success flex-shrink-0" />
            ) : (
              <TrendingDown className="w-5 h-5 text-warning flex-shrink-0" />
            )}
            <div>
              <p
                className={`font-semibold ${
                  result.untung ? "text-success" : "text-warning"
                }`}
              >
                {result.untung ? "Untung" : "Rugi"}:{" "}
                {formatRp(Math.abs(result.selisih))}
              </p>
              <p className="text-sm text-ink-tertiary">
                {result.untung
                  ? "Pemasukan lebih besar dari pengeluaran. Bisnis Anda sehat!"
                  : "Pengeluaran lebih besar dari pemasukan. Evaluasi biaya operasional Anda."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/10 p-4 text-sm text-ink-tertiary">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
        <span>
          Ini adalah kalkulator sederhana, bukan aplikasi pencatatan. Hasil
          tidak disimpan. Untuk pembukuan lengkap, gunakan software akuntansi
          atau konsultasikan dengan akuntan.
        </span>
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-lg bg-surface border border-border p-4">
      <p className="text-xs text-ink-muted mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}
