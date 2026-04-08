import React, { useState, useEffect, useRef, memo } from 'react'
import { usePageContext } from '../../context/PageContext'
import SectionHeader from '../../components/shared/SectionHeader'
import RevealOnScroll from '../../components/shared/RevealOnScroll'
import './Label.css'

/**
 * Label Page - Sound of God Recordings
 * Dark-themed page with gradient from black (#000) to cream (#f5f0e8)
 * Sections: Vision, Releases, Roster, Events, Kingdom Festival, Radio, Press, Contact
 */

// Event data
const EVENTS = [
  {
    date: '17',
    month: 'MAY',
    artist: 'YEHOSUA HIMSELF',
    title: 'Sonic Journey',
    venue: 'Parallax Club',
    city: 'Vienna, AT',
    status: 'OPEN',
    statusType: 'open',
  },
  {
    date: '06',
    month: 'JUN',
    artist: 'Lia Bergmann',
    title: 'Psy Sessions',
    venue: 'Axiom Hall',
    city: 'Amsterdam, NL',
    status: 'OPEN',
    statusType: 'open',
  },
  {
    date: '20',
    month: 'JUN',
    artist: 'SOUND OF GOD',
    title: 'Kingdom Festival 2026',
    venue: 'Quinta da Pedra Negra',
    city: 'Algarve, PT',
    status: 'FESTIVAL',
    statusType: 'festival',
    isFeatured: true,
  },
  {
    date: '05',
    month: 'JUL',
    artist: 'VESPER NULL',
    title: 'Year Null Tour — Lisbon',
    venue: 'Lux Frágil',
    city: 'Lisbon, PT',
    status: 'CONFIRMED',
    statusType: 'confirmed',
  },
  {
    date: '19',
    month: 'JUL',
    artist: 'YEHOSUA HIMSELF',
    title: 'Côte d'Azur Sunset Session',
    venue: 'Le Rooftop',
    city: 'Nice, FR',
    status: 'OPEN',
    statusType: 'open',
  },
  {
    date: '02',
    month: 'AUG',
    artist: 'SONUS-QUI',
    title: 'Deep Frequency',
    venue: 'Fabrik',
    city: 'Madrid, ES',
    status: 'CONFIRMED',
    statusType: 'confirmed',
  },
  {
    date: '23',
    month: 'AUG',
    artist: 'MARTHA',
    title: 'Deep Sessions',
    venue: 'Warehouse Project',
    city: 'Manchester, UK',
    status: 'OPEN',
    statusType: 'open',
  },
  {
    date: '12',
    month: 'SEP',
    artist: 'YEHOSUA HIMSELF',
    title: 'Iberian Summer Closing',
    venue: 'Tarifa Beach Stage',
    city: 'Tarifa, ES',
    status: 'OPEN',
    statusType: 'open',
  },
]

// Releases data
const RELEASES = [
  { id: 'SGR012', title: 'ARRIVAL', artist: 'YEHOSUA HIMSELF', year: 2025, isLatest: true },
  { id: 'SGR011', title: "IT'S ME", artist: 'YEHOSUA HIMSELF', year: 2025 },
  { id: 'SGR010', title: 'YOD - SHIN - WAV', artist: 'YEHOSUA HIMSELF', year: 2025 },
  { id: 'SGR009', title: 'KING', artist: 'YEHOSUA HIMSELF', year: 2025 },
  { id: 'SGR008', title: 'I AM THE RESURRECTION', artist: 'YEHOSUA HIMSELF', year: 2025 },
  { id: 'SGR007', title: 'I WAS PAUL', artist: 'YEHOSUA HIMSELF', year: 2025 },
  { id: 'SGR006', title: 'MY GUILTLESS SON IS YOU', artist: 'YEHOSUA HIMSELF', year: 2025 },
  { id: 'SGR005', title: 'ETERNAL LIFE', artist: 'YEHOSUA HIMSELF', year: 2025 },
  { id: 'SGR004', title: 'THE URTEXT IS A MIRACLE', artist: 'YEHOSUA HIMSELF', year: 2025 },
  { id: 'SGR003', title: 'THE SECOND IS REAL', artist: 'YEHOSUA HIMSELF', year: 2025 },
  { id: 'SGR002', title: 'GOD IS A DJ', artist: 'YEHOSUA HIMSELF', year: 2025 },
  { id: 'SGR001', title: 'SONIC WANDERER', artist: 'YEHOSUA HIMSELF', year: 2025 },
]

// Roster data
const ROSTER = [
  { num: '01', name: 'Lia Bergmann', genre: 'Minimal / Psy' },
  { num: '02', name: 'YEHOSUA HIMSELF', genre: 'Psytechno', isHeadliner: true },
  { num: '03', name: 'SONUS-QUI', genre: 'Techno / Minimal' },
  { num: '04', name: 'VESPER NULL', genre: 'EDM / Electro' },
  { num: '05', name: 'MARTHA', genre: 'Deep Tech' },
  { num: '06', name: 'JULIETTE', genre: 'Psytrance' },
  { num: '07', name: 'ANNE P.', genre: 'Trance / Psytrance' },
]

// Press quotes
const PRESS = [
  {
    quote:
      '"SOUND OF GOD RECORDINGS has quietly become one of the most important independent labels operating in the European underground. Every release feels like a manifesto."',
    source: 'Underground Wire Magazine — 2025',
  },
  {
    quote:
      '"YEHOSUA HIMSELF\'s ARRIVAL is a landmark record. Dense, deliberate, and brutally beautiful — the product of a label that refuses to compromise."',
    source: 'Frequency Journal — 2025',
  },
  {
    quote:
      '"A label run on integrity alone. In an era of algorithmic noise, SOUND OF GOD RECORDINGS sounds like a fist through drywall."',
    source: 'Bassline Review — 2025',
  },
]

// Radio shows
const RADIO_SHOWS = [
  { time: 'Mon / 22:00 CET', name: 'BACK ON TRACK', host: 'YEHOSUA HIMSELF' },
  { time: 'Wed / 23:00 CET', name: 'Null Signal', host: 'VESPER NULL' },
  { time: 'Fri / 00:00 CET', name: 'Lia Live', host: 'Lia Bergmann' },
  { time: 'Sat / 01:00 CET', name: 'IN THE KESSEL', host: 'SONUS-QUI' },
]

/**
 * Internal Navigation Component
 */
const LabelNav = memo(function LabelNav() {
  const navItems = [
    { label: 'Vision', id: 'vision' },
    { label: 'Releases', id: 'releases' },
    { label: 'Roster', id: 'roster' },
    { label: 'Events', id: 'events' },
    { label: 'Kingdom', id: 'kingdom' },
    { label: 'Radio', id: 'radio' },
    { label: 'Connect', id: 'connect' },
  ]

  return (
    <nav className="label-nav">
      <div className="label-nav-logo">
        SOUND OF <span>GOD</span> RECORDINGS
      </div>
      <ul className="label-nav-links">
        {navItems.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
})

/**
 * Hero Section
 */
const HeroSection = memo(function HeroSection() {
  return (
    <section className="label-hero">
      <div className="hero-vignette"></div>
      <div className="hero-scan"></div>
      <div className="hero-inner">
        <div className="hero-eyebrow">Independent Electronic Label · Est. 2025</div>
        <h1 className="label-name">
          <span className="l-of">SOUND OF</span>
          <span className="l-god">GOD</span>
          <span>RECORDINGS</span>
        </h1>
        <div className="hero-meta">
          <span className="hero-role">Techno · Psytrance · Electronic</span>
          <span className="hero-sep"></span>
          <span className="hero-genre">Techno &amp; Psytrance Label</span>
        </div>
        <div className="hero-ctas">
          <a href="#releases" className="btn btn-primary">
            New Releases
          </a>
          <a href="#connect" className="btn btn-outline">
            OPEN THE DOOR
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="hscroll-line"></div>
        <span className="hscroll-txt">Scroll</span>
      </div>
    </section>
  )
})

/**
 * Marquee Band
 */
const MarqueeSection = memo(function MarqueeSection() {
  const items = ['Techno', 'Tech', 'Psytrance', 'Trance', 'Minimal', 'EDM']

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((item, idx) => (
          <span key={`marquee-${idx}`} className="marquee-item">
            {item} <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
})

/**
 * Vision/Manifesto Section
 */
const VisionSection = memo(function VisionSection() {
  return (
    <RevealOnScroll>
      <section className="label-section vision-section" id="vision">
        <SectionHeader
          number="01"
          label="Welcome to Eternity"
          title="THE <em>VISION</em>"
          variant="light"
        />

        <div className="manifesto-body">
          <div className="manifesto-number">01</div>
          <div className="manifesto-text">
            <p>
              We don't chase charts. We don't manufacture moments.{' '}
              <strong>
                We excavate sound from the places most labels fear to go
              </strong>{' '}
              — damp basements, raw concrete, the 4am hour when only the honest
              are still standing.
            </p>
            <p>
              SOUND OF GOD RECORDINGS was built by artists, for artists.{' '}
              <strong>Every release is a statement.</strong> Every event is a
              ritual. Every track we put out carries the weight of a decision:
              this matters, this is real, this belongs in the world.
            </p>
            <p>
              We operate across the spectrum — from the upperground to the
              underground. <strong>Sound has no ceiling and no floor.</strong>
            </p>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
})

/**
 * SoundCloud Embed Section
 */
const SoundCloudSection = memo(function SoundCloudSection() {
  return (
    <RevealOnScroll>
      <div className="sc-section">
        <div className="sc-wrap">
          <div className="sc-label">ELECTRIC SUNSET PEAK — AGUA, TARIFA</div>
          <div className="sc-iframe-wrap">
            <iframe
              width="100%"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation-by-user-activation"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2289842570&color=%23c4af96&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true&show_playcount=false&liking=false&sharing=false&buying=false&download=false"
              title="YEHOSUA HIMSELF — Electric Sunset Peak – Agua, Tarifa"
              loading="lazy"
              style={{ display: 'block', width: '100%', border: 0 }}
            ></iframe>
          </div>
          <span className="sc-note">
            Soundcloud used only internally and for press
          </span>
        </div>
      </div>
    </RevealOnScroll>
  )
})

/**
 * Waveform Divider
 */
const WaveformDivider = memo(function WaveformDivider() {
  return (
    <div className="wv-divider" aria-hidden="true">
      <canvas id="dnaCanvas" aria-hidden="true"></canvas>
      <div className="wv-quote-box">
        <p className="wv-quote">
          "The universe is created by frequency."
        </p>
        <span className="wv-attribution">— YEHOSUA HIMSELF</span>
      </div>
    </div>
  )
})

/**
 * Highlight Release
 */
const HighlightRelease = memo(function HighlightRelease() {
  return (
    <RevealOnScroll>
      <div className="highlight-release">
        <div className="highlight-release-inner">
          <div className="highlight-badge">Highlight Release</div>
          <div className="highlight-title">ARRIVAL</div>
          <div className="highlight-meta">
            YEHOSUA HIMSELF · SONIC WANDERER LP · SGR022
          </div>
          <div className="highlight-player-wrap">
            <iframe
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation-by-user-activation"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2292147281&color=%23f2e6e0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&show_playcount=false&liking=false&sharing=false&buying=false&download=false"
              title="YEHOSUA HIMSELF — ARRIVAL"
              loading="lazy"
              style={{ display: 'block', width: '100%', border: 0 }}
            ></iframe>
          </div>
          <span className="sc-note">
            Soundcloud used only internally and for press
          </span>
        </div>
      </div>
    </RevealOnScroll>
  )
})

/**
 * Releases Grid Section
 */
const ReleasesSection = memo(function ReleasesSection() {
  return (
    <RevealOnScroll>
      <section className="label-section releases-section" id="releases">
        <SectionHeader
          number="02"
          label="Latest Catalog"
          title="THE <em>CATALOGUE</em>"
          variant="light"
        />

        <div className="releases-grid">
          {RELEASES.map((release) => (
            <div
              key={release.id}
              className={`release-card ${release.isLatest ? 'latest' : ''}`}
            >
              <div className="rc-bg">{release.id}</div>
              <div className="rc-ov">
                <div className="rc-tag">
                  LP — {release.year}
                  {release.isLatest && ' · LATEST'}
                </div>
                <div className="rc-title">{release.title}</div>
                <div className="rc-artist">{release.artist}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </RevealOnScroll>
  )
})

/**
 * Photo Break
 */
const PhotoBreak = memo(function PhotoBreak() {
  return (
    <div className="photo-break">
      <div className="pb-overlay"></div>
      <div className="pb-text">
        <h2>
          Built by<br />
          <span>Sound</span>
        </h2>
        <p>Sound Of God Recordings · Est. 2025</p>
      </div>
    </div>
  )
})

/**
 * Roster Section
 */
const RosterSection = memo(function RosterSection() {
  return (
    <RevealOnScroll>
      <section className="label-section roster-section" id="roster">
        <SectionHeader
          number="03"
          label="Artists"
          title="THE <em>ARTISTS</em>"
          variant="light"
        />

        <div className="roster-list">
          {ROSTER.map((artist) => (
            <div key={artist.num} className="roster-item">
              <span className="roster-num">{artist.num}</span>
              <span className="roster-name">{artist.name}</span>
              {artist.isHeadliner && (
                <span className="roster-badge">Headliner</span>
              )}
              <span className="roster-genre">{artist.genre}</span>
              <span className="roster-arrow">→</span>
            </div>
          ))}
        </div>
      </section>
    </RevealOnScroll>
  )
})

/**
 * Sonic Identity Section
 */
const SonicIdentitySection = memo(function SonicIdentitySection() {
  const stats = [
    { num: '021', label: 'Releases' },
    { num: '7', label: 'Artists' },
    { num: '1', label: 'Years active' },
    { num: '+15', label: 'Countries toured' },
  ]

  return (
    <RevealOnScroll>
      <section className="label-section sonic-section">
        <SectionHeader
          number="04"
          label="The Sonic Identity"
          title="CORE"
          variant="light"
        />

        <div className="sonic-content">
          <div className="sonic-text">
            <p>
              We reject sonic cleanliness. Our catalogue lives in the
              frequencies that rattle ribs and blur vision — deep, dense,
              deliberate. Each release undergoes our analogue mastering
              process, preserving the weight and imperfection of real sound.
            </p>
            <div className="waveform-visualizer" id="waveform"></div>
          </div>

          <div className="sonic-stats">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-block">
                <div className="stat-num">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
})

/**
 * Events Section
 */
const EventsSection = memo(function EventsSection() {
  return (
    <RevealOnScroll>
      <section className="label-section events-section" id="events">
        <SectionHeader
          number="05"
          label="Live Circuit"
          title="UPCOMING<br /><em>DATES</em>"
          variant="light"
        />

        <div className="lbl-events-wrapper">
          <div className="lbl-ev-season-bar">
            <div className="lbl-ev-season-line"></div>
            <div className="lbl-ev-season-label">2026 SEASON</div>
            <div className="lbl-ev-season-line"></div>
          </div>

          <div className="lbl-ev-list">
            {EVENTS.map((event, idx) => (
              <div
                key={idx}
                className={`lbl-ev-row ${event.isFeatured ? 'featured' : ''}`}
              >
                <div className="lbl-ev-date-col">
                  <span className="lbl-ev-day">{event.date}</span>
                  <span className="lbl-ev-mth">{event.month}</span>
                </div>
                <div className="lbl-ev-divider"></div>
                <div className="lbl-ev-info">
                  <div className="lbl-ev-artist">{event.artist}</div>
                  <div className="lbl-ev-title">{event.title}</div>
                  <div className="lbl-ev-venue">
                    {event.venue} · {event.city}
                  </div>
                </div>
                <div className={`lbl-ev-badge lbl-ev-badge--${event.statusType}`}>
                  {event.status}
                </div>
              </div>
            ))}
          </div>

          <div className="lbl-ev-booking-cta">
            <div className="lbl-ev-cta-text">Booking &amp; Festival Partnerships</div>
            <a href="#connect" className="btn btn-primary">
              Enquire Now →
            </a>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
})

/**
 * Gate Break
 */
const GateBreak = memo(function GateBreak() {
  return (
    <div className="gate-break">
      <div className="gate-overlay"></div>
      <div className="gate-text">
        <h2>
          EVERY EVENT —<br />
          THE GATE<br />
          <span>INTO ETERNITY</span>
        </h2>
      </div>
    </div>
  )
})

/**
 * Kingdom Festival Section
 */
const KingdomSection = memo(function KingdomSection() {
  return (
    <RevealOnScroll>
      <section className="label-section festival-section" id="kingdom">
        <div className="fest-bg"></div>
        <div className="fest-vignette"></div>
        <div className="fest-content">
          <div className="fest-label">Annual Event</div>
          <a href="https://kingdom494.godaddysites.com/" target="_blank" rel="noopener noreferrer" className="fest-heading">
            Kingdom Festival
          </a>
          <div className="fest-date">June 20–21, 2026 · Algarve, Portugal</div>
          <div className="fest-lineup">
            <span className="hl">YEHOSUA HIMSELF</span>
            Lia Bergmann · SONUS-QUI · VESPER NULL · MARTHA · JULIETTE · ANNE P.
            <br />
            Special Guests TBA
          </div>
          <div className="fest-btns">
            <a href="#connect" className="btn btn-primary">
              Register Interest
            </a>
            <a href="https://kingdom494.godaddysites.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Explore →
            </a>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
})

/**
 * Radio Section
 */
const RadioSection = memo(function RadioSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <RevealOnScroll>
      <section className="label-section radio-section" id="radio">
        <SectionHeader
          number="06"
          label="In the Mix"
          title="THE <em>FREQUENCY</em>"
          variant="light"
        />

        <div className="radio-player">
          <button
            className={`play-btn ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlay}
            aria-label="Play or pause"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {isPlaying ? (
                <>
                  <rect x="4" y="3" width="4" height="14" />
                  <rect x="12" y="3" width="4" height="14" />
                </>
              ) : (
                <polygon points="6,3 17,10 6,17" />
              )}
            </svg>
          </button>
          <div className="radio-info">
            <div className="rl-wrap">
              <div className="pulse-dot"></div>
              <div className="pulse-text">Live Now</div>
            </div>
            <div className="radio-title">Piano B2B – Ohana, Los Caños de Meca</div>
            <div className="radio-artist">YEHOSUA HIMSELF</div>
          </div>
          <div className="radio-waveform" id="radioWave" aria-hidden="true"></div>
        </div>

        <div className="radio-shows">
          {RADIO_SHOWS.map((show, idx) => (
            <div key={idx} className="show-card">
              <div className="show-time">{show.time}</div>
              <div className="show-name">{show.name}</div>
              <div className="show-host">Hosted by {show.host}</div>
            </div>
          ))}
        </div>
      </section>
    </RevealOnScroll>
  )
})

/**
 * Press Section
 */
const PressSection = memo(function PressSection() {
  return (
    <RevealOnScroll>
      <section className="label-section press-section">
        <SectionHeader
          number="07"
          label="Coverage"
          title="Press"
          variant="light"
        />

        <div className="press-grid">
          {PRESS.map((item, idx) => (
            <div key={idx} className="press-card">
              <p className="press-quote">{item.quote}</p>
              <div className="press-source">{item.source}</div>
            </div>
          ))}
        </div>
      </section>
    </RevealOnScroll>
  )
})

/**
 * Contact Section
 */
const ContactSection = memo(function ContactSection() {
  const [formStatus, setFormStatus] = useState('idle') // idle, submitting, success, error
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('submitting')

    try {
      const formData = new FormData(formRef.current)
      const response = await fetch('https://formspree.io/f/mqegzgwk', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setFormStatus('success')
        formRef.current.reset()
        setTimeout(() => setFormStatus('idle'), 5000)
      } else {
        setFormStatus('error')
      }
    } catch (err) {
      setFormStatus('error')
      console.error('Form submission error:', err)
    }
  }

  return (
    <RevealOnScroll>
      <section className="label-section contact-section" id="connect">
        <SectionHeader
          number="08"
          label="Connect"
          title="LET'S WORK"
          variant="light"
        />

        <div className="contact-inner">
          <div className="contact-info">
            <p className="contact-desc">
              We listen to every demo. We read every message. We don't move
              fast — but we move with intention. If what you make belongs here,
              we want to hear it.
            </p>
            <div className="contact-links">
              <span className="contact-link">Demos &amp; A&amp;R</span>
              <span className="contact-link">Booking &amp; Live</span>
              <span className="contact-link">Press &amp; Media</span>
              <span className="contact-link">Distribution</span>
              <span className="contact-link">Licensing</span>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {formStatus === 'success' ? (
              <div className="form-success">
                <p>Message received — we'll be in touch.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group">
                  <label htmlFor="f-name">Your name</label>
                  <input
                    id="f-name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="f-email">Email address</label>
                  <input
                    id="f-email"
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="f-subject">Subject</label>
                  <select id="f-subject" name="subject">
                    <option>Demo submission</option>
                    <option>Booking enquiry</option>
                    <option>Kingdom Festival</option>
                    <option>Press</option>
                    <option>General</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="f-msg">Message</label>
                  <textarea
                    id="f-msg"
                    name="message"
                    placeholder="Tell us what you're working on..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>

                {formStatus === 'error' && (
                  <p className="form-error">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
})

/**
 * Main Label Page Component
 */
const Label = memo(function Label({ containerRef: propsContainerRef }) {
  const containerRef = propsContainerRef || useRef(null)

  useEffect(() => {
    // Initialize waveform visualization
    const waveformEl = document.getElementById('waveform')
    if (waveformEl && waveformEl.children.length === 0) {
      for (let i = 0; i < 48; i++) {
        const bar = document.createElement('div')
        bar.className = 'waveform-bar'
        const height = (0.15 + Math.random() * 0.85).toFixed(2)
        bar.style.setProperty('--h', height)
        bar.style.height = Math.round(height * 100) + '%'
        bar.style.animationDelay = (Math.random() * 1.2).toFixed(2) + 's'
        bar.style.animationDuration = (0.8 + Math.random() * 0.8).toFixed(2) + 's'
        waveformEl.appendChild(bar)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="label-page">
      <LabelNav />
      <HeroSection />
      <hr className="section-divider" />
      <MarqueeSection />
      <hr className="section-divider" />
      <VisionSection />
      <SoundCloudSection />
      <WaveformDivider />
      <HighlightRelease />
      <ReleasesSection />
      <PhotoBreak />
      <RosterSection />
      <hr className="section-divider" />
      <SonicIdentitySection />
      <hr className="section-divider" />
      <EventsSection />
      <GateBreak />
      <KingdomSection />
      <hr className="section-divider" />
      <RadioSection />
      <hr className="section-divider" />
      <PressSection />
      <hr className="section-divider" />
      <ContactSection />
    </div>
  )
})

export default Label
