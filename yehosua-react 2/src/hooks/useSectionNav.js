import { useEffect, useState, useRef, useCallback } from 'react'

const PEEK_TIMEOUT = 2400 // 2.4 seconds
const SCROLL_DEBOUNCE_TIME = 100 // Debounce scroll changes to prevent rapid updates

/**
 * Custom hook for section navigation tracking
 * Uses IntersectionObserver to track which section is in view
 * Provides a "peek" timeout for showing secondary section indicator
 * @param {string} pageName - Current page name (for logging/debugging)
 * @param {React.RefObject} containerRef - Ref to the page container
 * @returns {Object} Object containing { activeSectionId, peekSectionId }
 */
export function useSectionNav(pageName, containerRef) {
  const [activeSectionId, setActiveSectionId] = useState(null)
  const [peekSectionId, setPeekSectionId] = useState(null)

  const peekTimeoutRef = useRef(null)
  const scrollDebounceRef = useRef(null)
  const observerRef = useRef(null)
  const lastActiveSectionRef = useRef(null)

  // Clear peek timeout when active section changes
  const resetPeekTimeout = useCallback(() => {
    if (peekTimeoutRef.current) {
      clearTimeout(peekTimeoutRef.current)
      peekTimeoutRef.current = null
    }

    setPeekSectionId(null)

    // Set peek timeout for new section change
    peekTimeoutRef.current = setTimeout(() => {
      if (lastActiveSectionRef.current !== activeSectionId) {
        setPeekSectionId(activeSectionId)
      }
    }, PEEK_TIMEOUT)
  }, [activeSectionId])

  useEffect(() => {
    resetPeekTimeout()

    return () => {
      if (peekTimeoutRef.current) {
        clearTimeout(peekTimeoutRef.current)
        peekTimeoutRef.current = null
      }
    }
  }, [activeSectionId, resetPeekTimeout])

  useEffect(() => {
    const container = containerRef?.current

    if (!container) return

    // Get all sections (assumed to have data-section-id or id attribute)
    const sections = container.querySelectorAll('[data-section-id], section')

    if (sections.length === 0) return

    // Debounced section update
    const updateActiveSection = (sectionId) => {
      // Clear any pending debounced update
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current)
      }

      scrollDebounceRef.current = setTimeout(() => {
        if (sectionId && sectionId !== lastActiveSectionRef.current) {
          lastActiveSectionRef.current = sectionId
          setActiveSectionId(sectionId)
        }
        scrollDebounceRef.current = null
      }, SCROLL_DEBOUNCE_TIME)
    }

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let mostVisibleEntry = null
        let maxVisibility = 0

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxVisibility) {
            maxVisibility = entry.intersectionRatio
            mostVisibleEntry = entry
          }
        })

        // Update active section if something is visible
        if (mostVisibleEntry && maxVisibility > 0) {
          const sectionId =
            mostVisibleEntry.target.getAttribute('data-section-id') ||
            mostVisibleEntry.target.id

          updateActiveSection(sectionId)
        }
      },
      {
        root: container,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    observerRef.current = observer

    // Observe all sections
    sections.forEach((section) => observer.observe(section))

    return () => {
      // Clear debounce timer
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current)
        scrollDebounceRef.current = null
      }

      // Cleanup observer
      if (observerRef.current) {
        sections.forEach((section) => observerRef.current.unobserve(section))
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [containerRef])

  return {
    activeSectionId,
    peekSectionId,
  }
}
