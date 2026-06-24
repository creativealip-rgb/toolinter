'use client';

import { useState } from "react";
import {
  Calculator,
  Package,
  Users,
  Truck,
  TrendingUp,
  DollarSign,
  Info,
} from "lucide-react";

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

export default function HppCalculator() {
  const [namaProduk, setNamaProduk] = useState("");
  const [bahanBakuRaw, setBahanBakuRaw] = useState("");
  const [tenagaKerjaRaw, setTenagaKerjaRaw] = useState("");
  const [overheadRaw, setOverheadRaw] = useState("");
  const [jumlahProduk, setJumlahProduk] = useState("");
  const [margin, setMargin] = useState(30);
  const [calculated, setCalculated] = useState(false);

  const [result, setResult] = useState({
    totalBiaya: 0,
    hppPerUnit: 0,
    hargaJual: 0,
    keuntunganPerUnit: 0,
    totalKeuntungan: 0,
  });

  function parseNum(raw: string): number {
    return parseInt(raw.replace(/\D/g, ""), 10) || 0;
  }

  function handleCalculate() {
    const bahan = parseNum(bahanBakuRaw);
    const tenaga = parseNum(tenagaKerjaRaw);
    const overhead = parseNum(overheadRaw);
    const jumlah = parseInt(jumlahProduk, 10) || 0;

    if (jumlah <= 0) return;

    const totalBiaya = bahan + tenaga + overhead;
    const hppPerUnit = totalBiaya / jumlah;
    const hargaJual = hppPerUnit * (1 + margin / 100);
    const keuntunganPerUnit = hargaJual - hppPerUnit;
    const totalKeuntungan = keuntunganPerUnit * jumlah;

    setResult({
      totalBiaya,
      hppPerUnit,
      hargaJual,
      keuntunganPerUnit,
      totalKeuntungan,
    });
    setCalculated(true);
  }

  const costBreakdown = [
    {
      label: "Bahan Baku",
      value: parseNum(bahanBakuRaw),
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Tenaga Kerja",
      value: parseNum(tenagaKerjaRaw),
      icon: Users,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      label: "Overhead / Packing",
      value: parseNum(overheadRaw),
      icon: Truck,
      color: "text-ink-tertiary",
      bg: "bg-surface",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-canvas border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">
          Masukkan Data Produk
        </h2>
        <div className="space-y-4">
          {/* Nama Produk */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Nama Produk
            </label>
            <input
              type="text"
              value={namaProduk}
              onChange={(e) => setNamaProduk(e.target.value)}
              placeholder="Contoh: Nasi Kotak Ayam Geprek"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>

          {/* Biaya Bahan Baku */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Biaya Bahan Baku
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                Rp
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={bahanBakuRaw}
                onChange={(e) => {
                  setBahanBakuRaw(e.target.value.replace(/\D/g, ""));
                }}
                placeholder="500.000"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            {bahanBakuRaw && (
              <p className="text-xs text-ink-muted mt-1">
                {formatRp(parseNum(bahanBakuRaw))}
              </p>
            )}
          </div>

          {/* Biaya Tenaga Kerja */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Biaya Tenaga Kerja
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                Rp
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={tenagaKerjaRaw}
                onChange={(e) => {
                  setTenagaKerjaRaw(e.target.value.replace(/\D/g, ""));
                }}
                placeholder="200.000"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            {tenagaKerjaRaw && (
              <p className="text-xs text-ink-muted mt-1">
                {formatRp(parseNum(tenagaKerjaRaw))}
              </p>
            )}
          </div>

          {/* Biaya Overhead */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Biaya Overhead / Packing{" "}
              <span className="text-ink-muted font-normal">(opsional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                Rp
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={overheadRaw}
                onChange={(e) => {
                  setOverheadRaw(e.target.value.replace(/\D/g, ""));
                }}
                placeholder="50.000"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Jumlah Produk */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Jumlah Produk
            </label>
            <input
              type="number"
              min="1"
              value={jumlahProduk}
              onChange={(e) => setJumlahProduk(e.target.value)}
              placeholder="50"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>

          {/* Margin Keuntungan */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Margin Keuntungan:{" "}
              <span className="text-primary font-bold">{margin}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="200"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-ink-muted mt-1">
              <span>0%</span>
              <span>100%</span>
              <span>200%</span>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            Hitung HPP
          </button>
        </div>
      </div>

      {/* Results */}
      {calculated && result.totalBiaya > 0 && (
        <div className="space-y-6">
          {/* Cost breakdown cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {costBreakdown.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="bg-canvas border border-border rounded-xl p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}
                    >
                      <Icon className={`w-4 h-4 ${c.color}`} />
                    </div>
                    <span className="text-sm font-medium text-ink">
                      {c.label}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-ink">
                    {formatRp(c.value)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Total Biaya */}
          <div className="bg-surface border border-border rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-ink-tertiary" />
              <span className="font-medium text-ink">Total Biaya Produksi</span>
            </div>
            <span className="text-xl font-bold text-ink">
              {formatRp(result.totalBiaya)}
            </span>
          </div>

          {/* HPP per unit — big highlight */}
          <div className="bg-primary rounded-xl p-6 text-center">
            <p className="text-white/80 text-sm font-medium mb-1">
              HPP per Unit
            </p>
            <p className="text-3xl md:text-4xl font-bold text-white">
              {formatRp(result.hppPerUnit)}
            </p>
            <p className="text-white/60 text-sm mt-2">
              {namaProduk ? namaProduk : "Produk"} — {parseInt(jumlahProduk, 10) || 0} pcs
            </p>
          </div>

          {/* Harga Jual & Keuntungan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-canvas border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm font-medium text-ink">
                  Harga Jual
                </span>
              </div>
              <p className="text-xl font-bold text-success">
                {formatRp(result.hargaJual)}
              </p>
              <p className="text-xs text-ink-muted mt-1">per unit</p>
            </div>
            <div className="bg-canvas border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm font-medium text-ink">
                  Keuntungan / Unit
                </span>
              </div>
              <p className="text-xl font-bold text-success">
                {formatRp(result.keuntunganPerUnit)}
              </p>
              <p className="text-xs text-ink-muted mt-1">margin {margin}%</p>
            </div>
            <div className="bg-canvas border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm font-medium text-ink">
                  Total Keuntungan
                </span>
              </div>
              <p className="text-xl font-bold text-success">
                {formatRp(result.totalKeuntungan)}
              </p>
              <p className="text-xs text-ink-muted mt-1">
                dari {parseInt(jumlahProduk, 10) || 0} pcs
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info note */}
      {calculated && (
        <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
          <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-ink mb-1">Catatan Perhitungan</p>
            <ul className="list-disc list-inside space-y-1 text-ink-tertiary">
              <li>
                HPP (Harga Pokok Penjualan) = Total Biaya Produksi ÷ Jumlah
                Produk.
              </li>
              <li>
                Harga Jual = HPP × (1 + Margin%). Sesuaikan margin sesuai
                pasar dan kompetisi.
              </li>
              <li>
                Pastikan semua biaya produksi sudah termasuk bahan baku, tenaga
                kerja, kemasan, dan biaya lain-lain.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
