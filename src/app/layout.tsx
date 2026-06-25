import type { Metadata } from "next";
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
    <html lang="id" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var d=localStorage.getItem('theme');if(d==='dark'||(!d&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')})()` }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
