"use client";
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { GYATWORD_SECTION } from "@/lib/constants";

export function GyatWordSection() {
  return (
    <section id="gyatword" className="relative py-24 overflow-hidden bg-background">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-radial from-secondary/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header section */}
          <div className="text-center space-y-8 mb-[-200px]">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-foreground"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {GYATWORD_SECTION.title}
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
              {GYATWORD_SECTION.description}
            </motion.p>
          </div>

          {/* 3D Scroll Animation Container */}
          <div className="flex flex-col overflow-hidden">
            <ContainerScroll
              titleComponent={null}
            >
              <img
                src={GYATWORD_SECTION.images.desktop}
                alt={GYATWORD_SECTION.images.alt}
                height={720}
                width={1400}
                className="hidden sm:block w-full h-full rounded-xl object-contain object-center"
                draggable={false}
              />
              <img
                src={GYATWORD_SECTION.images.mobile}
                alt={GYATWORD_SECTION.images.alt}
                height={720}
                width={400}
                className="block sm:hidden w-full h-full rounded-xl object-contain object-center"
                draggable={false}
              />
            </ContainerScroll>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="text-center mt-[-200px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={GYATWORD_SECTION.buttons.primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ExternalLink className="w-4 h-4" />
                {GYATWORD_SECTION.buttons.primary.text}
              </motion.a>
              <motion.a
                href={GYATWORD_SECTION.buttons.secondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-muted text-muted-foreground hover:bg-muted/80 px-6 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ExternalLink className="w-4 h-4" />
                {GYATWORD_SECTION.buttons.secondary.text}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
