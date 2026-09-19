import { useEffect, useRef, useState } from 'react'

/**
 * Motion A ("editorial reveal"): a section fades up once, the first time
 * it enters view. Fixed per plan section 16E/16F after the full-site
 * review found a section could stay stuck at opacity:0 -- the previous
 * version started every element hidden via CSS and depended entirely on
 * the observer firing. Now: visible is the unconditional default (see
 * `.reveal-el` in index.css, which has no hidden state of its own).
 * `pending` -- the only thing that can hide this element -- is applied by
 * this component, and only when all of these hold: JS ran, the element
 * measured as below the fold at mount, IntersectionObserver exists, and
 * the visitor does not have reduced motion on. Anything already in view
 * (including a restored scroll position or a hash-linked target),
 * anything reduced-motion prefers, and any failed setup all render fully
 * visible immediately -- there's no path left that depends on the
 * observer actually firing to become visible.
 */
export default function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [pending, setPending] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = el.getBoundingClientRect()
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0
    if (alreadyInView) return // not below the fold -- render visible, no entrance needed

    setPending(true)
    let fallback
    try {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisible(true)
            observer.disconnect()
            clearTimeout(fallback)
          }
        },
        { threshold: 0 }
      )
      observer.observe(el)
      // Belt-and-suspenders: if the observer never fires for any reason
      // (layout thrash, a browser quirk, a route change mid-setup), don't
      // leave the section hidden indefinitely.
      fallback = setTimeout(() => setVisible(true), 4000)
      return () => { observer.disconnect(); clearTimeout(fallback) }
    } catch {
      setVisible(true)
    }
  }, [])

  const classes = ['reveal-el', className]
  if (pending) classes.push('pending')
  if (pending && visible) classes.push('is-visible')

  return (
    <div ref={ref} className={classes.filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
