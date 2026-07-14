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
  "/gaji/pesangon": [
    { q: "Bagaimana cara menghitung pesangon PHK?", a: "Pesangon terdiri dari Uang Pesangon (UP), Uang Penghargaan Masa Kerja (UPMK), dan Uang Penggantian Hak (UPH). Besarannya berdasarkan masa kerja dikali faktor pengali sesuai jenis PHK menurut PP 35/2021." },
    { q: "Berapa pesangon untuk masa kerja 4 tahun?", a: "Masa kerja 4 tahun mendapat Uang Pesangon 5 bulan upah + UPMK 2 bulan upah. Totalnya dikali faktor pengali sesuai alasan PHK (misal efisiensi cegah kerugian pakai faktor 1×)." },
    { q: "Apakah semua PHK dapat pesangon yang sama?", a: "Tidak. Faktor pengali berbeda tiap jenis PHK: efisiensi karena rugi 0,5×, pensiun 1,75×, meninggal/sakit berkepanjangan 2×. Perjanjian kerja/PKB bisa mengatur lebih besar." },
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
  "/foto/ganti-background": [
    { q: "Apakah foto saya aman saat ganti background?", a: "Ya. Seluruh proses pemisahan objek dan penggantian latar berjalan di browser kamu, foto tidak diupload ke server mana pun." },
    { q: "Warna background apa saja yang tersedia?", a: "Tersedia merah, biru, putih, dan abu-abu — warna yang paling umum disyaratkan untuk pas foto lamaran kerja dan dokumen resmi." },
    { q: "Kenapa proses pertama agak lama?", a: "Saat pertama dipakai, sistem mengunduh model AI pemisah objek ke browser. Setelah itu prosesnya jauh lebih cepat. Gunakan koneksi yang stabil." },
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
  "/cv/ats": [
    { q: "Apa itu CV ATS dan kenapa penting?", a: "ATS (Applicant Tracking System) adalah software yang dipakai perusahaan untuk menyaring CV otomatis sebelum dibaca HRD. CV ATS-friendly memakai format sederhana, teks bisa dibaca mesin, dan menghindari tabel, kolom, atau grafik yang bikin sistem gagal memindai." },
    { q: "Bagaimana cara bikin CV yang lolos screening ATS?", a: "Gunakan format satu kolom, font standar, heading jelas (Pengalaman, Pendidikan, Skill), dan sisipkan kata kunci dari deskripsi lowongan. Generator ini otomatis menyusun CV dalam struktur yang mudah dibaca ATS." },
    { q: "Apakah tool CV ATS ini gratis?", a: "Ya, gratis dan tanpa perlu daftar akun. Kamu bisa langsung isi data dan unduh CV dalam format yang ramah ATS." },
  ],
  "/cv/contoh-surat-lamaran": [
    { q: "Apa saja yang harus ada di surat lamaran kerja?", a: "Surat lamaran umumnya berisi tempat dan tanggal, tujuan (nama perusahaan/HRD), salam pembuka, posisi yang dilamar, data diri singkat, alasan melamar, lampiran, dan penutup dengan tanda tangan. Generator ini menyusun semua bagian itu secara rapi." },
    { q: "Apa bedanya surat lamaran dengan CV?", a: "Surat lamaran adalah pengantar formal yang menjelaskan posisi yang dilamar dan alasanmu, sedangkan CV memuat rincian data diri, pendidikan, dan pengalaman. Keduanya biasanya dikirim bersamaan." },
    { q: "Apakah bisa bikin surat lamaran gratis di sini?", a: "Bisa, gratis dan tanpa registrasi. Isi datanya, pilih contoh yang sesuai, lalu unduh surat lamaran siap kirim." },
  ],
  "/cv/cover-letter": [
    { q: "Apa beda cover letter dengan surat lamaran biasa?", a: "Cover letter cenderung lebih personal dan menceritakan value serta pencapaianmu untuk meyakinkan perekrut, sering dipakai untuk perusahaan modern atau lamaran berbahasa Inggris. Surat lamaran formal lebih baku dan struktural sesuai standar Indonesia." },
    { q: "Berapa panjang ideal sebuah cover letter?", a: "Cukup satu halaman atau sekitar 3-4 paragraf: pembuka, kenapa kamu cocok, kontribusi yang bisa diberikan, dan penutup ajakan wawancara. Ringkas tapi menonjolkan nilai jual." },
    { q: "Apakah template cover letter ini bisa dipakai gratis?", a: "Ya, semua template gratis dipakai tanpa daftar. Tinggal sesuaikan isinya dengan posisi yang kamu incar." },
  ],
  "/cv/cv-admin": [
    { q: "Skill apa yang perlu ditonjolkan di CV admin?", a: "Tonjolkan kemampuan Microsoft Office (Word, Excel), pengarsipan dokumen, ketelitian, input data, komunikasi, dan manajemen jadwal. Cantumkan juga pengalaman menangani surat-menyurat atau administrasi kantor bila ada." },
    { q: "Bagaimana format CV yang cocok untuk posisi administrasi?", a: "Gunakan format bersih dan terstruktur yang mencerminkan kerapian, karena posisi admin menuntut ketelitian. Susun bagian data diri, pengalaman, pendidikan, dan skill secara ringkas dan mudah dibaca." },
    { q: "Apakah bikin CV admin di sini berbayar?", a: "Gratis dan tanpa registrasi. Isi data lalu unduh CV yang sudah disesuaikan untuk lamaran posisi admin." },
  ],
  "/cv/cv-bumn": [
    { q: "Apa yang membedakan CV untuk lamaran BUMN?", a: "Lamaran BUMN umumnya menuntut CV yang formal, lengkap, dan detail — mencakup data diri, riwayat pendidikan dengan IPK, pengalaman, sertifikasi, dan organisasi. Rekrutmen BUMN (misalnya via portal FHCI/Rekrutmen Bersama) juga sering menekankan kelengkapan dokumen." },
    { q: "Apakah IPK wajib dicantumkan di CV BUMN?", a: "Sangat disarankan, karena banyak lowongan BUMN menetapkan syarat IPK minimum. Cantumkan IPK beserta skala (misalnya 3.50/4.00) agar jelas." },
    { q: "Apakah tool CV BUMN ini gratis?", a: "Ya, gratis dan tanpa perlu membuat akun. Kamu bisa langsung menyusun dan mengunduh CV format yang rapi untuk lamaran BUMN." },
  ],
  "/foto/cpns": [
    { q: "Berapa ukuran dan background foto untuk pendaftaran CPNS?", a: "Pendaftaran CPNS lewat SSCASN umumnya mensyaratkan pasfoto formal dengan latar belakang merah dalam format dan ukuran file tertentu. Selalu cek pengumuman resmi SSCASN untuk detail terbaru, lalu sesuaikan fotomu dengan tool ini." },
    { q: "Apakah foto CPNS saya aman diunggah di tool ini?", a: "Aman, karena semua proses dilakukan langsung di browser perangkatmu. Fotomu tidak diunggah atau disimpan di server mana pun." },
    { q: "Apakah bisa mengatur latar merah dan ukuran sekaligus?", a: "Bisa. Tool ini membantu menyesuaikan latar belakang dan ukuran/rasio foto agar sesuai ketentuan pendaftaran, gratis tanpa daftar." },
  ],
  "/foto/ktp": [
    { q: "Foto seperti apa yang dipakai untuk KTP?", a: "Foto KTP umumnya diambil langsung saat perekaman di kantor Dukcapil, namun untuk keperluan cetak atau berkas administrasi kamu bisa menyiapkan pasfoto formal dengan wajah menghadap kamera dan latar polos. Tool ini membantu merapikan dan menyesuaikan foto tersebut." },
    { q: "Apakah foto saya disimpan di server?", a: "Tidak. Seluruh pemrosesan foto berjalan di browser, jadi gambarmu tetap privat dan tidak pernah dikirim ke server kami." },
    { q: "Apakah gratis menggunakan tool foto KTP ini?", a: "Ya, gratis dan tanpa registrasi. Unggah foto, sesuaikan, lalu unduh hasilnya langsung." },
  ],
  "/foto/resize-2x3": [
    { q: "Berapa ukuran piksel untuk foto 2x3 cm?", a: "Foto 2x3 cm setara sekitar 236×354 piksel pada resolusi 300 DPI. Ukuran ini umum dipakai untuk berkas lamaran, ijazah, atau dokumen administrasi." },
    { q: "Apakah kualitas foto turun setelah di-resize ke 2x3?", a: "Selama foto asli beresolusi cukup, hasil resize tetap tajam untuk dicetak. Tool ini menyesuaikan dimensi tanpa mengunggah gambar ke mana pun." },
    { q: "Apakah resize foto 2x3 ini gratis dan aman?", a: "Gratis, tanpa daftar, dan aman — semua proses berjalan di browser sehingga fotomu tidak tersimpan di server." },
  ],
  "/foto/resize-4x6": [
    { q: "Berapa ukuran piksel foto 4x6 cm?", a: "Foto 4x6 cm setara sekitar 472×709 piksel pada 300 DPI. Ukuran 4x6 sering diminta untuk pasfoto ijazah, lamaran kerja, dan berbagai dokumen resmi." },
    { q: "Bagaimana cara mengubah foto ke ukuran 4x6 dengan cepat?", a: "Cukup unggah foto, lalu tool akan menyesuaikan dimensinya ke rasio 4x6 secara otomatis dan bisa langsung diunduh. Semua proses berlangsung instan di browser." },
    { q: "Apakah foto yang saya unggah aman?", a: "Aman. Pemrosesan dilakukan sepenuhnya di perangkatmu tanpa upload ke server, dan tool ini gratis tanpa perlu akun." },
  ],
  "/foto/snbp": [
    { q: "Apa syarat foto untuk pendaftaran SNBP?", a: "Pendaftaran SNBP melalui portal SNPMB biasanya meminta pasfoto formal terbaru dengan latar polos dalam ukuran dan format file tertentu. Karena ketentuan bisa berubah tiap periode, cek panduan resmi SNPMB lalu sesuaikan fotomu di sini." },
    { q: "Apakah foto SNBP saya diunggah ke server?", a: "Tidak. Seluruh proses penyesuaian foto berjalan di browser, jadi datamu tetap privat dan aman." },
    { q: "Apakah tool foto SNBP ini gratis?", a: "Ya, gratis tanpa daftar. Kamu bisa menyesuaikan ukuran dan latar foto sesuai kebutuhan pendaftaran PTN." },
  ],
  "/gaji/prorata": [
    { q: "Bagaimana cara menghitung gaji prorata?", a: "Gaji prorata dihitung dengan rumus umum: (jumlah hari kerja aktual ÷ total hari kerja sebulan) × gaji sebulan. Ini dipakai untuk karyawan yang mulai atau berhenti bekerja di tengah bulan." },
    { q: "Kapan gaji prorata diterapkan?", a: "Biasanya saat karyawan baru masuk di pertengahan bulan, resign sebelum akhir bulan, atau ada perubahan status kerja. Gajinya disesuaikan proporsional dengan hari kerja yang benar-benar dijalani." },
    { q: "Apakah kalkulator gaji prorata ini gratis?", a: "Ya, gratis dan tanpa daftar. Masukkan gaji dan jumlah hari kerja, hasil perhitungannya muncul otomatis." },
  ],
  "/gaji/umr": [
    { q: "Apa itu UMR, UMP, dan UMK?", a: "UMR adalah istilah lama untuk upah minimum regional; sekarang resmi disebut UMP (Upah Minimum Provinsi) dan UMK (Upah Minimum Kabupaten/Kota). Besarannya ditetapkan pemerintah daerah dan diperbarui setiap tahun." },
    { q: "Apakah UMR sama di semua daerah?", a: "Tidak. Setiap provinsi dan kabupaten/kota punya angka upah minimum berbeda, tergantung kondisi ekonomi dan biaya hidup setempat. Daftar ini membantumu membandingkan antar wilayah." },
    { q: "Apakah daftar UMR ini bisa diakses gratis?", a: "Ya, gratis tanpa perlu daftar. Kamu bisa langsung melihat daftar upah minimum per daerah kapan saja." },
  ],
  "/keuangan/cek-npwp": [
    { q: "Berapa digit NPWP yang benar?", a: "NPWP format lama terdiri dari 15 digit, sedangkan format baru menggunakan NIK 16 digit sejak integrasi data oleh DJP. Tool ini bisa memeriksa keduanya." },
    { q: "Kenapa NPWP saya sekarang jadi 16 digit?", a: "Sejak DJP mengintegrasikan NPWP dengan NIK, wajib pajak orang pribadi memakai NIK 16 digit sebagai NPWP. Nomor 15 digit lama tetap valid untuk badan dan sebagian keperluan." },
    { q: "Apakah cek NPWP di sini gratis dan tanpa daftar?", a: "Ya, alat ini gratis dipakai tanpa perlu registrasi. Tool hanya memvalidasi format angka NPWP, bukan status pajaknya di sistem DJP." },
  ],
  "/keuangan/investasi": [
    { q: "Bagaimana cara menghitung hasil investasi jangka panjang?", a: "Kalkulator ini memakai konsep bunga majemuk (compound interest), di mana hasil tiap periode ikut menghasilkan bunga lagi. Kamu tinggal isi modal awal, setoran rutin, imbal hasil, dan lama waktu." },
    { q: "Apa itu bunga majemuk dan kenapa penting?", a: "Bunga majemuk adalah bunga yang dihitung dari pokok plus akumulasi bunga sebelumnya, sehingga pertumbuhan jadi makin cepat seiring waktu. Inilah alasan investasi jangka panjang bisa berkembang signifikan." },
    { q: "Apakah kalkulator investasi ini gratis?", a: "Gratis dan tanpa daftar. Angka yang muncul adalah proyeksi berdasarkan asumsi imbal hasil yang kamu masukkan, bukan jaminan hasil pasti." },
  ],
  "/pdf/foto-ke-pdf": [
    { q: "Bagaimana cara mengubah beberapa foto jadi satu PDF?", a: "Cukup pilih atau seret gambarnya, atur urutan sesuai keinginan, lalu satukan menjadi satu file PDF. Cocok untuk menggabungkan hasil scan atau dokumen foto." },
    { q: "Apakah foto saya aman saat diubah ke PDF?", a: "Aman, seluruh proses berjalan langsung di browser dan file tidak diunggah ke server mana pun. Foto kamu tetap privat di perangkat sendiri." },
    { q: "Format gambar apa saja yang didukung?", a: "Umumnya mendukung format populer seperti JPG dan PNG. Gratis dipakai tanpa perlu registrasi." },
  ],
  "/pdf/halaman": [
    { q: "Bisakah saya menghapus atau menyusun ulang halaman PDF?", a: "Bisa. Tool ini memungkinkan kamu menghapus halaman tertentu, mengubah urutan, atau merapikan susunan halaman dalam satu dokumen PDF." },
    { q: "Apakah dokumen PDF saya diunggah ke server?", a: "Tidak. Semua pengaturan halaman diproses di dalam browser, jadi dokumenmu tetap aman dan privat tanpa pernah dikirim ke server." },
    { q: "Apakah alat atur halaman PDF ini berbayar?", a: "Gratis dan tanpa daftar. Kamu bisa langsung merapikan halaman PDF tanpa memasang aplikasi tambahan." },
  ],
  "/pdf/pdf-ke-word": [
    { q: "Bagaimana cara mengubah PDF jadi Word yang bisa diedit?", a: "Unggah file PDF-mu, lalu tool akan mengonversinya menjadi dokumen Word (DOCX) yang bisa kamu edit kembali. Praktis untuk merevisi teks tanpa mengetik ulang." },
    { q: "Apakah file PDF saya aman saat dikonversi?", a: "Ya, konversi diproses langsung di browser tanpa mengunggah file ke server, sehingga isi dokumenmu tetap privat." },
    { q: "Apakah hasil konversi mempertahankan format asli?", a: "Tool berusaha mempertahankan teks dan tata letak semirip mungkin, meski PDF dengan layout rumit terkadang perlu sedikit perapihan. Gratis dan tanpa registrasi." },
  ],
  "/pdf/word-ke-pdf": [
    { q: "Bagaimana cara mengubah dokumen Word menjadi PDF?", a: "Pilih file DOC atau DOCX-mu, lalu tool akan mengubahnya menjadi PDF yang siap dibagikan atau dicetak. Format dan tata letak dokumen tetap terjaga." },
    { q: "Kenapa sebaiknya kirim dokumen dalam bentuk PDF?", a: "PDF menjaga tampilan dokumen tetap konsisten di semua perangkat dan sulit diubah tanpa sengaja, jadi cocok untuk lampiran resmi." },
    { q: "Apakah konversi Word ke PDF ini aman dan gratis?", a: "Gratis tanpa daftar, dan file diproses di browser sehingga tidak diunggah ke server. Dokumenmu tetap aman dan privat." },
  ],
  "/pendidikan/kalender": [
    { q: "Di mana bisa lihat jadwal semester dan hari libur sekolah?", a: "Kalender akademik ini menampilkan tanggal penting seperti awal-akhir semester, libur sekolah, dan hari-hari khusus pendidikan di Indonesia dalam satu tampilan." },
    { q: "Apa saja yang ada di kalender akademik?", a: "Isinya mencakup pembagian semester ganjil dan genap, jadwal libur nasional, serta tanggal penting akademik lain yang berguna bagi siswa, guru, dan orang tua." },
    { q: "Apakah kalender akademik ini gratis diakses?", a: "Gratis dan tanpa daftar. Jadwal resmi tiap sekolah atau daerah bisa sedikit berbeda, jadi selalu cek pengumuman dari instansi terkait sebagai acuan final." },
  ],
  "/surat/dinas": [
    { q: "Bagaimana cara membuat surat dinas resmi dengan cepat?", a: "Isi bagian seperti nomor surat, perihal, tujuan, dan isi surat, lalu generator akan menyusunnya dalam format surat dinas yang rapi dan siap cetak." },
    { q: "Apa saja bagian penting dalam surat dinas?", a: "Surat dinas umumnya memuat kop, nomor surat, tanggal, perihal, alamat tujuan, isi, serta tanda tangan dan jabatan pengirim. Tool ini membantu merapikan semuanya." },
    { q: "Apakah generator surat dinas ini gratis?", a: "Gratis dan tanpa daftar. Kamu bisa langsung menyusun surat resmi tanpa perlu membuat template dari nol." },
  ],
  "/umkm/caption": [
    { q: "Bagaimana cara bikin caption jualan yang menarik untuk sosial media?", a: "Masukkan nama produk dan poin jualannya, lalu generator akan membuatkan caption yang siap tempel untuk Instagram, Facebook, atau TikTok. Cocok buat UMKM yang ingin promosi cepat." },
    { q: "Apakah caption yang dibuat bisa disesuaikan?", a: "Bisa, kamu tinggal edit hasilnya agar sesuai gaya brand dan tambahkan tagar atau ajakan sesuai kebutuhan. Ide dasarnya sudah disiapkan untuk kamu." },
    { q: "Apakah generator caption ini gratis dipakai?", a: "Gratis dan tanpa daftar. Kamu bisa membuat banyak variasi caption jualan sesukanya untuk kebutuhan promosi UMKM." },
  ],
  "/umkm/catatan": [
    { q: "Bagaimana cara mencatat pemasukan dan pengeluaran usaha?", a: "Cukup masukkan setiap transaksi pemasukan dan pengeluaran, lalu tool otomatis menghitung selisihnya agar kamu tahu untung atau rugi. Praktis untuk pembukuan sederhana UMKM." },
    { q: "Kenapa UMKM perlu mencatat keuangan harian?", a: "Catatan keuangan membantu kamu memisahkan uang usaha dari uang pribadi dan melihat arus kas dengan jelas, sehingga keputusan bisnis jadi lebih terukur." },
    { q: "Apakah catatan keuangan ini gratis?", a: "Gratis dan tanpa daftar. Cocok untuk pelaku UMKM yang butuh pembukuan ringkas tanpa aplikasi akuntansi yang rumit." },
  ],
  "/umkm/food-cost": [
    { q: "Berapa persen food cost yang ideal untuk usaha makanan?", a: "Sebagai rule of thumb industri F&B, food cost yang sehat umumnya berkisar 25-35% dari harga jual. Di atas itu margin bisa tipis, sedangkan terlalu rendah bisa membuat harga kurang bersaing." },
    { q: "Bagaimana cara menghitung food cost?", a: "Bagi total biaya bahan baku dengan harga jual, lalu kalikan 100% untuk mendapat persentase food cost. Tool ini menghitungnya otomatis begitu kamu isi biaya bahan dan harga jual." },
    { q: "Apakah kalkulator food cost ini gratis?", a: "Gratis dan tanpa daftar. Kamu bisa langsung cek apakah harga jual menu sudah menutup biaya bahan dengan margin yang sehat." },
  ],
  "/umkm/margin-marketplace": [
    { q: "Bagaimana cara hitung untung setelah potongan marketplace?", a: "Masukkan harga jual, modal, dan biaya-biaya marketplace, lalu tool menghitung margin bersih yang benar-benar kamu terima. Membantu memastikan jualan online tetap untung." },
    { q: "Berapa biaya admin di Shopee atau Tokopedia?", a: "Biaya admin bervariasi tergantung kategori produk dan program yang diikuti, seperti gratis ongkir atau promo lainnya. Karena itu sebaiknya cek tarif terbaru di masing-masing platform dan masukkan ke kalkulator." },
    { q: "Apakah kalkulator margin marketplace ini gratis?", a: "Gratis dan tanpa daftar. Cocok untuk seller yang ingin menentukan harga jual agar tetap cuan setelah semua potongan biaya marketplace." },
  ],
};

export function getToolFaq(path: string): FaqItem[] {
  return toolFaq[path] || [];
}
