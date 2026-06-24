import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Toolinter",
  description:
    "Kebijakan privasi Toolinter. Pelajari bagaimana kami menangani data dan privasi Anda.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-ink mb-8">Kebijakan Privasi</h1>
      <p className="text-sm text-ink-muted mb-10">
        Terakhir diperbarui: 24 Juni 2026
      </p>

      <div className="space-y-10 text-ink-secondary leading-relaxed">
        {/* Pengantar */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">1. Pengantar</h2>
          <p>
            Toolinter (&quot;kami&quot;) berkomitmen untuk melindungi privasi
            pengunjung dan pengguna situs kami. Kebijakan privasi ini menjelaskan
            bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi
            Anda saat menggunakan layanan di toolinter.net.
          </p>
        </section>

        {/* File & Data Pengguna */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            2. File &amp; Data Pengguna
          </h2>
          <p>
            <strong>Kami tidak menyimpan file pengguna di server.</strong>{" "}
            Seluruh proses manipulasi dokumen, foto, PDF, dan file lainnya
            dilakukan langsung di browser Anda (client-side). File yang Anda
            upload tidak pernah dikirim ke server kami, sehingga data Anda tetap
            aman dan privat.
          </p>
        </section>

        {/* Informasi yang Dikumpulkan */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            3. Informasi yang Dikumpulkan
          </h2>
          <p className="mb-3">
            Kami dapat mengumpulkan informasi non-pribadi berikut untuk
            keperluan analitik:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Halaman yang dikunjungi dan durasi kunjungan</li>
            <li>Jenis browser dan perangkat</li>
            <li>Lokasi umum (tingkat kota/negara, bukan alamat IP)</li>
            <li>Sumber rujukan (referral source)</li>
          </ul>
        </section>

        {/* Google Analytics */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            4. Google Analytics
          </h2>
          <p>
            Kami menggunakan Google Analytics untuk memahami bagaimana
            pengunjung menggunakan situs kami. Google Analytics menggunakan
            cookie untuk mengumpulkan informasi secara anonim dan menyusun laporan
            tentang aktivitas situs. Anda dapat mengatur browser untuk menolak
            cookie jika diinginkan.
          </p>
        </section>

        {/* Google AdSense */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            5. Google AdSense
          </h2>
          <p>
            Kami dapat menampilkan iklan melalui Google AdSense. Google
            menggunakan cookie untuk menampilkan iklan berdasarkan kunjungan
            pengguna ke situs kami dan situs lain. Anda dapat menonaktifkan
            iklan personal melalui{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Pengaturan Iklan Google
            </a>
            .
          </p>
        </section>

        {/* Cookie */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            6. Cookie
          </h2>
          <p>
            Situs kami menggunakan cookie untuk meningkatkan pengalaman
            pengguna, menyimpan preferensi, dan mengumpulkan data analitik.
            Anda dapat mengontrol cookie melalui pengaturan browser Anda.
            Menonaktifkan cookie mungkin mempengaruhi beberapa fitur situs.
          </p>
        </section>

        {/* Layanan Pihak Ketiga */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            7. Layanan Pihak Ketiga
          </h2>
          <p className="mb-3">
            Situs kami menggunakan layanan pihak ketiga berikut:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Google Analytics</strong> — analitik pengunjung
            </li>
            <li>
              <strong>Google AdSense</strong> — penyedia iklan
            </li>
            <li>
              <strong>Vercel</strong> — hosting dan infrastruktur
            </li>
          </ul>
          <p className="mt-3">
            Layanan pihak ketiga memiliki kebijakan privasi masing-masing yang
            berada di luar kendali kami.
          </p>
        </section>

        {/* Perubahan */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            8. Perubahan Kebijakan
          </h2>
          <p>
            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
            Perubahan akan dipublikasikan di halaman ini dengan tanggal
            pembaruan terbaru.
          </p>
        </section>

        {/* Kontak */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            9. Hubungi Kami
          </h2>
          <p>
            Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan
            hubungi kami di{" "}
            <a
              href="mailto:hello@toolinter.net"
              className="text-primary hover:underline"
            >
              hello@toolinter.net
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
