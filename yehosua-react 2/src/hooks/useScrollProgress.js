import { useEffect, useState, useRef } from 'react'

/**
 * Custom hook to track scroll progress
 * @param {React.RefObject} containerRef - Ref to the scrollable container
 * @returns {number} Scroll progress as percentage (0-100)
 */
export function useScrollProgress(containerRef) {
  const [progress, setProgress] = useState(0)
  const animationFrameRef = useRef(null)
  const lastProgressRef = useRef(0)
  const isScheduledRef = useRef(false)

  useEffect(() => {
    const container = containerRef?.current

    if (!container) return

    const calculateProgress = () => {
      const scrollHeight = container.scrollHeight - container.clientHeight

      if (scrollHeight === 0) {
        return 0
      }

      const scrolled = container.scrollTop
      const scrollPercent = (scrolled / scrollHeight) * 100

      return Math.min(scrollPercent, 100)
    }

    const handleScroll = () => {
      if (isScheduledRef.current) {
        return
      }

      isScheduledRef.current = true

      // Schedule calculation on next frame for smooth performance
      animationFrameRef.current = requestAnimationFrame(() => {
        isScheduledRef.current = false
        const newProgress = calculateProgress()

        // Only update state if progress actually changed
        if (newProgress !== lastProgressRef.current) {
          lastProgressRef.current = newProgress
          setProgress(newProgress)
        }
      })
    }

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)

      // Clean up pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      isScheduledRef.current = false
    }
  }, [containerRef])

  return progress
}
