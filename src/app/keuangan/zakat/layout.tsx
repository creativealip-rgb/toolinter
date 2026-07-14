import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Kalkulator Zakat (Penghasilan, Mal, Perdagangan)",
  description: "Hitung zakat penghasilan, zakat mal (tabungan & emas), dan zakat perdagangan sesuai nisab 85 gram emas dan kadar 2,5% menurut BAZNAS. Gratis, tanpa daftar.",
  path: "/keuangan/zakat",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/keuangan/zakat" title="Kalkulator Zakat (Penghasilan, Mal, Perdagangan)" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/keuangan/zakat" />
        <RelatedTools toolPath="/keuangan/zakat" />
      </div>
    </>
  );
}
