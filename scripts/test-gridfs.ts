import { config } from 'dotenv'
import { MongoClient, GridFSBucket, ObjectId } from 'mongodb'

config({ path: '.env.local' })

async function testGridFS() {
  const client = new MongoClient(process.env.MONGODB_URI!)
  
  try {
    await client.connect()
    console.log('✅ Connected to MongoDB')
    
    const db = client.db('lvl8studios')
    const bucket = new GridFSBucket(db, { bucketName: 'blog_images' })
    
    // List all files in GridFS
    console.log('\n📁 Files in GridFS:')
    const files = await bucket.find({}).toArray()
    console.log(`Found ${files.length} files`)
    
    files.forEach((file, index) => {
      console.log(`  ${index + 1}. ID: ${file._id}`)
      console.log(`     Filename: ${file.filename}`)
      console.log(`     Size: ${file.length} bytes`)
      console.log(`     Content Type: ${file.metadata?.contentType || 'unknown'}`)
      console.log(`     Upload Date: ${file.uploadDate}`)
      console.log('')
    })
    
    // Test specific IDs from the error logs
    const testIds = [
      '6874a449f2f99d52749cf85f',
      '6874a449f2f99d52749cf85c', 
      '6874a449f2f99d52749cf854'
    ]
    
    console.log('\n🔍 Testing specific IDs:')
    for (const id of testIds) {
      try {
        if (!ObjectId.isValid(id)) {
          console.log(`❌ Invalid ObjectId: ${id}`)
          continue
        }
        
        const fileId = new ObjectId(id)
        const file = await bucket.find({ _id: fileId }).toArray()
        
        if (file.length > 0) {
          console.log(`✅ Found file with ID ${id}: ${file[0].filename}`)
        } else {
          console.log(`❌ No file found with ID ${id}`)
        }
      } catch (error) {
        console.log(`❌ Error testing ID ${id}:`, error)
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await client.close()
  }
}

testGridFS()
