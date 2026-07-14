import { getToolFaq } from "@/lib/tool-faq";

/**
 * Server component — renders visible FAQ (accordion) + FAQPage JSON-LD.
 * Google requires the FAQ to be visible on-page for the rich result to be eligible.
 */
export default function ToolFaq({ toolPath }: { toolPath: string }) {
  const faqs = getToolFaq(toolPath);
  if (!faqs.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="mt-10 border-t border-border pt-6">
      <h2 id="faq-heading" className="mb-4 text-lg font-semibold text-ink">
        Pertanyaan yang Sering Ditanyakan
      </h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details
            key={i}
            className="group rounded-lg border border-border px-4 py-3 [&_summary]:list-none"
          >
            <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-ink-secondary">
              {f.q}
              <span className="ml-2 text-ink-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-ink-tertiary">{f.a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
