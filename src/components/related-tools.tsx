import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { getRelatedTools } from "@/lib/related-tools";

/**
 * Server component — renders internal links to related tools.
 * Links are in the SSR HTML so Google crawls them (topical authority + pageviews/session).
 */
export default function RelatedTools({ toolPath }: { toolPath: string }) {
  const related = getRelatedTools(toolPath);
  if (!related.length) return null;

  return (
    <section aria-labelledby="related-tools-heading" className="mt-10 border-t border-border pt-6">
      <h2
        id="related-tools-heading"
        className="flex items-center gap-2 text-sm font-semibold text-ink-secondary mb-4"
      >
        <Wrench className="w-4 h-4" />
        Tool Lain yang Mungkin Kamu Butuhkan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {related.map((t) => (
          <Link
            key={t.path}
            href={t.path}
            className="group flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-ink-secondary transition-colors hover:border-primary hover:text-primary"
          >
            <span>{t.title}</span>
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
