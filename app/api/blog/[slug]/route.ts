import { NextRequest, NextResponse } from 'next/server'
import { getBlogPostById } from '@/lib/blog-db'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getBlogPostById(params.slug)
    
    if (!post || !post.published) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
