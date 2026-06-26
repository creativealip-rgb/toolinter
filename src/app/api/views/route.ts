import { NextRequest, NextResponse } from "next/server";
import { readPosts, writePosts } from "@/lib/posts-store";

export async function POST(request: NextRequest) {
  const { slug } = await request.json();
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }
  const posts = readPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  posts[index].views = (posts[index].views || 0) + 1;
  writePosts(posts);
  return NextResponse.json({ views: posts[index].views });
}
