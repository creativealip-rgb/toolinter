'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'id' | 'en';

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({ lang: 'id', setLang: () => {}, t: (k) => k });

const translations: Record<string, Record<Lang, string>> = {
  // Homepage
  'hero.title1': { id: 'Tool Online Gratis untuk', en: 'Free Online Tools for' },
  'hero.title2': { id: 'Surat, Foto, CV, PDF & Keuangan', en: 'Letters, Photos, CV, PDF & Finance' },
  'hero.subtitle': { id: 'Pilih tool, isi data, download hasil. Tanpa install, tanpa ribet, tanpa registrasi.', en: 'Choose a tool, fill in data, download results. No install, no hassle, no registration.' },
  'hero.search.placeholder': { id: "Cari tool... contoh: 'buat surat resign', 'resize foto 3x4'", en: "Search tools... e.g. 'create resignation letter', 'resize photo 3x4'" },
  'hero.search.btn': { id: 'Cari', en: 'Search' },

  'trust.gratis': { id: 'Gratis', en: 'Free' },
  'trust.tools': { id: 'Tool Tersedia', en: 'Tools Available' },
  'trust.noInstall': { id: 'Tanpa Install', en: 'No Install' },

  'cat.title': { id: 'Kategori Tool', en: 'Tool Categories' },
  'cat.subtitle': { id: 'Pilih kategori untuk menemukan tool yang Anda butuhkan', en: 'Choose a category to find the tool you need' },
  'cat.toolCount': { id: 'tool', en: 'tools' },

  'popular.title': { id: 'Tool Populer', en: 'Popular Tools' },
  'popular.subtitle': { id: 'Tool yang paling sering digunakan pengunjung kami', en: 'Most used tools by our visitors' },

  'why.title': { id: 'Kenapa Toolinter?', en: 'Why Toolinter?' },
  'why.subtitle': { id: 'Alasan mengapa jutaan orang memilih Toolinter', en: 'Why millions choose Toolinter' },
  'why.fast.title': { id: 'Cepat & Ringan', en: 'Fast & Light' },
  'why.fast.desc': { id: 'Tidak perlu install aplikasi. Langsung pakai di browser HP atau laptop.', en: 'No app install needed. Use directly in your phone or laptop browser.' },
  'why.download.title': { id: 'Download Langsung', en: 'Instant Download' },
  'why.download.desc': { id: 'Hasil bisa langsung download dalam format PDF, DOCX, atau JPG.', en: 'Results can be downloaded directly in PDF, DOCX, or JPG format.' },
  'why.privacy.title': { id: 'Privasi Terjaga', en: 'Privacy Protected' },
  'why.privacy.desc': { id: 'File diproses di browser. Tidak disimpan di server kami.', en: 'Files processed in browser. Not stored on our servers.' },
  'why.free.title': { id: '100% Gratis', en: '100% Free' },
  'why.free.desc': { id: 'Semua tool bisa dipakai tanpa bayar. Tanpa registrasi wajib.', en: 'All tools are free to use. No registration required.' },

  'faq.title': { id: 'Pertanyaan Umum', en: 'Frequently Asked Questions' },
  'faq.subtitle': { id: 'Jawaban atas pertanyaan yang sering diajukan', en: 'Answers to commonly asked questions' },

  'blog.title': { id: 'Panduan Terbaru', en: 'Latest Guides' },
  'blog.subtitle': { id: 'Tips dan panduan untuk kebutuhan dokumen Anda', en: 'Tips and guides for your document needs' },
  'blog.all': { id: 'Lihat Semua Panduan →', en: 'View All Guides →' },

  'featured.title': { id: 'Butuh Surat atau Foto untuk Kebutuhan Sekolah/Kerja?', en: 'Need Documents for School or Work?' },
  'featured.desc': { id: 'Buat surat resmi, resize foto dokumen, dan hitung gaji — semua gratis, tanpa install.', en: 'Create official letters, resize document photos, and calculate salary — all free, no install.' },
  'featured.cta': { id: 'Coba Sekarang', en: 'Try Now' },

  'footer.desc': { id: 'Kumpulan tool online gratis untuk kebutuhan sehari-hari. Cepat, ringan, dan bisa langsung download hasil.', en: 'Free online tools for everyday needs. Fast, lightweight, and results downloadable instantly.' },
  'footer.categories': { id: 'Kategori', en: 'Categories' },
  'footer.popular': { id: 'Populer', en: 'Popular' },
  'footer.company': { id: 'Perusahaan', en: 'Company' },
  'footer.about': { id: 'Tentang Kami', en: 'About Us' },
  'footer.contact': { id: 'Hubungi Kami', en: 'Contact Us' },
  'footer.privacy': { id: 'Kebijakan Privasi', en: 'Privacy Policy' },
  'footer.terms': { id: 'Syarat & Ketentuan', en: 'Terms & Conditions' },

  // Common UI
  'ui.hitung': { id: 'Hitung', en: 'Calculate' },
  'ui.generate': { id: 'Generate', en: 'Generate' },
  'ui.copy': { id: 'Copy', en: 'Copy' },
  'ui.copied': { id: 'Tersalin!', en: 'Copied!' },
  'ui.download': { id: 'Download', en: 'Download' },
  'ui.share': { id: 'Share', en: 'Share' },
  'ui.history': { id: 'Riwayat', en: 'History' },
  'ui.compare': { id: 'Bandingkan', en: 'Compare' },
  'ui.allTools': { id: 'Semua Tool →', en: 'All Tools →' },

  // Category names
  'cat.surat': { id: 'Surat & Dokumen', en: 'Letters & Documents' },
  'cat.foto': { id: 'Foto & Dokumen', en: 'Photo & Documents' },
  'cat.gaji': { id: 'Gaji & Keuangan', en: 'Salary & Finance' },
  'cat.pdf': { id: 'PDF & Converter', en: 'PDF & Converter' },
  'cat.cv': { id: 'CV & Lamaran', en: 'CV & Applications' },
  'cat.umkm': { id: 'UMKM & Bisnis', en: 'SME & Business' },
  'cat.keuangan': { id: 'Keuangan', en: 'Finance' },
  'cat.pendidikan': { id: 'Pendidikan', en: 'Education' },

  // Search
  'search.notFound': { id: 'Tidak ditemukan', en: 'Not found' },
  'search.tryOther': { id: 'Coba kata kunci lain', en: 'Try other keywords' },
  'search.navigate': { id: 'navigasi', en: 'navigate' },
  'search.open': { id: 'buka', en: 'open' },
  'search.close': { id: 'tutup', en: 'close' },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('id');

  useEffect(() => {
    const saved = localStorage.getItem('toolinter-lang') as Lang;
    if (saved === 'id' || saved === 'en') setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('toolinter-lang', l);
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.id || key;
  };

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export type { Lang };
