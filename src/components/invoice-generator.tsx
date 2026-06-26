'use client';

import AiInsightBox from "./ai-insight-box";
import { ActionBar } from "./action-bar";
import { useState } from "react";
import { Plus, Trash2, Download, Eye, FileText, Printer } from "lucide-react";

interface InvoiceItem {
  nama_barang: string;
  jumlah: number;
  harga_satuan: number;
}

function formatRp(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

export default function InvoiceGenerator() {
  const [namaUsaha, setNamaUsaha] = useState("");
  const [alamat, setAlamat] = useState("");
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [nomorInvoice, setNomorInvoice] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { nama_barang: "", jumlah: 1, harga_satuan: 0 },
  ]);
  const [catatan, setCatatan] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  function addItem() {
    setItems([...items, { nama_barang: "", jumlah: 1, harga_satuan: 0 }]);
  }

  function removeItem(index: number) {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof InvoiceItem, value: string | number) {
    const updated = [...items];
    if (field === "nama_barang") {
      updated[index] = { ...updated[index], [field]: value as string };
    } else {
      updated[index] = { ...updated[index], [field]: Number(value) || 0 };
    }
    setItems(updated);
  }

  function subtotal(item: InvoiceItem): number {
    return item.jumlah * item.harga_satuan;
  }

  function total(): number {
    return items.reduce((sum, item) => sum + subtotal(item), 0);
  }

  function formatTanggal(tgl: string): string {
    if (!tgl) return "[Tanggal]";
    return new Date(tgl).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  async function handleDownloadPDF() {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      let y = 20;

      // Header
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(namaUsaha || "Nama Usaha", 15, y);
      y += 7;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      if (alamat) {
        const alamatLines = doc.splitTextToSize(alamat, 180);
        doc.text(alamatLines, 15, y);
        y += alamatLines.length * 5;
      }
      y += 5;

      // Invoice title & number
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE", 15, y);
      y += 7;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`No: ${nomorInvoice || "-"}`, 15, y);
      doc.text(`Tanggal: ${formatTanggal(tanggal)}`, 120, y);
      y += 8;

      // Pelanggan
      doc.setFont("helvetica", "bold");
      doc.text("Kepada:", 15, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.text(namaPelanggan || "[Nama Pelanggan]", 15, y);
      y += 10;

      // Table header
      doc.setFillColor(240, 240, 240);
      doc.rect(15, y - 4, 180, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("No", 17, y);
      doc.text("Nama Barang/Jasa", 27, y);
      doc.text("Jumlah", 110, y);
      doc.text("Harga Satuan", 132, y);
      doc.text("Subtotal", 167, y);
      y += 7;

      // Table rows
      doc.setFont("helvetica", "normal");
      items.forEach((item, i) => {
        doc.text(`${i + 1}`, 17, y);
        const namaLines = doc.splitTextToSize(item.nama_barang || "-", 75);
        doc.text(namaLines, 27, y);
        doc.text(`${item.jumlah}`, 115, y);
        doc.text(formatRp(item.harga_satuan), 132, y);
        doc.text(formatRp(subtotal(item)), 167, y);
        y += Math.max(namaLines.length * 5, 6);
      });

      // Total line
      y += 2;
      doc.setDrawColor(0, 0, 0);
      doc.line(120, y, 195, y);
      y += 6;
      doc.setFont("helvetica", "bold");
      doc.text("TOTAL", 132, y);
      doc.text(formatRp(total()), 167, y);
      y += 10;

      // Catatan
      if (catatan) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("Catatan:", 15, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        const catatanLines = doc.splitTextToSize(catatan, 180);
        doc.text(catatanLines, 15, y);
        y += catatanLines.length * 5;
      }

      doc.save(`invoice-${nomorInvoice || "draft"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Gagal membuat PDF. Silakan coba lagi.");
    }
  }

  const isFormValid = namaUsaha.trim() && namaPelanggan.trim() && items.some((it) => it.nama_barang.trim());

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-canvas border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Data Usaha & Pelanggan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Nama Usaha *</label>
            <input
              type="text"
              value={namaUsaha}
              onChange={(e) => setNamaUsaha(e.target.value)}
              placeholder="Contoh: Toko Berkah Jaya"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Nomor Invoice</label>
            <input
              type="text"
              value={nomorInvoice}
              onChange={(e) => setNomorInvoice(e.target.value)}
              placeholder="Contoh: INV-2026-001"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-ink mb-1.5">Alamat Usaha</label>
            <textarea
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Contoh: Jl. Sudirman No. 10, Jakarta"
              rows={2}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Nama Pelanggan *</label>
            <input
              type="text"
              value={namaPelanggan}
              onChange={(e) => setNamaPelanggan(e.target.value)}
              placeholder="Contoh: PT Sejahtera"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Tanggal</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
            />
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-canvas border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-ink">Daftar Barang/Jasa</h2>
          <button
            onClick={addItem}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-5">
                {index === 0 && <label className="block text-xs font-medium text-ink-muted mb-1">Nama Barang/Jasa</label>}
                <input
                  type="text"
                  value={item.nama_barang}
                  onChange={(e) => updateItem(index, "nama_barang", e.target.value)}
                  placeholder="Nama barang"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
                />
              </div>
              <div className="col-span-2">
                {index === 0 && <label className="block text-xs font-medium text-ink-muted mb-1">Jumlah</label>}
                <input
                  type="number"
                  min="1"
                  value={item.jumlah}
                  onChange={(e) => updateItem(index, "jumlah", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
                />
              </div>
              <div className="col-span-3">
                {index === 0 && <label className="block text-xs font-medium text-ink-muted mb-1">Harga Satuan (Rp)</label>}
                <input
                  type="number"
                  min="0"
                  value={item.harga_satuan}
                  onChange={(e) => updateItem(index, "harga_satuan", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
                />
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className="text-sm font-medium text-ink">{formatRp(subtotal(item))}</span>
              </div>
              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => removeItem(index)}
                  disabled={items.length <= 1}
                  className="p-2 text-ink-muted hover:text-error transition-colors disabled:opacity-30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-4 pt-4 border-t border-border flex justify-end">
          <div className="text-right">
            <p className="text-sm text-ink-tertiary">Total</p>
            <p className="text-2xl font-bold text-ink">{formatRp(total())}</p>
          </div>
        </div>
      </div>

      {/* Catatan */}
      <div className="bg-canvas border border-border rounded-xl p-6">
        <label className="block text-sm font-medium text-ink mb-1.5">Catatan (opsional)</label>
        <textarea
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          placeholder="Contoh: Pembayaran dalam 30 hari. Terima kasih atas kepercayaan Anda."
          rows={2}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowPreview(!showPreview)}
          disabled={!isFormValid}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Eye className="w-4 h-4" />
          {showPreview ? "Sembunyikan Preview" : "Preview Invoice"}
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={!isFormValid}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-success text-white rounded-lg font-semibold hover:bg-success/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Preview */}
      {showPreview && isFormValid && (
        <div className="bg-white border border-border rounded-xl p-8 shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-bold text-ink">{namaUsaha}</h2>
              {alamat && <p className="text-sm text-ink-tertiary mt-1 whitespace-pre-line">{alamat}</p>}
            </div>
            <div className="text-right">
              <h3 className="text-lg font-bold text-primary">INVOICE</h3>
              {nomorInvoice && <p className="text-sm text-ink-tertiary">No: {nomorInvoice}</p>}
              {tanggal && <p className="text-sm text-ink-tertiary">Tanggal: {formatTanggal(tanggal)}</p>}
            </div>
          </div>

          {/* Pelanggan */}
          <div className="mb-6">
            <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1">Kepada:</p>
            <p className="text-sm font-semibold text-ink">{namaPelanggan}</p>
          </div>

          {/* Table */}
          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="border-b-2 border-ink">
                <th className="text-left py-2 font-semibold text-ink">No</th>
                <th className="text-left py-2 font-semibold text-ink">Nama Barang/Jasa</th>
                <th className="text-center py-2 font-semibold text-ink">Jumlah</th>
                <th className="text-right py-2 font-semibold text-ink">Harga Satuan</th>
                <th className="text-right py-2 font-semibold text-ink">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.filter(it => it.nama_barang.trim()).map((item, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-2 text-ink-tertiary">{i + 1}</td>
                  <td className="py-2 text-ink">{item.nama_barang}</td>
                  <td className="py-2 text-center text-ink">{item.jumlah}</td>
                  <td className="py-2 text-right text-ink">{formatRp(item.harga_satuan)}</td>
                  <td className="py-2 text-right text-ink font-medium">{formatRp(subtotal(item))}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-ink">
                <td colSpan={4} className="py-3 text-right font-bold text-ink">TOTAL</td>
                <td className="py-3 text-right font-bold text-ink text-lg">{formatRp(total())}</td>
              </tr>
            </tfoot>
          </table>

          {/* Catatan */}
          {catatan && (
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1">Catatan:</p>
              <p className="text-sm text-ink-tertiary">{catatan}</p>
            </div>
            )}

        </div>
      )}

      {/* AI Insight */}
      <div className="mt-4">
        <AiInsightBox
          title="AI Invoice Advisor"
          description="Minta AI saran template profesional, klausul pembayaran, dan tips penagihan."
          placeholder="Contoh: gimana cara nagih klien yang telat bayar?"
          buttonLabel="Saran Invoice dengan AI"
          context={`Invoice user:\nUsaha: ${namaUsaha}\nPelanggan: ${namaPelanggan}\nJumlah item: ${items.length}\nTotal: ${formatRp(total())}`}
          system="Kamu adalah advisor bisnis kecil Indonesia. Saran template invoice profesional, klausul pembayaran, dan tips penagihan."
        />
      </div>

      <ActionBar
        tool="umkm-invoice"
        toolName="Generator Invoice"
        shareItems={[["Usaha", namaUsaha || "-"], ["Pelanggan", namaPelanggan || "-"], ["Total", formatRp(total())]]}
        resultElementId="hasil-perhitungan"
        filename="invoice.pdf"
        show={!!isFormValid}
      />
    </div>
  );
}


