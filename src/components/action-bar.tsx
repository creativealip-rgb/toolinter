'use client';

import { Share2, Download, History, Trash2, MapPin, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  shareToWhatsApp,
  formatShareText,
  downloadResultPdf,
  saveHistory,
  getHistory,
  clearHistory,
  UMR_DATA,
  HistoryEntry,
} from '@/lib/utils-helpers';

// ─── Share Button ───────────────────────────────────────────
export function ShareButton({
  toolName,
  items,
  className = '',
}: {
  toolName: string;
  items: [string, string][];
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const text = formatShareText(toolName, items);

  function handleCopy() {
    const fullUrl = `${text}\n\n🔗 ${window.location.href}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={() => shareToWhatsApp(text)}
        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Share ke WA
      </button>
      <button
        onClick={handleCopy}
        className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:bg-canvas transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

// ─── Download PDF Button ───────────────────────────────────
export function DownloadPdfButton({
  elementId,
  filename,
  className = '',
}: {
  elementId: string;
  filename: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      await downloadResultPdf(elementId, filename);
    } catch {
      alert('Gagal download PDF. Coba lagi.');
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:bg-canvas transition-colors disabled:opacity-50 ${className}`}
    >
      <Download className="w-4 h-4" />
      {loading ? 'Generating...' : 'Download PDF'}
    </button>
  );
}

// ─── Riwayat Panel ─────────────────────────────────────────
export function RiwayatPanel({ tool }: { tool: string }) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setEntries(getHistory(tool));
  }, [tool]);

  function handleClear() {
    clearHistory(tool);
    setEntries([]);
  }

  if (entries.length === 0) return null;

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-ink-tertiary hover:text-ink transition-colors"
      >
        <History className="w-4 h-4" />
        Riwayat ({entries.length})
        <span className="text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="mt-2 space-y-2">
          {entries.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between rounded-lg border border-border bg-surface p-3 text-sm"
            >
              <div>
                <p className="text-ink font-medium">{e.label}</p>
                <p className="text-xs text-ink-muted">
                  {new Date(e.timestamp).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-xs text-error hover:underline"
          >
            <Trash2 className="w-3 h-3" /> Hapus riwayat
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Save History Hook (call after calculate) ──────────────
export function useSaveHistory(tool: string, label: string, data: Record<string, unknown>, shouldSave: boolean) {
  useEffect(() => {
    if (shouldSave && Object.keys(data).length > 0) {
      saveHistory(tool, label, data);
    }
  }, [shouldSave, tool, label, data]);
}

// ─── UMR Dropdown ──────────────────────────────────────────
export function UmrDropdown({
  onSelect,
  className = '',
}: {
  onSelect: (city: string, amount: number) => void;
  className?: string;
}) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const cities = Object.entries(UMR_DATA)
    .filter(([city]) => city.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink hover:border-primary transition-colors"
      >
        <MapPin className="w-4 h-4 text-primary" />
        Pilih UMR Kota
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-72 max-h-64 overflow-y-auto rounded-xl border border-border bg-canvas shadow-lg">
          <div className="sticky top-0 border-b border-border bg-canvas p-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kota..."
              className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
              autoFocus
            />
          </div>
          {cities.map(([city, amount]) => (
            <button
              key={city}
              onClick={() => {
                onSelect(city, amount);
                setOpen(false);
                setSearch('');
              }}
              className="flex w-full items-center justify-between px-4 py-2 text-sm text-ink hover:bg-primary/5 transition-colors"
            >
              <span>{city}</span>
              <span className="text-ink-tertiary font-mono">
                Rp {amount.toLocaleString('id-ID')}
              </span>
            </button>
          ))}
          {cities.length === 0 && (
            <p className="px-4 py-3 text-sm text-ink-muted">Kota tidak ditemukan</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Compare Mode Wrapper ──────────────────────────────────
export function CompareWrapper({
  title,
  children,
}: {
  title: string;
  children: (side: 'A' | 'B') => React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-ink text-center">
        🔀 {title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50/30 p-4">
          <p className="text-sm font-bold text-blue-700 mb-3 text-center">Opsi A</p>
          {children('A')}
        </div>
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/30 p-4">
          <p className="text-sm font-bold text-emerald-700 mb-3 text-center">Opsi B</p>
          {children('B')}
        </div>
      </div>
    </div>
  );
}

// ─── Action Bar (Share + Download + Riwayat combined) ──────
export function ActionBar({
  tool,
  toolName,
  shareItems,
  resultElementId,
  filename,
  show,
}: {
  tool: string;
  toolName: string;
  shareItems: [string, string][];
  resultElementId: string;
  filename: string;
  show: boolean;
}) {
  if (!show) return null;

  return (
    <div className="mt-6 space-y-3">
      <div className="flex gap-2">
        <ShareButton toolName={toolName} items={shareItems} className="flex-1" />
        <DownloadPdfButton elementId={resultElementId} filename={filename} />
      </div>
      <RiwayatPanel tool={tool} />
    </div>
  );
}
