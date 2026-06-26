import type { Metadata } from "next";
import "./globals.css";
import PwaInstall from "@/components/pwa-install";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { I18nProvider } from "@/lib/i18n";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://toolinter.net"),
  title: {
    default: "Toolinter — 70+ Tool Online Gratis Indonesia",
    template: "%s — Toolinter",
  },
  description: "Kumpulan tool online gratis untuk surat, foto, CV, PDF, pajak, gaji, dan UMKM. Cepat, ringan, bisa langsung download hasil.",
  keywords: ["tool online", "gratis", "surat", "foto", "CV", "PDF", "gaji", "UMKM", "Indonesia", "kalkulator", "generator"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Toolinter",
    url: "https://toolinter.net",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Toolinter — 70+ Tool Online Gratis" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-default.png"] },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Toolinter" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <script defer data-domain="toolinter.net" src="https://plausible.io/js/script.js" />
      </head>
      <body className="min-h-full flex flex-col">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CNK84V0DY8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CNK84V0DY8');
          `}
        </Script>
        <NextTopLoader color="#1A8FE3" showSpinner={false} height={3} />
        <I18nProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <PwaInstall />
        </I18nProvider>
      </body>
    </html>
  );
}
