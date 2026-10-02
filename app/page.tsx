import { SiteHeader } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { WorkIndex } from "@/components/sections/work-index"
import { ProjectsSection } from "@/components/sections/projects-section"
import { TeamSection } from "@/components/sections/team-section"
import { TechSection } from "@/components/sections/tech-section"
import { WritingSection } from "@/components/sections/writing-section"
import { ContactSection } from "@/components/sections/contact-section"
import { getBlogPosts } from "@/lib/blog"

export default async function Home() {
  const posts = await getBlogPosts()

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <WorkIndex />
        <ProjectsSection />
        <TeamSection />
        <TechSection />
        <WritingSection posts={posts} />
        <ContactSection />
      </main>
    </>
  )
}
