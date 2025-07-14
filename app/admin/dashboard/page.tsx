"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Calendar, 
  Clock, 
  Tag,
  Save,
  X
} from 'lucide-react'
import { BlogPost } from '@/types/blog'
import { useBlogPrefetch } from '@/hooks/use-blog-prefetch'

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    publishedAt: '',
    readTime: '',
    tags: '',
    image: '',
    published: false
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()
  const { clearBlogCache } = useBlogPrefetch()

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('admin-authenticated')
    if (!isAuthenticated) {
      router.push('/admin')
      return
    }

    fetchPosts()
  }, [router])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts?published=false')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Upload image first if a new file is selected
      let imageUrl = formData.image
      if (selectedFile) {
        const uploadedUrl = await uploadImage()
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        } else {
          setIsLoading(false)
          return // Stop if upload failed
        }
      }

      const postData = {
        ...formData,
        image: imageUrl,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      }

      const url = editingPost ? '/api/admin/posts' : '/api/admin/posts'
      const method = editingPost ? 'PUT' : 'POST'
      
      if (editingPost) {
        (postData as any).id = editingPost.id
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        await fetchPosts()
        clearBlogCache() // Clear the blog cache so the public blog page shows updated data
        resetForm()
      }
    } catch (error) {
      console.error('Error saving post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      tags: post.tags.join(', '),
      image: post.image,
      published: post.published
    })
    setSelectedFile(null)
    setImagePreview(post.image)
    setShowNewPostForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`/api/admin/posts?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchPosts()
        clearBlogCache() // Clear the blog cache so the public blog page shows updated data
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      publishedAt: '',
      readTime: '',
      tags: '',
      image: '',
      published: false
    })
    setSelectedFile(null)
    setImagePreview(null)
    setEditingPost(null)
    setShowNewPostForm(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin-authenticated')
    router.push('/admin')
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedFile) return null
    
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error('Upload failed')
      }
      
      const data = await response.json()
      return data.imageUrl
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
      return null
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Blog Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowNewPostForm(true)}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Post
              </button>
              <button
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* New/Edit Post Form */}
        {showNewPostForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h2>
              <button
                onClick={resetForm}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Published Date
                  </label>
                  <input
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="5 min read"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="React, Next.js, TypeScript"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Featured Image
                  </label>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-xs h-32 object-cover rounded-lg border border-border"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null)
                            setSelectedFile(null)
                            setFormData({ ...formData, image: '' })
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Content (Markdown)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Published</span>
                </label>

                <button
                  type="submit"
                  disabled={isLoading || isUploading}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isUploading ? 'Uploading...' : isLoading ? 'Saving...' : editingPost ? 'Update Post' : 'Create Post'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">All Posts</h2>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts yet. Create your first post!</p>
            </div>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
                      <div className="flex items-center gap-1">
                        {post.published ? (
                          <Eye className="w-4 h-4 text-green-500" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.publishedAt}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {post.tags.join(', ')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
