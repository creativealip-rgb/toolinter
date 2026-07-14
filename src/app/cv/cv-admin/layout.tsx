import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";

export const metadata: Metadata = generateToolMetadata({
  title: "Buat CV Admin & Staff Profesional Gratis",
  description: "Bikin CV untuk posisi admin, staff, dan operasional. Template ATS-friendly, isi data, download PDF. Gratis tanpa daftar.",
  path: "/cv/cv-admin",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath="/cv/cv-admin" />
      </div>
    </>
  );
}
