import type { Metadata } from "next"
import { SiteHeader } from "@/components/navbar"
import { ContactSection } from "@/components/sections/contact-section"
import { PostList } from "@/components/sections/writing-section"
import { getBlogPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Writing | lvl8studios",
  description: "Notes from the lvl8studios team on building CoconutSplit, hackathons and the tools we use.",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <SiteHeader />
      <main className="gutter pt-28 md:pt-36">
        <div className="studio-grid gap-y-10">
          <header className="col-span-12 md:col-span-4">
            <h1 className="text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.04em]">Writing</h1>
            <p className="mt-5 max-w-[30ch] text-lg leading-snug text-muted-foreground">
              Notes from the team on what we build and how we build it.
            </p>
          </header>
          <div className="col-span-12 md:col-span-8 md:col-start-5 md:pt-3">
            {posts.length === 0 ? (
              <p className="border-t border-foreground py-6 text-lg text-muted-foreground">No posts yet.</p>
            ) : (
              <PostList posts={posts} />
            )}
          </div>
        </div>
      </main>
      <ContactSection />
    </>
  )
}
