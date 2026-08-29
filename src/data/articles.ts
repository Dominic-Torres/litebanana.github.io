// ---------------------------------------------------------------------------
// BLOG / ARTICLES DATA — add your articles here
// ---------------------------------------------------------------------------

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export const ARTICLES: Article[] = [
  {
    id: "article-1",
    title: "Building a Roguelite in Vanilla JavaScript",
    excerpt:
      "How I built VOID//RUN — a complete dungeon roguelite with zero dependencies, featuring procedural generation, data-driven enemies, and a multi-phase boss fight.",
    date: "2026-08-15",
    readTime: "8 min",
    tags: ["JavaScript", "Game Dev"],
    slug: "building-roguelite-vanilla-js",
  },
  {
    id: "article-2",
    title: "Lessons from My First QA Internship",
    excerpt:
      "What I learned testing a real veterinary management platform — from writing test cases to working with developers to ship fixes.",
    date: "2026-07-20",
    readTime: "5 min",
    tags: ["QA", "Internship"],
    slug: "qa-internship-lessons",
  },
  {
    id: "article-3",
    title: "Why I Built a Taglish SMS Spam Filter",
    excerpt:
      "Most spam filters miss Filipino-English messages. Here's how I trained a Random Forest model on a localized dataset and packaged it as an Android app.",
    date: "2026-06-10",
    readTime: "6 min",
    tags: ["AI/ML", "Android"],
    slug: "taglish-spam-filter",
  },
];
