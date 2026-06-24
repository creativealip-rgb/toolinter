"use client";

import { useState } from "react";
import SuratGenerator from "./surat-generator";
import { FileText, Search, ArrowLeft } from "lucide-react";

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
        <button onClick={() => setShowList(true)} className="flex items-center gap-1 text-sm text-primary mb-4 md:hidden">
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
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
      {/* Sidebar */}
      <div className="bg-canvas border border-border rounded-xl overflow-hidden sticky top-24 h-fit">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <input
              type="text"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Cari surat..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-border">
          {filtered.map((s) => (
            <button
              key={s.slug}
              onClick={() => { setSelectedSlug(s.slug); setShowList(false); }}
              className={`w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors ${selectedSlug === s.slug ? "bg-primary/10 border-l-2 border-primary" : ""}`}
            >
              <div className="font-medium text-sm text-ink">{s.title}</div>
              <div className="text-xs text-ink-muted mt-0.5 line-clamp-1">{s.description}</div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-ink-muted">Tidak ditemukan</div>
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
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-canvas border border-dashed border-border rounded-xl text-center p-8">
            <FileText className="w-16 h-16 text-ink-muted mb-4" />
            <p className="text-ink-tertiary font-medium">Pilih jenis surat dari daftar kiri</p>
            <p className="text-sm text-ink-muted mt-1">atau cari dengan kata kunci</p>
          </div>
        )}
      </div>
    </div>
  );
}
