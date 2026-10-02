"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

export function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="my-7 overflow-hidden rounded-lg border border-border bg-muted">
      <div className="flex h-10 items-center justify-between border-b border-border px-4 text-xs text-muted-foreground">
        <span>{language || "text"}</span>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-1.5 rounded px-1.5 py-1 hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Copy code"
        >
          {copied ? <Check aria-hidden className="h-3.5 w-3.5" /> : <Copy aria-hidden className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-6">
        <code className={language ? `language-${language}` : undefined}>{code}</code>
      </pre>
    </div>
  )
}
