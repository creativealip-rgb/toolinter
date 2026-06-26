'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Copy, Check, Sparkles } from 'lucide-react';
import AiInsightBox from '@/components/ai-insight-box';
import { ActionBar } from '@/components/action-bar';

function generateCV(nama: string, posisi: string, pengalaman: string, keahlian: string, pendidikan: string, email: string, phone: string): string {
  const lines: string[] = [];
  lines.push(`${nama.toUpperCase()}`);
  if (posisi) lines.push(posisi);
  const contact: string[] = [];
  if (email) contact.push(email);
  if (phone) contact.push(phone);
  if (contact.length) lines.push(contact.join(' | '));
  lines.push('');
  if (keahlian) {
    lines.push('KEAHLIAN');
    lines.push(keahlian.split(',').map((k) => '• ' + k.trim()).join('\n'));
    lines.push('');
  }
  if (pengalaman) {
    lines.push('PENGALAMAN KERJA');
    pengalaman.split('\n').filter(l => l.trim()).forEach(l => lines.push('• ' + l.trim()));
    lines.push('');
  }
  if (pendidikan) {
    lines.push('PENDIDIKAN');
    pendidikan.split('\n').filter(l => l.trim()).forEach(l => lines.push('• ' + l.trim()));
  }
  return lines.join('\n');
}

export default function CvGeneratorPage() {
  const [nama, setNama] = useState('Budi Santoso');
  const [posisi, setPosisi] = useState('Staff Administrasi');
  const [email, setEmail] = useState('budi@email.com');
  const [phone, setPhone] = useState('081234567890');
  const [pengalaman, setPengalaman] = useState('Staff Admin di PT Maju Jaya (2020-2023)\nMagang di Bank BRI (2019)');
  const [keahlian, setKeahlian] = useState('Microsoft Office, Data Entry, Administrasi, Komunikasi');
  const [pendidikan, setPendidikan] = useState('S1 Manajemen - Universitas Indonesia (2016-2020)');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cvText, setCvText] = useState('');

  const handleGenerate = () => {
    const text = generateCV(nama, posisi, pengalaman, keahlian, pendidikan, email, phone);
    setCvText(text);
    setGenerated(true);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cvText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aiTitle = "AI CV Advisor";
const aiDesc = "Minta AI analisis CV Anda dan beri saran perbaikan.";
const aiPlaceholder = "Contoh: CV saya kurang ATS-friendly, apa yang perlu diperbaiki?";
const aiContext = generated ? `Data CV user:\nNama: ${nama}\nPosisi: ${posisi}\nKeahlian: ${keahlian}\nPengalaman: ${pengalaman}\nPendidikan: ${pendidikan}` : '';

  return (
    <div className="min-h-screen bg-canvas">
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Link href="/cv" className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <h1 className="text-2xl font-bold text-ink mb-6">Generator CV</h1>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-primary font-medium">💡 Buat CV profesional dalam hitungan detik. Isi data di bawah, generate, lalu copy/download.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Nama Lengkap *</label>
            <input value={nama} onChange={e => setNama(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Nama Anda" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Posisi Target</label>
            <input value={posisi} onChange={e => setPosisi(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Contoh: Staff Admin" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="email@domain.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">No. HP</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="08xxxxxxxxxx" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-ink mb-1">Keahlian (pisahkan koma)</label>
          <input value={keahlian} onChange={e => setKeahlian(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Microsoft Office, Data Entry, ..." />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-ink mb-1">Pengalaman Kerja (satu per baris)</label>
          <textarea value={pengalaman} onChange={e => setPengalaman(e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none" placeholder="Posisi di Perusahaan (Tahun-Tahun)" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-ink mb-1">Pendidikan (satu per baris)</label>
          <textarea value={pendidikan} onChange={e => setPendidikan(e.target.value)} rows={2} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none" placeholder="S1 Jurusan - Universitas (Tahun-Tahun)" />
        </div>

        <button onClick={handleGenerate} className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5" /> Generate CV
        </button>

        {generated && (
          <div id="hasil-perhitungan" className="bg-canvas border border-border rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-ink">CV Anda</h2>
              <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 bg-surface hover:bg-primary/10 border border-border rounded-lg text-sm text-ink transition-colors">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Tersalin!' : 'Copy'}
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-ink-secondary bg-surface rounded-lg p-4 font-mono leading-relaxed">{cvText}</pre>
          </div>
        )}

        {generated && <ActionBar tool="cv-generator" toolName="Generator CV" shareItems={[["Posisi", posisi], ["Keahlian", keahlian]]} resultElementId="hasil-perhitungan" filename="cv" show={true} />}
        {generated && (
          <div className="mt-6">
            <AiInsightBox title={aiTitle} description={aiDesc} placeholder={aiPlaceholder} buttonLabel="Analisis CV dengan AI" context={aiContext} system="Anda adalah HRD profesional. Analisis CV dan beri saran perbaikan untuk ATS-friendly." />
          </div>
        )}
      </main>
    </div>
  );
}
