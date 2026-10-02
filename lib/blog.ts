import { promises as fs } from "node:fs"
import path from "node:path"
import type { BlogPost } from "@/types/blog"

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog")
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

type Frontmatter = Record<string, string>

function parseFrontmatter(source: string, filename: string): { metadata: Frontmatter; content: string } {
  const normalized = source.replace(/\r\n/g, "\n")

  if (!normalized.startsWith("---\n")) {
    throw new Error(`${filename} must start with a frontmatter block`)
  }

  const end = normalized.indexOf("\n---\n", 4)
  if (end === -1) {
    throw new Error(`${filename} has an unterminated frontmatter block`)
  }

  const metadata = Object.fromEntries(
    normalized
      .slice(4, end)
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        const separator = line.indexOf(":")
        if (separator === -1) {
          throw new Error(`${filename} has invalid frontmatter: ${line}`)
        }

        const key = line.slice(0, separator).trim()
        const rawValue = line.slice(separator + 1).trim()
        const value = rawValue.startsWith('"') ? JSON.parse(rawValue) : rawValue
        return [key, String(value)]
      }),
  )

  return {
    metadata,
    content: normalized.slice(end + 5).trim(),
  }
}

function required(metadata: Frontmatter, key: string, filename: string): string {
  const value = metadata[key]?.trim()
  if (!value) {
    throw new Error(`${filename} is missing the required "${key}" field`)
  }
  return value
}

function parseTags(value: string, filename: string): string[] {
  try {
    const tags = JSON.parse(value)
    if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string")) {
      throw new Error()
    }
    return tags
  } catch {
    throw new Error(`${filename} must define tags as a JSON array, for example ["News", "Product"]`)
  }
}

function estimateReadTime(content: string): string {
  const wordCount = content.match(/[\p{L}\p{N}]+/gu)?.length ?? 0
  const minutes = Math.max(1, Math.ceil(wordCount / 200))
  return `${minutes} min read`
}

async function readPostFile(filename: string): Promise<BlogPost> {
  const slug = filename.replace(/\.md$/, "")
  const source = await fs.readFile(path.join(BLOG_DIRECTORY, filename), "utf8")
  const { metadata, content } = parseFrontmatter(source, filename)
  const publishedAt = required(metadata, "date", filename)

  if (Number.isNaN(Date.parse(publishedAt))) {
    throw new Error(`${filename} has an invalid date: ${publishedAt}`)
  }

  return {
    id: slug,
    title: required(metadata, "title", filename),
    excerpt: required(metadata, "excerpt", filename),
    content,
    author: required(metadata, "author", filename),
    publishedAt,
    readTime: estimateReadTime(content),
    tags: parseTags(required(metadata, "tags", filename), filename),
    image: required(metadata, "image", filename),
    published: metadata.published !== "false",
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const entries = await fs.readdir(BLOG_DIRECTORY, { withFileTypes: true })
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => readPostFile(entry.name)),
  )

  return posts
    .filter((post) => post.published)
    .sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt))
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!SLUG_PATTERN.test(slug)) return null

  try {
    const post = await readPostFile(`${slug}.md`)
    return post.published ? post : null
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null
    throw error
  }
}
