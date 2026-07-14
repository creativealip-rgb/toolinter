import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Buat CV Fresh Graduate Tanpa Pengalaman Kerja",
  description: "Bikin CV fresh graduate ATS-friendly tanpa pengalaman kerja. Template gratis, isi data, download PDF langsung. Cocok untuk lamaran pertama.",
  path: "/cv/fresh-graduate",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/cv/fresh-graduate" title="Buat CV Fresh Graduate Tanpa Pengalaman Kerja" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/cv/fresh-graduate" />
        <RelatedTools toolPath="/cv/fresh-graduate" />
      </div>
    </>
  );
}
