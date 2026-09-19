import { createContext, useContext } from 'react'
import type { GalleryImage } from './types'

export const InteractionContext = createContext<{
  openQuote: () => void
  openGallery: (image: GalleryImage) => void
}>({ openQuote: () => {}, openGallery: () => {} })
export const useInteractions = () => useContext(InteractionContext)
