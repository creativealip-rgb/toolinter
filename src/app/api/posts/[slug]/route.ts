import { NextRequest, NextResponse } from "next/server";
import { findPost, readPosts, writePosts } from "@/lib/posts-store";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) {
    return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const posts = readPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
  }

  const body = await request.json();

  // If slug changed, check for conflict
  if (body.slug && body.slug !== slug && posts.some((p) => p.slug === body.slug)) {
    return NextResponse.json(
      { error: `Slug "${body.slug}" sudah ada` },
      { status: 409 }
    );
  }

  posts[index] = { ...posts[index], ...body };
  writePosts(posts);

  return NextResponse.json(posts[index]);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const posts = readPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
  }

  const body = await request.json();
  posts[index] = { ...posts[index], ...body };
  writePosts(posts);

  return NextResponse.json(posts[index]);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const posts = readPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
  }

  const deleted = posts.splice(index, 1)[0];
  writePosts(posts);

  return NextResponse.json(deleted);
}
