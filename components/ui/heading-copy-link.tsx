"use client"

import { useState } from "react"
import { Check, Link as LinkIcon } from "lucide-react"

export function HeadingCopyLink({ id, label }: { id: string; label: string }) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    const url = new URL(window.location.href)
    url.hash = id
    history.replaceState(null, "", url)
    await navigator.clipboard.writeText(url.toString())
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      aria-label={`Copy link to ${label}`}
      title={copied ? "Copied" : "Copy link"}
      className="ml-2 inline-flex align-middle text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none group-hover/heading:opacity-100"
    >
      {copied ? <Check aria-hidden className="h-[0.8em] w-[0.8em]" /> : <LinkIcon aria-hidden className="h-[0.8em] w-[0.8em]" />}
    </button>
  )
}
