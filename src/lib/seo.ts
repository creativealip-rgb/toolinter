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
  // Derive category from first path segment (e.g. /gaji/bersih -> "gaji") for a per-category dynamic OG image.
  const cat = path.split("/").filter(Boolean)[0] || "";
  const dynamicOg = `${BASE}/api/og?title=${encodeURIComponent(title)}&cat=${encodeURIComponent(cat)}`;
  const ogImage = image || dynamicOg;

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
