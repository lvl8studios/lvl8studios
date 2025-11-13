"use client"

import { motion } from "framer-motion"
import { COMPANY } from "@/lib/constants"
import ContactForm from "@/components/ui/contact-form"

export function ContactSection() {
    return (
        <section id="contact" className="relative py-20 bg-background overflow-hidden">
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
                        className="text-lg text-muted-foreground max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        Feedback, questions, or want to join our team? We'd love to hear from you! Fill out the form below
                    </motion.p>

                    <div className="max-w-2xl mx-auto mt-12 space-y-8">
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-lg text-muted-foreground">
                                or reach out directly at{" "}
                                <a
                                    href={`mailto:${COMPANY.contact.email}`}
                                    className="text-primary hover:underline font-medium"
                                >
                                    {COMPANY.contact.email}
                                </a>
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <ContactForm />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}


