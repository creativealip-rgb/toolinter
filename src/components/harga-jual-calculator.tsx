'use client';

import { useState } from "react";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Percent,
  Tag,
  Info,
} from "lucide-react";
import AiInsightBox from './ai-insight-box';
import { ActionBar } from './action-bar';

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

export default function HargaJualCalculator() {
  const [hppRaw, setHppRaw] = useState("50000");
  const [margin, setMargin] = useState(30);
  const [operasionalRaw, setOperasionalRaw] = useState("10000");
  const [diskon, setDiskon] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const [result, setResult] = useState({
    hpp: 0,
    marginAmount: 0,
    hargaJualSebelumOperasional: 0,
    hargaJualFinal: 0,
    hargaSetelahDiskon: 0,
  });

  function parseNum(raw: string): number {
    return parseInt(raw.replace(/\D/g, ""), 10) || 0;
  }

  function handleCalculate() {
    const hpp = parseNum(hppRaw);
    const operasional = parseNum(operasionalRaw);

    if (hpp <= 0) return;

    const hargaJualSebelumOperasional = hpp / (1 - margin / 100);
    const marginAmount = hargaJualSebelumOperasional - hpp;
    const hargaJualFinal = hargaJualSebelumOperasional + operasional;
    const hargaSetelahDiskon = hargaJualFinal * (1 - diskon / 100);

    setResult({
      hpp,
      marginAmount,
      hargaJualSebelumOperasional,
      hargaJualFinal,
      hargaSetelahDiskon,
    });
    setCalculated(true);
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-canvas border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">
          Masukkan Data Produk
        </h2>
        <div className="space-y-4">
          {/* HPP per unit */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              HPP per Unit
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                Rp
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={hppRaw}
                onChange={(e) => {
                  setHppRaw(e.target.value.replace(/\D/g, ""));
                }}
                placeholder="10.000"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            {hppRaw && (
              <p className="text-xs text-ink-muted mt-1">
                {formatRp(parseNum(hppRaw))}
              </p>
            )}
          </div>

          {/* Target Margin */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Target Margin:{" "}
              <span className="text-primary font-bold">{margin}%</span>
            </label>
            <input
              type="range"
              min="1"
              max="90"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-ink-muted mt-1">
              <span>1%</span>
              <span>45%</span>
              <span>90%</span>
            </div>
          </div>

          {/* Biaya Operasional per unit */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Biaya Operasional per Unit{" "}
              <span className="text-ink-muted font-normal">(opsional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                Rp
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={operasionalRaw}
                onChange={(e) => {
                  setOperasionalRaw(e.target.value.replace(/\D/g, ""));
                }}
                placeholder="2.000"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            {operasionalRaw && (
              <p className="text-xs text-ink-muted mt-1">
                {formatRp(parseNum(operasionalRaw))}
              </p>
            )}
          </div>

          {/* Diskon Marketplace */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Diskon / Fee Marketplace:{" "}
              <span className="text-warning font-bold">{diskon}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={diskon}
              onChange={(e) => setDiskon(Number(e.target.value))}
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-warning"
            />
            <div className="flex justify-between text-xs text-ink-muted mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            Hitung Harga Jual
          </button>
        </div>
      </div>

      {/* Results */}
      {calculated && (
        <div className="space-y-6">
          {/* Breakdown cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-canvas border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Tag className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-ink">HPP</span>
              </div>
              <p className="text-xl font-bold text-ink">{formatRp(result.hpp)}</p>
              <p className="text-xs text-ink-muted mt-1">biaya per unit</p>
            </div>

            <div className="bg-canvas border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm font-medium text-ink">
                  Margin Amount
                </span>
              </div>
              <p className="text-xl font-bold text-success">
                {formatRp(result.marginAmount)}
              </p>
              <p className="text-xs text-ink-muted mt-1">keuntungan per unit</p>
            </div>
          </div>

          {/* Harga Jual sebelum operasional */}
          <div className="bg-surface border border-border rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-ink-tertiary" />
              <span className="font-medium text-ink">
                Harga Jual (sebelum operasional)
              </span>
            </div>
            <span className="text-xl font-bold text-ink">
              {formatRp(result.hargaJualSebelumOperasional)}
            </span>
          </div>

          {/* Harga Jual Final — big highlight */}
          <div className="bg-primary rounded-xl p-6 text-center">
            <p className="text-white/80 text-sm font-medium mb-1">
              Harga Jual Final
            </p>
            <p className="text-3xl md:text-4xl font-bold text-white">
              {formatRp(result.hargaJualFinal)}
            </p>
            <p className="text-white/60 text-sm mt-2">
              termasuk biaya operasional
            </p>
          </div>

          {/* Setelah diskon */}
          {diskon > 0 && (
            <div className="bg-warning/10 border border-warning/30 rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-warning" />
                <span className="font-medium text-ink">
                  Harga Setelah Diskon {diskon}%
                </span>
              </div>
              <span className="text-xl font-bold text-warning">
                {formatRp(result.hargaSetelahDiskon)}
              </span>
            </div>
          )}
        </div>
      )}

      {calculated && (
        <AiInsightBox
          title="AI UMKM Price Advisor"
          description="Minta AI cek apakah harga jual sudah aman, margin cukup, dan strategi diskon/marketplace."
          placeholder="Contoh: harga ini terlalu mahal gak? Strategi diskon aman berapa persen?"
          buttonLabel="Analisis Harga dengan AI"
          context={`Data harga jual produk:\nHPP/unit: ${formatRp(result.hpp)}\nTarget margin: ${margin}%\nBiaya operasional/unit: ${formatRp(parseNum(operasionalRaw))}\nDiskon/fee marketplace: ${diskon}%\nHarga jual sebelum operasional: ${formatRp(result.hargaJualSebelumOperasional)}\nHarga jual final: ${formatRp(result.hargaJualFinal)}\nHarga setelah diskon: ${formatRp(result.hargaSetelahDiskon)}\nMargin amount/unit: ${formatRp(result.marginAmount)}`}
          system="Kamu adalah advisor harga produk UMKM Indonesia. Beri saran harga jual, margin, diskon, dan risiko rugi secara praktis."
        />
      )}

      {/* Info note */}
      {calculated && (
        <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
          <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-ink mb-1">Catatan Perhitungan</p>
            <ul className="list-disc list-inside space-y-1 text-ink-tertiary">
              <li>
                Harga Jual = HPP ÷ (1 - Margin%). Ini memastikan margin
                dihitung dari harga jual, bukan dari HPP.
              </li>
              <li>
                Biaya operasional (pengiriman, kemasan, dll) ditambahkan di
                atas harga jual.
              </li>
              <li>
                Diskon marketplace (Shopee, Tokopedia, dll) mengurangi harga
                final yang diterima penjual.
              </li>
            </ul>
          </div>
        </div>
      )}

      <ActionBar
        tool="umkm-harga-jual"
        toolName="Kalkulator Harga Jual"
        shareItems={[["HPP/unit", formatRp(result.hpp)], ["Harga Jual", formatRp(result.hargaJualFinal)], ["Margin", `${margin}%`]]}
        resultElementId="hasil-perhitungan"
        filename="harga-jual.pdf"
        show={calculated}
      />
    </div>
  );
}
