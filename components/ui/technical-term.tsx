"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface TechnicalTermProps {
  children: string
  definition: string
}

interface Position {
  left: number
  top: number
}

const TOOLTIP_WIDTH = 288
const VIEWPORT_GUTTER = 12
const TOOLTIP_GAP = 8

export function TechnicalTerm({ children, definition }: TechnicalTermProps) {
  const descriptionId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<Position | null>(null)

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    const rect = trigger.getBoundingClientRect()
    const width = Math.min(TOOLTIP_WIDTH, window.innerWidth - VIEWPORT_GUTTER * 2)
    const left = Math.min(
      Math.max(rect.left + rect.width / 2 - width / 2, VIEWPORT_GUTTER),
      window.innerWidth - width - VIEWPORT_GUTTER,
    )
    const estimatedHeight = 88
    const top = rect.top > estimatedHeight + TOOLTIP_GAP
      ? rect.top - estimatedHeight - TOOLTIP_GAP
      : rect.bottom + TOOLTIP_GAP

    setPosition({ left, top })
  }, [])

  const show = useCallback(() => {
    updatePosition()
    setOpen(true)
  }, [updatePosition])

  useEffect(() => {
    if (!open) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const reposition = () => updatePosition()

    window.addEventListener("keydown", closeOnEscape)
    window.addEventListener("resize", reposition)
    window.addEventListener("scroll", reposition, true)
    return () => {
      window.removeEventListener("keydown", closeOnEscape)
      window.removeEventListener("resize", reposition)
      window.removeEventListener("scroll", reposition, true)
    }
  }, [open, updatePosition])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-describedby={open ? descriptionId : undefined}
        aria-expanded={open}
        className="inline cursor-help rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onPointerEnter={(event) => event.pointerType === "mouse" && show()}
        onPointerLeave={(event) => event.pointerType === "mouse" && setOpen(false)}
        onFocus={show}
        onBlur={() => setOpen(false)}
        onClick={show}
      >
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm underline decoration-dotted underline-offset-4">
          {children}
        </code>
      </button>
      {open && position && createPortal(
        <span
          id={descriptionId}
          role="tooltip"
          className="pointer-events-none fixed z-[100] w-[min(18rem,calc(100vw-1.5rem))] rounded-lg border border-border bg-popover px-3.5 py-3 text-left text-sm leading-5 text-popover-foreground shadow-[0_4px_12px_rgba(0,0,0,0.18)] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-150"
          style={{ left: position.left, top: position.top }}
        >
          {definition}
        </span>,
        document.body,
      )}
    </>
  )
}
