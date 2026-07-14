import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Ganti Background Foto Online (Merah, Biru, Putih)",
  description: "Ganti latar pas foto jadi merah, biru, atau putih otomatis untuk lamaran kerja & CPNS. Gratis, tanpa aplikasi, diproses 100% di browser.",
  path: "/foto/ganti-background",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/foto/ganti-background" title="Ganti Background Foto Online (Merah, Biru, Putih)" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/foto/ganti-background" />
        <RelatedTools toolPath="/foto/ganti-background" />
      </div>
    </>
  );
}
