import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Cek Format NPWP & Validasi NIK Online",
  description: "Validasi format NPWP dan NIK secara instan di browser. Cek kelengkapan digit dan format resmi. Gratis, data tidak disimpan di server.",
  path: "/keuangan/cek-npwp",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/keuangan/cek-npwp" title="Cek Format NPWP & Validasi NIK Online" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/keuangan/cek-npwp" />
        <RelatedTools toolPath="/keuangan/cek-npwp" />
      </div>
    </>
  );
}
