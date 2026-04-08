import React, { useEffect, useState, useRef } from 'react'
import { usePageContext } from '../../context/PageContext'
import EPKGate from './EPKGate'
import './EPK.css'
import { EPK_SECTIONS, EPK_NAV_ITEMS } from '../../data/epk'

/**
 * EPK (Electronic Press Kit) Page
 * Password-protected page with full artist information, tech specs, and booking details
 */
export default function EPK({ containerRef }) {
  const { goPage } = usePageContext()
  const [showGate, setShowGate] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [activeSection, setActiveSection] = useState('bio')
  const epkRef = useRef(null)

  /**
   * Check if EPK is already unlocked on mount
   */
  useEffect(() => {
    const unlocked = sessionStorage.getItem('epk_unlocked') === '1' ||
                     sessionStorage.getItem('epk_unlocked') === 'true'

    if (unlocked) {
      setIsUnlocked(true)
    } else {
      setShowGate(true)
    }
  }, [])

  function handleGateUnlock() {
    setShowGate(false)
    setIsUnlocked(true)
  }

  function handleGateDismiss() {
    goPage('landing')
  }

  if (!isUnlocked) {
    return <EPKGate onUnlock={handleGateUnlock} onDismiss={handleGateDismiss} />
  }

  const s = EPK_SECTIONS

  return (
    <div ref={epkRef} className="epk-page">
      {/* Navigation */}
      <EPKNav activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main content */}
      <div className="epk-content">
        {/* Section 01: Bio/Artist */}
        <Section01Bio section={s.bio} />

        {/* Section 02: Latest Release */}
        <Section02Release section={s.latestRelease} />

        {/* Section 03: Pilgrimage/Journey — Vertical Timeline */}
        <Section03Pilgrimage section={s.pilgrimage} />

        {/* Section 04: Gallery — with actual images */}
        <Section04Gallery section={s.gallery} />

        {/* Section 05: Sound */}
        <Section05Sound section={s.sound} />

        {/* Section 06: Stats */}
        <Section06Stats section={s.stats} />

        {/* Section 07: Press */}
        <Section07Press section={s.press} />

        {/* Section 08: The Set — 4 labeled SC players */}
        <Section08TheSet section={s.featuredSet} />

        {/* Section 09: Mixes */}
        <Section09Mixes section={s.mixes} />

        {/* Section 10: Live */}
        <Section10Live section={s.live} />

        {/* Section 11: Tech Rider */}
        <Section11Tech section={s.techRider} />

        {/* Section 12: Hospitality */}
        <Section12Hospitality section={s.hospitalityRider} />

        {/* Section 13: Shows */}
        <Section13Shows section={s.shows} />

        {/* Section 14: Availability Codex */}
        <Section14Availability section={s.availability} />

        {/* Section 15: Contact */}
        <Section15Contact section={s.contact} />
      </div>

      {/* Download Cluster */}
      <DownloadCluster />

      {/* Footer */}
      <EPKFooter />
    </div>
  )
}

/**
 * EPK Navigation Component
 */
function EPKNav({ activeSection, setActiveSection }) {
  return (
    <nav className="epk-nav">
      <a href="#" className="epk-nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}) }}>YH</a>
      <ul className="epk-nav-links">
        {EPK_NAV_ITEMS.map((item, i) => (
          <li key={i}>
            <a href={item.href} onClick={(e) => {
              e.preventDefault()
              setActiveSection(item.href.substring(1))
              const el = document.querySelector(item.href)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="epk-nav-book" onClick={(e) => {
        e.preventDefault()
        const el = document.querySelector('#contact')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }}>RESERVE A DATE</a>
    </nav>
  )
}

/**
 * Section 01: Artist Bio
 */
function Section01Bio({ section }) {
  return (
    <section id="bio" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <div className="bio-layout">
        <div className="bio-left">
          <p className="bio-tagline">{section.tagline}</p>
          <div className="bio-pull">{section.quote}</div>
          <div className="bio-portrait">
            <img src="/images/portrait-home.webp" alt="YEHOSUA HIMSELF portrait" loading="lazy" />
          </div>
        </div>
        <div className="bio-right">
          <p className="bio-text">{section.biography}</p>
          <div className="bio-influences">
            <p className="bio-influences-label">FANS OF / FOR FANS OF</p>
            <ul className="bio-influences-list">
              {section.influences.map((inf, i) => (
                <li key={i}>{inf}</li>
              ))}
            </ul>
          </div>
          {section.journeyHighlight && (
            <div className="bio-journey-highlight">
              <h4>{section.journeyHighlight.title}</h4>
              <p>{section.journeyHighlight.text}</p>
              <a href="#pilgrimage" className="bio-journey-link" onClick={(e) => {
                e.preventDefault()
                const el = document.querySelector('#pilgrimage')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}>{section.journeyHighlight.link}</a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * Section 02: Latest Release
 */
function Section02Release({ section }) {
  return (
    <section id="latest-release" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <div className="release-container">
        <div className="release-info">
          <h3>{section.track}</h3>
          <p className="release-album">{section.name}</p>
          <p className="release-meta">{section.format} · {section.label} · {section.year}</p>
        </div>
        <div className="release-player">
          <iframe
            title="SoundCloud audio player"
            loading="lazy"
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={section.soundcloudUrl}
            sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation-by-user-activation"
          />
        </div>
      </div>
    </section>
  )
}

/**
 * Section 03: Pilgrimage/Journey — Vertical Timeline
 */
function Section03Pilgrimage({ section }) {
  return (
    <section id="pilgrimage" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <div className="pilgrimage-container">
        <p className="pilgrimage-hook">{section.description}</p>
        <p className="pilgrimage-text">{section.fullDescription}</p>

        {/* Vertical Timeline */}
        <div className="timeline">
          <div className="timeline-line" />
          {section.stages.map((stage, i) => (
            <div key={i} className={`timeline-node ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-dot">
                <span className="timeline-dot-num">{stage.number}</span>
              </div>
              <div className="timeline-card">
                <h4>{stage.name}</h4>
                <p className="timeline-location">{stage.location}{stage.description && ` · ${stage.description}`}</p>
                {stage.date && <p className="timeline-date">{stage.date}</p>}
                <p className="timeline-distance">{stage.distance}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pilgrimage-stats">
          {section.stats.map((stat, i) => (
            <div key={i} className="pilgrimage-stat">
              <p className="stat-icon">{stat.icon}</p>
              <p className="stat-number">{stat.number}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Section 04: Gallery — with actual images
 */
function Section04Gallery({ section }) {
  return (
    <section id="epk-gallery" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <div className="gallery-strip">
        {section.images.map((img, i) => (
          <div key={i} className="gallery-card">
            <div className="gallery-img-wrap">
              <img src={img.src} alt={img.title} loading="lazy" />
            </div>
            <h4>{img.title}</h4>
            <p>{img.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Section 05: Sound
 */
function Section05Sound({ section }) {
  return (
    <section id="sound" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <p className="sound-description">{section.description}</p>
      <div className="sound-genres">
        {section.genres.map((genre, i) => (
          <div key={i} className="sound-genre">
            <p className="genre-name">{genre.name}</p>
            <div className="genre-bar">
              <div className="genre-fill" style={{width: `${genre.percentage}%`}}></div>
            </div>
            <p className="genre-percent">{genre.percentage}%</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Section 06: Stats/Evidence
 */
function Section06Stats({ section }) {
  return (
    <section id="stats" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <div className="stats-grid">
        {section.blocks.map((block, i) => (
          <div key={i} className="stats-block">
            <p className="stat-big">{block.number}</p>
            <p className="stat-label">{block.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Section 07: Press/Witness
 */
function Section07Press({ section }) {
  return (
    <section id="press" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <div className="press-quotes">
        {section.quotes.map((quote, i) => (
          <div key={i} className="press-quote">
            <p className="quote-text">"{quote.text}"</p>
            <p className="quote-source">— {quote.source}, {quote.year}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Section 08: The Set — 4 labeled SoundCloud players
 */
function Section08TheSet({ section }) {
  return (
    <section id="sc-feat" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <div className="the-set-grid">
        {section.sets.map((set, i) => (
          <div key={i} className="the-set-card">
            <div className="the-set-header">
              <span className="the-set-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h4 className="the-set-label">{set.label}</h4>
                <p className="the-set-meta">{set.date} · {set.description}</p>
              </div>
            </div>
            <div className="the-set-player">
              <iframe
                title={`SoundCloud: ${set.label}`}
                loading="lazy"
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={set.soundcloudUrl}
                sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation-by-user-activation"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Section 09: Mixes
 */
function Section09Mixes({ section }) {
  return (
    <section id="mixes" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <div className="mixes-container">
        {section.mixes.map((mix, i) => (
          <div key={i} className="mix-card">
            <h4>{mix.title}</h4>
            <p className="mix-meta">{mix.date} · {mix.duration}</p>
            <div className="mix-player">
              <iframe
                title={`SoundCloud: ${mix.title}`}
                loading="lazy"
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={mix.soundcloudUrl}
                sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation-by-user-activation"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Section 10: Live Performance
 */
function Section10Live({ section }) {
  return (
    <section id="live" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <div className="live-container">
        <div className="live-formats">
          <h3>Performance Formats</h3>
          <table className="formats-table">
            <tbody>
              {section.formats.map((fmt, i) => (
                <tr key={i}>
                  <td className="fmt-name">{fmt.name}</td>
                  <td className="fmt-duration">{fmt.duration}</td>
                  <td className="fmt-caps">{fmt.requiredCaps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="live-requirements">
          <h3>Requirements</h3>
          <ul>
            {Object.entries(section.requirements).map(([key, val], i) => (
              <li key={i}><strong>{key}:</strong> {val}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/**
 * Section 11: Tech Rider — proper table format
 */
function Section11Tech({ section }) {
  return (
    <section id="tech" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <div className="tech-rider">
        {section.sections.map((cat, i) => (
          <div key={i} className="tech-category">
            <h3>{cat.category}</h3>
            <table className="tech-table">
              <tbody>
                {cat.items.map((item, j) => (
                  <tr key={j}>
                    <td className="tech-diamond">&#x25C6;</td>
                    <td className="tech-item">{item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Section 12: Hospitality Rider
 */
function Section12Hospitality({ section }) {
  return (
    <section id="hosp" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <div className="hospitality-rider">
        {section.sections.map((cat, i) => (
          <div key={i} className="hosp-category">
            <h3>{cat.category}</h3>
            <ul className="hosp-list">
              {cat.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Section 13: Shows/Dates
 */
function Section13Shows({ section }) {
  return (
    <section id="shows" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <div className="shows-grid">
        {section.events.map((event, i) => (
          <div key={i} className={`show-card show-${event.type}`}>
            <p className="show-date">{event.date}</p>
            <h4>{event.venue}</h4>
            <p className="show-location">{event.location}</p>
            <p className="show-time">{event.time}</p>
            <span className="show-badge">{event.type === 'festival' ? 'FESTIVAL' : 'CONFIRMED'}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Section 14: Availability Codex
 */
function Section14Availability({ section }) {
  return (
    <section id="availability" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <p className="availability-desc">{section.description}</p>
      <div className="availability-grid">
        {section.seasons.map((season, i) => (
          <div key={i} className="availability-card">
            <div className="avail-icon">{season.icon}</div>
            <h4 className="avail-season">{season.name}</h4>
            <p className="avail-months">{season.months}</p>
            <span className={`avail-status avail-status-${season.status.toLowerCase()}`}>{season.status}</span>
            <p className="avail-note">{season.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Section 15: Contact
 */
function Section15Contact({ section }) {
  return (
    <section id="contact" className="epk-section">
      <SectionHeader number={section.number} label={section.label} title={section.title} />
      <p className="contact-message">{section.message}</p>
      <div className="contact-cards">
        {section.contacts.map((contact, i) => (
          <div key={i} className="contact-card">
            <p className="contact-label">{contact.label}</p>
            <h4>{contact.name}</h4>
            <a href={`mailto:${contact.email}`} className="contact-email">{contact.email}</a>
            <p className="contact-note">{contact.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Section Header Component
 */
function SectionHeader({ number, label, title }) {
  return (
    <div className="sec-head">
      <div className="sec-head-num left">{number}</div>
      <div className="sec-head-text">
        <p className="sec-label">{label}</p>
        <h2 className="sec-title" dangerouslySetInnerHTML={{__html: title}}></h2>
      </div>
      <div className="sec-head-num right">{number}</div>
    </div>
  )
}

/**
 * Download Cluster Component
 */
function DownloadCluster() {
  const [isMinimized, setIsMinimized] = useState(false)

  function handleDownloadEPK() {
    console.log('Download full EPK PDF')
  }

  function handleDownloadOnePager() {
    console.log('Download one-pager PDF')
  }

  return (
    <div className={`download-cluster ${isMinimized ? 'minimized' : ''}`}>
      <button
        className="download-toggle"
        onClick={() => setIsMinimized(!isMinimized)}
        aria-label={isMinimized ? 'Expand downloads' : 'Minimize downloads'}
      >
        &#x25BC;
      </button>
      <div className="download-cards">
        <button className="download-card primary" onClick={handleDownloadEPK}>
          <div className="download-thumb">&#x1F4C4;</div>
          <div className="download-info">
            <span className="download-name">EPK Full</span>
            <span className="download-desc">Press Kit · PDF</span>
          </div>
          <span className="download-arrow">&#x2193;</span>
        </button>
        <button className="download-card" onClick={handleDownloadOnePager}>
          <div className="download-thumb">&#x1F4C4;</div>
          <div className="download-info">
            <span className="download-name">One-Pager</span>
            <span className="download-desc">Quick Brief · PDF</span>
          </div>
          <span className="download-arrow">&#x2193;</span>
        </button>
      </div>
    </div>
  )
}

/**
 * EPK Footer
 */
function EPKFooter() {
  const languages = ['EN', 'DE', 'ES', 'FR', 'IT', 'PT', 'NL', 'DA', 'SV', 'HE', 'AR']

  return (
    <footer className="epk-footer">
      <div className="epk-footer-inner">
        <div className="epk-footer-brand">
          <p className="epk-footer-name">YEHOSUA HIMSELF</p>
          <p className="epk-footer-sub">Sound of God Recordings · Est. 2025</p>
        </div>
        <div className="epk-footer-lang">
          <p className="epk-footer-lang-label">LANGUAGE</p>
          <div className="epk-footer-lang-list">
            {languages.map((lang, i) => (
              <span key={i} className={`epk-footer-lang-item ${lang === 'EN' ? 'active' : ''}`}>{lang}</span>
            ))}
          </div>
        </div>
        <p className="epk-footer-copy">&copy; 2026 YEHOSUA HIMSELF. All rights reserved.</p>
      </div>
    </footer>
  )
}
