import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

import { notFound } from 'next/navigation';

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  // Only return base .mdx files (exclude locale-suffixed variants like *.am.mdx)
  return fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === ".mdx" && !/\.[a-z]{2}\.mdx$/i.test(file));
}

function readMDXFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
        notFound();
    }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}

// Resolve a localized MDX file path given a base slug and optional locale.
function getLocalizedFilePath(dir: string, slug: string, locale?: string) {
  // Try locale-specific file first (e.g., slug.am.mdx) when locale is provided and not English
  if (locale && locale.toLowerCase() !== "en") {
    const localized = path.join(dir, `${slug}.${locale}.mdx`);
    if (fs.existsSync(localized)) return localized;
  }
  // Fallback to base file (slug.mdx)
  const base = path.join(dir, `${slug}.mdx`);
  if (fs.existsSync(base)) return base;

  // Nothing found -> 404
  notFound();
}

// Get a single post by slug, resolving a locale-specific MDX file when available.
export function getPostBySlug(customPath: string[], slug: string, locale?: string) {
  const postsDir = path.join(process.cwd(), ...customPath);
  const filePath = getLocalizedFilePath(postsDir, slug, locale);
  const { metadata, content } = readMDXFile(filePath);
  return { metadata, slug, content };
}
