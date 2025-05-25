"use client"

import { motion } from "framer-motion"
import { BackgroundLines } from "@/components/ui/background-lines"
import { COMPANY, SCROLL_OPTIONS } from "@/lib/constants"

export function HeroSection() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <BackgroundLines className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-turquoise/10 via-aero/5 to-oxford-blue/10 z-10"></div>
            </BackgroundLines>

            <div className="relative z-20 container mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span
                            className="bg-gradient-to-r from-turquoise via-aero to-primary bg-clip-text text-transparent"
                            initial={{ backgroundPosition: "0% 50%" }}
                            animate={{ backgroundPosition: "100% 50%" }}
                            transition={{
                                duration: 3,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            style={{ backgroundSize: "200% 200%" }}
                        >
                            {COMPANY.name}
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        {COMPANY.tagline}
                    </motion.p>

                    <motion.p
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        {COMPANY.description}
                    </motion.p>

                    <motion.div
                        className="flex gap-4 items-center justify-center flex-col sm:flex-row mt-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                        <motion.button
                            onClick={() => document.querySelector('#projects')?.scrollIntoView(SCROLL_OPTIONS)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-colors"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            View Our Work
                        </motion.button>
                        <motion.button
                            onClick={() => document.querySelector('#contact')?.scrollIntoView(SCROLL_OPTIONS)}
                            className="border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg font-medium transition-colors"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            Get In Touch
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 z-10">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-turquoise/30 rounded-full"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>
        </section>
    )
}
