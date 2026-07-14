import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";

export const metadata: Metadata = generateToolMetadata({
  title: "Generator Caption Jualan & Promosi UMKM",
  description: "Bikin caption jualan menarik untuk Instagram, WhatsApp, dan marketplace. Cepat, gratis, cocok untuk UMKM dan online shop.",
  path: "/umkm/caption",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd toolPath="/umkm/caption" title="Generator Caption Jualan & Promosi UMKM" />
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath="/umkm/caption" />
      </div>
    </>
  );
}
