import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Lightbox } from '../replica/Overlays'
import './Gallery.css'

// 40 real local factory/production photos, not the full 136-image source
// inventory -- reconciling every source image against this local archive
// is still pending (see docs/IMPLEMENTATION-STATUS.md, QOL-01/D phase).
const IMAGES = [
  '/assets/original/0292083e58ae-DSC05054_12_11zon-scaled.webp',
  '/assets/original/17df03046f85-DSC06296_1_3_11zon-scaled.webp',
  '/assets/original/2cdbe3d7b511-DSC06306_1_10_11zon-scaled.webp',
  '/assets/original/2dccd2d38132-DSC06315_1_7_11zon-scaled.webp',
  '/assets/original/38fef78bab9c-DSC06333_1_6_11zon-scaled.webp',
  '/assets/original/3c71cdc62ea1-DSC06298_1_5_11zon-scaled.webp',
  '/assets/original/3e45e6d5c2d4-DSC06316_1_1_11zon-scaled.webp',
  '/assets/original/3f3368d178f1-DSC05056_14_11zon-scaled.webp',
  '/assets/original/4a73b817b04e-DSC05063_21_11zon-scaled.webp',
  '/assets/original/4a94ebd9b727-DSC06243_8_11zon-scaled.webp',
  '/assets/original/4b7ca9235fc7-DSC05060_18_11zon-scaled.webp',
  '/assets/original/4f708bead98c-DSC06259_2_11zon-scaled.webp',
  '/assets/original/4fa3aa9e20a8-DSC06308_1_1_11zon-scaled.webp',
  '/assets/original/51080d34e056-DSC05065_2_11zon-scaled.webp',
  '/assets/original/555ffdb8acb9-DSC05061_19_11zon-scaled.webp',
  '/assets/original/5f692d713786-DSC06302_1_6_11zon-scaled.webp',
  '/assets/original/6e140190861c-DSC05067_4_11zon-scaled.webp',
  '/assets/original/7590131843f5-DSC06295_1_2_11zon-scaled.webp',
  '/assets/original/7e3b3affe409-DSC06240_7_11zon-scaled.webp',
  '/assets/original/82302ff86bd7-DSC05053_11_11zon-scaled.webp',
  '/assets/original/830caaf69605-DSC06312_1_3_11zon-scaled.webp',
  '/assets/original/8c85cbd96994-DSC06314_1_5_11zon-scaled.webp',
  '/assets/original/9a11a04a5f4b-DSC06319_1_2_11zon-scaled.webp',
  '/assets/original/9cfc5f6c8601-DSC06282_5_11zon-scaled.webp',
  '/assets/original/a78864acca71-DSC06327_1_4_11zon-scaled.webp',
  '/assets/original/aaa57cf6dc4d-DSC05066_3_11zon-scaled.webp',
  '/assets/original/ac43824b8729-DSC06303_1_7_11zon-scaled.webp',
  '/assets/original/ad368424513e-DSC06285_6_11zon-scaled.webp',
  '/assets/original/bb49e16a7f9b-DSC06289_9_11zon-scaled.webp',
  '/assets/original/c4d8773a170b-DSC06266_3_11zon-scaled.webp',
  '/assets/original/c94a6397298c-DSC06301_1_7_11zon-scaled.webp',
  '/assets/original/c9d119d3b0e4-DSC05055_13_11zon-scaled.webp',
  '/assets/original/cf3ef0f9a630-DSC06310_1_2_11zon-scaled.webp',
  '/assets/original/d5614ba8dd15-DSC05057_15_11zon-scaled.webp',
  '/assets/original/d996479d2db8-DSC06276_4_11zon-scaled.webp',
  '/assets/original/e7d2ad0258e5-DSC06325_1_3_11zon-scaled.webp',
  '/assets/original/eadaf3e85f23-DSC06288_8_11zon-scaled.webp',
  '/assets/original/ed9f372a626e-DSC06252_9_11zon-scaled.webp',
  '/assets/original/eec7b7952628-DSC05059_17_11zon-scaled.webp',
  '/assets/original/f960cdecd958-DSC06294_1_1_11zon-scaled.webp',
  '/assets/original/fb69ba3e9a98-DSC06299_1_6_11zon-scaled.webp',
].map((src, i) => ({ src, alt: `Platinum Car Films factory and production photo ${i + 1}` }))

export default function Gallery() {
  const [openAt, setOpenAt] = useState<string | null>(null)

  return (
    <>
      <PageHeader title="Gallery" intro={`${IMAGES.length} factory and production photos.`} />
      <div className="gallery-grid section-shell">
        {IMAGES.map((img) => (
          <button type="button" className="gallery-item" key={img.src} onClick={() => setOpenAt(img.src)}>
            <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
      {openAt && <Lightbox images={IMAGES} initial={openAt} close={() => setOpenAt(null)} />}
    </>
  )
}
