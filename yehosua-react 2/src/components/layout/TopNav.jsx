import React, { useState, useEffect, useRef, memo } from 'react'
import { usePageContext } from '../../context/PageContext'
import './TopNav.css'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'pt', label: 'PT' },
  { code: 'it', label: 'IT' },
  { code: 'nl', label: 'NL' },
  { code: 'pl', label: 'PL' },
  { code: 'ru', label: 'RU' },
  { code: 'ja', label: 'JA' },
  { code: 'zh', label: 'ZH' },
  { code: 'ar', label: 'AR' },
]

/**
 * TopNav - Fixed top navigation bar
 * - Hidden on landing page
 * - Dark mode for label page
 * - Adds 'scrolled' class when scrolled past 50px
 */
const TopNav = memo(function TopNav() {
  const { currentPage, goPage, isDark, isLanding } = usePageContext()
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const navRef = useRef(null)

  // Handle scroll to add 'scrolled' class
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close language dropdown when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowLangDropdown(false)
      }
    }

    if (showLangDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showLangDropdown])

  const handleReserve = () => {
    goPage('home')
    setTimeout(() => {
      const contactElement = document.querySelector('#hm-contact')
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 400)
  }

  const handleLanguageSelect = (lang) => {
    setCurrentLang(lang)
    setShowLangDropdown(false)
    // Dispatch custom event for language change (app can handle global state)
    window.dispatchEvent(
      new CustomEvent('languageChange', { detail: { language: lang } })
    )
  }

  const handleNavClick = (page) => {
    goPage(page)
  }

  // Hide on landing page
  if (isLanding) {
    return null
  }

  return (
    <nav
      ref={navRef}
      className={`top-nav ${isScrolled ? 'scrolled' : ''} ${isDark ? 'dark' : ''}`}
    >
      {/* Left: Logo */}
      <button
        className="tn-logo"
        onClick={() => handleNavClick('home')}
        title="Go to home page"
      >
        YH
      </button>

      {/* Center: Navigation Links */}
      <div className="tn-center">
        <button
          className={`tn-link ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => handleNavClick('home')}
          data-target="home"
        >
          HOME
        </button>
        <span className="tn-sep">·</span>
        <button
          className={`tn-link ${currentPage === 'label' ? 'active' : ''}`}
          onClick={() => handleNavClick('label')}
          data-target="label"
        >
          LABEL
        </button>
        <span className="tn-sep">·</span>
        <button
          className={`tn-link ${currentPage === 'epk' ? 'active' : ''}`}
          onClick={() => handleNavClick('epk')}
          data-target="epk"
        >
          EPK
        </button>
      </div>

      {/* Right: Reserve & Language */}
      <div className="tn-right">
        <button className="tn-reserve" onClick={handleReserve}>
          Reserve a Date
        </button>

        <div className="tn-lang-selector">
          <button
            className="tn-lang-btn"
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            aria-label="Language selector"
            title="Select language"
          >
            <span className="tn-lang-label">{currentLang.toUpperCase()}</span>
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 2.5L4 5.5L7 2.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {showLangDropdown && (
            <div className="tn-lang-dropdown">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  className={`tn-lang-option ${
                    currentLang === lang.code ? 'selected' : ''
                  }`}
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
})

export default TopNav
