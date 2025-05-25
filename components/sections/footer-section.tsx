"use client"

import { motion } from "framer-motion"
import { COMPANY } from "@/lib/constants"

export function FooterSection() {
    return (
        <footer className="py-12 border-t border-border">
            <div className="container mx-auto px-6 text-center">
                <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    © 2025 {COMPANY.name}. All rights reserved.
                </motion.p>
            </div>
        </footer>
    )
}
