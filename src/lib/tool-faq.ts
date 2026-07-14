// FAQ per tool — powers both visible accordion + FAQPage JSON-LD (rich snippet di Google).
// Google butuh FAQ visible di halaman agar schema valid, jadi keduanya dari sumber yang sama.
export interface FaqItem {
  q: string;
  a: string;
}

export const toolFaq: Record<string, FaqItem[]> = {
  "/gaji/bersih": [
    { q: "Apakah kalkulator gaji bersih ini gratis?", a: "Ya, sepenuhnya gratis tanpa perlu daftar atau login. Masukkan gaji, status PTKP, dan tanggungan, hasil langsung tampil." },
    { q: "Apa saja yang dipotong dari gaji bruto?", a: "Gaji bersih dihitung setelah dipotong PPh 21, BPJS Kesehatan (1%), dan BPJS Ketenagakerjaan (JHT 2% + JP 1%), serta biaya jabatan." },
    { q: "Apakah hasilnya akurat sesuai aturan 2026?", a: "Kalkulator memakai parameter PTKP, tarif TER, dan iuran BPJS terbaru. Hasil bersifat estimasi; untuk kepastian konsultasikan dengan HRD atau ahli pajak." },
  ],
  "/gaji/pph21": [
    { q: "Apa itu metode TER pada PPh 21?", a: "TER (Tarif Efektif Rata-rata) adalah metode perhitungan PPh 21 bulanan sejak Januari 2024 (PMK-168/2023). Potongan Januari–November pakai tarif tetap sesuai kategori penghasilan." },
    { q: "Apakah kalkulator PPh 21 ini gratis?", a: "Ya, gratis dan tanpa registrasi. Masukkan penghasilan dan status PTKP, hasil potongan PPh 21 langsung tampil." },
    { q: "Kenapa PPh 21 bulan Desember berbeda?", a: "Desember memakai metode koreksi tahunan: total penghasilan setahun dihitung ulang dengan tarif progresif, lalu dikurangi PPh 21 yang sudah dipotong sebelumnya." },
  ],
  "/gaji/bpjs": [
    { q: "Berapa iuran BPJS Kesehatan yang dipotong dari karyawan?", a: "Karyawan membayar 1% dari gaji pokok + tunjangan tetap, perusahaan menanggung 4%. Total 5% dengan batas dasar gaji Rp12 juta." },
    { q: "Apa saja komponen BPJS Ketenagakerjaan?", a: "Terdiri dari JHT (Jaminan Hari Tua 2% karyawan), JP (Jaminan Pensiun 1% karyawan), plus JKK dan JKM yang ditanggung perusahaan." },
  ],
  "/gaji/thr": [
    { q: "Berapa THR untuk karyawan yang belum setahun bekerja?", a: "THR dihitung proporsional: (masa kerja dalam bulan ÷ 12) × 1 bulan gaji. Karyawan minimal 1 bulan kerja berhak menerima THR." },
    { q: "Apakah karyawan kontrak dan harian dapat THR?", a: "Ya. Karyawan tetap, kontrak (PKWT), maupun harian lepas yang sudah bekerja minimal 1 bulan berhak atas THR sesuai aturan Kemnaker." },
  ],
  "/gaji/lembur": [
    { q: "Bagaimana rumus upah lembur menurut UU?", a: "Upah lembur = 1/173 × gaji sebulan × faktor pengali. Jam pertama 1,5×, jam berikutnya 2×; berbeda untuk lembur di hari libur." },
    { q: "Apakah semua karyawan berhak uang lembur?", a: "Karyawan dengan jabatan tertentu (golongan pemikir/perencana) bisa dikecualikan. Selebihnya berhak upah lembur sesuai perhitungan Kepmenaker." },
  ],
  "/keuangan/kpr": [
    { q: "Apa beda bunga KPR fixed dan floating?", a: "Fixed: bunga tetap selama periode tertentu, cicilan stabil. Floating: bunga mengikuti pasar, cicilan bisa naik-turun. Umumnya fixed di awal lalu floating." },
    { q: "Apakah simulasi ini mengikat ke bank?", a: "Tidak. Ini simulasi estimasi cicilan untuk perencanaan. Angka final tetap mengikuti penawaran resmi bank." },
  ],
  "/keuangan/pinjol": [
    { q: "Bagaimana cara tahu pinjol legal atau ilegal?", a: "Cek apakah terdaftar di daftar penyelenggara fintech lending berizin OJK. Pinjol legal wajib punya izin OJK dan transparan soal bunga." },
    { q: "Kenapa penting memilih pinjol berizin OJK?", a: "Pinjol ilegal sering menerapkan bunga mencekik, penagihan kasar, dan penyalahgunaan data pribadi. Pinjol berizin OJK diawasi dan wajib patuh aturan." },
  ],
  "/cv/generator": [
    { q: "Apa itu CV ATS-friendly?", a: "CV yang formatnya mudah dibaca sistem ATS (Applicant Tracking System) yang dipakai perusahaan untuk menyaring lamaran. Hindari tabel rumit, grafik, dan foto berlebihan." },
    { q: "Apakah CV bisa langsung diunduh PDF?", a: "Ya. Isi data, pilih template, lalu unduh sebagai PDF. Gratis, tanpa registrasi, dan diproses langsung di browser." },
  ],
  "/cv/fresh-graduate": [
    { q: "Bagaimana membuat CV tanpa pengalaman kerja?", a: "Tonjolkan pendidikan, organisasi, magang, proyek kuliah, dan skill relevan. Gunakan ringkasan profil yang menegaskan potensi dan kemauan belajar." },
    { q: "Apakah fresh graduate perlu CV ATS?", a: "Ya, banyak perusahaan memakai ATS. CV ATS-friendly menaikkan peluang lolos screening awal sebelum dibaca rekruter." },
  ],
  "/foto/resize-3x4": [
    { q: "Apakah foto saya diupload ke server?", a: "Tidak. Seluruh proses resize berjalan di browser, foto tidak dikirim ke server mana pun, jadi aman dan privat." },
    { q: "Berapa ukuran foto 3x4 dalam piksel?", a: "Ukuran 3x4 cm setara sekitar 354×472 piksel pada 300 DPI. Tool otomatis menyesuaikan agar sesuai standar dokumen." },
  ],
  "/foto/kompres": [
    { q: "Sampai berapa kecil ukuran foto bisa dikompres?", a: "Bisa disesuaikan target ukuran (misal 100KB atau 200KB) sambil menjaga kualitas sebaik mungkin. Cocok untuk syarat unggah dokumen online." },
    { q: "Apakah kualitas foto turun setelah dikompres?", a: "Kompresi mengurangi ukuran file dengan penurunan kualitas minimal yang biasanya tidak terlihat untuk kebutuhan dokumen." },
  ],
  "/pdf/gabung": [
    { q: "Berapa banyak file PDF yang bisa digabung?", a: "Kamu bisa menggabungkan beberapa file PDF sekaligus dalam satu proses, lalu unduh hasilnya sebagai satu file." },
    { q: "Apakah file PDF saya aman?", a: "Ya. Proses penggabungan berjalan di browser, file tidak diupload ke server, sehingga dokumen tetap privat." },
  ],
  "/pdf/kompres": [
    { q: "Apakah kompres PDF mengurangi kualitas?", a: "Tool mengecilkan ukuran file dengan menjaga keterbacaan teks dan gambar. Cocok untuk syarat unggah dokumen berukuran maksimal tertentu." },
    { q: "Apakah aman mengompres dokumen penting?", a: "Aman. Proses berjalan di browser tanpa upload ke server, jadi isi dokumen tidak terkirim ke pihak lain." },
  ],
  "/umkm/hpp": [
    { q: "Apa itu HPP (Harga Pokok Produksi)?", a: "HPP adalah total biaya untuk memproduksi satu unit produk, mencakup bahan baku, tenaga kerja, dan biaya overhead. Jadi dasar menentukan harga jual." },
    { q: "Kenapa UMKM perlu hitung HPP?", a: "Tanpa HPP yang benar, harga jual bisa terlalu murah (rugi) atau terlalu mahal (kalah saing). HPP memastikan margin keuntungan sehat." },
  ],
  "/umkm/harga-jual": [
    { q: "Bagaimana cara menentukan harga jual yang tepat?", a: "Harga jual = HPP + margin keuntungan yang diinginkan. Pertimbangkan juga harga pesaing dan daya beli target pasar." },
    { q: "Berapa margin keuntungan yang wajar untuk UMKM?", a: "Bervariasi per industri; umumnya 20–50%. Produk makanan sering 30–60%, sementara barang dagang bisa lebih tipis. Sesuaikan dengan biaya operasional." },
  ],
  "/umkm/invoice": [
    { q: "Apakah invoice ini bisa diunduh dan dikirim?", a: "Ya. Isi data pembeli dan item, lalu unduh invoice sebagai PDF yang siap dikirim ke pelanggan." },
    { q: "Apa saja yang wajib ada di invoice?", a: "Nomor invoice, tanggal, data penjual dan pembeli, rincian barang/jasa, jumlah, total, dan metode pembayaran." },
  ],
};

export function getToolFaq(path: string): FaqItem[] {
  return toolFaq[path] || [];
}
