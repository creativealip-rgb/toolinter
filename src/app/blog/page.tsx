import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { ArrowRight, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog Toolinter — Tips & Panduan Gratis",
  description:
    "Kumpulan artikel tips, panduan, dan tutorial seputar dokumen, foto, gaji, CV, dan tools online gratis dari Toolinter.",
};

export default function BlogPage() {
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
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition hover:border-primary hover:shadow-md"
            >
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

              <p className="mb-4 flex-1 text-sm leading-relaxed text-ink-tertiary">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <time className="text-xs text-ink-muted" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:underline">
                  Baca
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
