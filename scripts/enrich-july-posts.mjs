import fs from 'fs';

const file = 'src/data/blog.ts';
const raw = fs.readFileSync(file, 'utf8');
const match = raw.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*\]);/);
if (!match) throw new Error('blogPosts array not found');
const posts = eval(match[1]);

const toolMap = {
  Surat: { tool: 'Generator Surat Toolinter', href: '/surat', disclaimer: 'Catatan: Template surat ini bersifat panduan umum. Sesuaikan isi surat dengan kebijakan perusahaan, instansi, sekolah, atau kebutuhan pribadi sebelum digunakan.' },
  Foto: { tool: 'Tool Resize/Compress Foto Toolinter', href: '/foto', disclaimer: 'Catatan: Syarat ukuran foto dapat berubah mengikuti ketentuan instansi atau platform tujuan. Selalu cek pengumuman resmi sebelum mengirim berkas.' },
  Gaji: { tool: 'Kalkulator Gaji Toolinter', href: '/gaji', disclaimer: 'Catatan: Simulasi ini bersifat estimasi. Tarif pajak, BPJS, UMR, dan aturan ketenagakerjaan bisa berubah; cek sumber resmi atau konsultasikan dengan HR/konsultan pajak untuk keputusan final.' },
  PDF: { tool: 'Tool PDF Toolinter', href: '/pdf', disclaimer: 'Catatan: Pastikan file hasil tetap terbaca dan sesuai syarat platform tujuan sebelum dikirim. Untuk dokumen resmi, simpan salinan asli sebagai backup.' },
  CV: { tool: 'Generator CV Toolinter', href: '/cv', disclaimer: 'Catatan: Template CV dan lamaran bersifat panduan. Sesuaikan isi dengan pengalaman asli, posisi yang dilamar, dan instruksi rekrutmen perusahaan.' },
  UMKM: { tool: 'Kalkulator UMKM Toolinter', href: '/umkm', disclaimer: 'Catatan: Simulasi bisnis ini bersifat estimasi. Biaya bahan, operasional, pajak, dan fee platform bisa berubah; cek data usaha aktual sebelum mengambil keputusan harga.' },
  Keuangan: { tool: 'Kalkulator Keuangan Toolinter', href: '/keuangan', disclaimer: 'Catatan: Simulasi keuangan ini bersifat estimasi. Suku bunga, biaya admin, pajak, dan ketentuan lembaga keuangan bisa berubah; cek penawaran resmi sebelum mengambil keputusan.' },
};

function words(post){ return post.content.reduce((a,s)=>a+s.paragraphs.join(' ').split(/\s+/).filter(Boolean).length,0); }
function cleanTopic(title){ return title.replace(/\s*\[?2026\]?/g,'').replace(/^Cara\s+/i,'').trim(); }
function slugTags(post){
  const base = post.slug.split('-').filter(w => !['cara','yang','dan','untuk','online','gratis','2026','di','ke','dari'].includes(w));
  const tags = [post.category.toLowerCase(), ...base.slice(0,5), 'toolinter'];
  return [...new Set(tags)].slice(0,8);
}
function meta(post){
  let text = (post.excerpt || `Panduan ${post.title} lengkap dengan langkah praktis, contoh, tips, FAQ, dan tool gratis dari Toolinter.`).replace(/\s+/g,' ').trim();
  if (text.length < 120) text += ` Lengkap dengan langkah praktis, tips, FAQ, dan tool gratis di Toolinter.`;
  if (text.length > 158) text = text.slice(0,155).replace(/\s+\S*$/,'') + '...';
  return text;
}
function categorySections(post){
  const topic = cleanTopic(post.title);
  const cfg = toolMap[post.category] || toolMap.PDF;
  const lower = topic.toLowerCase();
  const ctaHref = post.ctaHref || cfg.href;

  const generic = [
    {
      heading: 'Ringkasan Cepat',
      paragraphs: [
        `Untuk ${lower}, siapkan data utama, pahami format yang diminta, lalu gunakan ${cfg.tool} agar proses lebih cepat. Artikel ini merangkum langkah praktis, contoh hasil, kesalahan umum, dan FAQ supaya kamu bisa menyelesaikan kebutuhan tanpa bolak-balik mencari format.`,
        `• Fokus utama: menyelesaikan ${lower} dengan cepat\n• Tool terkait: ${cfg.tool}\n• Output akhir: hasil rapi yang siap dicek ulang\n• Hal penting: pastikan data, format, dan tujuan penggunaan sudah benar`,
      ],
    },
    {
      heading: `Apa Itu ${topic}?`,
      paragraphs: [
        `${topic} adalah kebutuhan praktis yang sering muncul saat mengurus administrasi, pekerjaan, dokumen digital, usaha, atau perhitungan pribadi. Dalam konteks Toolinter, topik ini dibuat sebagai panduan task-based: pengguna langsung tahu apa yang harus disiapkan, langkah apa yang perlu dilakukan, dan tool mana yang bisa membantu.` ,
        `Pendekatan ini lebih berguna daripada penjelasan umum karena setiap bagian diarahkan ke tindakan. Kamu tidak hanya membaca definisi, tetapi juga mendapat checklist, contoh, tips, dan batasan penggunaan agar hasil akhir lebih aman dipakai.`
      ],
    },
    {
      heading: `Kapan Kamu Butuh ${topic}?`,
      paragraphs: [
        `Kamu biasanya butuh ${lower} saat ada tenggat waktu, syarat upload, permintaan administrasi, atau kebutuhan menghitung sesuatu secara cepat. Situasinya bisa berbeda tergantung kategori, tetapi prinsipnya sama: hasil harus jelas, rapi, dan sesuai tujuan.`,
        `• Saat mengurus dokumen kerja, sekolah, usaha, atau administrasi pribadi\n• Saat perlu hasil cepat tanpa install aplikasi tambahan\n• Saat ingin mengecek ulang format, angka, atau struktur sebelum dikirim\n• Saat butuh draft awal yang bisa disesuaikan dengan kondisi nyata\n• Saat ingin menghindari kesalahan umum yang sering membuat proses tertunda`,
      ],
    },
    {
      heading: 'Data, Syarat, atau Format yang Perlu Disiapkan',
      paragraphs: [
        `Sebelum mulai, siapkan informasi dasar yang berkaitan dengan kebutuhanmu. Data yang lengkap membuat proses lebih cepat dan mengurangi risiko revisi. Kalau ada ketentuan dari perusahaan, instansi, marketplace, bank, atau platform tertentu, pakai ketentuan itu sebagai acuan utama.`,
        `• Nama atau identitas sesuai dokumen resmi jika diperlukan\n• Tanggal, periode, ukuran, angka, atau file sumber sesuai konteks\n• Tujuan penggunaan hasil akhir\n• Batas ukuran, format file, atau syarat instansi jika ada\n• Catatan khusus yang perlu dicantumkan sebelum hasil dipakai`,
      ],
    },
    {
      heading: `Cara Menggunakan ${cfg.tool}`,
      paragraphs: [
        `1. Buka halaman tool yang relevan di Toolinter: ${ctaHref}.\n2. Masukkan data, angka, teks, atau file yang diminta.\n3. Cek kembali input agar tidak ada salah ketik atau salah angka.\n4. Klik tombol proses, hitung, generate, atau download sesuai tool.\n5. Baca hasil yang muncul dan bandingkan dengan kebutuhanmu.\n6. Simpan, salin, atau download hasil akhir.\n7. Cek ulang sebelum dikirim ke pihak lain.`,
        `Langkah ini dibuat sederhana agar bisa dipakai dari HP maupun laptop. Jika hasil belum sesuai, ubah input lalu proses ulang sampai format atau perhitungannya mendekati kebutuhanmu.`
      ],
    },
    {
      heading: 'Contoh Hasil atau Simulasi',
      paragraphs: [
        `Misalnya kamu ingin menyelesaikan ${lower} untuk kebutuhan administrasi minggu ini. Kamu membuka tool terkait, mengisi data utama, lalu mendapat hasil awal yang bisa dicek ulang. Hasil tersebut bisa berupa teks surat, ukuran foto yang lebih sesuai, file PDF yang lebih kecil, perhitungan gaji, estimasi biaya, atau draft CV tergantung kategori artikel.`,
        `Contoh output yang baik biasanya memiliki tiga ciri: mudah dibaca, sesuai syarat, dan tidak memuat data yang keliru. Kalau hasil dipakai untuk keperluan resmi, selalu bandingkan dengan instruksi terbaru dari pihak tujuan.`
      ],
    },
    {
      heading: 'Kesalahan Umum yang Harus Dihindari',
      paragraphs: [
        `Kesalahan kecil sering membuat hasil perlu diulang. Karena itu, jangan hanya mengandalkan proses otomatis; tetap lakukan pengecekan manual sebelum hasil dipakai.`,
        `• Tidak membaca syarat dari pihak tujuan\n• Salah memasukkan nama, tanggal, angka, ukuran, atau format file\n• Menggunakan contoh lama tanpa menyesuaikan kondisi terbaru\n• Tidak menyimpan salinan asli sebelum memproses file\n• Langsung mengirim hasil tanpa membaca ulang\n• Menganggap simulasi sebagai keputusan final tanpa verifikasi`,
      ],
    },
    {
      heading: 'Tips agar Hasil Lebih Rapi dan Akurat',
      paragraphs: [
        `Gunakan data yang paling baru, pakai format yang mudah dibaca, dan hindari menambahkan informasi yang tidak diperlukan. Untuk dokumen teks, gunakan bahasa jelas. Untuk angka, cek satuan dan periode. Untuk file, pastikan hasil tetap terbaca setelah diproses.`,
        `Jika kamu memakai hasil untuk kepentingan penting seperti kerja, pajak, pinjaman, CPNS, sekolah, atau dokumen usaha, minta orang lain membaca ulang. Review kedua sering membantu menemukan salah ketik, angka yang tidak masuk akal, atau informasi yang kurang lengkap.`
      ],
    },
    {
      heading: 'Catatan dan Batasan',
      paragraphs: [cfg.disclaimer],
    },
    {
      heading: 'FAQ',
      paragraphs: [
        `Q: Apakah ${cfg.tool} gratis digunakan?\nA: Ya, tool Toolinter bisa digunakan gratis untuk membantu membuat draft, menghitung, memproses, atau menyiapkan hasil awal sesuai kebutuhan.\nQ: Apakah hasilnya bisa langsung dipakai?\nA: Hasil bisa menjadi draft atau simulasi awal. Untuk kebutuhan resmi, cek ulang data dan sesuaikan dengan aturan pihak tujuan.\nQ: Apakah data saya aman?\nA: Toolinter dirancang untuk proses cepat di browser jika memungkinkan. Hindari memasukkan data yang tidak diperlukan dan selalu cek ulang sebelum mengirim hasil.\nQ: Apa yang harus dilakukan jika hasil belum sesuai?\nA: Ubah input, cek format, lalu proses ulang. Jika ada syarat resmi, pakai syarat tersebut sebagai acuan utama.\nQ: Kapan perlu konsultasi pihak resmi?\nA: Jika berkaitan dengan keputusan hukum, pajak, pinjaman, ketenagakerjaan, atau administrasi pemerintah, cek sumber resmi atau pihak berwenang.`
      ],
    },
  ];
  return generic;
}
function enrich(post){
  post.metaDescription = meta(post);
  post.focusKeyword = cleanTopic(post.title).toLowerCase();
  post.tags = slugTags(post);
  post.author = post.author || 'Toolinter';
  if (post.date >= '2026-07-01' && post.date <= '2026-07-31' && words(post) < 900) {
    const first = post.content?.[0]?.paragraphs?.[0] || post.excerpt || '';
    const sections = categorySections(post);
    if (first && !sections[0].paragraphs[0].includes(first.slice(0,20))) {
      sections.unshift({ heading: '', paragraphs: [first] });
    }
    post.content = sections;
  } else {
    const text = post.content.map(s=>s.paragraphs.join('\n')).join('\n').toLowerCase();
    if (!text.includes('catatan') && post.date >= '2026-07-01' && post.date <= '2026-07-31') {
      post.content.push({ heading: 'Catatan dan Batasan', paragraphs: [toolMap[post.category]?.disclaimer || toolMap.PDF.disclaimer] });
    }
  }
}

let touched = 0;
for (const p of posts) {
  if (p.date >= '2026-07-01' && p.date <= '2026-07-31') {
    enrich(p); touched++;
  }
}

function js(v, indent=0){ return JSON.stringify(v, null, 2); }
function serializePost(p){
  const keys = ['slug','title','excerpt','date','category','readTime','ctaLabel','ctaHref','content','status','metaDescription','focusKeyword','tags','author','featuredImage','ogImage','views'];
  let out='  {\n';
  for (const k of keys) if (p[k] !== undefined) out += `    ${k}: ${js(p[k]).replace(/\n/g,'\n    ')},\n`;
  out += '  }';
  return out;
}
const header = `export interface BlogSection {\n  heading?: string;\n  paragraphs: string[];\n  image?: { url: string; alt: string; caption?: string };\n}\n\nexport interface BlogPost {\n  slug: string;\n  title: string;\n  excerpt: string;\n  date: string;\n  category: string;\n  readTime: string;\n  ctaLabel: string;\n  ctaHref: string;\n  content: BlogSection[];\n  status: string;\n  metaDescription?: string;\n  focusKeyword?: string;\n  tags?: string[];\n  author?: string;\n  featuredImage?: string;\n  ogImage?: string;\n  views?: number;\n}\n\nexport const blogPosts: BlogPost[] = [\n`;
fs.writeFileSync(file, header + posts.map(serializePost).join(',\n') + '\n];\n');
console.log(`Enriched July posts: ${touched}`);