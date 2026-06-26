'use client';

import AiInsightBox from './ai-insight-box';
import { ActionBar } from './action-bar';
import { useState, useCallback } from 'react';
import {
  Download,
  Eye,
  Loader2,
  Globe,
} from 'lucide-react';
import { jsPDF } from 'jspdf';

/* ---------- Types ---------- */

interface CoverLetterData {
  nama: string;
  posisi: string;
  perusahaan: string;
  pengalaman: string;
  keahlian: string;
  alasan: string;
}

type Lang = 'id' | 'en';

/* ---------- Defaults ---------- */

const defaultData: CoverLetterData = {
  nama: '',
  posisi: '',
  perusahaan: '',
  pengalaman: '',
  keahlian: '',
  alasan: '',
};

/* ---------- Input helpers ---------- */

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${props.className ?? ''}`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${props.className ?? ''}`}
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

function generatePdf(data: CoverLetterData, lang: Lang): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = 210;
  const margin = 25;
  const contentW = pageW - margin * 2;
  let y = margin;

  function checkPage(needed: number) {
    if (y + needed > 297 - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function writeText(text: string, options?: { bold?: boolean; italic?: boolean; size?: number; indent?: number }) {
    const { bold = false, italic = false, size = 11, indent = 0 } = options || {};
    doc.setFontSize(size);
    if (bold && italic) doc.setFont('helvetica', 'bolditalic');
    else if (bold) doc.setFont('helvetica', 'bold');
    else if (italic) doc.setFont('helvetica', 'italic');
    else doc.setFont('helvetica', 'normal');

    const lines = doc.splitTextToSize(text, contentW - indent);
    for (const line of lines) {
      checkPage(6);
      doc.text(line, margin + indent, y);
      y += 5;
    }
  }

  function writeBlankLine() {
    y += 3;
  }

  // Date
  const now = new Date();
  const dateStr = lang === 'id'
    ? `${now.getDate()} ${['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'][now.getMonth()]} ${now.getFullYear()}`
    : `${['January','February','March','April','May','June','July','August','September','October','November','December'][now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  const namaDisplay = data.nama || (lang === 'id' ? 'Nama Lengkap' : 'Full Name');
  const perusahaanDisplay = data.perusahaan || (lang === 'id' ? 'Nama Perusahaan' : 'Company Name');
  const posisiDisplay = data.posisi || (lang === 'id' ? 'Posisi' : 'Position');

  // Date
  writeText(dateStr, { size: 10 });
  writeBlankLine();

  // Opening
  if (lang === 'id') {
    writeText(`Kepada Yth.`, { size: 11 });
    writeText(`HRD / Recruiter ${perusahaanDisplay}`, { size: 11 });
    writeText(`Di tempat`, { size: 11 });
    writeBlankLine();
    writeText(`Dengan hormat,`, { size: 11 });
    writeBlankLine();
    writeText(
      `Saya yang bertanda tangan di bawah ini, ${namaDisplay}, bermaksud mengajukan lamaran untuk posisi ${posisiDisplay} di ${perusahaanDisplay}. Dengan pengalaman dan keahlian yang saya miliki, saya yakin dapat memberikan kontribusi yang berarti bagi perusahaan.`,
      { size: 11 }
    );
  } else {
    writeText(`Dear Hiring Manager,`, { size: 11 });
    writeBlankLine();
    writeText(
      `I am writing to express my interest in the ${posisiDisplay} position at ${perusahaanDisplay}. With my experience and skills, I am confident I can make a meaningful contribution to your organization.`,
      { size: 11 }
    );
  }
  writeBlankLine();

  // Pengalaman
  if (data.pengalaman) {
    if (lang === 'id') {
      writeText(`Saya memiliki pengalaman relevan dalam bidang ini:`, { size: 11 });
    } else {
      writeText(`I have relevant experience in this field:`, { size: 11 });
    }
    writeBlankLine();
    const bullets = data.pengalaman.split('\n').map(l => l.trim()).filter(Boolean);
    for (const bullet of bullets) {
      const prefix = bullet.startsWith('•') || bullet.startsWith('-') ? '' : '• ';
      writeText(prefix + bullet, { size: 11, indent: 5 });
    }
    writeBlankLine();
  }

  // Keahlian
  if (data.keahlian) {
    if (lang === 'id') {
      writeText(`Keahlian utama yang saya miliki antara lain:`, { size: 11 });
    } else {
      writeText(`My key competencies include:`, { size: 11 });
    }
    writeBlankLine();
    const skills = data.keahlian.split(',').map(s => s.trim()).filter(Boolean);
    writeText(skills.join('  •  '), { size: 11, indent: 5 });
    writeBlankLine();
  }

  // Alasan
  if (data.alasan) {
    if (lang === 'id') {
      writeText(`Alasan saya tertarik dengan posisi ini:`, { size: 11 });
    } else {
      writeText(`My motivation for applying:`, { size: 11 });
    }
    writeBlankLine();
    writeText(data.alasan, { size: 11 });
    writeBlankLine();
  }

  // Closing
  if (lang === 'id') {
    writeText(
      `Saya sangat berharap dapat diberikan kesempatan untuk wawancara guna membahas lebih lanjut mengenai kontribusi yang dapat saya berikan. Atas perhatian dan kesempatannya, saya ucapkan terima kasih.`,
      { size: 11 }
    );
    writeBlankLine();
    writeText(`Hormat saya,`, { size: 11 });
  } else {
    writeText(
      `I would welcome the opportunity to discuss how my experience and skills can benefit your team. Thank you for considering my application.`,
      { size: 11 }
    );
    writeBlankLine();
    writeText(`Sincerely,`, { size: 11 });
  }
  writeBlankLine();
  writeBlankLine();
  writeText(namaDisplay, { bold: true, size: 11 });

  doc.save(`Cover_Letter_${namaDisplay.replace(/\s+/g, '_') || 'Toolinter'}.pdf`);
}

/* ---------- Main component ---------- */

export default function CoverLetter() {
  const [data, setData] = useState<CoverLetterData>({ ...defaultData });
  const [lang, setLang] = useState<Lang>('id');
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const update = <K extends keyof CoverLetterData>(key: K, value: CoverLetterData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const handleDownload = () => {
    if (!data.nama.trim() || !data.posisi.trim() || !data.perusahaan.trim()) return;
    setIsGenerating(true);
    try {
      generatePdf(data, lang);
    } catch (err) {
      console.error('Cover letter PDF error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Preview text
  const namaDisplay = data.nama || (lang === 'id' ? 'Nama Lengkap' : 'Full Name');
  const perusahaanDisplay = data.perusahaan || (lang === 'id' ? 'Nama Perusahaan' : 'Company Name');
  const posisiDisplay = data.posisi || (lang === 'id' ? 'Posisi' : 'Position');

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16">
      {/* Action bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang((l) => (l === 'id' ? 'en' : 'id'))}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-ink transition hover:border-primary hover:text-primary"
          >
            <Globe size={16} />
            {lang === 'id' ? 'Indonesia' : 'English'}
          </button>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-ink transition hover:border-primary hover:text-primary"
          >
            <Eye size={16} />
            {showPreview ? 'Sembunyikan Preview' : 'Preview'}
          </button>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          disabled={!data.nama.trim() || !data.posisi.trim() || !data.perusahaan.trim()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          Download PDF
        </button>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="mb-8 rounded-xl border border-border bg-canvas p-8 shadow-sm" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <p className="text-xs text-ink-muted">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <div className="mt-4">
            {lang === 'id' ? (
              <>
                <p className="text-sm text-ink">Kepada Yth.</p>
                <p className="text-sm text-ink">HRD / Recruiter {perusahaanDisplay}</p>
                <p className="text-sm text-ink">Di tempat</p>
              </>
            ) : (
              <p className="text-sm text-ink">Dear Hiring Manager,</p>
            )}
          </div>
          <p className="mt-4 text-sm text-ink-tertiary leading-relaxed">
            {lang === 'id'
              ? `Saya yang bertanda tangan di bawah ini, ${namaDisplay}, bermaksud mengajukan lamaran untuk posisi ${posisiDisplay} di ${perusahaanDisplay}.`
              : `I am writing to express my interest in the ${posisiDisplay} position at ${perusahaanDisplay}.`}
          </p>
          {data.pengalaman && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-ink">{lang === 'id' ? 'Pengalaman:' : 'Experience:'}</p>
              <p className="text-sm text-ink-tertiary whitespace-pre-line mt-1">{data.pengalaman}</p>
            </div>
          )}
          {data.keahlian && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-ink">{lang === 'id' ? 'Keahlian:' : 'Skills:'}</p>
              <p className="text-sm text-ink-tertiary mt-1">{data.keahlian}</p>
            </div>
          )}
          {data.alasan && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-ink">{lang === 'id' ? 'Alasan Melamar:' : 'Motivation:'}</p>
              <p className="text-sm text-ink-tertiary mt-1">{data.alasan}</p>
            </div>
          )}
          <p className="mt-6 text-sm text-ink-tertiary">{lang === 'id' ? 'Hormat saya,' : 'Sincerely,'}</p>
          <p className="mt-8 text-sm font-bold text-ink">{namaDisplay}</p>
        </div>
      )}

      {/* Form */}
      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-surface px-5 py-4">
          <h2 className="text-base font-semibold text-ink mb-4">
            {lang === 'id' ? 'Data Diri' : 'Personal Info'}
          </h2>
          <div className="space-y-3">
            <div>
              <Label>{lang === 'id' ? 'Nama Lengkap' : 'Full Name'}</Label>
              <Input
                value={data.nama}
                onChange={(e) => update('nama', e.target.value)}
                placeholder={lang === 'id' ? 'Contoh: Ahmad Fauzi' : 'e.g. John Smith'}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label>{lang === 'id' ? 'Posisi yang Dilamar' : 'Position'}</Label>
                <Input
                  value={data.posisi}
                  onChange={(e) => update('posisi', e.target.value)}
                  placeholder={lang === 'id' ? 'Contoh: Marketing Manager' : 'e.g. Marketing Manager'}
                />
              </div>
              <div>
                <Label>{lang === 'id' ? 'Nama Perusahaan' : 'Company Name'}</Label>
                <Input
                  value={data.perusahaan}
                  onChange={(e) => update('perusahaan', e.target.value)}
                  placeholder={lang === 'id' ? 'Contoh: PT Maju Bersama' : 'e.g. Acme Corp'}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface px-5 py-4">
          <h2 className="text-base font-semibold text-ink mb-4">
            {lang === 'id' ? 'Konten Surat' : 'Letter Content'}
          </h2>
          <div className="space-y-3">
            <div>
              <Label>{lang === 'id' ? 'Pengalaman Relevan' : 'Relevant Experience'}</Label>
              <Textarea
                value={data.pengalaman}
                onChange={(e) => update('pengalaman', e.target.value)}
                rows={4}
                placeholder={lang === 'id'
                  ? 'Tulis pengalaman relevan (satu baris per poin)\n• 3 tahun bekerja di bidang digital marketing\n• Mengelola budget iklan Rp 500jt/tahun'
                  : 'Write relevant experience (one point per line)\n• 3 years in digital marketing\n• Managed ad budget of $30k/year'}
              />
            </div>
            <div>
              <Label>{lang === 'id' ? 'Keahlian Utama' : 'Key Skills'}</Label>
              <Input
                value={data.keahlian}
                onChange={(e) => update('keahlian', e.target.value)}
                placeholder={lang === 'id' ? 'Dipisah koma, contoh: SEO, Google Ads, Copywriting' : 'Comma-separated, e.g.: SEO, Google Ads, Copywriting'}
              />
            </div>
            <div>
              <Label>{lang === 'id' ? 'Alasan Melamar' : 'Why This Role'}</Label>
              <Textarea
                value={data.alasan}
                onChange={(e) => update('alasan', e.target.value)}
                rows={3}
                placeholder={lang === 'id'
                  ? 'Mengapa Anda tertarik dengan posisi dan perusahaan ini?'
                  : 'Why are you interested in this position and company?'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="mt-4">
        <AiInsightBox
          title="AI Cover Letter Coach"
          description="Minta AI review cover letter kamu, saran perbaikan bahasa, dan tips interview."
          placeholder="Contoh: cover letter ini udah menarik belum untuk recruiter?"
          buttonLabel="Review dengan AI"
          context={`Cover letter user:\nPosisi: ${data.posisi}\nPerusahaan: ${data.perusahaan}\nPengalaman: ${data.pengalaman}\nKeahlian: ${data.keahlian}\nAlasan: ${data.alasan}`}
          system="Kamu adalah career coach Indonesia. Review cover letter, saran perbaikan bahasa, dan tips melamar kerja."
        />
      </div>

      <ActionBar
        tool="cv-cover-letter"
        toolName="Generator Cover Letter"
        shareItems={[["Posisi", data.posisi || "-"], ["Perusahaan", data.perusahaan || "-"]]}
        resultElementId="cover-letter-preview"
        filename="cover-letter.pdf"
        show={!!data.nama && !!data.posisi}
      />
    </div>
  );
}
