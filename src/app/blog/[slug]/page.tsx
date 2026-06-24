import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, getAllSlugs } from "@/data/blog";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Blog Toolinter`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-canvas">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Blog
        </Link>

        {/* Meta */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            <Tag className="h-3 w-3" />
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
            <Calendar className="h-3 w-3" />
            {new Date(post.date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-8 text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {post.title}
        </h1>

        {/* Content */}
        <div className="space-y-8">
          {post.content.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="mb-3 text-xl font-semibold text-ink">
                  {section.heading}
                </h2>
              )}
              <div className="space-y-4">
                {section.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="whitespace-pre-wrap leading-relaxed text-ink-tertiary"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-xl border border-border bg-surface p-6 text-center">
          <p className="mb-4 text-lg font-medium text-ink">
            {post.ctaLabel}
          </p>
          <Link
            href={post.ctaHref}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Coba Sekarang — Gratis
          </Link>
        </div>

        {/* Related posts */}
        <div className="mt-12 border-t border-border pt-8">
          <h3 className="mb-4 text-lg font-semibold text-ink">
            Artikel Lainnya
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {blogPosts
              .filter((p) => p.slug !== slug)
              .slice(0, 2)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group rounded-lg border border-border bg-surface p-4 transition hover:border-primary"
                >
                  <span className="text-xs text-primary">{related.category}</span>
                  <p className="mt-1 text-sm font-medium text-ink group-hover:text-primary">
                    {related.title}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </main>
  );
}
