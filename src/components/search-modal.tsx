'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: string;
}

const searchIndex: SearchItem[] = [
  // Surat (22)
  { title: 'Surat Resign', description: 'Generator surat pengunduran diri PDF', href: '/surat/resign', category: 'Surat' },
  { title: 'Surat Izin Sekolah', description: 'Contoh surat izin tidak masuk sekolah', href: '/surat/izin-sekolah', category: 'Surat' },
  { title: 'Surat Lamaran Kerja', description: 'Template surat lamaran kerja profesional', href: '/surat/lamaran-kerja', category: 'Surat' },
  { title: 'Surat Pernyataan', description: 'Buat surat pernyataan berbagai keperluan', href: '/surat/pernyataan', category: 'Surat' },
  { title: 'Surat Kuasa', description: 'Generator surat kuasa untuk keperluan hukum', href: '/surat/kuasa', category: 'Surat' },
  { title: 'Surat Undangan', description: 'Buat surat undangan resmi untuk acara', href: '/surat/undangan', category: 'Surat' },
  { title: 'Surat Keterangan', description: 'Generator surat keterangan domisili, kerja, dll', href: '/surat/keterangan', category: 'Surat' },
  { title: 'Surat Rekomendasi', description: 'Template surat rekomendasi kerja dan beasiswa', href: '/surat/rekomendasi', category: 'Surat' },
  { title: 'Surat Tugas', description: 'Buat surat tugas dinas dan penugasan', href: '/surat/tugas', category: 'Surat' },
  { title: 'Surat Peringatan', description: 'Template surat peringatan karyawan', href: '/surat/peringatan', category: 'Surat' },
  { title: 'Surat Perintah', description: 'Generator surat perintah kerja dan tugas', href: '/surat/perintah', category: 'Surat' },
  { title: 'Surat Pengalaman Kerja', description: 'Template surat pengalaman kerja (experience letter)', href: '/surat/pengalaman-kerja', category: 'Surat' },
  { title: 'Surat Tanda Terima', description: 'Buat surat tanda terima dokumen dan barang', href: '/surat/tanda-terima', category: 'Surat' },
  { title: 'Surat Penawaran', description: 'Generator surat penawaran produk dan jasa', href: '/surat/penawaran', category: 'Surat' },
  { title: 'Surat Kontrak', description: 'Template surat kontrak kerja dan perjanjian', href: '/surat/kontrak', category: 'Surat' },
  { title: 'Surat Dinas', description: 'Buat surat dinas resmi untuk instansi', href: '/surat/dinas', category: 'Surat' },
  { title: 'Surat Pindah Sekolah', description: 'Template surat pindah sekolah', href: '/surat/pindah-sekolah', category: 'Surat' },
  { title: 'Surat Beasiswa', description: 'Generator surat permohonan beasiswa', href: '/surat/beasiswa', category: 'Surat' },
  { title: 'Surat Pembatalan', description: 'Buat surat pembatalan kontrak dan pesanan', href: '/surat/pembatalan', category: 'Surat' },
  { title: 'Surat Tagihan', description: 'Generator surat tagihan pembayaran', href: '/surat/tagihan', category: 'Surat' },
  { title: 'Surat Kesanggupan', description: 'Template surat kesanggupan dan pernyataan', href: '/surat/kesanggupan', category: 'Surat' },
  { title: 'Surat Permohonan', description: 'Buat surat permohonan berbagai keperluan', href: '/surat/permohonan', category: 'Surat' },

  // Foto (7)
  { title: 'Resize Foto 3x4', description: 'Ubah ukuran pas foto 3x4 untuk dokumen', href: '/foto/resize-3x4', category: 'Foto' },
  { title: 'Resize Foto 4x6', description: 'Ubah ukuran foto untuk SKCK, visa, CPNS', href: '/foto/resize-4x6', category: 'Foto' },
  { title: 'Resize Foto 2x3', description: 'Resize foto ukuran 2x3 online', href: '/foto/resize-2x3', category: 'Foto' },
  { title: 'Kompres Foto', description: 'Kecilkan ukuran foto tanpa hilang kualitas', href: '/foto/kompres', category: 'Foto' },
  { title: 'Foto KTP', description: 'Panduan foto KTP sesuai standar Dukcapil', href: '/foto/ktp', category: 'Foto' },
  { title: 'Foto CPNS', description: 'Ukuran dan format foto untuk pendaftaran CPNS', href: '/foto/cpns', category: 'Foto' },
  { title: 'Foto SNBP', description: 'Syarat foto untuk pendaftaran SNBP/SNBT', href: '/foto/snbp', category: 'Foto' },

  // Gaji (6)
  { title: 'Kalkulator Gaji Bersih', description: 'Hitung take home pay setelah pajak dan BPJS', href: '/gaji/bersih', category: 'Gaji' },
  { title: 'Kalkulator PPh21', description: 'Hitung pajak penghasilan karyawan', href: '/gaji/pph21', category: 'Gaji' },
  { title: 'Kalkulator THR', description: 'Hitung tunjangan hari raya karyawan', href: '/gaji/thr', category: 'Gaji' },
  { title: 'Kalkulator BPJS', description: 'Hitung iuran BPJS Kesehatan dan Ketenagakerjaan', href: '/gaji/bpjs', category: 'Gaji' },
  { title: 'Kalkulator Lembur', description: 'Hitung upah lembur sesuai peraturan', href: '/gaji/lembur', category: 'Gaji' },
  { title: 'Kalkulator Prorata', description: 'Hitung gaji prorata untuk hari kerja', href: '/gaji/prorata', category: 'Gaji' },

  // PDF (6)
  { title: 'Gabung PDF', description: 'Gabungkan beberapa file PDF jadi satu', href: '/pdf/gabung', category: 'PDF' },
  { title: 'Kompres PDF', description: 'Kecilkan ukuran PDF tanpa blur', href: '/pdf/kompres', category: 'PDF' },
  { title: 'Foto ke PDF', description: 'Ubah foto/jpg menjadi file PDF', href: '/pdf/foto-ke-pdf', category: 'PDF' },
  { title: 'PDF Halaman', description: 'Pisah, hapus, dan atur halaman PDF', href: '/pdf/halaman', category: 'PDF' },
  { title: 'PDF ke Word', description: 'Konversi PDF ke dokumen Word (DOCX)', href: '/pdf/pdf-ke-word', category: 'PDF' },
  { title: 'Word ke PDF', description: 'Konversi dokumen Word ke PDF', href: '/pdf/word-ke-pdf', category: 'PDF' },

  // CV (6)
  { title: 'Generator CV ATS', description: 'Buat CV ramah ATS untuk lamaran kerja', href: '/cv/ats', category: 'CV' },
  { title: 'CV Fresh Graduate', description: 'Template CV untuk fresh graduate tanpa pengalaman', href: '/cv/fresh-graduate', category: 'CV' },
  { title: 'CV Admin', description: 'Template CV untuk posisi admin dan staff', href: '/cv/cv-admin', category: 'CV' },
  { title: 'CV BUMN', description: 'Template CV untuk lamaran BUMN', href: '/cv/cv-bumn', category: 'CV' },
  { title: 'Contoh Surat Lamaran', description: 'Contoh surat lamaran kerja yang menarik HR', href: '/cv/contoh-surat-lamaran', category: 'CV' },
  { title: 'Cover Letter', description: 'Generator cover letter profesional', href: '/cv/cover-letter', category: 'CV' },

  // UMKM (6)
  { title: 'Kalkulator HPP', description: 'Hitung harga pokok penjualan produk UMKM', href: '/umkm/hpp', category: 'UMKM' },
  { title: 'Kalkulator Harga Jual', description: 'Tentukan harga jual dari HPP dan margin', href: '/umkm/harga-jual', category: 'UMKM' },
  { title: 'Kalkulator Food Cost', description: 'Hitung food cost untuk usaha makanan', href: '/umkm/food-cost', category: 'UMKM' },
  { title: 'Generator Invoice', description: 'Buat invoice profesional untuk UMKM', href: '/umkm/invoice', category: 'UMKM' },
  { title: 'Margin Marketplace', description: 'Hitung margin jual di Shopee, Tokopedia, dll', href: '/umkm/margin-marketplace', category: 'UMKM' },
  { title: 'Catatan Keuangan', description: 'Catat pemasukan dan pengeluaran UMKM', href: '/umkm/catatan', category: 'UMKM' },

  // Keuangan (3)
  { title: 'Kalkulator KPR', description: 'Hitung cicilan KPR rumah per bulan', href: '/keuangan/kpr', category: 'Keuangan' },
  { title: 'Cek NPWP', description: 'Panduan cek dan daftar NPWP online', href: '/keuangan/cek-npwp', category: 'Keuangan' },
  { title: 'Cek Pinjol Legal', description: 'Daftar pinjaman online legal OJK', href: '/keuangan/pinjol', category: 'Keuangan' },

  // Blog (15)
  { title: 'Cara Membuat Surat Resign', description: 'Panduan lengkap cara membuat surat pengunduran diri yang baik', href: '/blog/cara-membuat-surat-resign', category: 'Blog' },
  { title: 'Ukuran Foto CPNS 2026', description: 'Syarat, format, dan cara resize foto CPNS online', href: '/blog/ukuran-foto-cpns-2026', category: 'Blog' },
  { title: 'Cara Hitung Gaji Bersih', description: 'Panduan hitung take home pay dari gaji bruto', href: '/blog/cara-hitung-gaji-bersih', category: 'Blog' },
  { title: 'Cara Kompres PDF', description: 'Tutorial mengecilkan ukuran PDF tanpa hilang kualitas', href: '/blog/cara-kompres-pdf', category: 'Blog' },
  { title: 'Cara Buat CV ATS-Friendly', description: 'Panduan CV yang lolos screening ATS HR', href: '/blog/cara-buat-cv-ats', category: 'Blog' },
  { title: 'Contoh Surat Pengunduran Diri', description: 'Kumpulan contoh surat pengunduran diri berbagai situasi', href: '/blog/contoh-surat-pengunduran-diri', category: 'Blog' },
  { title: 'Ukuran Foto 3x4 dan 4x6', description: 'Ukuran foto dalam pixel, cm, dan DPI', href: '/blog/ukuran-foto-3x4-4x6-pixel', category: 'Blog' },
  { title: 'Cara Hitung THR Karyawan', description: 'Panduan hitung THR sesuai peraturan 2026', href: '/blog/cara-hitungan-thr-karyawan', category: 'Blog' },
  { title: 'CV Fresh Graduate', description: 'Tips membuat CV tanpa pengalaman kerja', href: '/blog/cara-membuat-cv-fresh-graduate', category: 'Blog' },
  { title: 'Cara Hitung HPP Produk UMKM', description: 'Panduan hitung harga pokok penjualan untuk UMKM', href: '/blog/cara-hitung-hpp-produk-umkm', category: 'Blog' },
  { title: 'Contoh Surat Izin Sekolah', description: 'Contoh surat izin sekolah karena sakit', href: '/blog/contoh-surat-izin-sekolah', category: 'Blog' },
  { title: 'Cara Membuat Surat Lamaran Kerja', description: 'Panduan surat lamaran kerja yang menarik HR', href: '/blog/cara-membuat-surat-lamaran-kerja', category: 'Blog' },
  { title: 'Ukuran Foto Visa dan Passport', description: 'Standar ukuran foto visa internasional 2026', href: '/blog/ukuran-foto-visa-passport', category: 'Blog' },
  { title: 'Perbedaan Gaji Bruto dan Netto', description: 'Komponen potongan gaji dan cara hitung take home pay', href: '/blog/perbedaan-gaji-bruto-netto', category: 'Blog' },
  { title: 'Cara Buat Invoice Profesional', description: 'Panduan membuat invoice untuk UMKM dan freelancer', href: '/blog/cara-buat-invoice-profesional', category: 'Blog' },
];

const categoryColors: Record<string, string> = {
  Surat: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  Foto: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  Gaji: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  PDF: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
  CV: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  UMKM: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  Keuangan: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  Blog: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
};

const MAX_RESULTS = 8;

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? searchIndex
        .filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, MAX_RESULTS)
    : [];

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault();
        window.location.href = results[selectedIndex].href;
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, results, selectedIndex, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/50 dark:bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border dark:border-gray-700">
          <Search className="w-5 h-5 text-ink-muted dark:text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari tool atau panduan..."
            className="flex-1 text-lg bg-transparent text-ink dark:text-white placeholder:text-ink-muted dark:placeholder:text-gray-400 outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface dark:hover:bg-gray-700 transition-colors text-ink-muted dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="px-5 py-12 text-center text-ink-muted dark:text-gray-400">
              <p className="text-lg font-medium">Tidak ditemukan</p>
              <p className="text-sm mt-1">Coba kata kunci lain</p>
            </div>
          )}

          {results.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-3 transition-colors ${
                i === selectedIndex
                  ? 'bg-primary/10 dark:bg-primary/20'
                  : 'hover:bg-surface dark:hover:bg-gray-700'
              }`}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-ink dark:text-white truncate">
                    {item.title}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                      categoryColors[item.category] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-ink-tertiary dark:text-gray-400 truncate mt-0.5">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Footer hint */}
        {query.trim() && results.length > 0 && (
          <div className="px-5 py-2.5 border-t border-border dark:border-gray-700 flex items-center gap-4 text-xs text-ink-muted dark:text-gray-500">
            <span><kbd className="px-1.5 py-0.5 bg-surface dark:bg-gray-700 rounded text-xs">↑↓</kbd> navigasi</span>
            <span><kbd className="px-1.5 py-0.5 bg-surface dark:bg-gray-700 rounded text-xs">↵</kbd> buka</span>
            <span><kbd className="px-1.5 py-0.5 bg-surface dark:bg-gray-700 rounded text-xs">esc</kbd> tutup</span>
          </div>
        )}
      </div>
    </div>
  );
}
