import type { Metadata } from "next";
import { Shield, Globe, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami — Toolinter",
  description:
    "Kenalan dengan Toolinter, platform tool online gratis untuk kebutuhan sehari-hari masyarakat Indonesia.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <h1 className="text-3xl font-bold text-ink mb-8">Tentang Toolinter</h1>

      {/* Intro */}
      <div className="prose prose-neutral max-w-none space-y-4 text-ink-secondary leading-relaxed mb-12">
        <p>
          Toolinter adalah platform tool online gratis untuk kebutuhan
          sehari-hari. Kami menyediakan berbagai alat digital yang bisa
          digunakan langsung dari browser tanpa perlu menginstal aplikasi
          apapun.
        </p>
        <p>
          Dibuat untuk membantu masyarakat Indonesia mengakses tool dokumen,
          foto, CV, PDF, kalkulator, dan UMKM tanpa perlu install aplikasi atau
          bayar. Semua proses dilakukan di sisi browser, sehingga file Anda
          tetap aman dan privasi terjaga.
        </p>
      </div>

      {/* Misi */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-ink mb-6">Misi Kami</h2>
        <ul className="space-y-4">
          {[
            {
              icon: Globe,
              text: "Akses gratis untuk semua — setiap orang berhak mendapat tool digital berkualitas tanpa biaya.",
            },
            {
              icon: Shield,
              text: "Privasi terjaga — semua file diproses di browser Anda, tidak dikirim ke server manapun.",
            },
            {
              icon: Heart,
              text: "Untuk Indonesia — dibuat oleh tim Indonesia, untuk kebutuhan spesifik masyarakat Indonesia.",
            },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-ink-secondary leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tim */}
      <section>
        <h2 className="text-2xl font-semibold text-ink mb-4">Tim Kami</h2>
        <p className="text-ink-secondary leading-relaxed">
          Kami adalah tim kecil yang passionate tentang web tools dan akses
          teknologi untuk semua. Dengan latar belakang di web development dan
          desain, kami terus berusaha menghadirkan tool yang cepat, ringan, dan
          mudah digunakan oleh siapapun.
        </p>
      </section>
    </main>
  );
}
