"use client"

import { motion } from "framer-motion"
import ExpandableProjectCards from "@/components/ui/expandable-project-cards"
import { PROJECTS } from "@/lib/constants"

export function ProjectsSection() {
    return (
        <section id="projects" className="py-20 bg-muted/30">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center space-y-8 mb-16">
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-foreground"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            Our Projects
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
                            Explore our portfolio of innovative solutions that showcase our expertise in modern development.
                        </motion.p>
                    </div>

                    {/* Expandable Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <ExpandableProjectCards projects={PROJECTS} />
                    </motion.div>

                    {/* Technology Showcase */}
                    <motion.div
                        className="mt-16 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h3 className="text-xl font-semibold text-foreground mb-6">Technologies We Use</h3>
                        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                            {[
                                ...new Set(
                                    PROJECTS.flatMap(project => project.technologies)
                                )
                            ].map((tech, index) => (
                                <motion.span
                                    key={tech}
                                    className="px-4 py-2 text-sm bg-muted/50 text-muted-foreground rounded-full border border-border/30 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
