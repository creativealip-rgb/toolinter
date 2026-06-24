import { notFound } from "next/navigation";
import { suratTypes, getSuratBySlug } from "@/data/surat";
import SuratGenerator from "@/components/surat-generator";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateStaticParams() {
  return suratTypes.map((surat) => ({
    slug: surat.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const surat = getSuratBySlug(slug);
  if (!surat) return { title: "Surat Tidak Ditemukan — Toolinter" };

  return {
    title: `${surat.title} Online Gratis — Toolinter`,
    description: `Buat ${surat.title.toLowerCase()} online gratis. Isi data, preview, dan download langsung dalam format PDF.`,
  };
}

export default async function SuratDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const surat = getSuratBySlug(slug);

  if (!surat) {
    notFound();
  }

  return (
    <main className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/surat" className="flex items-center gap-1 text-sm text-ink-tertiary hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Surat
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-ink">{surat.title}</h1>
            <p className="text-ink-tertiary">{surat.description}</p>
          </div>
        </div>

        {/* Generator with AI enabled */}
        <SuratGenerator
          title={surat.title}
          description={surat.description}
          slug={surat.slug}
          fields={surat.fields}
          aiEnabled={true}
        />

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-ink mb-4">Tentang {surat.title}</h2>
          <div className="text-ink-secondary space-y-4">
            <p>
              {surat.title} adalah dokumen resmi yang dibutuhkan dalam berbagai keperluan.
              Dengan Toolinter, Anda dapat membuat {surat.title.toLowerCase()} secara online
              tanpa perlu install aplikasi apapun.
            </p>
            <p>
              Cukup isi data yang diperlukan, preview hasilnya, dan download dalam format PDF
              yang siap digunakan. Prosesnya cepat, mudah, dan 100% gratis.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-ink mt-8 mb-3">Tips Membuat {surat.title}</h3>
          <ul className="list-disc list-inside space-y-2 text-ink-secondary">
            <li>Pastikan semua data yang diisi benar dan sesuai</li>
            <li>Gunakan bahasa yang sopan dan formal</li>
            <li>Periksa kembali sebelum mendownload</li>
            <li>Simpan file PDF di tempat yang aman</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
