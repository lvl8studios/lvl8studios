// Navigation constants
export const NAV_ITEMS = [
    { href: "/#work", label: "Work" },
    { href: "/#people", label: "People" },
    { href: "/blog", label: "Writing" },
    { href: "/#contact", label: "Contact" },
] as const

// Company information
export const COMPANY = {
    name: "lvl8studios",
    statement: "A software collective from Singapore. We build products people actually use, like CoconutSplit, which 10,000 people use to split bills on Telegram.",
    logo: "/logo.png",
    contact: {
        email: "jensen@lvl8studios.com",
        location: "Singapore",
        timeZone: "Asia/Singapore",
    },
} as const

// Team members data
export const TEAM_MEMBERS = [
    {
        name: "David Chan",
        designation: "Co-Founder",
        src: "/david.png",
    },
    {
        name: "Jensen Huang",
        designation: "Co-Founder",
        src: "/jensen.jpeg",
    },
    {
        name: "Benjamin Koh",
        designation: "Co-Founder",
        src: "/ben.jpg",
    },
] as const

export type ProjectLink = { label: string; href: string }

// Projects, in the order they appear in the work index
export const PROJECTS = [
    {
        id: "coconutsplit",
        title: "CoconutSplit",
        kind: "Telegram bot and mini app",
        outcome: "10,000 users",
        preview: "/coconutsplit-badge.png",
        previewBackground: "#f2e8d6",
        description: "Split expenses with friends and family right inside your Telegram group chat. Add a bill, choose who was in, and CoconutSplit works out who owes whom, in any currency.",
        technologies: ["Next.js", "Supabase", "Telegram", "FastAPI"],
        stats: [
            { label: "Users", value: "10,000" },
            { label: "Transactions", value: "7,000" },
            { label: "Expenses tracked", value: "S$1.1M" },
        ],
        links: [
            { label: "Open in Telegram", href: "https://t.me/coconutsplit_bot" },
            { label: "Instagram", href: "https://instagram.com/coconutsplitbot" },
        ],
    },
    {
        id: "gyatword",
        title: "GyatWord",
        kind: "Web game",
        outcome: "Best Polyglot Hack, NUS Hack&Roll 2025",
        preview: "/gyatword-detail.png",
        previewBackground: "#1e2027",
        description: "A crossword where every clue is internet brainrot. Built at NUS Hack&Roll 2025 with a React front end, Scala for puzzle generation and FastAPI for the API, and it took home Best Polyglot Hack.",
        technologies: ["React", "Scala", "FastAPI", "JWT"],
        stats: [
            { label: "Award", value: "Best Polyglot Hack" },
            { label: "Event", value: "NUS Hack&Roll 2025" },
        ],
        links: [
            { label: "Play GyatWord", href: "https://gyatword.com" },
            { label: "Devpost", href: "https://devpost.com/software/gyatword" },
            { label: "GitHub", href: "https://github.com/lvl8studios/gyatword" },
        ],
    },
    {
        id: "gyatsound",
        title: "GyatSound",
        kind: "Telegram bot",
        outcome: "Open source",
        preview: "/gyatsound-mark.png",
        previewBackground: "#3a2c29",
        description: "A Telegram bot for trolling your friends with meme sounds. Small, silly and fully open source.",
        technologies: ["FastAPI", "Docker", "Heroku"],
        stats: [],
        links: [
            { label: "Open in Telegram", href: "https://t.me/GyatSound_Bot" },
            { label: "GitHub", href: "https://github.com/lvl8studios/gyatsound" },
        ],
    },
] as const

// Social links
export const SOCIAL_LINKS = [
    { label: "GitHub", href: "https://github.com/lvl8studios" },
    { label: "LinkedIn", href: "https://linkedin.com/company/lvl8studios" },
    { label: "Instagram", href: "https://instagram.com/coconutsplitbot" },
] as const

// The tools we build with
export const STACK = [
    {
        title: "Software engineering",
        technologies: ["React", "Next.js", "FastAPI", "Tailwind", "PostgreSQL"],
    },
    {
        title: "DevOps",
        technologies: ["Plane", "Git", "Coolify", "Nginx", "Docker"],
    },
] as const
