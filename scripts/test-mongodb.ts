import { config } from 'dotenv'
import { resolve } from 'path'
import { MongoClient } from 'mongodb'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

async function testConnection() {
  const uri = process.env.MONGODB_URI
  
  if (!uri) {
    console.error('❌ MONGODB_URI not found')
    return
  }
  
  console.log('🔍 Testing MongoDB connection...')
  console.log('URI:', uri.replace(/\/\/.*:.*@/, '//***:***@')) // Hide credentials
  
  const client = new MongoClient(uri)
  
  try {
    // Connect to MongoDB
    await client.connect()
    console.log('✅ Connected to MongoDB Atlas successfully!')
    
    // Test database operations
    const db = client.db('lvl8studios')
    const collections = await db.listCollections().toArray()
    console.log('📁 Available collections:', collections.map(c => c.name))
    
    // Try to ping the database
    await db.admin().ping()
    console.log('🏓 Database ping successful!')
    
    // Check blog posts
    const postsCollection = db.collection('blog_posts')
    const posts = await postsCollection.find({}).toArray()
    console.log('📖 Blog posts in database:', posts.length)
    posts.forEach((post, index) => {
      console.log(`  ${index + 1}. ${post.title} (${post.slug}) - Image: ${post.image}`)
    })
    
  } catch (error) {
    console.error('❌ Connection failed:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('authentication failed')) {
        console.log('\n💡 Authentication Failed - Possible Issues:')
        console.log('1. Wrong username or password')
        console.log('2. User doesn\'t have proper permissions')
        console.log('3. Password contains special characters that need URL encoding')
        console.log('4. IP address not whitelisted in MongoDB Atlas')
      }
    }
  } finally {
    await client.close()
  }
}

testConnection()
