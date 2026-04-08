import React, { useEffect, useRef, memo } from 'react'
import './RevealOnScroll.css'

/**
 * RevealOnScroll - Wrapper component that fades in children when scrolled into view
 * - Props: delay (number, for staggering), className
 * - Uses IntersectionObserver
 * - Adds 'in' class to trigger CSS animation
 * - Supports prefers-reduced-motion
 */
const RevealOnScroll = memo(function RevealOnScroll({
  children,
  delay = 0,
  className = '',
}) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is visible in viewport
            if (prefersReducedMotion) {
              // Skip animation, just show immediately
              entry.target.classList.add('in')
            } else {
              // Schedule reveal with delay
              setTimeout(() => {
                entry.target.classList.add('in')
              }, delay)
            }

            // Stop observing after first reveal
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [delay])

  return (
    <div
      ref={elementRef}
      className={`reveal-on-scroll ${className}`}
      style={{
        '--reveal-delay': `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
})

export default RevealOnScroll
