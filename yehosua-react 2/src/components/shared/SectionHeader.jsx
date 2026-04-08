import React, { memo } from 'react'
import './SectionHeader.css'

/**
 * SectionHeader - Reusable section header component
 * - Props: number (string like "01"), label (string), title (string with optional <em> support), variant ('light'|'dark')
 * - Layout: large decorative number on left, label+title in center (left-aligned)
 * - Elegant, editorial design with minimal duplicate numbering
 * - Responsive: hides number and centers on mobile
 */
const SectionHeader = memo(function SectionHeader({
  number = '',
  label = '',
  title = '',
  variant = 'light',
  className = '',
  id = '',
}) {
  return (
    <header
      className={`section-header section-header-${variant} ${className}`}
      id={id}
    >
      {/* Left: large decorative number */}
      {number && <div className="sh-number-left">{number}</div>}

      {/* Center: label + title (left-aligned) */}
      <div className="sh-center">
        {label && <div className="sh-label">{label}</div>}
        {title && (
          <h2
            className="sh-title"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        )}
      </div>
    </header>
  )
})

export default SectionHeader
