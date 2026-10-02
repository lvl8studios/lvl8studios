"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { COMPANY, NAV_ITEMS } from "@/lib/constants"
import { cn } from "@/lib/utils"

function LocalTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: COMPANY.contact.timeZone,
      }).format(new Date())
    setTime(format())
    const timer = window.setInterval(() => setTime(format()), 15_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <span className="text-muted-foreground">
      {COMPANY.contact.location}
      {time && <span className="text-foreground"> {time}</span>}
    </span>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false)
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-background transition-colors duration-300",
        scrolled ? "border-foreground/15" : "border-transparent",
      )}
    >
      <div className="gutter flex h-14 items-center justify-between gap-6 text-[15px]">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight" onClick={() => setMenuOpen(false)}>
          <Image src="/logo-mark.png" alt="" width={28} height={12} className="h-3 w-7" priority />
          {COMPANY.name}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="underline decoration-transparent transition-[text-decoration-color] duration-200 hover:decoration-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <LocalTime />
        </div>

        <button
          type="button"
          className="-mr-2 px-2 py-1 font-medium md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="gutter fixed inset-x-0 bottom-0 top-14 flex flex-col justify-between bg-background pb-8 pt-6 md:hidden"
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-foreground/15 py-3 text-5xl font-bold tracking-[-0.04em]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <LocalTime />
        </nav>
      )}
    </header>
  )
}
