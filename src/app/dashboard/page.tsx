import Link from "next/link";

const cards = [
  {
    title: "Artikel",
    desc: "Kelola postingan blog, edit konten, jadwalkan publish.",
    href: "/dashboard/posts",
    icon: "📝",
  },
  {
    title: "Analytics",
    desc: "Pantau pageviews, tren, dan post terpopuler.",
    href: "/dashboard/analytics",
    icon: "📊",
  },
  {
    title: "Media",
    desc: "Upload dan kelola gambar untuk artikel.",
    href: "/dashboard/media",
    icon: "🖼️",
  },
];

export default function DashboardIndex() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <Link href="/" style={{ color: "#64748b", fontSize: 14, textDecoration: "none" }}>
            ← Kembali ke Toolinter
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginTop: 8, color: "#0f172a" }}>
            Dashboard
          </h1>
          <p style={{ color: "#64748b", fontSize: 15 }}>
            Kelola konten dan pantau performa toolinter.net
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              style={{
                display: "block",
                padding: "24px",
                background: "#fff",
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                textDecoration: "none",
                transition: "box-shadow 0.15s",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginBottom: 6 }}>
                {card.title}
              </div>
              <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.5 }}>
                {card.desc}
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 40, padding: "16px 20px", background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: 14, color: "#64748b" }}>
            <strong>Quick Stats:</strong>{" "}
            <Link href="/dashboard/posts" style={{ color: "#2563eb" }}>20 published</Link> ·{" "}
            <Link href="/dashboard/posts" style={{ color: "#2563eb" }}>630 scheduled</Link> ·{" "}
            <Link href="/dashboard/analytics" style={{ color: "#2563eb" }}>Analytics →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
