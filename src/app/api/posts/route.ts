import { NextRequest, NextResponse } from "next/server";
import { readPosts, writePosts } from "@/lib/posts-store";

export async function GET() {
  const posts = readPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const posts = readPosts();

  // Validate required fields
  if (!body.slug || !body.title) {
    return NextResponse.json(
      { error: "slug dan title wajib diisi" },
      { status: 400 }
    );
  }

  // Check duplicate slug
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
  };

  posts.unshift(newPost);
  writePosts(posts);

  return NextResponse.json(newPost, { status: 201 });
}
