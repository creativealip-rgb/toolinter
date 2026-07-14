'use client';

import { useState, useRef, useCallback } from "react";
import { Upload, Download, Loader2, ImageOff } from "lucide-react";

const BG_COLORS = [
  { id: "merah", label: "Merah", value: "#D32F2F" },
  { id: "biru", label: "Biru", value: "#1E5CB8" },
  { id: "putih", label: "Putih", value: "#FFFFFF" },
  { id: "abu", label: "Abu-abu", value: "#E0E0E0" },
];

export default function GantiBackgroundFoto() {
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [cutoutUrl, setCutoutUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState(BG_COLORS[0].value);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Composite the transparent cutout over a solid background color.
  const composite = useCallback((cutout: string, color: string) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setResultUrl(canvas.toDataURL("image/png"));
    };
    img.src = cutout;
  }, []);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("File harus berupa gambar (JPG/PNG).");
      setStatus("error");
      return;
    }
    setSrcUrl(URL.createObjectURL(file));
    setResultUrl(null);
    setCutoutUrl(null);
    setStatus("processing");
    setErrorMsg("");
    try {
      // Dynamic import — model (~40MB) hanya dimuat saat tool dipakai.
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file);
      const cutout = URL.createObjectURL(blob);
      setCutoutUrl(cutout);
      composite(cutout, bgColor);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setErrorMsg("Gagal memproses gambar. Coba foto lain atau refresh halaman.");
      setStatus("error");
    }
  }

  function pickColor(color: string) {
    setBgColor(color);
    if (cutoutUrl) composite(cutoutUrl, color);
  }

  return (
    <div className="bg-canvas border border-border rounded-xl p-6 mb-8">
      {/* Upload zone */}
      {!srcUrl && (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-border rounded-xl py-12 flex flex-col items-center gap-3 text-ink-tertiary hover:border-primary hover:text-primary transition-colors"
        >
          <Upload className="w-8 h-8" />
          <span className="font-medium">Pilih atau jatuhkan foto di sini</span>
          <span className="text-xs text-ink-muted">JPG atau PNG · diproses 100% di browser</span>
        </button>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {srcUrl && (
        <div className="space-y-5">
          {/* Preview */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-ink-muted mb-2">Foto Asli</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={srcUrl} alt="Foto asli" className="w-full rounded-lg border border-border object-cover aspect-[3/4]" />
            </div>
            <div>
              <p className="text-xs font-medium text-ink-muted mb-2">Hasil</p>
              <div className="w-full rounded-lg border border-border aspect-[3/4] flex items-center justify-center bg-surface overflow-hidden">
                {status === "processing" && (
                  <div className="flex flex-col items-center gap-2 text-ink-tertiary text-sm px-3 text-center">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Memproses... (unduh model AI pertama kali bisa agak lama)</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex flex-col items-center gap-2 text-red-500 text-sm px-3 text-center">
                    <ImageOff className="w-6 h-6" />
                    <span>{errorMsg}</span>
                  </div>
                )}
                {resultUrl && status === "done" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resultUrl} alt="Hasil ganti background" className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          </div>

          {/* Color picker */}
          {(status === "done" || status === "processing") && (
            <div>
              <p className="text-sm font-medium text-ink mb-2">Warna Background</p>
              <div className="flex gap-2">
                {BG_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => pickColor(c.value)}
                    disabled={status !== "done"}
                    className={
                      "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors disabled:opacity-50 " +
                      (bgColor === c.value ? "border-primary text-primary" : "border-border text-ink-secondary hover:border-primary")
                    }
                  >
                    <span className="w-4 h-4 rounded-full border border-border" style={{ background: c.value }} />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2.5 rounded-lg border border-border text-ink-secondary text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              Ganti Foto
            </button>
            {resultUrl && status === "done" && (
              <a
                href={resultUrl}
                download="foto-background-baru.png"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PNG
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
