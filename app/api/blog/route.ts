import { NextRequest, NextResponse } from 'next/server'
import { getBlogPosts } from '@/lib/blog-db'

export async function GET(request: NextRequest) {
  try {
    const posts = await getBlogPosts(true) // Only published posts
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
