'use client';

import { useState, useRef, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  Upload,
  Download,
  FileText,
  Loader2,
} from 'lucide-react';
import { Document, Packer, Paragraph, TextRun } from 'docx';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function PdfKeWord() {
  const [file, setFile] = useState<{ file: File; name: string; size: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFile = useCallback((newFiles: FileList | File[]) => {
    const f = Array.from(newFiles)[0];
    if (!f || f.type !== 'application/pdf') {
      setError('Hanya file PDF yang diterima.');
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
      setError('Upload file PDF terlebih dahulu.');
      return;
    }
    setIsConverting(true);
    setError(null);

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url
      ).toString();

      const arrayBuffer = await file.file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const paragraphs: Paragraph[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const lines: string[] = [];
        let currentLine = '';
        let lastY: number | null = null;

        for (const item of textContent.items) {
          if (!('str' in item)) continue;
          const tx = item.transform;
          const y = tx[5];
          if (lastY !== null && Math.abs(y - lastY) > 2) {
            if (currentLine.trim()) lines.push(currentLine.trim());
            currentLine = '';
          }
          currentLine += item.str;
          lastY = y;
        }
        if (currentLine.trim()) lines.push(currentLine.trim());

        if (i > 1) {
          paragraphs.push(new Paragraph({ children: [] }));
        }

        // Page header
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({ text: `--- Halaman ${i} ---`, bold: true, size: 20 }),
            ],
            spacing: { after: 120 },
          })
        );

        for (const line of lines) {
          paragraphs.push(
            new Paragraph({
              children: [new TextRun({ text: line, size: 22 })],
              spacing: { after: 80 },
            })
          );
        }
      }

      if (paragraphs.length <= 2) {
        setError('PDF tidak memiliki teks yang bisa diekstrak. Mungkin PDF berupa gambar/scan.');
        setIsConverting(false);
        return;
      }

      const doc = new Document({
        sections: [{ children: paragraphs }],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name.replace(/\.pdf$/i, '') + '.docx';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Gagal mengonversi PDF ke Word. Pastikan file PDF valid.');
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
          <p className="text-ink-muted text-sm mt-1">Satu file PDF</p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
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
          <h2 className="font-semibold text-ink">Konversi ke Word</h2>
        </div>

        {!file ? (
          <div className="flex flex-col items-center justify-center h-64 text-ink-muted">
            <FileText className="w-10 h-10 mb-3 opacity-40" />
            <p>Upload file PDF terlebih dahulu</p>
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
                  Konversi ke Word
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
