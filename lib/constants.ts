// Navigation constants
export const NAV_ITEMS = [
    { href: "#contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
] as const

export const PRODUCTS = [
    { href: "#coconutsplit", label: "CoconutSplit" },
    { href: "#gyatword", label: "GyatWord" },
] as const

export const ABOUT = [
    { href: "#tech", label: "Our Tech" },
    { href: "#team", label: "Our Team" },
] as const

// Company information
export const COMPANY = {
    name: "lvl8studios",
    tagline: "Discover a growing collection of software innovations.",
    description: "By a team of passionate student developers and designers",
    logo: "/logo.png",
    contact: {
        email: "david@lvl8studios.com",
        phone: "+1 (555) 123-4567",
        location: "Singapore",
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
    {
        name: "Anish Kousik",
        designation: "Developer",
        src: "/anish.jpeg",
    },
    {
        name: "Siva Adharsh",
        designation: "Developer",
        src: "/siva.jpeg",
    },
    {
        name: "MinHo Jeon",
        designation: "Business Development",
        src: "/minho.png",
    },
    {
        name: "Abdurrahman Alsagoff",
        designation: "Business Development",
        src: "/rahman.jpeg",
    }
]

// Projects data
export const PROJECTS = [
    {
        title: "CoconutSplit",
        button: "View Project",
        src: "coconutsplit.png",
        description: "A Telegram Bot and Mini App for splitting expense with friends. Used by ~500 users.",
        technologies: ["Next.js", "Supabase", "Telegram", "FastAPI"],
        category: "Telegram Mini App",
        projectLink: "https://t.me/coconutsplit_bot",
        liveDemo: "https://t.me/coconutsplit_bot",
        features: [
            {
                title: "Smart Expense Tracking",
                description: "Automatically track and categorize expenses with intelligent splitting algorithms",
                color: "green"
            },
            {
                title: "Telegram Integration",
                description: "Seamless integration with Telegram for easy group expense management",
                color: "blue"
            },
            {
                title: "Real-time Settlements",
                description: "Instant calculation and tracking of who owes what to whom",
                color: "purple"
            },
            {
                title: "Multi-currency Support",
                description: "Handle expenses in different currencies with automatic conversion",
                color: "orange"
            }
        ]
    },
    {
        title: "Gyatword",
        button: "View Project",
        src: "gyatword.jpeg",
        description: "Brainrot crossword game that won Best Polygot Hack at NUS Hack&Roll 2025.",
        technologies: ["React", "Scala", "FastAPI", "JWT"],
        category: "Web Application",
        projectLink: "https://devpost.com/software/gyatword",
        githubLink: "https://github.com/lvl8studios/gyatword",
        liveDemo: "https://gyatword.com",
        features: [
            {
                title: "Brainrot Vocabulary",
                description: "Fun crossword puzzles featuring modern internet slang and memes",
                color: "green"
            },
            {
                title: "Polyglot Architecture",
                description: "Built with multiple programming languages for optimal performance",
                color: "blue"
            },
            {
                title: "Interactive Gameplay",
                description: "Engaging user interface with smooth animations and feedback",
                color: "purple"
            },
            {
                title: "Award Winning",
                description: "Best Polyglot Hack winner at NUS Hack&Roll 2025",
                color: "orange"
            }
        ]
    },
    {
        title: "GyatSound",
        button: "View Project",
        src: "gyatsound.png",
        description: "Telegram bot to troll your friends with meme sounds.",
        technologies: ["FastAPI", "Docker", "Heroku"],
        category: "Telegram Bot",
        projectLink: "https://t.me/GyatSound_Bot",
        githubLink: "https://github.com/lvl8studios/gyatsound",
        liveDemo: "https://t.me/GyatSound_Bot",
        features: [
            {
                title: "Funny Meme Sounds",
                description: "A collection of hilarious meme sounds to prank your friends",
                color: "green"
            },
            {
                title: "Open Source",
                description: "Fully open source with contributions welcome from the community",
                color: "blue"
            },
        ]
    },
] as const

// Social links
export const SOCIAL_LINKS = {
    github: "https://github.com/lvl8studios",
    linkedin: "https://linkedin.com/company/lvl8studios",
} as const

// Animation/scroll constants
export const SCROLL_OPTIONS = {
    behavior: "smooth" as const,
} as const

// CoconutSplit Section Constants
export const COCONUTSPLIT_SECTION = {
    title: "CoconutSplit",
    description: "Split expenses effortlessly with friends and family, right from your Telegram group chat.",
    instagramPostId: "DLh4VflSzCF", // Replace with actual Instagram post ID
    instagramHandle: "coconutsplitbot",
    instagramUrl: "https://instagram.com/coconutsplitbot",
    buttons: {
        primary: {
            text: "Try CoconutSplit",
            href: "https://t.me/coconutsplit_bot"
        },
        secondary: {
            text: "View on Instagram",
            href: "https://instagram.com/coconutsplitbot"
        }
    },
    stats: {
        openingText: "CoconutSplit maintains a growing community of ...",
        users: {
            value: 1100,
            label: "users"
        },
        transactions: {
            value: 5000,
            label: "transactions"
        },
        value: {
            value: 800,
            prefix: "$",
            suffix: "k SGD",
            label: "worth of expenses"
        }
    }
} as const

// GyatWord Section Constants
export const GYATWORD_SECTION = {
    title: "GyatWord",
    description: "Challenge your brainrot vocabulary and creativity. Awarded Best Polyglot Hack at NUS Hack&Roll 2025.",
    images: {
        desktop: "/gyatword-detail.png",
        mobile: "/gyatword-detail-mobile.png",
        alt: "GyatWord website preview"
    },
    buttons: {
        primary: {
            text: "Try GyatWord",
            href: "https://gyatword.com"
        },
        secondary: {
            text: "View Devpost",
            href: "https://devpost.com/software/gyatword"
        }
    }
} as const

// Tech Section Constants
export const TECH_SECTION = {
    title: "Our Tech Stack",
    description: "The technologies we love working with",
    devops: {
        title: "DevOps",
        technologies: [
            {
                name: "Plane",
                icon: "plane",
                image: "/plane.png"
            },
            {
                name: "Git",
                icon: "git",
                image: "/Git.png"
            },
            {
                name: "Coolify",
                icon: "coolify",
                image: "/coolify.png"
            },
            {
                name: "Nginx",
                icon: "nginx",
                image: "/NGINX.png"
            },
            {
                name: "Docker",
                icon: "docker",
                image: "/Docker.png"
            }
        ]
    },
    swe: {
        title: "Software Engineering",
        technologies: [
            {
                name: "React",
                icon: "react",
                image: "/React.png"
            },
            {
                name: "Next.js",
                icon: "nextjs",
                image: "/nextjs.png"
            },
            {
                name: "FastAPI",
                icon: "fastapi",
                image: "/FastAPI.png"
            },
            {
                name: "Tailwind",
                icon: "tailwind",
                image: "/Tailwind CSS.png"
            },
            {
                name: "PostgreSQL",
                icon: "postgresql",
                image: "/PostgresSQL.png"
            }
        ]
    }
} as const

// Blog Constants
export const BLOG_POSTS = [
    {
        id: "building-coconutsplit",
        title: "Building CoconutSplit: A Journey from Idea to 1000+ Users",
        excerpt: "How we built a Telegram bot that helps friends split expenses effortlessly and grew it to over 1000 users.",
        content: `# Building CoconutSplit: A Journey from Idea to 1000+ Users

## The Problem

Splitting expenses with friends has always been a pain point. Whether it's a group dinner, a shared Uber ride, or a weekend trip, keeping track of who owes what can be incredibly tedious. We've all been there - trying to remember who paid for what, calculating everyone's share, and then the awkward process of asking friends to pay up.

## Our Solution

CoconutSplit was born from this frustration. We wanted to create a seamless experience that would make expense splitting as easy as sending a message. By integrating directly with Telegram, we eliminated the need for yet another app download.

## Key Features

- **Instant Expense Tracking**: Add expenses with a simple command
- **Smart Splitting**: Automatically calculate everyone's share
- **Real-time Settlements**: See who owes what instantly
- **Multi-currency Support**: Handle different currencies seamlessly

## The Journey

Starting with a simple MVP, we focused on core functionality first. The response was overwhelming - within the first month, we had over 500 users. Today, we're proud to serve over 1000 users who have processed more than $800k SGD worth of expenses.

## What's Next

We're constantly improving CoconutSplit based on user feedback. Stay tuned for exciting new features coming soon!`,
        author: "David Chan",
        publishedAt: "2025-04-15",
        readTime: "1 min read",
        tags: ["Product", "Development", "Telegram", "Startup"],
        image: "/coconutsplit.png"
    },
    {
        id: "winning-hackathon-gyatword",
        title: "How GyatWord Won Best Polyglot Hack at NUS Hack&Roll 2025",
        excerpt: "The story behind our award-winning brainrot crossword game that combines modern internet culture with classic word puzzles.",
        content: `# How GyatWord Won Best Polyglot Hack at NUS Hack&Roll 2025

## The Hackathon Challenge

NUS Hack&Roll 2025 was an incredible experience. With thousands of participants and dozens of categories, we knew we had to build something unique to stand out. The polyglot category particularly caught our attention - it required using multiple programming languages effectively.

## The Concept

GyatWord was inspired by the intersection of internet culture and classic word games. We wanted to create a crossword puzzle that would resonate with Gen Z while still being challenging and educational.

## Technical Implementation

Our polyglot approach included:

- **Frontend**: React for the interactive puzzle interface
- **Backend**: Scala for word processing and puzzle generation
- **API**: FastAPI for fast, reliable endpoints
- **Authentication**: JWT for secure user sessions

## The Demo

Our demo showcased the seamless integration between different technologies, each chosen for their specific strengths. The judges were impressed by both the technical implementation and the creative concept.

## Key Learnings

Building GyatWord taught us the importance of:
- Choosing the right tool for each job
- Seamless integration between different technologies
- Understanding your target audience

## Recognition

Winning the Best Polyglot Hack award was an incredible validation of our approach. It showed that technical excellence combined with creative thinking can create something truly special.`,
        author: "Jensen Huang",
        publishedAt: "2025-05-01",
        readTime: "1 min read",
        tags: ["Hackathon", "Awards", "Development", "React", "Scala"],
        image: "/gyatword.jpeg"
    },
    {
        id: "tech-stack-choices",
        title: "Why We Choose These Technologies: A Deep Dive into Our Tech Stack",
        excerpt: "An in-depth look at the technologies we use at lvl8studios and why we chose them for our projects.",
        content: `# Why We Choose These Technologies: A Deep Dive into Our Tech Stack

## Introduction

At lvl8studios, we believe in using the right tool for the job. Our tech stack has evolved through real-world experience building products that serve thousands of users. Here's why we chose each technology.

## Frontend Technologies

### React
React's component-based architecture and massive ecosystem make it our go-to choice for complex user interfaces. The virtual DOM ensures smooth performance even with frequent updates.

### Next.js
Next.js provides the perfect balance of performance and developer experience. Features like automatic code splitting, server-side rendering, and API routes make it ideal for full-stack applications.

### Tailwind CSS
Tailwind's utility-first approach dramatically speeds up our development process. Instead of writing custom CSS, we can compose designs directly in our markup.

## Backend Technologies

### FastAPI
FastAPI's automatic API documentation, type hints, and incredible performance make it our preferred choice for building APIs. The async support is perfect for high-concurrency applications.

## DevOps & Infrastructure

### Docker
Containerization ensures our applications run consistently across different environments. Docker makes deployment and scaling much more predictable.

### Nginx
As a reverse proxy and load balancer, Nginx handles our traffic efficiently while providing SSL termination and static file serving.

### Git
Version control is essential for team collaboration. Git's branching model allows us to work on features independently while maintaining code quality.

### Coolify
Coolify simplifies our deployment process with its intuitive interface and powerful automation features.

### Plane
For project management, Plane provides the perfect balance of features and simplicity, helping us stay organized without getting in the way.

## Conclusion

Our tech stack choices are driven by pragmatism, performance, and developer experience. Each technology serves a specific purpose and has proven itself in production environments.`,
        author: "Benjamin Koh",
        publishedAt: "2025-05-20",
        readTime: "1 min read",
        tags: ["Technology", "Development", "Architecture", "DevOps"],
        image: "/logo.png"
    }
] as const
