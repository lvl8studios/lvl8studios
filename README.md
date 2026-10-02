# lvl8studios website

The lvl8studios website is a Next.js application whose content and assets live entirely in this repository. It does not require a database, object storage, contact-form service, or runtime content API.

## Run locally

Install dependencies and start the development server:

```bash
bun install
bun dev
```

Open `http://localhost:3000`.

## Blog posts

Each published blog post is a Markdown file in `content/blog`. The filename becomes the URL slug, so `my-new-post.md` is available at `/blog/my-new-post`.

Start a post with this frontmatter:

```md
---
title: "My new post"
excerpt: "A short description shown on the blog index."
author: "Author Name"
date: 2026-08-10
tags: ["Product", "News"]
image: /my-post-image.png
---

# My new post

Write the post in Markdown here.
```

Images belong in `public` and are referenced with a root-relative path such as `/my-post-image.png`. Reading time is calculated automatically. Add `published: false` to the frontmatter to keep a draft out of the site.

The built-in Markdown renderer supports headings, paragraphs, bold and italic text, links, inline code, fenced code blocks, blockquotes, ordered and unordered lists, and horizontal rules. It renders Markdown as React elements rather than injecting raw HTML.

### Link previews

External Markdown links can show a rich preview on hover and keyboard focus. Preview text and images are generated ahead of time and committed to the repository, so readers never contact a linked website until they choose to open it.

After adding, changing, or removing a link in a post, run:

```bash
bun run update-link-previews
```

Commit the updated `content/link-previews.json` and any files created in `public/blog-previews`. The generator only requests public HTTP or HTTPS addresses, limits redirects and download sizes, and retains previously cached metadata if a site is temporarily unavailable. Production builds do not run this command or require network access.

Blog posts also include a reading-progress indicator, a table of contents for posts with at least three section headings, copyable heading links, copy buttons on fenced code blocks, and newer/older post navigation.

## Checks

```bash
bun run typecheck
bun run build
```

The contact form uses a `mailto:` link and opens the visitor's configured email application. Change the destination in `lib/constants.ts`.
