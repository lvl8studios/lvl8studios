import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { GridFSBucket, ObjectId } from 'mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await params
    
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid image ID' },
        { status: 400 }
      )
    }

    // Get database connection
    const db = await getDatabase()
    const bucket = new GridFSBucket(db, { bucketName: 'blog_images' })

    // Check if file exists
    const fileId = new ObjectId(id)
    const files = await bucket.find({ _id: fileId }).toArray()
    
    if (files.length === 0) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    const file = files[0]
    
    // Create download stream
    const downloadStream = bucket.openDownloadStream(fileId)
    
    // Convert stream to buffer
    const chunks: Buffer[] = []
    
    return new Promise<Response>((resolve, reject) => {
      downloadStream.on('data', (chunk) => {
        chunks.push(chunk)
      })
      
      downloadStream.on('end', () => {
        const buffer = Buffer.concat(chunks)
        
        // Return image with proper headers
        const response = new Response(buffer, {
          status: 200,
          headers: {
            'Content-Type': file.metadata?.contentType || 'image/jpeg',
            'Content-Length': buffer.length.toString(),
            'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
            'ETag': `"${file._id.toString()}"`,
          }
        })
        
        resolve(response)
      })
      
      downloadStream.on('error', (error) => {
        console.error('Download error:', error)
        reject(NextResponse.json(
          { error: 'Failed to download image' },
          { status: 500 }
        ))
      })
    })
    
  } catch (error) {
    console.error('Image serving error:', error)
    return NextResponse.json(
      { error: 'Failed to serve image' },
      { status: 500 }
    )
  }
}
