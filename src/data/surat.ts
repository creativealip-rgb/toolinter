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
  {
    slug: "surat-undangan",
    title: "Surat Undangan Resmi",
    description: "Buat surat undangan resmi untuk acara, rapat, atau kegiatan",
    icon: "stamp",
    fields: [
      { name: "nama_pengirim", label: "Nama Pengirim", type: "text", placeholder: "Masukkan nama pengirim", required: true },
      { name: "instansi", label: "Instansi/Perusahaan", type: "text", placeholder: "Contoh: PT ABC Indonesia", required: true },
      { name: "acara", label: "Nama Acara", type: "text", placeholder: "Contoh: Rapat Kerja Tahunan", required: true },
      { name: "tanggal_acara", label: "Tanggal Acara", type: "date", required: true },
      { name: "waktu", label: "Waktu Acara", type: "text", placeholder: "Contoh: 09.00 - 12.00 WIB", required: true },
      { name: "tempat", label: "Tempat Acara", type: "text", placeholder: "Contoh: Hotel Grand Jakarta, Ballroom A", required: true },
      { name: "untuk", label: "Ditujukan Kepada", type: "text", placeholder: "Contoh: Bapak/Ibu Staff", required: true },
    ],
  },
  {
    slug: "permohonan",
    title: "Surat Permohonan",
    description: "Buat surat permohonan untuk berbagai keperluan resmi",
    icon: "book-open",
    fields: [
      { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama lengkap Anda", required: true },
      { name: "nik", label: "NIK", type: "text", placeholder: "Masukkan Nomor Induk Kependudukan", required: true },
      { name: "alamat", label: "Alamat", type: "textarea", placeholder: "Masukkan alamat sesuai KTP", required: true },
      { name: "tujuan_permohonan", label: "Tujuan Permohonan", type: "textarea", placeholder: "Contoh: permohonan surat keterangan domisili", required: true },
      { name: "instansi_tujuan", label: "Instansi Tujuan", type: "text", placeholder: "Contoh: Kelurahan Menteng", required: true },
    ],
  },
  {
    slug: "keterangan-kerja",
    title: "Surat Keterangan Kerja",
    description: "Buat surat keterangan kerja untuk keperluan administrasi",
    icon: "building",
    fields: [
      { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama lengkap karyawan", required: true },
      { name: "jabatan", label: "Jabatan", type: "text", placeholder: "Contoh: Staff Marketing", required: true },
      { name: "perusahaan", label: "Nama Perusahaan", type: "text", placeholder: "Contoh: PT ABC Indonesia", required: true },
      { name: "tanggal_masuk", label: "Tanggal Masuk Kerja", type: "date", required: true },
      { name: "keterangan", label: "Keterangan Tambahan", type: "textarea", placeholder: "Contoh: masih aktif bekerja hingga saat ini", required: false },
    ],
  },
  {
    slug: "domisili",
    title: "Surat Keterangan Domisili",
    description: "Buat surat keterangan domisili untuk keperluan administrasi kependudukan",
    icon: "home",
    fields: [
      { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama lengkap Anda", required: true },
      { name: "nik", label: "NIK", type: "text", placeholder: "Masukkan Nomor Induk Kependudukan", required: true },
      { name: "alamat", label: "Alamat Lengkap", type: "textarea", placeholder: "Masukkan alamat domisili", required: true },
      { name: "rt_rw", label: "RT/RW", type: "text", placeholder: "Contoh: 001/005", required: true },
      { name: "kelurahan", label: "Kelurahan", type: "text", placeholder: "Contoh: Menteng", required: true },
      { name: "kecamatan", label: "Kecamatan", type: "text", placeholder: "Contoh: Menteng", required: true },
    ],
  },
  {
    slug: "sewa",
    title: "Surat Perjanjian Sewa",
    description: "Buat surat perjanjian sewa-menyewa barang atau properti",
    icon: "scale",
    fields: [
      { name: "nama_penyewa", label: "Nama Penyewa", type: "text", placeholder: "Masukkan nama penyewa", required: true },
      { name: "nama_pemilik", label: "Nama Pemilik", type: "text", placeholder: "Masukkan nama pemilik", required: true },
      { name: "alamat_barang", label: "Alamat/Deskripsi Barang", type: "textarea", placeholder: "Contoh: Rumah di Jl. Sudirman No. 10", required: true },
      { name: "harga_sewa", label: "Harga Sewa", type: "text", placeholder: "Contoh: Rp 5.000.000/bulan", required: true },
      { name: "durasi", label: "Durasi Sewa", type: "text", placeholder: "Contoh: 12 bulan", required: true },
      { name: "tanggal_mulai", label: "Tanggal Mulai Sewa", type: "date", required: true },
    ],
  },
  {
    slug: "tugas",
    title: "Surat Tugas",
    description: "Buat surat penugasan resmi dari instansi atau perusahaan",
    icon: "badge-check",
    fields: [
      { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama yang ditugaskan", required: true },
      { name: "jabatan", label: "Jabatan", type: "text", placeholder: "Contoh: Staff IT", required: true },
      { name: "instansi", label: "Nama Instansi", type: "text", placeholder: "Contoh: PT ABC Indonesia", required: true },
      { name: "tugas", label: "Deskripsi Tugas", type: "textarea", placeholder: "Contoh: melakukan instalasi jaringan di kantor cabang", required: true },
      { name: "tanggal_mulai", label: "Tanggal Mulai Tugas", type: "date", required: true },
      { name: "tanggal_selesai", label: "Tanggal Selesai Tugas", type: "date", required: true },
    ],
  },
  {
    slug: "rekomendasi",
    title: "Surat Rekomendasi",
    description: "Buat surat rekomendasi untuk keperluan kerja, beasiswa, atau lainnya",
    icon: "shield",
    fields: [
      { name: "nama_rekomendasi", label: "Nama Pemberi Rekomendasi", type: "text", placeholder: "Masukkan nama pemberi rekomendasi", required: true },
      { name: "jabatan", label: "Jabatan Pemberi Rekomendasi", type: "text", placeholder: "Contoh: Direktur PT ABC", required: true },
      { name: "nama_terrekomendasi", label: "Nama yang Direkomendasikan", type: "text", placeholder: "Masukkan nama yang direkomendasikan", required: true },
      { name: "tujuan", label: "Tujuan Rekomendasi", type: "text", placeholder: "Contoh: melamar posisi Senior Developer", required: true },
      { name: "isi_rekomendasi", label: "Isi Rekomendasi", type: "textarea", placeholder: "Tuliskal alasan rekomendasi", required: true },
    ],
  },
  {
    slug: "belum-menikah",
    title: "Surat Pernyataan Belum Menikah",
    description: "Buat surat pernyataan belum menikah untuk keperluan administrasi",
    icon: "heart",
    fields: [
      { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama lengkap Anda", required: true },
      { name: "nik", label: "NIK", type: "text", placeholder: "Masukkan Nomor Induk Kependudukan", required: true },
      { name: "alamat", label: "Alamat", type: "textarea", placeholder: "Masukkan alamat sesuai KTP", required: true },
      { name: "tempat_lahir", label: "Tempat Lahir", type: "text", placeholder: "Contoh: Jakarta", required: true },
      { name: "tanggal_lahir", label: "Tanggal Lahir", type: "date", required: true },
      { name: "pekerjaan", label: "Pekerjaan", type: "text", placeholder: "Contoh: Karyawan Swasta", required: true },
    ],
  },
  {
    slug: "kesehatan",
    title: "Surat Keterangan Sehat",
    description: "Buat surat keterangan sehat untuk keperluan administrasi",
    icon: "heart",
    fields: [
      { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama lengkap Anda", required: true },
      { name: "nik", label: "NIK", type: "text", placeholder: "Masukkan Nomor Induk Kependudukan", required: true },
      { name: "tanggal_lahir", label: "Tanggal Lahir", type: "date", required: true },
      { name: "keperluan", label: "Keperluan", type: "text", placeholder: "Contoh: melamar pekerjaan", required: true },
    ],
  },
  {
    slug: "bebas-narkoba",
    title: "Surat Keterangan Bebas Narkoba",
    description: "Buat surat keterangan bebas narkoba untuk keperluan administrasi",
    icon: "shield",
    fields: [
      { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama lengkap Anda", required: true },
      { name: "nik", label: "NIK", type: "text", placeholder: "Masukkan Nomor Induk Kependudukan", required: true },
      { name: "alamat", label: "Alamat", type: "textarea", placeholder: "Masukkan alamat sesuai KTP", required: true },
      { name: "tanggal_lahir", label: "Tanggal Lahir", type: "date", required: true },
      { name: "keperluan", label: "Keperluan", type: "text", placeholder: "Contoh: melamar pekerjaan", required: true },
    ],
  },
];

export function getSuratBySlug(slug: string): SuratType | undefined {
  return suratTypes.find((s) => s.slug === slug);
}
