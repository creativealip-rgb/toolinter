import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";
import ToolFaq from "@/components/tool-faq";

export const metadata: Metadata = generateToolMetadata({
  title: "Kalkulator THR Karyawan (Tetap, Kontrak, Harian)",
  description: "Hitung THR karyawan tetap, kontrak, dan harian sesuai masa kerja. Gratis, akurat sesuai aturan Kemnaker terbaru, hasil langsung tampil.",
  path: "/gaji/thr",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/gaji/thr" />
        <RelatedTools toolPath="/gaji/thr" />
      </div>
    </>
  );
}
