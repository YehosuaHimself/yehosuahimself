import React, { useRef, useEffect, useState, lazy, Suspense } from 'react'
import { PageProvider, usePageContext } from './context/PageContext'
import useSmoothScroll from './hooks/useSmoothScroll'

// Lazy-loaded pages for code splitting
const Landing = lazy(() => import('./pages/Landing'))
const Home = lazy(() => import('./pages/Home'))
const Label = lazy(() => import('./pages/Label'))
const EPK = lazy(() => import('./pages/EPK'))
const EPKGate = lazy(() => import('./pages/epk/EPKGate'))

// Layout (always loaded — small footprint)
import CustomCursor from './components/layout/CustomCursor'
import TopNav from './components/layout/TopNav'
import SecNav from './components/layout/SecNav'
import ProgressBar from './components/layout/ProgressBar'
import Footer from './components/layout/Footer'

/** Minimal loading shimmer */
const PageFallback = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg0)',
    color: 'var(--gold)',
    fontFamily: 'var(--f-mono)',
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  }}>
    Loading…
  </div>
)

function AppContent() {
  const { currentPage, isDark, isLanding, isTransitioning, goPage, isEpkUnlocked } = usePageContext()
  const pageContainerRef = useRef(null)
  const [showEpkGate, setShowEpkGate] = useState(false)

  // Buttery smooth scroll + parallax
  useSmoothScroll(pageContainerRef)

  // Scroll to top on page change
  useEffect(() => {
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [currentPage])

  // Handle EPK gate
  const handleGoPage = (name) => {
    if (name === 'epk' && !isEpkUnlocked && !sessionStorage.getItem('epk_unlocked')) {
      setShowEpkGate(true)
      return
    }
    goPage(name)
  }

  const handleEpkUnlock = (password) => {
    const result = goPage('epk', password)
    if (result !== false) {
      setShowEpkGate(false)
    }
    return result
  }

  const PAGE_MAP = {
    landing: <Landing />,
    home:    <Home containerRef={pageContainerRef} />,
    label:   <Label containerRef={pageContainerRef} />,
    epk:     <EPK containerRef={pageContainerRef} />,
  }

  return (
    <div className={`app ${isDark ? 'dark' : 'light'} ${isLanding ? 'is-landing' : ''}`}
         data-page={currentPage}>
      <CustomCursor />

      {!isLanding && <TopNav />}
      {!isLanding && <SecNav containerRef={pageContainerRef} />}
      {!isLanding && <ProgressBar containerRef={pageContainerRef} />}

      <main ref={pageContainerRef}
            className="page active"
            style={{ position: 'fixed', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        <div className={`page-content ${isTransitioning ? 'transitioning' : ''}`}
             key={currentPage}>
          <Suspense fallback={<PageFallback />}>
            {PAGE_MAP[currentPage] || <Landing />}
          </Suspense>
        </div>
        {!isLanding && <Footer />}
      </main>

      {showEpkGate && (
        <Suspense fallback={null}>
          <EPKGate
            onUnlock={handleEpkUnlock}
            onDismiss={() => { setShowEpkGate(false); goPage('home') }}
          />
        </Suspense>
      )}
    </div>
  )
}

export default function App() {
  return (
    <PageProvider>
      <AppContent />
    </PageProvider>
  )
}
