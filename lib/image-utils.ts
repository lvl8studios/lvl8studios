/**
 * Utility functions for handling blog post images
 * Supports both public folder images and GridFS images
 */

export function getImageUrl(imagePath: string): string {
  // If it's already a full URL or starts with /api/images, return as is
  if (imagePath.startsWith('http') || imagePath.startsWith('/api/images/')) {
    return imagePath
  }
  
  // If it starts with /, it's a public folder image
  if (imagePath.startsWith('/')) {
    return imagePath
  }
  
  // Otherwise, assume it's a public folder image and add the leading slash
  return `/${imagePath}`
}

export function isGridFSImage(imagePath: string): boolean {
  return imagePath.startsWith('/api/images/')
}

export function isPublicImage(imagePath: string): boolean {
  return imagePath.startsWith('/') && !imagePath.startsWith('/api/images/')
}
