"use client"

import { use, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BlogPost } from "@/types/blog"
import { NavbarDemo } from "@/components/navbar"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = use(params)
    const [post, setPost] = useState<BlogPost | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchPost()
    }, [slug])

    const fetchPost = async () => {
        try {
            const response = await fetch(`/api/blog/${slug}`)
            if (response.ok) {
                const data = await response.json()
                setPost(data)
            } else if (response.status === 404) {
                notFound()
            }
        } catch (error) {
            console.error('Error fetching post:', error)
            notFound()
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <NavbarDemo />
                <div className="pt-20 flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading post...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            <NavbarDemo />
            
            <main className="pt-20">
                <div className="container mx-auto px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blog
                            </Link>
                        </motion.div>

                        {/* Hero Image */}
                        <motion.div
                            className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Article Header */}
                        <motion.header
                            className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                                {post.title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{post.publishedAt}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-6">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {post.excerpt}
                            </p>
                        </motion.header>

                        {/* Article Content */}
                        <motion.article
                            className="text-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <MarkdownRenderer content={post.content} />
                        </motion.article>

                        {/* Back to Blog Footer */}
                        <motion.div
                            className="mt-16 pt-8 border-t border-border"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Read More Posts
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    )
}
