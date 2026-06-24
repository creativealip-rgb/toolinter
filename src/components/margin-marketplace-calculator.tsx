'use client';

import { useState } from "react";
import { TrendingUp, Info, ChevronDown } from "lucide-react";

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

const platforms = [
  { name: "Tokopedia", fee: 1.8 },
  { name: "Shopee", fee: 2.0 },
  { name: "Lazada", fee: 2.0 },
  { name: "Custom", fee: 0 },
];

export default function MarginMarketplaceCalculator() {
  const [hargaProdukRaw, setHargaProdukRaw] = useState("");
  const [biayaProdukRaw, setBiayaProdukRaw] = useState("");
  const [platformIdx, setPlatformIdx] = useState(0);
  const [customFeeRaw, setCustomFeeRaw] = useState("");
  const [calculated, setCalculated] = useState(false);

  const [result, setResult] = useState({
    hargaJual: 0,
    potonganPlatform: 0,
    revenueBersih: 0,
    hpp: 0,
    keuntungan: 0,
    margin: 0,
  });

  function parseNum(raw: string): number {
    return parseInt(raw.replace(/\D/g, ""), 10) || 0;
  }

  function parseFee(raw: string): number {
    return parseFloat(raw.replace(/[^\d.]/g, "")) || 0;
  }

  const platformFee =
    platforms[platformIdx].name === "Custom"
      ? parseFee(customFeeRaw)
      : platforms[platformIdx].fee;

  function handleCalculate() {
    const harga = parseNum(hargaProdukRaw);
    const hpp = parseNum(biayaProdukRaw);

    if (harga <= 0) return;

    const potongan = harga * (platformFee / 100);
    const revenueBersih = harga - potongan;
    const keuntungan = revenueBersih - hpp;
    const margin = revenueBersih > 0 ? (keuntungan / revenueBersih) * 100 : 0;

    setResult({
      hargaJual: harga,
      potonganPlatform: potongan,
      revenueBersih,
      hpp,
      keuntungan,
      margin,
    });
    setCalculated(true);
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="rounded-xl border border-border bg-canvas p-6 space-y-5">
        <h2 className="text-lg font-semibold text-ink">Input Data</h2>

        {/* Harga Produk */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Harga Produk (Rp)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={hargaProdukRaw}
            onChange={(e) => setHargaProdukRaw(e.target.value)}
            placeholder="Contoh: 150000"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Biaya Produk / HPP */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Biaya Produk / HPP (Rp)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={biayaProdukRaw}
            onChange={(e) => setBiayaProdukRaw(e.target.value)}
            placeholder="Contoh: 80000"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Platform Marketplace
          </label>
          <div className="relative">
            <select
              value={platformIdx}
              onChange={(e) => setPlatformIdx(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-ink appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {platforms.map((p, i) => (
                <option key={p.name} value={i}>
                  {p.name}
                  {p.name !== "Custom" ? ` (${p.fee}%)` : ""}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
          </div>
        </div>

        {/* Custom fee */}
        {platforms[platformIdx].name === "Custom" && (
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Biaya Platform (%)
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={customFeeRaw}
              onChange={(e) => setCustomFeeRaw(e.target.value)}
              placeholder="Contoh: 3.5"
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full rounded-lg bg-primary text-white font-semibold py-2.5 hover:bg-primary/90 transition-colors"
        >
          Hitung Margin
        </button>
      </div>

      {/* Results */}
      {calculated && (
        <div className="rounded-xl border border-border bg-canvas p-6 space-y-4">
          <h2 className="text-lg font-semibold text-ink">Hasil Perhitungan</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ResultCard
              label="Harga Jual"
              value={formatRp(result.hargaJual)}
              color="text-ink"
            />
            <ResultCard
              label="Potongan Platform"
              value={`- ${formatRp(result.potonganPlatform)}`}
              sub={`${platformFee}%`}
              color="text-warning"
            />
            <ResultCard
              label="Revenue Bersih"
              value={formatRp(result.revenueBersih)}
              color="text-primary"
            />
            <ResultCard
              label="HPP / Biaya Produk"
              value={formatRp(result.hpp)}
              color="text-ink-tertiary"
            />
            <ResultCard
              label="Keuntungan"
              value={formatRp(result.keuntungan)}
              color={result.keuntungan >= 0 ? "text-success" : "text-warning"}
            />
            <ResultCard
              label="Margin"
              value={`${result.margin.toFixed(1)}%`}
              color={result.margin >= 0 ? "text-success" : "text-warning"}
            />
          </div>

          {result.keuntungan < 0 && (
            <div className="flex items-start gap-2 rounded-lg bg-warning/10 border border-warning/20 p-3 text-sm text-warning">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Harga jual tidak menutupi biaya produk setelah potongan
                marketplace. Pertimbangkan untuk menaikkan harga atau menekan
                biaya.
              </span>
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/10 p-4 text-sm text-ink-tertiary">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
        <span>
          Biaya platform dihitung dari harga jual produk. Fee yang digunakan
          adalah fee dasar — biaya tambahan seperti ongkir dan promo tidak
          termasuk dalam kalkulasi ini.
        </span>
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="rounded-lg bg-surface border border-border p-4">
      <p className="text-xs text-ink-muted mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-ink-muted mt-0.5">{sub}</p>}
    </div>
  );
}
