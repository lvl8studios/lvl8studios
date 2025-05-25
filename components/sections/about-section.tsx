"use client"

import { motion } from "framer-motion"
import { EightCanvas } from "@/components/ui/eight-canvas"

export function AboutSection() {
    return (
        <section id="about" className="py-20 bg-muted/30">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center space-y-8 mb-16">
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-foreground"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            About Us
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
                            We are a passionate team of developers, designers, and innovators dedicated to creating
                            exceptional software solutions.
                        </motion.p>
                    </div>

                    {/* Main content card with 3D model */}
                    <motion.div
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 shadow-2xl mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        whileHover={{ y: -5 }}
                    >
                        {/* Decorative background elements */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-primary/10 via-primary/5 to-transparent opacity-50" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-secondary/10 via-secondary/5 to-transparent opacity-50" />

                        <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                            {/* Left side - Text content */}
                            <motion.div
                                className="p-8 lg:p-12 flex flex-col justify-center space-y-6 bg-gradient-to-br from-card/60 to-transparent border-r border-border/30"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <div className="relative">
                                    <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-primary to-secondary rounded-full" />
                                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                                        Our Vision
                                    </h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    At lvl8studios, we believe in pushing the boundaries of what's possible in digital innovation.
                                    Our team combines cutting-edge technology with creative vision to deliver solutions that not only
                                    meet your needs but exceed your expectations.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    From concept to deployment, we work closely to ensure every project reflects
                                    their unique vision while leveraging the latest in web technologies, 3D experiences, and
                                    interactive design.
                                </p>

                                {/* Decorative dots */}
                                <div className="flex space-x-2 pt-4">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse delay-100" />
                                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse delay-200" />
                                </div>
                            </motion.div>

                            {/* Right side - 3D Eight model */}
                            <motion.div
                                className="relative p-8 lg:p-12 flex items-center justify-center bg-gradient-to-bl from-muted/20 to-transparent"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                {/* Floating orbs */}
                                <div className="absolute top-8 right-8 w-4 h-4 rounded-full bg-primary/30 animate-bounce" />
                                <div className="absolute bottom-8 left-8 w-3 h-3 rounded-full bg-secondary/30 animate-bounce delay-300" />

                                <div className="relative w-full h-full min-h-[400px]">
                                    <EightCanvas />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
