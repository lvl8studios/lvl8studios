"use client"

import { motion } from "framer-motion"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { TEAM_MEMBERS } from "@/lib/constants"

export function TeamSection() {
    return (
        <section id="team" className="relative py-24 overflow-hidden bg-background">
            {/* Subtle background elements */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-radial from-secondary/8 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* header section */}


                    <div className="text-center space-y-8 mb-16">
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-foreground"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            Our Team
                        </motion.h2>
                        <motion.div
                            className="mx-auto w-24 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: 96 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        />

                    </div>

                    {/* Enhanced testimonials wrapper */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <AnimatedTestimonials testimonials={TEAM_MEMBERS} autoplay={true} />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
