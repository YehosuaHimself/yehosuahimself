import { useEffect, useRef, useCallback } from 'react'

/**
 * useSmoothScroll — Non-invasive smooth enhancement layer
 *
 * Instead of hijacking scroll (which breaks IntersectionObserver),
 * this applies parallax transforms to [data-scroll-speed] elements
 * and adds a silk-smooth feel via CSS scroll-behavior on the container.
 *
 * Usage: useSmoothScroll(containerRef)
 * Then add data-scroll-speed="0.3" to hero backgrounds etc.
 */
export default function useSmoothScroll(containerRef) {
  const rafRef = useRef(null)
  const lastScrollRef = useRef(0)
  const isReducedMotion = useRef(false)

  const applyParallax = useCallback(() => {
    const container = containerRef.current
    if (!container || isReducedMotion.current) return

    const scrollY = container.scrollTop
    const delta = scrollY - lastScrollRef.current
    lastScrollRef.current = scrollY

    // Apply parallax to marked elements
    const elements = container.querySelectorAll('[data-scroll-speed]')
    elements.forEach(el => {
      const speed = parseFloat(el.dataset.scrollSpeed) || 0
      const offset = scrollY * (1 - speed)
      el.style.transform = `translate3d(0, ${offset * 0.3}px, 0)`
      el.style.willChange = 'transform'
    })

    rafRef.current = requestAnimationFrame(applyParallax)
  }, [containerRef])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    isReducedMotion.current = mq.matches
    const onChange = (e) => { isReducedMotion.current = e.matches }
    mq.addEventListener('change', onChange)

    const container = containerRef.current
    if (!container) return

    // Apply CSS smooth scroll
    container.style.scrollBehavior = 'smooth'
    container.style.webkitOverflowScrolling = 'touch'

    // Start parallax RAF loop
    rafRef.current = requestAnimationFrame(applyParallax)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      mq.removeEventListener('change', onChange)
    }
  }, [containerRef, applyParallax])
}
