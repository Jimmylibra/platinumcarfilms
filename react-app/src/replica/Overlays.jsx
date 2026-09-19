import { useEffect, useRef, useState } from 'react'
import StaticForm from './StaticForm'
import Icon from './Icon'

function Dialog({ label, close, children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog?.close(); document.body.style.overflow = overflow; previous?.focus() }
  }, [])
  return <dialog ref={ref} aria-label={label} className={`replica-dialog ${className}`} onCancel={event => { event.preventDefault(); close() }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close() } }}><button className="replica-dialog-close" aria-label="Close dialog" onClick={close}><Icon name="close" /></button>{children}</dialog>
}

export function QuoteDialog({ close }) {
  return <Dialog label="Request a quote" close={close}><h2>Request a Quote</h2><p>Tell us what you need. Find the right film for your business.</p><StaticForm kind="inquiry" /></Dialog>
}

export function Lightbox({ images, initial, close }) {
  const [index, setIndex] = useState(Math.max(0, images.findIndex(image => image.src === initial)))
  const move = (step) => setIndex(current => (current + step + images.length) % images.length)
  useEffect(() => {
    const keydown = (event) => {
      if (event.key === 'ArrowRight') setIndex(current => (current + 1) % images.length)
      if (event.key === 'ArrowLeft') setIndex(current => (current + images.length - 1) % images.length)
    }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [images.length])
  const image = images[index]
  if (!image) return null
  return <Dialog label="Image gallery" close={close} className="replica-lightbox"><figure><img src={image.src} alt={image.alt} /><figcaption aria-live="polite">{index + 1} / {images.length}</figcaption></figure>{images.length > 1 && <><button className="replica-lightbox-previous" aria-label="Previous image" onClick={() => move(-1)}><Icon name="left" size={28} /></button><button className="replica-lightbox-next" aria-label="Next image" onClick={() => move(1)}><Icon name="right" size={28} /></button></>}</Dialog>
}

export function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false)
  return <><div className="replica-floating-actions"><button className="replica-scroll-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><Icon name="up" /></button><button className="replica-chat-toggle" aria-label={chatOpen ? 'Close WhatsApp options' : 'Chat on WhatsApp'} aria-expanded={chatOpen} onClick={() => setChatOpen(!chatOpen)}><Icon name={chatOpen ? 'close' : 'chat'} size={28} /></button></div>{chatOpen && <aside className="replica-chat-panel" aria-label="WhatsApp contact"><h3>Platinum Car Films</h3><p>Need help with paint protection film?</p><a href="https://wa.me/8618122458657" target="_blank" rel="noopener noreferrer" className="replica-button">Open WhatsApp</a></aside>}</>
}
