"use client"

import { NavbarDemo } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { CoconutSplitSection } from "@/components/sections/coconutsplit-section"
import { CoconutSplitStatsSection } from "@/components/sections/coconutsplit-stats-section"
import { GyatWordSection } from "@/components/sections/gyatword-section"
import { TechSection } from "@/components/sections/tech-section"
import { TeamSection } from "@/components/sections/team-section"
import { ContactSection } from "@/components/sections/contact-section"
import { FooterSection } from "@/components/sections/footer-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavbarDemo />
        <HeroSection />
        <CoconutSplitSection />
        <CoconutSplitStatsSection />
        <GyatWordSection />
        <TechSection />
        <TeamSection />
        <ContactSection />
        <FooterSection />
      </div>
  );
}
