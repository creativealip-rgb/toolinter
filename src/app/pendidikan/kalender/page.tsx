'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  GraduationCap,
  Calendar,
  ChevronDown,
  ExternalLink,
  BookOpen,
  FileCheck,
  Award,
  Building2,
  Clock,
} from 'lucide-react';
import AiInsightBox from '@/components/ai-insight-box';

type Category = 'SNBP' | 'SNBT' | 'PPDB' | 'CPNS' | 'Beasiswa' | 'UTBK' | 'Umum';

interface AcademicEvent {
  id: string;
  category: Category;
  title: string;
  dateStart: string; // ISO
  dateEnd: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const CATEGORY_COLORS: Record<Category, { dot: string; bg: string; text: string }> = {
  SNBP:      { dot: 'bg-blue-500',  bg: 'bg-blue-500/10',  text: 'text-blue-600' },
  SNBT:      { dot: 'bg-green-500', bg: 'bg-green-500/10', text: 'text-green-600' },
  PPDB:      { dot: 'bg-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-600' },
  CPNS:      { dot: 'bg-red-500',   bg: 'bg-red-500/10',   text: 'text-red-600' },
  Beasiswa:  { dot: 'bg-purple-500', bg: 'bg-purple-500/10', text: 'text-purple-600' },
  UTBK:      { dot: 'bg-teal-500',  bg: 'bg-teal-500/10',  text: 'text-teal-600' },
  Umum:      { dot: 'bg-gray-500',  bg: 'bg-gray-500/10',  text: 'text-gray-600' },
};

const CATEGORY_ICONS: Record<Category, typeof GraduationCap> = {
  SNBP: FileCheck,
  SNBT: BookOpen,
  PPDB: Building2,
  CPNS: Award,
  Beasiswa: Award,
  UTBK: BookOpen,
  Umum: GraduationCap,
};

const EVENTS: AcademicEvent[] = [
  {
    id: 'snbp-daftar',
    category: 'SNBP',
    title: 'Pendaftaran SNBP',
    dateStart: '2026-02-04',
    dateEnd: '2026-02-14',
    description: 'Seleksi Nasional Berdasarkan Prestasi — jalur undangan untuk siswa berprestasi masuk PTN.',
    ctaLabel: 'Info SNBP',
    ctaHref: 'https://snbp-snbm.kemdikbud.go.id',
  },
  {
    id: 'snbp-pengumuman',
    category: 'SNBP',
    title: 'Pengumuman SNBP',
    dateStart: '2026-03-19',
    dateEnd: '2026-03-19',
    description: 'Pengumuman hasil seleksi SNBP. Cek di portal resmi.',
    ctaLabel: 'Cek Hasil',
    ctaHref: 'https://snbp-snbm.kemdikbud.go.id',
  },
  {
    id: 'snbt-daftar',
    category: 'SNBT',
    title: 'Pendaftaran SNBT',
    dateStart: '2026-03-17',
    dateEnd: '2026-04-07',
    description: 'Seleksi Nasional Berdasarkan Tes — jalur ujian tulis masuk PTN.',
    ctaLabel: 'Info SNBT',
    ctaHref: 'https://snbp-snbm.kemdikbud.go.id',
  },
  {
    id: 'snbt-ujian',
    category: 'SNBT',
    title: 'Pelaksanaan Ujian SNBT',
    dateStart: '2026-04-23',
    dateEnd: '2026-04-23',
    description: 'Hari pelaksanaan ujian tulis SNBT di lokasi yang ditentukan.',
  },
  {
    id: 'snbt-pengumuman',
    category: 'SNBT',
    title: 'Pengumuman SNBT',
    dateStart: '2026-05-13',
    dateEnd: '2026-05-13',
    description: 'Pengumuman hasil seleksi SNBT. Cek di portal resmi.',
    ctaLabel: 'Cek Hasil',
    ctaHref: 'https://snbp-snbm.kemdikbud.go.id',
  },
  {
    id: 'utbk',
    category: 'UTBK',
    title: 'Ujian Tulis Berbasis Komputer (UTBK)',
    dateStart: '2026-04-01',
    dateEnd: '2026-04-30',
    description: 'Pelaksanaan UTBK sebagai syarat pendaftaran SNBT dan beberapa jalur mandiri.',
  },
  {
    id: 'ppdb',
    category: 'PPDB',
    title: 'Pendaftaran PPDB',
    dateStart: '2026-05-01',
    dateEnd: '2026-06-30',
    description: 'Penerimaan Peserta Didik Baru untuk SD, SMP, dan SMA/SMK. Jadwal bervariasi per daerah.',
    ctaLabel: 'Info PPDB',
    ctaHref: 'https://ppdb.kemdikbud.go.id',
  },
  {
    id: 'beasiswa-lpdp',
    category: 'Beasiswa',
    title: 'Pendaftaran Beasiswa LPDP',
    dateStart: '2026-03-01',
    dateEnd: '2026-03-31',
    description: 'Beasiswa Lembaga Pengelola Dana Pendidikan untuk S2 dan S3 dalam/luar negeri.',
    ctaLabel: 'Info LPDP',
    ctaHref: 'https://lpdp.kemenkeu.go.id',
  },
  {
    id: 'beasiswa-kipk',
    category: 'Beasiswa',
    title: 'Pendaftaran KIP Kuliah',
    dateStart: '2026-04-01',
    dateEnd: '2026-04-30',
    description: 'Kartu Indonesia Pintar Kuliah — bantuan biaya pendidikan untuk mahasiswa kurang mampu.',
    ctaLabel: 'Info KIP-K',
    ctaHref: 'https://kip-kuliah.kemdikbud.go.id',
  },
  {
    id: 'cpns',
    category: 'CPNS',
    title: 'Seleksi CPNS 2026',
    dateStart: '2026-07-01',
    dateEnd: '2026-09-30',
    description: 'Estimasi jadwal seleksi Calon Pegawai Negeri Sipil. Pantau pengumuman resmi BKN.',
    ctaLabel: 'Info CPNS',
    ctaHref: 'https://sscasn.bkn.go.id',
  },
  {
    id: 'masuk-sekolah',
    category: 'Umum',
    title: 'Tahun Ajaran Baru / Masuk PT',
    dateStart: '2026-07-01',
    dateEnd: '2026-07-31',
    description: 'Awal masuk sekolah dan perkuliahan untuk tahun ajaran 2026/2027.',
  },
];

function getStatus(start: string, end: string): 'Lewat' | 'Berlangsung' | 'Akan Datang' {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const s = new Date(start);
  const e = new Date(end);
  e.setHours(23, 59, 59, 999);
  if (now > e) return 'Lewat';
  if (now >= s && now <= e) return 'Berlangsung';
  return 'Akan Datang';
}

function formatDateRange(start: string, end: string): string {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const s = new Date(start);
  const e = new Date(end);
  if (start === end) return s.toLocaleDateString('id-ID', opts);
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()} – ${e.toLocaleDateString('id-ID', opts)}`;
  }
  return `${s.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })} – ${e.toLocaleDateString('id-ID', opts)}`;
}

function statusBadge(status: ReturnType<typeof getStatus>) {
  if (status === 'Lewat') return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-ink-muted/20 text-ink-muted">Lewat</span>;
  if (status === 'Berlangsung') return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">Berlangsung</span>;
  return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">Akan Datang</span>;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

export default function KalenderAkademikPage() {
  const [filter, setFilter] = useState<Category | 'Semua'>('Semua');

  const filtered = useMemo(
    () => filter === 'Semua' ? EVENTS : EVENTS.filter((e) => e.category === filter),
    [filter],
  );

  // Group by month
  const grouped = useMemo(() => {
    const map = new Map<number, AcademicEvent[]>();
    filtered.forEach((ev) => {
      const m = new Date(ev.dateStart).getMonth();
      if (!map.has(m)) map.set(m, []);
      map.get(m)!.push(ev);
    });
    // Sort events within each month by start date
    map.forEach((arr) => arr.sort((a, b) => a.dateStart.localeCompare(b.dateStart)));
    return map;
  }, [filtered]);

  return (
    <main className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/pendidikan" className="hover:text-primary transition-colors">
            Pendidikan
          </Link>
          <span>/</span>
          <span className="text-ink">Kalender Akademik</span>
        </nav>

        {/* Back link */}
        <Link
          href="/pendidikan"
          className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Kalender Akademik 2026
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Jadwal penting pendidikan Indonesia 2026 — SNBP, SNBT, PPDB, CPNS, beasiswa, dan lainnya.
        </p>

        {/* Filter */}
        <div className="mb-8">
          <label className="mb-1 block text-xs font-medium text-ink-tertiary">Filter Kategori</label>
          <div className="relative max-w-xs">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as Category | 'Semua')}
              className="w-full appearance-none pl-3 pr-10 py-2 rounded-lg border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            >
              <option value="Semua">Semua Kategori</option>
              {Object.keys(CATEGORY_COLORS).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-8">
          {Object.entries(CATEGORY_COLORS).map(([cat, colors]) => (
            <div key={cat} className="flex items-center gap-1.5 text-xs text-ink-tertiary">
              <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
              {cat}
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {Array.from(grouped.entries()).sort(([a], [b]) => a - b).map(([month, events]) => (
            <div key={month}>
              {/* Month header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-lg">
                  {MONTHS[month]} 2026
                </div>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Events */}
              <div className="space-y-3 ml-2">
                {events.map((ev) => {
                  const colors = CATEGORY_COLORS[ev.category];
                  const Icon = CATEGORY_ICONS[ev.category];
                  const status = getStatus(ev.dateStart, ev.dateEnd);

                  return (
                    <div
                      key={ev.id}
                      className={`relative border border-border rounded-xl p-5 bg-canvas hover:shadow-sm transition-shadow`}
                    >
                      {/* Timeline dot */}
                      <div className={`absolute -left-2 top-6 w-4 h-4 rounded-full ${colors.dot} border-2 border-canvas`} />

                      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-semibold text-ink">{ev.title}</h3>
                            {statusBadge(status)}
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-ink-tertiary mb-2">
                            <Clock className="w-3.5 h-3.5" />
                            {formatDateRange(ev.dateStart, ev.dateEnd)}
                          </div>
                          <p className="text-sm text-ink-tertiary leading-relaxed">{ev.description}</p>
                          {ev.ctaLabel && ev.ctaHref && (
                            <a
                              href={ev.ctaHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline font-medium"
                            >
                              {ev.ctaLabel}
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                        <span className={`self-start px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
                          {ev.category}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-ink-muted">
              <Calendar className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>Tidak ada event untuk kategori ini.</p>
            </div>
          )}
        </div>

        {/* AI Insight */}
        <div className="mt-8">
          <AiInsightBox
            title="AI Akademik Advisor"
            description="Tanya AI tentang jadwal akademik, persiapan ujian, atau tips mendaftar."
            placeholder="Contoh: kapan harus mulai belajar untuk SNBT? Apa bedanya SNBP dan SNBT?"
            buttonLabel="Tanya AI tentang Akademik"
            context={`Kalender Akademik Indonesia 2026:\n${EVENTS.map((e) => `- ${e.title}: ${formatDateRange(e.dateStart, e.dateEnd)} (${e.category})`).join('\n')}`}
            system="Kamu adalah penasihat akademik Indonesia. Bantu siswa memahami jadwal dan persiapan untuk SNBP, SNBT, PPDB, CPNS, beasiswa, dan ujian masuk lainnya. Beri tips praktis dan motivasi."
          />
        </div>

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Tentang Kalender Akademik Indonesia 2026
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              Kalender Akademik Toolinter menampilkan jadwal penting pendidikan Indonesia tahun 2026,
              termasuk seleksi masuk perguruan tinggi (SNBP & SNBT), penerimaan siswa baru (PPDB),
              seleksi CPNS, beasiswa nasional, dan jadwal ujian UTBK.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">Apa itu SNBP?</h3>
            <p>
              <strong className="text-ink">Seleksi Nasional Berdasarkan Prestasi (SNBP)</strong> adalah
              jalur seleksi masuk PTN berdasarkan rapor dan prestasi akademik/non-akademik, tanpa ujian tulis.
              Hanya siswa yang mendapat rekomendasi sekolah yang bisa mendaftar.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">Apa itu SNBT?</h3>
            <p>
              <strong className="text-ink">Seleksi Nasional Berdasarkan Tes (SNBT)</strong> adalah
              jalur seleksi masuk PTN melalui ujian tulis berbasis komputer (UTBK). Terbuka untuk
              semua lulusan SMA/SMK/sederajat maksimal 3 tahun terakhir.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
