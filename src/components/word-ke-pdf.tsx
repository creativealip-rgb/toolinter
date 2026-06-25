'use client';

import { useState, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import mammoth from 'mammoth';
import {
  Upload,
  Download,
  FileText,
  Loader2,
} from 'lucide-react';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function WordKePdf() {
  const [file, setFile] = useState<{ file: File; name: string; size: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFile = useCallback((newFiles: FileList | File[]) => {
    const f = Array.from(newFiles)[0];
    if (!f) return;
    const valid =
      f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      f.name.endsWith('.docx');
    if (!valid) {
      setError('Hanya file Word (.docx) yang diterima.');
      return;
    }
    setError(null);
    setFile({ file: f, name: f.name, size: formatBytes(f.size) });
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFile(e.dataTransfer.files);
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Upload file Word terlebih dahulu.');
      return;
    }
    setIsConverting(true);
    setError(null);

    try {
      const arrayBuffer = await file.file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      if (!text.trim()) {
        setError('Dokumen Word kosong atau tidak memiliki teks.');
        setIsConverting(false);
        return;
      }

      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageW = 210;
      const pageH = 297;
      const margin = 20;
      const contentW = pageW - margin * 2;
      let y = margin;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);

      const lines = text.split('\n');

      for (const line of lines) {
        if (!line.trim()) {
          y += 4;
          if (y > pageH - margin) {
            doc.addPage();
            y = margin;
          }
          continue;
        }

        const wrappedLines = doc.splitTextToSize(line, contentW);
        for (const wLine of wrappedLines) {
          if (y > pageH - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(wLine, margin, y);
          y += 5;
        }
      }

      doc.save(file.name.replace(/\.docx$/i, '') + '.pdf');
    } catch (err) {
      setError('Gagal mengonversi Word ke PDF. Pastikan file .docx valid.');
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Upload */}
      <div className="bg-canvas rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Upload Word</h2>
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
            Klik atau seret file Word ke sini
          </p>
          <p className="text-ink-muted text-sm mt-1">Satu file .docx</p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => {
            if (e.target.files) addFile(e.target.files);
          }}
          className="hidden"
        />

        {file && (
          <button
            onClick={handleReset}
            className="mt-4 text-sm text-ink-tertiary hover:text-ink transition-colors"
          >
            Hapus file
          </button>
        )}
      </div>

      {/* Right: File info & convert */}
      <div className="bg-canvas rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Konversi ke PDF</h2>
        </div>

        {!file ? (
          <div className="flex flex-col items-center justify-center h-64 text-ink-muted">
            <FileText className="w-10 h-10 mb-3 opacity-40" />
            <p>Upload file Word terlebih dahulu</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-surface rounded-lg px-4 py-3">
              <FileText className="w-4 h-4 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink truncate">{file.name}</p>
                <p className="text-xs text-ink-muted">{file.size}</p>
              </div>
            </div>

            {error && (
              <p className="text-sm text-error bg-error/10 px-4 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConverting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Mengonversi...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Konversi ke PDF
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
