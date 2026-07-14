import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Contoh Surat Lamaran Kerja & Generator Gratis",
  description: "Buat surat lamaran kerja profesional dari template. Contoh untuk berbagai posisi, isi data, download PDF. Gratis tanpa daftar.",
  path: "/cv/contoh-surat-lamaran",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/cv/contoh-surat-lamaran" title="Contoh Surat Lamaran Kerja & Generator Gratis" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/cv/contoh-surat-lamaran" />
        <RelatedTools toolPath="/cv/contoh-surat-lamaran" />
      </div>
    </>
  );
}
