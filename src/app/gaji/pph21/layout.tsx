import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/related-tools";

export const metadata: Metadata = generateToolMetadata({
  title: "Kalkulator PPh 21 Tarif Progresif & TER 2026",
  description: "Hitung potongan PPh 21 karyawan online gratis pakai tarif TER 2026 & progresif. Masukkan gaji dan status PTKP, hasil langsung tampil. Tanpa daftar.",
  path: "/gaji/pph21",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath="/gaji/pph21" />
      </div>
    </>
  );
}
