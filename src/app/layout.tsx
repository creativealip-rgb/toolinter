import type { Metadata } from "next";
import AiChatbot from "@/components/ai-chatbot";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toolinter — Online Tools Gratis untuk Surat, Foto, CV, PDF & Keuangan",
  description: "Kumpulan tool online gratis untuk surat, foto, CV, PDF, pajak, gaji, dan UMKM. Cepat, ringan, bisa langsung download hasil.",
  keywords: ["tool online", "gratis", "surat", "foto", "CV", "PDF", "gaji", "UMKM", "Indonesia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <AiChatbot />
      </body>
    </html>
  );
}
