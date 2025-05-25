"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface Project {
    readonly title: string;
    readonly description: string;
    readonly src: string;
    readonly technologies: readonly string[];
    readonly category: string;
    readonly button: string;
    readonly projectLink?: string;
    readonly githubLink?: string;
    readonly liveDemo?: string;
    readonly features?: readonly {
        readonly title: string;
        readonly description: string;
        readonly color: string;
    }[];
}

interface ExpandableProjectCardsProps {
    projects: readonly Project[];
}

export default function ExpandableProjectCards({ projects }: ExpandableProjectCardsProps) {
    const [active, setActive] = useState<Project | boolean | null>(null);
    const id = useId();
    const ref = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800"
                        >
                            {/* Hero Image */}
                            <motion.div layoutId={`image-${active.title}-${id}`} className="relative">
                                <img
                                    width={600}
                                    height={300}
                                    src={active.src}
                                    alt={active.title}
                                    className="w-full h-64 lg:h-72 sm:rounded-tr-3xl sm:rounded-tl-3xl object-cover object-center"
                                />
                                {/* Gradient overlay for better text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </motion.div>

                            <div className="flex-1 overflow-auto">
                                {/* Header Section */}
                                <div className="p-6 border-b border-neutral-100 dark:border-neutral-800">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                        <div className="flex-1">
                                            <motion.h3
                                                layoutId={`title-${active.title}-${id}`}
                                                className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 mb-2"
                                            >
                                                {active.title}
                                            </motion.h3>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                                                    {active.category}
                                                </span>
                                            </div>
                                            <motion.p
                                                layoutId={`description-${active.description}-${id}`}
                                                className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed"
                                            >
                                                {active.description}
                                            </motion.p>
                                        </div>

                                        <motion.a
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            href={active.projectLink || active.liveDemo || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105"
                                        >
                                            {active.button}
                                        </motion.a>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        className="space-y-6"
                                    >
                                        {/* Technologies Section */}
                                        <div>
                                            <h4 className="font-semibold text-lg text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                Technologies Used
                                            </h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {active.technologies.map((tech, index) => (
                                                    <motion.span
                                                        key={tech}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        className="px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg border border-neutral-200 dark:border-neutral-700 font-medium text-center hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Project Features */}
                                        {active.features && active.features.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-lg text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                    Key Features
                                                </h4>
                                                <div className="grid gap-3">
                                                    {active.features.map((feature, index) => {
                                                        const colorClasses = {
                                                            green: "bg-green-500",
                                                            blue: "bg-blue-500",
                                                            purple: "bg-purple-500",
                                                            orange: "bg-orange-500",
                                                            red: "bg-red-500",
                                                            yellow: "bg-yellow-500"
                                                        };

                                                        return (
                                                            <motion.div
                                                                key={feature.title}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: index * 0.1 }}
                                                                className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
                                                            >
                                                                <div className={`w-2 h-2 ${colorClasses[feature.color as keyof typeof colorClasses] || 'bg-primary'} rounded-full mt-2 flex-shrink-0`}></div>
                                                                <div>
                                                                    <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">{feature.title}</p>
                                                                    <p className="text-xs text-neutral-600 dark:text-neutral-400">{feature.description}</p>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Project Links */}
                                        {(active.githubLink || active.liveDemo) && (
                                            <div>
                                                <h4 className="font-semibold text-lg text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                    Project Links
                                                </h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {active.githubLink && (
                                                        <motion.a
                                                            href={active.githubLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-neutral-700 text-white rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-600 transition-colors duration-200"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z" />
                                                            </svg>
                                                            <span className="text-sm font-medium">View Code</span>
                                                        </motion.a>
                                                    )}
                                                    {active.liveDemo && (
                                                        <motion.a
                                                            href={active.liveDemo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                            <span className="text-sm font-medium">Live Demo</span>
                                                        </motion.a>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            layoutId={`card-${project.title}-${id}`}
                            key={project.title}
                            onClick={() => setActive(project)}
                            className="group relative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden">
                                <motion.div layoutId={`image-${project.title}-${id}`}>
                                    <img
                                        width={400}
                                        height={250}
                                        src={project.src}
                                        alt={project.title}
                                        className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                </motion.div>
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-neutral-700 dark:text-neutral-300 rounded-full border border-white/20">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className="p-6">
                                <div className="space-y-3">
                                    <motion.h3
                                        layoutId={`title-${project.title}-${id}`}
                                        className="font-semibold text-lg text-neutral-800 dark:text-neutral-200 leading-tight"
                                    >
                                        {project.title}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`description-${project.description}-${id}`}
                                        className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3"
                                    >
                                        {project.description}
                                    </motion.p>
                                </div>

                                {/* Technologies Preview */}
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="px-2 py-1 text-xs text-neutral-500 dark:text-neutral-500">
                                            +{project.technologies.length - 3} more
                                        </span>
                                    )}
                                </div>

                                {/* Action Indicator */}
                                <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-primary">View Details</span>
                                        <motion.div
                                            className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <svg
                                                className="w-3 h-3 text-primary"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};
