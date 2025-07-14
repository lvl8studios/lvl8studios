import { MongoClient, GridFSBucket } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

async function checkPosts() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('lvl8studios');
    const postsCollection = db.collection('blog_posts');

    // Check current posts
    const posts = await postsCollection.find({}).toArray();
    console.log(`📊 Current blog posts in collection: ${posts.length}`);
    
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (${post.slug})`);
      console.log(`   Image: ${post.image || 'No image'}`);
      console.log(`   Created: ${post.createdAt || 'No date'}`);
      console.log('');
    });

    // Check GridFS files
    const bucket = new GridFSBucket(db, { bucketName: 'images' });
    const files = await bucket.find({}).toArray();
    console.log(`📁 Current GridFS files: ${files.length}`);
    
    files.forEach((file, index) => {
      console.log(`${index + 1}. ${file.filename} (${file._id})`);
      console.log(`   Content Type: ${file.contentType || 'Unknown'}`);
      console.log(`   Upload Date: ${file.uploadDate}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

checkPosts();
