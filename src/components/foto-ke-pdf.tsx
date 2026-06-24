'use client';

import { useState, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import {
  Upload,
  Download,
  Image as ImageIcon,
  X,
  ArrowUp,
  ArrowDown,
  Loader2,
  FileImage,
} from 'lucide-react';

interface ImageFile {
  id: string;
  file: File;
  name: string;
  size: string;
  preview: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function FotoKePdf() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const imgFiles: ImageFile[] = [];

    for (const file of Array.from(newFiles)) {
      if (validTypes.includes(file.type)) {
        imgFiles.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          size: formatBytes(file.size),
          preview: URL.createObjectURL(file),
        });
      }
    }

    if (imgFiles.length === 0) {
      setError('Hanya file JPG, PNG, dan WEBP yang diterima.');
      return;
    }

    setError(null);
    setImages((prev) => [...prev, ...imgFiles]);
  }, []);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((f) => f.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= images.length) return;
    const updated = [...images];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setImages(updated);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleConvert = async () => {
    if (images.length === 0) {
      setError('Upload minimal 1 gambar.');
      return;
    }
    setIsConverting(true);
    setError(null);

    try {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = 210;
      const pageHeight = 297;

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();

        const imgData = await readFileAsDataURL(images[i].file);
        const img = await loadImage(imgData);

        const imgW = img.width;
        const imgH = img.height;
        const ratio = Math.min(pageWidth / imgW, pageHeight / imgH);
        const w = imgW * ratio;
        const h = imgH * ratio;
        const x = (pageWidth - w) / 2;
        const y = (pageHeight - h) / 2;

        const format = images[i].file.type === 'image/png' ? 'PNG' : 'JPEG';
        pdf.addImage(imgData, format, x, y, w, h);
      }

      pdf.save('foto-ke-pdf.pdf');
    } catch (err) {
      setError('Gagal mengonversi gambar ke PDF.');
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Upload */}
      <div className="bg-canvas rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Upload Gambar</h2>
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
          <ImageIcon className="w-10 h-10 text-ink-muted mx-auto mb-3" />
          <p className="text-ink-secondary font-medium">
            Klik atau seret gambar ke sini
          </p>
          <p className="text-ink-muted text-sm mt-1">JPG, PNG, WEBP — bisa beberapa sekaligus</p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
          }}
          className="hidden"
        />

        {images.length > 0 && (
          <button
            onClick={handleReset}
            className="mt-4 text-sm text-ink-tertiary hover:text-ink transition-colors"
          >
            Hapus semua
          </button>
        )}
      </div>

      {/* Right: File list & convert */}
      <div className="bg-canvas rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileImage className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">
            Daftar Gambar ({images.length})
          </h2>
        </div>

        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-ink-muted">
            <ImageIcon className="w-10 h-10 mb-3 opacity-40" />
            <p>Upload gambar terlebih dahulu</p>
          </div>
        ) : (
          <div className="space-y-3">
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {images.map((img, i) => (
                <li
                  key={img.id}
                  className="flex items-center gap-3 bg-surface rounded-lg px-4 py-3"
                >
                  <span className="text-xs text-ink-muted font-mono w-6 text-center">
                    {i + 1}
                  </span>
                  <img
                    src={img.preview}
                    alt={img.name}
                    className="w-10 h-10 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink truncate">{img.name}</p>
                    <p className="text-xs text-ink-muted">{img.size}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveImage(i, 'up')}
                      disabled={i === 0}
                      className="p-1 text-ink-muted hover:text-ink disabled:opacity-30 transition-colors"
                      title="Pindah ke atas"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveImage(i, 'down')}
                      disabled={i === images.length - 1}
                      className="p-1 text-ink-muted hover:text-ink disabled:opacity-30 transition-colors"
                      title="Pindah ke bawah"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeImage(img.id)}
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
              onClick={handleConvert}
              disabled={isConverting || images.length === 0}
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
                  Download PDF
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
