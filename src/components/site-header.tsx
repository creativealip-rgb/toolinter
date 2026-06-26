'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const categoryLinks = [
  { href: '/surat', label: 'Surat' },
  { href: '/foto', label: 'Foto' },
  { href: '/gaji', label: 'Gaji' },
  { href: '/pdf', label: 'PDF' },
  { href: '/cv', label: 'CV' },
  { href: '/umkm', label: 'UMKM' },
  { href: '/keuangan', label: 'Keuangan' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center">
        {/* Logo */}
        <a href="/" className="font-bold text-xl flex-shrink-0 text-ink-deep">
          Tool<span className="text-primary">inter</span>
        </a>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop nav — right side */}
        <nav className="hidden lg:flex items-center gap-1 mr-4">
          {categoryLinks.map((cat) => (
            <a
              key={cat.href}
              href={cat.href}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap"
            >
              {cat.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="/tools"
          className="hidden sm:inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors whitespace-nowrap"
        >
          Semua Tool
        </a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden ml-2 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col py-2">
            {categoryLinks.map((cat) => (
              <a
                key={cat.href}
                href={cat.href}
                className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-blue-50 transition-colors"
                onClick={() => setOpen(false)}
              >
                {cat.label}
              </a>
            ))}
            <a
              href="/tools"
              className="mx-4 mt-2 mb-1 py-2.5 text-center text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
              onClick={() => setOpen(false)}
            >
              Semua Tool →
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
