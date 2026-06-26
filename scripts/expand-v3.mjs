// expand-v3.mjs
// Re-expand all posts under 900 words with longer templates
import fs from 'fs';

const blogPath = 'src/data/blog.ts';
const content = fs.readFileSync(blogPath, 'utf8');
const match = content.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*\]);/);
if (!match) { console.error('Could not parse blog.ts'); process.exit(1); }
const posts = eval(match[1]);

function countWords(post) {
  let t = 0;
  post.content?.forEach(s => s.paragraphs?.forEach(p => t += p.split(/\s+/).length));
  return t;
}

const templates = {
  Surat: (p) => {
    const suratType = p.slug.replace(/surat-/, '').replace(/-/g, ' ');
    return [
      { paragraphs: [`${p.title.replace(/\[.*?\]/g, '').trim()} bisa dibuat dalam hitungan menit menggunakan generator surat online Toolinter. Kamu cukup pilih template, isi data diri, lalu download surat dalam format PDF. Gratis, tanpa perlu install aplikasi atau daftar akun. Proses seluruhnya berjalan di browser, jadi data pribadi tetap aman dan tidak disimpan di server mana pun.`] },
      { heading: `Apa Itu Surat ${suratType.charAt(0).toUpperCase() + suratType.slice(1)}?`, paragraphs: [
        `Surat ${suratType} adalah dokumen resmi yang dibutuhkan untuk berbagai keperluan administrasi, baik untuk keperluan pribadi, pekerjaan, maupun urusan instansi. Format yang benar memastikan surat diterima dan diproses dengan baik oleh pihak yang dituju.`,
        `Di Indonesia, surat ${suratType} mengikuti standar penulisan surat resmi yang berlaku umum. Struktur yang benar terdiri dari: identitas pengirim, tanggal dan tempat penulisan, tujuan surat, salam pembuka, isi surat, lampiran (jika ada), salam penutup, dan tanda tangan. Setiap bagian memiliki fungsi masing-masing untuk memastikan surat dapat dipahami dengan jelas oleh penerima.`,
        `Surat yang ditulis dengan format yang benar dan bahasa yang sopan menunjukkan profesionalisme. Sebaliknya, surat dengan format yang salah atau bahasa informal bisa ditolak oleh instansi atau perusahaan. Oleh karena itu, penting untuk memahami struktur yang benar sebelum menulis surat.`
      ]},
      { heading: `Kapan Kamu Butuh Surat ${suratType.charAt(0).toUpperCase() + suratType.slice(1)}?`, paragraphs: [
        `Ada beberapa situasi umum yang membutuhkan surat ${suratType}:`,
        `• Melamar pekerjaan atau magang di perusahaan swasta maupun BUMN\n• Mengurus administrasi di instansi pemerintah seperti kelurahan, kecamatan, atau dinas terkait\n• Keperluan bank seperti pembukaan rekening, pengajuan kredit, atau verifikasi data\n• Proses rekrutmen atau seleksi CPNS, PPPK, atau rekrutmen BUMN\n• Keperluan pendidikan seperti pendaftaran sekolah, beasiswa, atau magang\n• Keperluan hukum seperti perjanjian, kuasa, atau pernyataan resmi`,
        `Dalam setiap situasi ini, surat yang ditulis dengan format yang benar dan bahasa yang sopan akan meningkatkan peluang diterima. Surat yang asal-asalan atau tidak sesuai format bisa ditolak dan memperpanjang proses administrasi.`
      ]},
      { heading: 'Syarat dan Data yang Perlu Disiapkan', paragraphs: [
        `Sebelum membuat surat ${suratType}, siapkan data berikut:`,
        `• Nama lengkap sesuai KTP atau identitas resmi\n• Alamat lengkap sesuai domisili\n• Nomor telepon atau email yang bisa dihubungi\n• Nama dan jabatan pihak yang dituju\n• Nama instansi atau perusahaan tujuan\n• Tanggal yang relevan (tanggal surat, tanggal efektif, dll)\n• Alasan atau tujuan surat yang jelas\n• Lampiran dokumen pendukung jika diperlukan`,
        `Pastikan semua data yang dimasukkan sudah benar dan sesuai. Kesalahan penulisan nama, tanggal, atau tujuan bisa menyebabkan surat ditolak atau perlu diulang.`
      ]},
      { heading: 'Cara Membuat Surat dengan Toolinter', paragraphs: [
        `Berikut langkah-langkah membuat surat menggunakan generator Toolinter:`,
        `1. Buka halaman Generator Surat Toolinter.\n2. Pilih template surat ${suratType} dari daftar yang tersedia.\n3. Isi data yang diminta: nama, alamat, tanggal, tujuan, dan informasi lainnya.\n4. Klik "Preview dari Template" untuk melihat hasil surat.\n5. Periksa kembali semua data yang dimasukkan.\n6. Jika sudah sesuai, klik "Download PDF" untuk mengunduh.\n7. Buka file PDF dan cetak di kertas A4.\n8. Tandatangani surat dan tambahkan materai jika diperlukan.`,
        `Proses seluruhnya berjalan langsung di browser. File tidak diunggah ke server, jadi privasi data tetap aman. Kamu juga bisa menggunakan fitur "Buat dengan AI" jika ingin Toolinter membantu menyusun kalimat surat yang lebih profesional.`,
        `Setelah download, cek ulang nama, tanggal, dan tujuan surat sebelum dikirim. Kesalahan kecil bisa menyebabkan surat ditolak oleh pihak yang dituju.`
      ]},
      { heading: 'Contoh Struktur Surat', paragraphs: [
        `Berikut contoh struktur surat ${suratType} yang benar dan sesuai standar:`,
        `Bagian 1 — Identitas Pengirim: Nama lengkap, alamat, nomor telepon, dan email. Jika mewakili instansi atau perusahaan, cantumkan nama instansi dan jabatan.`,
        `Bagian 2 — Tanggal dan Tempat: Tulis nama kota diikuti tanggal, bulan, dan tahun penulisan surat. Contoh: "Jakarta, 26 Juni 2026".`,
        `Bagian 3 — Tujuan Surat: Nama penerima, jabatan, nama instansi/perusahaan, dan alamat. Gunakan "Kepada Yth." diikuti nama dan jabatan.`,
        `Bagian 4 — Isi Surat: Jelaskan maksud dan tujuan surat dengan bahasa yang jelas, singkat, dan sopan. Hindari kalimat yang terlalu panjang atau bertele-tele.`,
        `Bagian 5 — Lampiran: Sebutkan dokumen yang dilampirkan (fotokopi KTP, ijazah, dll) jika diperlukan.`,
        `Bagian 6 — Penutup: Salam penutup, nama jelas, dan tanda tangan. Jika untuk instansi, tambahkan cap atau stempel.`
      ]},
      { heading: 'Kesalahan Umum yang Harus Dihindari', paragraphs: [
        `Beberapa kesalahan yang sering terjadi saat membuat surat ${suratType}:`,
        `• Salah menulis nama pihak yang dituju — pastikan ejaan nama sesuai identitas resmi\n• Tidak mencantumkan tanggal efektif — beberapa instansi memerlukan tanggal spesifik\n• Menggunakan bahasa informal atau tidak sopan — surat resmi harus menggunakan bahasa formal\n• Tidak menyertakan lampiran yang diminta — cek ketentuan instansi sebelum mengirim\n• Format surat tidak sesuai standar instansi — setiap instansi bisa punya format khusus\n• Lupa menandatangani surat — surat tanpa tanda tangan tidak memiliki kekuatan hukum\n• Menggunakan font yang sulit dibaca — gunakan font standar seperti Times New Roman atau Arial\n• Cetak di kertas yang tidak sesuai — gunakan kertas A4 dengan margin 2,5 cm`,
        `Hindari kesalahan ini agar surat kamu diproses dengan lancar dan tidak perlu diulang.`
      ]},
      { heading: 'Tips Surat yang Profesional', paragraphs: [
        `Beberapa tips untuk membuat surat ${suratType} yang baik dan profesional:`,
        `• Gunakan font standar (Times New Roman atau Arial) ukuran 12 dengan spasi 1,15 atau 1,5\n• Cetak di kertas A4 dengan margin 2,5 cm di setiap sisi\n• Periksa ejaan dan tata bahasa sebelum mengirim\n• Simpan salinan digital untuk arsip pribadi\n• Minta orang lain membaca sebelum mengirim untuk memastikan tidak ada kesalahan\n• Jika dikirim via email, gunakan format PDF agar format tidak berubah\n• Cantumkan kontak yang bisa dihubungi jika ada pertanyaan\n• Gunakan bahasa yang sopan dan profesional, hindari singkatan atau bahasa gaul`,
        `Dengan mengikuti tips ini, surat kamu akan terlihat lebih profesional dan meyakinkan.`
      ]},
      { heading: 'FAQ', paragraphs: [
        `Q: Apakah surat dari Toolinter bisa langsung dipakai?\nA: Surat dari Toolinter berfungsi sebagai draft yang bisa kamu sesuaikan. Pastikan nama, tanggal, dan tujuan sudah benar sebelum dikirim.`,
        `Q: Format file apa yang dihasilkan?\nA: Toolinter menghasilkan surat dalam format PDF yang siap cetak dan kirim. Format PDF memastikan surat tidak berubah tampilan saat dibuka di device berbeda.`,
        `Q: Apakah data saya aman?\nA: Ya, seluruh proses berjalan di browser. Data tidak dikirim ke server atau disimpan di mana pun.`,
        `Q: Bisakah saya mengedit surat setelah download?\nA: PDF yang dihasilkan tidak bisa diedit langsung. Jika perlu mengubah, edit di Toolinter lalu download ulang.`,
        `Q: Apakah ada biaya?\nA: Tidak. Toolinter 100% gratis tanpa watermark dan tanpa perlu daftar akun.`,
      ]}
    ];
  },

  Foto: (p) => {
    const fotoType = p.slug.replace(/resize-|foto-|kompres-/, '').replace(/-/g, ' ');
    return [
      { paragraphs: [`${p.title.replace(/\[.*?\]/g, '').trim()} bisa dilakukan langsung di browser tanpa install aplikasi. Di Toolinter, upload foto, pilih ukuran yang dibutuhkan, lalu download hasilnya. Proses cepat, gratis, dan file tetap aman di perangkat kamu karena tidak diunggah ke server.`] },
      { heading: 'Ukuran Standar dan Spesifikasi', paragraphs: [
        `Setiap dokumen resmi memiliki standar ukuran foto yang harus dipenuhi. Ukuran yang salah bisa menyebabkan dokumen ditolak atau perlu diulang, membuang waktu dan biaya.`,
        `Standar umum foto dokumen di Indonesia:\n• Ukuran 3x4 cm: untuk KTP, SIM, lamaran kerja, dan dokumen umum\n• Ukuran 4x6 cm: untuk passport, visa, dan dokumen internasional\n• Ukuran 2x3 cm: untuk SKCK, surat izin, dan dokumen kecil\n• Format file: JPG atau PNG (beberapa portal hanya menerima JPG)\n• Background: putih untuk umum, merah untuk KTP, biru untuk passport\n• Resolusi: minimal 300 DPI untuk hasil cetak yang tajam\n• Ukuran file: biasanya maksimal 200KB-2MB tergantung portal`,
        `Pastikan foto yang diupload memiliki resolusi cukup agar hasil cetak tidak pecah atau blur.`
      ]},
      { heading: 'Cara Resize Foto dengan Toolinter', paragraphs: [
        `Berikut langkah-langkah resize foto menggunakan Toolinter:`,
        `1. Buka halaman Resize Foto Toolinter di browser.\n2. Klik "Upload" atau drag-and-drop foto yang ingin diresize.\n3. Pilih ukuran target dari dropdown (3x4, 4x6, 2x3, atau custom).\n4. Sesuaikan crop area dengan menarik kotak selection pada foto.\n5. Pilih format output (JPG atau PNG).\n6. Klik "Resize" untuk memproses foto.\n7. Preview hasil resize untuk memastikan kualitas.\n8. Download hasilnya ke perangkat kamu.`,
        `Proses berjalan langsung di browser menggunakan teknologi Canvas API. Foto tidak diunggah ke server mana pun, sehingga privasi tetap terjaga.`
      ]},
      { heading: 'Tips Foto yang Memenuhi Syarat', paragraphs: [
        `Beberapa tips agar foto dokumen kamu diterima oleh instansi:`,
        `• Gunakan pencahayaan yang cukup dan rata — hindari bayangan di wajah atau background\n• Wajah harus terlihat jelas, tidak blur, dan menghadap kamera langsung\n• Background sesuai ketentuan instansi (putih untuk umum, merah untuk KTP)\n• Pakaian rapi dan sesuai konteks — formal untuk lamaran kerja\n• Jangan gunakan filter atau editan berlebihan — foto harus natural\n• Pastikan resolusi asli minimal 600x800 pixel\n• Rambut tidak menutupi wajah — telinga harus terlihat untuk beberapa dokumen\n• Tidak menggunakan aksesoris yang menutupi wajah seperti kacamata gelap`,
        `Foto yang memenuhi syarat akan mempercepat proses administrasi dan menghindari penolakan.`
      ]},
      { heading: 'Kesalahan Umum', paragraphs: [
        `Beberapa kesalahan yang sering terjadi saat menyiapkan foto dokumen:`,
        `• Ukuran terlalu kecil sehingga pecah saat dicetak\n• Background tidak sesuai ketentuan\n• Wajah terpotong atau tidak terlihat jelas\n• Format file salah (beberapa portal hanya menerima JPG)\n• Ukuran file terlalu besar untuk diupload\n• Menggunakan foto lama yang sudah tidak mirip\n• Resolusi terlalu rendah — foto dari kamera lama sering bermasalah\n• Menggunakan foto selfie yang angle-nya tidak standar`,
        `Hindari kesalahan ini agar foto dokumen kamu diterima di percobaan pertama.`
      ]},
      { heading: 'FAQ', paragraphs: [
        `Q: Apakah foto diresize di server Toolinter?\nA: Tidak. Seluruh proses berjalan di browser menggunakan Canvas API. Foto tidak diunggah ke server mana pun.`,
        `Q: Format file apa yang bisa diupload?\nA: Toolinter mendukung JPG, PNG, dan WebP. Hasil bisa didownload dalam JPG atau PNG.`,
        `Q: Berapa ukuran maksimal file?\nA: Hingga 20MB per file, tergantung kapasitas browser.`,
        `Q: Apakah hasil resize bisa langsung untuk pendaftaran online?\nA: Ya, selama ukuran dan format sesuai ketentuan portal.`,
        `Q: Bisakah resize foto untuk beberapa ukuran sekaligus?\nA: Ya, tanpa batas. Resize foto yang sama ke ukuran berbeda sesuai kebutuhan.`,
      ]}
    ];
  },

  Gaji: (p) => {
    const gajiType = p.slug.replace(/hitung-|cara-/, '').replace(/-/g, ' ');
    return [
      { paragraphs: [`${p.title.replace(/\[.*?\]/g, '').trim()} bisa dilakukan secara instan menggunakan kalkulator online Toolinter. Masukkan data gaji atau komponen yang dibutuhkan, lalu hasil perhitungan langsung muncul di layar. Gratis, akurat sesuai aturan terbaru, dan bisa di-download sebagai PDF untuk arsip.`] },
      { heading: `Apa Itu ${gajiType.charAt(0).toUpperCase() + gajiType.slice(1)}?`, paragraphs: [
        `${gajiType.charAt(0).toUpperCase() + gajiType.slice(1)} adalah komponen penting dalam penghitungan gaji karyawan di Indonesia. Pemahaman yang benar membantu kamu memastikan gaji yang diterima sesuai dengan perhitungan yang benar.`,
        `Komponen ini diatur dalam UU Ketenagakerjaan No. 13 Tahun 2003, PP tentang upah minimum, dan peraturan terkait pajak penghasilan. Tarif dan aturan bisa berubah setiap tahun, jadi penting selalu menggunakan data terbaru.`,
        `Memahami cara hitung yang benar membantu kamu menghindari kesalahan dalam pengajuan klaim, pelaporan pajak, atau negosiasi gaji.`
      ]},
      { heading: 'Rumus dan Cara Hitung', paragraphs: [
        `Berikut rumus dasar untuk menghitung ${gajiType}:`,
        `1. Masukkan data gaji pokok dan tunjangan tetap\n2. Tambahkan tunjangan tidak tetap (jika ada)\n3. Hitung total penghasilan bruto\n4. Kurangi potongan wajib (PPh21, BPJS Kesehatan, BPJS Ketenagakerjaan)\n5. Hasilnya adalah take home pay (gaji bersih)`,
        `Setiap komponen memiliki aturan tersendiri:\n• PPh21: tarif progresif 5%-30% tergantung penghasilan dan status PTKP\n• BPJS Kesehatan: 1% dari gaji (maksimal Rp12.000.000)\n• BPJS Ketenagakerjaan: 2% JKK + 1% JKM + 1% JHT + 3% JP\n• Pensiun: 1% dari gaji (maksimal Rp9.559.600)`,
        `Gunakan kalkulator Toolinter untuk memastikan perhitungan yang akurat.`
      ]},
      { heading: 'Contoh Perhitungan', paragraphs: [
        `Berikut contoh perhitungan ${gajiType} untuk karyawan gaji Rp8.000.000/bulan:`,
        `• Gaji pokok: Rp8.000.000\n• Tunjangan tetap: Rp1.000.000\n• Total bruto: Rp9.000.000\n• PPh21 (estimasi): Rp150.000\n• BPJS Kesehatan (1%): Rp90.000\n• BPJS Ketenagakerjaan (4,24%): Rp381.600\n• Total potongan: Rp621.600\n• Take home pay: Rp8.378.400`,
        `Angka ini simulasi. Perhitungan aktual bisa berbeda tergantung status PTKP, tunjangan, dan komponen lainnya. Download hasil perhitungan sebagai PDF untuk arsip.`
      ]},
      { heading: 'Kesalahan Umum', paragraphs: [
        `Beberapa kesalahan yang sering terjadi:`,
        `• Salah memasukkan angka gaji atau tunjangan — pastikan sesuai slip gaji\n• Tidak memperhitungkan semua komponen — jangan lupa tunjangan tidak tetap\n• Menggunakan tarif lama — cek aturan terbaru setiap tahun\n• Tidak memperhitungkan status PTKP — status kawin/tanggungan mempengaruhi PPh21\n• Salah membedakan gross dan net — pastikan tahu apakah gaji yang ditawarkan gross atau net\n• Tidak memperhitungkan THR dan bonus — komponen ini juga kena pajak\n• Mengabaikan iuran pensiun — beberapa perusahaan memotong iuran pensiun tambahan`,
        `Gunakan kalkulator Toolinter untuk menghindari kesalahan perhitungan manual.`
      ]},
      { heading: 'FAQ', paragraphs: [
        `Q: Apakah hasil perhitungan Toolinter akurat?\nA: Simulasi berdasarkan aturan terbaru. Untuk keputusan final, verifikasi dengan aturan resmi atau konsultasikan dengan HR/konsultan pajak.`,
        `Q: Apakah data gaji saya disimpan?\nA: Tidak. Perhitungan berjalan di browser. Data tidak dikirim ke server.`,
        `Q: Berapa sering aturan berubah?\nA: Tarif pajak, BPJS, dan UMR bisa berubah setiap tahun.`,
        `Q: Apakah ini pengganti konsultan pajak?\nA: Tidak. Tool ini simulasi awal. Untuk pajak kompleks, konsultasikan dengan konsultan pajak bersertifikat.`,
        `Q: Bisakah download hasil?\nA: Ya, klik "Download PDF" untuk mengunduh hasil perhitungan.`,
      ]}
    ];
  },

  PDF: (p) => {
    const pdfType = p.slug.replace(/cara-|kompres-|gabung-|pisah-|foto-|pdf-|word-|tanda-/, '').replace(/-pdf|-online|-gratis|-digital/g, '').replace(/-/g, ' ');
    return [
      { paragraphs: [`${p.title.replace(/\[.*?\]/g, '').trim()} bisa dilakukan langsung di browser tanpa install aplikasi. Di Toolinter, upload file, pilih opsi yang dibutuhkan, lalu download hasilnya. Proses cepat, gratis, dan file tetap aman karena tidak diunggah ke server.`] },
      { heading: `Kapan Kamu Butuh ${pdfType.charAt(0).toUpperCase() + pdfType.slice(1)} PDF?`, paragraphs: [
        `Ada beberapa situasi yang membutuhkan ${pdfType} PDF:`,
        `• Mengirim dokumen via email dengan batasan ukuran file (biasanya 25MB)\n• Upload dokumen ke portal CPNS, beasiswa, atau lamaran kerja\n• Menggabungkan beberapa dokumen jadi satu file untuk pengiriman rapi\n• Mengambil halaman tertentu dari dokumen besar\n• Mengonversi format dokumen untuk keperluan editing\n• Menandatangani dokumen secara digital tanpa print`,
        `Proses yang cepat dan praktis menghemat waktu, terutama saat deadline mendesak.`
      ]},
      { heading: 'Cara Pakai Tool Toolinter', paragraphs: [
        `Berikut langkah-langkah:`,
        `1. Buka halaman tool yang sesuai di Toolinter.\n2. Upload file PDF atau dokumen (drag-and-drop atau klik Browse).\n3. Pilih opsi yang dibutuhkan:\n   - Kompres: pilih tingkat kualitas\n   - Gabung: atur urutan halaman\n   - Pisah: pilih halaman yang ingin diambil\n   - Konversi: pilih format output\n4. Klik "Proses" untuk memulai.\n5. Download hasilnya.\n6. Buka file untuk memastikan kualitas baik.`,
        `Seluruh proses berjalan di browser menggunakan WebAssembly. File tidak diunggah ke server.`
      ]},
      { heading: 'Tips Kualitas Output', paragraphs: [
        `Tips untuk hasil terbaik:`,
        `• Gunakan file asli dengan resolusi tinggi\n• Pilih kualitas sesuai kebutuhan:\n  - Tinggi: untuk cetak atau arsip\n  - Sedang: untuk email atau upload portal\n  - Rendah: untuk preview atau koneksi lambat\n• Cek hasil di beberapa device sebelum mengirim\n• Simpan file asli sebagai backup\n• Jika hasil blur, kurangi tingkat kompresi\n• Untuk PDF teks saja, kompresi tinggi aman`,
        `Selalu cek hasil sebelum mengirim ke pihak lain.`
      ]},
      { heading: 'FAQ', paragraphs: [
        `Q: Apakah file saya aman?\nA: Ya. Proses berjalan di browser. File tidak diunggah ke server mana pun.`,
        `Q: Berapa ukuran maksimal file?\nA: Hingga 100MB, tergantung kapasitas browser dan RAM.`,
        `Q: Apakah ada watermark?\nA: Tidak. Toolinter 100% gratis tanpa watermark.`,
        `Q: Bisakah proses beberapa file sekaligus?\nA: Ya, untuk gabung PDF, upload beberapa file dan atur urutannya.`,
        `Q: Format apa yang didukung?\nA: PDF, DOC, DOCX, JPG, PNG tergantung tool yang dipakai.`,
      ]}
    ];
  },

  CV: (p) => [
    { paragraphs: [`${p.title.replace(/\[.*?\]/g, '').trim()} bisa dibuat dalam hitungan menit menggunakan generator CV ATS Toolinter. Isi data diri, pengalaman, dan keahlian, lalu download CV dalam format PDF. Gratis, tanpa watermark, dan ramah ATS (Applicant Tracking System).`] },
    { heading: 'Apa Itu CV ATS-Friendly?', paragraphs: [
      'CV ATS-friendly adalah CV yang bisa dibaca oleh sistem ATS (Applicant Tracking System) yang digunakan perusahaan besar untuk menyaring pelamar. Sistem ini membaca CV secara otomatis dan mencari keyword yang sesuai deskripsi pekerjaan.',
      'Format yang benar memastikan CV lolos screening otomatis dan sampai ke tangan HR. CV yang tidak ATS-friendly sering ditolak sebelum dibaca manusia. Format rumit, font aneh, atau struktur tidak standar bisa menyebabkan data tidak terbaca.',
      'Di Indonesia, semakin banyak perusahaan menggunakan ATS, terutama multinasional, BUMN, dan startup besar.'
    ]},
    { heading: 'Struktur CV yang Benar', paragraphs: [
      'Struktur CV yang disarankan untuk ATS dan HR:',
      '• Header: nama lengkap, telepon, email profesional, LinkedIn\n• Ringkasan profil: 2-3 kalimat tentang diri, keahlian utama, tujuan karir\n• Pengalaman kerja: urutkan dari terbaru, cantumkan pencapaian dengan angka\n• Pendidikan: gelar, institusi, tahun lulus, IPK (jika >3.00)\n• Keahlian: hard skill (tools, bahasa) dan soft skill (komunikasi, kepemimpinan)\n• Sertifikasi/pelatihan: kursus online, sertifikasi profesional',
      'Gunakan font standar (Arial, Calibri) 10-12pt. Hindari tabel, grafik, icon dekoratif. PDF lebih aman dari Word karena tampilan konsisten.'
    ]},
    { heading: 'Cara Buat CV dengan Toolinter', paragraphs: [
      'Langkah-langkah membuat CV:',
      '1. Buka Generator CV ATS Toolinter.\n2. Pilih template sesuai posisi yang dilamar.\n3. Isi data diri: nama, kontak, ringkasan profil.\n4. Tambahkan pengalaman kerja dari terbaru.\n5. Isi pendidikan dan keahlian.\n6. Preview hasil CV.\n7. Download dalam format PDF.\n8. Cek ejaan sebelum dikirim.',
      'Data tidak disimpan di server. Kamu bisa buat beberapa versi CV untuk posisi berbeda.'
    ]},
    { heading: 'Kesalahan CV yang Harus Dihindari', paragraphs: [
      'Kesalahan umum saat membuat CV:',
      '• CV terlalu panjang — idealnya 1 halaman (fresh graduate) atau 2 halaman (berpengalaman)\n• Font terlalu kecil — minimal 10pt agar mudah dibaca\n• Tidak ada keyword dari deskripsi pekerjaan — ATS mencari keyword spesifik\n• Foto tidak profesional — gunakan foto formal dengan background polos\n• Salah ejaan — minta orang lain proofread sebelum kirim\n• Tidak mencantumkan achievement — "Meningkatkan penjualan 30%" lebih kuat dari "Bertanggung jawab atas penjualan"\n• Email tidak profesional — hindari email seperti "coolboy123@gmail.com"\n• Format berantakan di device lain — gunakan PDF untuk konsistensi',
      'Hindari kesalahan ini agar CV dilirik HR dan lolos ATS.'
    ]},
    { heading: 'FAQ', paragraphs: [
      'Q: Apakah CV dari Toolinter bisa langsung dipakai?\nA: Ya, tapi sesuaikan dengan posisi. Tambahkan keyword dari deskripsi pekerjaan.',
      'Q: Format file apa?\nA: PDF, siap kirim dan cetak.',
      'Q: Apakah data saya disimpan?\nA: Tidak. Proses berjalan di browser.',
      'Q: Berapa lama idealnya CV?\nA: 1 halaman fresh graduate, maksimal 2 halaman berpengalaman.',
      'Q: Cocok untuk semua industri?\nA: Template ATS-friendly cocok untuk kebanyakan industri. Industri kreatif mungkin perlu desain lebih menarik.',
    ]}
  ],

  UMKM: (p) => [
    { paragraphs: [`${p.title.replace(/\[.*?\]/g, '').trim()} bisa dihitung secara instan menggunakan kalkulator online Toolinter. Masukkan data bisnis, hasil perhitungan langsung muncul. Gratis, akurat, dan bisa di-download sebagai PDF untuk arsip atau presentasi.`] },
    { heading: 'Apa Itu dan Kenapa Penting?', paragraphs: [
      'Komponen ini penting untuk menjalankan bisnis yang sehat. Tanpa perhitungan yang benar, kamu bisa salah menentukan harga jual, tidak tahu keuntungan bersih, atau kehilangan peluang efisiensi.',
      'Banyak UMKM Indonesia menghitung harga berdasarkan perkiraan atau ikut kompetitor tanpa tahu apakah margin cukup. Akibatnya, omzet besar tapi keuntungan tipis.',
      'Pemahaman yang benar membantu keputusan bisnis berdasarkan data, bukan perkiraan.'
    ]},
    { heading: 'Rumus dan Cara Hitung', paragraphs: [
      'Rumus dasar:',
      '• HPP = Bahan Baku + Tenaga Kerja Langsung + Overhead\n• Harga Jual = HPP + (HPP × Margin %)\n• Margin Bersih = (Harga Jual - Total Biaya) / Harga Jual × 100%\n• Break Even = Biaya Tetap / (Harga Jual per Unit - Biaya Variabel per Unit)',
      'Cara pakai kalkulator:\n1. Masukkan semua biaya bahan baku dan operasional\n2. Tambahkan biaya tenaga kerja\n3. Hitung HPP per unit\n4. Tentukan margin yang diinginkan\n5. Kalkulator menampilkan harga jual yang disarankan',
      'Gunakan data terbaru. Jangan lupa perhitungkan packaging, ongkir, dan fee marketplace.'
    ]},
    { heading: 'Contoh Perhitungan', paragraphs: [
      'Contoh bisnis makanan:',
      '• Bahan baku per porsi: Rp15.000\n• Tenaga kerja: Rp5.000\n• Overhead (gas, listrik, sewa): Rp3.000\n• Packaging: Rp2.000\n• Total HPP: Rp25.000\n• Margin target: 40%\n• Harga jual: Rp35.000\n• Fee marketplace (5%): Rp1.750\n• Keuntungan bersih: Rp8.250/porsi',
      'Jika terjual 100 porsi/hari, keuntungan harian Rp825.000. Evaluasi rutin untuk memantau tren bisnis.'
    ]},
    { heading: 'Kesalahan Umum UMKM', paragraphs: [
      'Kesalahan yang sering terjadi:',
      '• Tidak mencatat semua biaya — plastik, tissue, gas sering terlupa\n• Salah hitung HPP — jangan lupa tenaga kerja dan overhead\n• Tidak memperhitungkan fee marketplace — Shopee/Tokopedia ambil 2-8%\n• Harga tanpa data margin — jangan asal ikuti kompetitor\n• Tidak pisah uang pribadi dan bisnis — penyebab utama tidak tahu profit\n• Tidak punya catatan keuangan rapi\n• Mengabaikan biaya promosi',
      'Hindari kesalahan ini agar bisnis lebih sehat jangka panjang.'
    ]},
    { heading: 'FAQ', paragraphs: [
      'Q: Cocok untuk semua bisnis?\nA: Ya, F&B, retail, jasa, online shop. Sesuaikan komponen biaya dengan jenis bisnis.',
      'Q: Data bisnis aman?\nA: Ya. Semua berjalan di browser, tidak disimpan.',
      'Q: Berapa sering evaluasi?\nA: Bulanan untuk umum, mingguan untuk volume tinggi.',
      'Q: Pengganti akuntan?\nA: Tidak. Tool untuk perhitungan cepat. Pembukuan lengkap tetap butuh akuntan.',
      'Q: Margin terlalu kecil?\nA: Evaluasi biaya, cari supplier lebih murah, atau naikkan harga bertahap.',
    ]}
  ],

  Keuangan: (p) => [
    { paragraphs: [`${p.title.replace(/\[.*?\]/g, '').trim()} bisa dilakukan secara instan menggunakan kalkulator online Toolinter. Masukkan data keuangan, hasil simulasi langsung muncul. Gratis, akurat, dan bisa di-download sebagai PDF.`] },
    { heading: 'Apa Itu dan Kenapa Penting?', paragraphs: [
      'Perencanaan keuangan yang baik dimulai dari pemahaman benar tentang komponen keuangan kamu. Menghitung dengan akurat membantu keputusan finansial yang tepat.',
      'Baik simulasi kredit, investasi, atau dana darurat, perhitungan benar membantu merencanakan masa depan dengan percaya diri. Banyak orang mengambil keputusan finansial besar tanpa simulasi, akibatnya terjebak cicilan berat.',
      'Di Indonesia, literasi keuangan masih rendah. Tool simulasi membantu memahami angka sebelum membuat keputusan.'
    ]},
    { heading: 'Rumus dan Cara Hitung', paragraphs: [
      'Cara pakai kalkulator Toolinter:',
      '1. Masukkan data keuangan (nominal, tenor, suku bunga)\n2. Pilih parameter tambahan (jenis bunga, frekuensi)\n3. Klik "Hitung" untuk simulasi\n4. Analisis: cicilan bulanan, total bunga, total pembayaran\n5. Coba skenario berbeda dengan ubah parameter\n6. Download hasil sebagai PDF',
      'Untuk simulasi KPR:\n• Bunga fixed vs floating — fixed lebih pasti di awal\n• Tenor panjang = cicilan kecil tapi total bunga besar\n• DP besar = pinjaman kecil, bunga lebih sedikit\n• Asuransi dan biaya admin harus diperhitungkan',
      'Gunakan data realistis. Jangan terlalu optimis dengan kemampuan cicilan.'
    ]},
    { heading: 'Contoh Simulasi', paragraphs: [
      'Simulasi KPR rumah Rp500 juta, DP 20%:',
      '• Harga: Rp500.000.000\n• DP (20%): Rp100.000.000\n• Pinjaman: Rp400.000.000\n• Tenor: 20 tahun\n• Bunga fixed 6.5%\n• Cicilan/bulan: Rp3.093.000\n• Total bunga: Rp342.320.000\n• Total bayar: Rp742.320.000',
      'Cicilan Rp3,1 juta harus muat dalam budget (idealnya maksimal 30% penghasilan). Simulasi bersifat estimasi — hubungi bank untuk angka pasti.'
    ]},
    { heading: 'Kesalahan Umum', paragraphs: [
      'Kesalahan perencanaan keuangan:',
      '• Tidak hitung biaya tambahan — asuransi, admin, provisi sering terlupa\n• Pakai bunga tidak realistis — bunga promosi bisa naik signifikan\n• Tidak hitung kemampuan cicilan — idealnya maksimal 30% penghasilan\n• Terlalu optimis investasi — return tidak pasti\n• Tidak punya dana darurat — idealnya 3-6x pengeluaran bulanan\n• Abaikan inflasi — harga naik setiap tahun\n• Tidak bandingkan opsi — bandingkan bunga dari beberapa bank',
      'Hindari kesalahan ini agar perencanaan lebih realistis.'
    ]},
    { heading: 'FAQ', paragraphs: [
      'Q: Simulasi akurat?\nA: Estimasi berdasarkan rumus standar. Angka aktual tergantung kebijakan lembaga keuangan.',
      'Q: Data keuangan aman?\nA: Ya. Berjalan di browser, tidak disimpan.',
      'Q: Pengganti konsultan keuangan?\nA: Tidak. Untuk keputusan besar, konsultasikan dengan penasihat bersertifikat.',
      'Q: Suku bunga KPR saat ini?\nA: Berubah sewaktu-waktu. Cek langsung ke bank.',
      'Q: Bisa download hasil?\nA: Ya, klik "Download PDF".',
    ]}
  ],
};

let expandedCount = 0;
posts.forEach((post, index) => {
  if (post.date >= '2026-07-01' && post.date <= '2026-07-07') {
    const wc = countWords(post);
    if (wc < 900) {
      const templateFn = templates[post.category];
      if (templateFn) {
        posts[index].content = templateFn(post);
        expandedCount++;
      }
    }
  }
});

console.log(`Expanded ${expandedCount} posts`);

// Serialize
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
    if (section.heading) s += `        heading: ${JSON.stringify(section.heading)},\n`;
    s += `        paragraphs: [\n`;
    section.paragraphs.forEach(para => { s += `          ${JSON.stringify(para)},\n`; });
    s += `        ],\n`;
    s += `      },\n`;
  });
  s += `    ],\n`;
  s += `  }`;
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
console.log(`Total posts: ${posts.length}`);

// Verify
const jul1to7 = posts.filter(p => p.date >= '2026-07-01' && p.date <= '2026-07-07');
const wcs = jul1to7.map(countWords);
console.log(`\nJul 1-7 word counts:`);
console.log(`  Avg: ${Math.round(wcs.reduce((a,b)=>a+b,0)/wcs.length)}`);
console.log(`  Min: ${Math.min(...wcs)}`);
console.log(`  Max: ${Math.max(...wcs)}`);
console.log(`  Under 900: ${wcs.filter(w => w < 900).length}`);
console.log(`  Over 900: ${wcs.filter(w => w >= 900).length}`);
