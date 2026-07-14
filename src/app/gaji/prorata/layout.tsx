import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";

export const metadata: Metadata = generateToolMetadata({
  title: "Kalkulator Gaji Prorata Masuk Tengah Bulan",
  description: "Hitung gaji prorata untuk karyawan yang masuk atau resign di tengah bulan. Masukkan gaji & tanggal, dapat nominal proporsional. Gratis.",
  path: "/gaji/prorata",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/gaji/prorata" title="Kalkulator Gaji Prorata Masuk Tengah Bulan" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath="/gaji/prorata" />
      </div>
    </>
  );
}
