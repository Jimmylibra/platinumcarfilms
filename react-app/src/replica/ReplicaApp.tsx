import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContentRenderer from './ContentRenderer'
import SiteHeader from './SiteHeader'
import { FloatingActions, Lightbox, QuoteDialog } from './Overlays'
import { InteractionContext } from './InteractionContext'
import { MissingPage, SearchResults } from './UtilityPages'
import type { ContentNode, GalleryImage, PageData, PageEntry, SharedData } from './types'
import './replica.css'

const cache = new Map<string, PageData>()
function galleryImages(node: ContentNode): GalleryImage[] {
  if (typeof node === 'string') return []
  if (node.kind === 'gallery-item' && node.fullImage) return [{ src: node.fullImage, thumbnail: node.thumbnail, alt: node.title || 'Platinum Car Films gallery' }]
  return node.children.flatMap(galleryImages)
}

function PageStyles({ page, shared }: { page: PageData | null; shared: SharedData }) {
  useEffect(() => {
    const urls = [...new Set([...shared.styles, ...(page?.styles || [])])]
    const elements: HTMLLinkElement[] = []
    const marker = document.querySelector('style[data-react-adaptation], link[data-react-adaptation]') || document.head.querySelector('style, link[rel="stylesheet"]')
    for (const href of urls) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'; link.href = href; link.dataset.sourceCss = 'true'
      document.head.insertBefore(link, marker)
      elements.push(link)
    }
    return () => { elements.forEach(element => element.remove()) }
  }, [page, shared])
  return page ? <style>{page.css}</style> : null
}

export default function ReplicaApp() {
  const location = useLocation()
  const [entries, setEntries] = useState<PageEntry[]>([])
  const [shared, setShared] = useState<SharedData | null>(null)
  const [page, setPage] = useState<PageData | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)
  const route = location.pathname === '/' ? '/' : `/${location.pathname.split('/').filter(Boolean).join('/')}/`
  const search = new URLSearchParams(location.search).has('s')
  const entry = entries.find(item => item.route === route)

  useEffect(() => {
    const controller = new AbortController()
    Promise.all(['/content/index.json', '/content/shared.json'].map(url => fetch(url, { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error('Content unavailable')
      return response.json()
    }))).then(([index, sharedContent]) => { setEntries(index as PageEntry[]); setShared(sharedContent as SharedData) }).catch(error => { if (error.name !== 'AbortError') { setError(true); setLoading(false) } })
    return () => controller.abort()
  }, [])

  // Synchronize route changes with the local content cache and abortable fetch.
  /* oxlint-disable react/set-state-in-effect */
  useEffect(() => {
    if (!shared) return
    setError(false)
    if (!entry || entry.legacy || search) { setPage(null); setLoading(false); return }
    const controller = new AbortController()
    const cached = cache.get(entry.file)
    if (cached) { setPage(cached); setLoading(false); return }
    setLoading(true); setError(false); setPage(null)
    fetch(entry.file, { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error('Page unavailable')
      return response.json() as Promise<PageData>
    }).then(data => { cache.set(entry.file, data); setPage(data); setLoading(false) }).catch(error => {
      if (error.name !== 'AbortError') { setError(true); setLoading(false) }
    })
    return () => controller.abort()
  }, [entry, search, shared])
  /* oxlint-enable react/set-state-in-effect */

  useEffect(() => {
    document.body.className = `${page?.bodyClasses || 'page'} replica-site`
    document.title = search ? 'Search | Platinum Car Films' : page?.title || 'Platinum Car Films'
    document.querySelector('meta[name="description"]')?.setAttribute('content', page?.description || 'Paint protection film, window tint, and OEM solutions from Platinum Car Films.')
  }, [page, search])

  useEffect(() => {
    if (loading) return
    if (location.hash) {
      let fragment = location.hash.slice(1)
      try { fragment = decodeURIComponent(fragment) } catch { /* Keep a malformed fragment literal. */ }
      document.getElementById(fragment)?.scrollIntoView()
    }
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, location.search, location.hash, loading])

  const images = page ? galleryImages(page.content) : []
  const lightboxImages = lightbox && !images.some(image => image.src === lightbox.src) ? [lightbox] : images
  return <InteractionContext.Provider value={{ openQuote: () => setQuoteOpen(true), openGallery: setLightbox }}>
    <a className="replica-skip-link" href="#main-content">Skip to content</a>
    {shared && <><PageStyles page={page} shared={shared} /><SiteHeader logo={shared.logo} /></>}
    <div className="website-wrapper replica-website">
      {error ? <main id="main-content" className="replica-utility"><h1>Unable to load this page</h1><p>Please refresh to try again.</p><button className="replica-button" onClick={() => window.location.reload()}>Try again</button></main> : loading ? <main id="main-content" className="replica-loading" role="status">Loading Platinum Car Films…</main> : search ? <SearchResults entries={entries} /> : entry?.legacy ? <MissingPage legacy /> : page ? <ContentRenderer key={page.route} node={page.content} /> : <MissingPage />}
      {shared && <ContentRenderer node={shared.footer} />}
    </div>
    <FloatingActions />
    {quoteOpen && <QuoteDialog close={() => setQuoteOpen(false)} />}
    {lightbox && <Lightbox images={lightboxImages} initial={lightbox.src} close={() => setLightbox(null)} />}
  </InteractionContext.Provider>
}
