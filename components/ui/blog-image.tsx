"use client"

import Image from 'next/image'
import { getImageUrl, isGridFSImage } from '@/lib/image-utils'

interface BlogImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
}

export function BlogImage({ src, alt, fill, className, width, height, priority, sizes }: BlogImageProps) {
  const imageUrl = getImageUrl(src)
  const isGridFS = isGridFSImage(imageUrl)
  
  // Default sizes for fill images
  const defaultSizes = fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw" : undefined
  
  // For GridFS images, we need to handle them differently
  // Next.js Image component works better with external URLs
  if (isGridFS) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes || defaultSizes}
        className={className}
        priority={priority}
        unoptimized // Disable Next.js optimization for GridFS images
      />
    )
  }
  
  // For public folder images, use normal Next.js Image optimization
  return (
    <Image
      src={imageUrl}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes || defaultSizes}
      className={className}
      priority={priority}
    />
  )
}
