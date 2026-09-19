import { useEffect, useRef } from 'react'

// Shared bounded-parallax controller (plan 16E "Motion engineering and
// limits" / 16F F09): one passive scroll listener per instance, at most one
// requestAnimationFrame per scroll event, translates only the element the
// returned ref is attached to (never the whole page). Disabled at <=1000px
// (static placement per the plan) and under prefers-reduced-motion. Caller
// wraps the target in a clipped frame so the bounded travel never spills
// into surrounding layout.
const MAX_TRAVEL_PX = 36

export default function useBoundedParallax() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth <= 1000) return

    let ticking = false
    const update = () => {
      ticking = false
      if (document.hidden) return // stop work while the tab isn't visible
      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight
      const center = rect.top + rect.height / 2
      const progress = (viewportH / 2 - center) / (viewportH / 2 + rect.height / 2)
      const clamped = Math.max(-1, Math.min(1, progress))
      el.style.transform = `translateY(${(clamped * MAX_TRAVEL_PX).toFixed(1)}px) scale(1.08)`
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    document.addEventListener('visibilitychange', update)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return ref
}
