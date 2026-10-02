"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const article = document.querySelector<HTMLElement>("[data-blog-article]")
        if (!article) return
        const rect = article.getBoundingClientRect()
        const start = window.scrollY + rect.top - window.innerHeight * 0.2
        const distance = Math.max(article.offsetHeight - window.innerHeight * 0.6, 1)
        setProgress(Math.min(1, Math.max(0, (window.scrollY - start) / distance)))
      })
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[101] h-0.5 bg-transparent" aria-hidden>
      <div className="h-full origin-left bg-primary" style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}
