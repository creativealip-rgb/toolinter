import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";

export const metadata: Metadata = generateToolMetadata({
  title: "Kalkulator Investasi & Return Reksadana",
  description: "Hitung proyeksi return investasi reksadana, saham, dan compound interest. Simulasi pertumbuhan dana per tahun. Gratis, langsung di browser.",
  path: "/keuangan/investasi",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/keuangan/investasi" title="Kalkulator Investasi & Return Reksadana" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath="/keuangan/investasi" />
      </div>
    </>
  );
}
