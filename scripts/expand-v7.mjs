// expand-v7.mjs
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

// Final bonus content per category
const finalBonus = {
  Keuangan: [
    { heading: 'Sumber Referensi Resmi', paragraphs: [
      'Untuk data terbaru tentang suku bunga, kunjungi website Bank Indonesia (bi.go.id) dan Otoritas Jasa Keuangan (ojk.go.id). Kedua lembaga ini menyediakan data resmi yang diperbarui secara berkala tentang suku bunga acuan dan regulasi keuangan.',
      'Untuk informasi pajak penghasilan, kunjungi website Direktorat Jenderal Pajak (pajak.go.id). Di sana kamu bisa menemukan tarif terbaru, formulir SPT, dan panduan pelaporan pajak. Kamu juga bisa menghubungi Kring Pajak di 1500200 untuk konsultasi gratis.'
    ]}
  ],
  UMKM: [
    { heading: 'Sumber Belajar UMKM', paragraphs: [
      'Kementerian Koperasi dan UKM (kemenkop.go.id) menyediakan berbagai program pelatihan dan pendampingan untuk UMKM. Program ini mencakup pelatihan manajemen keuangan, pemasaran digital, dan akses permodalan. Manfaatkan program ini untuk mengembangkan bisnis kamu.',
      'Untuk akses permodalan, cek program Kredit Usaha Rakyat (KUR) dari pemerintah. KUR menyediakan pinjaman dengan bunga rendah untuk UMKM yang memenuhi syarat. Ajukan melalui bank-bank yang ditunjuk pemerintah seperti BRI, Mandiri, atau BNI.'
    ]}
  ],
  PDF: [
    { heading: 'Tips File Management', paragraphs: [
      'Buat struktur folder yang konsisten untuk menyimpan dokumen digital kamu. Contoh: folder per tahun, subfolder per kategori (keuangan, pekerjaan, pribadi). Ini memudahkan pencarian saat kamu memerlukan dokumen tertentu.',
      'Beri nama file dengan format yang jelas: [tanggal]_[jenis]_[keterangan]. Contoh: "2026-07-01_Surat_Resign_NamaLengkap.pdf". Hindari nama file seperti "Document1.pdf" atau "scan.pdf" yang sulit dicari nanti.'
    ]}
  ],
  CV: [
    { heading: 'Persiapan Setelah Kirim CV', paragraphs: [
      'Setelah mengirim CV, siapkan diri untuk interview. Pelajari tentang perusahaan, posisi yang dilamar, dan siapkan jawaban untuk pertanyaan umum interview. Latihan dengan teman atau di depan cermin untuk meningkatkan kepercayaan diri.',
      'Follow up lamaran kamu setelah 1-2 minggu jika belum ada kabar. Kirim email singkat yang sopan menanyakan status lamaran. Ini menunjukkan inisiatif dan ketertarikan kamu terhadap posisi tersebut. Jangan follow up terlalu sering karena bisa mengganggu.'
    ]}
  ]
};

let count = 0;
posts.forEach((post, index) => {
  if (post.date >= '2026-07-01' && post.date <= '2026-07-07' && countWords(post) < 900) {
    const catBonus = finalBonus[post.category];
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
