import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "CV Generator Online ATS-Friendly Gratis",
  description: "Buat CV profesional ATS-friendly dalam hitungan menit. Pilih template, isi data, download PDF. Gratis, tanpa daftar, langsung di browser.",
  path: "/cv/generator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/cv/generator" title="CV Generator Online ATS-Friendly Gratis" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/cv/generator" />
        <RelatedTools toolPath="/cv/generator" />
      </div>
    </>
  );
}
