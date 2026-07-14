import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";

export const metadata: Metadata = generateToolMetadata({
  title: "Buat Surat Dinas Resmi Online Gratis",
  description: "Bikin surat dinas resmi sesuai format standar. Isi data, download PDF. Gratis, tanpa install aplikasi, proses di browser.",
  path: "/surat/dinas",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/surat/dinas" title="Buat Surat Dinas Resmi Online Gratis" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath="/surat/dinas" />
      </div>
    </>
  );
}
