"use client"

import { motion } from "framer-motion"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { TEAM_MEMBERS } from "@/lib/constants"

export function TeamSection() {
    return (
        <section id="team" className="relative py-24 overflow-hidden bg-muted/30">
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
                            Meet Our Team
                        </motion.h2>
                        <motion.div
                            className="mx-auto w-24 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: 96 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        />
                        <motion.p
                            className="text-lg text-muted-foreground max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            Our diverse team brings together expertise in development, design, and innovation to deliver exceptional results.

                        </motion.p>

                        {/* Professional stats row */}
                        {/* <motion.div
                            className="flex flex-wrap justify-center gap-8 mt-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {[
                                { number: "4", label: "Team Members" },
                                { number: "50+", label: "Projects" },
                                { number: "5+", label: "Years Experience" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="text-center px-4 py-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                >
                                    <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div> */}
                    </div>

                    {/* Enhanced testimonials wrapper */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Professional container with subtle styling */}
                        <div className="relative p-8 md:p-12 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg">
                            {/* Corner accents */}
                            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-primary/30 rounded-tl-md" />
                            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-primary/30 rounded-tr-md" />
                            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-secondary/30 rounded-bl-md" />
                            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-secondary/30 rounded-br-md" />

                            <AnimatedTestimonials testimonials={TEAM_MEMBERS} autoplay={true} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
