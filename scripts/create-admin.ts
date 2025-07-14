import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local FIRST
config({ path: resolve(process.cwd(), '.env.local') })

// Now import the database functions
import { createAdminUser } from '../lib/blog-db'

async function createInitialAdmin() {
  try {
    // Check if MONGODB_URI is loaded
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set!')
      console.log('Please make sure you have a .env.local file with MONGODB_URI')
      process.exit(1)
    }

    const username = 'admin'
    const password = 'lvl8studios2025!'
    
    console.log('🔄 Creating admin user...')
    await createAdminUser(username, password)
    console.log('✅ Initial admin user created successfully!')
    console.log('Username:', username)
    console.log('Password:', password)
    console.log('⚠️  Remember to change the password after first login!')
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    if (error instanceof Error && error.message?.includes('auth')) {
      console.log('💡 This might be a MongoDB authentication issue. Please check:')
      console.log('   - Your MongoDB URI in .env.local')
      console.log('   - Your MongoDB Atlas username and password')
      console.log('   - Network access settings in MongoDB Atlas')
    }
  }
  
  process.exit(0)
}

createInitialAdmin()
