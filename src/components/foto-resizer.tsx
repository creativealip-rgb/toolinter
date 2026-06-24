'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Download, RotateCcw, ImageIcon } from 'lucide-react';

interface FotoResizerProps {
  targetWidth: number;
  targetHeight: number;
  title: string;
  description: string;
}

export default function FotoResizer({ targetWidth, targetHeight, title, description }: FotoResizerProps) {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setSourceImage(src);

      const img = new window.Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Center-crop to target aspect ratio, then resize
        const srcAspect = img.width / img.height;
        const tgtAspect = targetWidth / targetHeight;

        let sx = 0, sy = 0, sw = img.width, sh = img.height;
        if (srcAspect > tgtAspect) {
          // Source wider — crop sides
          sw = img.height * tgtAspect;
          sx = (img.width - sw) / 2;
        } else {
          // Source taller — crop top/bottom
          sh = img.width / tgtAspect;
          sy = (img.height - sh) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
        setPreviewImage(canvas.toDataURL('image/jpeg', 0.92));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }, [targetWidth, targetHeight]);

  const handleFile = (file: File | undefined) => {
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDownload = () => {
    if (!previewImage) return;
    const link = document.createElement('a');
    link.download = `foto-${targetWidth}x${targetHeight}.jpg`;
    link.href = previewImage;
    link.click();
  };

  const handleReset = () => {
    setSourceImage(null);
    setPreviewImage(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Upload */}
      <div className="bg-canvas rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Upload Foto</h2>
        </div>

        {!sourceImage ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}
          >
            <ImageIcon className="w-10 h-10 text-ink-muted mx-auto mb-3" />
            <p className="text-ink-secondary font-medium">Klik atau seret foto ke sini</p>
            <p className="text-ink-muted text-sm mt-1">Format: JPG, PNG, WEBP</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sourceImage} alt="Foto asal" className="w-full h-auto max-h-80 object-contain bg-surface" />
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
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="hidden"
        />
      </div>

      {/* Right: Preview & Download */}
      <div className="bg-canvas rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Preview & Download</h2>
        </div>

        {previewImage ? (
          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden bg-surface p-4 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewImage} alt="Preview hasil" style={{ width: targetWidth / 2, height: targetHeight / 2 }} className="object-contain shadow-sm" />
            </div>
            <div className="text-sm text-ink-tertiary text-center">
              Ukuran: {targetWidth} × {targetHeight} px (300 DPI)
            </div>
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              Download JPG
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-ink-muted">
            <ImageIcon className="w-10 h-10 mb-3 opacity-40" />
            <p>Upload foto terlebih dahulu</p>
          </div>
        )}
      </div>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
