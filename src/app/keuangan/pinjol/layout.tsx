import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Cek Daftar Pinjol Legal Berizin OJK 2026",
  description: "Cek apakah pinjaman online terdaftar & berizin OJK. Hindari pinjol ilegal. Daftar resmi terupdate, gratis, aman dipakai.",
  path: "/keuangan/pinjol",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/keuangan/pinjol" />
        <RelatedTools toolPath="/keuangan/pinjol" />
      </div>
    </>
  );
}
