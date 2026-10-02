# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and potential collaborators sizing up the lvl8studios team. They arrive from a CV, LinkedIn, GitHub or a hackathon page and want to know, quickly, whether these people ship real software that real people use.

Secondary: people curious about the apps themselves (CoconutSplit, GyatWord, GyatSound) and readers of the blog.

## Product Purpose

lvl8studios is a software collective founded by Jensen Huang, David Chan and Benjamin Koh, based in Singapore. The website is the collective's portfolio: it shows what the team has built, who is on it, how they build, and how to get in touch. Success is a recruiter or collaborator leaving convinced the team is capable and reaching out.

## Positioning

A small group of student builders whose side projects have real traction: CoconutSplit, a Telegram expense-splitting bot and mini app, has around 10,000 users. They also win hackathons (GyatWord won Best Polyglot Hack at NUS Hack&Roll 2025) and run their own infrastructure.

## Operating Context

Visitors mostly skim on desktop between other tabs, or open the link on a phone from a chat. The blog (`/blog`, markdown files in `content/blog`) carries longer write-ups about building CoconutSplit, the hackathon win, and stack choices.

## Capabilities and Constraints

- Next.js 15 app router, Tailwind 3, framer-motion, lucide icons, bun.
- Contact form composes an email to jensen@lvl8studios.com (mailto, no backend).
- Blog posts are local markdown with cached link previews (`bun run update-link-previews`).
- Projects: CoconutSplit (Telegram bot + mini app), GyatWord (brainrot crossword, gyatword.com), GyatSound (Telegram meme-sound bot, open source).

## Brand Commitments

- Name is written lowercase: `lvl8studios`.
- The blue-to-turquoise interlinked infinity/"8" logo (`public/logo.png`) stays.

## Evidence on Hand

- CoconutSplit: ~10,000 users (confirmed). Older figures still in code, unconfirmed against the new user count: 7,000 transactions, $1.1M SGD of expenses tracked. Instagram @coconutsplitbot.
- GyatWord: Best Polyglot Hack, NUS Hack&Roll 2025; Devpost and GitHub links; product screenshots `public/gyatword-detail.png`, `public/gyatword-detail-mobile.png`.
- Team photos for seven members in `public/`.
- Do not invent clients, testimonials, revenue or employers.

## Product Principles

1. Proof over adjectives: lead with shipped products and real numbers.
2. Make the people visible; recruiters are evaluating the team, not a brand.
3. Every project links to something you can actually open and use.
4. Fast to skim: a visitor should get the point in one screen.
