import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Kalkulator Gaji Bersih (Take Home Pay) 2026",
  description: "Hitung gaji bersih bulanan setelah potongan PPh 21, BPJS Kesehatan & Ketenagakerjaan. Gratis, akurat sesuai aturan 2026, langsung di browser.",
  path: "/gaji/bersih",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/gaji/bersih" title="Kalkulator Gaji Bersih (Take Home Pay) 2026" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/gaji/bersih" />
        <RelatedTools toolPath="/gaji/bersih" />
      </div>
    </>
  );
}
