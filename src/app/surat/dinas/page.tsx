'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Copy, Check, Sparkles } from 'lucide-react';
import AiInsightBox from '@/components/ai-insight-box';
import { ActionBar } from '@/components/action-bar';

function generateSuratDinas(kop: string, nomor: string, tanggal: string, perihal: string, penerima: string, isi: string, namaPenandaTangan: string, jabatanPenandaTangan: string): string {
  const lines: string[] = [];
  lines.push(kop.toUpperCase());
  lines.push(`Nomor: ${nomor}`);
  lines.push(`Lampiran: -`);
  lines.push(`Perihal: ${perihal}`);
  lines.push('');
  lines.push(`Sukabumi, ${tanggal}`);
  lines.push('');
  lines.push(`Kepada Yth.`);
  lines.push(penerima);
  lines.push('');
  lines.push('Dengan hormat,');
  lines.push('');
  lines.push(isi);
  lines.push('');
  lines.push('Demikian surat ini dibuat untuk dapat dipergunakan sebagaimana mestinya.');
  lines.push('');
  lines.push('');
  lines.push(`${namaPenandaTangan}`);
  lines.push(jabatanPenandaTangan);
  return lines.join('\n');
}

export default function SuratDinasPage() {
  const [kop, setKop] = useState('PEMERINTAH KOTA SUKABUMI\nDINAS PENDIDIKAN');
  const [nomor, setNomor] = useState('005/DP/VI/2025');
  const [tanggal, setTanggal] = useState('25 Juni 2025');
  const [perihal, setPerihal] = useState('Undangan Rapat Koordinasi');
  const [penerima, setPenerima] = useState('Kepala SDN 1 Sukabumi');
  const [isi, setIsi] = useState('Bersama surat ini kami mengundang Bapak/Ibu untuk hadir dalam rapat koordinasi yang akan dilaksanakan pada:\n\nHari/Tanggal: Senin, 30 Juni 2025\nWaktu: 09.00 - 12.00 WIB\nTempat: Aula Dinas Pendidikan\n\nAcara: Koordinasi Kurikulum Semester Genap 2025\n\nMengingat pentingnya acara tersebut, kehadiran Bapak/Ibu sangat kami harapkan.');
  const [penandaTangan, setPenandaTangan] = useState('Dr. H. Ahmad, M.Pd.');
  const [jabatan, setJabatan] = useState('Kepala Dinas Pendidikan');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [suratText, setSuratText] = useState('');

  const handleGenerate = () => {
    setSuratText(generateSuratDinas(kop, nomor, tanggal, perihal, penerima, isi, penandaTangan, jabatan));
    setGenerated(true);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(suratText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aiTitle = "AI Surat Dinas";
const aiDesc = "Minta AI periksa dan perbaiki surat dinas Anda.";
const aiPlaceholder = "Contoh: apakah format surat dinas ini sudah benar?";
const aiContext = generated ? `Surat Dinas:\nPerihal: ${perihal}\nPenerima: ${penerima}\nIsi: ${isi}` : '';

  return (
    <div className="min-h-screen bg-canvas">
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Link href="/surat" className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <h1 className="text-2xl font-bold text-ink mb-6">Generator Surat Dinas</h1>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-primary font-medium">🏛️ Buat surat dinas resmi untuk instansi pemerintah dan organisasi.</p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Kop Surat</label>
            <textarea value={kop} onChange={e => setKop(e.target.value)} rows={2} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Nomor Surat</label>
              <input value={nomor} onChange={e => setNomor(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Tanggal</label>
              <input value={tanggal} onChange={e => setTanggal(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Perihal</label>
            <input value={perihal} onChange={e => setPerihal(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Kepada Yth.</label>
            <input value={penerima} onChange={e => setPenerima(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Isi Surat</label>
            <textarea value={isi} onChange={e => setIsi(e.target.value)} rows={6} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Nama Penanda Tangan</label>
              <input value={penandaTangan} onChange={e => setPenandaTangan(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Jabatan</label>
              <input value={jabatan} onChange={e => setJabatan(e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
          </div>
        </div>

        <button onClick={handleGenerate} className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5" /> Generate Surat Dinas
        </button>

        {generated && (
          <div id="hasil-perhitungan" className="bg-canvas border border-border rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-ink">Hasil Surat Dinas</h2>
              <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 bg-surface hover:bg-primary/10 border border-border rounded-lg text-sm text-ink transition-colors">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Tersalin!' : 'Copy'}
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-ink-secondary bg-surface rounded-lg p-4 font-mono leading-relaxed">{suratText}</pre>
          </div>
        )}

        {generated && <ActionBar tool="surat-dinas" toolName="Surat Dinas" shareItems={[["Perihal", perihal], ["Penerima", penerima]]} resultElementId="hasil-perhitungan" filename="surat-dinas" show={true} />}
        {generated && (
          <div className="mt-6">
            <AiInsightBox title={aiTitle} description={aiDesc} placeholder={aiPlaceholder} buttonLabel="Analisis Surat Dinas" context={aiContext} system="Anda adalah ahli administrasi pemerintahan. Periksa format dan bahasa surat dinas." />
          </div>
        )}
      </main>
    </div>
  );
}
