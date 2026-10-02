export interface MarkdownHeading {
  depth: number
  id: string
  text: string
}

export function plainText(value: string): string {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim()
}

function baseHeadingId(value: string): string {
  return plainText(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-") || "section"
}

export function extractMarkdownHeadings(content: string): MarkdownHeading[] {
  const seen = new Map<string, number>()
  let inCodeBlock = false

  return content.replace(/\r\n/g, "\n").split("\n").flatMap((line) => {
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock
      return []
    }
    if (inCodeBlock) return []

    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (!match) return []

    const baseId = baseHeadingId(match[2])
    const occurrence = seen.get(baseId) ?? 0
    seen.set(baseId, occurrence + 1)

    return [{
      depth: match[1].length,
      id: occurrence === 0 ? baseId : `${baseId}-${occurrence + 1}`,
      text: plainText(match[2]),
    }]
  })
}
