// expand-short-posts-v2.mjs
// Expand all short blog posts to meet 900+ word minimum
// Run: node scripts/expand-short-posts-v2.mjs

import fs from 'fs';

const blogPath = 'src/data/blog.ts';
const content = fs.readFileSync(blogPath, 'utf8');

// Parse posts
const match = content.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*\]);/);
if (!match) { console.error('Could not parse blog.ts'); process.exit(1); }
const posts = eval(match[1]);

// Category-specific templates with 900+ words
const templates = {
  Surat: (p) => {
    const titleClean = p.title.replace(/\[.*?\]/g, '').trim();
    const suratType = p.slug.replace(/surat-/, '').replace(/-/g, ' ');
    return [
      {
        heading: undefined,
        paragraphs: [
          `${titleClean} bisa dibuat dalam hitungan menit menggunakan generator surat online Toolinter. Kamu cukup pilih template, isi data diri, lalu download surat dalam format PDF. Gratis, tanpa perlu install aplikasi atau daftar akun. Proses seluruhnya berjalan di browser, jadi data pribadi tetap aman dan tidak disimpan di server mana pun.`,
        ]
      },
      {
        heading: `Apa Itu Surat ${suratType.charAt(0).toUpperCase() + suratType.slice(1)}?`,
        paragraphs: [
          `Surat ${suratType} adalah dokumen resmi yang dibutuhkan untuk berbagai keperluan administrasi, baik untuk keperluan pribadi, pekerjaan, maupun urusan instansi. Format yang benar memastikan surat diterima dan diproses dengan baik oleh pihak yang dituju.`,
          `Di Indonesia, surat ${suratType} mengikuti standar penulisan surat resmi yang berlaku umum. Struktur yang benar terdiri dari: identitas pengirim, tanggal dan tempat penulisan, tujuan surat, salam pembuka, isi surat, lampiran (jika ada), salam penutup, dan tanda tangan. Setiap bagian memiliki fungsi masing-masing untuk memastikan surat dapat dipahami dengan jelas oleh penerima.`,
          `Surat yang ditulis dengan format yang benar dan bahasa yang sopan menunjukkan profesionalisme. Sebaliknya, surat dengan format yang salah atau bahasa informal bisa ditolak oleh instansi atau perusahaan. Oleh karena itu, penting untuk memahami struktur yang benar sebelum menulis surat.`,
        ]
      },
      {
        heading: `Kapan Kamu Butuh Surat ${suratType.charAt(0).toUpperCase() + suratType.slice(1)}?`,
        paragraphs: [
          `Ada beberapa situasi umum yang membutuhkan surat ${suratType}:`,
          `• Melamar pekerjaan atau magang di perusahaan swasta maupun BUMN\n• Mengurus administrasi di instansi pemerintah seperti kelurahan, kecamatan, atau dinas terkait\n• Keperluan bank seperti pembukaan rekening, pengajuan kredit, atau verifikasi data\n• Proses rekrutmen atau seleksi CPNS, PPPK, atau rekrutmen BUMN\n• Keperluan pendidikan seperti pendaftaran sekolah, beasiswa, atau magang\n• Keperluan hukum seperti perjanjian, kuasa, atau pernyataan resmi`,
          `Dalam setiap situasi ini, surat yang ditulis dengan format yang benar dan bahasa yang sopan akan meningkatkan peluang diterima. Surat yang asal-asalan atau tidak sesuai format bisa ditolak dan memperpanjang proses administrasi.`,
          `Beberapa instansi memiliki format surat tersendiri. Sebelum menggunakan template dari Toolinter, pastikan format yang kamu gunakan sesuai dengan ketentuan instansi yang dituju. Jika ada format khusus, sesuaikan template Toolinter dengan ketentuan tersebut.`,
        ]
      },
      {
        heading: 'Syarat dan Data yang Perlu Disiapkan',
        paragraphs: [
          `Sebelum membuat surat ${suratType}, siapkan data berikut:`,
          `• Nama lengkap sesuai KTP atau identitas resmi\n• Alamat lengkap sesuai domisili\n• Nomor telepon atau email yang bisa dihubungi\n• Nama dan jabatan pihak yang dituju\n• Nama instansi atau perusahaan tujuan\n• Tanggal yang relevan (tanggal surat, tanggal efektif, dll)\n• Alasan atau tujuan surat yang jelas\n• Lampiran dokumen pendukung jika diperlukan`,
          `Pastikan semua data yang dimasukkan sudah benar dan sesuai. Kesalahan penulisan nama, tanggal, atau tujuan bisa menyebabkan surat ditolak atau perlu diulang.`,
          `Jika surat ditujukan untuk instansi pemerintah, cek apakah ada format khusus atau lampiran wajib yang harus disertakan. Setiap instansi bisa memiliki ketentuan yang berbeda.`,
        ]
      },
      {
        heading: 'Cara Membuat Surat dengan Toolinter',
        paragraphs: [
          `Berikut langkah-langkah membuat surat menggunakan generator Toolinter:`,
          `1. Buka halaman Generator Surat Toolinter.\n2. Pilih template surat ${suratType} dari daftar yang tersedia.\n3. Isi data yang diminta: nama, alamat, tanggal, tujuan, dan informasi lainnya.\n4. Klik "Preview dari Template" untuk melihat hasil surat.\n5. Periksa kembali semua data yang dimasukkan.\n6. Jika sudah sesuai, klik "Download PDF" untuk mengunduh.\n7. Buka file PDF dan cetak di kertas A4.\n8. Tandatangani surat dan tambahkan materai jika diperlukan.`,
          `Proses seluruhnya berjalan langsung di browser. File tidak diunggah ke server, jadi privasi data tetap aman. Kamu juga bisa menggunakan fitur "Buat dengan AI" jika ingin Toolinter membantu menyusun kalimat surat yang lebih profesional.`,
          `Setelah download, cek ulang nama, tanggal, dan tujuan surat sebelum dikirim. Kesalahan kecil bisa menyebabkan surat ditolak oleh pihak yang dituju.`,
        ]
      },
      {
        heading: 'Contoh Struktur Surat',
        paragraphs: [
          `Berikut contoh struktur surat ${suratType} yang benar dan sesuai standar:`,
          `Bagian 1 — Identitas Pengirim:\nNama lengkap, alamat, nomor telepon, dan email. Jika mewakili instansi atau perusahaan, cantumkan nama instansi dan jabatan.`,
          `Bagian 2 — Tanggal dan Tempat:\nTulis nama kota diikuti tanggal, bulan, dan tahun penulisan surat. Contoh: "Jakarta, 26 Juni 2026".`,
          `Bagian 3 — Tujuan Surat:\nNama penerima, jabatan, nama instansi/perusahaan, dan alamat. Gunakan "Kepada Yth." diikuti nama dan jabatan.`,
          `Bagian 4 — Isi Surat:\nJelaskan maksud dan tujuan surat dengan bahasa yang jelas, singkat, dan sopan. Hindari kalimat yang terlalu panjang atau bertele-tele.`,
          `Bagian 5 — Lampiran:\nSebutkan dokumen yang dilampirkan (fotokopi KTP, ijazah, dll) jika diperlukan.`,
          `Bagian 6 — Penutup:\nSalam penutup, nama jelas, dan tanda tangan. Jika untuk instansi, tambahkan cap atau stempel.`,
        ]
      },
      {
        heading: 'Kesalahan Umum yang Harus Dihindari',
        paragraphs: [
          `Beberapa kesalahan yang sering terjadi saat membuat surat ${suratType}:`,
          `• Salah menulis nama pihak yang dituju — pastikan ejaan nama sesuai identitas resmi\n• Tidak mencantumkan tanggal efektif — beberapa instansi memerlukan tanggal spesifik\n• Menggunakan bahasa informal atau tidak sopan — surat resmi harus menggunakan bahasa formal\n• Tidak menyertakan lampiran yang diminta — cek ketentuan instansi sebelum mengirim\n• Format surat tidak sesuai standar instansi — setiap instansi bisa punya format khusus\n• Lupa menandatangani surat — surat tanpa tanda tangan tidak memiliki kekuatan hukum\n• Menggunakan font yang sulit dibaca — gunakan font standar seperti Times New Roman atau Arial\n• Cetak di kertas yang tidak sesuai — gunakan kertas A4 dengan margin 2,5 cm`,
          `Hindari kesalahan ini agar surat kamu diproses dengan lancar dan tidak perlu diulang.`,
        ]
      },
      {
        heading: 'Tips Surat yang Profesional',
        paragraphs: [
          `Beberapa tips untuk membuat surat ${suratType} yang baik dan profesional:`,
          `• Gunakan font standar (Times New Roman atau Arial) ukuran 12 dengan spasi 1,15 atau 1,5\n• Cetak di kertas A4 dengan margin 2,5 cm di setiap sisi\n• Periksa ejaan dan tata bahasa sebelum mengirim\n• Simpan salinan digital untuk arsip pribadi\n• Minta orang lain membaca sebelum mengirim untuk memastikan tidak ada kesalahan\n• Jika dikirim via email, gunakan format PDF agar format tidak berubah\n• Cantumkan kontak yang bisa dihubungi jika ada pertanyaan\n• Gunakan bahasa yang sopan dan profesional, hindari singkatan atau bahasa gaul`,
          `Dengan mengikuti tips ini, surat kamu akan terlihat lebih profesional dan meyakinkan. Surat yang rapi dan benar meningkatkan peluang diterima oleh pihak yang dituju.`,
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          `Q: Apakah surat dari Toolinter bisa langsung dipakai?\nA: Surat dari Toolinter berfungsi sebagai draft yang bisa kamu sesuaikan. Pastikan nama, tanggal, dan tujuan sudah benar sebelum dikirim. Jika instansi memiliki format khusus, sesuaikan template dengan ketentuan tersebut.`,
          `Q: Format file apa yang dihasilkan?\nA: Toolinter menghasilkan surat dalam format PDF yang siap cetak dan kirim. Format PDF memastikan surat tidak berubah tampilan saat dibuka di device berbeda.`,
          `Q: Apakah data saya aman?\nA: Ya, seluruh proses berjalan di browser. Data tidak dikirim ke server atau disimpan di mana pun. Privasi kamu terjaga.`,
          `Q: Bisakah saya mengedit surat setelah download?\nA: PDF yang dihasilkan tidak bisa diedit langsung. Jika perlu mengubah, edit di Toolinter lalu download ulang.`,
          `Q: Apakah ada biaya?\nA: Tidak. Toolinter 100% gratis tanpa watermark dan tanpa perlu daftar akun.`,
        ]
      },
    ];
  },

  Foto: (p) => {
    const titleClean = p.title.replace(/\[.*?\]/g, '').trim();
    return [
      {
        heading: undefined,
        paragraphs: [
          `${titleClean} bisa dilakukan langsung di browser tanpa install aplikasi. Di Toolinter, upload foto, pilih ukuran yang dibutuhkan, lalu download hasilnya. Proses cepat, gratis, dan file tetap aman di perangkat kamu karena tidak diunggah ke server.`,
        ]
      },
      {
        heading: 'Ukuran Standar dan Spesifikasi',
        paragraphs: [
          `Setiap dokumen resmi memiliki standar ukuran foto yang harus dipenuhi. Ukuran yang salah bisa menyebabkan dokumen ditolak atau perlu diulang, membuang waktu dan biaya.`,
          `Standar umum foto dokumen di Indonesia:\n• Ukuran 3x4 cm: untuk KTP, SIM, lamaran kerja, dan dokumen umum\n• Ukuran 4x6 cm: untuk passport, visa, dan dokumen internasional\n• Ukuran 2x3 cm: untuk SKCK, surat izin, dan dokumen kecil\n• Format file: JPG atau PNG (beberapa portal hanya menerima JPG)\n• Background: putih untuk umum, merah untuk KTP, biru untuk passport\n• Resolusi: minimal 300 DPI untuk hasil cetak yang tajam\n• Ukuran file: biasanya maksimal 200KB-2MB tergantung portal`,
          `Pastikan foto yang diupload memiliki resolusi cukup agar hasil cetak tidak pecah atau blur. Foto dengan resolusi rendah akan terlihat buram saat dicetak dalam ukuran sebenarnya.`,
        ]
      },
      {
        heading: 'Cara Resize Foto dengan Toolinter',
        paragraphs: [
          `Berikut langkah-langkah resize foto menggunakan Toolinter:`,
          `1. Buka halaman Resize Foto Toolinter di browser.\n2. Klik "Upload" atau drag-and-drop foto yang ingin diresize.\n3. Pilih ukuran target dari dropdown (3x4, 4x6, 2x3, atau custom).\n4. Sesuaikan crop area dengan menarik kotak selection pada foto.\n5. Pilih format output (JPG atau PNG).\n6. Klik "Resize" untuk memproses foto.\n7. Preview hasil resize untuk memastikan kualitas.\n8. Download hasilnya ke perangkat kamu.`,
          `Proses berjalan langsung di browser menggunakan teknologi Canvas API. Foto tidak diunggah ke server mana pun, sehingga privasi tetap terjaga. Ini penting terutama untuk foto dokumen identitas yang mengandung data sensitif.`,
          `Jika hasil crop kurang pas, kamu bisa mengulang proses tanpa batas. Toolinter tidak membatasi jumlah penggunaan.`,
        ]
      },
      {
        heading: 'Tips Foto yang Memenuhi Syarat',
        paragraphs: [
          `Beberapa tips agar foto dokumen kamu diterima oleh instansi:`,
          `• Gunakan pencahayaan yang cukup dan rata — hindari bayangan di wajah atau background\n• Wajah harus terlihat jelas, tidak blur, dan menghadap kamera langsung\n• Background sesuai ketentuan instansi (putih untuk umum, merah untuk KTP, biru untuk passport)\n• Pakaian rapi dan sesuai konteks — formal untuk lamaran kerja, bebas untuk dokumen umum\n• Jangan gunakan filter atau editan berlebihan — foto harus natural dan bisa dikenali\n• Pastikan resolusi asli minimal 600x800 pixel agar hasil cetak tidak pecah\n• Rambut tidak menutupi wajah — telinga harus terlihat untuk beberapa dokumen\n• Tidak menggunakan aksesoris yang menutupi wajah seperti kacamata gelap`,
          `Foto yang memenuhi syarat akan mempercepat proses administrasi dan menghindari penolakan. Jika foto ditolak, kamu perlu mengulang proses dari awal.`,
        ]
      },
      {
        heading: 'Kesalahan Umum',
        paragraphs: [
          `Beberapa kesalahan yang sering terjadi saat menyiapkan foto dokumen:`,
          `• Ukuran terlalu kecil sehingga pecah saat dicetak dalam ukuran sebenarnya\n• Background tidak sesuai ketentuan — misalnya background putih untuk KTP yang seharusnya merah\n• Wajah terpotong atau tidak terlihat jelas karena crop yang salah\n• Format file salah — beberapa portal hanya menerima JPG, bukan PNG\n• Ukuran file terlalu besar untuk diupload ke portal online\n• Menggunakan foto lama yang sudah tidak mirip dengan penampilan saat ini\n• Resolusi terlalu rendah — foto dari kamera lama atau screenshot sering bermasalah\n• Menggunakan foto selfie yang angle-nya tidak standar`,
          `Hindari kesalahan ini agar foto dokumen kamu diterima di percobaan pertama. Jika ragu, cek ketentuan resmi dari instansi yang dituju.`,
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          `Q: Apakah foto diresize di server Toolinter?\nA: Tidak. Seluruh proses berjalan di browser menggunakan teknologi Canvas API. Foto tidak diunggah ke server mana pun, sehingga privasi tetap terjaga.`,
          `Q: Format file apa yang bisa diupload?\nA: Toolinter mendukung format JPG, PNG, dan WebP untuk diresize. Hasil bisa didownload dalam format JPG atau PNG.`,
          `Q: Berapa ukuran maksimal file yang bisa diupload?\nA: Batas tergantung kapasitas browser, biasanya hingga 20MB per file. Jika file terlalu besar, kompres terlebih dahulu.`,
          `Q: Apakah hasil resize bisa langsung digunakan untuk pendaftaran online?\nA: Ya, selama ukuran dan format sesuai ketentuan portal yang dituju. Cek syarat upload sebelum mendaftar.`,
          `Q: Bisakah resize foto untuk beberapa ukuran sekaligus?\nA: Ya, kamu bisa resize foto yang sama ke beberapa ukuran berbeda tanpa batas.`,
        ]
      },
    ];
  },

  Gaji: (p) => {
    const titleClean = p.title.replace(/\[.*?\]/g, '').trim();
    const gajiType = p.slug.replace(/hitung-|cara-/, '').replace(/-/g, ' ');
    return [
      {
        heading: undefined,
        paragraphs: [
          `${titleClean} bisa dilakukan secara instan menggunakan kalkulator online Toolinter. Masukkan data gaji atau komponen yang dibutuhkan, lalu hasil perhitungan langsung muncul di layar. Gratis, akurat sesuai aturan terbaru, dan bisa di-download sebagai PDF untuk arsip atau keperluan administrasi.`,
        ]
      },
      {
        heading: `Apa Itu ${gajiType.charAt(0).toUpperCase() + gajiType.slice(1)}?`,
        paragraphs: [
          `${gajiType.charAt(0).toUpperCase() + gajiType.slice(1)} adalah komponen penting dalam penghitungan gaji karyawan di Indonesia. Pemahaman yang benar tentang cara menghitungnya membantu kamu memastikan gaji yang diterima sesuai dengan perhitungan yang benar dan sesuai peraturan yang berlaku.`,
          `Komponen ini diatur dalam peraturan perundang-undangan Indonesia, termasuk UU Ketenagakerjaan No. 13 Tahun 2003, Peraturan Pemerintah tentang upah minimum, dan peraturan terkait pajak penghasilan. Tarif dan aturan bisa berubah setiap tahun, jadi penting untuk selalu menggunakan data terbaru.`,
          `Memahami cara hitung yang benar membantu kamu menghindari kesalahan dalam pengajuan klaim, pelaporan pajak, atau negosiasi gaji. Banyak karyawan yang tidak tahu bahwa gaji mereka bisa berbeda dari yang seharusnya karena kesalahan perhitungan.`,
        ]
      },
      {
        heading: 'Rumus dan Cara Hitung',
        paragraphs: [
          `Berikut rumus dasar untuk menghitung ${gajiType}:`,
          `1. Masukkan data gaji pokok dan tunjangan tetap\n2. Tambahkan tunjangan tidak tetap (jika ada)\n3. Hitung total penghasilan bruto\n4. Kurangi potongan wajib (PPh21, BPJS Kesehatan, BPJS Ketenagakerjaan)\n5. Hasilnya adalah take home pay (gaji bersih)`,
          `Setiap komponen memiliki aturan tersendiri:\n• PPh21: tarif progresif 5%-30% tergantung penghasilan dan status PTKP\n• BPJS Kesehatan: 1% dari gaji (maksimal Rp12.000.000)\n• BPJS Ketenagakerjaan: 2% JKK + 1% JKM + 1% JHT + 3% JP\n• Pensiun: 1% dari gaji (maksimal Rp9.559.600)`,
          `Gunakan kalkulator Toolinter untuk memastikan perhitungan yang akurat. Masukkan semua komponen gaji dengan benar untuk hasil yang paling akurat.`,
        ]
      },
      {
        heading: 'Contoh Perhitungan',
        paragraphs: [
          `Berikut contoh perhitungan ${gajiType} untuk karyawan dengan gaji Rp8.000.000 per bulan:`,
          `• Gaji pokok: Rp8.000.000\n• Tunjangan tetap: Rp1.000.000\n• Total bruto: Rp9.000.000\n• PPh21 (estimasi): Rp150.000\n• BPJS Kesehatan (1%): Rp90.000\n• BPJS Ketenagakerjaan (4,24%): Rp381.600\n• Total potongan: Rp621.600\n• Take home pay: Rp8.378.400`,
          `Angka ini bersifat simulasi. Perhitungan aktual bisa berbeda tergantung status PTKP, tunjangan, dan komponen lainnya. Gunakan kalkulator Toolinter untuk perhitungan yang lebih akurat sesuai kondisi kamu.`,
          `Download hasil perhitungan sebagai PDF untuk arsip atau keperluan negosiasi gaji.`,
        ]
      },
      {
        heading: 'Kesalahan Umum',
        paragraphs: [
          `Beberapa kesalahan yang sering terjadi saat menghitung ${gajiType}:`,
          `• Salah memasukkan angka gaji atau tunjangan — pastikan angka sesuai slip gaji\n• Tidak memperhitungkan semua komponen — jangan lupa tunjangan tidak tetap\n• Menggunakan tarif lama yang sudah berubah — cek aturan terbaru setiap tahun\n• Tidak memperhitungkan status PTKP — status kawin/tanggungan mempengaruhi PPh21\n• Salah membedakan gross dan net — pastikan tahu apakah gaji yang ditawarkan gross atau net\n• Tidak memperhitungkan THR dan bonus — komponen ini juga kena pajak\n• Mengabaikan iuran pensiun — beberapa perusahaan memotong iuran pensiun tambahan`,
          `Gunakan kalkulator Toolinter untuk menghindari kesalahan perhitungan manual. Semua rumus sudah disesuaikan dengan aturan terbaru.`,
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          `Q: Apakah hasil perhitungan Toolinter akurat?\nA: Hasil bersifat simulasi berdasarkan aturan terbaru. Untuk keputusan final, verifikasi dengan aturan resmi atau konsultasikan dengan HR/konsultan pajak.`,
          `Q: Apakah data gaji saya disimpan?\nA: Tidak. Seluruh perhitungan berjalan di browser. Data tidak dikirim ke server atau disimpan di mana pun.`,
          `Q: Berapa sering aturan berubah?\nA: Tarif pajak, BPJS, dan UMR bisa berubah setiap tahun. Toolinter selalu menggunakan data terbaru yang tersedia.`,
          `Q: Apakah ini pengganti konsultan pajak?\nA: Tidak. Tool ini untuk simulasi awal. Untuk perhitungan pajak yang kompleks, konsultasikan dengan konsultan pajak bersertifikat.`,
          `Q: Bisakah saya download hasil perhitungan?\nA: Ya, klik tombol "Download PDF" untuk mengunduh hasil perhitungan dalam format PDF.`,
        ]
      },
    ];
  },

  PDF: (p) => {
    const titleClean = p.title.replace(/\[.*?\]/g, '').trim();
    const pdfType = p.slug.replace(/cara-|kompres-|gabung-|pisah-|foto-|pdf-|word-|tanda-/, '').replace(/-pdf|-online|-gratis|-digital/g, '').replace(/-/g, ' ');
    return [
      {
        heading: undefined,
        paragraphs: [
          `${titleClean} bisa dilakukan langsung di browser tanpa install aplikasi. Di Toolinter, upload file, pilih opsi yang dibutuhkan, lalu download hasilnya. Proses cepat, gratis, dan file tetap aman di perangkat kamu karena tidak diunggah ke server.`,
        ]
      },
      {
        heading: `Kapan Kamu Butuh ${pdfType.charAt(0).toUpperCase() + pdfType.slice(1)} PDF?`,
        paragraphs: [
          `Ada beberapa situasi yang membutuhkan ${pdfType} PDF:`,
          `• Mengirim dokumen via email dengan batasan ukuran file (biasanya 25MB)\n• Upload dokumen ke portal CPNS, beasiswa, atau lamaran kerja yang membatasi ukuran file\n• Menggabungkan beberapa dokumen jadi satu file untuk pengiriman yang lebih rapi\n• Mengambil halaman tertentu dari dokumen besar tanpa mengirim seluruh file\n• Mengonversi format dokumen untuk keperluan editing atau cetak\n• Menandatangani dokumen secara digital tanpa perlu print dan scan`,
          `Proses yang cepat dan praktis menghemat waktu kamu, terutama saat deadline mendesak. Toolinter memproses semuanya di browser, jadi kamu tidak perlu menunggu upload ke server.`,
        ]
      },
      {
        heading: 'Cara Pakai Tool Toolinter',
        paragraphs: [
          `Berikut langkah-langkah menggunakan tool PDF Toolinter:`,
          `1. Buka halaman tool yang sesuai di Toolinter.\n2. Upload file PDF atau dokumen yang ingin diproses. Bisa drag-and-drop atau klik "Browse".\n3. Pilih opsi yang dibutuhkan:\n   - Untuk kompres: pilih tingkat kualitas (tinggi/sedang/rendah)\n   - Untuk gabung: atur urutan halaman\n   - Untuk pisah: pilih halaman yang ingin diambil\n   - Untuk konversi: pilih format output\n4. Klik "Proses" untuk memulai konversi.\n5. Tunggu hingga proses selesai (biasanya beberapa detik).\n6. Download hasilnya ke perangkat kamu.\n7. Buka file hasil untuk memastikan kualitas tetap baik.`,
          `Seluruh proses berjalan di browser menggunakan teknologi WebAssembly. File tidak diunggah ke server, sehingga privasi dokumen tetap aman. Ini penting untuk dokumen sensitif seperti kontrak, laporan keuangan, atau dokumen identitas.`,
        ]
      },
      {
        heading: 'Tips Kualitas Output',
        paragraphs: [
          `Beberapa tips untuk hasil terbaik:`,
          `• Gunakan file asli dengan resolusi tinggi — file yang sudah dikompress sebelumnya akan kehilangan kualitas lebih banyak\n• Pilih kualitas yang sesuai kebutuhan:\n  - Tinggi: untuk cetak atau arsip\n  - Sedang: untuk email atau upload portal\n  - Rendah: untuk preview atau koneksi lambat\n• Cek hasil di beberapa device (HP dan laptop) sebelum mengirim\n• Simpan file asli sebagai backup sebelum memproses\n• Jika hasil blur atau pecah, kurangi tingkat kompresi\n• Untuk PDF dengan gambar, gunakan kompresi yang lebih ringan\n• Untuk PDF teks saja, kompresi tinggi aman tanpa kehilangan kualitas`,
          `Dengan mengikuti tips ini, kualitas dokumen tetap terjaga meski sudah diproses. Selalu cek hasil sebelum mengirim ke pihak lain.`,
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          `Q: Apakah file saya aman di Toolinter?\nA: Ya. Seluruh proses berjalan di browser menggunakan WebAssembly. File tidak diunggah ke server mana pun. Privasi dokumen terjaga sepenuhnya.`,
          `Q: Berapa ukuran maksimal file?\nA: Batas tergantung kapasitas browser dan RAM perangkat, biasanya hingga 100MB per file. Untuk file sangat besar, proses mungkin lebih lama.`,
          `Q: Apakah hasilnya bisa diedit?\nA: Tergantung tool yang dipakai. Untuk hasil yang bisa diedit, gunakan konversi ke Word atau format lain. PDF hasil kompres tetap dalam format PDF.`,
          `Q: Apakah ada watermark?\nA: Tidak. Toolinter 100% gratis tanpa watermark dan tanpa perlu daftar akun.`,
          `Q: Bisakah saya memproses beberapa file sekaligus?\nA: Ya, untuk tool gabung PDF, kamu bisa upload beberapa file sekaligus dan mengatur urutannya.`,
        ]
      },
    ];
  },

  CV: (p) => {
    const titleClean = p.title.replace(/\[.*?\]/g, '').trim();
    return [
      {
        heading: undefined,
        paragraphs: [
          `${titleClean} bisa dibuat dalam hitungan menit menggunakan generator CV ATS Toolinter. Isi data diri, pengalaman, dan keahlian, lalu download CV dalam format PDF. Gratis, tanwatermark, dan ramah ATS (Applicant Tracking System) sehingga lolos screening otomatis perusahaan.`,
        ]
      },
      {
        heading: 'Apa Itu CV ATS-Friendly?',
        paragraphs: [
          'CV ATS-friendly adalah CV yang bisa dibaca oleh sistem ATS (Applicant Tracking System) yang digunakan perusahaan besar untuk menyaring pelamar. Sistem ini membaca CV secara otomatis dan mencari keyword yang sesuai dengan deskripsi pekerjaan.',
          'Format yang benar memastikan CV kamu lolos screening otomatis dan sampai ke tangan HR. CV yang tidak ATS-friendly sering ditolak oleh sistem sebelum dibaca manusia. Format yang rumit, font aneh, atau struktur yang tidak standar bisa menyebabkan data kamu tidak terbaca.',
          'Di Indonesia, semakin banyak perusahaan yang menggunakan ATS, terutama perusahaan multinasional, BUMN, dan startup besar. Membuat CV yang ATS-friendly adalah investasi penting untuk karir kamu.',
        ]
      },
      {
        heading: 'Struktur CV yang Benar',
        paragraphs: [
          'Berikut struktur CV yang disarankan untuk ATS dan HR:',
          '• Header: nama lengkap, nomor telepon, email profesional, LinkedIn (opsional)\n• Ringkasan profil: 2-3 kalimat tentang diri kamu, keahlian utama, dan tujuan karir\n• Pengalaman kerja: urutkan dari terbaru, cantumkan pencapaian dengan angka\n• Pendidikan: gelar, institusi, tahun lulus, IPK (jika >3.00)\n• Keahlian: hard skill (tools, bahasa, teknis) dan soft skill (komunikasi, kepemimpinan)\n• Sertifikasi/pelatihan: kursus online, sertifikasi profesional, pelatihan terkait',
          'Gunakan font standar (Arial, Calibri, Helvetica) ukuran 10-12pt. Hindari tabel, grafik, icon, atau elemen dekoratif yang sulit dibaca ATS. Format PDF lebih aman daripada Word karena tampilan tidak berubah saat dibuka di device berbeda.',
        ]
      },
      {
        heading: 'Cara Buat CV dengan Toolinter',
        paragraphs: [
          'Berikut langkah-langkah membuat CV menggunakan Toolinter:',
          '1. Buka Generator CV ATS Toolinter di browser.\n2. Pilih template yang sesuai dengan posisi yang dilamar.\n3. Isi data diri: nama, kontak, ringkasan profil.\n4. Tambahkan pengalaman kerja dari yang terbaru.\n5. Isi pendidikan dan keahlian.\n6. Preview hasil CV untuk memastikan format benar.\n7. Download dalam format PDF.\n8. Cek ulang ejaan dan format sebelum dikirim ke perusahaan.',
          'Proses berjalan di browser. Data tidak disimpan di server. Kamu bisa membuat beberapa versi CV untuk posisi berbeda tanpa batas.',
        ]
      },
      {
        heading: 'Kesalahan CV yang Harus Dihindari',
        paragraphs: [
          'Beberapa kesalahan umum yang sering terjadi saat membuat CV:',
          '• CV terlalu panjang — idealnya 1 halaman untuk fresh graduate, 2 halaman untuk berpengalaman\n• Font terlalu kecil atau sulit dibaca — gunakan minimal 10pt\n• Tidak ada keyword yang sesuai deskripsi pekerjaan — ATS mencari keyword spesifik\n• Menggunakan foto yang tidak profesional — foto formal dengan background polos\n• Salah ejaan atau tata bahasa — minta orang lain proofread sebelum kirim\n• Tidak mencantumkan hasil/achievement — "Meningkatkan penjualan 30%" lebih kuat dari "Bertanggung jawab atas penjualan"\n• Menggunakan email tidak profesional — hindari email seperti "coolboy123@gmail.com"\n• Format berantakan saat dibuka di device lain — gunakan PDF untuk konsistensi',
          'Hindari kesalahan ini agar CV kamu dilirik HR dan lolos screening ATS.',
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          'Q: Apakah CV dari Toolinter bisa langsung dipakai?\nA: Ya, tapi sesuaikan dengan posisi yang dilamar. Tambahkan keyword dari deskripsi pekerjaan untuk meningkatkan peluang lolos ATS.',
          'Q: Format file apa yang dihasilkan?\nA: PDF, siap kirim dan cetak. Format PDF memastikan tampilan CV tidak berubah saat dibuka di device berbeda.',
          'Q: Apakah data saya disimpan?\nA: Tidak. Seluruh proses berjalan di browser. Data CV tidak dikirim ke server atau disimpan.',
          'Q: Berapa lama idealnya CV?\nA: 1 halaman untuk fresh graduate, maksimal 2 halaman untuk yang berpengalaman. HR hanya butuh 6-7 detik untuk scan CV pertama kali.',
          'Q: Apakah template CV ini cocok untuk semua industri?\nA: Template ATS-friendly cocok untuk kebanyakan industri. Untuk industri kreatif, kamu mungkin perlu CV dengan desain lebih menarik.',
        ]
      },
    ];
  },

  UMKM: (p) => {
    const titleClean = p.title.replace(/\[.*?\]/g, '').trim();
    return [
      {
        heading: undefined,
        paragraphs: [
          `${titleClean} bisa dihitung secara instan menggunakan kalkulator online Toolinter. Masukkan data bisnis kamu, lalu hasil perhitungan langsung muncul di layar. Gratis, akurat, dan bisa di-download sebagai PDF untuk arsip atau presentasi ke mitra bisnis.`,
        ]
      },
      {
        heading: 'Apa Itu dan Kenapa Penting?',
        paragraphs: [
          'Komponen ini penting untuk menjalankan bisnis yang sehat dan menguntungkan. Tanpa perhitungan yang benar, kamu bisa salah menentukan harga jual, tidak tahu berapa keuntungan bersih, atau kehilangan peluang efisiensi yang bisa meningkatkan margin.',
          'Banyak UMKM di Indonesia yang menghitung harga jual berdasarkan perkiraan atau mengikuti harga kompetitor tanpa tahu apakah margin mereka cukup. Akibatnya, banyak bisnis yang omzetnya besar tapi keuntungannya tipis atau bahkan rugi.',
          'Pemahaman yang benar tentang komponen biaya membantu kamu membuat keputusan bisnis yang tepat berdasarkan data, bukan perkiraan. Ini adalah fondasi bisnis yang sustainable.',
        ]
      },
      {
        heading: 'Rumus dan Cara Hitung',
        paragraphs: [
          'Berikut rumus dasar yang digunakan:',
          '• HPP (Harga Pokok Penjualan) = Bahan Baku + Tenaga Kerja Langsung + Overhead Pabrik\n• Harga Jual = HPP + (HPP × Margin %)\n• Margin Bersih = (Harga Jual - Total Biaya) / Harga Jual × 100%\n• Break Even Point = Biaya Tetap / (Harga Jual per Unit - Biaya Variabel per Unit)',
          'Masukkan data bisnis di kalkulator Toolinter:\n1. Masukkan semua biaya bahan baku dan operasional\n2. Tambahkan biaya tenaga kerja (termasuk gaji sendiri jika UMKM)\n3. Hitung HPP per unit\n4. Tentukan margin yang diinginkan\n5. Kalkulator menampilkan harga jual yang disarankan',
          'Gunakan data penjualan dan pengeluaran terbaru untuk hasil yang paling akurat. Jangan lupa memperhitungkan biaya yang sering terlupa seperti biaya packaging, ongkir, dan fee marketplace.',
        ]
      },
      {
        heading: 'Contoh Perhitungan',
        paragraphs: [
          'Berikut contoh penerapan untuk bisnis makanan:',
          '• Bahan baku per porsi: Rp15.000\n• Tenaga kerja per porsi: Rp5.000\n• Overhead (gas, listrik, sewa): Rp3.000\n• Packaging: Rp2.000\n• Total HPP: Rp25.000\n• Margin target: 40%\n• Harga jual: Rp25.000 + (Rp25.000 × 40%) = Rp35.000\n• Fee marketplace (5%): Rp1.750\n• Keuntungan bersih per porsi: Rp8.250',
          'Dari perhitungan ini, kamu tahu bahwa setiap porsi menghasilkan keuntungan bersih Rp8.250. Jika terjual 100 porsi/hari, keuntungan harian adalah Rp825.000.',
          'Lakukan evaluasi rutin (bulanan atau mingguan) untuk memantau tren bisnis dan menyesuaikan harga jika biaya bahan baku berubah.',
        ]
      },
      {
        heading: 'Kesalahan Umum UMKM',
        paragraphs: [
          'Beberapa kesalahan yang sering terjadi dalam pengelolaan keuangan UMKM:',
          '• Tidak mencatat semua biaya operasional — biaya kecil seperti plastik, tissue, dan gas sering terlupa\n• Salah menghitung HPP — jangan lupa biaya tenaga kerja dan overhead\n• Tidak memperhitungkan fee marketplace — Shopee, Tokopedia, dan TikTok Shop mengambil 2-8% dari setiap transaksi\n• Menentukan harga tanpa data margin — jangan asal ikuti harga kompetitor\n• Tidak memisahkan uang pribadi dan bisnis — ini penyebab utama UMKM tidak tahu profit sebenarnya\n• Tidak memiliki catatan keuangan yang rapi — tanpa catatan, kamu tidak tahu bisnis untung atau rugi\n• Mengabaikan biaya promosi — iklan dan promosi adalah biaya yang harus diperhitungkan',
          'Hindari kesalahan ini agar bisnis kamu lebih sehat dan menguntungkan dalam jangka panjang.',
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          'Q: Apakah kalkulator ini cocok untuk semua jenis bisnis?\nA: Ya, bisa dipakai untuk bisnis F&B, retail, jasa, online shop, dan bisnis jasa. Sesuaikan komponen biaya dengan jenis bisnis kamu.',
          'Q: Apakah data bisnis saya aman?\nA: Ya. Semua perhitungan berjalan di browser. Data tidak dikirim ke server atau disimpan di mana pun.',
          'Q: Berapa sering saya harus evaluasi keuangan bisnis?\nA: Idealnya setiap bulan untuk memantau tren. Untuk bisnis dengan volume tinggi, evaluasi mingguan lebih baik.',
          'Q: Apakah ini pengganti akuntan?\nA: Tidak. Tool ini untuk perhitungan cepat. Untuk pembukuan lengkap dan pelaporan pajak, gunakan jasa akuntan atau software akuntansi.',
          'Q: Bagaimana jika margin saya terlalu kecil?\nA: Evaluasi biaya operasional, cari supplier yang lebih murah, atau naikkan harga secara bertahap. Jangan lupa perhitungkan nilai yang kamu berikan ke pelanggan.',
        ]
      },
    ];
  },

  Keuangan: (p) => {
    const titleClean = p.title.replace(/\[.*?\]/g, '').trim();
    return [
      {
        heading: undefined,
        paragraphs: [
          `${titleClean} bisa dilakukan secara instan menggunakan kalkulator online Toolinter. Masukkan data keuangan kamu, lalu hasil simulasi langsung muncul di layar. Gratis, akurat, dan bisa di-download sebagai PDF untuk referensi atau diskusi dengan penasihat keuangan.`,
        ]
      },
      {
        heading: 'Apa Itu dan Kenapa Penting?',
        paragraphs: [
          'Perencanaan keuangan yang baik dimulai dari pemahaman yang benar tentang komponen keuangan kamu. Menghitung dengan akurat membantu kamu membuat keputusan finansial yang tepat dan menghindari kesalahan yang bisa merugikan.',
          'Baik untuk simulasi kredit rumah, investasi, atau dana darurat, perhitungan yang benar membantu kamu merencanakan masa depan dengan lebih percaya diri. Banyak orang yang mengambil keputusan finansial besar tanpa simulasi yang benar, akibatnya terjebak cicilan yang terlalu berat atau investasi yang tidak optimal.',
          'Di Indonesia, literasi keuangan masih rendah. Tool simulasi seperti Toolinter membantu kamu memahami angka sebelum membuat keputusan, sehingga bisa menghindari jebakan finansial.',
        ]
      },
      {
        heading: 'Rumus dan Cara Hitung',
        paragraphs: [
          'Berikut cara menghitung menggunakan kalkulator Toolinter:',
          '1. Masukkan data keuangan yang diminta ( nominal, tenor, suku bunga)\n2. Pilih parameter tambahan jika ada (jenis bunga, frekuensi pembayaran)\n3. Klik "Hitung" untuk melihat simulasi lengkap\n4. Analisis hasil: cicilan bulanan, total bunga, total pembayaran\n5. Coba skenario berbeda dengan mengubah parameter\n6. Download hasil simulasi untuk referensi',
          'Untuk simulasi KPR, perhatikan:\n• Suku bunga fixed vs floating — bunga fixed lebih pasti di awal, floating bisa berubah\n• Tenor lebih panjang = cicilan lebih kecil tapi total bunga lebih besar\n• DP lebih besar = pinjaman lebih kecil dan bunga lebih sedikit\n• Asuransi dan biaya administrasi harus diperhitungkan',
          'Gunakan data terbaru dan realistis untuk simulasi yang akurat. Jangan terlalu optimis dengan kemampuan cicilan.',
        ]
      },
      {
        heading: 'Contoh Simulasi',
        paragraphs: [
          'Berikut contoh simulasi KPR rumah Rp500 juta dengan DP 20%:',
          '• Harga rumah: Rp500.000.000\n• DP (20%): Rp100.000.000\n• Pinjaman: Rp400.000.000\n• Tenor: 20 tahun (240 bulan)\n• Suku bunga fixed 6.5% (3 tahun pertama)\n• Cicilan bulanan: Rp3.093.000\n• Total bunga selama 20 tahun: Rp342.320.000\n• Total pembayaran: Rp742.320.000',
          'Dari simulasi ini, kamu tahu bahwa untuk rumah Rp500 juta, kamu akan membayar total Rp742 juta selama 20 tahun. Cicilan Rp3,1 juta per bulan harus muat dalam budget kamu (idealnya maksimal 30% penghasilan).',
          'Simulasi ini bersifat estimasi. Untuk angka pasti, hubungi bank yang bersangkutan karena suku bunga dan syarat bisa berbeda.',
        ]
      },
      {
        heading: 'Kesalahan Umum',
        paragraphs: [
          'Beberapa kesalahan yang sering terjadi dalam perencanaan keuangan:',
          '• Tidak memperhitungkan biaya tambahan — asuransi, biaya administrasi, dan provisi sering terlupa\n• Menggunakan suku bunga yang tidak realistis — bunga promosi di awal bisa naik signifikan setelah periode fixed\n• Tidak memperhitungkan kemampuan cicilan — idealnya cicilan maksimal 30% dari penghasilan bulanan\n• Terlalu optimis dengan pertumbuhan investasi — return investasi tidak pasti, gunakan estimasi konservatif\n• Tidak memiliki dana darurat sebelum berinvestasi — idealnya punya dana darurat 3-6x pengeluaran bulanan\n• Mengabaikan inflasi — harga rumah dan kebutuhan hidup naik setiap tahun\n• Tidak membandingkan beberapa opsi — bandingkan suku bunga dan syarat dari beberapa bank',
          'Hindari kesalahan ini agar perencanaan keuangan kamu lebih realistis dan tidak mengecewakan.',
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          'Q: Apakah simulasi ini akurat?\nA: Simulasi bersifat estimasi berdasarkan rumus standar. Angka aktual bisa berbeda tergantung kebijakan lembaga keuangan, suku bunga pasar, dan kondisi ekonomi.',
          'Q: Apakah data keuangan saya aman?\nA: Ya. Semua perhitungan berjalan di browser. Data tidak dikirim ke server atau disimpan di mana pun.',
          'Q: Apakah ini pengganti konsultan keuangan?\nA: Tidak. Tool ini untuk simulasi awal dan edukasi. Untuk keputusan investasi besar, konsultasikan dengan penasihat keuangan bersertifikat.',
          'Q: Berapa suku bunga KPR saat ini?\nA: Suku bunga berubah sewaktu-waktu. Cek langsung ke bank yang kamu tuju untuk data terbaru.',
          'Q: Bisakah saya download hasil simulasi?\nA: Ya, klik tombol "Download PDF" untuk mengunduh hasil simulasi dalam format PDF.',
        ]
      },
    ];
  },
};

// Expand each short post
let expandedCount = 0;
const expandedSlugs = [];

posts.forEach((post, index) => {
  if (post.date >= '2026-07-01' && post.date <= '2026-07-07' && post.content?.length <= 3) {
    const templateFn = templates[post.category];
    if (templateFn) {
      const newContent = templateFn(post);
      posts[index].content = newContent;
      expandedCount++;
      expandedSlugs.push(post.slug);
    }
  }
});

console.log(`Expanded ${expandedCount} posts`);

// Reconstruct blog.ts
function serializePost(post) {
  let s = `{\n`;
  s += `    slug: ${JSON.stringify(post.slug)},\n`;
  s += `    title: ${JSON.stringify(post.title)},\n`;
  s += `    excerpt: ${JSON.stringify(post.excerpt)},\n`;
  s += `    date: ${JSON.stringify(post.date)},\n`;
  s += `    category: ${JSON.stringify(post.category)},\n`;
  s += `    readTime: ${JSON.stringify(post.readTime)},\n`;
  s += `    ctaLabel: ${JSON.stringify(post.ctaLabel)},\n`;
  s += `    ctaHref: ${JSON.stringify(post.ctaHref)},\n`;
  s += `    content: [\n`;
  post.content.forEach(section => {
    s += `      {\n`;
    if (section.heading) {
      s += `        heading: ${JSON.stringify(section.heading)},\n`;
    }
    s += `        paragraphs: [\n`;
    section.paragraphs.forEach(para => {
      s += `          ${JSON.stringify(para)},\n`;
    });
    s += `        ],\n`;
    s += `      },\n`;
  });
  s += `    ],\n`;
  s += `  }`;
  return s;
}

const serialized = posts.map(serializePost).join(',\n');
const newFileContent = `export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  ctaLabel: string;
  ctaHref: string;
  content: BlogSection[];
}

export const blogPosts: BlogPost[] = [
${serialized}
];
`;

fs.writeFileSync(blogPath, newFileContent, 'utf8');
console.log(`Wrote ${expandedCount} expanded posts to ${blogPath}`);
console.log(`Total posts in file: ${posts.length}`);
