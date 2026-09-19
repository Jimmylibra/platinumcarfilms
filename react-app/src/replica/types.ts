export type ContentNode = string | {
  tag: string
  attrs: Record<string, string>
  children: ContentNode[]
  kind?: 'quote' | 'accordion' | 'search' | 'inquiry' | 'newsletter' | 'slider' | 'gallery-item'
  title?: string
  fullImage?: string
  thumbnail?: string
}

export interface PageData {
  route: string
  title: string
  description: string
  bodyClasses: string
  styles: string[]
  css: string
  content: ContentNode
}

export interface PageEntry {
  route: string
  title: string
  description: string
  searchText: string
  image: string
  file: string
  legacy: boolean
}

export interface SharedData { footer: ContentNode; logo: string; styles: string[] }
export interface GalleryImage { src: string; thumbnail?: string; alt: string }
