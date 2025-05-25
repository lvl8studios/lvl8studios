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

                    {/* Main content with 3D model */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left side - Text content */}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                                Our Vision
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                At lvl8studios, we believe in pushing the boundaries of what's possible in digital innovation.
                                Our team combines cutting-edge technology with creative vision to deliver solutions that not only
                                meet your needs but exceed your expectations.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                From concept to deployment, we work closely with our clients to ensure every project reflects
                                their unique vision while leveraging the latest in web technologies, 3D experiences, and
                                interactive design.
                            </p>
                        </motion.div>

                        {/* Right side - 3D Eight model */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <EightCanvas />
                        </motion.div>
                    </div>

                    {/* Values grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Innovation", desc: "We stay at the forefront of technology, always exploring new tools and methodologies." },
                            { title: "Quality", desc: "Every project is crafted with attention to detail and built to the highest standards." },
                            { title: "Partnership", desc: "We work closely with our clients to understand their vision and bring it to life." }
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                className="p-6 rounded-lg bg-card border hover:border-primary/50 transition-colors"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                                viewport={{ once: true, margin: "-100px" }}
                                whileHover={{ y: -5 }}
                            >
                                <h3 className="text-xl font-semibold text-primary mb-4">{item.title}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
