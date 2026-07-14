import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Kalkulator Pesangon PHK 2026 (UU Cipta Kerja)",
  description: "Hitung estimasi pesangon PHK sesuai UU Cipta Kerja & PP 35/2021: uang pesangon, penghargaan masa kerja, dan penggantian hak. Gratis, tanpa daftar.",
  path: "/gaji/pesangon",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/gaji/pesangon" title="Kalkulator Pesangon PHK 2026 (UU Cipta Kerja)" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/gaji/pesangon" />
        <RelatedTools toolPath="/gaji/pesangon" />
      </div>
    </>
  );
}
