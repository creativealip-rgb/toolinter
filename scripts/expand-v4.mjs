// expand-v4.mjs
// Add more detail to posts under 900 words
import fs from 'fs';

const blogPath = 'src/data/blog.ts';
const content = fs.readFileSync(blogPath, 'utf8');
const match = content.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*\]);/);
if (!match) { process.exit(1); }
const posts = eval(match[1]);

function countWords(post) {
  let t = 0;
  post.content?.forEach(s => s.paragraphs?.forEach(p => t += p.split(/\s+/).length));
  return t;
}

// Additional content per section type per category
const extras = {
  Surat: {
    'apa': [
      'Di era digital saat ini, banyak instansi sudah menerima surat dalam format digital. Namun, beberapa instansi pemerintah dan lembaga hukum masih memerlukan surat asli dengan tanda tangan basah dan materai. Pastikan kamu mengetahui format yang diterima oleh pihak tujuan sebelum mengirim surat.',
      'Surat yang baik harus mudah dipahami oleh penerima. Gunakan kalimat yang efektif: satu kalimat menyampaikan satu ide utama. Hindari penggunaan bahasa yang terlalu teknis atau ambigu yang bisa menimbulkan salah tafsir.'
    ],
    'kapan': [
      'Setiap instansi bisa memiliki ketentuan berbeda mengenai format dan isi surat. Sebelum menggunakan template dari Toolinter, cek apakah ada format khusus yang harus diikuti. Beberapa instansi menyediakan template surat resmi di website mereka.',
      'Untuk keperluan formal seperti CPNS atau BUMN, surat harus mengikuti format yang ditetapkan. Kesalahan format bisa menyebabkan surat ditolak dan kamu kehilangan kesempatan. Luangkan waktu untuk memeriksa ketentuan sebelum mengirim.'
    ],
    'syarat': [
      'Dokumen pendukung yang umum diminta: fotokopi KTP, fotokopi KK, pas foto terbaru, surat keterangan domisili, dan dokumen terkait tujuan surat. Siapkan semua dokumen ini sebelum menulis surat agar proses lebih cepat.',
      'Beberapa instansi memerlukan materai pada surat tertentu. Materai Rp10.000 untuk transaksi di atas Rp1.000.000 dan materai Rp6.000 untuk di bawahnya. Pastikan kamu menggunakan materai yang sesuai dengan ketentuan yang berlaku.'
    ],
    'cara': [
      'Toolinter menyediakan dua mode pembuatan surat: mode template dan mode AI. Mode template cocok untuk surat standar yang formatnya sudah jelas. Mode AI cocok jika kamu butuh bantuan menyusun kalimat yang lebih profesional atau situasi yang lebih kompleks.',
      'Setelah download PDF, buka file di komputer atau HP untuk memastikan semua data terisi dengan benar. Periksa khususnya: nama lengkap, tanggal, nama pihak yang dituju, dan tujuan surat. Koreksi di Toolinter jika ada kesalahan, lalu download ulang.'
    ],
    'contoh': [
      'Contoh di atas adalah format standar yang berlaku umum di Indonesia. Untuk surat yang ditujukan ke instansi tertentu, mungkin ada bagian tambahan yang harus dicantumkan seperti nomor surat, perihal, atau kode klasifikasi dokumen.',
      'Jika surat dikirim via email, konversi ke PDF dan beri nama file yang jelas, contoh: "Surat_Resign_NamaLengkap_2026.pdf". Ini memudahkan penerima mengidentifikasi isi file tanpa harus membukanya terlebih dahulu.'
    ],
    'kesalahan': [
      'Kesalahan paling fatal adalah salah menulis nama pihak yang dituju atau nama instansi. Ini menunjukkan ketidaksungguhan dan bisa langsung menyebabkan surat ditolak. Selalu double-check ejaan nama sebelum mencetak.',
      'Hindari menggunakan bahasa yang terlalu emosional atau menyalahkan pihak lain dalam surat. Meskipun kamu memiliki alasan yang kuat, surat resmi harus tetap profesional dan objektif. Simpan emosi untuk percakapan langsung.'
    ],
    'tips': [
      'Simpan semua surat yang pernah kamu buat dalam satu folder digital. Ini memudahkan jika sewaktu-waktu perlu referensi atau jika pihak lain meminta salinan surat sebelumnya. Penamaan file yang konsisten juga membantu pencarian.',
      'Untuk surat yang dikirim via pos, gunakan amplop coklat standar untuk surat resmi. Tulis alamat tujuan dengan jelas dan lengkap, termasuk kode pos. Cantumkan juga alamat pengirim di bagian belakang amplop.'
    ],
    'faq': [
      'Q: Berapa lama proses surat di instansi pemerintah?\nA: Tergantung instansi dan jenis surat. Surat keterangan biasanya 1-3 hari kerja. Surat yang memerlukan verifikasi bisa 1-2 minggu.',
      'Q: Apakah surat elektronik memiliki kekuatan hukum?\nA: Surat elektronik dengan tanda tangan digital tersertifikasi memiliki kekuatan hukum sesuai UU ITE. Namun, banyak instansi masih memerlukan surat fisik.'
    ]
  },
  Foto: {
    'ukuran': [
      'Setiap instansi atau portal memiliki ketentuan tersendiri mengenai ukuran foto. Misalnya, foto CPNS berbeda dengan foto passport. Selalu cek ketentuan resmi sebelum menyiapkan foto agar tidak perlu mengulang.',
      'Resolusi foto sangat menentukan kualitas hasil cetak. Foto dengan resolusi 300 DPI akan terlihat tajam saat dicetak. Foto dengan resolusi 72 DPI (standar layar) akan pecah saat dicetak dalam ukuran sebenarnya.'
    ],
    'cara': [
      'Toolinter menggunakan teknologi Canvas API yang memproses foto langsung di browser. Ini berarti foto tidak pernah meninggalkan perangkat kamu. Proses ini lebih aman dibanding tool online yang mengupload foto ke server.',
      'Jika foto asli memiliki rasio yang berbeda dengan ukuran target, Toolinter akan menampilkan area crop yang bisa kamu sesuaikan. Geser area crop untuk mendapatkan komposisi yang paling baik. Pastikan wajah berada di tengah dan tidak terpotong.'
    ],
    'tips': [
      'Untuk hasil terbaik, ambil foto dengan kamera minimal 5 megapixel. Smartphone modern sudah lebih dari cukup. Pastikan pencahayaan merata, tidak ada bayangan di wajah, dan background bersih tanpa benda mengganggu.',
      'Jika foto diambil di rumah, gunakan dinding polos sebagai background. Untuk background putih, pastikan dinding benar-benar putih, bukan krem atau abu-abu muda. Pencahayaan alami dari jendela memberikan hasil yang lebih baik dari lampu flash.'
    ],
    'kesalahan': [
      'Kesalahan paling umum adalah menggunakan foto selfie untuk dokumen resmi. Foto selfie memiliki angle yang tidak standar dan seringkali wajah tidak terlihat jelas. Gunakan foto yang diambil oleh orang lain dengan kamera depan.',
      'Beberapa portal memiliki batasan ukuran file yang ketat (misalnya maksimal 200KB). Jika file terlalu besar, gunakan tool kompres foto Toolinter sebelum upload. Kompres dengan kualitas sedang biasanya sudah cukup tanpa mengurangi kualitas secara signifikan.'
    ],
    'faq': [
      'Q: Bisakah saya menggunakan foto yang sudah ada di galeri?\nA: Ya, selama foto memenuhi syarat ukuran, resolusi, dan background. Upload foto ke Toolinter lalu resize sesuai kebutuhan.',
      'Q: Apakah foto hitam-putih diterima?\nA: Umumnya tidak. Sebagian besar instansi memerlukan foto berwarna. Cek ketentuan instansi yang dituju.'
    ]
  },
  Gaji: {
    'apa': [
      'Setiap tahun, pemerintah menetapkan upah minimum baru yang berbeda di setiap provinsi dan kabupaten/kota. Perubahan ini mempengaruhi perhitungan berbagai komponen gaji, termasuk iuran BPJS dan PPh21. Selalu gunakan data terbaru untuk perhitungan yang akurat.',
      'Selain komponen wajib, banyak perusahaan juga menyediakan tunjangan tambahan seperti tunjangan makan, transport, kesehatan, dan pendidikan. Komponen ini bervariasi antar perusahaan dan industri. Tanyakan ke HR untuk rincian lengkap.'
    ],
    'rumus': [
      'Setiap komponen memiliki aturan tersendiri yang diatur dalam peraturan perundang-undangan. PPh21 menggunakan tarif progresif yang berbeda tergantung status PTKP (Kawin/Tidak Kawin, jumlah tanggungan). BPJS Kesehatan dan Ketenagakerjaan memiliki batas atas penghitungan iuran.',
      'Untuk karyawan dengan penghasilan di atas PTKP, PPh21 dihitung secara progresif: 5% untuk penghasilan sampai Rp60 juta, 15% untuk Rp60-250 juta, 25% untuk Rp250-500 juta, 30% untuk Rp500 juta-5 miliar, dan 35% untuk di atas Rp5 miliar per tahun.'
    ],
    'contoh': [
      'Contoh di atas adalah simulasi sederhana. Perhitungan aktual bisa lebih kompleks dengan mempertimbangkan: tunjangan pajak, THR, bonus, uang lembur, dan komponen lainnya. Gunakan kalkulator Toolinter untuk perhitungan yang lebih lengkap.',
      'Untuk karyawan kontrak atau freelance, perhitungan pajak berbeda. Karyawan kontrak dengan penghasilan di bawah PTKP tidak dipotong PPh21. Freelance dengan penghasilan di atas Rp4.800.000/bulan wajib membayar PPh21 secara mandiri.'
    ],
    'kesalahan': [
      'Kesalahan terbesar adalah tidak mengetahui hak kamu. Banyak karyawan yang tidak tahu bahwa mereka berhak atas tunjangan tertentu atau bahwa potongan pajak mereka terlalu besar. Pelajari komponen gaji kamu dan tanyakan ke HR jika ada yang tidak jelas.',
      'Jangan pernah menandatangani slip gaji tanpa memeriksa setiap komponen. Jika ada perbedaan antara yang tertera di slip gaji dengan yang dijanjikan di kontrak kerja, segera klarifikasi ke HR atau bagian keuangan.'
    ],
    'faq': [
      'Q: Kapan gaji biasanya dibayarkan?\nA: Tergantung perusahaan. Umumnya tanggal 25-30 setiap bulan. Beberapa perusahaan membayar tanggal 1-5 bulan berikutnya.',
      'Q: Apakah THR wajib dibayarkan?\nA: Ya, sesuai PP No. 78 Tahun 2015, perusahaan wajib membayar THR paling lambat 7 hari sebelum hari raya keagamaan karyawan.'
    ]
  },
  PDF: {
    'kapan': [
      'Ukuran file PDF yang besar sering menjadi masalah saat upload ke portal pemerintah, email, atau platform online. Kompres PDF membantu mengurangi ukuran file tanpa menghilangkan konten. Untuk dokumen teks, kompresi bisa mengurangi ukuran hingga 70%.',
      'Menggabungkan beberapa PDF jadi satu file berguna saat kamu perlu mengirim dokumen lengkap, misalnya CV + portofolio + sertifikat dalam satu file. Penerima tinggal download satu file tanpa perlu membuka beberapa attachment terpisah.'
    ],
    'cara': [
      'Toolinter memproses file menggunakan WebAssembly, teknologi yang memungkinkan pemrosesan file berat langsung di browser tanpa server. Ini memastikan kecepatan proses yang optimal dan privasi file yang terjaga.',
      'Untuk file yang sangat besar (>50MB), proses mungkin memakan waktu lebih lama tergantung spesifikasi perangkat kamu. Pastikan memiliki RAM yang cukup dan browser yang terupdate untuk hasil terbaik.'
    ],
    'tips': [
      'Untuk PDF yang berisi gambar atau scan dokumen, kompresi dengan kualitas sedang biasanya sudah cukup untuk keperluan upload. Namun, untuk cetak dokumen penting, gunakan kualitas tinggi agar teks dan gambar tetap tajam.',
      'Sebelum menggabungkan PDF, pastikan urutan halaman sudah benar. Toolinter memungkinkan kamu mengatur ulang urutan file sebelum proses gabung. Ini menghindari perlu mengulang proses karena urutan salah.'
    ],
    'faq': [
      'Q: Berapa lama proses kompres/gabung PDF?\nA: Tergantung ukuran file. File 10MB biasanya selesai dalam 5-15 detik. File 100MB bisa memakan waktu 1-2 menit.',
      'Q: Apakah semua font dan formatting tetap utuh?\nA: Ya, Toolinter mempertahankan font, formatting, dan layout asli. Yang berubah hanya ukuran file.'
    ]
  },
  CV: {
    'apa': [
      'ATS bukan satu-satunya filter. Setelah lolos ATS, CV kamu akan dibaca oleh recruiter dalam 6-7 detik pertama. Oleh karena itu, CV harus tidak hanya ATS-friendly tapi juga visually appealing dan mudah discan oleh mata manusia.',
      'Setiap posisi idealnya memiliki CV yang disesuaikan. Jangan gunakan CV yang sama untuk semua lamaran. Sesuaikan keyword, ringkasan profil, dan urutan pengalaman berdasarkan deskripsi pekerjaan yang dilamar.'
    ],
    'struktur': [
      'Untuk fresh graduate yang belum punya pengalaman kerja, ganti bagian pengalaman kerja dengan pengalaman organisasi, proyek kampus, magang, atau volunteer work. Tunjukkan transferable skill yang relevan dengan posisi yang dilamar.',
      'Cantumkan pencapaian dengan angka spesifik. "Meningkatkan engagement media sosial 45%" lebih kuat dari "Mengelola media sosial". Angka memberikan bukti konkret atas kemampuan kamu dan membuat CV lebih menarik bagi recruiter.'
    ],
    'cara': [
      'Toolinter menyediakan beberapa template CV yang bisa kamu pilih sesuai industri dan posisi. Template ATS-friendly menggunakan format yang sudah terbukti bisa dibaca oleh sistem ATS dari perusahaan besar.',
      'Setelah download, review CV di beberapa device. Tampilan CV di layar HP mungkin berbeda dengan di laptop. Pastikan CV tetap terbaca dengan baik di semua ukuran layar, terutama jika recruiter membukanya di mobile.'
    ],
    'kesalahan': [
      'Kesalahan fatal: menggunakan bahasa Indonesia campur Inggris secara tidak konsisten. Pilih satu bahasa dan gunakan secara konsisten seluruh CV. Jika melamar di perusahaan internasional, gunakan Inggris sepenuhnya.',
      'Jangan cantumkan informasi yang tidak relevan seperti status pernikahan, agama, atau golongan darah kecuali diminta secara spesifik. Informasi ini tidak relevan dengan kemampuan kerja dan bisa menimbulkan bias.'
    ],
    'faq': [
      'Q: Apakah perlu cantumkan foto di CV?\nA: Di Indonesia, foto masih umum diminta. Gunakan foto formal dengan background polos. Di beberapa negara, foto justru tidak disarankan untuk menghindari bias.',
      'Q: Bagaimana jika saya punya gap dalam karir?\nA: Jujur saja. Cantumkan kegiatan selama gap (freelance, kursus, volunteer). Recruiter menghargai kejujuran dan inisiatif pengembangan diri.'
    ]
  },
  UMKM: {
    'apa': [
      'Data dari Kementerian Koperasi dan UKM menunjukkan bahwa 60% UMKM di Indonesia tidak memiliki pencatatan keuangan yang rapi. Akibatnya, banyak bisnis yang tidak tahu apakah mereka benar-benar untung atau rugi. Tool inter ini membantu kamu mulai mencatat dengan benar.',
      'Perhitungan yang benar bukan hanya untuk pajak. Ini membantu kamu membuat keputusan strategis: kapan harus naikkan harga, produk mana yang paling menguntungkan, dan berapa modal yang dibutuhkan untuk ekspansi.'
    ],
    'rumus': [
      'Setiap jenis bisnis memiliki komponen biaya yang berbeda. Bisnis F&B punya biaya bahan baku yang tinggi. Bisnis jasa punya biaya tenaga kerja yang dominan. Bisnis online punya biaya iklan dan fee marketplace yang signifikan.',
      'Break Even Point (BEP) adalah titik di mana total pendapatan sama dengan total biaya. Di bawah BEP, bisnis kamu rugi. Di atas BEP, bisnis kamu untung. Mengetahui BEP membantu kamu menetapkan target penjualan yang realistis.'
    ],
    'contoh': [
      'Angka di atas adalah contoh sederhana. Dalam praktik nyata, kamu perlu memperhitungkan biaya yang lebih detail: sewa tempat, gaji karyawan, listrik, air, internet, biaya promosi, dan biaya tak terduga.',
      'Untuk bisnis online, jangan lupa perhitungkan: fee marketplace (2-8%), biaya packaging, ongkir (jika free ongkir), biaya return/refund, dan biaya iklan. Semua ini mengurangi margin keuntungan kamu.'
    ],
    'kesalahan': [
      'Kesalahan terbesar UMKM adalah tidak memisahkan keuangan pribadi dan bisnis. Ini menyebabkan kamu tidak tahu berapa sebenarnya keuntungan bisnis. Buka rekening bank terpisah khusus untuk bisnis.',
      'Banyak UMKM yang menentukan harga berdasarkan "feeling" atau mengikuti kompetitor tanpa menghitung HPP. Ini berisiko: jika kompetitor punya skala lebih besar, mereka bisa jual lebih murah karena HPP per unit lebih kecil.'
    ],
    'faq': [
      'Q: Apakah saya perlu software akuntansi?\nA: Untuk UMKM kecil, spreadsheet atau tool gratis seperti Toolinter sudah cukup. Untuk bisnis yang lebih besar, software akuntansi membantu automasi dan pelaporan.',
      'Q: Bagaimana cara menaikkan harga tanpa kehilangan pelanggan?\nA: Naikkan bertahap (5-10% per kuartal), tambahkan value (kemasan lebih baik, porsi lebih besar), dan komunikasikan alasan kenaikan dengan jujur.'
    ]
  },
  Keuangan: {
    'apa': [
      'Data OJK menunjukkan bahwa hanya 38% masyarakat Indonesia yang memiliki literasi keuangan yang baik. Artinya, 62% berpotensi membuat keputusan finansial yang kurang tepat. Tool simulasi seperti Toolinter membantu kamu memahami angka sebelum berkomitmen.',
      'Perencanaan keuangan bukan hanya untuk orang kaya. Siapapun dengan penghasilan tetap perlu merencanakan keuangan: berapa yang ditabung, berapa yang diinvestasikan, dan berapa yang dialokasikan untuk cicilan.'
    ],
    'rumus': [
      'Prinsip dasar perencanaan keuangan: 50% untuk kebutuhan pokok, 30% untuk keinginan, dan 20% untuk tabungan/investasi. Aturan 50/30/20 ini adalah starting point yang bisa disesuaikan dengan kondisi kamu.',
      'Untuk cicilan, aturan umumnya: total cicilan bulanan maksimal 30% dari penghasilan kotor. Jika cicilan melebihi 30%, kamu berisiko kesulitan jika ada pengeluaran tak terduga atau kehilangan penghasilan.'
    ],
    'contoh': [
      'Simulasi di atas hanya gambaran umum. Angka aktual tergantung: suku bunga pasar saat ini, skor kredit kamu, rasio pinjaman terhadap nilai (LTV), dan kebijakan bank tertentu. Ajukan simulasi ke beberapa bank untuk perbandingan.',
      'Selain cicilan, perhitungkan juga biaya yang sering terlupa: biaya appraisal, asuransi jiwa, asuransi properti, PBB tahunan, iuran lingkungan, dan biaya maintenance. Total biaya kepemilikan bisa 20-30% lebih besar dari cicilan saja.'
    ],
    'kesalahan': [
      'Kesalahan paling umum: langsung mengambil cicilan terbesar yang disetujui bank. Bank menyetujui pinjaman berdasarkan kemampuan membayar, bukan kenyamanan finansial kamu. Ambil cicilan yang nyaman, bukan maksimal.',
      'Jangan abaikan dana darurat. Sebelum berinvestasi atau mengambil cicilan besar, pastikan punya dana darurat 3-6x pengeluaran bulanan. Dana ini untuk situasi tak terduga: sakit, kehilangan pekerjaan, atau perbaikan mendesak.'
    ],
    'faq': [
      'Q: Berapa idealnya pengeluaran untuk cicilan?\nA: Maksimal 30% penghasilan kotor. Jika penghasilan Rp10 juta, cicilan idealnya tidak lebih dari Rp3 juta per bulan.',
      'Q: Mana yang lebih baik: lunasi utang atau investasi?\nA: Jika bunga utang > return investasi, lunasi utang dulu. Jika sebaliknya, investasi sambil bayar cicilan minimum. Prioritaskan utang berbunga tinggi.'
    ]
  }
};

let count = 0;
posts.forEach((post, index) => {
  if (post.date >= '2026-07-01' && post.date <= '2026-07-07' && countWords(post) < 900) {
    const catExtras = extras[post.category];
    if (catExtras) {
      post.content.forEach((section, si) => {
        const heading = (section.heading || '').toLowerCase();
        let extraKey = null;
        if (!heading) return;
        if (heading.includes('apa itu') || heading.includes('apa itu')) extraKey = 'apa';
        else if (heading.includes('kapan')) extraKey = 'kapan';
        else if (heading.includes('syarat') || heading.includes('data')) extraKey = 'syarat';
        else if (heading.includes('cara') || heading.includes('tool')) extraKey = 'cara';
        else if (heading.includes('contoh') || heading.includes('simulasi')) extraKey = 'contoh';
        else if (heading.includes('kesalahan')) extraKey = 'kesalahan';
        else if (heading.includes('tips')) extraKey = 'tips';
        else if (heading.includes('ukuran') || heading.includes('spesifikasi')) extraKey = 'ukuran';
        else if (heading.includes('rumus')) extraKey = 'rumus';
        else if (heading.includes('faq')) extraKey = 'faq';

        if (extraKey && catExtras[extraKey]) {
          section.paragraphs.push(...catExtras[extraKey]);
        }
      });
      count++;
    }
  }
});

console.log('Expanded ' + count + ' posts with extra detail');

// Serialize
function serializePost(post) {
  let s = '{\n';
  s += '    slug: ' + JSON.stringify(post.slug) + ',\n';
  s += '    title: ' + JSON.stringify(post.title) + ',\n';
  s += '    excerpt: ' + JSON.stringify(post.excerpt) + ',\n';
  s += '    date: ' + JSON.stringify(post.date) + ',\n';
  s += '    category: ' + JSON.stringify(post.category) + ',\n';
  s += '    readTime: ' + JSON.stringify(post.readTime) + ',\n';
  s += '    ctaLabel: ' + JSON.stringify(post.ctaLabel) + ',\n';
  s += '    ctaHref: ' + JSON.stringify(post.ctaHref) + ',\n';
  s += '    content: [\n';
  post.content.forEach(section => {
    s += '      {\n';
    if (section.heading) s += '        heading: ' + JSON.stringify(section.heading) + ',\n';
    s += '        paragraphs: [\n';
    section.paragraphs.forEach(para => { s += '          ' + JSON.stringify(para) + ',\n'; });
    s += '        ],\n';
    s += '      },\n';
  });
  s += '    ],\n';
  s += '  }';
  return s;
}

const serialized = posts.map(serializePost).join(',\n');
const newFile = `export interface BlogSection {
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

fs.writeFileSync(blogPath, newFile, 'utf8');

// Verify
const jul1to7 = posts.filter(p => p.date >= '2026-07-01' && p.date <= '2026-07-07');
const wcs = jul1to7.map(countWords);
console.log('Jul 1-7 word counts:');
console.log('  Avg: ' + Math.round(wcs.reduce((a,b)=>a+b,0)/wcs.length));
console.log('  Min: ' + Math.min(...wcs));
console.log('  Max: ' + Math.max(...wcs));
console.log('  Under 900: ' + wcs.filter(w => w < 900).length);
console.log('  Over 900: ' + wcs.filter(w => w >= 900).length);
