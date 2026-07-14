import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";

export const metadata: Metadata = generateToolMetadata({
  title: "Cek Format NPWP & Validasi NIK Online",
  description: "Validasi format NPWP dan NIK secara instan di browser. Cek kelengkapan digit dan format resmi. Gratis, data tidak disimpan di server.",
  path: "/keuangan/cek-npwp",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath="/keuangan/cek-npwp" />
      </div>
    </>
  );
}
