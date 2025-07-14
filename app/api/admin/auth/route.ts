import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/blog-db'
import { sign } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 })
    }
    
    const isValid = await authenticateAdmin(username, password)
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    // Create JWT token
    const token = sign(
      { username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    )
    
    const response = NextResponse.json({ success: true })
    
    // Set HTTP-only cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
    
    return response
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
