import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata({
  title: "Kalender Akademik Indonesia 2026",
  description: "Lihat kalender akademik Indonesia: tanggal penting, libur sekolah, dan jadwal semester. Gratis, mudah diakses.",
  path: "/pendidikan/kalender",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
