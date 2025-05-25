"use client"

import { motion } from "framer-motion"

export function ProjectsSection() {
    return (
        <section id="projects" className="py-20">
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
                            Our Projects
                        </motion.h2>
                        <motion.p
                            className="text-lg text-muted-foreground max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            Here are some of the innovative solutions we've built for our clients.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((project, index) => (
                            <motion.div
                                key={project}
                                className="group"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                                viewport={{ once: true, margin: "-100px" }}
                                whileHover={{ y: -10 }}
                            >
                                <div className="p-6 rounded-lg bg-card border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                                    <motion.div
                                        className="h-48 bg-gradient-to-br from-turquoise/20 to-aero/20 rounded-lg mb-4"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    ></motion.div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Project {project}</h3>
                                    <p className="text-muted-foreground mb-4">
                                        A brief description of the project and the technologies used to build it.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {["React", "TypeScript", "Next.js"].map((tech, techIndex) => (
                                            <motion.span
                                                key={tech}
                                                className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: (index * 0.1) + (techIndex * 0.05) }}
                                                viewport={{ once: true }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
