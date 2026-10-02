import type { ReactNode } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { HeadingCopyLink } from "@/components/ui/heading-copy-link"
import { LinkPreview } from "@/components/ui/link-preview"
import { TechnicalTerm } from "@/components/ui/technical-term"
import { extractMarkdownHeadings } from "@/lib/markdown"
import type { LinkPreviewMap } from "@/types/link-preview"

interface MarkdownProps {
  content: string
  linkPreviews?: LinkPreviewMap
  skipFirstH1?: boolean
}

const INLINE_MARKDOWN = /(`[^`]+`\{[^{}]+\}|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g

interface MarkdownImage {
  alt: string
  src: string
  caption?: string
}

function safeHref(href: string): string {
  return /^(https?:\/\/|mailto:|\/|#)/.test(href) ? href : "#"
}

function parseMarkdownImage(line: string): MarkdownImage | null {
  const match = line.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]+)")?\)$/)
  if (!match || !/^(https?:\/\/|\/)/.test(match[2])) return null
  return { alt: match[1], src: match[2], caption: match[3] }
}

function renderInline(text: string, linkPreviews: LinkPreviewMap): ReactNode[] {
  return text.split(INLINE_MARKDOWN).filter(Boolean).map((part, index) => {
    const technicalTerm = part.match(/^`([^`]+)`\{([^{}]+)\}$/)
    if (technicalTerm) {
      return (
        <TechnicalTerm key={index} definition={technicalTerm[2]}>
          {technicalTerm[1]}
        </TechnicalTerm>
      )
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index} className="rounded bg-muted px-1.5 py-0.5 text-sm">{part.slice(1, -1)}</code>
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-semibold text-foreground">{renderInline(part.slice(2, -2), linkPreviews)}</strong>
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{renderInline(part.slice(1, -1), linkPreviews)}</em>
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const href = safeHref(link[2])
      const external = href.startsWith("http")
      const preview = linkPreviews[href]
      if (external && preview) {
        return <LinkPreview key={index} preview={preview}>{link[1]}</LinkPreview>
      }
      return (
        <a
          key={index}
          href={href}
          className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {link[1]}
        </a>
      )
    }

    return part
  })
}

function isBlockStart(line: string): boolean {
  return /^(#{1,6})\s|^```|^!\[|^>\s?|^[-*+]\s|^\d+\.\s|^(-{3,}|\*{3,})$/.test(line)
}

export function MarkdownRenderer({ content, linkPreviews = {}, skipFirstH1 = false }: MarkdownProps) {
  const lines = content.replace(/\r\n/g, "\n").split("\n")
  const headings = extractMarkdownHeadings(content)
  const blocks: ReactNode[] = []
  let index = 0
  let headingIndex = 0

  while (index < lines.length) {
    const line = lines[index]
    if (!line.trim()) {
      index += 1
      continue
    }

    const firstImage = parseMarkdownImage(line)
    if (firstImage) {
      const images = [firstImage]
      index += 1
      while (index < lines.length) {
        const nextImage = parseMarkdownImage(lines[index])
        if (!nextImage) break
        images.push(nextImage)
        index += 1
      }

      blocks.push(
        <div
          key={blocks.length}
          className={images.length === 1 ? "my-8" : "my-8 grid grid-cols-1 items-start gap-4 sm:grid-cols-3"}
        >
          {images.map((image, imageIndex) => (
            <figure key={`${image.src}-${imageIndex}`}>
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="mx-auto max-h-[44rem] w-auto rounded-xl border border-border object-contain shadow-sm"
              />
              {image.caption && (
                <figcaption className="mt-2 text-center text-sm leading-5 text-muted-foreground">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>,
      )
      continue
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim()
      const code: string[] = []
      index += 1
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index])
        index += 1
      }
      index += 1
      blocks.push(<CodeBlock key={blocks.length} code={code.join("\n")} language={language || undefined} />)
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    if (heading) {
      const level = heading[1].length
      const currentHeadingIndex = headingIndex
      const headingClasses = {
        1: "group/heading scroll-mt-28 mt-12 text-4xl font-bold tracking-tight first:mt-0",
        2: "group/heading scroll-mt-28 mt-10 text-3xl font-bold tracking-tight",
        3: "group/heading scroll-mt-28 mt-8 text-2xl font-semibold",
        4: "group/heading scroll-mt-28 mt-7 text-xl font-semibold",
        5: "group/heading scroll-mt-28 mt-6 text-lg font-semibold",
        6: "group/heading scroll-mt-28 mt-6 font-semibold",
      }[level]
      const headingInfo = headings[headingIndex] ?? {
        id: `section-${headingIndex + 1}`,
        text: heading[2],
      }
      headingIndex += 1
      if (skipFirstH1 && currentHeadingIndex === 0 && level === 1) {
        index += 1
        continue
      }
      const children = renderInline(heading[2], linkPreviews)
      const headingContent = <>{children}<HeadingCopyLink id={headingInfo.id} label={headingInfo.text} /></>
      const key = blocks.length
      if (level === 1) blocks.push(<h1 key={key} id={headingInfo.id} className={headingClasses}>{headingContent}</h1>)
      if (level === 2) blocks.push(<h2 key={key} id={headingInfo.id} className={headingClasses}>{headingContent}</h2>)
      if (level === 3) blocks.push(<h3 key={key} id={headingInfo.id} className={headingClasses}>{headingContent}</h3>)
      if (level === 4) blocks.push(<h4 key={key} id={headingInfo.id} className={headingClasses}>{headingContent}</h4>)
      if (level === 5) blocks.push(<h5 key={key} id={headingInfo.id} className={headingClasses}>{headingContent}</h5>)
      if (level === 6) blocks.push(<h6 key={key} id={headingInfo.id} className={headingClasses}>{headingContent}</h6>)
      index += 1
      continue
    }

    if (/^[-*+]\s/.test(line)) {
      const items: string[] = []
      while (index < lines.length && /^[-*+]\s/.test(lines[index])) {
        items.push(lines[index].replace(/^[-*+]\s+/, ""))
        index += 1
      }
      blocks.push(
        <ul key={blocks.length} className="my-5 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
          {items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item, linkPreviews)}</li>)}
        </ul>,
      )
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (index < lines.length && /^\d+\.\s/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s+/, ""))
        index += 1
      }
      blocks.push(
        <ol key={blocks.length} className="my-5 list-decimal space-y-2 pl-6 text-muted-foreground marker:font-semibold marker:text-primary">
          {items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item, linkPreviews)}</li>)}
        </ol>,
      )
      continue
    }

    if (line.startsWith(">")) {
      const quote: string[] = []
      while (index < lines.length && lines[index].startsWith(">")) {
        quote.push(lines[index].replace(/^>\s?/, ""))
        index += 1
      }
      blocks.push(
        <blockquote key={blocks.length} className="my-7 border-l-4 border-primary pl-5 italic text-muted-foreground">
          {renderInline(quote.join(" "), linkPreviews)}
        </blockquote>,
      )
      continue
    }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      blocks.push(<hr key={blocks.length} className="my-10 border-border" />)
      index += 1
      continue
    }

    const paragraph = [line.trim()]
    index += 1
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
      paragraph.push(lines[index].trim())
      index += 1
    }
    blocks.push(
      <p key={blocks.length} className="mt-5 text-lg leading-8 text-muted-foreground">
        {renderInline(paragraph.join(" "), linkPreviews)}
      </p>,
    )
  }

  return <div>{blocks}</div>
}
