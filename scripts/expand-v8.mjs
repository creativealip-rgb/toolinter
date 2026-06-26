// expand-v8.mjs
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

const tiny = {
  Keuangan: { heading: 'Update Data', paragraphs: ['Data dan simulasi di Toolinter diperbarui secara berkala mengikuti peraturan terbaru. Namun, aturan keuangan bisa berubah sewaktu-waktu. Selalu verifikasi dengan sumber resmi sebelum membuat keputusan finansial besar. Toolinter adalah alat bantu simulasi, bukan pengganti konsultan keuangan profesional.'] },
  UMKM: { heading: 'Update Data', paragraphs: ['Data dan rumus di Toolinter disesuaikan dengan kondisi pasar Indonesia terbaru. Namun, harga bahan baku, fee marketplace, dan regulasi bisa berubah sewaktu-waktu. Selalu verifikasi dengan data terkini sebelum membuat keputusan bisnis. Evaluasi rutin memastikan perhitungan kamu tetap akurat.'] },
  PDF: { heading: 'Update Data', paragraphs: ['Toolinter mendukung format PDF standar yang digunakan secara universal. Untuk PDF dengan fitur khusus seperti form interaktif, layer, atau multimedia, hasilnya mungkin berbeda. Selalu cek file hasil untuk memastikan semua elemen terbaca dengan benar sebelum mengirim ke pihak lain.'] },
};

let count = 0;
posts.forEach((post, index) => {
  if (post.date >= '2026-07-01' && post.date <= '2026-07-07' && countWords(post) < 900) {
    const b = tiny[post.category];
    if (b) {
      // Insert before FAQ or at end
      const faqIdx = post.content.findIndex(s => (s.heading||'').toLowerCase().includes('faq'));
      if (faqIdx >= 0) post.content.splice(faqIdx, 0, b);
      else post.content.push(b);
      count++;
    }
  }
});

console.log('Expanded ' + count + ' posts');

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

const jul1to7 = posts.filter(p => p.date >= '2026-07-01' && p.date <= '2026-07-07');
const wcs = jul1to7.map(countWords);
console.log('Jul 1-7:');
console.log('  Avg: ' + Math.round(wcs.reduce((a,b)=>a+b,0)/wcs.length));
console.log('  Min: ' + Math.min(...wcs));
console.log('  Max: ' + Math.max(...wcs));
console.log('  Under 900: ' + wcs.filter(w => w < 900).length);
console.log('  Over 900: ' + wcs.filter(w => w >= 900).length);

const r = jul1to7.filter(p => countWords(p) < 900).map(p => countWords(p));
if (r.length) console.log('Remaining: ' + r.join(', '));
