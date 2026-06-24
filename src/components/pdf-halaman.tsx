'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, FileText, Loader2, Scissors, RotateCcw } from 'lucide-react';

export default function PdfHalaman() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageRange, setPageRange] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (f: File | undefined) => {
    if (!f || f.type !== 'application/pdf') {
      setError('Hanya file PDF yang diterima.');
      return;
    }
    setError(null);
    setFile(f);
    setFileName(f.name);
    setPageRange('');

    try {
      const arrayBuffer = await f.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdf.getPageCount());
    } catch {
      setError('Gagal membaca PDF. Pastikan file valid.');
      setFile(null);
      setFileName(null);
      setTotalPages(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  function parsePageRange(range: string, max: number): number[] {
    const pages: number[] = [];
    const seen = new Set<number>();
    const parts = range.split(',').map((s) => s.trim()).filter(Boolean);

    for (const part of parts) {
      const dashMatch = part.match(/^(\d+)\s*-\s*(\d+)$/);
      if (dashMatch) {
        let start = parseInt(dashMatch[1], 10);
        let end = parseInt(dashMatch[2], 10);
        if (start > end) [start, end] = [end, start];
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= max && !seen.has(i)) {
            pages.push(i);
            seen.add(i);
          }
        }
      } else {
        const num = parseInt(part, 10);
        if (!isNaN(num) && num >= 1 && num <= max && !seen.has(num)) {
          pages.push(num);
          seen.add(num);
        }
      }
    }

    return pages.sort((a, b) => a - b);
  }

  const parsedPages = pageRange ? parsePageRange(pageRange, totalPages) : [];

  const handleExtract = async () => {
    if (!file) return;
    if (parsedPages.length === 0) {
      setError('Masukkan nomor halaman yang valid.');
      return;
    }
    setIsExtracting(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(arrayBuffer);
      const newDoc = await PDFDocument.create();

      const indices = parsedPages.map((p) => p - 1);
      const copiedPages = await newDoc.copyPages(srcDoc, indices);
      copiedPages.forEach((page) => newDoc.addPage(page));

      const bytes = await newDoc.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName?.replace('.pdf', '-halaman.pdf') || 'halaman.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Gagal mengekstrak halaman. Pastikan file valid.');
      console.error(err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setFileName(null);
    setTotalPages(0);
    setPageRange('');
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Upload & page range */}
      <div className="bg-canvas rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Upload PDF</h2>
        </div>

        {!file ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <FileText className="w-10 h-10 text-ink-muted mx-auto mb-3" />
            <p className="text-ink-secondary font-medium">
              Klik atau seret file PDF ke sini
            </p>
            <p className="text-ink-muted text-sm mt-1">1 file PDF</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-surface rounded-lg p-4 flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-ink font-medium truncate">{fileName}</p>
                <p className="text-xs text-ink-muted">{totalPages} halaman</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Pilih halaman
              </label>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => {
                  setPageRange(e.target.value);
                  setError(null);
                }}
                placeholder="Contoh: 1-3,5,7-9"
                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <p className="text-xs text-ink-muted mt-2">
                Gunakan koma untuk memisahkan, strip untuk rentang. Total halaman: {totalPages}
              </p>
              {parsedPages.length > 0 && (
                <p className="text-xs text-success mt-1">
                  {parsedPages.length} halaman dipilih: {parsedPages.join(', ')}
                </p>
              )}
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm text-ink-tertiary hover:text-ink transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Upload ulang
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="hidden"
        />
      </div>

      {/* Right: Extract */}
      <div className="bg-canvas rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Scissors className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Ekstrak Halaman</h2>
        </div>

        {file ? (
          <div className="space-y-4">
            {parsedPages.length > 0 ? (
              <div className="bg-surface rounded-lg p-4 space-y-2">
                <p className="text-sm text-ink-tertiary">Halaman yang akan diekstrak:</p>
                <div className="flex flex-wrap gap-2">
                  {parsedPages.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-surface rounded-lg p-4 text-center">
                <p className="text-sm text-ink-muted">Masukkan nomor halaman di panel kiri</p>
              </div>
            )}

            {error && (
              <p className="text-sm text-error bg-error/10 px-4 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              onClick={handleExtract}
              disabled={isExtracting || parsedPages.length === 0}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExtracting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Mengekstrak...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Ekstrak & Download PDF
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-ink-muted">
            <Scissors className="w-10 h-10 mb-3 opacity-40" />
            <p>Upload PDF terlebih dahulu</p>
          </div>
        )}
      </div>
    </div>
  );
}
