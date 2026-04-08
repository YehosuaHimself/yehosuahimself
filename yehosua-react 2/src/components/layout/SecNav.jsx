import React, { useState, useEffect, useRef, memo } from 'react'
import { usePageContext } from '../../context/PageContext'
import { SECTION_MAPS } from '../../data/navigation'
import './SecNav.css'

/**
 * SecNav - Fixed right-side dot navigation
 * - Takes sections from SECTION_MAPS[currentPage]
 * - Each dot has hover label tooltip
 * - Active dot highlighted (uses IntersectionObserver)
 * - Peek animation (label shows briefly on section change)
 * - Hidden on landing page
 * - Dark mode for label page
 */
const SecNav = memo(function SecNav() {
  const { currentPage, isDark, isLanding } = usePageContext()
  const [activeSection, setActiveSection] = useState(null)
  const [peekingSection, setPeekingSection] = useState(null)
  const containerRef = useRef(null)
  const observerRef = useRef(null)
  const peekTimeoutRef = useRef(null)

  const sections = SECTION_MAPS[currentPage] || []

  // Setup IntersectionObserver to track active section
  useEffect(() => {
    if (isLanding || sections.length === 0) return

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let visibleEntry = null
        let maxIntersectionRatio = 0

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = entry.intersectionRatio
            visibleEntry = entry
          }
        })

        if (visibleEntry) {
          const sectionId = visibleEntry.target.id
          setActiveSection(sectionId)

          // Trigger peek animation
          if (peekTimeoutRef.current) {
            clearTimeout(peekTimeoutRef.current)
          }
          setPeekingSection(sectionId)
          peekTimeoutRef.current = setTimeout(() => {
            setPeekingSection(null)
          }, 1500)
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px 0px -50% 0px',
      }
    )

    observerRef.current = observer

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (peekTimeoutRef.current) {
        clearTimeout(peekTimeoutRef.current)
      }
    }
  }, [currentPage, isLanding, sections])

  const handleDotClick = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  // Hide on landing page
  if (isLanding || sections.length === 0) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={`sec-nav ${isDark ? 'dark' : ''}`}
      role="navigation"
      aria-label="Section navigation"
    >
      <div className="sec-nav-dots">
        {sections.map((section) => {
          const isActive = activeSection === section.id
          const isPeeking = peekingSection === section.id

          return (
            <div
              key={section.id}
              className={`sec-nav-dot-wrapper ${isActive ? 'active' : ''} ${
                isPeeking ? 'peeking' : ''
              }`}
            >
              <button
                className={`sec-nav-dot ${isActive ? 'active' : ''}`}
                onClick={() => handleDotClick(section.id)}
                title={section.label}
                aria-label={`Navigate to ${section.label}`}
              />

              {/* Label tooltip - shows on hover and peek */}
              <span
                className={`sec-nav-label ${isActive ? 'active' : ''} ${
                  isPeeking ? 'peeking' : ''
                }`}
              >
                {section.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default SecNav
