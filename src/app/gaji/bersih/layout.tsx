import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";

export const metadata: Metadata = generateToolMetadata({
  title: "Kalkulator Gaji Bersih (Take Home Pay) 2026",
  description: "Hitung gaji bersih bulanan setelah potongan PPh 21, BPJS Kesehatan & Ketenagakerjaan. Gratis, akurat sesuai aturan 2026, langsung di browser.",
  path: "/gaji/bersih",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath="/gaji/bersih" />
      </div>
    </>
  );
}
