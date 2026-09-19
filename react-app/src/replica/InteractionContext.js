import { createContext, useContext } from 'react'

export const InteractionContext = createContext({ openQuote: () => {}, openGallery: () => {} })
export const useInteractions = () => useContext(InteractionContext)
