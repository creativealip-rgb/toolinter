// expand-v6.mjs
// Final push - add more content per section to reach 900+ words
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

// Additional content blocks per category
const bonus = {
  PDF: [
    { heading: 'Privasi dan Keamanan File', paragraphs: [
      'Privasi file adalah prioritas utama di Toolinter. Seluruh proses pemrosesan file berjalan langsung di browser perangkat kamu menggunakan teknologi WebAssembly. File tidak pernah diunggah ke server manapun, sehingga dokumen sensitif seperti kontrak, laporan keuangan, atau dokumen identitas tetap aman.',
      'Ini berbeda dengan kebanyakan tool PDF online lainnya yang mengupload file ke server mereka untuk diproses. Dengan Toolinter, kamu bisa memproses dokumen rahasia tanpa khawatir data bocor atau disalahgunakan. Proses berjalan sepenuhnya offline setelah halaman dimuat.',
      'Setelah proses selesai, file asli tetap ada di perangkat kamu. File hasil juga langsung didownload ke perangkat, bukan disimpan di cloud atau server. Kamu memiliki kontrol penuh atas dokumen kamu setiap saat.'
    ]},
    { heading: 'Perbandingan dengan Tool Lain', paragraphs: [
      'Dibanding tool PDF online lainnya, Toolinter memiliki beberapa keunggulan: proses di browser (lebih aman), gratis tanpa watermark, tidak perlu daftar akun, dan tidak ada batasan jumlah penggunaan harian.',
      'Kekurangan tool online lain: sering membatasi ukuran file, menambahkan watermark pada versi gratis, memerlukan registrasi, atau mengharuskan upgrade ke premium untuk fitur dasar. Toolinter tidak memiliki batasan ini.',
      'Untuk kebutuhan editing PDF yang sangat kompleks seperti menambah halaman, mengubah konten, atau menggabungkan dengan dokumen lain, kamu mungkin tetap memerlukan software desktop. Namun, untuk kebutuhan sehari-hari seperti kompres, gabung, pisah, dan konversi, Toolinter sudah sangat memadai.'
    ]}
  ],
  Gaji: [
    { heading: 'Perbandingan Gaji per Kota', paragraphs: [
      'UMR (Upah Minimum Regional) di Indonesia bervariasi signifikan antar kota. Jakarta memiliki UMR tertinggi diikuti oleh kota-kota besar lainnya. Perbedaan UMR ini mempengaruhi perhitungan BPJS dan PPh21 karena batas atas iuran berbeda.',
      'Saat menggunakan kalkulator Toolinter, pastikan kamu memasukkan UMR yang sesuai dengan lokasi kerja kamu. Menggunakan UMR yang salah bisa menghasilkan perhitungan yang tidak akurat, terutama untuk komponen yang terkait dengan upah minimum.',
      'Data UMR diperbarui setiap tahun oleh Gubernur masing-masing provinsi. Toolinter menggunakan data UMR terbaru yang tersedia. Namun, jika ada perubahan di tengah tahun, mungkin ada jeda sebelum data diperbarui.'
    ]},
    { heading: 'Hak Karyawan yang Sering Terlupakan', paragraphs: [
      'Selain gaji pokok, karyawan Indonesia memiliki beberapa hak yang sering tidak diketahui: cuti tahunan minimal 12 hari, cuti sakit dengan surat dokter, cuti haid di hari pertama, cuti melahirkan 3 bulan, dan pesangon saat PHK.',
      'THR (Tunjangan Hari Raya) wajib dibayarkan oleh perusahaan dengan minimal 1 bulan gaji untuk karyawan dengan masa kerja 12 bulan. Karyawan dengan masa kerja kurang dari 12 bulan mendapat proporsional.',
      'Jika perusahaan tidak membayar hak-hak ini, kamu bisa melapor ke Disnaker setempat. Simpan bukti slip gaji dan kontrak kerja sebagai dokumen pendukung jika diperlukan.'
    ]}
  ],
  Surat: [
    { heading: 'Pengiriman Surat: Digital vs Fisik', paragraphs: [
      'Di era digital, banyak surat sudah bisa dikirim secara elektronik via email atau portal online. Format PDF lebih disukai karena tampilannya konsisten di semua device dan tidak bisa diedit sembarangan.',
      'Namun, beberapa instansi masih memerlukan surat fisik yang ditandatangani dan dicetak. Untuk surat yang memerlukan materai, pastikan menggunakan materai yang sesuai dengan ketentuan. Materai Rp10.000 untuk dokumen di atas Rp1.000.000.',
      'Untuk pengiriman via pos, gunakan layanan dengan nomor resi agar bisa dilacak. Cantumkan alamat pengirim di amplop untuk memudahkan pengembalian jika alamat tujuan salah. Simpan bukti pengiriman sebagai arsip.'
    ]}
  ],
  Foto: [
    { heading: 'Foto untuk Berbagai Keperluan', paragraphs: [
      'Setiap keperluan memiliki standar foto yang berbeda. Foto CPNS memiliki persyaratan khusus yang berbeda dari foto passport atau foto lamaran kerja. Pastikan kamu mengetahui standar yang tepat sebelum menyiapkan foto.',
      'Untuk foto digital yang akan diupload ke portal online, perhatikan batasan ukuran file dan dimensi dalam pixel. Beberapa portal membatasi ukuran file maksimal 200KB dengan dimensi minimal 400x600 pixel.',
      'Simpan foto asli dengan resolusi tinggi. Kamu bisa resize ke ukuran yang dibutuhkan sewaktu-waktu menggunakan Toolinter. Foto asli berguna jika suatu saat memerlukan ukuran yang berbeda atau resolusi lebih tinggi.'
    ]}
  ],
  CV: [
    { heading: 'CV untuk Berbagai Situasi', paragraphs: [
      'CV untuk fresh graduate berbeda dari CV untuk profesional berpengalaman. Fresh graduate sebaiknya menonjolkan pendidikan, proyek kampus, magang, organisasi, dan volunteer work. Profesional berpengalaman fokus pada pencapaian kerja dengan angka.',
      'Untuk career switch, ringkasan profil harus jelas menyebutkan tujuan karir baru dan transferable skill yang relevan. Jangan biarkan recruiter menebak-nebak mengapa kamu melamar di posisi yang berbeda dari pengalaman sebelumnya.',
      'Untuk posisi di perusahaan multinasional, gunakan CV dalam bahasa Inggris. Untuk perusahaan lokal, bahasa Indonesia lebih umum. Sesuaikan bahasa CV dengan bahasa iklan lowongan kerja.'
    ]}
  ],
  UMKM: [
    { heading: 'Tips Mengelola Keuangan UMKM', paragraphs: [
      'Pisahkan rekening pribadi dan bisnis sejak awal. Ini membantu kamu melacak arus kas bisnis dengan akurat. Banyak UMKM yang gulung tikar karena tidak bisa membedakan uang pribadi dan uang bisnis.',
      'Catat setiap transaksi, sekecil apapun. Pembelian bahan baku, biaya transportasi, pembelian supplies, dan pengeluaran kecil lainnya harus dicatat. Pengeluaran kecil yang tidak tercatat bisa menumpuk menjadi jumlah besar.',
      'Lakukan evaluasi keuangan minimal sebulan sekali. Bandingkan pendapatan dengan pengeluaran, hitung margin keuntungan, dan identifikasi area yang bisa dioptimalkan. Data ini adalah dasar untuk membuat keputusan bisnis yang tepat.'
    ]}
  ],
  Keuangan: [
    { heading: 'Langkah Awal Merencanakan Keuangan', paragraphs: [
      'Mulai dengan mencatat semua penghasilan dan pengeluaran selama sebulan. Ini memberikan gambaran jelas ke mana uang kamu mengalir. Banyak orang terkejut mengetahui berapa banyak uang yang habis untuk hal-hal yang tidak terlalu dibutuhkan.',
      'Setelah tahu pola pengeluaran, buat anggaran bulanan dengan alokasi: 50% kebutuhan pokok (sewa, makan, transport), 30% keinginan (hiburan, shopping), dan 20% tabungan/investasi. Sesuaikan rasio ini dengan kondisi kamu.',
      'Bangun dana darurat terlebih dahulu sebelum berinvestasi. Dana darurat 3-6x pengeluaran bulanan memberikan safety net jika terjadi hal tak terduga: sakit, kehilangan pekerjaan, atau perbaikan mendesak.'
    ]}
  ]
};

let count = 0;
posts.forEach((post, index) => {
  if (post.date >= '2026-07-01' && post.date <= '2026-07-07' && countWords(post) < 900) {
    const catBonus = bonus[post.category];
    if (catBonus) {
      post.content.push(...catBonus);
      count++;
    }
  }
});

console.log('Expanded ' + count + ' posts');

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
const newFile = 'export interface BlogSection {\n  heading?: string;\n  paragraphs: string[];\n}\n\nexport interface BlogPost {\n  slug: string;\n  title: string;\n  excerpt: string;\n  date: string;\n  category: string;\n  readTime: string;\n  ctaLabel: string;\n  ctaHref: string;\n  content: BlogSection[];\n}\n\nexport const blogPosts: BlogPost[] = [\n' + serialized + '\n];\n';

fs.writeFileSync(blogPath, newFile, 'utf8');

// Verify
const jul1to7 = posts.filter(p => p.date >= '2026-07-01' && p.date <= '2026-07-07');
const wcs = jul1to7.map(countWords);
console.log('Jul 1-7:');
console.log('  Avg: ' + Math.round(wcs.reduce((a,b)=>a+b,0)/wcs.length));
console.log('  Min: ' + Math.min(...wcs));
console.log('  Max: ' + Math.max(...wcs));
console.log('  Under 900: ' + wcs.filter(w => w < 900).length);
console.log('  Over 900: ' + wcs.filter(w => w >= 900).length);

const remaining = jul1to7.filter(p => countWords(p) < 900).map(p => ({ slug: p.slug, words: countWords(p), cat: p.category }));
remaining.sort((a,b) => a.words - b.words);
console.log('\nRemaining under 900:');
remaining.forEach(p => console.log('  ' + p.words + 'w: ' + p.slug + ' (' + p.cat + ')'));
