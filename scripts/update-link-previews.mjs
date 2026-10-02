import { createHash } from "node:crypto"
import { promises as fs } from "node:fs"
import path from "node:path"

const projectRoot = process.cwd()
const postsDirectory = path.join(projectRoot, "content", "blog")
const outputFile = path.join(projectRoot, "content", "link-previews.json")
const imageDirectory = path.join(projectRoot, "public", "blog-previews")
const linkPattern = /(?<!!)\[[^\]]+\]\((https?:\/\/[^\s)]+)\)/g
const maxHtmlBytes = 1_000_000
const maxImageBytes = 2_500_000

function isPrivateHostname(hostname) {
  const normalized = hostname.toLowerCase().replace(/^\[|\]$/g, "")
  if (normalized === "localhost" || normalized.endsWith(".localhost") || normalized.endsWith(".local")) return true
  if (normalized === "::1" || normalized.startsWith("fc") || normalized.startsWith("fd") || normalized.startsWith("fe80:")) return true

  const octets = normalized.split(".").map(Number)
  if (octets.length !== 4 || octets.some(Number.isNaN)) return false
  return octets[0] === 10
    || octets[0] === 127
    || (octets[0] === 169 && octets[1] === 254)
    || (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31)
    || (octets[0] === 192 && octets[1] === 168)
}

function validatedUrl(value) {
  const url = new URL(value)
  if (!['http:', 'https:'].includes(url.protocol) || isPrivateHostname(url.hostname)) {
    throw new Error(`Refusing unsafe URL: ${value}`)
  }
  return url
}

async function fetchWithSafeRedirects(value) {
  let url = validatedUrl(value)
  for (let redirects = 0; redirects <= 4; redirects += 1) {
    const response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(10_000),
      headers: {
        "User-Agent": "lvl8studios-link-preview/1.0",
        Accept: "text/html,application/xhtml+xml,image/avif,image/webp,image/png,image/jpeg,*/*;q=0.5",
      },
    })

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location")
      if (!location) throw new Error(`Redirect from ${url} did not include a location`)
      url = validatedUrl(new URL(location, url).toString())
      continue
    }

    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return { response, finalUrl: url }
  }
  throw new Error(`Too many redirects for ${value}`)
}

async function readLimited(response, limit) {
  if (!response.body) return new Uint8Array()
  const reader = response.body.getReader()
  const chunks = []
  let size = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > limit) {
      await reader.cancel()
      throw new Error(`Response exceeded ${Math.round(limit / 1_000)} KB`)
    }
    chunks.push(value)
  }

  const output = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) {
    output.set(chunk, offset)
    offset += chunk.byteLength
  }
  return output
}

function decodeHtml(value = "") {
  const entities = {
    amp: "&",
    apos: "'",
    gt: ">",
    hellip: "…",
    ldquo: "“",
    lt: "<",
    mdash: "—",
    nbsp: " ",
    quot: '"',
    rdquo: "”",
  }
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (entity, name) => entities[name.toLowerCase()] ?? entity)
    .replace(/\s+/g, " ")
    .trim()
}

function tagAttributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map((match) => [match[1].toLowerCase(), decodeHtml(match[3])]),
  )
}

function pageMetadata(html, url) {
  const metadata = new Map()
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attributes = tagAttributes(tag)
    const key = (attributes.property || attributes.name || "").toLowerCase()
    if (key && attributes.content && !metadata.has(key)) metadata.set(key, attributes.content)
  }

  const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
  return {
    title: decodeHtml(metadata.get("og:title") || metadata.get("twitter:title") || titleTag || url.hostname),
    description: decodeHtml(metadata.get("og:description") || metadata.get("twitter:description") || metadata.get("description") || ""),
    siteName: decodeHtml(metadata.get("og:site_name") || url.hostname.replace(/^www\./, "")),
    imageUrl: metadata.get("og:image") || metadata.get("twitter:image") || "",
  }
}

async function cacheImage(imageUrl, pageUrl) {
  if (!imageUrl) return undefined
  const absoluteUrl = new URL(imageUrl, pageUrl).toString()
  const { response } = await fetchWithSafeRedirects(absoluteUrl)
  const contentType = response.headers.get("content-type")?.split(";")[0] || ""
  const extensions = {
    "image/avif": "avif",
    "image/gif": "gif",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  }
  const extension = extensions[contentType]
  if (!extension) throw new Error(`Unsupported preview image type: ${contentType || "unknown"}`)

  const bytes = await readLimited(response, maxImageBytes)
  const filename = `${createHash("sha256").update(absoluteUrl).digest("hex").slice(0, 16)}.${extension}`
  await fs.mkdir(imageDirectory, { recursive: true })
  await fs.writeFile(path.join(imageDirectory, filename), bytes)
  return `/blog-previews/${filename}`
}

async function fetchPreview(url) {
  const { response, finalUrl } = await fetchWithSafeRedirects(url)
  const contentType = response.headers.get("content-type") || ""
  if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
    throw new Error(`Expected HTML but received ${contentType || "an unknown content type"}`)
  }

  const html = new TextDecoder().decode(await readLimited(response, maxHtmlBytes))
  const metadata = pageMetadata(html, finalUrl)
  let image
  try {
    image = await cacheImage(metadata.imageUrl, finalUrl)
  } catch (error) {
    console.warn(`  Preview image skipped: ${error.message}`)
  }

  return {
    url,
    title: metadata.title,
    description: metadata.description,
    siteName: metadata.siteName,
    ...(image ? { image } : {}),
  }
}

async function markdownLinks() {
  const entries = await fs.readdir(postsDirectory, { withFileTypes: true })
  const links = new Set()
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue
    const markdown = await fs.readFile(path.join(postsDirectory, entry.name), "utf8")
    for (const match of markdown.matchAll(linkPattern)) links.add(match[1])
  }
  return [...links].sort()
}

async function main() {
  const links = await markdownLinks()
  let previous = {}
  try {
    previous = JSON.parse(await fs.readFile(outputFile, "utf8"))
  } catch (error) {
    if (error.code !== "ENOENT") throw error
  }

  const previews = {}
  for (const url of links) {
    process.stdout.write(`Fetching ${url} ... `)
    try {
      previews[url] = await fetchPreview(url)
      console.log("done")
    } catch (error) {
      if (previous[url]) {
        previews[url] = previous[url]
        console.log(`using existing cache (${error.message})`)
      } else {
        const parsed = validatedUrl(url)
        previews[url] = {
          url,
          title: parsed.hostname.replace(/^www\./, ""),
          description: "",
          siteName: parsed.hostname.replace(/^www\./, ""),
        }
        console.log(`using URL fallback (${error.message})`)
      }
    }
  }

  await fs.writeFile(outputFile, `${JSON.stringify(previews, null, 2)}\n`)
  console.log(`Saved ${links.length} link preview${links.length === 1 ? "" : "s"} to content/link-previews.json`)
}

await main()
