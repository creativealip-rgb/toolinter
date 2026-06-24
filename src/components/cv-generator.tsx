"use client";

import { useState, useRef, useCallback } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Download,
  Eye,
} from "lucide-react";
import { jsPDF } from "jspdf";

/* ---------- Types ---------- */

interface Pendidikan {
  institusi: string;
  jurusan: string;
  tahun_mulai: string;
  tahun_selesai: string;
  ipk: string;
}

interface Pengalaman {
  perusahaan: string;
  posisi: string;
  tahun_mulai: string;
  tahun_selesai: string;
  deskripsi: string;
}

interface CvData {
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
  linkedin: string;
  ringkasan: string;
  pendidikan: Pendidikan[];
  pengalaman: Pengalaman[];
  keahlian: string;
}

/* ---------- Defaults ---------- */

const emptyPendidikan: Pendidikan = {
  institusi: "",
  jurusan: "",
  tahun_mulai: "",
  tahun_selesai: "",
  ipk: "",
};

const emptyPengalaman: Pengalaman = {
  perusahaan: "",
  posisi: "",
  tahun_mulai: "",
  tahun_selesai: "",
  deskripsi: "",
};

const defaultData: CvData = {
  nama: "",
  email: "",
  telepon: "",
  alamat: "",
  linkedin: "",
  ringkasan: "",
  pendidikan: [{ ...emptyPendidikan }],
  pengalaman: [{ ...emptyPengalaman }],
  keahlian: "",
};

/* ---------- Collapsible section ---------- */

function Section({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-base font-semibold text-ink">{title}</span>
        {open ? (
          <ChevronUp size={18} className="text-ink-muted" />
        ) : (
          <ChevronDown size={18} className="text-ink-muted" />
        )}
      </button>
      {open && <div className="border-t border-border px-5 py-4">{children}</div>}
    </div>
  );
}

/* ---------- Input helpers ---------- */

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${props.className ?? ""}`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${props.className ?? ""}`}
    />
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-xs font-medium text-ink-tertiary">
      {children}
    </label>
  );
}

/* ---------- PDF generation ---------- */

function generatePdf(data: CvData): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const margin = 20;
  const contentW = pageW - margin * 2;
  let y = margin;

  function checkPage(needed: number) {
    if (y + needed > 297 - margin) {
      doc.addPage();
      y = margin;
    }
  }

  // Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(data.nama || "Nama Lengkap", margin, y);
  y += 8;

  // Contact line
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const contactParts = [data.email, data.telepon, data.alamat, data.linkedin].filter(Boolean);
  if (contactParts.length) {
    doc.text(contactParts.join("  |  "), margin, y);
    y += 5;
  }
  y += 2;

  // Horizontal line
  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += 6;

  // Helper: section title
  function sectionTitle(title: string) {
    checkPage(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title.toUpperCase(), margin, y);
    y += 2;
    doc.setDrawColor(180);
    doc.line(margin, y, pageW - margin, y);
    y += 5;
  }

  // Helper: wrapped text
  function writeText(text: string, indent = 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, contentW - indent);
    for (const line of lines) {
      checkPage(5);
      doc.text(line, margin + indent, y);
      y += 4.5;
    }
  }

  // Ringkasan
  if (data.ringkasan) {
    sectionTitle("Ringkasan Profesional");
    writeText(data.ringkasan);
    y += 3;
  }

  // Pendidikan
  const filledEd = data.pendidikan.filter((p) => p.institusi || p.jurusan);
  if (filledEd.length) {
    sectionTitle("Pendidikan");
    for (const ed of filledEd) {
      checkPage(14);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(ed.institusi, margin, y);
      doc.setFont("helvetica", "normal");
      const period = [ed.tahun_mulai, ed.tahun_selesai].filter(Boolean).join(" - ");
      if (period) doc.text(period, pageW - margin, y, { align: "right" });
      y += 4.5;
      doc.setFontSize(10);
      const line2 = [ed.jurusan, ed.ipk ? `IPK: ${ed.ipk}` : ""]
        .filter(Boolean)
        .join(" — ");
      if (line2) {
        doc.text(line2, margin, y);
        y += 4.5;
      }
      y += 2;
    }
  }

  // Pengalaman
  const filledExp = data.pengalaman.filter((e) => e.perusahaan || e.posisi);
  if (filledExp.length) {
    sectionTitle("Pengalaman Kerja");
    for (const exp of filledExp) {
      checkPage(14);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(exp.posisi, margin, y);
      doc.setFont("helvetica", "normal");
      const period = [exp.tahun_mulai, exp.tahun_selesai].filter(Boolean).join(" - ");
      if (period) doc.text(period, pageW - margin, y, { align: "right" });
      y += 4.5;
      doc.setFont("helvetica", "italic");
      doc.text(exp.perusahaan, margin, y);
      doc.setFont("helvetica", "normal");
      y += 4.5;

      if (exp.deskripsi) {
        const bullets = exp.deskripsi
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);
        for (const bullet of bullets) {
          const prefix = bullet.startsWith("•") || bullet.startsWith("-") ? "" : "• ";
          writeText(prefix + bullet, 4);
        }
      }
      y += 2;
    }
  }

  // Keahlian
  if (data.keahlian) {
    sectionTitle("Keahlian");
    const skills = data.keahlian
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    writeText(skills.join("  •  "));
  }

  doc.save(data.nama ? `CV_${data.nama.replace(/\s+/g, "_")}.pdf` : "CV_ATS_Toolinter.pdf");
}

/* ---------- Main component ---------- */

export function CvGenerator() {
  const [data, setData] = useState<CvData>({ ...defaultData });
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    pribadi: true,
    ringkasan: true,
    pendidikan: true,
    pengalaman: true,
    keahlian: true,
  });
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback((key: string) => {
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  const update = <K extends keyof CvData>(key: K, value: CvData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  // Array item helpers
  const updateArrItem = <T extends object>(
    arr: T[],
    idx: number,
    field: keyof T,
    value: string
  ) => {
    const next = [...arr];
    next[idx] = { ...next[idx], [field]: value };
    return next;
  };

  const addPendidikan = () =>
    update("pendidikan", [...data.pendidikan, { ...emptyPendidikan }]);
  const removePendidikan = (idx: number) =>
    update(
      "pendidikan",
      data.pendidikan.filter((_, i) => i !== idx)
    );

  const addPengalaman = () =>
    update("pengalaman", [...data.pengalaman, { ...emptyPengalaman }]);
  const removePengalaman = (idx: number) =>
    update(
      "pengalaman",
      data.pengalaman.filter((_, i) => i !== idx)
    );

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16">
      {/* Action bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-ink transition hover:border-primary hover:text-primary"
          >
            <Eye size={16} />
            {showPreview ? "Sembunyikan Preview" : "Preview CV"}
          </button>
        </div>
        <button
          type="button"
          onClick={() => generatePdf(data)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>

      {/* Preview */}
      {showPreview && (
        <div
          ref={previewRef}
          className="mb-8 rounded-xl border border-border bg-canvas p-8 shadow-sm"
          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        >
          <h2 className="text-2xl font-bold text-ink">
            {data.nama || "Nama Lengkap"}
          </h2>
          <p className="mt-1 text-sm text-ink-tertiary">
            {[data.email, data.telepon, data.alamat, data.linkedin]
              .filter(Boolean)
              .join(" | ")}
          </p>
          <hr className="my-4 border-border" />

          {data.ringkasan && (
            <section className="mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                Ringkasan Profesional
              </h3>
              <hr className="my-1 border-border" />
              <p className="mt-1 text-sm leading-relaxed text-ink-tertiary">
                {data.ringkasan}
              </p>
            </section>
          )}

          {data.pendidikan.some((p) => p.institusi || p.jurusan) && (
            <section className="mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                Pendidikan
              </h3>
              <hr className="my-1 border-border" />
              {data.pendidikan
                .filter((p) => p.institusi || p.jurusan)
                .map((ed, i) => (
                  <div key={i} className="mt-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold text-ink">
                        {ed.institusi}
                      </span>
                      <span className="text-xs text-ink-muted">
                        {[ed.tahun_mulai, ed.tahun_selesai]
                          .filter(Boolean)
                          .join(" - ")}
                      </span>
                    </div>
                    <p className="text-sm text-ink-tertiary">
                      {[ed.jurusan, ed.ipk ? `IPK: ${ed.ipk}` : ""]
                        .filter(Boolean)
                        .join(" — ")}
                    </p>
                  </div>
                ))}
            </section>
          )}

          {data.pengalaman.some((e) => e.perusahaan || e.posisi) && (
            <section className="mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                Pengalaman Kerja
              </h3>
              <hr className="my-1 border-border" />
              {data.pengalaman
                .filter((e) => e.perusahaan || e.posisi)
                .map((exp, i) => (
                  <div key={i} className="mt-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold text-ink">
                        {exp.posisi}
                      </span>
                      <span className="text-xs text-ink-muted">
                        {[exp.tahun_mulai, exp.tahun_selesai]
                          .filter(Boolean)
                          .join(" - ")}
                      </span>
                    </div>
                    <p className="text-sm italic text-ink-tertiary">
                      {exp.perusahaan}
                    </p>
                    {exp.deskripsi && (
                      <ul className="mt-1 list-disc pl-4">
                        {exp.deskripsi
                          .split("\n")
                          .filter((l) => l.trim())
                          .map((line, j) => (
                            <li
                              key={j}
                              className="text-sm text-ink-tertiary"
                            >
                              {line.trim().replace(/^[•\-]\s*/, "")}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
            </section>
          )}

          {data.keahlian && (
            <section>
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                Keahlian
              </h3>
              <hr className="my-1 border-border" />
              <p className="mt-1 text-sm text-ink-tertiary">
                {data.keahlian
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            </section>
          )}
        </div>
      )}

      {/* Form sections */}
      <div className="space-y-4">
        {/* 1. Data Pribadi */}
        <Section
          title="1. Data Pribadi"
          open={openSections.pribadi}
          onToggle={() => toggle("pribadi")}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Nama Lengkap *</Label>
              <Input
                placeholder="John Doe"
                value={data.nama}
                onChange={(e) => update("nama", e.target.value)}
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                placeholder="john@email.com"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <div>
              <Label>Telepon *</Label>
              <Input
                placeholder="08123456789"
                value={data.telepon}
                onChange={(e) => update("telepon", e.target.value)}
              />
            </div>
            <div>
              <Label>LinkedIn (opsional)</Label>
              <Input
                placeholder="linkedin.com/in/johndoe"
                value={data.linkedin}
                onChange={(e) => update("linkedin", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Alamat</Label>
              <Input
                placeholder="Jakarta, Indonesia"
                value={data.alamat}
                onChange={(e) => update("alamat", e.target.value)}
              />
            </div>
          </div>
        </Section>

        {/* 2. Ringkasan */}
        <Section
          title="2. Ringkasan Profesional"
          open={openSections.ringkasan}
          onToggle={() => toggle("ringkasan")}
        >
          <Label>Gambaran singkat tentang profil dan tujuan karir Anda</Label>
          <Textarea
            rows={4}
            placeholder="Contoh: Software engineer dengan 3 tahun pengalaman di pengembangan web full-stack. Terampil menggunakan React, Node.js, dan PostgreSQL. Berpengalaman memimpin tim kecil dan menghasilkan produk yang digunakan oleh ribuan pengguna."
            value={data.ringkasan}
            onChange={(e) => update("ringkasan", e.target.value)}
          />
        </Section>

        {/* 3. Pendidikan */}
        <Section
          title="3. Pendidikan"
          open={openSections.pendidikan}
          onToggle={() => toggle("pendidikan")}
        >
          <div className="space-y-5">
            {data.pendidikan.map((ed, idx) => (
              <div key={idx} className="relative rounded-lg border border-border bg-canvas p-4">
                {data.pendidikan.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePendidikan(idx)}
                    className="absolute right-2 top-2 text-ink-muted hover:text-red-500"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label>Institusi *</Label>
                    <Input
                      placeholder="Universitas Indonesia"
                      value={ed.institusi}
                      onChange={(e) =>
                        update(
                          "pendidikan",
                          updateArrItem(data.pendidikan, idx, "institusi", e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Jurusan *</Label>
                    <Input
                      placeholder="Teknik Informatika"
                      value={ed.jurusan}
                      onChange={(e) =>
                        update(
                          "pendidikan",
                          updateArrItem(data.pendidikan, idx, "jurusan", e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Tahun Mulai</Label>
                    <Input
                      placeholder="2018"
                      value={ed.tahun_mulai}
                      onChange={(e) =>
                        update(
                          "pendidikan",
                          updateArrItem(data.pendidikan, idx, "tahun_mulai", e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Tahun Selesai</Label>
                    <Input
                      placeholder="2022"
                      value={ed.tahun_selesai}
                      onChange={(e) =>
                        update(
                          "pendidikan",
                          updateArrItem(data.pendidikan, idx, "tahun_selesai", e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>IPK (opsional)</Label>
                    <Input
                      placeholder="3.80"
                      value={ed.ipk}
                      onChange={(e) =>
                        update(
                          "pendidikan",
                          updateArrItem(data.pendidikan, idx, "ipk", e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addPendidikan}
              className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-4 py-2 text-sm text-ink-tertiary transition hover:border-primary hover:text-primary"
            >
              <Plus size={16} /> Tambah Pendidikan
            </button>
          </div>
        </Section>

        {/* 4. Pengalaman Kerja */}
        <Section
          title="4. Pengalaman Kerja"
          open={openSections.pengalaman}
          onToggle={() => toggle("pengalaman")}
        >
          <div className="space-y-5">
            {data.pengalaman.map((exp, idx) => (
              <div key={idx} className="relative rounded-lg border border-border bg-canvas p-4">
                {data.pengalaman.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePengalaman(idx)}
                    className="absolute right-2 top-2 text-ink-muted hover:text-red-500"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label>Posisi *</Label>
                    <Input
                      placeholder="Frontend Developer"
                      value={exp.posisi}
                      onChange={(e) =>
                        update(
                          "pengalaman",
                          updateArrItem(data.pengalaman, idx, "posisi", e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Perusahaan *</Label>
                    <Input
                      placeholder="PT Teknologi Maju"
                      value={exp.perusahaan}
                      onChange={(e) =>
                        update(
                          "pengalaman",
                          updateArrItem(data.pengalaman, idx, "perusahaan", e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Tahun Mulai</Label>
                    <Input
                      placeholder="2022"
                      value={exp.tahun_mulai}
                      onChange={(e) =>
                        update(
                          "pengalaman",
                          updateArrItem(data.pengalaman, idx, "tahun_mulai", e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Tahun Selesai</Label>
                    <Input
                      placeholder="Sekarang"
                      value={exp.tahun_selesai}
                      onChange={(e) =>
                        update(
                          "pengalaman",
                          updateArrItem(data.pengalaman, idx, "tahun_selesai", e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <Label>Deskripsi (satu bullet per baris)</Label>
                  <Textarea
                    rows={4}
                    placeholder={`Mengembangkan UI responsive dengan React\nMeningkatkan performa loading halaman sebesar 40%\nBerkolaborasi dengan tim backend untuk integrasi API`}
                    value={exp.deskripsi}
                    onChange={(e) =>
                      update(
                        "pengalaman",
                        updateArrItem(data.pengalaman, idx, "deskripsi", e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addPengalaman}
              className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-4 py-2 text-sm text-ink-tertiary transition hover:border-primary hover:text-primary"
            >
              <Plus size={16} /> Tambah Pengalaman
            </button>
          </div>
        </Section>

        {/* 5. Keahlian */}
        <Section
          title="5. Keahlian"
          open={openSections.keahlian}
          onToggle={() => toggle("keahlian")}
        >
          <Label>Pisahkan dengan koma</Label>
          <Textarea
            rows={3}
            placeholder="React, TypeScript, Node.js, PostgreSQL, Git, Docker, REST API"
            value={data.keahlian}
            onChange={(e) => update("keahlian", e.target.value)}
          />
        </Section>
      </div>

      {/* Bottom action bar (mobile friendly) */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setShowPreview((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-ink transition hover:border-primary hover:text-primary"
        >
          <Eye size={16} />
          {showPreview ? "Sembunyikan Preview" : "Preview CV"}
        </button>
        <button
          type="button"
          onClick={() => generatePdf(data)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>
    </div>
  );
}
