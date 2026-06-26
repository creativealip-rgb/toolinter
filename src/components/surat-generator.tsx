"use client";

import { useState } from "react";
import { Download, Eye, FileText, Loader2, Sparkles } from "lucide-react";
import AiInsightBox from "./ai-insight-box";

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
  "surat-undangan": (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `${data.instansi || "[Instansi]"}
${data.nama_pengirim || "[Nama Pengirim]"}

Kepada Yth.
${data.untuk || "[Ditujukan Kepada]"}

Dengan hormat,

Dengan ini kami mengundang Bapak/Ibu untuk menghadiri acara:

Acara: ${data.acara || "[Nama Acara]"}
Hari/Tanggal: ${data.tanggal_acara || "[Tanggal Acara]"}
Waktu: ${data.waktu || "[Waktu Acara]"}
Tempat: ${data.tempat || "[Tempat Acara]"}

Mengingat pentingnya acara tersebut, kami sangat mengharapkan kehadiran Bapak/Ibu tepat pada waktunya. Atas perhatian dan kehadirannya, kami ucapkan terima kasih.

Hormat kami,


${data.nama_pengirim || "[Nama Pengirim]"}
${tanggalSurat}`;
  },
  permohonan: (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT PERMOHONAN

Yang bertanda tangan di bawah ini:
Nama: ${data.nama || "[Nama Lengkap]"}
NIK: ${data.nik || "[NIK]"}
Alamat: ${data.alamat || "[Alamat]"}

Dengan ini mengajukan permohonan kepada:

Kepada Yth.
${data.instansi_tujuan || "[Instansi Tujuan]"}

Perihal: ${data.tujuan_permohonan || "[Tujuan Permohonan]"}

Bersama surat ini, saya lampirkan dokumen-dokumen yang diperlukan sebagai berikut:
1. Fotokopi KTP
2. Fotokopi Kartu Keluarga
3. Surat Pengantar RT/RW

Demikian surat permohonan ini saya buat dengan sebenar-benarnya. Besar harapan saya agar permohonan ini dapat dipertimbangkan dan dikabulkan. Atas perhatian dan kebijaksanaannya, saya ucapkan terima kasih.

Hormat saya,


${data.nama || "[Nama Lengkap]"}
${tanggalSurat}`;
  },
  "keterangan-kerja": (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT KETERANGAN KERJA

Yang bertanda tangan di bawah ini:
Nama: Pimpinan ${data.perusahaan || "[Nama Perusahaan]"}

Dengan ini menerangkan bahwa:
Nama: ${data.nama || "[Nama Lengkap]"}
Jabatan: ${data.jabatan || "[Jabatan]"}
Tanggal Masuk: ${data.tanggal_masuk || "[Tanggal Masuk]"}

Benar yang bersangkutan adalah karyawan ${data.perusahaan || "[Nama Perusahaan]"} dan telah bekerja sejak tanggal tersebut di atas.
${data.keterangan ? `\nKeterangan: ${data.keterangan}` : ""}

Surat keterangan ini dibuat untuk keperluan administrasi dan dapat dipergunakan sebagaimana mestinya.

${tanggalSurat}

Pimpinan ${data.perusahaan || "[Nama Perusahaan]"}


_________________________`;
  },
  domisili: (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT KETERANGAN DOMISILI

Yang bertanda tangan di bawah ini:
Pemerintah Kelurahan ${data.kelurahan || "[Kelurahan]"}, Kecamatan ${data.kecamatan || "[Kecamatan]"}

Dengan ini menerangkan bahwa:
Nama: ${data.nama || "[Nama Lengkap]"}
NIK: ${data.nik || "[NIK]"}
Alamat: ${data.alamat || "[Alamat]"}
RT/RW: ${data.rt_rw || "[RT/RW]"}
Kelurahan: ${data.kelurahan || "[Kelurahan]"}
Kecamatan: ${data.kecamatan || "[Kecamatan]"}

Adalah benar penduduk yang berdomisili di alamat tersebut di atas.

Surat keterangan ini dibuat untuk keperluan administrasi kependudukan dan dapat dipergunakan sebagaimana mestinya.

${tanggalSurat}

Lurah ${data.kelurahan || "[Kelurahan]"}


_________________________`;
  },
  sewa: (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT PERJANJIAN SEWA

Pada hari ini ${tanggalSurat}, telah dibuat dan disepakati perjanjian sewa-menyewa oleh dan antara:

1. Nama: ${data.nama_pemilik || "[Nama Pemilik]"}
   Selanjutnya disebut sebagai PIHAK PERTAMA (Pemilik)

2. Nama: ${data.nama_penyewa || "[Nama Penyewa]"}
   Selanjutnya disebut sebagai PIHAK KEDUA (Penyewa)

Kedua belah pihak sepakat untuk mengikatkan diri dalam perjanjian sewa-menyewa dengan ketentuan sebagai berikut:

Pasal 1 - Objek Sewa
PIHAK PERTAMA menyewakan kepada PIHAK KEDUA berupa:
${data.alamat_barang || "[Alamat/Deskripsi Barang]"}

Pasal 2 - Jangka Waktu Sewa
Jangka waktu sewa adalah ${data.durasi || "[Durasi Sewa]"} terhitung mulai tanggal ${data.tanggal_mulai || "[Tanggal Mulai Sewa]"}.

Pasal 3 - Harga Sewa
Harga sewa yang disepakati adalah sebesar ${data.harga_sewa || "[Harga Sewa]"}.

Pasal 4 - Pembayaran
Pembayaran dilakukan di muka pada awal setiap periode sewa.

Demikian perjanjian ini dibuat dengan sebenar-benarnya dan berlaku sejak tanggal ditandatangani.

PIHAK PERTAMA,                    PIHAK KEDUA,


${data.nama_pemilik || "[Nama Pemilik]"}       ${data.nama_penyewa || "[Nama Penyewa]"}
Meterai Rp 10.000                 Meterai Rp 10.000`;
  },
  tugas: (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT TUGAS

Nomor: .../ST/${new Date().getMonth() + 1}/${new Date().getFullYear()}

Yang bertanda tangan di bawah ini:
Pimpinan ${data.instansi || "[Nama Instansi]"}

Dengan ini menugaskan:
Nama: ${data.nama || "[Nama Lengkap]"}
Jabatan: ${data.jabatan || "[Jabatan]"}

Untuk melaksanakan tugas:
${data.tugas || "[Deskripsi Tugas]"}

Tugas tersebut dilaksanakan terhitung mulai tanggal ${data.tanggal_mulai || "[Tanggal Mulai]"} sampai dengan tanggal ${data.tanggal_selesai || "[Tanggal Selesai]"}.

Demikian surat tugas ini dibuat untuk dilaksanakan dengan penuh tanggung jawab.

${tanggalSurat}

Pimpinan ${data.instansi || "[Nama Instansi]"}


_________________________`;
  },
  rekomendasi: (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT REKOMENDASI

Yang bertanda tangan di bawah ini:
Nama: ${data.nama_rekomendasi || "[Nama Pemberi Rekomendasi]"}
Jabatan: ${data.jabatan || "[Jabatan]"}

Dengan ini memberikan rekomendasi kepada:
Nama: ${data.nama_terrekomendasi || "[Nama yang Direkomendasikan]"}

Untuk: ${data.tujuan || "[Tujuan Rekomendasi]"}

Bahwa berdasarkan pengetahuan saya, yang bersangkutan adalah seorang yang memiliki kualifikasi dan kemampuan sebagai berikut:

${data.isi_rekomendasi || "[Isi Rekomendasi]"}

Demikian surat rekomendasi ini saya buat dengan sebenar-benarnya dan dapat dipergunakan sebagaimana mestinya.

${tanggalSurat}


${data.nama_rekomendasi || "[Nama Pemberi Rekomendasi]"}
${data.jabatan || "[Jabatan]"}`;
  },
  "belum-menikah": (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT PERNYATAAN BELUM MENIKAH

Saya yang bertanda tangan di bawah ini:
Nama: ${data.nama || "[Nama Lengkap]"}
NIK: ${data.nik || "[NIK]"}
Tempat/Tanggal Lahir: ${data.tempat_lahir || "[Tempat Lahir]"}, ${data.tanggal_lahir || "[Tanggal Lahir]"}
Pekerjaan: ${data.pekerjaan || "[Pekerjaan]"}
Alamat: ${data.alamat || "[Alamat]"}

Dengan ini menyatakan dengan sebenar-benarnya bahwa sampai dengan saat ini saya belum pernah menikah dan tidak sedang dalam ikatan pernikahan dengan pihak manapun.

Apabila pernyataan ini tidak benar, saya bersedia menanggung segala konsekuensi hukum yang berlaku.

${tanggalSurat}


${data.nama || "[Nama Lengkap]"}
Meterai Rp 10.000`;
  },
  kesehatan: (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT KETERANGAN SEHAT

Nomor: .../SKS/${new Date().getMonth() + 1}/${new Date().getFullYear()}

Yang bertanda tangan di bawah ini, dokter yang praktik di fasilitas kesehatan, dengan ini menerangkan bahwa:

Nama: ${data.nama || "[Nama Lengkap]"}
NIK: ${data.nik || "[NIK]"}
Tanggal Lahir: ${data.tanggal_lahir || "[Tanggal Lahir]"}

Setelah dilakukan pemeriksaan, yang bersangkutan dinyatakan dalam keadaan SEHAT dan tidak memiliki keluhan penyakit yang berarti.

Surat keterangan ini dikeluarkan untuk keperluan: ${data.keperluan || "[Keperluan]"}

Demikian surat keterangan ini dibuat untuk dapat dipergunakan sebagaimana mestinya.

${tanggalSurat}

Dokter Pemeriksa,


_________________________
dr. ________________
SIP: ________________`;
  },
  "bebas-narkoba": (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT KETERANGAN BEBAS NARKOBA

Nomor: .../SKBN/${new Date().getMonth() + 1}/${new Date().getFullYear()}

Yang bertanda tangan di bawah ini, dokter yang praktik di fasilitas kesehatan, dengan ini menerangkan bahwa:

Nama: ${data.nama || "[Nama Lengkap]"}
NIK: ${data.nik || "[NIK]"}
Tanggal Lahir: ${data.tanggal_lahir || "[Tanggal Lahir]"}
Alamat: ${data.alamat || "[Alamat]"}

Setelah dilakukan pemeriksaan/tes urine pada tanggal ${tanggalSurat}, hasil menunjukkan bahwa yang bersangkutan NEGATIF mengandung zat narkotika, psikotropika, dan zat adiktif lainnya.

Surat keterangan ini dikeluarkan untuk keperluan: ${data.keperluan || "[Keperluan]"}

Demikian surat keterangan ini dibuat untuk dapat dipergunakan sebagaimana mestinya.

${tanggalSurat}

Dokter Pemeriksa,


_________________________
dr. ________________
SIP: ________________`;
  },
  "izin-kuliah": (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `Kepada Yth.
Dekan/Wakil Dekan
Fakultas ${data.prodi || "[Program Studi]"}
${data.universitas || "[Nama Universitas]"}

Dengan hormat,

Saya yang bertanda tangan di bawah ini:
Nama: ${data.nama_mahasiswa || "[Nama Mahasiswa]"}
NIM: ${data.nim || "[NIM]"}
Program Studi: ${data.prodi || "[Program Studi]"}
Semester: ${data.semester || "[Semester]"}

Dengan ini memohon izin untuk tidak mengikuti kegiatan perkuliahan pada tanggal ${data.tanggal || "[Tanggal]"}.

Dikarenakan: ${data.alasan || "[Alasan Izin]"}.

Demikian surat izin ini saya buat dengan sebenar-benarnya. Atas perhatian dan kebijaksanaan Bapak/Ibu, saya ucapkan terima kasih.

Hormat saya,


${data.nama_mahasiswa || "[Nama Mahasiswa]"}
NIM: ${data.nim || "[NIM]"}
${tanggalSurat}`;
  },
  "izin-kerja": (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `Kepada Yth.
HRD Manager / Pimpinan
${data.perusahaan || "[Nama Perusahaan]"}

Dengan hormat,

Saya yang bertanda tangan di bawah ini:
Nama: ${data.nama || "[Nama Lengkap]"}
Jabatan: ${data.jabatan || "[Jabatan]"}

Dengan ini memohon izin untuk tidak masuk kerja pada:
Tanggal mulai: ${data.tanggal_mulai || "[Tanggal Mulai]"}
Tanggal selesai: ${data.tanggal_selesai || "[Tanggal Selesai]"}

Dikarenakan: ${data.alasan || "[Alasan Izin]"}.

Selama izin tersebut, saya akan memastikan bahwa tugas-tugas saya dapat terhandle dengan baik oleh rekan kerja atau atasan saya.

Demikian surat izin ini saya buat dengan sebenar-benarnya. Atas perhatian dan kebijaksanaan Bapak/Ibu, saya ucapkan terima kasih.

Hormat saya,


${data.nama || "[Nama Lengkap]"}
${data.jabatan || "[Jabatan]"}
${tanggalSurat}`;
  },
  "kuasa-bpkb": (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT KUASA PENGAMBILAN BPKB

Yang bertanda tangan di bawah ini:
Nama: ${data.pemberi_kuasa || "[Nama Pemberi Kuasa]"}
NIK: ${data.nik_pemberi || "[NIK Pemberi Kuasa]"}
Alamat: ${data.alamat_pemberi || "[Alamat Pemberi Kuasa]"}

Dengan ini memberikan kuasa kepada:
Nama: ${data.penerima_kuasa || "[Nama Penerima Kuasa]"}
NIK: ${data.nik_penerima || "[NIK Penerima Kuasa]"}
Alamat: ${data.alamat_penerima || "[Alamat Penerima Kuasa]"}

Untuk mengambil dan menerima BPKB dengan data sebagai berikut:
Nomor BPKB: ${data.no_bpkb || "[Nomor BPKB]"}
Nomor Polisi: ${data.no_polisi || "[Nomor Polisi]"}

Demikian surat kuasa ini dibuat dengan sebenar-benarnya untuk dipergunakan sebagaimana mestinya.

${tanggalSurat}

Pemberi Kuasa,                    Penerima Kuasa,


${data.pemberi_kuasa || "[Nama Pemberi Kuasa]"}       ${data.penerima_kuasa || "[Nama Penerima Kuasa]"}
Meterai Rp 10.000`;
  },
  "keterangan-usaha": (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT KETERANGAN USAHA

Yang bertanda tangan di bawah ini, Kepala Desa/Kelurahan, dengan ini menerangkan bahwa:

Nama: ${data.nama || "[Nama Lengkap]"}
NIK: ${data.nik || "[NIK]"}
Alamat: ${data.alamat || "[Alamat]"}

Benar yang bersangkutan memiliki usaha dengan data sebagai berikut:
Jenis Usaha: ${data.jenis_usaha || "[Jenis Usaha]"}
Alamat Usaha: ${data.alamat_usaha || "[Alamat Usaha]"}
Lama Usaha: ${data.lama_usaha || "[Lama Usaha]"}

Surat keterangan ini dibuat untuk keperluan administrasi dan dapat dipergunakan sebagaimana mestinya.

${tanggalSurat}

Kepala Desa/Kelurahan


_________________________`;
  },
  "keterangan-tidak-mampu": (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT KETERANGAN TIDAK MAMPU

Yang bertanda tangan di bawah ini, Kepala Desa/Kelurahan, dengan ini menerangkan bahwa:

Nama: ${data.nama || "[Nama Lengkap]"}
NIK: ${data.nik || "[NIK]"}
Alamat: ${data.alamat || "[Alamat]"}
Pekerjaan: ${data.pekerjaan || "[Pekerjaan]"}
Penghasilan per Bulan: ${data.penghasilan || "[Penghasilan]"}

Benar yang bersangkutan adalah warga kami yang termasuk dalam kategori keluarga kurang mampu / tidak mampu.

Surat keterangan ini dibuat untuk keperluan: ${data.keperluan || "[Keperluan]"}.

Demikian surat keterangan ini dibuat dengan sebenar-benarnya dan dapat dipergunakan sebagaimana mestinya.

${tanggalSurat}

Kepala Desa/Kelurahan


_________________________`;
  },
  "pengunduran-diri": (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT PENGUNDURAN DIRI

Kepada Yth.
HRD Manager
${data.perusahaan || "[Nama Perusahaan]"}

Dengan hormat,

Saya yang bertanda tangan di bawah ini:
Nama: ${data.nama || "[Nama Lengkap]"}
Jabatan: ${data.jabatan || "[Jabatan]"}
NIP/NIK: ${data.nip_nik || "[NIP/NIK]"}
Tanggal Masuk: ${data.tanggal_masuk || "[Tanggal Masuk]"}

Dengan ini mengajukan pengunduran diri dari jabatan saya sebagai ${data.jabatan || "[Jabatan]"} di ${data.perusahaan || "[Nama Perusahaan]"}, terhitung efektif per tanggal ${data.tanggal_berhenti || "[Tanggal Berhenti]"}.

${data.alasan ? `Alasan pengunduran diri ini adalah ${data.alasan}.` : "Alasan pengunduran diri ini adalah untuk kepentingan pengembangan pribadi saya selanjutnya."}

Saya bersedia melaksanakan serah terima tugas dan tanggung jawab saya kepada pihak yang ditunjuk oleh perusahaan. Saya mengucapkan terima kasih atas kesempatan, bimbingan, dan pengalaman yang telah diberikan selama bekerja di perusahaan ini.

Demikian surat pengunduran diri ini saya buat dengan sebenar-benarnya dan tanpa ada paksaan dari pihak manapun.

${tanggalSurat}

Hormat saya,


${data.nama || "[Nama Lengkap]"}
${data.jabatan || "[Jabatan]"}
NIP/NIK: ${data.nip_nik || "[NIP/NIK]"}`;
  },
  "kuasa-rekening": (data) => {
    const tanggalSurat = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `SURAT KUASA PENGELOLAAN REKENING

Yang bertanda tangan di bawah ini:
Nama: ${data.pemberi_kuasa || "[Nama Pemberi Kuasa]"}
NIK: ${data.nik_pemberi || "[NIK Pemberi Kuasa]"}
Alamat: ${data.alamat_pemberi || "[Alamat Pemberi Kuasa]"}

Dengan ini memberikan kuasa kepada:
Nama: ${data.penerima_kuasa || "[Nama Penerima Kuasa]"}
NIK: ${data.nik_penerima || "[NIK Penerima Kuasa]"}
Alamat: ${data.alamat_penerima || "[Alamat Penerima Kuasa]"}

Untuk melakukan pengelolaan atas rekening bank saya dengan data sebagai berikut:
Nama Bank: ${data.nama_bank || "[Nama Bank]"}
Nomor Rekening: ${data.no_rekening || "[Nomor Rekening]"}

Ruang lingkup kuasa yang diberikan meliputi:
1. Melakukan pengecekan saldo rekening
2. Melakukan penarikan dana (withdrawal)
3. Melakukan transfer dana
4. Melakukan penyetoran dana
5. Mendapatkan cetak mutasi/rekening koran

Surat kuasa ini berlaku sejak tanggal ditandatangani dan dapat dicabut sewaktu-waktu oleh pemberi kuasa dengan pemberitahuan tertulis kepada pihak bank.

Demikian surat kuasa ini dibuat dengan sebenar-benarnya untuk dipergunakan sebagaimana mestinya.

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

  const handleAiGenerate = async (quickPrompt?: string) => {
    const instruction = (quickPrompt || aiPrompt).trim() || "Buatkan surat resmi yang rapi, sopan, dan siap dipakai.";
    setIsAiGenerating(true);
    setShowPreview(true);

    // Build context from form data
    const context = Object.entries(formData)
      .filter(([, v]) => v.trim())
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    const fullPrompt = `Buatkan ${title} dengan data berikut:
${context ? context + "\n\n" : ""}
Instruksi tambahan: ${instruction}

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
                      placeholder="Opsional: tulis gaya/tujuan khusus, contoh: lebih formal untuk HRD..."
                      rows={3}
                      className="w-full px-3 py-2.5 text-sm bg-surface border border-border rounded-lg text-ink placeholder:text-ink-muted focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 resize-none"
                    />
                    <div className="flex flex-wrap gap-2">
                      {["Buat lebih formal", "Buat singkat", "Buat sopan dan hangat"].map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => handleAiGenerate(q)}
                          disabled={isAiGenerating}
                          className="rounded-full border border-purple-200 px-3 py-1 text-xs text-purple-700 hover:bg-purple-50 disabled:opacity-50"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => handleAiGenerate()}
                      disabled={isAiGenerating}
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

        <AiInsightBox
          title="AI Surat Assistant"
          description="Minta AI bantu perbaiki bahasa, format, atau isi surat Anda."
          placeholder="Contoh: tolong perbaiki bahasa surat ini agar lebih formal..."
          buttonLabel="Minta Saran AI"
          context={slug === "pengunduran-diri" || slug === "resign" ? "User sedang buat surat pengunduran diri. Sarankan cara profesional & sopan." : slug === "lamaran-kerja" ? "User sedang buat surat lamaran kerja. Bantu personalisasi & perkuat motivasi." : `User sedang buat surat: ${title}. Beri saran perbaikan format & bahasa.`}
          system="Anda adalah ahli administrasi & HRD. Bantu user menulis surat resmi yang profesional, sopan, dan sesuai format Indonesia."
        />
      </div>
    </div>
  );
}
