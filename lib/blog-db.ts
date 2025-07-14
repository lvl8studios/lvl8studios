import clientPromise from './mongodb'
import { BlogPost, AdminUser } from '@/types/blog'
import bcrypt from 'bcryptjs'

export async function getBlogPosts(publishedOnly: boolean = true): Promise<BlogPost[]> {
  const client = await clientPromise
  const db = client.db('lvl8studios')
  const collection = db.collection<BlogPost>('blog_posts')
  
  const filter = publishedOnly ? { published: true } : {}
  const posts = await collection
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray()
  
  return posts.map(post => ({
    ...post,
    _id: post._id?.toString()
  }))
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const client = await clientPromise
  const db = client.db('lvl8studios')
  const collection = db.collection<BlogPost>('blog_posts')
  
  const post = await collection.findOne({ id })
  if (!post) return null
  
  return {
    ...post,
    _id: post._id?.toString()
  }
}

export async function createBlogPost(post: Omit<BlogPost, '_id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
  const client = await clientPromise
  const db = client.db('lvl8studios')
  const collection = db.collection<BlogPost>('blog_posts')
  
  const newPost = {
    ...post,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  const result = await collection.insertOne(newPost)
  
  return {
    ...newPost,
    _id: result.insertedId.toString()
  }
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const client = await clientPromise
  const db = client.db('lvl8studios')
  const collection = db.collection<BlogPost>('blog_posts')
  
  const result = await collection.findOneAndUpdate(
    { id },
    { 
      $set: { 
        ...updates, 
        updatedAt: new Date() 
      } 
    },
    { returnDocument: 'after' }
  )
  
  if (!result) return null
  
  return {
    ...result,
    _id: result._id?.toString()
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const client = await clientPromise
  const db = client.db('lvl8studios')
  const collection = db.collection<BlogPost>('blog_posts')
  
  const result = await collection.deleteOne({ id })
  return result.deletedCount > 0
}

export async function authenticateAdmin(username: string, password: string): Promise<boolean> {
  const client = await clientPromise
  const db = client.db('lvl8studios')
  const collection = db.collection<AdminUser>('admin_users')
  
  const user = await collection.findOne({ username })
  if (!user) return false
  
  return bcrypt.compare(password, user.passwordHash)
}

export async function createAdminUser(username: string, password: string): Promise<AdminUser> {
  const client = await clientPromise
  const db = client.db('lvl8studios')
  const collection = db.collection<AdminUser>('admin_users')
  
  const passwordHash = await bcrypt.hash(password, 12)
  
  const newUser = {
    username,
    passwordHash,
    createdAt: new Date()
  }
  
  const result = await collection.insertOne(newUser)
  
  return {
    ...newUser,
    _id: result.insertedId.toString()
  }
}
