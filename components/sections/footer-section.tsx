"use client"

import { motion } from "framer-motion"
import { COMPANY, SOCIAL_LINKS } from "@/lib/constants"

export function FooterSection() {
    return (
        <footer className="py-12 border-t border-border bg-muted/20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Main Footer Content - Single Line */}
                    <motion.div
                        className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        {/* Copyright */}
                        <p className="text-muted-foreground">
                            © 2025 {COMPANY.name}. All rights reserved.
                        </p>
                        
                        {/* Separator */}
                        <div className="hidden md:block w-px h-4 bg-border"></div>
                        
                        {/* Location */}
                        <p className="text-muted-foreground">
                            {COMPANY.contact.location}
                        </p>
                        
                        {/* Separator */}
                        <div className="hidden md:block w-px h-4 bg-border"></div>
                        
                        {/* Blog Link */}
                        <motion.a
                            href="/blog"
                            className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Blog
                        </motion.a>
                        
                        {/* Separator */}
                        <div className="hidden md:block w-px h-4 bg-border"></div>
                        
                        {/* LinkedIn */}
                        <motion.a
                            href={SOCIAL_LINKS.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </footer>
    )
}
