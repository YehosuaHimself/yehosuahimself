import React, { useEffect, useRef, useState, memo } from 'react'
import { usePageContext } from '../../context/PageContext'
import './CustomCursor.css'

/**
 * CustomCursor - Custom cursor with gold dot and expanding ring
 * - Gold dot cursor (10px, #c07e28)
 * - Square ring follower (46px, gold border)
 * - Ring follows with slight delay using lerp
 * - Ring expands on hover over interactive elements
 * - Hidden on touch devices
 * - Dark mode variant
 */
const CustomCursor = memo(function CustomCursor() {
  const { isDark } = usePageContext()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const moveTimeoutRef = useRef(null)
  const animationFrameRef = useRef(null)

  // Check if device is touch-enabled
  useEffect(() => {
    const checkTouchDevice = () => {
      return (
        window.matchMedia('(pointer: coarse)').matches ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    }

    setIsTouchDevice(checkTouchDevice())
  }, [])

  // Hide cursor on touch devices
  useEffect(() => {
    if (isTouchDevice) {
      document.body.style.cursor = 'auto'
      return
    }

    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [isTouchDevice])

  // Handle mouse movement
  useEffect(() => {
    if (isTouchDevice) return

    let lastRingX = 0
    let lastRingY = 0

    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY

      // Update dot position immediately
      setMousePos({ x, y })
      setIsMoving(true)

      // Clear existing timeout
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current)
      }

      // Set timeout to mark as idle after 500ms without movement
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false)
      }, 500)

      // Update ring with easing (lerp)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      const updateRingPos = () => {
        lastRingX += (x - lastRingX) * 0.15 // 15% lerp factor
        lastRingY += (y - lastRingY) * 0.15

        setRingPos({ x: lastRingX, y: lastRingY })

        // Continue animation if still moving
        if (isMoving || Math.abs(x - lastRingX) > 1 || Math.abs(y - lastRingY) > 1) {
          animationFrameRef.current = requestAnimationFrame(updateRingPos)
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateRingPos)
    }

    // Check for interactive elements on hover
    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.interactive === 'true' ||
        target.closest('[data-interactive]')

      setIsHoveringInteractive(!!isInteractive)
    }

    const handleMouseOut = () => {
      setIsHoveringInteractive(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)

      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current)
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isTouchDevice])

  if (isTouchDevice) {
    return null
  }

  return (
    <>
      {/* Gold dot cursor */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isDark ? 'dark' : ''} ${
          isMoving ? 'moving' : ''
        }`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* Ring follower */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isDark ? 'dark' : ''} ${
          isHoveringInteractive ? 'expanded' : ''
        } ${isMoving ? 'moving' : ''}`}
        style={{
          left: `${ringPos.x}px`,
          top: `${ringPos.y}px`,
        }}
      />
    </>
  )
})

export default CustomCursor
