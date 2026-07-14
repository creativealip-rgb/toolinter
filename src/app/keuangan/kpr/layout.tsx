import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Simulasi KPR: Cicilan Fixed vs Floating",
  description: "Simulasi cicilan KPR bulanan dengan bunga fixed dan floating. Bandingkan total bayar, tenor, dan cicilan. Gratis, tanpa daftar.",
  path: "/keuangan/kpr",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/keuangan/kpr" title="Simulasi KPR: Cicilan Fixed vs Floating" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/keuangan/kpr" />
        <RelatedTools toolPath="/keuangan/kpr" />
      </div>
    </>
  );
}
