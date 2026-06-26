'use client';

import { useI18n } from '@/lib/i18n';

const categories = [
  { titleKey: 'cat.surat', href: '/surat' },
  { titleKey: 'cat.foto', href: '/foto' },
  { titleKey: 'cat.gaji', href: '/gaji' },
  { titleKey: 'cat.pdf', href: '/pdf' },
];

const popular = [
  { title: 'Surat Resign', href: '/surat/resign' },
  { title: 'Resize Foto 3x4', href: '/foto/resize-3x4' },
  { title: 'Kalkulator Gaji', href: '/gaji/bersih' },
  { title: 'CV ATS', href: '/cv/ats' },
];

export default function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-auto border-t border-border bg-ink-deep text-on-dark">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="font-bold text-lg mb-4">Toolinter</h3>
            <p className="text-sm text-on-dark/70 leading-relaxed">{t('footer.desc')}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.categories')}</h4>
            <ul className="space-y-2 text-sm text-on-dark/70">
              {categories.map((cat) => (
                <li key={cat.href}><a href={cat.href} className="hover:text-white transition-colors">{t(cat.titleKey)}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.popular')}</h4>
            <ul className="space-y-2 text-sm text-on-dark/70">
              {popular.map((tool) => (
                <li key={tool.href}><a href={tool.href} className="hover:text-white transition-colors">{tool.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm text-on-dark/70">
              <li><a href="/about" className="hover:text-white transition-colors">{t('footer.about')}</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-on-dark/10 text-center text-sm text-on-dark/50">
          <p>© {new Date().getFullYear()} Toolinter. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
