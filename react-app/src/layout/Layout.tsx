import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { InteractionContext } from '../replica/InteractionContext'
import { QuoteDialog, Lightbox, FloatingActions } from '../replica/Overlays'
import type { GalleryImage } from '../replica/types'

export default function Layout() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [gallery, setGallery] = useState<{ images: GalleryImage[]; initial: string } | null>(null)

  return (
    <InteractionContext.Provider
      value={{
        openQuote: () => setQuoteOpen(true),
        openGallery: (image) => setGallery({ images: [image], initial: image.src }),
      }}
    >
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      {quoteOpen && <QuoteDialog close={() => setQuoteOpen(false)} />}
      {gallery && (
        <Lightbox images={gallery.images} initial={gallery.initial} close={() => setGallery(null)} />
      )}
    </InteractionContext.Provider>
  )
}
