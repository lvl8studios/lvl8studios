"use client"

import { motion } from "framer-motion"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { COMPANY, SOCIAL_LINKS } from "@/lib/constants"

export function ContactSection() {
    return (
        <section id="contact" className="relative py-20 bg-muted/30 overflow-hidden">
            <BackgroundBeams className="absolute inset-0 w-full h-full" />
            <div className="relative z-10 container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-foreground"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        Get In Touch
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
                        Ready to start your next project? Let's discuss how we can help bring your ideas to life.
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {/* Email */}
                            <motion.div
                                className="text-left p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-semibold text-foreground mb-2">Email</h3>
                                <p className="text-muted-foreground">{COMPANY.contact.email}</p>
                            </motion.div>

                            {/* Location */}
                            <motion.div
                                className="text-left p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.7 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-semibold text-foreground mb-2">Location</h3>
                                <p className="text-muted-foreground">{COMPANY.contact.location}</p>
                            </motion.div>

                            {/* Social Media Links */}
                            <motion.div
                                className="text-left p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-semibold text-foreground mb-4">Follow Us</h3>
                                <div className="flex flex-wrap gap-3">
                                    <motion.a
                                        href={SOCIAL_LINKS.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 bg-neutral-900 dark:bg-neutral-700 text-white rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-600 transition-colors duration-200"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span className="text-sm font-medium">GitHub</span>
                                    </motion.a>

                                    <motion.a
                                        href={SOCIAL_LINKS.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        <span className="text-sm font-medium">LinkedIn</span>
                                    </motion.a>
                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {[
                                { type: "text", placeholder: "Your Name" },
                                { type: "email", placeholder: "Your Email" },
                                { type: "textarea", placeholder: "Your Message", rows: 4 }
                            ].map((field, index) => (
                                <motion.div
                                    key={field.placeholder}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {field.type === "textarea" ? (
                                        <textarea
                                            placeholder={field.placeholder}
                                            rows={field.rows}
                                            className="w-full px-4 py-3 rounded-lg border border-input bg-background/90 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none transition-colors"
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="w-full px-4 py-3 rounded-lg border border-input bg-background/90 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                                        />
                                    )}
                                </motion.div>
                            ))}
                            <motion.button
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-colors shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 1.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Send Message
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
