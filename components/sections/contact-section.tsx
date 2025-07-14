"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import emailjs from '@emailjs/browser'
import { COMPANY, SOCIAL_LINKS } from "@/lib/constants"

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Basic validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setSubmitStatus('error')
            setTimeout(() => setSubmitStatus('idle'), 3000)
            return
        }

        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_name: COMPANY.name,
            }

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            )

            setSubmitStatus('success')
            setFormData({ name: '', email: '', message: '' })
        } catch (error) {
            console.error('EmailJS error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
            setTimeout(() => setSubmitStatus('idle'), 5000)
        }
    }
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
                        {/* Email */}
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

                        {/* Contact Form */}
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {[
                                    { type: "text", placeholder: "Your Name", name: "name", value: formData.name },
                                    { type: "email", placeholder: "Your Email", name: "email", value: formData.email },
                                    { type: "textarea", placeholder: "Your Message", name: "message", value: formData.message, rows: 4 }
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
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                rows={field.rows}
                                                value={field.value}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-input bg-background/90 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none transition-colors"
                                            />
                                        ) : (
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                value={field.value}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-input bg-background/90 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                                            />
                                        )}
                                    </motion.div>
                                ))}

                                {/* Status message */}
                                {submitStatus !== 'idle' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`text-center text-sm font-medium ${submitStatus === 'success'
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-red-600 dark:text-red-400'
                                            }`}
                                    >
                                        {submitStatus === 'success'
                                            ? '✓ Message sent successfully! We\'ll get back to you soon.'
                                            : '✗ Failed to send message. Please try again or contact us directly.'}
                                    </motion.div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full px-8 py-3 rounded-lg font-medium transition-colors shadow-lg ${isSubmitting
                                            ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        }`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 1.1 }}
                                    viewport={{ once: true }}
                                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
