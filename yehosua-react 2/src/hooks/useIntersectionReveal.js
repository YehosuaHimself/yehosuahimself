import { useEffect, useRef } from 'react'

/**
 * Custom hook for intersection-based element reveal animations
 * Adds an 'in' class to elements when they enter the viewport
 * Respects prefers-reduced-motion for accessibility
 * @param {string} className - CSS class name of elements to observe
 * @param {Object} options - IntersectionObserver options
 * @returns {React.RefObject} Ref to attach to the container
 */
export function useIntersectionReveal(
  className = 'reveal-item',
  options = {
    threshold: 0.07,
    rootMargin: '0px 0px -40px 0px',
  },
) {
  const containerRef = useRef(null)
  const observerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    // Get all elements with the target class
    const elements = container.querySelectorAll(`.${className}`)

    if (elements.length === 0) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // If reduced motion is preferred, apply 'in' class immediately
    if (prefersReducedMotion) {
      elements.forEach((el) => {
        el.classList.add('in')
      })
      return
    }

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is visible in viewport
          entry.target.classList.add('in')
        } else {
          // Element left viewport
          entry.target.classList.remove('in')
        }
      })
    }, options)

    observerRef.current = observer

    // Observe all elements
    elements.forEach((el) => observer.observe(el))

    // Cleanup
    return () => {
      if (observerRef.current) {
        elements.forEach((el) => observerRef.current.unobserve(el))
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [className, options])

  return containerRef
}
