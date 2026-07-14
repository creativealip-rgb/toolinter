import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import ToolFaq from "@/components/tool-faq";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/pdf/pdf-ke-word" title="Konversi PDF ke Word" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/pdf/pdf-ke-word" />
        <RelatedTools toolPath="/pdf/pdf-ke-word" />
      </div>
    </>
  );
}
