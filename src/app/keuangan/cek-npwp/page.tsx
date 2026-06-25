'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  FileCheck,
  FileText,
  Copy,
  Check,
  ChevronDown,
  Plus,
  Trash2,
} from 'lucide-react';

function formatRp(n: number): string {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}

// Province codes for NIK
const PROVINSI: Record<string, string> = {
  '11': 'Aceh', '12': 'Sumatera Utara', '13': 'Sumatera Barat',
  '14': 'Riau', '15': 'Jambi', '16': 'Sumatera Selatan',
  '17': 'Bengkulu', '18': 'Lampung', '19': 'Kep. Bangka Belitung',
  '21': 'Kep. Riau', '31': 'DKI Jakarta', '32': 'Jawa Barat',
  '33': 'Jawa Tengah', '34': 'DI Yogyakarta', '35': 'Jawa Timur',
  '36': 'Banten', '51': 'Bali', '52': 'Nusa Tenggara Barat',
  '53': 'Nusa Tenggara Timur', '61': 'Kalimantan Barat',
  '62': 'Kalimantan Tengah', '63': 'Kalimantan Selatan',
  '64': 'Kalimantan Timur', '65': 'Kalimantan Utara',
  '71': 'Sulawesi Utara', '72': 'Sulawesi Tengah',
  '73': 'Sulawesi Selatan', '74': 'Sulawesi Tenggara',
  '75': 'Gorontalo', '76': 'Sulawesi Barat',
  '81': 'Maluku', '82': 'Maluku Utara', '91': 'Papua Barat',
  '92': 'Papua', '93': 'Papua Selatan', '94': 'Papua Tengah',
  '95': 'Papua Pegunungan', '96': 'Papua Barat Daya',
};

type Tab = 'npwp' | 'nik' | 'faktur';

export default function CekNpwpPage() {
  const [activeTab, setActiveTab] = useState<Tab>('npwp');

  // NPWP state
  const [npwpInput, setNpwpInput] = useState('');
  const [npwpResult, setNpwpResult] = useState<{
    valid: boolean;
    formatted: string;
    kodeWajibPajak: string;
    nomorUrut: string;
    kodeKPP: string;
    tipeWajibPajak: string;
  } | null>(null);

  // NIK state
  const [nikInput, setNikInput] = useState('');
  const [nikResult, setNikResult] = useState<{
    valid: boolean;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    tanggalLahir: string;
    jenisKelamin: string;
    nomorUrut: string;
  } | null>(null);

  // Faktur state
  const [fNama, setFNama] = useState('');
  const [fAlamat, setFAlamat] = useState('');
  const [fNpwp, setFNpwp] = useState('');
  const [fItems, setFItems] = useState<{ nama: string; harga: string; qty: string }[]>([
    { nama: '', harga: '', qty: '1' },
  ]);
  const [fakturOutput, setFakturOutput] = useState('');
  const [copiedFaktur, setCopiedFaktur] = useState(false);

  function validateNpwp() {
    const raw = npwpInput.replace(/[^0-9]/g, '');
    if (raw.length !== 16) {
      setNpwpResult({ valid: false, formatted: npwpInput, kodeWajibPajak: '', nomorUrut: '', kodeKPP: '', tipeWajibPajak: '' });
      return;
    }

    const formatted = `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}.${raw.slice(8, 9)}-${raw.slice(9, 12)}.${raw.slice(12, 16)}`;
    const kodeWajibPajak = raw.slice(0, 2);
    const nomorUrut = raw.slice(2, 8);
    const kodeKPP = raw.slice(9, 13);

    let tipe = 'Badan';
    if (kodeWajibPajak.startsWith('0')) tipe = 'Pusat';
    else if (parseInt(kodeWajibPajak) >= 1 && parseInt(kodeWajibPajak) <= 9) tipe = 'Badan';
    else if (parseInt(kodeWajibPajak) >= 10 && parseInt(kodeWajibPajak) <= 19) tipe = 'OP - Pusat';
    else if (parseInt(kodeWajibPajak) >= 20 && parseInt(kodeWajibPajak) <= 29) tipe = 'OP - Daerah';

    setNpwpResult({ valid: true, formatted, kodeWajibPajak, nomorUrut, kodeKPP, tipeWajibPajak: tipe });
  }

  function validateNik() {
    const raw = nikInput.replace(/[^0-9]/g, '');
    if (raw.length !== 16) {
      setNikResult({ valid: false, provinsi: '', kabupaten: '', kecamatan: '', tanggalLahir: '', jenisKelamin: '', nomorUrut: '' });
      return;
    }

    const kodeProv = raw.slice(0, 2);
    const kodeKab = raw.slice(2, 4);
    const kodeKec = raw.slice(4, 6);
    const tglRaw = parseInt(raw.slice(6, 8));
    const bulan = raw.slice(8, 10);
    const tahun = raw.slice(10, 12);
    const nomorUrut = raw.slice(12, 16);

    const isFemale = tglRaw > 40;
    const tgl = isFemale ? tglRaw - 40 : tglRaw;
    const tglStr = String(tgl).padStart(2, '0');
    const gender = isFemale ? 'Perempuan' : 'Laki-laki';
    const provName = PROVINSI[kodeProv] || 'Tidak diketahui';

    setNikResult({
      valid: true,
      provinsi: `${kodeProv} — ${provName}`,
      kabupaten: kodeKab,
      kecamatan: kodeKec,
      tanggalLahir: `${tglStr}-${bulan}-${tahun}`,
      jenisKelamin: gender,
      nomorUrut,
    });
  }

  function addFakturItem() {
    setFItems([...fItems, { nama: '', harga: '', qty: '1' }]);
  }

  function removeFakturItem(idx: number) {
    setFItems(fItems.filter((_, i) => i !== idx));
  }

  function updateFakturItem(idx: number, field: string, value: string) {
    const updated = [...fItems];
    (updated[idx] as any)[field] = value;
    setFItems(updated);
  }

  function generateFaktur() {
    const items = fItems.filter((it) => it.nama && it.harga);
    if (items.length === 0) return;

    let subtotal = 0;
    let lines = '';
    items.forEach((it, i) => {
      const harga = parseInt(it.harga.replace(/\D/g, ''), 10) || 0;
      const qty = parseInt(it.qty) || 1;
      const total = harga * qty;
      subtotal += total;
      lines += `${i + 1}. ${it.nama}  x${qty}  ${formatRp(total)}\n`;
    });

    const ppn = subtotal * 0.11;
    const total = subtotal + ppn;

    const output = [
      '═══════════════════════════════════════',
      '         FAKTUR / INVOICE',
      '═══════════════════════════════════════',
      '',
      `Nama     : ${fNama || '- '}`,
      `Alamat   : ${fAlamat || '-'}`,
      `NPWP     : ${fNpwp || '-'}`,
      '',
      '───────────────────────────────────────',
      'Daftar Barang / Jasa:',
      '───────────────────────────────────────',
      lines,
      `Subtotal     : ${formatRp(subtotal)}`,
      `PPN 11%      : ${formatRp(ppn)}`,
      `───────────────────────────────────────`,
      `TOTAL        : ${formatRp(total)}`,
      '',
      `Tanggal  : ${new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}`,
      '',
      '═══════════════════════════════════════',
    ].join('\n');

    setFakturOutput(output);
  }

  function copyFaktur() {
    navigator.clipboard.writeText(fakturOutput);
    setCopiedFaktur(true);
    setTimeout(() => setCopiedFaktur(false), 2000);
  }

  const tabs: { key: Tab; label: string; icon: typeof FileCheck }[] = [
    { key: 'npwp', label: 'Cek NPWP', icon: FileCheck },
    { key: 'nik', label: 'Cek NIK', icon: FileCheck },
    { key: 'faktur', label: 'Generator Faktur', icon: FileText },
  ];

  return (
    <main className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/keuangan" className="hover:text-primary transition-colors">
            Keuangan
          </Link>
          <span>/</span>
          <span className="text-ink">Cek NPWP & NIK</span>
        </nav>

        {/* Back link */}
        <Link
          href="/keuangan"
          className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileCheck className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Cek NPWP & NIK
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Validasi format NPWP dan NIK, serta buat contoh faktur sederhana untuk kebutuhan administrasi.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-primary text-white'
                    : 'bg-surface border border-border text-ink hover:bg-surface/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {activeTab === 'npwp' && (
          <div className="space-y-6">
            <div className="bg-canvas border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">Validasi NPWP</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                    Nomor NPWP (16 digit)
                  </label>
                  <input
                    type="text"
                    value={npwpInput}
                    onChange={(e) => setNpwpInput(e.target.value)}
                    placeholder="XX.XXX.XXX.X-XXX.XXX"
                    maxLength={20}
                    className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  onClick={validateNpwp}
                  className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  Validasi NPWP
                </button>
              </div>
            </div>

            {npwpResult && (
              <div className={`rounded-xl p-6 ${npwpResult.valid ? 'bg-surface border border-border' : 'bg-error/10'}`}>
                {npwpResult.valid ? (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-success" />
                      </div>
                      <span className="font-semibold text-success">Format Valid</span>
                    </div>
                    <p className="text-sm text-ink-tertiary mb-4">
                      NPWP: <span className="font-mono text-ink font-medium">{npwpResult.formatted}</span>
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-ink-tertiary">Kode Wajib Pajak</div>
                      <div className="text-ink font-medium">{npwpResult.kodeWajibPajak} — {npwpResult.tipeWajibPajak}</div>
                      <div className="text-ink-tertiary">Nomor Urut</div>
                      <div className="text-ink font-medium">{npwpResult.nomorUrut}</div>
                      <div className="text-ink-tertiary">Kode KPP</div>
                      <div className="text-ink font-medium">{npwpResult.kodeKPP}</div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-error">Format Tidak Valid</span>
                    <span className="text-sm text-error/80">— NPWP harus 16 digit angka.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'nik' && (
          <div className="space-y-6">
            <div className="bg-canvas border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">Validasi NIK</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-ink-tertiary">
                    Nomor NIK (16 digit)
                  </label>
                  <input
                    type="text"
                    value={nikInput}
                    onChange={(e) => setNikInput(e.target.value.replace(/\D/g, '').slice(0, 16))}
                    placeholder="3201234567890001"
                    maxLength={16}
                    className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <p className="text-xs text-ink-muted mt-1">{nikInput.length}/16 digit</p>
                </div>
                <button
                  onClick={validateNik}
                  className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  Validasi NIK
                </button>
              </div>
            </div>

            {nikResult && (
              <div className={`rounded-xl p-6 ${nikResult.valid ? 'bg-surface border border-border' : 'bg-error/10'}`}>
                {nikResult.valid ? (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-success" />
                      </div>
                      <span className="font-semibold text-success">Format Valid</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-ink-tertiary">Provinsi</div>
                      <div className="text-ink font-medium">{nikResult.provinsi}</div>
                      <div className="text-ink-tertiary">Kode Kabupaten/Kota</div>
                      <div className="text-ink font-medium">{nikResult.kabupaten}</div>
                      <div className="text-ink-tertiary">Kode Kecamatan</div>
                      <div className="text-ink font-medium">{nikResult.kecamatan}</div>
                      <div className="text-ink-tertiary">Tanggal Lahir</div>
                      <div className="text-ink font-medium">{nikResult.tanggalLahir}</div>
                      <div className="text-ink-tertiary">Jenis Kelamin</div>
                      <div className="text-ink font-medium">{nikResult.jenisKelamin}</div>
                      <div className="text-ink-tertiary">Nomor Urut</div>
                      <div className="text-ink font-medium">{nikResult.nomorUrut}</div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-error">Format Tidak Valid</span>
                    <span className="text-sm text-error/80">— NIK harus 16 digit angka.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'faktur' && (
          <div className="space-y-6">
            <div className="bg-canvas border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-ink mb-4">Generator Faktur Sederhana</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-ink-tertiary">Nama / Perusahaan</label>
                    <input
                      type="text"
                      value={fNama}
                      onChange={(e) => setFNama(e.target.value)}
                      placeholder="PT Contoh Sejahtera"
                      className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-ink-tertiary">NPWP</label>
                    <input
                      type="text"
                      value={fNpwp}
                      onChange={(e) => setFNpwp(e.target.value)}
                      placeholder="XX.XXX.XXX.X-XXX.XXX"
                      className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-ink-tertiary">Alamat</label>
                  <input
                    type="text"
                    value={fAlamat}
                    onChange={(e) => setFAlamat(e.target.value)}
                    placeholder="Jl. Contoh No. 123, Jakarta"
                    className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Items */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-ink-tertiary">Daftar Barang / Jasa</label>
                  {fItems.map((item, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item.nama}
                        onChange={(e) => updateFakturItem(idx, 'nama', e.target.value)}
                        placeholder="Nama item"
                        className="flex-1 rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <input
                        type="text"
                        inputMode="numeric"
                        value={item.harga}
                        onChange={(e) => updateFakturItem(idx, 'harga', e.target.value.replace(/\D/g, ''))}
                        placeholder="Harga"
                        className="w-32 rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateFakturItem(idx, 'qty', e.target.value)}
                        min="1"
                        className="w-16 rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      {fItems.length > 1 && (
                        <button
                          onClick={() => removeFakturItem(idx)}
                          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addFakturItem}
                    className="flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah item
                  </button>
                </div>

                <button
                  onClick={generateFaktur}
                  className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Buat Faktur
                </button>
              </div>
            </div>

            {fakturOutput && (
              <div className="bg-surface rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-ink">Contoh Faktur</h3>
                  <button
                    onClick={copyFaktur}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {copiedFaktur ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedFaktur ? 'Tersalin!' : 'Salin'}
                  </button>
                </div>
                <pre className="bg-canvas rounded-lg p-4 text-sm text-ink font-mono overflow-x-auto whitespace-pre-wrap">
                  {fakturOutput}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Tentang Validasi NPWP & NIK
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              Tool ini membantu Anda memvalidasi format Nomor Pokok Wajib Pajak
              (NPWP) dan Nomor Induk Kependudukan (NIK) secara instan. Validasi
              bersifat format — memeriksa apakah nomor sesuai struktur yang benar,
              bukan memverifikasi ke database Ditjen Pajak atau Disdukcapil.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Struktur NPWP (16 digit)
            </h3>
            <p>
              NPWP terdiri dari: 2 digit kode wajib pajak, 6 digit nomor urut,
              1 digit check digit, 3 digit kode KPP, dan 3 digit status terdaftar.
              Format penulisan: XX.XXX.XXX.X-XXX.XXX.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Struktur NIK (16 digit)
            </h3>
            <p>
              NIK terdiri dari: 2 digit kode provinsi, 2 digit kabupaten/kota,
              2 digit kecamatan, 6 digit tanggal lahir (untuk perempuan ditambah 40),
              dan 4 digit nomor urut. NIK tercantum di KTP dan KK.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
