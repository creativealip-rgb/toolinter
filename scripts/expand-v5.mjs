// expand-v5.mjs
// Final expansion - add disclaimer + extra FAQ to reach 900+ words
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

// Disclaimers per category
const disclaimers = {
  Surat: 'Catatan: Template ini bersifat panduan umum. Sesuaikan isi surat dengan kebijakan perusahaan/instansi dan kebutuhan pribadi sebelum digunakan. Format dan syarat bisa berbeda di setiap instansi.',
  Foto: 'Catatan: Ukuran dan syarat foto bisa berubah sewaktu-waktu sesuai ketentuan instansi. Selalu cek persyaratan terbaru di website resmi instansi yang dituju sebelum menyiapkan foto.',
  Gaji: 'Catatan: Simulasi ini bersifat estimasi. Tarif pajak, BPJS, UMR, dan aturan ketenagakerjaan bisa berubah sewaktu-waktu. Cek sumber resmi atau konsultasikan dengan HR/konsultan pajak untuk keputusan final.',
  PDF: 'Catatan: Toolinter memproses file langsung di browser tanpa mengupload ke server. Namun, selalu backup file asli sebelum memproses. Kualitas hasil tergantung kualitas file input.',
  CV: 'Catatan: Template CV ini bersifat panduan umum. Sesuaikan dengan posisi dan industri yang dilamar. Untuk posisi kreatif, pertimbangkan CV dengan desain yang lebih menarik.',
  UMKM: 'Catatan: Perhitungan ini bersifat simulasi untuk perencanaan bisnis. Angka aktual bisa berbeda tergantung kondisi pasar, lokasi, dan skala bisnis. Evaluasi rutin untuk hasil terbaik.',
  Keuangan: 'Catatan: Simulasi ini bersifat estimasi untuk perencanaan. Angka aktual tergantung kebijakan lembaga keuangan, suku bunga pasar, dan kondisi ekonomi. Untuk keputusan besar, konsultasikan dengan penasihat keuangan bersertifikat.'
};

// Extra FAQ questions per category
const extraFAQ = {
  Surat: [
    'Q: Bagaimana jika saya tidak tahu nama pihak yang dituju?\\nA: Gunakan jabatan umum seperti "Kepada Yth. HRD Manager" atau "Kepada Yth. Pimpinan". Hindari menggunakan "Yth. Bapak/Ibu" tanpa nama atau jabatan spesifik.',
    'Q: Apakah surat tangan diterima instansi?\\nA: Untuk surat pribadi seperti pernyataan, surat tangan bisa diterima. Untuk surat resmi ke instansi, gunakan ketik dan cetak untuk hasil yang lebih profesional dan mudah dibaca.'
  ],
  Foto: [
    'Q: Bisakah saya edit foto setelah resize?\\nA: Ya, kamu bisa resize ulang foto yang sama ke ukuran berbeda. Namun, setiap resize bisa sedikit mengurangi kualitas. Gunakan foto asli untuk hasil terbaik.',
    'Q: Apakah Toolinter mendukung foto untuk visa Schengen?\\nA: Ya. Pilih ukuran 3.5x4.5 cm dengan background putih sesuai standar ICAO untuk visa Schengen dan kebanyakan negara Eropa.'
  ],
  Gaji: [
    'Q: Apakah uang lembur kena pajak?\\nA: Ya, uang lembur termasuk penghasilan kena pajak. Namun, ada batas tertentu yang dikecualikan. Cek aturan PPh21 terbaru untuk detailnya.',
    'Q: Bagaimana cara negosiasi gaji yang baik?\\nA: Riset standar gaji untuk posisi dan lokasi kamu. Siapkan data pencapaian kerja dengan angka. Tunjukkan value yang bisa kamu berikan. Jangan terima tawaran pertama jika merasa kurang.'
  ],
  PDF: [
    'Q: Bisakah saya kompres PDF yang dilindungi password?\\nA: Toolinter tidak bisa memproses PDF yang dipassword. Hapus password terlebih dahulu sebelum memproses.',
    'Q: Apakah hasil kompres bisa dikompres lagi?\\nA: Bisa, tapi penurunan ukuran akan semakin kecil. Kompres berulang juga bisa mengurangi kualitas. Lebih baik kompres sekali dengan kualitas yang sesuai.'
  ],
  CV: [
    'Q: Haruskah saya cantumkan gaji yang diharapkan di CV?\\nA: Tidak disarankan kecuali diminta secara spesifik. Cantumkan gaji di tahap negosiasi, bukan di CV awal.',
    'Q: Bagaimana cara menulis CV untuk career switch?\\nA: Fokus pada transferable skill yang relevan dengan posisi baru. Cantumkan pelatihan atau sertifikasi terkait. Ringkasan profil harus jelas menyebutkan tujuan karir baru.'
  ],
  UMKM: [
    'Q: Bagaimana cara menentukan margin yang tepat?\\nA: Tergantung industri. F&B biasanya 30-50%, retail 20-40%, jasa 40-60%. Riset margin kompetitor dan sesuaikan dengan value yang kamu berikan.',
    'Q: Apakah saya perlu hitung gaji sendiri sebagai pemilik bisnis?\\nA: Ya! Gaji pemilik adalah biaya operasional. Tanpa menghitung gaji sendiri, kamu tidak tahu profit sebenarnya. Tetapkan gaji yang wajar berdasarkan standar industri.'
  ],
  Keuangan: [
    'Q: Apakah investasi selalu lebih baik dari menabung?\\nA: Tergantung tujuan dan profil risiko. Untuk dana darurat (<1 tahun), tabungan lebih aman. Untuk tujuan jangka panjang (>5 tahun), investasi potensial memberikan return lebih baik.',
    'Q: Kapan waktu yang tepat untuk mulai investasi?\\nA: Setelah punya dana darurat 3-6x pengeluaran bulanan dan tidak punya utang konsumtif berbunga tinggi. Semakin awal mulai, semakin besar efek compounding.'
  ]
};

let count = 0;
posts.forEach((post, index) => {
  if (post.date >= '2026-07-01' && post.date <= '2026-07-07' && countWords(post) < 900) {
    // Add disclaimer section
    const disclaimer = disclaimers[post.category];
    if (disclaimer) {
      post.content.push({
        heading: 'Disclaimer',
        paragraphs: [disclaimer]
      });
    }

    // Add extra FAQ
    const faq = post.content.find(s => (s.heading || '').toLowerCase().includes('faq'));
    const extra = extraFAQ[post.category];
    if (faq && extra) {
      faq.paragraphs.push(...extra);
    } else if (extra) {
      post.content.push({ heading: 'FAQ', paragraphs: extra });
    }

    count++;
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
console.log('Jul 1-7 word counts:');
console.log('  Avg: ' + Math.round(wcs.reduce((a,b)=>a+b,0)/wcs.length));
console.log('  Min: ' + Math.min(...wcs));
console.log('  Max: ' + Math.max(...wcs));
console.log('  Under 900: ' + wcs.filter(w => w < 900).length);
console.log('  Over 900: ' + wcs.filter(w => w >= 900).length);

// Show remaining under 900
const remaining = jul1to7.filter(p => countWords(p) < 900).map(p => ({ slug: p.slug, words: countWords(p), cat: p.category }));
remaining.sort((a,b) => a.words - b.words);
console.log('\nRemaining under 900:');
remaining.slice(0, 10).forEach(p => console.log('  ' + p.words + 'w: ' + p.slug + ' (' + p.cat + ')'));
