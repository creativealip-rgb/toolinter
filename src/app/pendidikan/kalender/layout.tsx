import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Kalender Akademik Indonesia 2026",
  description: "Lihat kalender akademik Indonesia: tanggal penting, libur sekolah, dan jadwal semester. Gratis, mudah diakses.",
  path: "/pendidikan/kalender",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/pendidikan/kalender" title="Kalender Akademik Indonesia 2026" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/pendidikan/kalender" />
        <RelatedTools toolPath="/pendidikan/kalender" />
      </div>
    </>
  );
}
