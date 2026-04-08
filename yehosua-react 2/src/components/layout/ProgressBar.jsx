import React, { useRef, memo } from 'react'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import './ProgressBar.css'

/**
 * ProgressBar - Thin gold bar at top of page
 * - Width tracks scroll progress (0-100%)
 * - Gold gradient background
 * - Height: 2px (expands on hover/active)
 * - Uses page scroll container ref
 */
const ProgressBar = memo(function ProgressBar({ containerRef }) {
  const progress = useScrollProgress(containerRef)

  return (
    <div
      className="progress-bar"
      style={{
        width: `${progress}%`,
      }}
      aria-valuenow={Math.round(progress)}
      aria-valuemin="0"
      aria-valuemax="100"
      role="progressbar"
      aria-label="Page scroll progress"
    />
  )
})

export default ProgressBar
