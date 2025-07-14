import { config } from 'dotenv'
import { resolve } from 'path'
import { MongoClient, GridFSBucket } from 'mongodb'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { BLOG_POSTS } from '../lib/constants'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

async function migratePostsWithImages() {
  const uri = process.env.MONGODB_URI
  
  if (!uri) {
    console.error('❌ MONGODB_URI not found')
    return
  }
  
  console.log('🔍 Starting migration with image upload...')
  
  const client = new MongoClient(uri)
  
  try {
    await client.connect()
    console.log('✅ Connected to MongoDB Atlas')
    
    const db = client.db('lvl8studios')
    const postsCollection = db.collection('blog_posts')
    const bucket = new GridFSBucket(db, { bucketName: 'blog_images' })
    
    // Step 1: Remove all existing blog posts
    console.log('🗑️ Removing existing blog posts...')
    const deleteResult = await postsCollection.deleteMany({})
    console.log(`   Deleted ${deleteResult.deletedCount} existing posts`)
    
    // Step 2: Migrate each post with image upload
    console.log('📤 Migrating posts with image upload...')
    
    for (const post of BLOG_POSTS) {
      console.log(`\n📝 Processing post: ${post.title}`)
      
      let imageUrl: string = post.image
      
      // Check if image starts with "/" (public folder reference)
      if (post.image.startsWith('/')) {
        const imagePath = join(process.cwd(), 'public', post.image.substring(1))
        console.log(`   📸 Image path: ${imagePath}`)
        
        if (existsSync(imagePath)) {
          try {
            // Read the image file
            const imageBuffer = readFileSync(imagePath)
            const imageName = post.image.substring(1) // Remove leading slash
            
            // Determine content type based on file extension
            const extension = imageName.split('.').pop()?.toLowerCase()
            let contentType = 'application/octet-stream'
            
            switch (extension) {
              case 'png':
                contentType = 'image/png'
                break
              case 'jpg':
              case 'jpeg':
                contentType = 'image/jpeg'
                break
              case 'gif':
                contentType = 'image/gif'
                break
              case 'webp':
                contentType = 'image/webp'
                break
            }
            
            // Upload to GridFS
            console.log(`   ⬆️ Uploading ${imageName} to GridFS...`)
            const uploadStream = bucket.openUploadStream(imageName, {
              metadata: {
                originalName: imageName,
                uploadedAt: new Date(),
                postId: post.id,
                contentType: contentType
              }
            })
            
            // Write buffer to GridFS
            await new Promise<string>((resolve, reject) => {
              uploadStream.on('error', reject)
              uploadStream.on('finish', () => {
                resolve(uploadStream.id.toString())
              })
              uploadStream.end(imageBuffer)
            })
            
            // Update image URL to use GridFS endpoint
            imageUrl = `/api/images/${uploadStream.id}`
            console.log(`   ✅ Image uploaded with ID: ${uploadStream.id}`)
            
          } catch (error) {
            console.error(`   ❌ Failed to upload image ${post.image}:`, error)
            // Keep original URL if upload fails
          }
        } else {
          console.warn(`   ⚠️ Image file not found: ${imagePath}`)
        }
      }
      
      // Insert the post with the new image URL
      const postData = {
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: imageUrl,
        author: post.author,
        publishedAt: post.publishedAt,
        readTime: post.readTime,
        tags: post.tags,
        published: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      await postsCollection.insertOne(postData)
      console.log(`   ✅ Post inserted with image: ${imageUrl}`)
    }
    
    console.log('\n🎉 Migration completed successfully!')
    
    // Verify the migration
    const posts = await postsCollection.find({}).toArray()
    console.log(`\n📊 Verification - Total posts: ${posts.length}`)
    posts.forEach((post, index) => {
      console.log(`  ${index + 1}. ${post.title} - Image: ${post.image}`)
    })
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  } finally {
    await client.close()
  }
}

migratePostsWithImages()
