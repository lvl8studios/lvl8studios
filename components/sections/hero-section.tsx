"use client"

import { motion } from "framer-motion"
import { COMPANY, SCROLL_OPTIONS, PROJECTS } from "@/lib/constants"
import { CyclingAppIcons } from "@/components/ui/cycling-app-icons"

export function HeroSection() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 md:pt-24">
            <div className="relative z-20 container mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-10">
                    <motion.div
                        className="flex justify-center mb-16 -mt-6 md:-mt-12"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <CyclingAppIcons 
                            icons={PROJECTS.map(project => ({
                                src: project.src,
                                title: project.title
                            }))}
                        />
                    </motion.div>

                    <div className="text-center space-y-8">
                        <motion.h1
                            className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            {COMPANY.tagline}
                        </motion.h1>

                        <motion.p
                            className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        >
                            {COMPANY.description}
                        </motion.p>
                    </div>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                        <motion.button
                            onClick={() => document.querySelector('#coconutsplit')?.scrollIntoView(SCROLL_OPTIONS)}
                            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-colors"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            View Our Work
                        </motion.button>
                        <motion.button
                            onClick={() => document.querySelector('#contact')?.scrollIntoView(SCROLL_OPTIONS)}
                            className="w-full sm:w-auto bg-muted text-muted-foreground hover:bg-muted/80 px-8 py-3 rounded-lg font-medium transition-colors"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            Get In Touch
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
