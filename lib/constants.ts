// Navigation constants
export const NAV_ITEMS = [
    { href: "#about", label: "About Us" },
    { href: "#team", label: "Team" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
] as const

// Company information
export const COMPANY = {
    name: "lvl8studios",
    tagline: "Software Development Group",
    description: "We build innovative software solutions with cutting-edge technology and modern design principles.",
    logo: "/logo.png",
    contact: {
        email: "hello@lvl8studios.com",
        phone: "+1 (555) 123-4567",
        location: "Singapore",
    },
} as const

// Team members data
export const TEAM_MEMBERS = [
    {
        name: "David Chan",
        designation: "Co-Founder",
        quote: "Passionate about creating innovative solutions that bridge the gap between complex technology and user-friendly experiences. I believe great software should feel effortless to use.",
        src: "/david.jpg",
    },
    {
        name: "Jensen Huang",
        designation: "Co-Founder",
        quote: "I love turning ideas into reality through clean, efficient code. My focus is on building scalable applications that can grow with our clients' needs.",
        src: "/jensen.jpg",
    },
    {
        name: "Benjamin Koh",
        designation: "Co-Founder",
        quote: "Design is not just how it looks, but how it works. I create intuitive interfaces that make complex processes feel simple and delightful for users.",
        src: "/ben.jpg",
    },
    {
        name: "Anish Kousik",
        designation: "Developer",
        quote: "I thrive on solving challenging problems with elegant solutions. My goal is to build software that not only meets requirements but also inspires users.",
        src: "/anish.jpg",
    },
    {
        name: "Siva Adharsh",
        designation: "Developer",
        quote: "Design is about creating meaningful experiences. I focus on crafting interfaces that are not only beautiful but also enhance usability and accessibility.",
        src: "/siva.jpg",
    },
    {
        name: "Aayush Sharma",
        designation: "README Writer",
        quote: "I believe in the power of collaboration and continuous learning. My approach is to build software that adapts to changing needs while maintaining high quality.",
        src: "/aayush.jpg",
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
        projectLink: "https://t.me/CoconutSplitBot",
        liveDemo: "https://t.me/CoconutSplitBot",
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
