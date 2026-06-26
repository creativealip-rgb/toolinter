import { Metadata } from "next";
import { suratTypes } from "@/data/surat";
import SuratWorkspace from "@/components/surat-workspace";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Generator Surat Online Gratis — Toolinter",
  description: "Buat surat resign, izin sekolah, lamaran kerja, pernyataan, kuasa, dan 15+ template surat lainnya. Download langsung dalam format PDF.",
};

export default function SuratPage() {
  const types = suratTypes.map((s) => ({
    slug: s.slug,
    title: s.title,
    description: s.description,
    fields: s.fields,
  }));

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Generator Surat Online</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Pilih template, isi data, preview, download PDF. Cepat dan gratis.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI Writer tersedia
          </div>
        </div>

        {/* Workspace */}
        <SuratWorkspace suratTypes={types} aiEnabled={true} />
      </div>
    </main>
  );
}
