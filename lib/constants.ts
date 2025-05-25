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
        location: "San Francisco, CA",
    },
} as const

// Team members data
export const TEAM_MEMBERS = [
    {
        name: "David Chan",
        designation: "Founder & Lead Developer",
        quote: "Passionate about creating innovative solutions that bridge the gap between complex technology and user-friendly experiences. I believe great software should feel effortless to use.",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face",
    },
    {
        name: "Sarah Chen",
        designation: "Full-Stack Developer",
        quote: "I love turning ideas into reality through clean, efficient code. My focus is on building scalable applications that can grow with our clients' needs.",
        src: "https://images.unsplash.com/photo-1494790108755-2616b612b4e9?w=500&h=500&fit=crop&crop=face",
    },
    {
        name: "Alex Rodriguez",
        designation: "UI/UX Designer",
        quote: "Design is not just how it looks, but how it works. I create intuitive interfaces that make complex processes feel simple and delightful for users.",
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&crop=face",
    },
    {
        name: "Maya Patel",
        designation: "DevOps Engineer",
        quote: "I ensure our applications run smoothly and scale efficiently. My passion lies in building robust infrastructure that supports innovation and growth.",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&crop=face",
    },
]

// Social links (for future use)
export const SOCIAL_LINKS = {
    github: "#",
    linkedin: "#",
    twitter: "#",
} as const

// Animation/scroll constants
export const SCROLL_OPTIONS = {
    behavior: "smooth" as const,
} as const
