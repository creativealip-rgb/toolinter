"use client";

import { useState } from "react";
import { Bot, Send, X, Loader2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "Bantu pilih tool untuk bikin surat resign",
  "Hitung gaji bersih 8 juta",
  "Bikin CV ATS untuk fresh graduate",
];

function routeHint(answer: string) {
  const lower = answer.toLowerCase();
  if (lower.includes("surat")) return "/surat";
  if (lower.includes("cv")) return "/cv/ats";
  if (lower.includes("gaji") || lower.includes("bpjs") || lower.includes("pph")) return "/gaji/bersih";
  if (lower.includes("foto")) return "/foto";
  if (lower.includes("pdf")) return "/pdf";
  return "/tools";
}

export default function AiChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Halo! Saya AI Toolinter. Mau bikin surat, CV, hitung gaji, resize foto, atau cari tool lain?",
    },
  ]);

  const ask = async (text = input) => {
    const q = text.trim();
    if (!q || loading) return;

    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: q }, { role: "assistant", content: "" }]);

    const prompt = `User bertanya di website Toolinter: ${q}\n\nTugas:\n- Jawab singkat dalam bahasa Indonesia.\n- Arahkan user ke tool relevan: /surat, /cv/ats, /gaji/bersih, /foto, /pdf, /umkm, atau /tools.\n- Kalau perlu hitung sederhana, hitung langsung.\n- Jangan beri nasihat hukum/pajak final; sarankan cek aturan resmi bila sensitif.`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          system: "Kamu adalah asisten navigasi website Toolinter. Jawab ringkas, praktis, dan arahkan user ke tool yang tepat.",
        }),
      });
      if (!res.ok || !res.body) throw new Error("AI failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
          try {
            const { content } = JSON.parse(line.slice(6));
            if (!content) continue;
            result += content;
            setMessages((prev) => {
              const next = [...prev];
              next[next.length - 1] = { role: "assistant", content: result };
              return next;
            });
          } catch {}
        }
      }

      if (!result.trim()) throw new Error("Empty AI response");
    } catch {
      const fallback = `Saya belum bisa jawab sekarang. Coba mulai dari ${routeHint(q)} sesuai kebutuhan Anda.`;
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", content: fallback };
        return next;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-3 flex h-[520px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-canvas shadow-2xl">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              <div>
                <p className="text-sm font-semibold">AI Toolinter</p>
                <p className="text-xs text-white/80">Cari tool, bikin draft, hitung cepat</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Tutup chat">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-surface p-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-primary text-white" : "bg-white text-ink"}`}>
                  {m.content || <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-canvas p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((q) => (
                <button key={q} type="button" onClick={() => ask(q)} className="rounded-full border border-border px-2 py-1 text-xs text-ink-tertiary hover:border-primary hover:text-primary">
                  {q}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ask()}
                placeholder="Tanya kebutuhan Anda..."
                className="min-w-0 flex-1 rounded-xl border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <button type="button" onClick={() => ask()} disabled={loading || !input.trim()} className="rounded-xl bg-primary px-3 text-white disabled:opacity-50" aria-label="Kirim">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl transition hover:brightness-110"
        aria-label="Buka AI Toolinter"
      >
        <Bot size={26} />
      </button>
    </div>
  );
}
