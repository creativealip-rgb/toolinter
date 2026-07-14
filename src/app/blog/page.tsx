import type { Metadata } from "next";
import Link from "next/link";
import { readPosts } from "@/lib/posts-store";
import { ArrowRight, Clock, Tag, User } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog Toolinter — Tips & Panduan Gratis",
  description:
    "Kumpulan artikel tips, panduan, dan tutorial seputar dokumen, foto, gaji, CV, dan tools online gratis dari Toolinter.",
};

interface BlogPageProps {
  searchParams: Promise<{ preview?: string; page?: string }>;
}

const PER_PAGE = 10;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { preview, page } = await searchParams;
  const isPreview = preview === "1";
  const allPosts = readPosts();
  const today = new Date().toISOString().split("T")[0];
  const released = allPosts.filter((p) => {
    const isReleased = p.status === "published" || (p.status === "scheduled" && p.date <= today);
    return isPreview ? (p.status === "published" || p.status === "scheduled") : isReleased;
  });

  // Newest first, then paginate 10 per page.
  const sorted = [...released].sort((a, b) => b.date.localeCompare(a.date));
  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const currentPage = Math.min(Math.max(1, parseInt(page || "1", 10) || 1), totalPages);
  const posts = sorted.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const pageHref = (n: number) =>
    `/blog?${new URLSearchParams({ ...(isPreview ? { preview: "1" } : {}), ...(n > 1 ? { page: String(n) } : {}) }).toString()}`.replace(/\?$/, "");

  return (
    <main className="min-h-screen bg-canvas">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">
            Blog Toolinter
          </h1>
          <p className="mt-3 text-lg text-ink-tertiary">
            Tips, panduan, dan tutorial seputar dokumen, foto, gaji, CV, dan
            tools online.
          </p>
        </div>

        {/* Post grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition hover:border-primary hover:shadow-md"
            >
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="mb-2 text-lg font-semibold text-ink group-hover:text-primary">
                {post.title}
              </h2>

              <p className="mb-4 flex-1 text-sm leading-relaxed text-ink-secondary">
                {post.excerpt}
              </p>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] bg-canvas border border-border px-1.5 py-0.5 rounded-full text-ink-muted"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <time className="text-xs text-ink-muted" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <span className="text-xs text-ink-muted flex items-center gap-0.5">
                    <User className="h-3 w-3" />
                    {post.author}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:underline">
                  Baca
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            className="mt-12 flex items-center justify-center gap-1.5"
            aria-label="Navigasi halaman blog"
          >
            {currentPage > 1 && (
              <Link
                href={pageHref(currentPage - 1)}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-3 text-sm text-ink-secondary transition hover:border-primary hover:text-primary"
                rel="prev"
                aria-label="Halaman sebelumnya"
              >
                ←
              </Link>
            )}
            {(() => {
              // Compact window: page 1, last page, and current ± 1, with ellipsis gaps.
              const pages: (number | "...")[] = [];
              const add = (n: number) => {
                if (n >= 1 && n <= totalPages && !pages.includes(n)) pages.push(n);
              };
              add(1);
              if (currentPage - 1 > 2) pages.push("...");
              add(currentPage - 1);
              add(currentPage);
              add(currentPage + 1);
              if (currentPage + 1 < totalPages - 1) pages.push("...");
              add(totalPages);
              return pages.map((p, i) =>
                p === "..." ? (
                  <span
                    key={`e${i}`}
                    className="inline-flex h-9 w-6 items-center justify-center text-sm text-ink-muted"
                  >
                    …
                  </span>
                ) : (
                  <Link
                    key={p}
                    href={pageHref(p)}
                    aria-current={p === currentPage ? "page" : undefined}
                    className={
                      p === currentPage
                        ? "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white"
                        : "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-sm text-ink-secondary transition hover:border-primary hover:text-primary"
                    }
                  >
                    {p}
                  </Link>
                )
              );
            })()}
            {currentPage < totalPages && (
              <Link
                href={pageHref(currentPage + 1)}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-3 text-sm text-ink-secondary transition hover:border-primary hover:text-primary"
                rel="next"
                aria-label="Halaman berikutnya"
              >
                →
              </Link>
            )}
          </nav>
        )}
      </section>
    </main>
  );
}
