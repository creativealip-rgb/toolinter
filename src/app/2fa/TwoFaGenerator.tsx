'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Copy, Check, ChevronDown, Key, AlertCircle } from 'lucide-react';
import * as OTPAuth from 'otpauth';

interface CodeEntry {
  id: string;
  key: string;
  displayKey: string;
  code: string;
  remaining: number;
}

const faqs = [
  {
    q: 'Bagaimana cara mendapatkan kode 2FA online?',
    a: 'Tempel secret key (Base32) yang diberikan saat setup 2FA ke kolom di atas, lalu klik "Generate Kode 2FA." Kode langsung dibuat di browser kamu — tidak ada yang dikirim ke server.',
  },
  {
    q: 'Apakah bisa untuk Facebook/Google/Discord?',
    a: 'Bisa! Semua layanan yang menggunakan standar TOTP algorithm (hampir semua) didukung — termasuk Facebook, Google, Discord, GitHub, Fortnite, AWS, Microsoft, dan lainnya.',
  },
  {
    q: 'Apakah aman menggunakan layanan ini?',
    a: '100% aman. Semua perhitungan terjadi lokal di browser menggunakan JavaScript. Secret key kamu tidak pernah dikirim ke server manapun. Buka tab Network di DevTools untuk verifikasi.',
  },
  {
    q: 'Bisa generate untuk beberapa layanan sekaligus?',
    a: 'Bisa! Masukkan beberapa secret key, satu per baris. Masing-masing akan menghasilkan kode dengan timer countdown independen.',
  },
  {
    q: 'Bagaimana cara kerja TOTP?',
    a: 'TOTP (Time-based One-Time Password, RFC 6238) mengkombinasikan secret key dengan waktu saat ini (interval 30 detik) menggunakan HMAC-SHA1 untuk menghasilkan kode 6 digit yang unik.',
  },
  {
    q: 'Dimana saya bisa menemukan secret key 2FA?',
    a: 'Secret key diberikan saat pertama kali mengaktifkan 2FA di suatu layanan. Biasanya berupa kode Base32 (kombinasi huruf A-Z dan angka 2-7). Jika hanya melihat QR code, biasanya ada opsi "enter manually" untuk melihat key-nya.',
  },
];

export default function TwoFaGenerator() {
  const [input, setInput] = useState('');
  const [codes, setCodes] = useState<CodeEntry[]>([]);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cleanKey = (raw: string) => raw.replace(/[\s-]/g, '').toUpperCase();

  const isValidBase32 = (key: string) => /^[A-Z2-7]+=*$/.test(key) && key.length >= 16;

  const generateCode = useCallback((secret: string): { code: string; remaining: number } | null => {
    try {
      const totp = new OTPAuth.TOTP({
        secret: OTPAuth.Secret.fromBase32(secret),
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
      });
      const code = totp.generate();
      const remaining = totp.period - (Math.floor(Date.now() / 1000) % totp.period);
      return { code: code.toString(), remaining };
    } catch {
      return null;
    }
  }, []);

  const maskKey = (key: string) => {
    if (key.length > 16) return key.substring(0, 6) + '····' + key.substring(key.length - 4);
    return key;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const raw = input.trim();
    if (!raw) {
      setError('Masukkan minimal satu secret key.');
      return;
    }

    const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    const valid: string[] = [];
    const invalidLines: number[] = [];

    lines.forEach((line, i) => {
      const cleaned = cleanKey(line);
      if (isValidBase32(cleaned)) {
        valid.push(cleaned);
      } else {
        invalidLines.push(i + 1);
      }
    });

    if (valid.length === 0) {
      setError(
        invalidLines.length > 0
          ? `Format key salah di baris ${invalidLines.join(', ')}. Key harus Base32 (A-Z, 2-7), minimal 16 karakter.`
          : 'Tidak ada key valid ditemukan.'
      );
      return;
    }

    const entries: CodeEntry[] = valid.map((key, i) => {
      const result = generateCode(key);
      return {
        id: `${key}-${i}`,
        key,
        displayKey: maskKey(key),
        code: result?.code || '------',
        remaining: result?.remaining || 0,
      };
    });

    setCodes(entries);
  };

  useEffect(() => {
    if (codes.length === 0) return;

    timerRef.current = setInterval(() => {
      setCodes((prev) =>
        prev.map((entry) => {
          const result = generateCode(entry.key);
          return result ? { ...entry, code: result.code, remaining: result.remaining } : entry;
        })
      );
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [codes.length, generateCode]);

  const copyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const timerColor = (r: number) => (r <= 5 ? 'text-error' : r <= 10 ? 'text-warning' : 'text-primary');
  const ringColor = (r: number) => (r <= 5 ? '#E2464C' : r <= 10 ? '#FFC205' : '#1A8FE3');
  const circumference = 2 * Math.PI * 14;

  return (
    <main className="py-8 px-4 sm:px-6">
      <div className="max-w-[600px] mx-auto">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-2">Generator Kode 2FA</h1>
          <p className="text-ink-tertiary text-sm sm:text-base max-w-md mx-auto">
            Buat kode autentikasi dua faktor dari secret key kamu. 100% client-side — key tidak pernah dikirim ke server.
          </p>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="bg-surface rounded-xl p-5 border border-border">
            <label htmlFor="secret-keys" className="block text-sm font-medium text-ink mb-2">
              <Key className="w-4 h-4 inline mr-1.5 -mt-0.5" /> Masukkan Secret Key (Base32)
            </label>
            <textarea
              id="secret-keys"
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none font-mono"
              placeholder={"JBSW Y3DP EHPK 3PXP\nKRUG S4ZN 5XGY 2LOM\n(satu key per baris)"}
              spellCheck={false}
              autoComplete="off"
            />
            <p className="text-xs text-ink-muted mt-2">Mendukung format Base32 dengan atau tanpa spasi. Satu key per baris.</p>

            {error && (
              <div className="flex items-start gap-2 mt-3 p-3 rounded-lg bg-error/5 border border-error/20">
                <AlertCircle className="w-4 h-4 text-error shrink-0 mt-0.5" />
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-inverse text-sm font-medium h-10 px-6 hover:bg-primary-hover active:bg-primary-active transition-colors">
                <Shield className="w-4 h-4" /> Generate Kode 2FA
              </button>
            </div>
          </div>
        </form>

        {/* Results */}
        {codes.length > 0 && (
          <div className="space-y-3 mb-8">
            {codes.map((entry) => (
              <div key={entry.id} className="bg-canvas border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono bg-surface text-ink-tertiary px-2.5 py-1 rounded-md">{entry.displayKey}</span>
                  <div className="relative w-8 h-8">
                    <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#E3E3E4" strokeWidth="2.5" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke={ringColor(entry.remaining)} strokeWidth="2.5"
                        strokeDasharray={circumference} strokeDashoffset={circumference * (1 - entry.remaining / 30)}
                        strokeLinecap="round" className="transition-all duration-1000 ease-linear" />
                    </svg>
                    <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-bold ${timerColor(entry.remaining)}`}>{entry.remaining}s</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-11 h-13 text-2xl font-bold font-mono bg-surface border border-border rounded-lg text-ink">{entry.code.slice(0, 3)}</span>
                  <span className="text-xl font-bold text-ink-muted">-</span>
                  <span className="inline-flex items-center justify-center w-11 h-13 text-2xl font-bold font-mono bg-surface border border-border rounded-lg text-ink">{entry.code.slice(3, 6)}</span>
                </div>

                <div className="flex justify-center">
                  <button onClick={() => copyCode(entry.code, entry.id)} className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-tertiary hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5">
                    {copiedId === entry.id ? (<><Check className="w-3.5 h-3.5 text-success" /><span className="text-success">Tersalin!</span></>) : (<><Copy className="w-3.5 h-3.5" /> Salin kode</>)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* How it works */}
        <div className="border-t border-border pt-8 mb-8">
          <h2 className="text-base font-bold text-ink text-center mb-5">Cara Kerja</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '🔑', title: 'Tempel Key', desc: 'Masukkan Base32 secret key dari setup 2FA' },
              { icon: '⚡', title: 'Generate', desc: 'Kode dibuat lokal di browser via algoritma TOTP' },
              { icon: '📋', title: 'Salin & Pakai', desc: 'Klik kode untuk menyalin ke clipboard' },
            ].map((step, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-surface">
                <div className="text-2xl mb-2">{step.icon}</div>
                <h3 className="font-semibold text-sm text-ink mb-1">{step.title}</h3>
                <p className="text-xs text-ink-tertiary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="border-t border-border pt-8">
          <h2 className="text-base font-bold text-ink text-center mb-4">Pertanyaan Umum</h2>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between py-3.5 text-left text-sm font-medium text-ink hover:text-primary transition-colors">
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 ml-2 text-ink-muted transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-3.5' : 'max-h-0'}`}>
                  <p className="text-sm text-ink-tertiary">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
