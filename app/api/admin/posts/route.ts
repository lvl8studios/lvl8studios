import { NextRequest, NextResponse } from 'next/server'
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/blog-db'
import { BlogPost } from '@/types/blog'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publishedOnly = searchParams.get('published') !== 'false'
    
    const posts = await getBlogPosts(publishedOnly)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json()
    
    // Generate a URL-friendly ID from the title
    const id = postData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
    
    const post: Omit<BlogPost, '_id' | 'createdAt' | 'updatedAt'> = {
      id,
      title: postData.title,
      excerpt: postData.excerpt,
      content: postData.content,
      author: postData.author,
      publishedAt: postData.publishedAt,
      readTime: postData.readTime,
      tags: postData.tags || [],
      image: postData.image,
      published: postData.published || false
    }
    
    const newPost = await createBlogPost(post)
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 })
    }
    
    const updatedPost = await updateBlogPost(id, updates)
    
    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 })
    }
    
    const success = await deleteBlogPost(id)
    
    if (!success) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
