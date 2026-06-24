'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Camera,
  Wallet,
  FileCheck,
  Briefcase,
  Calculator,
  ArrowRight,
  Shrink,
  Receipt,
  Gift,
  Shield,
  DollarSign,
  UtensilsCrossed,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Building2,
  FileSignature,
} from 'lucide-react';

const categories = ['Semua', 'Surat', 'Foto', 'Gaji', 'PDF', 'CV', 'UMKM'] as const;
type Category = (typeof categories)[number];

const categoryColors: Record<Category, string> = {
  Surat: 'bg-blue-100 text-blue-700',
  Foto: 'bg-pink-100 text-pink-700',
  Gaji: 'bg-green-100 text-green-700',
  PDF: 'bg-red-100 text-red-700',
  CV: 'bg-purple-100 text-purple-700',
  UMKM: 'bg-amber-100 text-amber-700',
  Semua: '',
};

interface ToolItem {
  title: string;
  description: string;
  href: string;
  category: Category;
  icon: typeof FileText;
}

const allTools: ToolItem[] = [
  // Surat (22)
  { title: 'Surat Resign', description: 'Buat surat pengunduran diri dari pekerjaan dengan format profesional.', href: '/surat/resign', category: 'Surat', icon: Briefcase },
  { title: 'Surat Izin Sekolah', description: 'Buat surat izin tidak masuk sekolah karena sakit atau keperluan lain.', href: '/surat/izin-sekolah', category: 'Surat', icon: GraduationCap },
  { title: 'Surat Lamaran Kerja', description: 'Buat surat lamaran kerja profesional untuk berbagai posisi.', href: '/surat/lamaran-kerja', category: 'Surat', icon: Briefcase },
  { title: 'Surat Pernyataan', description: 'Buat surat pernyataan untuk berbagai keperluan resmi.', href: '/surat/pernyataan', category: 'Surat', icon: FileCheck },
  { title: 'Surat Kuasa', description: 'Buat surat kuasa untuk berbagai keperluan hukum dan administrasi.', href: '/surat/kuasa', category: 'Surat', icon: FileText },
  { title: 'Surat Undangan Resmi', description: 'Buat surat undangan resmi untuk acara, rapat, atau kegiatan.', href: '/surat/surat-undangan', category: 'Surat', icon: FileText },
  { title: 'Surat Permohonan', description: 'Buat surat permohonan untuk berbagai keperluan resmi.', href: '/surat/permohonan', category: 'Surat', icon: FileText },
  { title: 'Surat Keterangan Kerja', description: 'Buat surat keterangan kerja untuk keperluan administrasi.', href: '/surat/keterangan-kerja', category: 'Surat', icon: Briefcase },
  { title: 'Surat Keterangan Domisili', description: 'Buat surat keterangan domisili untuk keperluan administrasi kependudukan.', href: '/surat/domisili', category: 'Surat', icon: FileText },
  { title: 'Surat Perjanjian Sewa', description: 'Buat surat perjanjian sewa-menyewa properti.', href: '/surat/sewa', category: 'Surat', icon: FileText },
  { title: 'Surat Tugas', description: 'Buat surat tugas resmi dari instansi atau perusahaan.', href: '/surat/tugas', category: 'Surat', icon: FileText },
  { title: 'Surat Rekomendasi', description: 'Buat surat rekomendasi untuk keperluan kerja atau pendidikan.', href: '/surat/rekomendasi', category: 'Surat', icon: FileText },
  { title: 'Surat Pernyataan Belum Menikah', description: 'Buat surat pernyataan belum menikah untuk keperluan administrasi.', href: '/surat/belum-menikah', category: 'Surat', icon: FileCheck },
  { title: 'Surat Keterangan Sehat', description: 'Buat surat keterangan sehat untuk keperluan kerja atau administrasi.', href: '/surat/kesehatan', category: 'Surat', icon: FileCheck },
  { title: 'Surat Keterangan Bebas Narkoba', description: 'Buat surat keterangan bebas narkoba untuk keperluan administrasi.', href: '/surat/bebas-narkoba', category: 'Surat', icon: FileCheck },
  { title: 'Surat Izin Tidak Masuk Kuliah', description: 'Buat surat izin tidak masuk kuliah untuk dosen atau kampus.', href: '/surat/izin-kuliah', category: 'Surat', icon: GraduationCap },
  { title: 'Surat Izin Tidak Masuk Kerja', description: 'Buat surat izin tidak masuk kerja untuk atasan atau HRD.', href: '/surat/izin-kerja', category: 'Surat', icon: Briefcase },
  { title: 'Surat Kuasa Pengambilan BPKB', description: 'Buat surat kuasa pengambilan BPKB kendaraan.', href: '/surat/kuasa-bpkb', category: 'Surat', icon: FileText },
  { title: 'Surat Keterangan Usaha', description: 'Buat surat keterangan usaha untuk keperluan UMKM dan perizinan.', href: '/surat/keterangan-usaha', category: 'Surat', icon: Briefcase },
  { title: 'Surat Keterangan Tidak Mampu', description: 'Buat surat keterangan tidak mampu untuk keperluan bantuan sosial.', href: '/surat/keterangan-tidak-mampu', category: 'Surat', icon: FileText },
  { title: 'Surat Pengunduran Diri (Formal)', description: 'Buat surat pengunduran diri dengan format formal untuk instansi pemerintah.', href: '/surat/pengunduran-diri', category: 'Surat', icon: Briefcase },
  { title: 'Surat Kuasa Pengelolaan Rekening', description: 'Buat surat kuasa pengelolaan rekening bank.', href: '/surat/kuasa-rekening', category: 'Surat', icon: FileText },

  // Foto (4)
  { title: 'Resize Foto 3×4 cm', description: 'Ubah ukuran foto ke 3×4 cm untuk CPNS, SNBP, SKCK, akta, dan dokumen resmi lainnya.', href: '/foto/resize-3x4', category: 'Foto', icon: Camera },
  { title: 'Resize Foto 4×6 cm', description: 'Ubah ukuran foto ke 4×6 cm untuk paspor, visa, SIM, dan dokumen internasional.', href: '/foto/resize-4x6', category: 'Foto', icon: Camera },
  { title: 'Resize Foto 2×3 cm', description: 'Ubah ukuran foto ke 2×3 cm untuk dokumen sekolah, PPDB, dan keperluan administrasi.', href: '/foto/resize-2x3', category: 'Foto', icon: Camera },
  { title: 'Kompres Foto', description: 'Kompres foto untuk upload ke portal CPNS, SNBP, dan situs pendaftaran online.', href: '/foto/kompres', category: 'Foto', icon: Shrink },

  // Gaji (4)
  { title: 'Kalkulator Gaji Bersih', description: 'Hitung take home pay dari gaji kotor. Otomatis potong PPh21, BPJS Kesehatan, dan BPJS Ketenagakerjaan.', href: '/gaji/bersih', category: 'Gaji', icon: Wallet },
  { title: 'Kalkulator PPh21', description: 'Hitung pajak penghasilan PPh21 berdasarkan tarif progresif dan status PTKP.', href: '/gaji/pph21', category: 'Gaji', icon: Receipt },
  { title: 'Kalkulator THR', description: 'Hitung tunjangan hari raya berdasarkan masa kerja dan gaji terakhir.', href: '/gaji/thr', category: 'Gaji', icon: Gift },
  { title: 'Kalkulator BPJS', description: 'Hitung iuran BPJS Kesehatan dan BPJS Ketenagakerjaan (JHT, JP, JKK, JKM).', href: '/gaji/bpjs', category: 'Gaji', icon: Shield },

  // PDF (4 active)
  { title: 'Gabung PDF', description: 'Gabungkan beberapa file PDF menjadi satu. Upload, atur urutan, dan download hasilnya.', href: '/pdf/gabung', category: 'PDF', icon: FileText },
  { title: 'Kompres PDF', description: 'Kurangi ukuran file PDF tanpa mengurangi kualitas secara signifikan.', href: '/pdf/kompres', category: 'PDF', icon: Shrink },
  { title: 'Foto ke PDF', description: 'Ubah foto JPG, PNG, WEBP menjadi PDF. Setiap foto jadi satu halaman A4.', href: '/pdf/foto-ke-pdf', category: 'PDF', icon: Camera },
  { title: 'Ambil Halaman PDF', description: 'Ekstrak halaman tertentu dari file PDF. Pilih dengan rentang seperti 1-3,5,7-9.', href: '/pdf/halaman', category: 'PDF', icon: FileCheck },

  // CV (5)
  { title: 'Generator CV ATS', description: 'Buat CV yang lolos ATS (Applicant Tracking System) dalam hitungan menit. Format bersih, siap download PDF.', href: '/cv/ats', category: 'CV', icon: FileText },
  { title: 'Template CV Fresh Graduate', description: 'Template CV untuk lulusan baru tanpa pengalaman kerja. Fokus pendidikan, proyek, dan keahlian.', href: '/cv/fresh-graduate', category: 'CV', icon: GraduationCap },
  { title: 'Template CV Admin', description: 'Template CV untuk posisi staff administrasi, admin kantor, dan resepsionis. Format ATS-friendly.', href: '/cv/cv-admin', category: 'CV', icon: Briefcase },
  { title: 'Template CV BUMN', description: 'Template CV khusus untuk melamar di BUMN: Pertamina, PLN, Telkom, Bank Mandiri, dan lainnya.', href: '/cv/cv-bumn', category: 'CV', icon: Building2 },
  { title: 'Contoh Surat Lamaran Kerja', description: 'Contoh surat lamaran kerja formal yang benar. Download template PDF dan lihat panduan lengkap.', href: '/cv/contoh-surat-lamaran', category: 'CV', icon: FileSignature },

  // UMKM (6)
  { title: 'Kalkulator HPP', description: 'Hitung Harga Pokok Penjualan (HPP) produk Anda. Masukkan biaya bahan baku, tenaga kerja, dan overhead.', href: '/umkm/hpp', category: 'UMKM', icon: Calculator },
  { title: 'Kalkulator Harga Jual', description: 'Hitung harga jual produk berdasarkan HPP, target margin, biaya operasional, dan diskon marketplace.', href: '/umkm/harga-jual', category: 'UMKM', icon: DollarSign },
  { title: 'Kalkulator Food Cost', description: 'Hitung food cost percentage untuk bisnis F&B. Ketahui apakah biaya bahan baku sudah optimal.', href: '/umkm/food-cost', category: 'UMKM', icon: UtensilsCrossed },
  { title: 'Generator Invoice', description: 'Buat invoice profesional untuk pelanggan Anda. Cetak atau download sebagai PDF.', href: '/umkm/invoice', category: 'UMKM', icon: FileText },
  { title: 'Kalkulator Margin Marketplace', description: 'Hitung margin keuntungan setelah potongan fee marketplace Tokopedia, Shopee, Lazada, atau platform custom.', href: '/umkm/margin-marketplace', category: 'UMKM', icon: TrendingUp },
  { title: 'Catatan Keuangan Sederhana', description: 'Catat pemasukan dan pengeluaran bisnis harian Anda. Lihat ringkasan laba rugi tanpa aplikasi akuntansi.', href: '/umkm/catatan', category: 'UMKM', icon: BookOpen },
];

export default function ToolsGrid() {
  const [active, setActive] = useState<Category>('Semua');

  const filtered = active === 'Semua' ? allTools : allTools.filter((t) => t.category === active);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === cat
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface text-ink-secondary hover:bg-border'
            }`}
          >
            {cat}
            {cat !== 'Semua' && (
              <span className="ml-1.5 opacity-60">
                {allTools.filter((t) => t.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tool grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-xl border border-border bg-canvas p-5 transition-all hover:shadow-lg hover:border-primary/30 flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-ink text-base leading-tight">
                    {tool.title}
                  </h2>
                  <span
                    className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[tool.category]}`}
                  >
                    {tool.category}
                  </span>
                </div>
              </div>
              <p className="text-sm text-ink-tertiary flex-1 mb-3">
                {tool.description}
              </p>
              <div className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Buka tool <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

      <p className="text-center mt-8 text-sm text-ink-muted">
        Menampilkan {filtered.length} dari {allTools.length} tool
      </p>
    </>
  );
}
