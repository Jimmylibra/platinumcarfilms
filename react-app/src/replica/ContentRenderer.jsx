import { createElement, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInteractions } from './InteractionContext'
import StaticForm from './StaticForm'
import Icon from './Icon'

const voidTags = new Set(['area', 'base', 'br', 'col', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])
const attrNames = { class: 'className', for: 'htmlFor', tabindex: 'tabIndex', colspan: 'colSpan', rowspan: 'rowSpan', cellpadding: 'cellPadding', cellspacing: 'cellSpacing', frameborder: 'frameBorder', allowfullscreen: 'allowFullScreen', fetchpriority: 'fetchPriority', datetime: 'dateTime', viewbox: 'viewBox', 'stroke-width': 'strokeWidth', 'fill-rule': 'fillRule', 'clip-rule': 'clipRule', autocomplete: 'autoComplete', maxlength: 'maxLength' }

function reactProps(attrs) {
  const result = {}
  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith('on') || ['xmlns', 'xmlns:xlink', 'aria-hidden'].includes(key)) continue
    if (key === 'style') {
      const style = {}
      for (const declaration of value.split(';')) {
        const colon = declaration.indexOf(':')
        if (colon < 0) continue
        const property = declaration.slice(0, colon).trim()
        const camel = property.startsWith('--') ? property : property.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
        style[camel] = declaration.slice(colon + 1).replace(/!important/g, '').trim()
      }
      result.style = style
    } else if (['disabled', 'required', 'multiple', 'hidden'].includes(key)) result[key] = true
    else result[attrNames[key] || key] = value
  }
  return result
}

function children(nodes) {
  return nodes.map((node, index) => <ContentRenderer key={typeof node === 'string' ? index : node.attrs.id || index} node={node} />)
}

function BannerSlider({ nodes }) {
  const [index, setIndex] = useState(0)
  if (!nodes.length) return null
  return <section className="replica-banner-slider" aria-label="Platinum film highlights" aria-roledescription="carousel">
    <ContentRenderer node={nodes[index]} />
    {nodes.length > 1 && <div className="replica-slider-controls"><button aria-label="Previous banner" onClick={() => setIndex((index + nodes.length - 1) % nodes.length)}><Icon name="left" /></button><span aria-live="polite">{index + 1} / {nodes.length}</span><button aria-label="Next banner" onClick={() => setIndex((index + 1) % nodes.length)}><Icon name="right" /></button></div>}
  </section>
}

function MediaCarousel({ node }) {
  const scrollRef = useRef(null)
  return <div className="replica-media-carousel"><div ref={scrollRef} className="replica-media-track">{children(node.children)}</div><div className="replica-media-controls"><button aria-label="Previous images" onClick={() => scrollRef.current?.scrollBy({ left: -350, behavior: 'smooth' })}><Icon name="left" /></button><button aria-label="Next images" onClick={() => scrollRef.current?.scrollBy({ left: 350, behavior: 'smooth' })}><Icon name="right" /></button></div></div>
}

/** A source section is a React boundary that can later be replaced independently. */
export function SourceSection({ node }) {
  return createElement(node.tag, reactProps(node.attrs), children(node.children))
}

export default function ContentRenderer({ node }) {
  const { openQuote, openGallery } = useInteractions()
  if (typeof node === 'string') return node
  const classes = node.attrs.class?.split(' ') || []
  if (['script', 'iframe', 'noscript', 'object', 'embed'].includes(node.tag)) return null
  if (classes.some(c => ['wd-nav-arrows', 'wd-nav-pagin', 'wpcf7-spinner', 'screen-reader-response'].includes(c))) return null
  if (node.kind === 'inquiry' || node.kind === 'newsletter' || node.kind === 'search') return <StaticForm kind={node.kind} />
  if (node.kind === 'accordion') return <details className="replica-accordion" id={node.attrs.id}><summary>{node.title}<Icon name="right" size={18} /></summary><div className="replica-accordion-body">{children(node.children)}</div></details>
  if (node.kind === 'slider') return <BannerSlider nodes={node.children} />
  if (node.kind === 'gallery-item') return <div className={`${node.attrs.class || ''} replica-gallery-item`}><button type="button" aria-label={`Open ${node.title || 'gallery image'}`} onClick={() => openGallery({ src: node.fullImage || '', thumbnail: node.thumbnail, alt: node.title || 'Platinum Car Films gallery' })}><img src={node.thumbnail} alt={node.title || 'Platinum Car Films gallery'} loading="lazy" decoding="async" /></button></div>
  if (classes.includes('wd-carousel')) return <MediaCarousel node={node} />
  const props = reactProps(node.attrs)
  if (node.kind === 'quote') return <button {...props} type="button" onClick={openQuote}>{children(node.children)}</button>
  if (node.tag === 'a') {
    const href = node.attrs.href
    if (!href) return <button {...props} type="button" onClick={openQuote}>{children(node.children)}</button>
    if (href.startsWith('/') && !href.startsWith('/assets/')) return <Link {...props} to={href}>{children(node.children)}</Link>
    if (href.startsWith('/assets/')) return <a {...props} href={href} onClick={event => { event.preventDefault(); openGallery({ src: href, alt: node.title || 'Platinum Car Films image' }) }}>{children(node.children)}</a>
    return <a {...props} href={href} rel={node.attrs.target === '_blank' ? 'noopener noreferrer' : undefined}>{children(node.children)}</a>
  }
  if (node.tag === 'section' || classes.includes('vc_section')) return <SourceSection node={node} />
  if (node.tag === 'img') return <img {...props} alt={node.attrs.alt || ''} />
  return createElement(node.tag, props, voidTags.has(node.tag) ? undefined : children(node.children))
}
