import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";

export const metadata: Metadata = generateToolMetadata({
  title: "Contoh Surat Lamaran Kerja & Generator Gratis",
  description: "Buat surat lamaran kerja profesional dari template. Contoh untuk berbagai posisi, isi data, download PDF. Gratis tanpa daftar.",
  path: "/cv/contoh-surat-lamaran",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath="/cv/contoh-surat-lamaran" />
      </div>
    </>
  );
}
