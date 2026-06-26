"use client";

import { useState } from "react";
import SuratGenerator from "./surat-generator";
import { FileText, Search, ArrowLeft, Sparkles } from "lucide-react";

interface SuratField {
  name: string;
  label: string;
  type: "text" | "textarea" | "date" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface SuratType {
  slug: string;
  title: string;
  description: string;
  fields: SuratField[];
}

interface SuratWorkspaceProps {
  suratTypes: SuratType[];
  initialSlug?: string;
  aiEnabled?: boolean;
}

export default function SuratWorkspace({ suratTypes, initialSlug, aiEnabled = false }: SuratWorkspaceProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [showList, setShowList] = useState(true);
  const [searchQ, setSearchQ] = useState("");

  const selected = suratTypes.find((s) => s.slug === selectedSlug);

  const filtered = searchQ
    ? suratTypes.filter((s) => s.title.toLowerCase().includes(searchQ.toLowerCase()) || s.description.toLowerCase().includes(searchQ.toLowerCase()))
    : suratTypes;

  if (!showList && selected) {
    return (
      <div className="max-w-5xl mx-auto">
        <button onClick={() => setShowList(true)} className="flex items-center gap-1.5 text-sm text-blue-600 mb-4 md:hidden hover:text-blue-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Pilih surat lain
        </button>
        <SuratGenerator
          title={selected.title}
          description={selected.description}
          slug={selected.slug}
          fields={selected.fields}
          aiEnabled={aiEnabled}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      {/* Sidebar */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden sticky top-24 h-fit shadow-sm">
        <div className="p-3 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Cari surat..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {filtered.map((s) => (
            <button
              key={s.slug}
              onClick={() => { setSelectedSlug(s.slug); setShowList(false); }}
              className={`w-full text-left px-4 py-3 border-b border-gray-50 transition-all ${
                selectedSlug === s.slug
                  ? "bg-blue-50 border-l-2 border-l-blue-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="font-medium text-sm text-gray-900">{s.title}</div>
              <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{s.description}</div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-gray-400">Tidak ditemukan</div>
          )}
        </div>
      </div>

      {/* Main area */}
      <div>
        {selected ? (
          <SuratGenerator
            title={selected.title}
            description={selected.description}
            slug={selected.slug}
            fields={selected.fields}
            aiEnabled={aiEnabled}
          />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-white border border-dashed border-gray-300 rounded-xl text-center p-8">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-gray-700 font-medium text-lg">Pilih jenis surat dari daftar kiri</p>
            <p className="text-sm text-gray-400 mt-1">atau cari dengan kata kunci</p>
            {aiEnabled && (
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                AI Writer tersedia
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
