import { ImageResponse } from "next/og";

export const runtime = "nodejs";

// Per-category accent + emoji badge.
const CATEGORY: Record<string, { label: string; accent: string; emoji: string }> = {
  gaji: { label: "Gaji & Pajak", accent: "#16A34A", emoji: "💰" },
  keuangan: { label: "Keuangan", accent: "#0D9488", emoji: "📊" },
  cv: { label: "CV & Lamaran", accent: "#7C3AED", emoji: "📄" },
  foto: { label: "Foto Dokumen", accent: "#DB2777", emoji: "📷" },
  pdf: { label: "PDF & Converter", accent: "#DC2626", emoji: "📑" },
  surat: { label: "Surat & Dokumen", accent: "#2563EB", emoji: "✉️" },
  umkm: { label: "UMKM & Bisnis", accent: "#D97706", emoji: "🏪" },
  pendidikan: { label: "Pendidikan", accent: "#0891B2", emoji: "🎓" },
  blog: { label: "Blog & Panduan", accent: "#1A8FE3", emoji: "📚" },
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Tool Online Gratis").slice(0, 90);
  const catKey = (searchParams.get("cat") || "").toLowerCase();
  const cat = CATEGORY[catKey] || { label: "Tool Online Gratis", accent: "#1A8FE3", emoji: "🛠️" };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top accent bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: cat.accent,
              color: "#fff",
              padding: "10px 22px",
              borderRadius: "999px",
              fontSize: "28px",
              fontWeight: 600,
            }}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </div>
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 45 ? "60px" : "72px",
            fontWeight: 800,
            color: "#181D20",
            lineHeight: 1.1,
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        {/* footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", fontSize: "40px", fontWeight: 800, color: "#181D20" }}>
              Tool<span style={{ color: "#1A8FE3" }}>inter</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: "26px", color: "#6B7280" }}>
            Gratis · Tanpa Daftar · Proses di Browser
          </div>
        </div>

        {/* bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "12px",
            background: cat.accent,
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
