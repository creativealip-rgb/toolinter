import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";

export const metadata: Metadata = generateToolMetadata({
  title: "Buat CV untuk Lamar BUMN & CPNS (Format Benar)",
  description: "Bikin CV sesuai format lamaran BUMN dan CPNS. Template ATS-friendly, struktur yang benar, download PDF gratis. Tingkatkan peluang lolos.",
  path: "/cv/cv-bumn",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath="/cv/cv-bumn" />
      </div>
    </>
  );
}
