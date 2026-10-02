"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ExternalLink } from "lucide-react"
import type { LinkPreviewMetadata } from "@/types/link-preview"

interface LinkPreviewProps {
  children: React.ReactNode
  preview: LinkPreviewMetadata
}

interface Position {
  left: number
  top: number
}

const CARD_WIDTH = 336
const VIEWPORT_GUTTER = 12
const CARD_GAP = 10

export function LinkPreview({ children, preview }: LinkPreviewProps) {
  const descriptionId = useId()
  const linkRef = useRef<HTMLAnchorElement>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<Position | null>(null)

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const updatePosition = useCallback(() => {
    const link = linkRef.current
    if (!link) return

    const rect = link.getBoundingClientRect()
    const width = Math.min(CARD_WIDTH, window.innerWidth - VIEWPORT_GUTTER * 2)
    const left = Math.min(
      Math.max(rect.left + rect.width / 2 - width / 2, VIEWPORT_GUTTER),
      window.innerWidth - width - VIEWPORT_GUTTER,
    )
    const estimatedHeight = preview.image ? 286 : 168
    const top = rect.top > estimatedHeight + CARD_GAP
      ? rect.top - estimatedHeight - CARD_GAP
      : rect.bottom + CARD_GAP

    setPosition({ left, top })
  }, [preview.image])

  const show = useCallback((immediate = false) => {
    clearTimers()
    openTimer.current = setTimeout(() => {
      updatePosition()
      setOpen(true)
    }, immediate ? 0 : 180)
  }, [clearTimers, updatePosition])

  const hide = useCallback(() => {
    clearTimers()
    closeTimer.current = setTimeout(() => setOpen(false), 100)
  }, [clearTimers])

  useEffect(() => {
    if (!open) return
    const reposition = () => updatePosition()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("resize", reposition)
    window.addEventListener("scroll", reposition, true)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("resize", reposition)
      window.removeEventListener("scroll", reposition, true)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open, updatePosition])

  useEffect(() => clearTimers, [clearTimers])

  return (
    <>
      <a
        ref={linkRef}
        href={preview.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={open ? descriptionId : undefined}
        className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onPointerEnter={(event) => event.pointerType === "mouse" && show()}
        onPointerLeave={hide}
        onFocus={() => show(true)}
        onBlur={hide}
      >
        {children}
      </a>
      {open && position && createPortal(
        <aside
          id={descriptionId}
          role="tooltip"
          className="pointer-events-none fixed z-[100] w-[min(21rem,calc(100vw-1.5rem))] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-[0_4px_8px_rgba(0,0,0,0.16)] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-150"
          style={{ left: position.left, top: position.top }}
        >
          {preview.image && (
            <img
              src={preview.image}
              alt=""
              width={672}
              height={320}
              className="h-36 w-full border-b border-border object-cover"
            />
          )}
          <div className="p-4">
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="truncate">{preview.siteName}</span>
              <ExternalLink aria-hidden className="h-3.5 w-3.5 shrink-0" />
            </div>
            <p className="line-clamp-2 text-sm font-semibold leading-5 text-foreground">{preview.title}</p>
            {preview.description && (
              <p className="mt-1.5 line-clamp-3 text-sm leading-5 text-muted-foreground">{preview.description}</p>
            )}
          </div>
        </aside>,
        document.body,
      )}
    </>
  )
}
