const BASE = "https://toolinter.net";

const CATEGORY_LABEL: Record<string, string> = {
  gaji: "Gaji & Pajak",
  keuangan: "Keuangan",
  cv: "CV & Lamaran",
  foto: "Foto Dokumen",
  pdf: "PDF & Converter",
  surat: "Surat & Dokumen",
  umkm: "UMKM & Bisnis",
  pendidikan: "Pendidikan",
};

/**
 * Server component — emits BreadcrumbList JSON-LD so Google shows a breadcrumb
 * trail in search results (better context + CTR). Derives trail from the path.
 */
export default function BreadcrumbJsonLd({
  toolPath,
  title,
}: {
  toolPath: string;
  title: string;
}) {
  const segments = toolPath.split("/").filter(Boolean); // e.g. ["gaji","bersih"]
  const items: { name: string; item: string }[] = [{ name: "Beranda", item: BASE }];

  if (segments.length >= 1) {
    const cat = segments[0];
    items.push({
      name: CATEGORY_LABEL[cat] || cat.charAt(0).toUpperCase() + cat.slice(1),
      item: `${BASE}/${cat}`,
    });
  }
  if (segments.length >= 2) {
    items.push({ name: title, item: `${BASE}${toolPath}` });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
