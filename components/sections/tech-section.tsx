"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { TECH_SECTION } from "@/lib/constants"

interface TechItemProps {
    name: string
    icon: string
    image: string
    delay?: number
}

function TechItem({ name, icon, image, delay = 0 }: TechItemProps) {
    return (
        <motion.div
            className="flex flex-col items-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <Image 
                    src={image}
                    alt={name}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
            </motion.div>
            <span className="text-sm font-medium text-foreground text-center">
                {name}
            </span>
        </motion.div>
    )
}

interface TechCategoryProps {
    title: string
    technologies: readonly { readonly name: string; readonly icon: string; readonly image: string }[]
    delay?: number
}

function TechCategory({ title, technologies, delay = 0 }: TechCategoryProps) {
    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <h3 className="text-xl font-semibold text-foreground text-center mb-6">
                {title}
            </h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {technologies.map((tech, index) => (
                    <TechItem
                        key={tech.name}
                        name={tech.name}
                        icon={tech.icon}
                        image={tech.image}
                        delay={delay + index * 0.1}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export function TechSection() {
    return (
        <section id="tech" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                            {TECH_SECTION.title}
                        </h2>
                        <motion.div
                            className="mx-auto w-24 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full mb-6"
                            initial={{ width: 0 }}
                            whileInView={{ width: 96 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        />
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {TECH_SECTION.description}
                        </p>
                    </motion.div>

                    {/* Tech Categories */}
                    <div className="space-y-16">
                        {/* DevOps Section */}
                        <TechCategory
                            title={TECH_SECTION.devops.title}
                            technologies={TECH_SECTION.devops.technologies}
                            delay={0.2}
                        />

                        {/* SWE Section */}
                        <TechCategory
                            title={TECH_SECTION.swe.title}
                            technologies={TECH_SECTION.swe.technologies}
                            delay={0.4}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
