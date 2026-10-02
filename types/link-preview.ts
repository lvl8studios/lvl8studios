export interface LinkPreviewMetadata {
  url: string
  title: string
  description: string
  siteName: string
  image?: string
}

export type LinkPreviewMap = Record<string, LinkPreviewMetadata>
