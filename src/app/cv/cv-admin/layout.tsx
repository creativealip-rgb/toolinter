import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Buat CV Admin & Staff Profesional Gratis",
  description: "Bikin CV untuk posisi admin, staff, dan operasional. Template ATS-friendly, isi data, download PDF. Gratis tanpa daftar.",
  path: "/cv/cv-admin",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/cv/cv-admin" title="Buat CV Admin & Staff Profesional Gratis" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/cv/cv-admin" />
        <RelatedTools toolPath="/cv/cv-admin" />
      </div>
    </>
  );
}
