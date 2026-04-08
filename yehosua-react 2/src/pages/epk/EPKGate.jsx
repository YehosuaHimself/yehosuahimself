import React, { useRef, useEffect, useState } from 'react'
import './EPKGate.css'

/**
 * EPK Password Gate Component
 * Displays password gate overlay for EPK access
 * Password: soundofgod2026
 * Hash: b9247932adc6dc2433ef6ef37a47c74f0ed7e50e935a1a9efc29042d41faea15
 */
export default function EPKGate({ onUnlock, onDismiss }) {
  const [inputValue, setInputValue] = useState('')
  const [showError, setShowError] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef(null)

  // SHA-256 hash of "soundofgod2026"
  const PASS_HASH = 'b9247932adc6dc2433ef6ef37a47c74f0ed7e50e935a1a9efc29042d41faea15'

  /**
   * Hash password using Web Crypto API (SHA-256)
   */
  async function hashPassword(str) {
    try {
      const msgUint8 = new TextEncoder().encode(str)
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    } catch (e) {
      console.error('Hash error:', e)
      return null
    }
  }

  /**
   * Handle password submission
   */
  async function handleSubmit(e) {
    e.preventDefault()
    const password = inputValue.trim().toUpperCase()
    const hash = await hashPassword(password)

    if (hash === PASS_HASH) {
      // Correct password
      setShowError(false)
      sessionStorage.setItem('epk_unlocked', '1')
      // Trigger unlock with fade transition
      setIsVisible(false)
      setTimeout(() => {
        onUnlock()
      }, 400)
    } else {
      // Wrong password
      setInputValue('')
      setShowError(true)
      inputRef.current?.focus()
      // Auto-hide error after 2 seconds
      setTimeout(() => {
        setShowError(false)
      }, 2200)
    }
  }

  /**
   * Handle dismiss/back button
   */
  function handleDismiss() {
    setIsVisible(false)
    setTimeout(() => {
      onDismiss()
    }, 400)
  }

  /**
   * Handle backdrop click (outside the box)
   */
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      handleDismiss()
    }
  }

  /**
   * Handle ESC key
   */
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isVisible) {
        handleDismiss()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isVisible])

  /**
   * Focus input on mount
   */
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isVisible])

  return (
    <div
      className={`epk-gate ${isVisible ? 'visible' : 'hiding'}`}
      onClick={handleBackdropClick}
    >
      <div className="epk-gate-box">
        {/* Close button */}
        <button
          className="epk-gate-close"
          onClick={handleDismiss}
          aria-label="Close password gate"
        >
          ✕
        </button>

        {/* Header */}
        <div className="epk-gate-header">
          <h2 className="epk-gate-title">PRESS KIT</h2>
          <p className="epk-gate-subtitle">PASSWORD REQUIRED</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="epk-gate-form">
          <div className="epk-password-input-wrapper">
            <input
              ref={inputRef}
              type={showPassword ? 'text' : 'password'}
              className={`epk-password-input ${showError ? 'error' : ''}`}
              placeholder="Enter password"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="button"
              className="epk-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          {/* Error message */}
          {showError && (
            <p className="epk-gate-error">Incorrect password. Please try again.</p>
          )}

          {/* Submit button */}
          <button type="submit" className="epk-gate-submit">
            UNLOCK
          </button>
        </form>

        {/* Info text */}
        <p className="epk-gate-info">
          Enter your password to access the full Electronic Press Kit
        </p>
      </div>
    </div>
  )
}
