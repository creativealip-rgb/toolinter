'use client';

import { useI18n } from '@/lib/i18n';
import { Globe } from 'lucide-react';

export default function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-ink-tertiary hover:text-primary hover:bg-primary/10 transition-colors"
      title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
    >
      <Globe className="w-4 h-4" />
      {lang === 'id' ? 'EN' : 'ID'}
    </button>
  );
}
