'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Download, RotateCcw, ImageIcon, Shrink } from 'lucide-react';

const presetSizes = [
  { label: '200 KB', value: 200 },
  { label: '500 KB', value: 500 },
];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

export default function FotoKompressor() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [sourceSize, setSourceSize] = useState(0);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [targetKB, setTargetKB] = useState(200);
  const [customTarget, setCustomTarget] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const compressImage = useCallback((imgSrc: string, targetBytes: number) => {
    setIsCompressing(true);
    const img = new window.Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      // Binary search quality 0.9 → 0.1
      let lo = 0.1;
      let hi = 0.95;
      let bestBlob: Blob | null = null;
      let bestQuality = hi;

      const tryQuality = (q: number): Blob => {
        return new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', q);
        }) as unknown as Blob;
      };

      // Iterative approach since toBlob is async
      const iterate = async () => {
        // First try max quality
        let currentQ = 0.95;
        let blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, 'image/jpeg', currentQ);
        });

        if (blob && blob.size <= targetBytes) {
          bestBlob = blob;
          bestQuality = currentQ;
        } else {
          // Binary search
          for (let i = 0; i < 12; i++) {
            const mid = (lo + hi) / 2;
            blob = await new Promise<Blob | null>((resolve) => {
              canvas.toBlob(resolve, 'image/jpeg', mid);
            });
            if (!blob) break;
            if (blob.size <= targetBytes) {
              bestBlob = blob;
              bestQuality = mid;
              lo = mid;
            } else {
              hi = mid;
            }
          }
        }

        // Fallback: if nothing worked, use lowest quality
        if (!bestBlob) {
          bestBlob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob(resolve, 'image/jpeg', 0.1);
          });
          bestQuality = 0.1;
        }

        if (bestBlob) {
          const url = URL.createObjectURL(bestBlob);
          setCompressedImage(url);
          setCompressedSize(bestBlob.size);
        }
        setIsCompressing(false);
      };

      iterate();
    };
    img.src = imgSrc;
  }, []);

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    setSourceSize(file.size);
    setCompressedImage(null);
    setCompressedSize(0);

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setSourceImage(src);
      const effectiveTarget = customTarget ? parseInt(customTarget) * 1024 : targetKB * 1024;
      compressImage(src, effectiveTarget);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleRecompress = () => {
    if (!sourceImage) return;
    setCompressedImage(null);
    setCompressedSize(0);
    const effectiveTarget = customTarget ? parseInt(customTarget) * 1024 : targetKB * 1024;
    compressImage(sourceImage, effectiveTarget);
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    const link = document.createElement('a');
    link.download = 'foto-kompres.jpg';
    link.href = compressedImage;
    link.click();
  };

  const handleReset = () => {
    setSourceImage(null);
    setSourceSize(0);
    setCompressedImage(null);
    setCompressedSize(0);
    setCustomTarget('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const reduction = sourceSize > 0 && compressedSize > 0
    ? Math.round((1 - compressedSize / sourceSize) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Upload & Settings */}
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
              <img src={sourceImage} alt="Foto asal" className="w-full h-auto max-h-60 object-contain bg-surface" />
            </div>
            <div className="text-sm text-ink-tertiary">
              Ukuran asli: <strong className="text-ink">{formatBytes(sourceSize)}</strong>
            </div>

            {/* Target size selector */}
            <div>
              <label className="text-sm font-medium text-ink mb-2 block">Target ukuran:</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {presetSizes.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => { setTargetKB(preset.value); setCustomTarget(''); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      targetKB === preset.value && !customTarget
                        ? 'bg-primary text-white'
                        : 'bg-surface border border-border text-ink hover:border-primary/50'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={10}
                  max={5000}
                  placeholder="Custom (KB)"
                  value={customTarget}
                  onChange={(e) => setCustomTarget(e.target.value)}
                  className="w-36 px-3 py-2 border border-border rounded-lg text-sm bg-surface text-ink focus:outline-none focus:border-primary"
                />
                <span className="text-sm text-ink-muted">KB</span>
              </div>
            </div>

            <button
              onClick={handleRecompress}
              disabled={isCompressing}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Shrink className="w-4 h-4" />
              {isCompressing ? 'Mengompres...' : 'Kompres Ulang'}
            </button>

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

      {/* Right: Result & Download */}
      <div className="bg-canvas rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-ink">Hasil Kompres</h2>
        </div>

        {compressedImage ? (
          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden bg-surface p-4 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={compressedImage} alt="Hasil kompres" className="max-h-60 object-contain" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-surface rounded-lg p-3">
                <p className="text-xs text-ink-muted mb-1">Asli</p>
                <p className="font-semibold text-ink text-sm">{formatBytes(sourceSize)}</p>
              </div>
              <div className="bg-surface rounded-lg p-3">
                <p className="text-xs text-ink-muted mb-1">Kompres</p>
                <p className="font-semibold text-ink text-sm">{formatBytes(compressedSize)}</p>
              </div>
              <div className="bg-success/10 rounded-lg p-3">
                <p className="text-xs text-ink-muted mb-1">Reduksi</p>
                <p className="font-semibold text-success text-sm">{reduction}%</p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              Download JPG
            </button>
          </div>
        ) : isCompressing ? (
          <div className="flex flex-col items-center justify-center h-64 text-ink-muted">
            <Shrink className="w-10 h-10 mb-3 animate-pulse text-primary" />
            <p>Mengompres foto...</p>
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
