"use client";

import { Mail, MessageSquare } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    alert(
      `Terima kasih, ${form.name}! Pesan Anda telah diterima. Kami akan membalas ke ${form.email}.`
    );
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-ink mb-4">Hubungi Kami</h1>
      <p className="text-ink-secondary mb-10 max-w-xl">
        Punya pertanyaan, saran, atau laporan bug? Kirim pesan melalui form di
        bawah atau langsung email kami.
      </p>

      <div className="grid gap-10 md:grid-cols-[1fr_auto]">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-ink mb-1.5"
            >
              Nama
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Nama Anda"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-ink mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-border bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="email@contoh.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-ink mb-1.5"
            >
              Pesan
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-border bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              placeholder="Tulis pesan Anda di sini..."
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-ink-deep px-6 py-2.5 text-sm font-medium text-on-dark hover:bg-ink-deep/90 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            Kirim Pesan
          </button>
        </form>

        {/* Contact info */}
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-ink">Email</p>
              <a
                href="mailto:hello@toolinter.net"
                className="text-sm text-primary hover:underline"
              >
                hello@toolinter.net
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
