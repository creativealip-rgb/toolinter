import type { Metadata } from 'next';
import CoverLetter from '@/components/cover-letter';

export const metadata: Metadata = {
  title: 'Template Cover Letter Online — Toolinter',
  description:
    'Buat cover letter profesional dalam bahasa Indonesia dan Inggris. Isi formulir, preview, download PDF. Gratis, tanpa registrasi.',
  alternates: { canonical: '/cv/cover-letter' },
};

export default function CoverLetterPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <section className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">
          Template Cover Letter
        </h1>
        <p className="mt-3 text-ink-tertiary">
          Buat cover letter profesional dalam bahasa Indonesia atau Inggris.
          Isi formulir, preview hasilnya, dan download sebagai PDF.
        </p>
      </section>

      <CoverLetter />

      {/* SEO content */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-xl font-semibold text-ink">
          Apa Itu Cover Letter?
        </h2>
        <p className="mt-3 leading-relaxed text-ink-tertiary">
          <strong>Cover letter</strong> atau surat pengantar adalah dokumen yang
          menyertai CV saat melamar kerja. Cover letter memberikan kesempatan
          untuk menjelaskan secara singkat siapa Anda, mengapa Anda tertarik
          dengan posisi tersebut, dan apa yang membuat Anda cocok untuk peran
          tersebut.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-ink">
          Tips Membuat Cover Letter yang Efektif
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-tertiary">
          <li>Sebutkan posisi dan nama perusahaan secara spesifik.</li>
          <li>Jelaskan pengalaman relevan dengan singkat dan jelas.</li>
          <li>Tunjukkan keahlian utama yang sesuai dengan kebutuhan posisi.</li>
          <li>Berikan alasan mengapa Anda tertarik dengan perusahaan tersebut.</li>
          <li>Gunakan bahasa formal dan profesional.</li>
          <li>Jaga agar cover letter tetap ringkas — maksimal satu halaman.</li>
        </ul>
        <h2 className="mt-8 text-xl font-semibold text-ink">
          Cover Letter dalam Bahasa Indonesia & Inggris
        </h2>
        <p className="mt-3 leading-relaxed text-ink-tertiary">
          Tool ini mendukung pembuatan cover letter dalam dua bahasa. Untuk
          melamar di perusahaan lokal atau BUMN, gunakan bahasa Indonesia.
          Untuk perusahaan multinasional atau posisi internasional, pilih
          bahasa Inggris. Cukup toggle bahasa di bagian atas formulir.
        </p>
      </section>
    </main>
  );
}
