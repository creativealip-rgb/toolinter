import Link from "next/link";
import { ArrowLeft, Wand2 } from "lucide-react";
import JsonLd from "@/components/json-ld";
import GantiBackgroundFoto from "@/components/ganti-background-foto";

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Ganti Background Foto Online",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
};

export default function GantiBackgroundPage() {
  return (
    <main className="py-12 px-6">
      <JsonLd data={toolSchema} />
      <div className="max-w-3xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/foto" className="hover:text-primary transition-colors">Tools Foto</Link>
          <span>/</span>
          <span className="text-ink">Ganti Background</span>
        </nav>

        <Link href="/foto" className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">Ganti Background Foto</h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Ubah latar pas foto jadi merah, biru, atau putih otomatis. Cocok untuk lamaran kerja, CPNS, dan dokumen. Diproses 100% di browser, foto tidak diupload ke server.
        </p>

        <GantiBackgroundFoto />

        <section className="border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">Cara Ganti Background Pas Foto</h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>Banyak dokumen resmi mensyaratkan warna latar tertentu: merah untuk yang lahir tahun genap, biru untuk tahun ganjil (aturan umum pas foto), atau putih untuk keperluan lain.</p>
            <p><strong className="text-ink">Langkah:</strong></p>
            <p>1. Unggah foto dengan wajah menghadap kamera dan pencahayaan yang cukup.</p>
            <p>2. Sistem otomatis memisahkan objek dari latar (proses AI berjalan di browser kamu).</p>
            <p>3. Pilih warna background yang dibutuhkan.</p>
            <p>4. Unduh hasilnya sebagai PNG.</p>
            <p className="text-ink-muted">Tips: gunakan foto dengan latar polos dan kontras yang jelas antara subjek dan background untuk hasil terbaik.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
