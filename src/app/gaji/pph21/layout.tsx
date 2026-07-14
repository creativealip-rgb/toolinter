import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Kalkulator PPh 21 Tarif Progresif & TER 2026",
  description: "Hitung potongan PPh 21 karyawan online gratis pakai tarif TER 2026 & progresif. Masukkan gaji dan status PTKP, hasil langsung tampil. Tanpa daftar.",
  path: "/gaji/pph21",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/gaji/pph21" title="Kalkulator PPh 21 Tarif Progresif & TER 2026" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/gaji/pph21" />
        <RelatedTools toolPath="/gaji/pph21" />
      </div>
    </>
  );
}
