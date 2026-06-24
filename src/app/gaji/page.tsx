import { Metadata } from "next";
import Link from "next/link";
import {
  Wallet,
  Receipt,
  Gift,
  Shield,
  ArrowRight,
  Calculator,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kalkulator Gaji — Hitung Gaji Bersih, PPh21, BPJS — Toolinter",
  description:
    "Kalkulator gaji lengkap untuk Indonesia. Hitung gaji bersih (take home pay), PPh21, BPJS Kesehatan, BPJS Ketenagakerjaan, dan THR secara gratis.",
};

const tools = [
  {
    title: "Kalkulator Gaji Bersih",
    description:
      "Hitung take home pay dari gaji kotor. Otomatis potong PPh21, BPJS Kesehatan, dan BPJS Ketenagakerjaan.",
    href: "/gaji/bersih",
    icon: Wallet,
    color: "text-primary",
    bg: "bg-primary/10",
    ready: true,
  },
  {
    title: "Kalkulator PPh21",
    description:
      "Hitung pajak penghasilan PPh21 berdasarkan progresif dan status PTKP.",
    href: "/gaji/pph21",
    icon: Receipt,
    color: "text-warning",
    bg: "bg-warning/10",
    ready: false,
  },
  {
    title: "Kalkulator THR",
    description:
      "Hitung tunjangan hari raya berdasarkan masa kerja dan gaji terakhir.",
    href: "/gaji/thr",
    icon: Gift,
    color: "text-success",
    bg: "bg-success/10",
    ready: false,
  },
  {
    title: "Kalkulator BPJS",
    description:
      "Hitung iuran BPJS Kesehatan dan BPJS Ketenagakerjaan (JHT, JP, JKK, JKM).",
    href: "/gaji/bpjs",
    icon: Shield,
    color: "text-primary",
    bg: "bg-primary/10",
    ready: false,
  },
];

export default function GajiPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Kalkulator Gaji Indonesia
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
            Kalkulator Gaji & Pajak
          </h1>
          <p className="text-lg text-ink-tertiary max-w-2xl mx-auto">
            Hitung gaji bersih, pajak PPh21, iuran BPJS, dan THR. Gratis, cepat,
            dan akurat sesuai regulasi Indonesia.
          </p>
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const content = (
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg ${tool.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${tool.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-semibold text-ink">
                      {tool.title}
                    </h2>
                    {!tool.ready && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-surface text-ink-muted">
                        Segera
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink-tertiary">
                    {tool.description}
                  </p>
                  {tool.ready && (
                    <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Mulai hitung <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            );

            return tool.ready ? (
              <Link
                key={tool.href}
                href={tool.href}
                className="block rounded-xl border border-border bg-canvas p-6 transition-all hover:shadow-lg hover:border-primary/30 cursor-pointer"
              >
                {content}
              </Link>
            ) : (
              <div
                key={tool.href}
                className="rounded-xl border border-border bg-canvas p-6 transition-all opacity-70 cursor-default"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
