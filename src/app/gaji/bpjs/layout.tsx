import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Kalkulator BPJS Kesehatan & Ketenagakerjaan 2026",
  description: "Hitung iuran BPJS Kesehatan dan Ketenagakerjaan (JHT, JP) dari gaji. Rincian potongan karyawan & kontribusi perusahaan. Gratis tanpa daftar.",
  path: "/gaji/bpjs",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/gaji/bpjs" title="Kalkulator BPJS Kesehatan & Ketenagakerjaan 2026" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/gaji/bpjs" />
        <RelatedTools toolPath="/gaji/bpjs" />
      </div>
    </>
  );
}
