"use client"

import { useEffect } from 'react'
import { useBlogPrefetch } from '@/hooks/use-blog-prefetch'

export function BlogPrefetcher() {
  const { prefetchBlogPosts } = useBlogPrefetch()

  useEffect(() => {
    // Start prefetching blog posts when the app loads
    prefetchBlogPosts()
  }, [prefetchBlogPosts])

  return null // This component doesn't render anything
}
