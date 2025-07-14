export interface BlogPost {
  _id?: string
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  readTime: string
  tags: string[]
  image: string
  createdAt?: Date
  updatedAt?: Date
  published: boolean
}

export interface AdminUser {
  _id?: string
  username: string
  passwordHash: string
  createdAt?: Date
}
