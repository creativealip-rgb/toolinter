'use client';

import { useState, useRef, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  Upload,
  Download,
  FileText,
  X,
  ArrowUp,
  ArrowDown,
  Loader2,
  Merge,
} from 'lucide-react';

interface PdfFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function PdfMerger() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const pdfFiles: PdfFile[] = [];
    for (const file of Array.from(newFiles)) {
      if (file.type === 'application/pdf') {
        pdfFiles.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          size: formatBytes(file.size),
        });
      }
    }
    if (pdfFiles.length === 0) {
      setError('Hanya file PDF yang diterima.');
      return;
    }
    setError(null);
    setFiles((prev) => [...prev, ...pdfFiles]);
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= files.length) return;
    const updated = [...files];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setFiles(updated);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Minimal 2 file PDF diperlukan untuk digabung.');
      return;
    }
    setIsMerging(true);
    setError(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of files) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'gabungan.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Gagal menggabungkan PDF. Pastikan semua file valid.');
      console.error(err);
    } finally {
      setIsMerging(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Upload */}
      <div className="bg-canvas rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Upload PDF</h2>
        </div>

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
          <p className="text-ink-muted text-sm mt-1">Bisa pilih beberapa file sekaligus</p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
          }}
          className="hidden"
        />

        {files.length > 0 && (
          <button
            onClick={handleReset}
            className="mt-4 text-sm text-ink-tertiary hover:text-ink transition-colors"
          >
            Hapus semua
          </button>
        )}
      </div>

      {/* Right: File list & merge */}
      <div className="bg-canvas rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Merge className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">
            Daftar File ({files.length})
          </h2>
        </div>

        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-ink-muted">
            <FileText className="w-10 h-10 mb-3 opacity-40" />
            <p>Upload file PDF terlebih dahulu</p>
          </div>
        ) : (
          <div className="space-y-3">
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {files.map((f, i) => (
                <li
                  key={f.id}
                  className="flex items-center gap-3 bg-surface rounded-lg px-4 py-3"
                >
                  <span className="text-xs text-ink-muted font-mono w-6 text-center">
                    {i + 1}
                  </span>
                  <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink truncate">{f.name}</p>
                    <p className="text-xs text-ink-muted">{f.size}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveFile(i, 'up')}
                      disabled={i === 0}
                      className="p-1 text-ink-muted hover:text-ink disabled:opacity-30 transition-colors"
                      title="Pindah ke atas"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveFile(i, 'down')}
                      disabled={i === files.length - 1}
                      className="p-1 text-ink-muted hover:text-ink disabled:opacity-30 transition-colors"
                      title="Pindah ke bawah"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFile(f.id)}
                      className="p-1 text-ink-muted hover:text-error transition-colors"
                      title="Hapus"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {error && (
              <p className="text-sm text-error bg-error/10 px-4 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              onClick={handleMerge}
              disabled={isMerging || files.length < 2}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isMerging ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menggabungkan...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Gabung & Download PDF
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
