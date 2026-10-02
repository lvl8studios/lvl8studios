import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { BlogPost } from "@/types/blog"

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(date))
}

export function PostList({ posts }: { posts: Pick<BlogPost, "id" | "title" | "publishedAt" | "readTime">[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="border-b border-foreground/20 first:border-t first:border-t-foreground">
          <Link href={`/blog/${post.id}`} className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-1 py-4">
            <time dateTime={post.publishedAt} className="tabular col-span-12 text-[15px] text-muted-foreground sm:col-span-3">
              {formatPostDate(post.publishedAt)}
            </time>
            <span className="col-span-11 text-xl font-semibold leading-snug tracking-[-0.02em] underline decoration-transparent transition-[text-decoration-color] duration-200 group-hover:decoration-foreground sm:col-span-7">
              {post.title}
            </span>
            <span className="tabular col-span-1 hidden text-right text-[15px] text-muted-foreground sm:col-span-2 sm:block">
              {post.readTime}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function WritingSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <section id="writing" aria-labelledby="writing-heading" className="gutter pt-24 md:pt-36">
      <div className="studio-grid gap-y-8 border-t border-foreground pt-5">
        <div className="col-span-12 md:col-span-4">
          <h2 id="writing-heading" className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.92] tracking-[-0.04em]">
            Writing
          </h2>
          <Link
            href="/blog"
            className="group mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary"
          >
            <span className="underline decoration-primary/40 group-hover:decoration-primary">All posts</span>
            <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6 [&_ul>li:first-child]:border-t-0">
          <PostList posts={posts.slice(0, 4)} />
        </div>
      </div>
    </section>
  )
}
