import * as fs from "fs";
import * as path from "path";
import { blogPosts } from "@/data/blog";

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
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
  fs.writeFileSync(POSTS_FILE, JSON.stringify(blogPosts, null, 2));
  return blogPosts as unknown as BlogPost[];
}

export function readPosts(): BlogPost[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(POSTS_FILE)) {
      return seedPosts();
    }
    return JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8")) as BlogPost[];
  } catch {
    return blogPosts as unknown as BlogPost[];
  }
}

export function writePosts(posts: BlogPost[]) {
  ensureDataDir();
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

export function findPost(slug: string): BlogPost | undefined {
  return readPosts().find((p) => p.slug === slug);
}
