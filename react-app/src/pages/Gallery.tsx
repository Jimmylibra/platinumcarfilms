import { useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Lightbox } from '../replica/Overlays'
import gallery from './design-data/gallery-assignments.json'
import './Gallery.css'

// Full 136-entry ordered register from docs/design/GALLERY-ASSIGNMENTS.json
// (section 16C of the implementation plan) -- exact thumbnail/full-image
// pairs, contact-sheet inspected. Do not re-sort or glob; order is
// deliberate. These are factory/production and promotional photos, not
// verified customer installations.
const ALL_IMAGES = (gallery as { id: string; fullImage: string; thumbnail: string }[]).map((g) => ({
  src: g.fullImage,
  thumbnail: g.thumbnail,
  alt: `Platinum Car Films gallery image ${g.id}`,
}))

const BATCH = 24

export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(BATCH)
  const [openAt, setOpenAt] = useState<string | null>(null)
  const loadMoreRef = useRef<HTMLButtonElement>(null)

  const visible = ALL_IMAGES.slice(0, visibleCount)

  const loadMore = () => {
    setVisibleCount((c) => Math.min(ALL_IMAGES.length, c + BATCH))
    // Keep focus on the trigger so it isn't lost when new tiles append below it.
    requestAnimationFrame(() => loadMoreRef.current?.focus())
  }

  return (
    <>
      <PageHeader title="Gallery" intro={`${visible.length} of ${ALL_IMAGES.length} photos.`} />
      <div className="gallery-grid section-shell">
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
      {openAt && <Lightbox images={ALL_IMAGES} initial={openAt} close={() => setOpenAt(null)} />}
    </>
  )
}
