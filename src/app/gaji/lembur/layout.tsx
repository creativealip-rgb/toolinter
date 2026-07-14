import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Kalkulator Uang Lembur UU Cipta Kerja 2026",
  description: "Hitung uang lembur karyawan sesuai UU Cipta Kerja & Kepmenaker. Masukkan gaji dan jam lembur, dapat rincian upah lembur per jam. Gratis.",
  path: "/gaji/lembur",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/gaji/lembur" title="Kalkulator Uang Lembur UU Cipta Kerja 2026" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/gaji/lembur" />
        <RelatedTools toolPath="/gaji/lembur" />
      </div>
    </>
  );
}
