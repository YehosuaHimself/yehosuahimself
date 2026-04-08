import React, { useState, useEffect, useRef, memo } from 'react'
import { usePageContext } from '../../context/PageContext'
import './Footer.css'

const LANGUAGES = [
  { code: 'en', label: 'EN', fullName: 'English' },
  { code: 'de', label: 'DE', fullName: 'Deutsch' },
  { code: 'es', label: 'ES', fullName: 'Español' },
  { code: 'fr', label: 'FR', fullName: 'Français' },
  { code: 'pt', label: 'PT', fullName: 'Português' },
  { code: 'it', label: 'IT', fullName: 'Italiano' },
  { code: 'nl', label: 'NL', fullName: 'Nederlands' },
  { code: 'pl', label: 'PL', fullName: 'Polski' },
  { code: 'ru', label: 'RU', fullName: 'Русский' },
  { code: 'ja', label: 'JA', fullName: '日本語' },
  { code: 'zh', label: 'ZH', fullName: '中文' },
  { code: 'ar', label: 'AR', fullName: 'العربية' },
]

/**
 * Footer - Shared footer component
 * - 4 columns: Brand, Pages, Contact, Legal
 * - Bottom bar with copyright and language selector
 * - Used on Home, Label, EPK pages
 */
const Footer = memo(function Footer() {
  const { goPage, isDark } = usePageContext()
  const [currentLang, setCurrentLang] = useState('en')
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const footerRef = useRef(null)

  // Close language dropdown when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (footerRef.current && !footerRef.current.contains(e.target)) {
        setShowLangDropdown(false)
      }
    }

    if (showLangDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showLangDropdown])

  const handleLanguageSelect = (lang) => {
    setCurrentLang(lang)
    setShowLangDropdown(false)
    // Dispatch custom event for language change
    window.dispatchEvent(
      new CustomEvent('languageChange', { detail: { language: lang } })
    )
  }

  const handlePageNavigation = (page) => {
    goPage(page)
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className={`site-footer ${isDark ? 'dark' : ''}`}>
      {/* Main footer columns */}
      <div className="ft-inner">
        {/* Brand column */}
        <div className="ft-col ft-col-brand">
          <div className="ft-logo">YH</div>
          <div className="ft-tagline">Sound of God Recordings</div>
          <div className="ft-copy">© 2026 YEHOSUA HIMSELF. All rights reserved.</div>
        </div>

        {/* Pages column */}
        <div className="ft-col">
          <div className="ft-col-head">Pages</div>
          <button className="ft-link" onClick={() => handlePageNavigation('home')}>
            Home
          </button>
          <button className="ft-link" onClick={() => handlePageNavigation('label')}>
            Label
          </button>
          <button className="ft-link" onClick={() => handlePageNavigation('epk')}>
            EPK
          </button>
        </div>

        {/* Contact column */}
        <div className="ft-col">
          <div className="ft-col-head">Contact</div>
          <a href="mailto:booking@yehosua.com" className="ft-link">
            booking@yehosua.com
          </a>
        </div>

        {/* Legal column */}
        <div className="ft-col">
          <div className="ft-col-head">Legal</div>
          <button className="ft-link" onClick={() => console.log('Privacy Policy')}>
            Privacy Policy
          </button>
          <button className="ft-link" onClick={() => console.log('Imprint')}>
            Imprint
          </button>
        </div>
      </div>

      {/* Bottom bar with copyright and language selector */}
      <div className="ft-bottom">
        <div className="ft-bottom-copy">
          YEHOSUA HIMSELF &nbsp;·&nbsp; Sound of God Recordings &nbsp;·&nbsp; 2026
        </div>
        <div className="ft-bottom-lang">
          <button
            className="ft-lang-btn"
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            title="Select language"
            aria-label="Language selector"
          >
            <span className="ft-lang-label">{currentLang.toUpperCase()}</span>
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
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {showLangDropdown && (
            <div className="ft-lang-dropdown">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  className={`ft-lang-option ${
                    currentLang === lang.code ? 'selected' : ''
                  }`}
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  {lang.fullName}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
})

export default Footer
