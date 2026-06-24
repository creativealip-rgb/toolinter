import type { Metadata } from "next";
import Link from "next/link";
import { FileText, FileCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "CV & Lamaran Kerja — Toolinter",
  description:
    "Kumpulan tools untuk membuat CV ATS-friendly dan surat lamaran kerja secara online, gratis, dan tanpa registrasi.",
  alternates: { canonical: "/cv" },
};

const cards = [
  {
    title: "Generator CV ATS",
    desc: "Buat CV yang lolos ATS (Applicant Tracking System) dalam hitungan menit. Format bersih, satu kolom, siap download PDF.",
    href: "/cv/ats",
    icon: FileText,
    available: true,
  },
  {
    title: "Surat Lamaran Kerja",
    desc: "Buat surat lamaran kerja profesional dengan mudah. Isi data, generate, download.",
    href: "/surat/lamaran-kerja",
    icon: FileCheck,
    available: true,
  },
  {
    title: "Template Cover Letter",
    desc: "Template cover letter dalam bahasa Indonesia dan Inggris. Segera hadir!",
    href: "#",
    icon: Mail,
    available: false,
  },
];

export default function CvLandingPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">
          CV & Lamaran Kerja
        </h1>
        <p className="mt-3 text-ink-tertiary">
          Buat CV ATS-friendly dan surat lamaran kerja secara online, gratis,
          tanpa registrasi.
        </p>
      </section>

      {/* Cards */}
      <section className="mx-auto grid max-w-4xl gap-6 px-4 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          const inner = (
            <div
              className={`group rounded-xl border border-border bg-surface p-6 transition hover:shadow-md ${
                c.available ? "hover:border-primary" : "opacity-60"
              }`}
            >
              <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
                <Icon size={24} />
              </div>
              <h2 className="text-lg font-semibold text-ink">{c.title}</h2>
              <p className="mt-2 text-sm text-ink-tertiary">{c.desc}</p>
              {!c.available && (
                <span className="mt-3 inline-block rounded-full bg-border px-3 py-0.5 text-xs font-medium text-ink-muted">
                  Segera Hadir
                </span>
              )}
            </div>
          );

          return c.available ? (
            <Link key={c.href} href={c.href}>
              {inner}
            </Link>
          ) : (
            <div key={c.title}>{inner}</div>
          );
        })}
      </section>

      {/* SEO content */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-xl font-semibold text-ink">
          Kenapa CV ATS-Friendly Penting?
        </h2>
        <p className="mt-3 leading-relaxed text-ink-tertiary">
          Banyak perusahaan besar menggunakan <strong>ATS (Applicant Tracking System)</strong> untuk
          menyaring CV secara otomatis sebelum dibaca oleh recruiter. CV yang tidak
          sesuai format ATS bisa langsung ditolak oleh sistem — meskipun kualifikasi
          Anda sangat sesuai. CV ATS-friendly menggunakan format satu kolom, teks
          biasa tanpa tabel atau grafik berlebihan, heading yang jelas, dan kata kunci
          yang relevan.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-ink">
          Tips Membuat CV yang Lolos ATS
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-tertiary">
          <li>Gunakan format satu kolom — ATS sulit membaca layout multi-kolom.</li>
          <li>Hindari tabel, grafik, dan ikon di dalam CV.</li>
          <li>Gunakan heading standar: Pendidikan, Pengalaman Kerja, Keahlian.</li>
          <li>Sertakan kata kunci dari lowongan kerja yang dilamar.</li>
          <li>Simpan dalam format PDF agar layout tetap konsisten.</li>
          <li>Tulis deskripsi pengalaman kerja dengan bullet points yang jelas.</li>
        </ul>
      </section>
    </main>
  );
}
