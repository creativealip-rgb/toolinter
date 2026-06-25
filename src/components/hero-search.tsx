'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import SearchModal from './search-modal';

export default function HeroSearch() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted w-5 h-5" />
        <input
          type="text"
          onClick={() => setSearchOpen(true)}
          readOnly
          placeholder="Cari tool... contoh: 'buat surat resign', 'resize foto 3x4'"
          className="w-full py-4 pl-12 pr-24 rounded-full bg-surface border border-border text-ink placeholder:text-ink-muted text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
        />
        <button
          onClick={() => setSearchOpen(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 px-6 rounded-full transition-colors"
        >
          Cari
        </button>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
