"use client";

import { useState } from "react";
import { Download, Eye, FileText, Loader2, Sparkles } from "lucide-react";

interface SuratField {
  name: string;
  label: string;
  type: "text" | "textarea" | "date" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface SuratGeneratorProps {
  title: string;
  description: string;
  slug: string;
  fields: SuratField[];
  aiEnabled?: boolean;
}

// Content generators map
const contentGenerators: Record<string, (data: Record<string, string>) => string> = {
  resign: (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `${data.nama || "[Nama Lengkap]"}
${data.jabatan || "[Jabatan]"}

Kepada Yth.
HRD Manager
${data.perusahaan || "[Nama Perusahaan]"}

Dengan hormat,

Saya yang bertanda tangan di bawah ini:
Nama: ${data.nama || "[Nama Lengkap]"}
Jabatan: ${data.jabatan || "[Jabatan]"}
Tanggal Masuk: ${data.tanggal_masuk || "[Tanggal Masuk]"}

Dengan ini mengajukan pengunduran diri dari jabatan saya sebagai ${data.jabatan || "[Jabatan]"} di ${data.perusahaan || "[Nama Perusahaan]"} efektif per ${data.tanggal_resign || "[Tanggal Resign]"}.

${data.alasan ? `Alasan pengunduran diri ini adalah ${data.alasan}.` : "Alasan pengunduran diri ini adalah untuk kepentingan pengembangan karir saya selanjutnya."}

Saya mengucapkan terima kasih atas kesempatan dan pengalaman yang telah diberikan selama bekerja di perusahaan ini. Saya berharap ${data.perusahaan || "[Nama Perusahaan]"} tetap sukses dan berkembang di masa depan.

Demikian surat pengunduran diri ini saya buat dengan sebenar-benarnya dan tanpa ada paksaan dari pihak manapun.

Hormat saya,


${data.nama || "[Nama Lengkap]"}
${tanggalSurat}`;
  },
  "izin-sekolah": (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `Kepada Yth.
Bapak/Ibu Guru Wali Kelas ${data.kelas || "[Kelas]"}
${data.sekolah || "[Nama Sekolah]"}

Dengan hormat,

Saya yang bertanda tangan di bawah ini:
Nama: ${data.nama_orangtua || "[Nama Orang Tua]"}
Orang tua/wali dari: ${data.nama_siswa || "[Nama Siswa]"}
Kelas: ${data.kelas || "[Kelas]"}

Dengan ini memberitahukan bahwa anak saya tersebut di atas tidak dapat mengikuti kegiatan belajar mengajar pada:
Tanggal: ${data.tanggal || "[Tanggal]"}

Dikarenakan: ${data.alasan || "[Alasan Izin]"}

Demikian surat izin ini saya buat dengan sebenar-benarnya. Atas perhatian dan kebijaksanaan Bapak/Ibu Guru, saya ucapkan terima kasih.

Hormat saya,


${data.nama_orangtua || "[Nama Orang Tua]"}
${tanggalSurat}`;
  },
  "lamaran-kerja": (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `${data.nama || "[Nama Lengkap]"}
${data.alamat || "[Alamat]"}
Telp: ${data.telepon || "[Telepon]"}
Email: ${data.email || "[Email]"}

Kepada Yth.
HRD Manager
${data.perusahaan || "[Nama Perusahaan]"}

Dengan hormat,

Berdasarkan informasi yang saya peroleh mengenai lowongan pekerjaan di ${data.perusahaan || "[Nama Perusahaan]"}, saya yang bertanda tangan di bawah ini:

Nama: ${data.nama || "[Nama Lengkap]"}
Alamat: ${data.alamat || "[Alamat]"}
Telepon: ${data.telepon || "[Telepon]"}
Email: ${data.email || "[Email]"}
Pendidikan: ${data.pendidikan || "[Pendidikan]"}

Dengan ini mengajukan lamaran pekerjaan untuk posisi ${data.posisi || "[Posisi]"} di ${data.perusahaan || "[Nama Perusahaan]"}.

${data.pengalaman ? `Saya memiliki pengalaman kerja: ${data.pengalaman}.` : "Saya adalah lulusan baru yang bersemangat dan siap belajar."}

Sebagai bahan pertimbangan, saya lampirkan:
1. Daftar Riwayat Hidup (CV)
2. Fotokopi ijazah terakhir
3. Fotokopi KTP
4. Pas foto 4x6

Besar harapan saya untuk dapat diterima bekerja di ${data.perusahaan || "[Nama Perusahaan]"} dan berkontribusi secara positif. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.

Hormat saya,


${data.nama || "[Nama Lengkap]"}
${tanggalSurat}`;
  },
  pernyataan: (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT PERNYATAAN

Saya yang bertanda tangan di bawah ini:
Nama: ${data.nama || "[Nama Lengkap]"}
NIK: ${data.nik || "[NIK]"}
Alamat: ${data.alamat || "[Alamat]"}

Dengan ini menyatakan bahwa:

${data.isi_pernyataan || "[Isi Pernyataan]"}

Demikian surat pernyataan ini saya buat dengan sebenar-benarnya dalam keadaan sadar dan tanpa ada paksaan dari pihak manapun. Apabila pernyataan ini tidak benar, saya bersedia menanggung segala konsekuensi hukum yang berlaku.

${tanggalSurat}


${data.nama || "[Nama Lengkap]"}
Meterai Rp 10.000`;
  },
  kuasa: (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT KUASA

Yang bertanda tangan di bawah ini:
Nama: ${data.pemberi_kuasa || "[Nama Pemberi Kuasa]"}
NIK: ${data.nik_pemberi || "[NIK Pemberi Kuasa]"}
Alamat: ${data.alamat_pemberi || "[Alamat Pemberi Kuasa]"}

Dengan ini memberikan kuasa kepada:
Nama: ${data.penerima_kuasa || "[Nama Penerima Kuasa]"}
NIK: ${data.nik_penerima || "[NIK Penerima Kuasa]"}
Alamat: ${data.alamat_penerima || "[Alamat Penerima Kuasa]"}

Untuk ${data.isi_kuasa || "[Isi Kuasa]"} atas nama saya.

Demikian surat kuasa ini dibuat untuk dipergunakan sebagaimana mestinya.

${tanggalSurat}

Pemberi Kuasa,                    Penerima Kuasa,


${data.pemberi_kuasa || "[Nama Pemberi Kuasa]"}       ${data.penerima_kuasa || "[Nama Penerima Kuasa]"}
Meterai Rp 10.000`;
  },
};

export default function SuratGenerator({
  title,
  description,
  slug,
  fields,
  aiEnabled = false,
}: SuratGeneratorProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [showAiInput, setShowAiInput] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generator = contentGenerators[slug];
      if (generator) {
        const content = generator(formData);
        setPreview(content);
        setShowPreview(true);
      }
      setIsGenerating(false);
    }, 500);
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiGenerating(true);
    setShowPreview(true);

    // Build context from form data
    const context = Object.entries(formData)
      .filter(([, v]) => v.trim())
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    const fullPrompt = `Buatkan ${title} dengan data berikut:
${context ? context + "\n\n" : ""}
Instruksi tambahan: ${aiPrompt}

Tuliskan surat lengkap dengan format yang benar.`;

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      if (!response.ok) throw new Error("AI request failed");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let result = "";
      setPreview("");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const { content } = JSON.parse(line.slice(6));
              if (content) {
                result += content;
                setPreview(result);
              }
            } catch {}
          }
        }
      }
    } catch (error) {
      console.error("AI error:", error);
      setPreview("Gagal generate dengan AI. Silakan coba lagi atau gunakan template manual.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!preview) return;

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      
      const lines = doc.splitTextToSize(preview, 180);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(lines, 15, 20);
      
      doc.save(`${title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Gagal membuat PDF. Silakan coba lagi.");
    }
  };

  const isFormValid = fields
    .filter((f) => f.required)
    .every((f) => formData[f.name]?.trim());

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-canvas border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-ink text-sm">Isi Data Surat</h2>
              <p className="text-xs text-ink-muted">Lengkapi data untuk membuat surat</p>
            </div>
          </div>

          <div className="space-y-3">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                  {field.label}
                  {field.required && <span className="text-error ml-1">*</span>}
                </label>
                {field.type === "text" && (
                  <input
                    type="text"
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2.5 text-sm bg-surface border border-border rounded-lg text-ink placeholder:text-ink-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                )}
                {field.type === "textarea" && (
                  <textarea
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    rows={2}
                    className="w-full px-3 py-2.5 text-sm bg-surface border border-border rounded-lg text-ink placeholder:text-ink-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
                  />
                )}
                {field.type === "date" && (
                  <input
                    type="date"
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-surface border border-border rounded-lg text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                )}
                {field.type === "select" && (
                  <select
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-surface border border-border rounded-lg text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  >
                    <option value="">{field.placeholder || "Pilih..."}</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-5 space-y-2">
            <button
              onClick={handleGenerate}
              disabled={!isFormValid || isGenerating}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isGenerating ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Membuat Surat...</>
              ) : (
                <><Eye className="w-4 h-4" /> Preview dari Template</>
              )}
            </button>

            {aiEnabled && (
              <div>
                <button
                  onClick={() => setShowAiInput(!showAiInput)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-purple-500 to-primary text-white font-semibold rounded-lg transition-colors text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Buat dengan AI
                </button>

                {showAiInput && (
                  <div className="mt-3 space-y-2">
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Contoh: Buatkan surat resign yang sopan untuk pindah ke perusahaan lain..."
                      rows={3}
                      className="w-full px-3 py-2.5 text-sm bg-surface border border-border rounded-lg text-ink placeholder:text-ink-muted focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 resize-none"
                    />
                    <button
                      onClick={handleAiGenerate}
                      disabled={isAiGenerating || !aiPrompt.trim()}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-sm"
                    >
                      {isAiGenerating ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> AI sedang menulis...</>
                      ) : (
                        <><Sparkles className="w-4 h-4" /> Generate dengan AI</>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-canvas border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="font-semibold text-ink text-sm">Preview Surat</h2>
                <p className="text-xs text-ink-muted">Hasil surat akan muncul di sini</p>
              </div>
            </div>
            {preview && (
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1.5 bg-success hover:bg-success/90 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                PDF
              </button>
            )}
          </div>

          {showPreview && preview ? (
            <div className="bg-white border border-border rounded-lg p-5 min-h-[400px] max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm text-ink leading-relaxed">
                {preview}
              </pre>
            </div>
          ) : (
            <div className="bg-surface border border-dashed border-border rounded-lg p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
              <FileText className="w-14 h-14 text-ink-muted mb-3" />
              <p className="text-ink-tertiary text-sm">
                Isi form lalu klik &quot;Preview dari Template&quot; atau &quot;Buat dengan AI&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
