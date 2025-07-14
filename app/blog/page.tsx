"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { BLOG_POSTS } from "@/lib/constants"
import { NavbarDemo } from "@/components/navbar"

function BlogCard({ post, index }: { post: (typeof BLOG_POSTS)[number], index: number }) {
    return (
        <motion.article
            className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            whileHover={{ y: -8 }}
        >
            <Link href={`/blog/${post.id}`} className="block">
                <div className="md:flex md:items-center md:gap-8 p-8">
                    {/* Image Section */}
                    <div className="md:w-1/3 mb-6 md:mb-0">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="md:w-2/3">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-sm font-medium text-muted-foreground">{post.publishedAt}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm font-medium text-muted-foreground">{post.readTime}</span>
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                        </h2>
                        
                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed line-clamp-3">
                            {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-foreground">
                                    {post.author}
                                </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                {post.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background">
            <NavbarDemo />
            
            <main className="pt-20">
                <div className="container mx-auto px-6 py-16">
                    <div className="max-w-6xl mx-auto">
                        {/* Page Header */}
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                                Blog
                            </h1>
                            <motion.div
                                className="mx-auto w-32 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full mb-8"
                                initial={{ width: 0 }}
                                whileInView={{ width: 128 }}
                                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                                viewport={{ once: true }}
                            />
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                Insights, stories, and updates from the lvl8studios team.
                            </p>
                        </motion.div>

                        {/* Blog Posts Feed */}
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                className="space-y-8"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                {BLOG_POSTS.map((post, index) => (
                                    <BlogCard key={post.id} post={post} index={index} />
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
