import type { Metadata } from "next";
import { FileText, FileCheck, Mail, GraduationCap, Briefcase, Building2, FileSignature } from "lucide-react";
import CategoryCard from "@/components/category-card";

export const metadata: Metadata = {
  title: "CV & Lamaran Kerja — Toolinter",
  description: "Kumpulan tools untuk membuat CV ATS-friendly dan surat lamaran kerja secara online, gratis, dan tanpa registrasi.",
  alternates: { canonical: "/cv" },
};

const cards = [
  { title: "Generator CV ATS", desc: "Buat CV yang lolos ATS (Applicant Tracking System) dalam hitungan menit. Format bersih, satu kolom, siap download PDF.", href: "/cv/ats", icon: FileText },
  { title: "Surat Lamaran Kerja", desc: "Buat surat lamaran kerja profesional dengan mudah. Isi data, generate, download.", href: "/surat/lamaran-kerja", icon: FileCheck },
  { title: "Template CV Fresh Graduate", desc: "Template CV untuk lulusan baru tanpa pengalaman kerja. Fokus pendidikan, proyek, magang, dan keahlian.", href: "/cv/fresh-graduate", icon: GraduationCap },
  { title: "Template CV Admin", desc: "Template CV untuk posisi staff administrasi, admin kantor, dan resepsionis. Format ATS-friendly.", href: "/cv/cv-admin", icon: Briefcase },
  { title: "Template CV BUMN", desc: "Template CV khusus untuk melamar di BUMN: Pertamina, PLN, Telkom, Bank Mandiri, dan lainnya.", href: "/cv/cv-bumn", icon: Building2 },
  { title: "Contoh Surat Lamaran Kerja", desc: "Contoh surat lamaran kerja formal yang benar. Download template PDF dan lihat panduan lengkap.", href: "/cv/contoh-surat-lamaran", icon: FileSignature },
  { title: "Template Cover Letter", desc: "Template cover letter dalam bahasa Indonesia dan Inggris. Isi formulir, download PDF.", href: "/cv/cover-letter", icon: Mail },
];

export default function CvLandingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">CV & Lamaran Kerja</h1>
        <p className="mt-3 text-gray-500">Buat CV ATS-friendly dan surat lamaran kerja secara online, gratis, tanpa registrasi.</p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
        {cards.map((c) => (
          <CategoryCard key={c.href} {...c} />
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-xl font-semibold text-gray-900">Kenapa CV ATS-Friendly Penting?</h2>
        <p className="mt-3 leading-relaxed text-gray-500">
          Banyak perusahaan besar menggunakan <strong>ATS (Applicant Tracking System)</strong> untuk
          menyaring CV secara otomatis sebelum dibaca oleh recruiter. CV yang tidak
          sesuai format ATS bisa langsung ditolak oleh sistem — meskipun kualifikasi
          Anda sangat sesuai. CV ATS-friendly menggunakan format satu kolom, teks
          biasa tanpa tabel atau grafik berlebihan, heading yang jelas, dan kata kunci
          yang relevan.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Tips Membuat CV yang Lolos ATS</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-500">
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
