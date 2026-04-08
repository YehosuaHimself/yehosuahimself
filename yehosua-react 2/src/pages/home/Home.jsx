import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePageContext } from '../../context/PageContext';
import SectionHeader from '../../components/shared/SectionHeader';
import RevealOnScroll from '../../components/shared/RevealOnScroll';
import './Home.css';

const Home = ({ containerRef }) => {
  const { goPage } = usePageContext();
  const canvasRef = useRef(null);
  const galleryScrollRef = useRef(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // ─── Canvas wave animation ───────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      t += 0.018;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Wave 1
      ctx.strokeStyle = 'rgba(160, 104, 32, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2
          + Math.sin((x * 0.012 + t)) * 35
          + Math.cos((x * 0.006 - t * 0.7)) * 20;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Wave 2 (subtler)
      ctx.strokeStyle = 'rgba(160, 104, 32, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2
          + Math.sin((x * 0.008 - t * 1.2)) * 25
          + Math.cos((x * 0.015 + t * 0.4)) * 15;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ─── Smooth scroll to section (uses the fixed container) ──
  const scrollToSection = useCallback((e, sectionId) => {
    e.preventDefault();
    const container = containerRef?.current;
    const target = document.getElementById(sectionId);
    if (container && target) {
      const offset = target.getBoundingClientRect().top + container.scrollTop - 64; // 64 = nav height
      container.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, [containerRef]);

  // ─── Gallery navigation ───────────────────────────────────
  const galleryItems = [
    { id: 1, location: 'Alps',      image: '/images/image-1.webp' },
    { id: 2, location: 'Munich',    image: '/images/image-4.webp' },
    { id: 3, location: 'Algarve',   image: '/images/image-7.webp' },
    { id: 4, location: 'Vienna',    image: '/images/image-8.webp' },
    { id: 5, location: 'Madrid',    image: '/images/image-9.webp' },
    { id: 6, location: 'Barcelona', image: '/images/image-10.webp' },
  ];

  const scrollGallery = useCallback((dir) => {
    const el = galleryScrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.hm-gallery-card')?.offsetWidth || 300;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: 'smooth' });
  }, []);

  // ─── Event data ───────────────────────────────────────────
  const events = [
    { day: '04', month: 'APR 2026', name: 'Voltage Underground',   venue: 'Tresor Keller, Berlin',    city: 'Berlin, DE',     genre: 'Techno'            },
    { day: '09', month: 'APR 2026', name: 'Parallax — Open Rave',  venue: 'Chlor Club, Vienna',       city: 'Vienna, AT',     genre: 'Psytrance'         },
    { day: '12', month: 'APR 2026', name: 'Signal Path Festival',  venue: 'Patronaat, Haarlem',       city: 'Haarlem, NL',    genre: 'Techno · Psytrance'},
    { day: '17', month: 'APR 2026', name: 'Depth Ritual II',       venue: 'Shelter, Amsterdam',       city: 'Amsterdam, NL',  genre: 'Dark Techno'       },
    { day: '19', month: 'APR 2026', name: 'Resonance Kollektiv',   venue: 'OT301, Amsterdam',         city: 'Amsterdam, NL',  genre: 'Industrial'        },
    { day: '24', month: 'APR 2026', name: 'Meridian Spring Rave',  venue: 'Paradiso, Amsterdam',      city: 'Amsterdam, NL',  genre: 'Techno · Acid'     },
    { day: '30', month: 'APR 2026', name: 'Convergence Festival',  venue: 'Gashouder, Amsterdam',     city: 'Amsterdam, NL',  genre: 'Techno · Ambient'  },
    { day: '05', month: 'MAY 2026', name: 'Echoes Madrid',         venue: 'Fabrik, Madrid',           city: 'Madrid, ES',     genre: 'Psytrance · Techno'},
  ];

  // ─── Form state ───────────────────────────────────────────
  const [formState, setFormState] = useState({ submitting: false, succeeded: false, error: null });
  const [formData, setFormData] = useState({ name: '', email: '', festival_venue: '', location: '', event_date: '', genre_focus: '', message: '' });

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ submitting: true, succeeded: false, error: null });
    try {
      const res = await fetch('https://formspree.io/f/xblgyznq', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState({ submitting: false, succeeded: true, error: null });
        setFormData({ name: '', email: '', festival_venue: '', location: '', event_date: '', genre_focus: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      setFormState({ submitting: false, succeeded: false, error: 'Submission failed. Please email booking@yehosua.com directly.' });
    }
  };

  return (
    <div id="pg-home">

      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="hm-hero" id="hmHero" aria-label="Hero">
        <div className="hm-hero-bg" aria-hidden="true">
          <img
            src="/images/hero-home-bg.webp"
            alt=""
            className="hm-hero-img"
            fetchpriority="high"
          />
        </div>
        <div className="hm-hero-vignette" aria-hidden="true" />
        <div className="hm-hero-scan"     aria-hidden="true" />

        <div className="hm-hero-inner">
          <div className="hm-eyebrow">Sound of God Recordings · 2026 Season</div>

          <h1 className="hm-hero-name">
            YEHOSUA<br />
            <em>HIMSELF</em>
          </h1>

          <div className="hm-hero-roles" role="list">
            <span className="hm-hero-role" role="listitem">DJ</span>
            <span className="hm-hero-sep" aria-hidden="true" />
            <span className="hm-hero-role" role="listitem">Producer</span>
            <span className="hm-hero-sep" aria-hidden="true" />
            <span className="hm-hero-role" role="listitem">Sonic Wanderer</span>
          </div>

          <div className="hm-hero-ctas">
            <a
              href="#hm-upcoming"
              className="hm-cta-btn"
              onClick={(e) => scrollToSection(e, 'hm-upcoming')}
            >
              Upcoming Dates
            </a>
            <a
              href="#hm-contact"
              className="hm-cta-btn hm-cta-secondary"
              onClick={(e) => scrollToSection(e, 'hm-contact')}
            >
              Book / Inquire
            </a>
          </div>
        </div>

        <div className="hm-hero-scroll" aria-hidden="true">
          <div className="hm-scroll-line" />
          <div className="hm-scroll-txt">Scroll</div>
        </div>
      </section>

      <hr className="hm-div" />

      {/* ─── MARQUEE ─────────────────────────────────────── */}
      <div className="hm-marquee" aria-hidden="true">
        <div className="hm-marquee-inner">
          {/* Duplicated for seamless infinite loop */}
          {['TECHNO', '·', 'PSYTRANCE', '·', 'SONIC WANDERER', '·', 'DJING ACROSS EUROPE', '·', 'SOUND OF GOD RECORDINGS', '·',
            'TECHNO', '·', 'PSYTRANCE', '·', 'SONIC WANDERER', '·', 'DJING ACROSS EUROPE', '·', 'SOUND OF GOD RECORDINGS', '·',
          ].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      <hr className="hm-div" />

      {/* ═══════════════════════════════════════════════════
          01 — THE SOUND
      ═══════════════════════════════════════════════════ */}
      <section className="hm-s hm-sound" id="hm-sound" aria-label="The Sound">
        <SectionHeader number="01" label="The Sonic Universe" title="THE SOUND" />

        <div className="hm-sound-content">
          <RevealOnScroll>
            <div className="hm-sound-players">
              <div className="hm-sc-player">
                <iframe
                  title="YEHOSUA HIMSELF — Peak at Kingdom Festival"
                  loading="lazy"
                  width="100%" height="166"
                  scrolling="no" frameBorder="no" allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2289842570&color=%23a06820&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&show_playcount=false&liking=false&sharing=false&buying=false&download=false"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation-by-user-activation"
                />
              </div>
              <div className="hm-sc-player">
                <iframe
                  title="YEHOSUA HIMSELF — Closing at Tunes of Sand"
                  loading="lazy"
                  width="100%" height="166"
                  scrolling="no" frameBorder="no" allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2280094370&color=%23a06820&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&show_playcount=false&liking=false&sharing=false&buying=false&download=false"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation-by-user-activation"
                />
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <canvas ref={canvasRef} className="hm-wave-canvas" aria-hidden="true" />
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="hm-genre-row">
              <div className="hm-genre-label">Techno</div>
              <div className="hm-genre-arrow" aria-hidden="true">⟵</div>
              <div className="hm-genre-center">Convergence</div>
              <div className="hm-genre-arrow" aria-hidden="true">⟶</div>
              <div className="hm-genre-label">Psytrance</div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <hr className="hm-div" />

      {/* ─── LATEST RELEASE ──────────────────────────────── */}
      <div className="hm-latest-band">
        <div className="hm-latest-label">Latest Release</div>
        <div className="hm-latest-title">ARRIVAL</div>
      </div>
      <div className="hm-latest-player">
        <iframe
          title="YEHOSUA HIMSELF — ARRIVAL"
          loading="lazy"
          width="100%" height="166"
          scrolling="no" frameBorder="no" allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2292147281&color=%23a06820&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&show_playcount=false&liking=false&sharing=false&buying=false&download=false"
          sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation-by-user-activation"
        />
      </div>

      <hr className="hm-div" />

      {/* ─── QUOTE BAND ──────────────────────────────────── */}
      <div className="hm-quote-band">
        <div className="hm-quote-text">GOD IS A DJ · MUSIC IS RELIGION</div>
      </div>

      <hr className="hm-div" />

      {/* ═══════════════════════════════════════════════════
          02 — THE ARTIST
      ═══════════════════════════════════════════════════ */}
      <section className="hm-s hm-artist" id="hm-artist" aria-label="The Artist">
        <SectionHeader number="02" label="About the Artist" title="THE ARTIST" />

        <RevealOnScroll>
          <div className="hm-artist-content">
            <div className="hm-artist-bio">
              <p>
                YEHOSUA HIMSELF is an electronic music visionary walking the intersection of
                transcendence and rhythm. Over 10,000 km of the Alpine mountains and across Europe,
                this Sonic Wanderer has crafted a unique path: producer of introspective techno,
                spiritual psytrance, and sonic architecture that dissolves boundaries between
                dancefloor and meditation.
              </p>
              <p>
                Founded in the alpine silence, YEHOSUA's sound emerges from pilgrimage—literal and
                metaphorical. Each track is a waypoint in a larger journey. Each set is a ritual.
                Sound of God Recordings embodies this philosophy: music as sacred transmutation.
              </p>
              <a
                href="#hm-pilgrimage"
                className="hm-artist-link"
                onClick={(e) => scrollToSection(e, 'hm-pilgrimage')}
              >
                Explore the Alpine Journey →
              </a>
            </div>
            <div className="hm-artist-portrait">
              <img
                src="/images/image-1.webp"
                alt="YEHOSUA HIMSELF — Artist Portrait"
                className="hm-portrait-img"
                loading="lazy"
                width="600" height="800"
              />
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <hr className="hm-div" />

      {/* ═══════════════════════════════════════════════════
          03 — THE JOURNEY
      ═══════════════════════════════════════════════════ */}
      <section className="hm-s hm-pilgrimage" id="hm-pilgrimage" aria-label="The Journey">
        <SectionHeader number="03" label="The Pilgrimage" title="THE JOURNEY" />

        <RevealOnScroll>
          <div className="hm-journey-content">
            <div className="hm-journey-stats" role="list">
              <div className="hm-stat" role="listitem">
                <div className="hm-stat-number">10,000+</div>
                <div className="hm-stat-label">KM on Foot</div>
              </div>
              <div className="hm-stat" role="listitem">
                <div className="hm-stat-number">18</div>
                <div className="hm-stat-label">European Nations</div>
              </div>
              <div className="hm-stat" role="listitem">
                <div className="hm-stat-number">365</div>
                <div className="hm-stat-label">Days of Journey</div>
              </div>
            </div>
            <p className="hm-journey-text">
              This is not a tour. This is a pilgrimage. Walking from the Matterhorn to the Aegean,
              YEHOSUA has traversed the spine of Europe on foot, gathering sounds, absorbing sacred
              geography, and transforming every step into signal. The Alpine journey is the origin myth
              of this music.
            </p>
          </div>
        </RevealOnScroll>

        <div
          className="hm-journey-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url('/images/image-1.webp')` }}
        />
      </section>

      <hr className="hm-div" />

      {/* ═══════════════════════════════════════════════════
          04 — VISUAL ARCHIVE
      ═══════════════════════════════════════════════════ */}
      <section className="hm-s hm-gallery" id="hm-gallery" aria-label="Visual Archive">
        <SectionHeader number="04" label="Visual Documentation" title="VISUAL ARCHIVE" />

        <RevealOnScroll>
          <div className="hm-gallery-container">
            <div className="hm-gallery-scroll" ref={galleryScrollRef}>
              {galleryItems.map((item) => (
                <div key={item.id} className="hm-gallery-card">
                  <img
                    src={item.image}
                    alt={`${item.location} — YEHOSUA HIMSELF`}
                    loading="lazy"
                    width="400" height="400"
                  />
                  <div className="hm-gallery-label">{item.location}</div>
                </div>
              ))}
            </div>

            <div className="hm-gallery-nav">
              <button
                className="hm-gallery-arrow hm-gallery-prev"
                aria-label="Previous images"
                onClick={() => scrollGallery(-1)}
              >←</button>
              <button
                className="hm-gallery-arrow hm-gallery-next"
                aria-label="Next images"
                onClick={() => scrollGallery(1)}
              >→</button>
            </div>

            <div className="hm-gallery-stats">
              <span className="hm-gallery-count">6 Locations</span>
              <span className="hm-gallery-sep" aria-hidden="true">·</span>
              <span className="hm-gallery-desc">Alps · Mountains · Cities · Venues</span>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <hr className="hm-div" />

      {/* ═══════════════════════════════════════════════════
          05 — THE CALENDAR
      ═══════════════════════════════════════════════════ */}
      <section className="hm-s hm-upcoming" id="hm-upcoming" aria-label="Upcoming Dates">
        <SectionHeader number="05" label="Confirmed Dates" title="THE CALENDAR" />

        <RevealOnScroll>
          <div className="hm-ev-count" aria-live="polite">8 Confirmed Dates · 2026</div>

          <div className="hm-ev-grid" role="list">
            {events.map((event) => (
              <article key={`${event.day}-${event.month}`} className="hm-ev-card" role="listitem">
                <div className="hm-ev-date-wrap">
                  <div className="hm-ev-day">{event.day}</div>
                  <div className="hm-ev-month">{event.month}</div>
                </div>
                <div className="hm-ev-name">{event.name}</div>
                <div className="hm-ev-venue">{event.venue}</div>
                <div className="hm-ev-city">{event.city}</div>
                <div className="hm-ev-footer">
                  <span className="hm-ev-type">{event.genre}</span>
                  <button
                    className="hm-ev-join"
                    onClick={(e) => scrollToSection(e, 'hm-contact')}
                    aria-label={`Join ${event.name} — contact for booking`}
                  >
                    Join →
                  </button>
                </div>
              </article>
            ))}
      2   </div>
        </RevealOnScroll>
      </section>

      <hr className="hm-div" />

      {/* ═══════════════════════════════════════════════════
          06 — OPEN WINDOWS (BOOKING CODEX)
      ═══════════════════════════════════════════════════ */}
      <section className="hm-s hm-booking" id="hm-booking" aria-label="Booking Windows">
        <SectionHeader number="06" label="Availability & Booking" title="OPEN WINDOWS" />

        <RevealOnScroll>
          <div className="codex-grid">
            <div className="codex-card codex-limited">
              <div className="codex-card-ghost" aria-hidden="true">S</div>
              <div className="codex-card-status-row">
                <span className="codex-status-dot" aria-hidden="true" />
                <span className="codex-status-label">Last Dates — Priority Open</span>
              </div>
              <div className="codex-card-period">Summer<br />2026</div>
              <span className="codex-card-sub">Riviera · Priority Season</span>
              <div className="codex-card-detail">
                The peak. Côte d'Azur, Algarve, festival mainstages. <strong>Mostly claimed.</strong>
              </div>
              <div className="codex-scarcity">⚑&nbsp;&nbsp;2–3 dates remain · Negotiating now</div>
              <a href="#hm-contact" className="codex-card-cta" onClick={(e) => scrollToSection(e, 'hm-contact')}>
                Claim Your Date →
              </a>
            </div>

            <div className="codex-card codex-limited">
              <div className="codex-card-ghost" aria-hidden="true">A</div>
              <div className="codex-card-status-row">
                <span className="codex-status-dot" aria-hidden="true" />
                <span className="codex-status-label">Selective — Enquire Now</span>
              </div>
              <div className="codex-card-period">Autumn<br />/ Winter</div>
              <span className="codex-card-sub">October–December 2026</span>
              <div className="codex-card-detail">
                October is sealed. November & December:<br />
                <strong>selective — curated enquiries only.</strong>
              </div>
              <div className="codex-scarcity">◈&nbsp;&nbsp;Nov–Dec · Only 4 Slots Remain</div>
              <a href="#hm-contact" className="codex-card-cta" onClick={(e) => scrollToSection(e, 'hm-contact')}>
                Reserve a Date →
              </a>
            </div>

            <div className="codex-card codex-limited">
              <div className="codex-card-ghost" aria-hidden="true">Q</div>
              <div className="codex-card-status-row">
                <span className="codex-status-dot" aria-hidden="true" />
                <span className="codex-status-label">Closing — Final Slots</span>
              </div>
              <div className="codex-card-period">Q1 – Q2<br />2026</div>
              <span className="codex-card-sub">January–June 2026</span>
              <div className="codex-card-detail">
                Q1 is sealed. May & June: <strong>final 2 dates available.</strong> Priority given to festivals.
              </div>
              <div className="codex-scarcity">⚑&nbsp;&nbsp;May–Jun · Last 2 dates · Act now</div>
              <a href="#hm-contact" className="codex-card-cta" onClick={(e) => scrollToSection(e, 'hm-contact')}>
                Reserve 2026 Date →
              </a>
            </div>

            <div className="codex-card codex-open">
              <div className="codex-card-ghost" aria-hidden="true">O</div>
              <div className="codex-card-status-row">
                <span className="codex-status-dot" aria-hidden="true" />
                <span className="codex-status-label">Window Open</span>
              </div>
              <div className="codex-card-period">Q3 – Q4<br />2026</div>
              <span className="codex-card-sub">July–December 2026</span>
              <div className="codex-card-detail">
                The later season is open for enquiry. <strong>Early commitments welcomed.</strong>
              </div>
              <div className="codex-scarcity">◌&nbsp;&nbsp;Q3–Q4 · Enquiries welcome</div>
              <a href="#hm-contact" className="codex-card-cta" onClick={(e) => scrollToSection(e, 'hm-contact')}>
                Secure Your Window →
              </a>
            </div>
          </div>

          <div className="codex-footer">
            <p className="codex-footer-note">
              Selective booking only. Management reviews all enquiries within 72 hours.
              Confirmed holds require signed contract. Lead time: minimum 3 weeks.
            </p>
            <a href="#hm-contact" className="btn-reserve-premium" onClick={(e) => scrollToSection(e, 'hm-contact')}>
              Reserve a Date →
            </a>
          </div>
        </RevealOnScroll>
      </section>

      <hr className="hm-div" />

      {/* ═══════════════════════════════════════════════════
          07 — LET'S CONNECT
      ═══════════════════════════════════════════════════ */}
      <section className="hm-s hm-contact" id="hm-contact" aria-label="Contact and Booking">
        <SectionHeader number="07" label="Booking & Inquiries" title="LET'S CONNECT" />

        <RevealOnScroll>
          <div className="hm-book-block">
            <div className="hm-book-col">
              <div className="hm-book-label">Festival &amp; Agency Bookings</div>
              <div className="hm-book-name">Management</div>
     0        <a href="mailto:booking@yehosua.com" className="hm-book-email">booking@yehosua.com</a>
            </div>
            <div className="hm-book-col">
              <div className="hm-book-label">Media &amp; Press Inquiries</div>
              <div className="hm-book-name">Press</div>
              <a href="mailto:press@yehosua.com" className="hm-book-email">press@yehosua.com</a>
            </div>
            <div className="hm-book-col">
              <div className="hm-book-label">Sound of God Recordings</div>
              <div className="hm-book-name">Label</div>
              <a href="mailto:label@soundofgod.com" className="hm-book-email">label@soundofgod.com</a>
            </div>
          </div>

          <div className="hm-form-container">
            <h3 className="hm-form-title">Booking Inquiry Form</h3>

            {formState.succeeded ? (
              <div className="hm-form-success" role="status">
                <div className="hm-form-success-icon">✓</div>
                <p>Your inquiry has been received. We'll respond within 72 hours.</p>
              </div>
            ) : (
              <form
                className="hm-form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Booking inquiry form"
              >
                <div className="hm-form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="hm-form-input"
                    value={formData.name}
                    onChange={handleFormChange}
                    aria-label="Your name"
                    autoComplete="name"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="hm-form-input"
                    value={formData.email}
                    onChange={handleFormChange}
                    aria-label="Email address"
                    autoComplete="email"
                  />
                </div>

                <div className="hm-form-row">
                  <input
                    type="text"
                    name="festival_venue"
                    placeholder="Festival / Venue Name"
                    required
                    className="hm-form-input"
                    value={formData.festival_venue}
                    onChange={handleFormChange}
                    aria-label="Festival or venue name"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="City / Country"
                    required
                    className="hm-form-input"
                    value={formData.location}
                    onChange={handleFormChange}
                    aria-label="City and country"
                  />
                </div>

                <div className="hm-form-row">
                  <input
                    type="date"
                    name="event_date"
                    required
                    className="hm-form-input"
                    value={formData.event_date}
                    onChange={handleFormChange}
                    aria-label="Event date"
                  />
                  <select
                    name="genre_focus"
                    className="hm-form-input"
                    value={formData.genre_focus}
                    onChange={handleFormChange}
                    aria-label="Genre focus"
                  >
                    <option value="">Select Genre Focus</option>
                    <option value="techno">Techno</option>
                    <option value="psytrance">Psytrance</option>
                    <option value="industrial">Industrial</option>
                    <option value="ambient">Ambient</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>

                <textarea
                  name="message"
                  placeholder="Tell us about your event, venue capacity, audience, and any special requirements..."
                  rows="5"
                  className="hm-form-textarea"
                  value={formData.message}
                  onChange={handleFormChange}
                  aria-label="Event details and requirements"
                />

                {formState.error && (
                  <div className="hm-form-error" role="alert">{formState.error}</div>
                )}

                <button
                  type="submit"
                  className="hm-form-submit"
                  disabled={formState.submitting}
                  aria-busy={formState.submitting}
                >
                  {formState.submitting ? 'Sending…' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </RevealOnScroll>
      </section>

      <hr className="hm-div" />
    </div>
  );
};

export default Home;
