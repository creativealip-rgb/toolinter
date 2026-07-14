import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";

export const metadata: Metadata = generateToolMetadata({
  title: "Daftar UMR/UMP Terbaru Semua Provinsi 2026",
  description: "Cek UMR/UMP terbaru semua provinsi & kota di Indonesia 2026. Bandingkan upah minimum antar daerah. Data lengkap, gratis, mudah dicari.",
  path: "/gaji/umr",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath="/gaji/umr" />
      </div>
    </>
  );
}
