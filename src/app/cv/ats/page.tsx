import type { Metadata } from "next";
import { CvGenerator } from "@/components/cv-generator";

export const metadata: Metadata = {
  title: "Generator CV ATS Online — Toolinter",
  description:
    "Buat CV ATS-friendly secara online dan download PDF. Format bersih satu kolom, lolos Applicant Tracking System. Gratis, tanpa registrasi.",
  alternates: { canonical: "/cv/ats" },
};

export default function CvAtsPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <section className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">
          Generator CV ATS Online
        </h1>
        <p className="mt-3 text-ink-tertiary">
          Isi formulir di bawah, preview CV Anda, lalu download sebagai PDF
          yang ATS-friendly.
        </p>
      </section>

      <CvGenerator />

      {/* SEO tips */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-xl font-semibold text-ink">
          Apa Itu ATS?
        </h2>
        <p className="mt-3 leading-relaxed text-ink-tertiary">
          <strong>ATS (Applicant Tracking System)</strong> adalah perangkat lunak yang digunakan
          perusahaan untuk mengelola proses rekrutmen. ATS memindai CV secara
          otomatis untuk mencocokkan kata kunci, pengalaman, dan kualifikasi
          pelamar. CV yang tidak sesuai format standar akan sulit terbaca oleh
          ATS dan berpotensi langsung ditolak.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-ink">
          Format CV yang Direkomendasikan ATS
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-tertiary">
          <li>Satu kolom, tanpa sidebar atau multi-column layout.</li>
          <li>Font standar seperti Arial, Helvetica, atau Calibri.</li>
          <li>Heading jelas: Ringkasan Profesional, Pendidikan, Pengalaman Kerja, Keahlian.</li>
          <li>Hindari gambar, ikon, dan elemen grafis.</li>
          <li>Gunakan bullet points untuk deskripsi pengalaman.</li>
          <li>Sertakan kata kunci relevan dari deskripsi lowongan.</li>
        </ul>
        <h2 className="mt-8 text-xl font-semibold text-ink">
          Keunggulan Tool CV ATS Toolinter
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-tertiary">
          <li>100% gratis, tanpa registrasi atau watermark.</li>
          <li>Format satu kolom yang terbaca oleh semua ATS.</li>
          <li>Preview langsung sebelum download.</li>
          <li>Download sebagai PDF bersih dan profesional.</li>
          <li>Data tidak disimpan — semua proses terjadi di browser Anda.</li>
        </ul>
      </section>
    </main>
  );
}
