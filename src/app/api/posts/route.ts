import { NextRequest, NextResponse } from "next/server";
import { readPosts, writePosts, defaultPostDefaults, getStats } from "@/lib/posts-store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  if (searchParams.has("stats")) {
    return NextResponse.json(getStats());
  }

  let posts = readPosts();

  if (status) {
    posts = posts.filter((p) => p.status === status);
  }
  if (category) {
    posts = posts.filter((p) => p.category === category);
  }
  if (q) {
    const lower = q.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.excerpt.toLowerCase().includes(lower) ||
        p.tags.some((t) => t.toLowerCase().includes(lower))
    );
  }

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const posts = readPosts();

  if (!body.slug || !body.title) {
    return NextResponse.json(
      { error: "slug dan title wajib diisi" },
      { status: 400 }
    );
  }

  if (posts.some((p) => p.slug === body.slug)) {
    return NextResponse.json(
      { error: `Slug "${body.slug}" sudah ada` },
      { status: 409 }
    );
  }

  const newPost = {
    slug: body.slug,
    title: body.title,
    excerpt: body.excerpt || "",
    date: body.date || new Date().toISOString().slice(0, 10),
    category: body.category || "Surat",
    readTime: body.readTime || "5 menit",
    ctaLabel: body.ctaLabel || "",
    ctaHref: body.ctaHref || "",
    content: body.content || [],
    status: body.status || defaultPostDefaults.status,
    metaDescription: body.metaDescription || "",
    focusKeyword: body.focusKeyword || "",
    ogImage: body.ogImage || "",
    tags: Array.isArray(body.tags) ? body.tags : [],
    author: body.author || defaultPostDefaults.author,
    featuredImage: body.featuredImage || "",
    views: 0,
  };

  posts.unshift(newPost);
  writePosts(posts);

  return NextResponse.json(newPost, { status: 201 });
}
