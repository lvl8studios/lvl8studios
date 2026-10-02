"use client"

import Image from "next/image"
import { ArrowDownRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { PROJECTS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function WorkIndex() {
  const [active, setActive] = useState<string | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })

  // The preview trails the cursor with a little lag, like a print being slid across a table
  useEffect(() => {
    const preview = previewRef.current
    if (!preview || !window.matchMedia("(pointer: fine)").matches) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const current = { ...target.current }
    let frame = 0

    const tick = () => {
      const ease = reduceMotion ? 1 : 0.16
      current.x += (target.current.x - current.x) * ease
      current.y += (target.current.y - current.y) * ease
      preview.style.transform = `translate3d(${current.x + 28}px, ${current.y - 150}px, 0)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section id="work" className="gutter pt-24 md:pt-36" aria-labelledby="work-heading">
      <div className="studio-grid items-baseline pb-3 text-[15px]">
        <h2 id="work-heading" className="col-span-12 font-semibold md:col-span-6">
          Selected work <span className="tabular font-normal text-muted-foreground">({PROJECTS.length})</span>
        </h2>
        <span aria-hidden className="hidden text-muted-foreground md:col-span-2 md:block">What it is</span>
        <span aria-hidden className="hidden text-muted-foreground md:col-span-3 md:block">Proof</span>
      </div>

      <ul
        onPointerMove={(event) => {
          target.current = { x: event.clientX, y: event.clientY }
        }}
        onPointerLeave={() => setActive(null)}
      >
        {PROJECTS.map((project) => (
          <li
            key={project.id}
            className={cn(
              "border-t border-foreground transition-opacity duration-300 last:border-b",
              active && active !== project.id && "md:opacity-30",
            )}
          >
            <a
              href={`#${project.id}`}
              className="studio-grid group items-baseline gap-y-3 py-5 md:py-7"
              onPointerEnter={() => setActive(project.id)}
              onFocus={() => setActive(project.id)}
              onBlur={() => setActive(null)}
            >
              <span className="col-span-12 text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.04em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:col-span-6">
                {project.title}
              </span>
              <span className="col-span-6 text-[15px] leading-snug md:col-span-2">{project.kind}</span>
              <span className="col-span-6 text-[15px] font-semibold leading-snug md:col-span-3">{project.outcome}</span>
              <span className="hidden justify-self-end md:col-span-1 md:block">
                <ArrowDownRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="h-8 w-8 -translate-x-2 text-primary opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[15rem] w-[21rem] md:block"
      >
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className={cn(
              "absolute inset-0 overflow-hidden shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] transition-[clip-path,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              active === project.id ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "opacity-0 [clip-path:inset(100%_0_0_0)]",
            )}
            style={{ backgroundColor: project.previewBackground }}
          >
            <Image
              src={project.preview}
              alt=""
              fill
              sizes="336px"
              className={
                project.id === "gyatword" ? "object-cover object-left-top" : project.id === "gyatsound" ? "object-contain p-12" : "object-contain p-5"
              }
            />
          </div>
        ))}
      </div>
    </section>
  )
}
