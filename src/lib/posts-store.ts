import * as fs from "fs";
import * as path from "path";
import { blogPosts } from "@/data/blog";

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  image?: { url: string; alt: string; caption?: string };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  ctaLabel: string;
  ctaHref: string;
  content: BlogSection[];
  status: "draft" | "published" | "scheduled";
  metaDescription: string;
  focusKeyword: string;
  ogImage: string;
  tags: string[];
  author: string;
  featuredImage: string;
  views: number;
}

export const defaultPostDefaults = {
  status: "published" as const,
  metaDescription: "",
  focusKeyword: "",
  ogImage: "",
  tags: [] as string[],
  author: "Toolinter",
  featuredImage: "",
  views: 0,
};

export function mergeDefaults(post: Record<string, unknown>): BlogPost {
  return {
    slug: (post.slug as string) || "",
    title: (post.title as string) || "",
    excerpt: (post.excerpt as string) || "",
    date: (post.date as string) || "",
    category: (post.category as string) || "Surat",
    readTime: (post.readTime as string) || "5 menit",
    ctaLabel: (post.ctaLabel as string) || "",
    ctaHref: (post.ctaHref as string) || "",
    content: (post.content as BlogSection[]) || [],
    status: (post.status as "draft" | "published" | "scheduled") || defaultPostDefaults.status,
    metaDescription: (post.metaDescription as string) || (post.excerpt as string) || "",
    focusKeyword: (post.focusKeyword as string) || defaultPostDefaults.focusKeyword,
    ogImage: (post.ogImage as string) || defaultPostDefaults.ogImage,
    tags: Array.isArray(post.tags) ? (post.tags as string[]) : defaultPostDefaults.tags,
    author: (post.author as string) || defaultPostDefaults.author,
    featuredImage: (post.featuredImage as string) || defaultPostDefaults.featuredImage,
    views: typeof post.views === "number" ? (post.views as number) : defaultPostDefaults.views,
  };
}

const DATA_DIR = path.join(process.cwd(), "data");
const POSTS_FILE = path.join(DATA_DIR, "posts.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function seedPosts(): BlogPost[] {
  ensureDataDir();
  const posts = (blogPosts as unknown as Record<string, unknown>[]).map(mergeDefaults);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
  return posts;
}

export function readPosts(): BlogPost[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(POSTS_FILE)) {
      return seedPosts();
    }
    const raw = JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8")) as Record<string, unknown>[];
    return raw.map(mergeDefaults);
  } catch {
    return (blogPosts as unknown as Record<string, unknown>[]).map(mergeDefaults);
  }
}

export function writePosts(posts: BlogPost[]) {
  ensureDataDir();
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

export function findPost(slug: string): BlogPost | undefined {
  return readPosts().find((p) => p.slug === slug);
}

export function getStats() {
  const posts = readPosts();
  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;
  const scheduled = posts.filter((p) => p.status === "scheduled").length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
  const byCategory: Record<string, number> = {};
  posts.forEach((p) => {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  });
  return { totalPosts: posts.length, published, drafts, scheduled, byCategory, totalViews };
}
