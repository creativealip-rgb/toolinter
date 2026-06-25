import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readPosts } from "@/lib/posts-store";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Clock, Calendar, Tag, User } from "lucide-react";
import AiInsightBox from "@/components/ai-insight-box";
import JsonLd from "@/components/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const allPosts = readPosts();
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Blog Toolinter`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.date,
      ...(post.ogImage ? { images: [{ url: post.ogImage }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const allPosts = readPosts();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post || post.status !== "published") notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Toolinter",
      url: "https://toolinter.net",
    },
    ...(post.ogImage ? { image: post.ogImage } : {}),
  };

  return (
    <main className="min-h-screen bg-canvas">
      <JsonLd data={articleSchema} />
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
          <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
            <User className="h-3 w-3" />
            {post.author}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-8 text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {post.title}
        </h1>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="mb-8">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full rounded-xl object-cover max-h-96"
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-8">
          {post.content.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="mb-3 text-xl font-semibold text-ink">
                  {section.heading}
                </h2>
              )}
              {section.image?.url && (
                <figure className="mb-4">
                  <img
                    src={section.image.url}
                    alt={section.image.alt || ""}
                    className="w-full rounded-lg"
                  />
                  {section.image.caption && (
                    <figcaption className="text-xs text-ink-muted text-center mt-1">
                      {section.image.caption}
                    </figcaption>
                  )}
                </figure>
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

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-surface border border-border px-3 py-1 text-xs font-medium text-ink-tertiary hover:border-primary/30 transition"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10">
          <AiInsightBox
            title="AI Ringkasan & Rekomendasi Tool"
            description="Minta AI ringkas artikel ini, kasih checklist tindakan, atau rekomendasi tool Toolinter yang relevan."
            placeholder="Contoh: ringkas artikel ini jadi checklist 5 langkah"
            buttonLabel="Bantu dengan AI"
            context={`Artikel Toolinter:\nJudul: ${post.title}\nKategori: ${post.category}\nRingkasan: ${post.excerpt}\nCTA tool: ${post.ctaHref}\nIsi artikel:\n${post.content.map((section) => `${section.heading || ""}\n${section.paragraphs.join("\n")}`).join("\n\n")}`}
            system="Kamu adalah asisten blog Toolinter. Ringkas artikel, buat checklist, dan rekomendasikan link tool internal yang paling relevan. Jawab singkat, praktis, bahasa Indonesia."
          />
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
            {allPosts
              .filter((p) => p.slug !== slug && p.status === "published")
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
