import { NextRequest, NextResponse } from 'next/server'
import { createBlogPost } from '@/lib/blog-db'
import { BLOG_POSTS } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    // Check if this is a development environment for security
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 })
    }

    // Migrate all posts from constants to database
    const results = []
    
    for (const post of BLOG_POSTS) {
      try {
        const newPost = await createBlogPost({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          publishedAt: post.publishedAt,
          readTime: post.readTime,
          tags: [...post.tags],
          image: post.image,
          published: true
        })
        results.push({ success: true, post: newPost.title })
      } catch (error) {
        results.push({ success: false, post: post.title, error: (error as Error).message })
      }
    }

    return NextResponse.json({
      message: 'Migration completed',
      results
    })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 })
  }
}
