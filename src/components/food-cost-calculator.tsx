'use client';

import AiInsightBox from "./ai-insight-box";
import { ActionBar } from "./action-bar";
import { useState } from "react";
import {
  Calculator,
  UtensilsCrossed,
  TrendingDown,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

export default function FoodCostCalculator() {
  const [bahanBakuRaw, setBahanBakuRaw] = useState("500000");
  const [penjualanRaw, setPenjualanRaw] = useState("1000000");
  const [calculated, setCalculated] = useState(false);

  const [result, setResult] = useState({
    foodCostPercent: 0,
    status: "" as "ideal" | "mahal" | "murah" | "",
    sisaMargin: 0,
  });

  function parseNum(raw: string): number {
    return parseInt(raw.replace(/\D/g, ""), 10) || 0;
  }

  function handleCalculate() {
    const bahan = parseNum(bahanBakuRaw);
    const penjualan = parseNum(penjualanRaw);

    if (bahan <= 0 || penjualan <= 0) return;

    const foodCostPercent = (bahan / penjualan) * 100;
    let status: "ideal" | "mahal" | "murah" = "ideal";
    if (foodCostPercent > 35) status = "mahal";
    else if (foodCostPercent < 25) status = "murah";

    const sisaMargin = 100 - foodCostPercent;

    setResult({ foodCostPercent, status, sisaMargin });
    setCalculated(true);
  }

  const statusConfig = {
    ideal: {
      label: "Ideal",
      color: "text-success",
      bg: "bg-success/10",
      border: "border-success/30",
      icon: CheckCircle,
      message:
        "Food cost Anda berada dalam rentang ideal (25-35%). Pertahankan dan pantau secara berkala.",
    },
    mahal: {
      label: "Terlalu Mahal",
      color: "text-warning",
      bg: "bg-warning/10",
      border: "border-warning/30",
      icon: AlertTriangle,
      message:
        "Food cost Anda di atas 35%. Coba kurangi biaya bahan baku, cari supplier lebih murah, atau naikkan harga jual.",
    },
    murah: {
      label: "Sangat Efisien",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30",
      icon: TrendingDown,
      message:
        "Food cost di bawah 25%. Bagus! Tapi pastikan kualitas bahan tetap terjaga dan tidak mengorbankan rasa.",
    },
  };

  const referenceTable = [
    { type: "Restoran Fine Dining", range: "28-35%" },
    { type: "Restoran Casual / Family", range: "25-35%" },
    { type: "Cafe / Kedai Kopi", range: "25-30%" },
    { type: "Warung / Rumah Makan", range: "30-40%" },
    { type: "Street Food / Food Truck", range: "30-40%" },
    { type: "Catering", range: "30-40%" },
    { type: "Bakery / Toko Kue", range: "25-35%" },
    { type: "Franchise F&B", range: "25-30%" },
  ];

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-canvas border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">
          Masukkan Data Keuangan
        </h2>
        <div className="space-y-4">
          {/* Total Bahan Baku per bulan */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Total Biaya Bahan Baku / Bulan
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
                placeholder="15.000.000"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            {bahanBakuRaw && (
              <p className="text-xs text-ink-muted mt-1">
                {formatRp(parseNum(bahanBakuRaw))}
              </p>
            )}
          </div>

          {/* Total Penjualan per bulan */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Total Penjualan / Bulan
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                Rp
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={penjualanRaw}
                onChange={(e) => {
                  setPenjualanRaw(e.target.value.replace(/\D/g, ""));
                }}
                placeholder="50.000.000"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            {penjualanRaw && (
              <p className="text-xs text-ink-muted mt-1">
                {formatRp(parseNum(penjualanRaw))}
              </p>
            )}
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            Hitung Food Cost
          </button>
        </div>
      </div>

      {/* Results */}
      {calculated && (
        <div id="hasil-perhitungan" className="space-y-6">
          {/* Food Cost Percentage — big highlight */}
          <div className="bg-primary rounded-xl p-6 text-center">
            <p className="text-white/80 text-sm font-medium mb-1">
              Food Cost Percentage
            </p>
            <p className="text-3xl md:text-4xl font-bold text-white">
              {result.foodCostPercent.toFixed(1)}%
            </p>
            <p className="text-white/60 text-sm mt-2">
              dari total penjualan bulanan
            </p>
          </div>

          {/* Status */}
          {result.status && (
            <div
              className={`${statusConfig[result.status].bg} border ${statusConfig[result.status].border} rounded-xl p-5`}
            >
              <div className="flex items-center gap-2 mb-2">
                {(() => {
                  const StatusIcon = statusConfig[result.status].icon;
                  return (
                    <StatusIcon
                      className={`w-5 h-5 ${statusConfig[result.status].color}`}
                    />
                  );
                })()}
                <span
                  className={`font-semibold ${statusConfig[result.status].color}`}
                >
                  Status: {statusConfig[result.status].label}
                </span>
              </div>
              <p className="text-sm text-ink-tertiary">
                {statusConfig[result.status].message}
              </p>
            </div>
          )}

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-canvas border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4 text-warning" />
                </div>
                <span className="text-sm font-medium text-ink">
                  Bahan Baku
                </span>
              </div>
              <p className="text-xl font-bold text-ink">
                {formatRp(parseNum(bahanBakuRaw))}
              </p>
              <p className="text-xs text-ink-muted mt-1">per bulan</p>
            </div>

            <div className="bg-canvas border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm font-medium text-ink">Penjualan</span>
              </div>
              <p className="text-xl font-bold text-success">
                {formatRp(parseNum(penjualanRaw))}
              </p>
              <p className="text-xs text-ink-muted mt-1">per bulan</p>
            </div>

            <div className="bg-canvas border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-ink">
                  Sisa untuk Biaya Lain
                </span>
              </div>
              <p className="text-xl font-bold text-primary">
                {result.sisaMargin.toFixed(1)}%
              </p>
              <p className="text-xs text-ink-muted mt-1">
                operasional + keuntungan
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reference Table */}
      <div className="bg-canvas border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-ink mb-4">
          Referensi Food Cost Ideal per Jenis Usaha
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 px-3 font-medium text-ink">
                  Jenis Usaha
                </th>
                <th className="text-right py-2.5 px-3 font-medium text-ink">
                  Food Cost Ideal
                </th>
              </tr>
            </thead>
            <tbody>
              {referenceTable.map((row) => (
                <tr
                  key={row.type}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-2.5 px-3 text-ink-tertiary">{row.type}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-ink">
                    {row.range}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
        <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-ink mb-1">
            Apa itu Food Cost Percentage?
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-tertiary">
            <li>
              Food cost = (Total Bahan Baku ÷ Total Penjualan) × 100%
            </li>
            <li>
              Rentang ideal umumnya 25-35% untuk bisnis F&B di Indonesia.
            </li>
            <li>
              Sisa margin (65-75%) digunakan untuk biaya operasional (gaji,
              sewa, listrik) dan keuntungan bersih.
            </li>
            <li>
              Pantau food cost secara bulanan untuk menjaga profitabilitas.
            </li>
          </ul>
        </div>
      </div>

      {/* AI Insight */}
      {calculated && (
        <div className="mt-4">
          <AiInsightBox
            title="AI Food Cost Advisor"
            description="Minta AI analisis food cost, benchmark industri, dan saran efisiensi."
            placeholder="Contoh: food cost 35% itu ideal gak untuk restoran?"
            buttonLabel="Analisis Food Cost dengan AI"
            context={`Data food cost user:\nTotal bahan baku: ${bahanBakuRaw}\nTotal penjualan: ${penjualanRaw}\nFood cost: ${result.foodCostPercent.toFixed(1)}%\nMargin tersisa: ${(100 - result.foodCostPercent).toFixed(1)}%`}
            system="Kamu adalah advisor bisnis F&B Indonesia. Analisis food cost, benchmark industri, dan saran efisiensi biaya bahan baku."
          />
        </div>
      )}

      <ActionBar
        tool="umkm-food-cost"
        toolName="Kalkulator Food Cost"
        shareItems={[["Food Cost", `${result.foodCostPercent.toFixed(1)}%`], ["Bahan Baku", formatRp(parseNum(bahanBakuRaw))], ["Penjualan", formatRp(parseNum(penjualanRaw))]]}
        resultElementId="hasil-perhitungan"
        filename="umkm-food-cost.pdf"
        show={calculated}
      />
    </div>
  );
}
