import type { Metadata } from "next";

const BASE = "https://toolinter.net";
const SITE_NAME = "Toolinter";
const DEFAULT_DESC = "Kumpulan tool online gratis untuk surat, foto, CV, PDF, pajak, gaji, dan UMKM. Cepat, ringan, bisa langsung download hasil.";

interface ToolMetaOpts {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}

export function generateToolMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: ToolMetaOpts): Metadata {
  const url = `${BASE}${path}`;
  const ogImage = image || `${BASE}/og-default.png`;

  return {
    title,  // layout template adds "— Toolinter" automatically
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "id_ID",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
    keywords: [title.toLowerCase(), "online", "gratis", "tool", SITE_NAME.toLowerCase()],
  };
}

export function generateCategoryMetadata(
  category: string,
  description: string,
  toolCount: number,
): Metadata {
  return generateToolMetadata({
    title: `${category} — ${toolCount} Tool Online Gratis`,
    description,
    path: `/${category.toLowerCase()}`,
  });
}
