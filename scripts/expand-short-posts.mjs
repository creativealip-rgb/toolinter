// expand-short-posts.mjs
// Expand all short blog posts (<3 sections) to meet SEO/E-E-A-T guidelines
// Run: node scripts/expand-short-posts.mjs

import fs from 'fs';

const blogPath = 'src/data/blog.ts';
const content = fs.readFileSync(blogPath, 'utf8');

// Parse posts
const match = content.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*\]);/);
if (!match) { console.error('Could not parse blog.ts'); process.exit(1); }
const posts = eval(match[1]);

// Category-specific templates
const templates = {
  Surat: (p) => {
    const titleClean = p.title.replace(/\[.*?\]/g, '').trim();
    const suratType = p.slug.replace(/surat-/, '').replace(/-/g, ' ');
    return [
      {
        heading: undefined,
        paragraphs: [
          `${titleClean} bisa dibuat dalam hitungan menit menggunakan generator surat online. Di Toolinter, kamu cukup pilih template, isi data diri, lalu download surat dalam format PDF. Gratis, tanpa perlu install aplikasi atau daftar akun.`,
        ]
      },
      {
        heading: `Apa Itu Surat ${suratType.charAt(0).toUpperCase() + suratType.slice(1)}?`,
        paragraphs: [
          `Surat ${suratType} adalah dokumen resmi yang dibutuhkan untuk keperluan administrasi. Surat ini biasanya digunakan untuk keperluan pribadi, pekerjaan, atau urusan instansi. Format yang benar memastikan surat diterima dan diproses dengan baik oleh pihak yang dituju.`,
          `Setiap surat ${suratType} memiliki struktur standar yang harus diikuti: kop surat atau identitas pengirim, tujuan surat, isi surat, dan tanda tangan. Menggunakan format yang benar menunjukkan profesionalisme dan mempercepat proses administrasi.`
        ]
      },
      {
        heading: `Kapan Kamu Butuh Surat ${suratType.charAt(0).toUpperCase() + suratType.slice(1)}?`,
        paragraphs: [
          `Ada beberapa situasi umum yang membutuhkan surat ${suratType}:`,
          `• Melamar pekerjaan atau magang\n• Mengurus administrasi di instansi pemerintah\n• Keperluan bank atau lembaga keuangan\n• Proses rekrutmen atau seleksi CPNS/BUMN\n• Keperluan pendidikan atau beasiswa`,
          `Dalam situasi ini, surat yang ditulis dengan format yang benar dan bahasa yang sopan akan meningkatkan peluang diterima.`
        ]
      },
      {
        heading: 'Cara Membuat Surat dengan Toolinter',
        paragraphs: [
          `Berikut langkah-langkah membuat surat menggunakan generator Toolinter:`,
          `1. Buka halaman Generator Surat Toolinter.\n2. Pilih template surat ${suratType} dari daftar.\n3. Isi data yang diminta: nama, tanggal, tujuan, dan informasi lainnya.\n4. Klik "Preview" untuk melihat hasil surat.\n5. Jika sudah sesuai, klik "Download PDF" untuk mengunduh.\n6. Cek ulang nama, tanggal, dan tujuan surat sebelum dikirim.`,
          `Proses seluruhnya berjalan langsung di browser. File tidak diunggah ke server, jadi privasi data tetap aman.`
        ]
      },
      {
        heading: 'Contoh Surat',
        paragraphs: [
          `Berikut contoh struktur surat ${suratType} yang benar:`,
          `• Identitas pengirim (nama, alamat, nomor telepon)\n• Tanggal dan tempat penulisan\n• Tujuan surat (nama penerima, jabatan, instansi)\n• Salam pembuka\n• Isi surat (pernyataan, alasan, atau permohonan)\n• Lampiran dokumen pendukung (jika ada)\n• Salam penutup dan tanda tangan`,
          `Gunakan bahasa formal dan sopan. Hindari kalimat yang terlalu panjang atau bertele-tele.`
        ]
      },
      {
        heading: 'Kesalahan Umum yang Harus Dihindari',
        paragraphs: [
          `Beberapa kesalahan yang sering terjadi saat membuat surat ${suratType}:`,
          `• Salah menulis nama pihak yang dituju\n• Tidak mencantumkan tanggal efektif\n• Menggunakan bahasa informal atau tidak sopan\n• Tidak menyertakan lampiran yang diminta\n• Format surat tidak sesuai standar instansi\n• Lupa menandatangani surat`,
          `Hindari kesalahan ini agar surat kamu diproses dengan lancar.`
        ]
      },
      {
        heading: 'Tips Surat yang Profesional',
        paragraphs: [
          `Beberapa tips untuk membuat surat ${suratType} yang baik:`,
          `• Gunakan font standar (Times New Roman atau Arial) ukuran 12\n• Cetak di kertas A4 dengan margin 2,5 cm\n• Periksa ejaan dan tata bahasa sebelum mengirim\n• Simpan salinan digital untuk arsip pribadi\n• Minta orang lain membaca sebelum mengirim`,
          `Dengan mengikuti tips ini, surat kamu akan terlihat lebih profesional dan meyakinkan.`
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          `Q: Apakah surat dari Toolinter bisa langsung dipakai?\nA: Surat dari Toolinter berfungsi sebagai draft yang bisa kamu sesuaikan. Pastikan nama, tanggal, dan tujuan sudah benar sebelum dikirim.`,
          `Q: Format file apa yang dihasilkan?\nA: Toolinter menghasilkan surat dalam format PDF yang siap cetak dan kirim.`,
          `Q: Apakah data saya aman?\nA: Ya, seluruh proses berjalan di browser. Data tidak dikirim ke server atau disimpan di mana pun.`,
        ]
      },
    ];
  },

  Foto: (p) => {
    const titleClean = p.title.replace(/\[.*?\]/g, '').trim();
    const fotoType = p.slug.replace(/resize-|foto-|kompres-/, '').replace(/-/g, ' ');
    return [
      {
        heading: undefined,
        paragraphs: [
          `${titleClean} bisa dilakukan langsung di browser tanpa install aplikasi. Di Toolinter, upload foto, pilih ukuran yang dibutuhkan, lalu download hasilnya. Proses cepat, gratis, dan file tetap aman di perangkat kamu.`
        ]
      },
      {
        heading: `Ukuran Standar Foto ${fotoType.charAt(0).toUpperCase() + fotoType.slice(1)}`,
        paragraphs: [
          `Foto ${fotoType} memiliki standar ukuran yang harus dipenuhi agar diterima oleh instansi atau portal. Ukuran yang salah bisa menyebabkan dokumen ditolak atau perlu diulang.`,
          `Standar umum foto ${fotoType}:\n• Ukuran dalam cm: sesuai ketentuan instansi\n• Ukuran dalam pixel: tergantung DPI (biasanya 300 DPI)\n• Format file: JPG atau PNG\n• Background: sesuai ketentuan (putih, merah, atau biru)\n• Ukuran file: biasanya maksimal 200KB-2MB`,
          `Pastikan foto yang diupload memiliki resolusi cukup agar hasil cetak tidak pecah atau blur.`
        ]
      },
      {
        heading: 'Cara Resize Foto dengan Toolinter',
        paragraphs: [
          `Berikut langkah-langkah resize foto menggunakan Toolinter:`,
          `1. Buka halaman Resize Foto Toolinter.\n2. Upload foto yang ingin diresize.\n3. Pilih ukuran target (3x4, 4x6, 2x3, atau custom).\n4. Sesuaikan crop area jika diperlukan.\n5. Klik "Resize" untuk memproses.\n6. Download hasilnya dalam format JPG atau PNG.`,
          `Proses berjalan langsung di browser. Foto tidak diunggah ke server, jadi privasi tetap terjaga.`
        ]
      },
      {
        heading: 'Tips Foto yang Memenuhi Syarat',
        paragraphs: [
          `Beberapa tips agar foto kamu diterima oleh instansi:`,
          `• Gunakan pencahayaan yang cukup dan rata\n• Wajah harus terlihat jelas, tidak blur\n• Background sesuai ketentuan (putih untuk umum, merah untuk KTP)\n• Pakaian rapi dan sesuai konteks\n• Jangan gunakan filter atau editan berlebihan\n• Pastikan resolusi asli minimal 600x800 pixel`,
          `Foto yang memenuhi syarat akan mempercepat proses administrasi dan menghindari penolakan.`
        ]
      },
      {
        heading: 'Kesalahan Umum',
        paragraphs: [
          `Beberapa kesalahan yang sering terjadi saat menyiapkan foto dokumen:`,
          `• Ukuran terlalu kecil sehingga pecah saat dicetak\n• Background tidak sesuai ketentuan\n• Wajah terpotong atau tidak terlihat jelas\n• Format file salah (harusnya JPG, malah PNG)\n• Ukuran file terlalu besar untuk diupload\n• Menggunakan foto lama yang sudah tidak mirip`,
          `Hindari kesalahan ini agar foto dokumen kamu diterima di percobaan pertama.`
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          `Q: Apakah foto diresize di server Toolinter?\nA: Tidak. Seluruh proses berjalan di browser. Foto tidak diunggah ke server mana pun.`,
          `Q: Format file apa yang bisa diupload?\nA: Toolinter mendukung format JPG, PNG, dan WebP untuk diresize.`,
          `Q: Berapa ukuran maksimal file yang bisa diupload?\nA: Batas tergantung kapasitas browser, biasanya hingga 20MB per file.`,
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
          `${titleClean} bisa dilakukan secara instan menggunakan kalkulator online Toolinter. Masukkan data gaji atau komponen yang dibutuhkan, lalu hasil perhitungan langsung muncul. Gratis, akurat, dan bisa di-download sebagai PDF.`
        ]
      },
      {
        heading: `Apa Itu ${gajiType.charAt(0).toUpperCase() + gajiType.slice(1)}?`,
        paragraphs: [
          `${gajiType.charAt(0).toUpperCase() + gajiType.slice(1)} adalah komponen penting dalam penghitungan gaji karyawan di Indonesia. Pemahaman yang benar tentang cara menghitungnya membantu kamu memastikan gaji yang diterima sesuai dengan perhitungan yang benar.`,
          `Komponen ini diatur dalam peraturan perundang-undangan Indonesia, termasuk UU Ketenagakerjaan dan peraturan terkait pajak penghasilan. Memahami cara hitung yang benar membantu kamu menghindari kesalahan dalam pengajuan atau pelaporan.`
        ]
      },
      {
        heading: 'Rumus dan Cara Hitung',
        paragraphs: [
          `Berikut rumus dasar untuk menghitung ${gajiType}:`,
          `• Masukkan data yang diperlukan di kalkulator Toolinter\n• Pastikan angka yang dimasukkan sudah benar dan sesuai\n• Klik "Hitung" untuk melihat hasil perhitungan\n• Hasil akan menampilkan rincian lengkap`,
          `Setiap komponen memiliki aturan tersendiri. Gunakan kalkulator Toolinter untuk memastikan perhitungan yang akurat sesuai aturan terbaru.`
        ]
      },
      {
        heading: 'Contoh Perhitungan',
        paragraphs: [
          `Berikut contoh perhitungan ${gajiType}:`,
          `• Masukkan data gaji atau komponen yang diminta\n• Kalkulator akan menghitung otomatis berdasarkan aturan terbaru\n• Hasil menampilkan rincian setiap komponen\n• Download hasil perhitungan sebagai PDF untuk arsip`,
          `Angka yang dihasilkan bersifat simulasi. Untuk keputusan final, selalu verifikasi dengan aturan resmi atau konsultasikan dengan HR/konsultan pajak.`
        ]
      },
      {
        heading: 'Kesalahan Umum',
        paragraphs: [
          `Beberapa kesalahan yang sering terjadi saat menghitung ${gajiType}:`,
          `• Salah memasukkan angka gaji atau tunjangan\n• Tidak memperhitungkan semua komponen\n• Menggunakan tarif lama yang sudah berubah\n• Tidak memperhitungkan status PTKP\n• Salah membedakan gross dan net`,
          `Gunakan kalkulator Toolinter untuk menghindari kesalahan perhitungan manual.`
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          `Q: Apakah hasil perhitungan Toolinter akurat?\nA: Hasil bersifat simulasi berdasarkan aturan terbaru. Untuk keputusan final, verifikasi dengan aturan resmi atau konsultasikan dengan HR.`,
          `Q: Apakah data gaji saya disimpan?\nA: Tidak. Seluruh perhitungan berjalan di browser. Data tidak dikirim ke server atau disimpan.`,
          `Q: Berapa sering aturan berubah?\nA: Tarif pajak, BPJS, dan UMR bisa berubah setiap tahun. Selalu cek sumber resmi untuk data terbaru.`,
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
          `${titleClean} bisa dilakukan langsung di browser tanpa install aplikasi. Di Toolinter, upload file, pilih opsi yang dibutuhkan, lalu download hasilnya. Proses cepat, gratis, dan file tetap aman di perangkat kamu.`
        ]
      },
      {
        heading: `Kapan Kamu Butuh ${pdfType.charAt(0).toUpperCase() + pdfType.slice(1)} PDF?`,
        paragraphs: [
          `Ada beberapa situasi yang membutuhkan ${pdfType} PDF:`,
          `• Mengirim dokumen via email dengan ukuran terbatas\n• Upload dokumen ke portal CPNS, beasiswa, atau lamaran kerja\n• Menggabungkan beberapa dokumen jadi satu file\n• Mengambil halaman tertentu dari dokumen besar\n• Mengonversi format dokumen untuk keperluan tertentu`,
          `Proses yang cepat dan praktis menghemat waktu kamu, terutama saat deadline mendesak.`
        ]
      },
      {
        heading: 'Cara Pakai Tool Toolinter',
        paragraphs: [
          `Berikut langkah-langkah menggunakan tool PDF Toolinter:`,
          `1. Buka halaman tool yang sesuai di Toolinter.\n2. Upload file PDF atau dokumen yang ingin diproses.\n3. Pilih opsi yang dibutuhkan (kualitas, halaman, format).\n4. Klik "Proses" untuk memulai konversi.\n5. Download hasilnya.\n6. Buka file hasil untuk memastikan kualitas tetap baik.`,
          `Seluruh proses berjalan di browser. File tidak diunggah ke server, sehingga privasi dokumen tetap aman.`
        ]
      },
      {
        heading: 'Tips Kualitas Output',
        paragraphs: [
          `Beberapa tips untuk hasil terbaik:`,
          `• Gunakan file asli dengan resolusi tinggi\n• Pilih kualitas yang sesuai kebutuhan (tinggi untuk cetak, sedang untuk email)\n• Cek hasil di beberapa device sebelum mengirim\n• Simpan file asli sebagai backup\n• Jika hasil blur, coba kurangi tingkat kompresi`,
          `Dengan mengikuti tips ini, kualitas dokumen tetap terjaga meski sudah diproses.`
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          `Q: Apakah file saya aman di Toolinter?\nA: Ya. Seluruh proses berjalan di browser. File tidak diunggah ke server mana pun.`,
          `Q: Berapa ukuran maksimal file?\nA: Batas tergantung kapasitas browser, biasanya hingga 100MB per file.`,
          `Q: Apakah hasilnya bisa diedit?\nA: Tergantung tool yang dipakai. Untuk hasil yang bisa diedit, gunakan konversi ke Word atau format lain.`,
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
          `${titleClean} bisa dibuat dalam hitungan menit menggunakan generator CV ATS Toolinter. Isi data diri, pengalaman, dan keahlian, lalu download CV dalam format PDF. Gratis, tanpa watermark, dan ramah ATS (Applicant Tracking System).`
        ]
      },
      {
        heading: 'Apa Itu CV ATS-Friendly?',
        paragraphs: [
          'CV ATS-friendly adalah CV yang bisa dibaca oleh sistem ATS (Applicant Tracking System) yang digunakan perusahaan untuk menyaring pelamar. Format yang benar memastikan CV kamu lolos screening otomatis dan sampai ke tangan HR.',
          'CV yang tidak ATS-friendly sering ditolak oleh sistem sebelum dibaca manusia. Format yang rumit, font aneh, atau struktur yang tidak standar bisa menyebabkan data kamu tidak terbaca.'
        ]
      },
      {
        heading: 'Struktur CV yang Benar',
        paragraphs: [
          'Berikut struktur CV yang disarankan untuk ATS:',
          '• Header: nama, kontak, LinkedIn (opsional)\n• Ringkasan profil: 2-3 kalimat tentang diri kamu\n• Pengalaman kerja: urutkan dari terbaru\n• Pendidikan: gelar, institusi, tahun\n• Keahlian: hard skill dan soft skill\n• Sertifikasi/pelatihan (jika ada)',
          'Gunakan font standar (Arial, Calibri) ukuran 10-12pt. Hindari tabel, grafik, atau elemen dekoratif yang sulit dibaca ATS.'
        ]
      },
      {
        heading: 'Cara Buat CV dengan Toolinter',
        paragraphs: [
          'Berikut langkah-langkah membuat CV menggunakan Toolinter:',
          '1. Buka Generator CV ATS Toolinter.\n2. Pilih template yang sesuai.\n3. Isi data diri, pengalaman, dan keahlian.\n4. Preview hasil CV.\n5. Download dalam format PDF.\n6. Cek ulang sebelum dikirim ke perusahaan.',
          'Proses berjalan di browser. Data tidak disimpan di server.'
        ]
      },
      {
        heading: 'Kesalahan CV yang Harus Dihindari',
        paragraphs: [
          'Beberapa kesalahan umum yang sering terjadi:',
          '• CV terlalu panjang (idealnya 1-2 halaman)\n• Font terlalu kecil atau sulit dibaca\n• Tidak ada keyword yang sesuai deskripsi pekerjaan\n• Menggunakan foto yang tidak profesional\n• Salah ejaan atau tata bahasa\n• Tidak mencantumkan hasil/achievement',
          'Hindari kesalahan ini agar CV kamu dilirik HR.'
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          'Q: Apakah CV dari Toolinter bisa langsung dipakai?\nA: Ya, tapi sesuaikan dengan posisi yang dilamar. Tambahkan keyword dari deskripsi pekerjaan.',
          'Q: Format file apa yang dihasilkan?\nA: PDF, siap kirim dan cetak.',
          'Q: Apakah data saya disimpan?\nA: Tidak. Seluruh proses berjalan di browser.',
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
          `${titleClean} bisa dihitung secara instan menggunakan kalkulator online Toolinter. Masukkan data bisnis kamu, lalu hasil perhitungan langsung muncul. Gratis, akurat, dan bisa di-download sebagai PDF untuk arsip.`
        ]
      },
      {
        heading: 'Apa Itu dan Kenapa Penting?',
        paragraphs: [
          'Komponen ini penting untuk menjalankan bisnis yang sehat. Tanpa perhitungan yang benar, kamu bisa salah menentukan harga jual, tidak tahu berapa keuntungan bersih, atau kehilangan peluang efisiensi.',
          'Pemahaman yang benar membantu kamu membuat keputusan bisnis yang tepat berdasarkan data, bukan perkiraan.'
        ]
      },
      {
        heading: 'Rumus dan Cara Hitung',
        paragraphs: [
          'Berikut rumus dasar yang digunakan:',
          '• Masukkan data bisnis di kalkulator Toolinter\n• Pastikan angka yang dimasukkan akurat\n• Klik "Hitung" untuk melihat hasil\n• Analisis hasil dan bandingkan dengan target bisnis kamu',
          'Gunakan data penjualan dan pengeluaran terbaru untuk hasil yang paling akurat.'
        ]
      },
      {
        heading: 'Contoh Perhitungan',
        paragraphs: [
          'Berikut contoh penerapan:',
          '• Masukkan omzet penjualan bulanan\n• Tambahkan semua biaya operasional\n• Kalkulator menghitung margin keuntungan\n• Download hasil untuk evaluasi bisnis',
          'Lakukan evaluasi rutin (bulanan atau mingguan) untuk memantau kesehatan bisnis kamu.'
        ]
      },
      {
        heading: 'Kesalahan Umum UMKM',
        paragraphs: [
          'Beberapa kesalahan yang sering terjadi:',
          '• Tidak mencatat semua biaya operasional\n• Salah menghitung HPP (harga pokok penjualan)\n• Tidak memperhitungkan fee marketplace\n• Menentukan harga tanpa data margin\n• Tidak memisahkan uang pribadi dan bisnis',
          'Hindari kesalahan ini agar bisnis kamu lebih sehat dan menguntungkan.'
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          'Q: Apakah kalkulator ini cocok untuk semua jenis bisnis?\nA: Ya, bisa dipakai untuk bisnis F&B, retail, jasa, dan online shop.',
          'Q: Apakah data bisnis saya aman?\nA: Ya. Semua perhitungan berjalan di browser. Data tidak disimpan.',
          'Q: Berapa sering saya harus evaluasi?\nA: Idealnya setiap bulan untuk memantau tren bisnis kamu.',
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
          `${titleClean} bisa dilakukan secara instan menggunakan kalkulator online Toolinter. Masukkan data keuangan kamu, lalu hasil simulasi langsung muncul. Gratis, akurat, dan bisa di-download sebagai PDF.`
        ]
      },
      {
        heading: 'Apa Itu dan Kenapa Penting?',
        paragraphs: [
          'Perencanaan keuangan yang baik dimulai dari pemahaman yang benar tentang komponen keuangan kamu. Menghitung dengan akurat membantu kamu membuat keputusan finansial yang tepat.',
          'Baik untuk simulasi kredit, investasi, atau dana darurat, perhitungan yang benar membantu kamu merencanakan masa depan dengan lebih percaya diri.'
        ]
      },
      {
        heading: 'Rumus dan Cara Hitung',
        paragraphs: [
          'Berikut cara menghitung menggunakan kalkulator Toolinter:',
          '• Masukkan data keuangan yang diminta\n• Pilih parameter (tenor, suku bunga, jumlah)\n• Klik "Hitung" untuk melihat simulasi\n• Analisis hasil dan bandingkan dengan kemampuan finansial kamu',
          'Gunakan data terbaru dan realistis untuk simulasi yang akurat.'
        ]
      },
      {
        heading: 'Contoh Simulasi',
        paragraphs: [
          'Berikut contoh simulasi:',
          '• Masukkan nominal pinjaman atau investasi\n• Pilih tenor dan suku bunga\n• Kalkulator menampilkan cicilan atau pertumbuhan\n• Download hasil simulasi untuk referensi',
          'Simulasi ini bersifat estimasi. Untuk keputusan final, konsultasikan dengan lembaga keuangan terkait.'
        ]
      },
      {
        heading: 'Kesalahan Umum',
        paragraphs: [
          'Beberapa kesalahan yang sering terjadi:',
          '• Tidak memperhitungkan biaya tambahan (asuransi, admin)\n• Menggunakan suku bunga yang tidak realistis\n• Tidak memperhitungkan kemampuan cicilan\n• Terlalu optimis dengan pertumbuhan investasi\n• Tidak memiliki dana darurat sebelum berinvestasi',
          'Hindari kesalahan ini agar perencanaan keuangan kamu lebih realistis.'
        ]
      },
      {
        heading: 'FAQ',
        paragraphs: [
          'Q: Apakah simulasi ini akurat?\nA: Simulasi bersifat estimasi. Angka aktual bisa berbeda tergantung kebijakan lembaga keuangan.',
          'Q: Apakah data keuangan saya aman?\nA: Ya. Semua perhitungan berjalan di browser. Data tidak disimpan.',
          'Q: Apakah ini pengganti konsultan keuangan?\nA: Tidak. Tool ini untuk simulasi awal. Untuk keputusan besar, konsultasikan dengan ahli.',
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
console.log('Slugs:', expandedSlugs.join(', '));

// Reconstruct blog.ts
// We need to serialize posts back to the file format
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
console.log(`\nWrote ${expandedCount} expanded posts to ${blogPath}`);
console.log(`Total posts in file: ${posts.length}`);
