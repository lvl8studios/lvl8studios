import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { GridFSBucket, ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Get database connection
    const db = await getDatabase()
    const bucket = new GridFSBucket(db, { bucketName: 'blog_images' })

    // Create unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase()
    const filename = `blog-${timestamp}-${originalName}`

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to GridFS
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        contentType: file.type,
        uploadDate: new Date(),
        originalName: file.name,
        size: file.size
      }
    })

    // Write buffer to GridFS
    const fileId = await new Promise<ObjectId>((resolve, reject) => {
      uploadStream.end(buffer)
      uploadStream.on('finish', () => resolve(uploadStream.id as ObjectId))
      uploadStream.on('error', reject)
    })

    // Return the image URL (we'll create an endpoint to serve images)
    const imageUrl = `/api/images/${fileId.toString()}`
    
    return NextResponse.json({
      success: true,
      imageUrl,
      fileId: fileId.toString(),
      filename
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
