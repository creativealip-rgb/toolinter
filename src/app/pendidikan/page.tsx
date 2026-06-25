import { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Kalender Akademik & Pendidikan — Toolinter",
  description:
    "Kalender akademik Indonesia: jadwal SNBP, SNBT, PPDB, CPNS, beasiswa. Lengkap dengan countdown dan filter.",
};

export default function PendidikanPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
            Pendidikan & Akademik
          </h1>
          <p className="text-lg text-ink-tertiary max-w-2xl mx-auto">
            Kalender akademik Indonesia, jadwal pendaftaran, dan tools
            pendidikan. Gratis, selalu update.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link
            href="/pendidikan/kalender"
            className="group bg-canvas rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all"
          >
            <Calendar className="w-8 h-8 text-primary mb-3" />
            <h2 className="font-semibold text-ink text-lg mb-2 group-hover:text-primary transition-colors">
              Kalender Akademik 2026
            </h2>
            <p className="text-ink-tertiary text-sm mb-4">
              Jadwal SNBP, SNBT, PPDB, CPNS, beasiswa, dan event akademik lainnya.
              Filter per kategori, status otomatis.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              Lihat Kalender <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-ink mb-4">
            Kalender Akademik Indonesia 2026
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              Pantau jadwal penting dunia pendidikan Indonesia dalam satu tempat.
              Dari pendaftaran SNBP dan SNBT hingga jadwal CPNS dan beasiswa —
              semua informasi tersedia secara lengkap.
            </p>
            <p>
              Toolinter menyediakan kalender akademik interaktif yang menampilkan
              status setiap event (Akan Datang, Berlangsung, atau Lewat) secara
              otomatis berdasarkan tanggal hari ini.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
