"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

interface AiInsightBoxProps {
  title: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
  context: string;
  system: string;
  disabled?: boolean;
}

export default function AiInsightBox({
  title,
  description,
  placeholder,
  buttonLabel,
  context,
  system,
  disabled = false,
}: AiInsightBoxProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAi() {
    if (loading || disabled) return;
    setLoading(true);
    setAnswer("");

    const prompt = `${context}\n\nPertanyaan/kebutuhan user: ${question || "Beri analisis dan saran praktis."}\n\nJawab ringkas, terstruktur, pakai bahasa Indonesia. Beri angka penting dan langkah praktis. Jangan mengaku sebagai konsultan resmi.`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, system }),
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
            if (content) {
              result += content;
              setAnswer(result);
            }
          } catch {}
        }
      }
    } catch {
      setAnswer("AI belum bisa dipakai sekarang. Coba lagi sebentar lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-primary/20 bg-primary-tint p-5">
      <div className="mb-3 flex items-center gap-2 text-primary">
        <Sparkles className="h-5 w-5" />
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      <p className="mb-4 text-sm text-ink-tertiary">{description}</p>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={3}
        placeholder={placeholder}
        className="mb-3 w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
      />
      <button
        type="button"
        onClick={askAi}
        disabled={disabled || loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {loading ? "AI menganalisis..." : buttonLabel}
      </button>
      {answer && (
        <div className="mt-4 max-h-[360px] overflow-y-auto whitespace-pre-wrap rounded-lg border border-border bg-white p-4 text-sm leading-relaxed text-ink">
          {answer}
        </div>
      )}
    </div>
  );
}
