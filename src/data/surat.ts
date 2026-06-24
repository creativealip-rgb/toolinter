export interface SuratType {
  slug: string;
  title: string;
  description: string;
  icon: string;
  fields: {
    name: string;
    label: string;
    type: "text" | "textarea" | "date" | "select";
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
  }[];
}

export const suratTypes: SuratType[] = [
  {
    slug: "resign",
    title: "Surat Resign",
    description: "Buat surat pengunduran diri dari pekerjaan dengan format profesional",
    icon: "briefcase",
    fields: [
      { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama lengkap Anda", required: true },
      { name: "jabatan", label: "Jabatan", type: "text", placeholder: "Contoh: Staff Marketing", required: true },
      { name: "perusahaan", label: "Nama Perusahaan", type: "text", placeholder: "Contoh: PT ABC Indonesia", required: true },
      { name: "tanggal_masuk", label: "Tanggal Masuk Kerja", type: "date", required: true },
      { name: "tanggal_resign", label: "Tanggal Pengunduran Diri", type: "date", required: true },
      { name: "alasan", label: "Alasan Mengundurkan Diri", type: "textarea", placeholder: "Contoh: untuk mengejar karir baru", required: false },
    ],
  },
  {
    slug: "izin-sekolah",
    title: "Surat Izin Sekolah",
    description: "Buat surat izin tidak masuk sekolah karena sakit atau keperluan lain",
    icon: "graduation-cap",
    fields: [
      { name: "nama_orangtua", label: "Nama Orang Tua/Wali", type: "text", placeholder: "Masukkan nama orang tua/wali", required: true },
      { name: "nama_siswa", label: "Nama Siswa", type: "text", placeholder: "Masukkan nama siswa", required: true },
      { name: "kelas", label: "Kelas", type: "text", placeholder: "Contoh: X IPA 2", required: true },
      { name: "sekolah", label: "Nama Sekolah", type: "text", placeholder: "Contoh: SMA Negeri 1 Jakarta", required: true },
      { name: "alasan", label: "Alasan Izin", type: "textarea", placeholder: "Contoh: karena sakit demam", required: true },
      { name: "tanggal", label: "Tanggal Izin", type: "date", required: true },
    ],
  },
  {
    slug: "lamaran-kerja",
    title: "Surat Lamaran Kerja",
    description: "Buat surat lamaran kerja profesional untuk berbagai posisi",
    icon: "briefcase",
    fields: [
      { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama lengkap Anda", required: true },
      { name: "alamat", label: "Alamat", type: "textarea", placeholder: "Masukkan alamat lengkap", required: true },
      { name: "telepon", label: "Nomor Telepon", type: "text", placeholder: "Contoh: 08123456789", required: true },
      { name: "email", label: "Email", type: "text", placeholder: "Contoh: nama@email.com", required: true },
      { name: "posisi", label: "Posisi yang Dilamar", type: "text", placeholder: "Contoh: Staff Marketing", required: true },
      { name: "perusahaan", label: "Nama Perusahaan", type: "text", placeholder: "Contoh: PT ABC Indonesia", required: true },
      { name: "pendidikan", label: "Pendidikan Terakhir", type: "select", required: true, options: [
        { value: "SMA/SMK", label: "SMA/SMK" },
        { value: "D3", label: "D3" },
        { value: "S1", label: "S1" },
        { value: "S2", label: "S2" },
      ]},
      { name: "pengalaman", label: "Pengalaman Kerja", type: "textarea", placeholder: "Contoh: 2 tahun di bidang marketing", required: false },
    ],
  },
  {
    slug: "pernyataan",
    title: "Surat Pernyataan",
    description: "Buat surat pernyataan untuk berbagai keperluan resmi",
    icon: "file-check",
    fields: [
      { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama lengkap Anda", required: true },
      { name: "nik", label: "NIK", type: "text", placeholder: "Masukkan Nomor Induk Kependudukan", required: true },
      { name: "alamat", label: "Alamat", type: "textarea", placeholder: "Masukkan alamat sesuai KTP", required: true },
      { name: "isi_pernyataan", label: "Isi Pernyataan", type: "textarea", placeholder: "Tuliskan isi pernyataan Anda", required: true },
    ],
  },
  {
    slug: "kuasa",
    title: "Surat Kuasa",
    description: "Buat surat kuasa untuk mewakili kepentingan tertentu",
    icon: "users",
    fields: [
      { name: "pemberi_kuasa", label: "Nama Pemberi Kuasa", type: "text", placeholder: "Masukkan nama pemberi kuasa", required: true },
      { name: "nik_pemberi", label: "NIK Pemberi Kuasa", type: "text", placeholder: "Masukkan NIK pemberi kuasa", required: true },
      { name: "alamat_pemberi", label: "Alamat Pemberi Kuasa", type: "textarea", placeholder: "Masukkan alamat pemberi kuasa", required: true },
      { name: "penerima_kuasa", label: "Nama Penerima Kuasa", type: "text", placeholder: "Masukkan nama penerima kuasa", required: true },
      { name: "nik_penerima", label: "NIK Penerima Kuasa", type: "text", placeholder: "Masukkan NIK penerima kuasa", required: true },
      { name: "alamat_penerima", label: "Alamat Penerima Kuasa", type: "textarea", placeholder: "Masukkan alamat penerima kuasa", required: true },
      { name: "isi_kuasa", label: "Isi Kuasa", type: "textarea", placeholder: "Contoh: untuk mengurus dokumen di kantor BPN", required: true },
    ],
  },
];

export function getSuratBySlug(slug: string): SuratType | undefined {
  return suratTypes.find((s) => s.slug === slug);
}
