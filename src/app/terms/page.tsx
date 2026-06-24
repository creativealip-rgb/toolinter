import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — Toolinter",
  description:
    "Syarat dan ketentuan penggunaan layanan Toolinter.",
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-ink mb-8">
        Syarat &amp; Ketentuan
      </h1>
      <p className="text-sm text-ink-muted mb-10">
        Terakhir diperbarui: 24 Juni 2026
      </p>

      <div className="space-y-10 text-ink-secondary leading-relaxed">
        {/* Penerimaan */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            1. Penerimaan Syarat
          </h2>
          <p>
            Dengan mengakses dan menggunakan situs toolinter.net, Anda
            menyetujui syarat dan ketentuan yang tercantum di halaman ini. Jika
            Anda tidak setuju, mohon untuk tidak menggunakan layanan kami.
          </p>
        </section>

        {/* Layanan */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            2. Layanan
          </h2>
          <p>
            Layanan disediakan <strong>apa adanya</strong> (as-is) tanpa jaminan
            apapun. Kami berusaha memastikan semua tool berfungsi dengan baik,
            namun kami tidak menjamin ketersediaan, akurasi, atau kelengkapan
            layanan setiap saat.
          </p>
        </section>

        {/* Tanggung Jawab Pengguna */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            3. Tanggung Jawab Pengguna
          </h2>
          <p className="mb-3">
            Pengguna bertanggung jawab penuh atas:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Konten yang diupload atau diproses melalui tool kami
            </li>
            <li>
              Memastikan konten yang diproses tidak melanggar hukum atau hak
              pihak ketiga
            </li>
            <li>
              Menyimpan cadangan (backup) file penting sebelum menggunakan tool
              kami
            </li>
            <li>
              Memverifikasi hasil keluaran sebelum digunakan untuk keperluan
              resmi
            </li>
          </ul>
        </section>

        {/* File & Privasi */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            4. File &amp; Privasi
          </h2>
          <p>
            <strong>Kami tidak menyimpan file pengguna di server.</strong>{" "}
            Semua proses dilakukan di sisi browser (client-side). File yang Anda
            upload atau hasil yang di-generate tidak disimpan, diakses, atau
            dibagikan oleh pihak kami.
          </p>
        </section>

        {/* Batasan Tanggung Jawab */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            5. Batasan Tanggung Jawab
          </h2>
          <p className="mb-3">
            Dalam batas maksimal yang diizinkan hukum, Toolinter dan tim
            pengelolanya tidak bertanggung jawab atas:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Kerugian langsung atau tidak langsung dari penggunaan layanan
            </li>
            <li>
              Kehilangan data akibat kesalahan pengguna atau gangguan teknis
            </li>
            <li>
              Keputusan yang diambil berdasarkan hasil dari tool kami
            </li>
            <li>
              Gangguan layanan karena maintenance, force majeure, atau faktor
              di luar kendali kami
            </li>
          </ul>
        </section>

        {/* Perubahan Syarat */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            6. Perubahan Syarat
          </h2>
          <p>
            Kami berhak mengubah syarat dan ketentuan ini kapan saja tanpa
            pemberitahuan sebelumnya. Perubahan akan berlaku segera setelah
            dipublikasikan di halaman ini. Penggunaan berkelanjutan atas layanan
            kami setelah perubahan dianggap sebagai persetujuan Anda.
          </p>
        </section>

        {/* Kontak */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            7. Hubungi Kami
          </h2>
          <p>
            Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini,
            silakan hubungi kami di{" "}
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
