'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { getBlogLink } from '@/lib/blog-links';

export default function BlogLink({ toolPath }: { toolPath: string }) {
  const blog = getBlogLink(toolPath);
  if (!blog) return null;

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="inline-flex items-center gap-2 text-sm text-ink-tertiary hover:text-primary transition-colors"
    >
      <BookOpen className="w-4 h-4" />
      Baca panduan: {blog.title} →
    </Link>
  );
}
