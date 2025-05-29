"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { TeamSection } from "@/components/sections/team-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ContactSection } from "@/components/sections/contact-section"
import { FooterSection } from "@/components/sections/footer-section"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <HeroSection />
        <AboutSection />
        <TeamSection />
        <ProjectsSection />
        <ContactSection />
        <FooterSection />
      </div>
    </>
  );
}
