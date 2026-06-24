import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import InvoiceGenerator from "@/components/invoice-generator";

export const metadata: Metadata = {
  title: "Generator Invoice Online — Toolinter",
  description:
    "Buat invoice profesional untuk UMKM Anda secara gratis. Input data usaha, pelanggan, dan daftar barang. Download sebagai PDF langsung dari browser.",
};

export default function InvoicePage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/umkm" className="hover:text-primary transition-colors">
            Tools UMKM
          </Link>
          <span>/</span>
          <span className="text-ink">Generator Invoice</span>
        </nav>

        {/* Back link */}
        <Link
          href="/umkm"
          className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-warning" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Generator Invoice Online
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Buat invoice profesional untuk pelanggan Anda. Isi data usaha, tambahkan
          barang/jasa, lalu download sebagai PDF. Gratis, tanpa registrasi.
        </p>

        {/* Invoice generator component */}
        <InvoiceGenerator />

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Cara Membuat Invoice untuk UMKM
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              <strong className="text-ink">Invoice</strong> atau faktur adalah
              dokumen yang diterbitkan penjual kepada pembeli sebagai bukti
              transaksi jual beli. Invoice memuat detail barang atau jasa yang
              dijual, jumlah, harga, dan total yang harus dibayar.
            </p>
            <p>
              Bagi UMKM, invoice penting karena menjadi dasar pencatatan
              keuangan, bukti transaksi untuk pelaporan pajak, dan alat penagihan
              pembayaran kepada pelanggan.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Komponen Wajib Invoice
            </h3>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Nama dan alamat usaha (penjual)</li>
              <li>Nama pelanggan (pembeli)</li>
              <li>Nomor invoice dan tanggal</li>
              <li>Daftar barang/jasa dengan harga satuan dan jumlah</li>
              <li>Total yang harus dibayar</li>
              <li>Catatan atau syarat pembayaran (opsional)</li>
            </ul>
            <p>
              Generator Invoice Toolinter membantu Anda membuat invoice profesional
              dalam hitungan detik. Cukup isi data, preview hasilnya, dan download
              sebagai PDF untuk dikirim ke pelanggan.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
