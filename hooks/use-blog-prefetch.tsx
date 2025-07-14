"use client"

import { useState, useEffect, useCallback } from 'react'
import { BlogPost } from '@/types/blog'

// Global cache for blog posts
let blogPostsCache: BlogPost[] | null = null
let blogPostsPromise: Promise<BlogPost[]> | null = null

export function useBlogPrefetch() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBlogPosts = useCallback(async (): Promise<BlogPost[]> => {
    // Return cached posts if available
    if (blogPostsCache) {
      return blogPostsCache
    }

    // Return existing promise if already fetching
    if (blogPostsPromise) {
      return blogPostsPromise
    }

    // Create new fetch promise
    blogPostsPromise = fetch('/api/blog')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts')
        }
        return response.json()
      })
      .then(data => {
        blogPostsCache = data
        return data
      })
      .catch(error => {
        blogPostsPromise = null // Reset promise on error
        throw error
      })

    return blogPostsPromise
  }, [])

  // Prefetch function to start loading posts
  const prefetchBlogPosts = useCallback(async () => {
    try {
      await fetchBlogPosts()
    } catch (error) {
      console.error('Error prefetching blog posts:', error)
    }
  }, [fetchBlogPosts])

  // Get posts (from cache or fetch)
  const getBlogPosts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const posts = await fetchBlogPosts()
      setPosts(posts)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch posts')
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }, [fetchBlogPosts])

  // Get posts from cache immediately if available
  useEffect(() => {
    if (blogPostsCache) {
      setPosts(blogPostsCache)
      setIsLoading(false)
    }
  }, [])

  // Clear cache function (useful for admin operations)
  const clearBlogCache = useCallback(() => {
    blogPostsCache = null
    blogPostsPromise = null
  }, [])

  return {
    posts,
    isLoading,
    error,
    prefetchBlogPosts,
    getBlogPosts,
    clearBlogCache,
    isCached: !!blogPostsCache
  }
}
