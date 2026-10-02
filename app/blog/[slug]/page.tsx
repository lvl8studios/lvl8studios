import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { SiteHeader } from "@/components/navbar"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"
import { ReadingProgress } from "@/components/ui/reading-progress"
import { getBlogPost, getBlogPosts } from "@/lib/blog"
import { extractMarkdownHeadings } from "@/lib/markdown"
import linkPreviewData from "@/content/link-previews.json"
import type { LinkPreviewMap } from "@/types/link-preview"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.id }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  return post ? { title: `${post.title} | lvl8studios`, description: post.excerpt } : {}
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const [post, posts] = await Promise.all([getBlogPost(slug), getBlogPosts()])
  if (!post) notFound()
  const headings = extractMarkdownHeadings(post.content).filter((heading) => heading.depth === 2 || heading.depth === 3)
  const postIndex = posts.findIndex((candidate) => candidate.id === post.id)
  const newerPost = postIndex > 0 ? posts[postIndex - 1] : null
  const olderPost = postIndex >= 0 && postIndex < posts.length - 1 ? posts[postIndex + 1] : null
  const linkPreviews = linkPreviewData as LinkPreviewMap

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <SiteHeader />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                className="object-cover"
              />
            </div>

            <header className="mb-8">
              <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{post.title}</h1>
              <div className="mb-6 flex flex-wrap items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2"><User className="h-4 w-4" />{post.author}</span>
                <time dateTime={post.publishedAt} className="flex items-center gap-2"><Calendar className="h-4 w-4" />{post.publishedAt}</time>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{post.readTime}</span>
              </div>
              <div className="mb-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{tag}</span>
                ))}
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
            </header>

            {headings.length >= 3 && (
              <nav aria-label="Table of contents" className="mb-10 border-y border-border py-5">
                <p className="mb-3 text-sm font-semibold text-foreground">On this page</p>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {headings.map((heading) => (
                    <li key={heading.id} className={heading.depth === 3 ? "pl-4" : undefined}>
                      <a href={`#${heading.id}`} className="hover:text-primary focus-visible:outline-none focus-visible:text-primary">
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <article data-blog-article className="text-foreground">
              <MarkdownRenderer content={post.content} linkPreviews={linkPreviews} skipFirstH1 />
            </article>

            <div className="mt-16 border-t border-border pt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                <ArrowLeft className="h-4 w-4" />
                All posts
              </Link>

              {(newerPost || olderPost) && (
                <nav aria-label="More blog posts" className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
                  {newerPost ? (
                    <Link href={`/blog/${newerPost.id}`} className="bg-card p-5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
                      <span className="text-xs text-muted-foreground">Newer post</span>
                      <span className="mt-1 block font-semibold leading-6 text-foreground">{newerPost.title}</span>
                    </Link>
                  ) : <span className="hidden bg-card sm:block" />}
                  {olderPost ? (
                    <Link href={`/blog/${olderPost.id}`} className="bg-card p-5 text-right transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
                      <span className="text-xs text-muted-foreground">Older post</span>
                      <span className="mt-1 block font-semibold leading-6 text-foreground">{olderPost.title}</span>
                    </Link>
                  ) : <span className="hidden bg-card sm:block" />}
                </nav>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
