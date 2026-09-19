import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInteractions } from '../replica/InteractionContext'
import { Lightbox } from '../replica/Overlays'
import Reveal from '../components/Reveal'
import useBoundedParallax from '../hooks/useBoundedParallax'
import gallery from './design-data/gallery-assignments.json'
import './Gallery.css'

// Full 136-entry ordered register from docs/design/GALLERY-ASSIGNMENTS.json
// (plan section 16C). Order and thumbnail/full-image pairs are preserved
// exactly for the GE06 full archive -- curated sections below feature a
// subset of these same entries (repeats are explicitly allowed by plan
// 16E: "Featured images may repeat there intentionally") without removing
// or reordering anything in the archive itself.
const ALL_IMAGES = gallery.map((g) => ({
  id: g.id,
  src: g.fullImage,
  thumbnail: g.thumbnail,
  alt: `Platinum Car Films gallery image ${g.id}`,
}))

const byId = (id) => {
  const entry = gallery.find((g) => g.id === id)
  return entry ? { id: entry.id, src: entry.fullImage, thumbnail: entry.thumbnail, alt: `Platinum Car Films gallery image ${entry.id}` } : null
}

// GE03 product imagery: film-roll artwork, packaging stack, car/film
// illustration -- per plan 16E's explicit G010/G015/G031 assignment.
const PRODUCT_IMAGERY = [byId('G010'), byId('G015'), byId('G031')].filter(Boolean)

// GE04 color and finish: five supplied color/finish presentations
// (G034-G038). Labels below describe what the filenames/imagery actually
// show -- neutral navigation copy, not new product or availability claims,
// per plan 16E's explicit instruction for this section.
const COLOR_PRESENTATIONS = [
  { ...byId('G034'), label: 'Matte Metallic — Track Gold Green' },
  { ...byId('G035'), label: 'Star Violet' },
  { ...byId('G036'), label: 'Milan Gold' },
  { ...byId('G037'), label: 'Matte — Magic Flame Dark Blue' },
  { ...byId('G038'), label: 'Autumn Blue' },
].filter((c) => c.src)

// GE05 production imagery: full-bleed panorama plus one tall image and two
// supporting equipment images, per plan 16E's explicit G043/G121/G054/G064
// assignment.
const PRODUCTION_PANORAMA = byId('G043')
const PRODUCTION_TALL = byId('G121')
const PRODUCTION_SUPPORTING = [byId('G054'), byId('G064')].filter(Boolean)

const BATCH = 24

export default function Gallery() {
  const { openQuote } = useInteractions()
  const [visibleCount, setVisibleCount] = useState(BATCH)
  const [openAt, setOpenAt] = useState(null)
  const [colorIndex, setColorIndex] = useState(0)
  const loadMoreRef = useRef(null)
  const panoramaRef = useBoundedParallax()
  const heroInsetRef = useBoundedParallax()

  const visible = ALL_IMAGES.slice(0, visibleCount)
  const selectedColor = COLOR_PRESENTATIONS[colorIndex]

  const loadMore = () => {
    setVisibleCount((c) => Math.min(ALL_IMAGES.length, c + BATCH))
    // Keep focus on the trigger so it isn't lost when new tiles append below it.
    requestAnimationFrame(() => loadMoreRef.current?.focus())
  }

  return (
    <article className="gallery-page">
      {/* GE01: editorial opening -- title, lead, two actions, layered
          application/production imagery. Only the homepage keeps the full
          immersive hero; this is a compact opening that still leads with
          photography, per plan 16C/16E. */}
      <section className="ge-hero">
        <div className="container ge-hero-grid">
          <div className="ge-hero-copy">
            <span className="ab-eyebrow">The Collection</span>
            <h1>Gallery</h1>
            <p>Explore Platinum product imagery, color presentations, and production photos in one collection.</p>
            <div className="ge-hero-actions">
              <a className="text-link-light" href="#ge03">Explore highlights</a>
              <a className="text-link-light" href="#full-collection">Browse all {ALL_IMAGES.length} images</a>
            </div>
          </div>
          <div className="ge-hero-media">
            <div className="ge-hero-media-main">
              <img src="/assets/original/eea44f2b1a11-sli1.webp" alt="Platinum film material application" loading="eager" />
            </div>
            {PRODUCTION_PANORAMA && (
              <div className="ge-hero-media-inset" ref={heroInsetRef}>
                <img src={PRODUCTION_PANORAMA.thumbnail} alt="Platinum production photograph" loading="lazy" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* GE02: chapter navigation */}
      <nav className="ge-nav" aria-label="Gallery sections">
        <div className="container ge-nav-inner">
          <p>Explore product artwork, color presentations, and production imagery.</p>
          <div className="ge-nav-links">
            <a href="#ge03">Product imagery</a>
            <a href="#ge04">Color and finish</a>
            <a href="#ge05">Production imagery</a>
            <a href="#full-collection">Full collection</a>
          </div>
        </div>
      </nav>

      {/* GE03: product imagery */}
      {PRODUCT_IMAGERY.length > 0 && (
        <section className="ge-section" id="ge03">
          <Reveal className="container ge03-grid">
            <div className="ge03-copy">
              <h2>Product imagery</h2>
              <p>Film-roll artwork, packaging, and application photography from the supplied collection.</p>
            </div>
            <div className="ge03-images">
              {PRODUCT_IMAGERY.map((img, i) => (
                <button
                  type="button"
                  key={img.id}
                  className={`ge03-image ${i === 0 ? 'ge03-image-main' : ''}`}
                  onClick={() => setOpenAt(img.src)}
                  aria-label={`View image ${img.id}`}
                >
                  <img src={img.thumbnail} alt={img.alt} loading="lazy" />
                  <span className="ge-view-badge">View image</span>
                </button>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* GE04: color and finish */}
      {selectedColor && (
        <section className="ge-section ge-section-copper" id="ge04">
          <div className="container">
            <h2>Explore color and finish</h2>
            <p>Browse color presentations from the supplied collection.</p>
            <div className="ge04-layout">
              <button type="button" className="ge04-main" onClick={() => setOpenAt(selectedColor.src)} aria-label={`View ${selectedColor.label} full size`}>
                <img src={selectedColor.thumbnail} alt={selectedColor.label} loading="lazy" />
              </button>
              <div className="ge04-controls" role="group" aria-label="Choose a color presentation">
                {COLOR_PRESENTATIONS.map((c, i) => (
                  <button
                    type="button"
                    key={c.id}
                    className={`ge04-swatch ${i === colorIndex ? 'is-selected' : ''}`}
                    aria-pressed={i === colorIndex}
                    onClick={() => setColorIndex(i)}
                  >
                    <img src={c.thumbnail} alt="" aria-hidden="true" loading="lazy" />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* GE05: production imagery */}
      {PRODUCTION_PANORAMA && (
        <section className="ge-section ge05" id="ge05">
          <div className="ge05-panorama-frame">
            <img ref={panoramaRef} className="ge05-panorama" src={PRODUCTION_PANORAMA.thumbnail} alt="Platinum production floor" loading="lazy" />
          </div>
          <Reveal className="container ge05-grid">
            <div>
              <h2>A closer look at production imagery</h2>
              <p>Equipment and production-floor photography from the supplied collection.</p>
            </div>
            <div className="ge05-images">
              {PRODUCTION_TALL && (
                <button type="button" className="ge05-tall" onClick={() => setOpenAt(PRODUCTION_TALL.src)} aria-label={`View image ${PRODUCTION_TALL.id}`}>
                  <img src={PRODUCTION_TALL.thumbnail} alt={PRODUCTION_TALL.alt} loading="lazy" />
                </button>
              )}
              <div className="ge05-support">
                {PRODUCTION_SUPPORTING.map((img) => (
                  <button type="button" key={img.id} className="ge05-support-item" onClick={() => setOpenAt(img.src)} aria-label={`View image ${img.id}`}>
                    <img src={img.thumbnail} alt={img.alt} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* GE06: full ordered archive, all 136 entries, original order */}
      <section className="ge-section" id="full-collection">
        <div className="container">
          <h2>The full collection</h2>
          <p>{visible.length} of {ALL_IMAGES.length} images.</p>
          <div className="gallery-grid">
            {visible.map((img) => (
              <button type="button" className="gallery-item" key={img.src} onClick={() => setOpenAt(img.src)}>
                <img src={img.thumbnail} alt={img.alt} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
          {visibleCount < ALL_IMAGES.length && (
            <div className="gallery-load-more">
              <button type="button" ref={loadMoreRef} className="button" onClick={loadMore}>
                Load more ({ALL_IMAGES.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* GE07: closing band */}
      <section className="ge-cta">
        <div className="container ge-cta-inner">
          <h2>Find the right film for your requirements</h2>
          <p>Compare products or get in touch for a wholesale quote.</p>
          <div className="ge-cta-actions">
            <Link className="ab-btn-primary" to="/product">Browse Products</Link>
            <button type="button" className="ab-btn-secondary" onClick={openQuote}>Get a Quote</button>
          </div>
        </div>
      </section>

      {openAt && <Lightbox images={ALL_IMAGES} initial={openAt} close={() => setOpenAt(null)} />}
    </article>
  )
}
