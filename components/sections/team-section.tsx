"use client"

import { motion } from "framer-motion"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { TEAM_MEMBERS } from "@/lib/constants"

export function TeamSection() {
    return (
        <section id="team" className="py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
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
                        <motion.p
                            className="text-lg text-muted-foreground max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            Our diverse team brings together expertise in development, design, and innovation to deliver exceptional results.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <AnimatedTestimonials testimonials={TEAM_MEMBERS} autoplay={true} />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
