import { useEffect, useState, useRef } from 'react'

/**
 * Custom hook for tracking mouse position and interactive element hover state
 * Disables on touch devices (pointer:coarse)
 * Uses RAF for 60fps smooth cursor tracking with passive event listeners
 * @returns {Object} Object containing { x, y, isMoving, isHovering, isTouchDevice }
 */
export function useCustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const animationFrameRef = useRef(null)
  const moveTimeoutRef = useRef(null)
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const pendingUpdateRef = useRef(null)

  useEffect(() => {
    // Detect touch device capability using matchMedia
    const touchMediaQuery = window.matchMedia('(pointer:coarse)')
    const checkTouchDevice = (e) => {
      setIsTouchDevice(e.matches)
    }

    checkTouchDevice(touchMediaQuery)
    touchMediaQuery.addEventListener('change', checkTouchDevice)

    return () => {
      touchMediaQuery.removeEventListener('change', checkTouchDevice)
    }
  }, [])

  useEffect(() => {
    // If touch device, don't set up cursor tracking
    if (isTouchDevice) {
      return
    }

    const handleMouseMove = (e) => {
      // Store the latest event data
      pendingUpdateRef.current = { x: e.clientX, y: e.clientY }

      // Check if hovering over interactive element
      const target = e.target
      const isInteractive =
        target instanceof HTMLAnchorElement ||
        target instanceof HTMLButtonElement ||
        target.hasAttribute('onclick') ||
        target.closest('[onclick]') ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'

      // Cancel previous animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Update position on next frame for smooth 60fps performance
      animationFrameRef.current = requestAnimationFrame(() => {
        if (pendingUpdateRef.current) {
          const newPos = pendingUpdateRef.current
          if (
            newPos.x !== lastPositionRef.current.x ||
            newPos.y !== lastPositionRef.current.y
          ) {
            lastPositionRef.current = newPos
            setPosition(newPos)
          }
        }

        setIsMoving(true)
        setIsHovering(!!isInteractive)

        animationFrameRef.current = null
      })

      // Clear "moving" state after inactivity
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current)
      }

      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false)
      }, 1000) // Consider cursor "still" after 1 second
    }

    const handleMouseLeave = () => {
      setIsMoving(false)
      setIsHovering(false)
      pendingUpdateRef.current = null
    }

    // Use passive event listeners for better scroll performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current)
        moveTimeoutRef.current = null
      }

      pendingUpdateRef.current = null
    }
  }, [isTouchDevice])

  return {
    x: position.x,
    y: position.y,
    isMoving,
    isHovering,
    isTouchDevice,
  }
}
