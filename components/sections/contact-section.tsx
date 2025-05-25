"use client"

import { motion } from "framer-motion"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { COMPANY } from "@/lib/constants"

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
                            {[
                                { title: "Email", content: COMPANY.contact.email },
                                { title: "Phone", content: COMPANY.contact.phone },
                                { title: "Location", content: COMPANY.contact.location }
                            ].map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    className="text-left p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.content}</p>
                                </motion.div>
                            ))}
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
