import React, { createContext, useState, useCallback, useMemo } from 'react'

export const PageContext = createContext()

const DARK_PAGES = ['label', 'epk']
const DEFAULT_PAGE = 'landing'
const EPK_PASSWORD = 'soundofgod2026'

export function PageProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [epkUnlocked, setEpkUnlocked] = useState(
    () => sessionStorage.getItem('epk_unlocked') === 'true'
  )

  const goPage = useCallback((pageName, password = null) => {
    if (pageName === 'epk' && !epkUnlocked) {
      if (!sessionStorage.getItem('epk_unlocked')) {
        if (password && password === EPK_PASSWORD) {
          sessionStorage.setItem('epk_unlocked', 'true')
          setEpkUnlocked(true)
        } else {
          return false
        }
      } else {
        setEpkUnlocked(true)
      }
    }

    setIsTransitioning(true)
    setCurrentPage(pageName)
    setTimeout(() => setIsTransitioning(false), 300)
  }, [epkUnlocked])

  const isDark = useMemo(() => DARK_PAGES.includes(currentPage), [currentPage])
  const isLanding = useMemo(() => currentPage === 'landing', [currentPage])

  const value = useMemo(() => ({
    currentPage,
    goPage,
    isDark,
    isLanding,
    isTransitioning,
    isEpkUnlocked: epkUnlocked,
  }), [currentPage, goPage, isDark, isLanding, isTransitioning, epkUnlocked])

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  )
}

export function usePageContext() {
  const context = React.useContext(PageContext)
  if (!context) {
    throw new Error('usePageContext must be used within PageProvider')
  }
  return context
}
