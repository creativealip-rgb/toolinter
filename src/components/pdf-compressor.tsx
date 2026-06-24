'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, FileText, Loader2, Minimize2, RotateCcw } from 'lucide-react';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function PdfCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | undefined) => {
    if (!f || f.type !== 'application/pdf') {
      setError('Hanya file PDF yang diterima.');
      return;
    }
    setError(null);
    setFile(f);
    setFileName(f.name);
    setOriginalSize(f.size);
    setCompressedSize(null);
    if (compressedUrl) {
      URL.revokeObjectURL(compressedUrl);
      setCompressedUrl(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsCompressing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        updateMetadata: false,
      });

      // Strip metadata for basic compression
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');

      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      const blob = new Blob([compressedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setCompressedUrl(url);
      setCompressedSize(compressedBytes.length);
    } catch (err) {
      setError('Gagal mengompres PDF. Pastikan file valid.');
      console.error(err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedUrl) return;
    const link = document.createElement('a');
    link.href = compressedUrl;
    link.download = fileName?.replace('.pdf', '-compressed.pdf') || 'compressed.pdf';
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setFileName(null);
    setOriginalSize(0);
    setCompressedSize(null);
    if (compressedUrl) {
      URL.revokeObjectURL(compressedUrl);
      setCompressedUrl(null);
    }
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const reduction =
    compressedSize !== null
      ? Math.round((1 - compressedSize / originalSize) * 100)
      : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Upload */}
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
                <p className="text-sm text-ink font-medium truncate">
                  {fileName}
                </p>
                <p className="text-xs text-ink-muted">
                  Ukuran asli: {formatBytes(originalSize)}
                </p>
              </div>
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

      {/* Right: Result */}
      <div className="bg-canvas rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Minimize2 className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Hasil Kompres</h2>
        </div>

        {compressedSize !== null ? (
          <div className="space-y-4">
            <div className="bg-surface rounded-lg p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-ink-tertiary">Ukuran asli</span>
                <span className="text-ink font-medium">
                  {formatBytes(originalSize)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-tertiary">Setelah kompres</span>
                <span className="text-ink font-medium">
                  {formatBytes(compressedSize)}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-sm">
                <span className="text-ink-tertiary">Pengurangan</span>
                <span
                  className={`font-semibold ${
                    reduction !== null && reduction > 0
                      ? 'text-success'
                      : reduction !== null && reduction < 0
                      ? 'text-error'
                      : 'text-ink'
                  }`}
                >
                  {reduction !== null
                    ? reduction > 0
                      ? `-${reduction}%`
                      : `+${Math.abs(reduction)}%`
                    : '0%'}
                </span>
              </div>
            </div>

            {reduction !== null && reduction <= 0 && (
              <p className="text-xs text-ink-muted">
                File ini sudah terkompres atau tidak dapat diperkecil lebih
                lanjut.
              </p>
            )}

            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              Download PDF Terkompres
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-ink-muted">
            {isCompressing ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p>Mengompres PDF...</p>
              </div>
            ) : (
              <>
                <Minimize2 className="w-10 h-10 mb-3 opacity-40" />
                <p>Upload PDF lalu klik kompres</p>
              </>
            )}
          </div>
        )}

        {error && (
          <p className="mt-3 text-sm text-error bg-error/10 px-4 py-2 rounded-lg">
            {error}
          </p>
        )}

        {file && !isCompressing && compressedSize === null && (
          <button
            onClick={handleCompress}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-primary text-white font-medium py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Minimize2 className="w-4 h-4" />
            Kompres PDF
          </button>
        )}
      </div>
    </div>
  );
}
