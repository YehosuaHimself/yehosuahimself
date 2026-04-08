import React, { useEffect, useRef, useState } from 'react';
import { usePageContext } from '../../context/PageContext';
import SectionHeader from '../../components/shared/SectionHeader';
import RevealOnScroll from '../../components/shared/RevealOnScroll';
import './Home.css';

const Home = ({ containerRef }) => {
  const { goPage } = usePageContext();
  const canvasRef = useRef(null);

  // Canvas wave animation for sound section
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawWave = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(160, 104, 32, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x += 2) {
        const y =
          canvas.height / 2 +
          Math.sin((x * 0.01 + time) / 3) * 40 +
          Math.cos((x * 0.005 - time * 0.5) / 2) * 30;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      animationId = requestAnimationFrame(drawWave);
    };
    drawWave();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Event data
  const events = [
    {
      day: '04',
      month: 'APR 2026',
      name: 'Voltage Underground',
      venue: 'Tresor Keller, Berlin',
      city: 'Berlin, DE',
      genre: 'Techno',
    },
    {
      day: '09',
      month: 'APR 2026',
      name: 'Parallax — Open Rave',
      venue: 'Chlor Club, Vienna',
      city: 'Vienna, AT',
      genre: 'Psytrance',
    },
    {
      day: '12',
      month: 'APR 2026',
      name: 'Signal Path Festival',
      venue: 'Patronaat, Haarlem',
      city: 'Haarlem, NL',
      genre: 'Techno · Psytrance',
    },
    {
      day: '17',
      month: 'APR 2026',
      name: 'Depth Ritual II',
      venue: 'Shelter, Amsterdam',
      city: 'Amsterdam, NL',
      genre: 'Dark Techno',
    },
    {
      day: '19',
      month: 'APR 2026',
      name: 'Resonance Kollektiv',
      venue: 'OT301, Amsterdam',
      city: 'Amsterdam, NL',
      genre: 'Industrial',
    },
    {
      day: '24',
      month: 'APR 2026',
      name: 'Meridian Spring Rave',
      venue: 'Paradiso, Amsterdam',
      city: 'Amsterdam, NL',
      genre: 'Techno · Acid',
    },
    {
      day: '30',
      month: 'APR 2026',
      name: 'Convergence Festival',
      venue: 'Gashouder, Amsterdam',
      city: 'Amsterdam, NL',
      genre: 'Techno · Ambient',
    },
    {
      day: '05',
      month: 'MAY 2026',
      name: 'Echoes Madrid',
      venue: 'Fabrik, Madrid',
      city: 'Madrid, ES',
      genre: 'Psytrance · Techno',
    },
  ];

  // Gallery items
  const galleryItems = [
    { id: 1, location: 'Alps', image: '/images/image-1.webp' },
    { id: 2, location: 'Munich', image: '/images/image-4.webp' },
    { id: 3, location: 'Algarve', image: '/images/image-7.webp' },
    { id: 4, location: 'Vienna', image: '/images/image-8.webp' },
    { id: 5, location: 'Madrid', image: '/images/image-9.webp' },
    { id: 6, location: 'Barcelona', image: '/images/image-10.webp' },
  ];

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="pg-home">
      {/* ========== HERO SECTION ========== */}
      <section className="hm-hero" id="hmHero">
        <div
          className="hm-hero-bg"
          style={{
            backgroundImage: `url('/images/hero-home-bg.webp')`,
          }}
        >
          <img
            src="/images/hero-home-bg.webp"
            alt="YEHOSUA HIMSELF"
            className="hm-hero-img"
          />
        </div>
        <div className="hm-hero-vignette" />
        <div className="hm-hero-scan" />

        <div className="hm-hero-inner">
          <div className="hm-eyebrow">Sound of God Recordings · 2026 Season</div>
          <h1 className="hm-hero-name">
            YEHOSUA<br />
            <em>HIMSELF</em>
          </h1>
          <div className="hm-hero-roles">
            <span className="hm-hero-role">DJ</span>
            <span className="hm-hero-sep" />
            <span className="hm-hero-role">Producer</span>
            <span className="hm-hero-sep" />
            <span className="hm-hero-role">Sonic Wanderer</span>
          </div>

          <div className="hm-hero-ctas">
            <a href="#hm-upcoming" className="hm-cta-btn" onClick={(e) => scrollToSection(e, 'hm-upcoming')}>
              Upcoming Dates
            </a>
            <a href="#hm-contact" className="hm-cta-btn hm-cta-secondary" onClick={(e) => scrollToSection(e, 'hm-contact')}>
              Book / Inquire
            </a>
          </div>
        </div>

        <div className="hm-hero-scroll">
          <div className="hm-scroll-line" />
          <div className="hm-scroll-txt">Scroll</div>
        </div>
      </section>

      <hr className="hm-div" />

      {/* ========== MARQUEE BAND ========== */}
      <div className="hm-marquee">
        <div className="hm-marquee-inner">
          <span>TECHNO</span>
          <span>·</span>
          <span>PSYTRANCE</span>
          <span>·</span>
          <span>SONIC WANDERER</span>
          <span>·</span>
          <span>DJING ACROSS EUROPE</span>
          <span>·</span>
          <span>SOUND OF GOD RECORDINGS</span>
          <span>·</span>
        </div>
      </div>

      <hr className="hm-div" />

      {/* ========== SECTION 01: THE SOUND ========== */}
      <section className="hm-s hm-sound">
        <SectionHeader number="01" label="The Sonic Universe" title="THE SOUND" />

        <div className="hm-sound-content">
          {/* SoundCloud iframes */}
          <RevealOnScroll>
            <div className="hm-sound-players">
              <div className="hm-sc-player">
                <iframe
                  title="YEHOSUA HIMSELF — Peak at Kingdom Festival"
                  loading="lazy"
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2289842570&color=%23a06820&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&show_playcount=false&liking=false&sharing=false&buying=false&download=false"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation-by-user-activation"
                />
              </div>

              <div className="hm-sc-player">
                <iframe
                  title="YEHOSUA HIMSELF — Closing at Tunes of Sand"
                  loading="lazy"
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2280094370&color=%23a06820&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&show_playcount=false&liking=false&sharing=false&buying=false&download=false"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation-by-user-activation"
                />
              </div>
            </div>
          </RevealOnScroll>

          {/* Wave canvas */}
          <RevealOnScroll>
            <canvas ref={canvasRef} className="hm-wave-canvas" />
          </RevealOnScroll>

          {/* Genre row */}
          <RevealOnScroll>
            <div className="hm-genre-row">
              <div className="hm-genre-label">Techno</div>
              <div className="hm-genre-arrow">⟵</div>
              <div className="hm-genre-center">Convergence</div>
              <div className="hm-genre-arrow">⟶</div>
              <div className="hm-genre-label">Psytrance</div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <hr className="hm-div" />

      {/* ========== LATEST RELEASE BAND ========== */}
      <div className="hm-latest-band">
        <div className="hm-latest-label">LATEST RELEASE</div>
        <div className="hm-latest-title">ARRIVAL</div>
      </div>

      <div className="hm-latest-player">
        <iframe
          title="YEHOSUA HIMSELF — ARRIVAL"
          loading="lazy"
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2292147281&color=%23a06820&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&show_playcount=false&liking=false&sharing=false&buying=false&download=false"
          sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation-by-user-activation"
        />
      </div>

      <hr className="hm-div" />

      {/* ========== QUOTE BAND ========== */}
      <div className="hm-quote-band">
        <div className="hm-quote-text">GOD IS A DJ · MUSIC IS RELIGION</div>
      </div>

      <hr className="hm-div" />

      {/* ========== SECTION 02: THE ARTIST ========== */}
      <section className="hm-s hm-artist">
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
              <a href="#hm-pilgrimage" className="hm-artist-link" onClick={(e) => scrollToSection(e, 'hm-pilgrimage')}>
                Explore the Alpine Journey →
              </a>
            </div>

            <div className="hm-artist-portrait">
              <img src="/images/image-1.webp" alt="YEHOSUA HIMSELF" className="hm-portrait-img" />
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <hr className="hm-div" />

      {/* ========== SECTION 03: THE JOURNEY (PILGRIMAGE) ========== */}
      <section className="hm-s hm-pilgrimage" id="hm-pilgrimage">
        <SectionHeader number="03" label="The Pilgrimage" title="THE JOURNEY" />

        <RevealOnScroll>
          <div className="hm-journey-content">
            <div className="hm-journey-stats">
              <div className="hm-stat">
                <div className="hm-stat-number">10,000+</div>
                <div className="hm-stat-label">KM on Foot</div>
              </div>
              <div className="hm-stat">
                <div className="hm-stat-number">18</div>
                <div className="hm-stat-label">European Nations</div>
              </div>
              <div className="hm-stat">
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
          style={{
            backgroundImage: `url('/images/image-1.webp')`,
          }}
        />
      </section>

      <hr className="hm-div" />

      {/* ========== SECTION 04: VISUAL ARCHIVE (GALLERY) ========== */}
      <section className="hm-s hm-gallery">
        <SectionHeader number="04" label="Visual Documentation" title="VISUAL ARCHIVE" />

        <RevealOnScroll>
          <div className="hm-gallery-container">
            <div className="hm-gallery-scroll">
              {galleryItems.map((item) => (
                <div key={item.id} className="hm-gallery-card">
                  <img src={item.image} alt={item.location} />
                  <div className="hm-gallery-label">{item.location}</div>
                </div>
              ))}
            </div>

            <div className="hm-gallery-nav">
              <button className="hm-gallery-arrow hm-gallery-prev">←</button>
              <button className="hm-gallery-arrow hm-gallery-next">→</button>
            </div>

            <div className="hm-gallery-stats">
              <span className="hm-gallery-count">6 Locations</span>
              <span className="hm-gallery-sep">·</span>
              <span className="hm-gallery-desc">Alps, Mountains, Cities, Venues</span>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <hr className="hm-div" />

      {/* ========== SECTION 05: THE CALENDAR ========== */}
      <section className="hm-s hm-upcoming" id="hm-upcoming">
        <SectionHeader number="05" label="Confirmed Dates" title="THE CALENDAR" />

        <RevealOnScroll>
          <div className="hm-ev-count">8 Confirmed Dates · 2026</div>

          <div className="hm-ev-grid">
            {events.map((event, idx) => (
              <div key={idx} className="hm-ev-card">
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
                  >
                    Join →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      <hr className="hm-div" />

      {/* ========== SECTION 06: OPEN WINDOWS (BOOKING CODEX) ========== */}
      <section className="hm-s hm-booking">
        <SectionHeader number="06" label="Availability & Booking" title="OPEN WINDOWS" />

        <RevealOnScroll>
          <div className="codex-grid">
            {/* Card 1: Summer 2026 */}
            <div className="codex-card codex-limited">
              <div className="codex-card-ghost">S</div>
              <div className="codex-card-status-row">
                <span className="codex-status-dot" />
                <span className="codex-status-label">Last Dates — Priority Open</span>
              </div>
              <div className="codex-card-period">
                Summer<br />
                2026
              </div>
              <span className="codex-card-sub">Riviera · Priority Season</span>
              <div className="codex-card-detail">
                The peak. Côte d'Azur, Algarve,<br />
                festival mainstages. <strong>Mostly claimed.</strong>
              </div>
              <div className="codex-scarcity">⚑ &nbsp;2–3 dates remain · Negotiating now</div>
              <a href="#hm-contact" className="codex-card-cta" onClick={(e) => scrollToSection(e, 'hm-contact')}>
                Claim Your Date →
              </a>
            </div>

            {/* Card 2: Autumn/Winter 2026 */}
            <div className="codex-card codex-limited">
              <div className="codex-card-ghost">A</div>
              <div className="codex-card-status-row">
                <span className="codex-status-dot" />
                <span className="codex-status-label">Selective — Enquire Now</span>
              </div>
              <div className="codex-card-period">
                Autumn<br />/ Winter
              </div>
              <span className="codex-card-sub">October–December 2026</span>
              <div className="codex-card-detail">
                October is sealed. November & December:<br />
                <strong>selective — curated enquiries only.</strong>
              </div>
              <div className="codex-scarcity">◈ &nbsp;Nov–Dec · Only 4 Slots Remain</div>
              <a href="#hm-contact" className="codex-card-cta" onClick={(e) => scrollToSection(e, 'hm-contact')}>
                Reserve a Date →
              </a>
            </div>

            {/* Card 3: Q1-Q2 2026 */}
            <div className="codex-card codex-limited">
              <div className="codex-card-ghost">Q</div>
              <div className="codex-card-status-row">
                <span className="codex-status-dot" />
                <span className="codex-status-label">Closing — Final Slots</span>
              </div>
              <div className="codex-card-period">
                Q1 – Q2<br />
                2026
              </div>
              <span className="codex-card-sub">January–June 2026</span>
              <div className="codex-card-detail">
                Q1 is sealed. May & June:<br />
                <strong>final 2 dates available.</strong> Priority given to festivals.
              </div>
              <div className="codex-scarcity">⚑ &nbsp;May–Jun · Last 2 dates · Act now</div>
              <a href="#hm-contact" className="codex-card-cta" onClick={(e) => scrollToSection(e, 'hm-contact')}>
                Reserve 2026 Date →
              </a>
            </div>

            {/* Card 4: Q3-Q4 2026 */}
            <div className="codex-card codex-open">
              <div className="codex-card-ghost">O</div>
              <div className="codex-card-status-row">
                <span className="codex-status-dot" />
                <span className="codex-status-label">Window Open</span>
              </div>
              <div className="codex-card-period">
                Q3 – Q4<br />
                2026
              </div>
              <span className="codex-card-sub">July–December 2026</span>
              <div className="codex-card-detail">
                The later season is open for enquiry.<br />
                <strong>Early commitments welcomed.</strong>
              </div>
              <div className="codex-scarcity">◌ &nbsp;Q3–Q4 · Enquiries welcome</div>
              <a href="#hm-contact" className="codex-card-cta" onClick={(e) => scrollToSection(e, 'hm-contact')}>
                Secure Your Window →
              </a>
            </div>
          </div>

          <div className="codex-footer">
            <p className="codex-footer-note">
              Selective booking only. Management reviews all enquiries within 72 hours. Confirmed
              holds require signed contract. Lead time: minimum 3 weeks.
            </p>
            <a href="#hm-contact" className="btn-reserve-premium" onClick={(e) => scrollToSection(e, 'hm-contact')}>
              Reserve a Date →
            </a>
          </div>
        </RevealOnScroll>
      </section>

      <hr className="hm-div" />

      {/* ========== SECTION 07: CONTACT / BOOKING ========== */}
      <section className="hm-s hm-contact" id="hm-contact">
        <SectionHeader number="07" label="Booking & Inquiries" title="LET'S CONNECT" />

        <RevealOnScroll>
          <div className="hm-book-block">
            <div className="hm-book-col">
              <div className="hm-book-label">Festival & Agency Bookings</div>
              <div className="hm-book-name">Management</div>
              <a href="mailto:booking@yehosua.com" className="hm-book-email">
                booking@yehosua.com
              </a>
            </div>

            <div className="hm-book-col">
              <div className="hm-book-label">Media & Press Inquiries</div>
              <div className="hm-book-name">Press</div>
              <a href="mailto:press@yehosua.com" className="hm-book-email">
                press@yehosua.com
              </a>
            </div>

            <div className="hm-book-col">
              <div className="hm-book-label">Sound of God Recordings</div>
              <div className="hm-book-name">Label</div>
              <a href="mailto:label@soundofgod.com" className="hm-book-email">
                label@soundofgod.com
              </a>
            </div>
          </div>

          {/* Booking Form */}
          <div className="hm-form-container">
            <h3 className="hm-form-title">Booking Inquiry Form</h3>
            <form className="hm-form" action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
              <div className="hm-form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="hm-form-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="hm-form-input"
                />
              </div>

              <div className="hm-form-row">
                <input
                  type="text"
                  name="festival_venue"
                  placeholder="Festival / Venue Name"
                  required
                  className="hm-form-input"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="City / Country"
                  required
                  className="hm-form-input"
                />
              </div>

              <div className="hm-form-row">
                <input
                  type="date"
                  name="event_date"
                  required
                  className="hm-form-input"
                />
                <select name="genre_focus" className="hm-form-input">
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
              />

              <button type="submit" className="hm-form-submit">
                Send Inquiry
              </button>
            </form>
          </div>
        </RevealOnScroll>
      </section>

      <hr className="hm-div" />
    </div>
  );
};

export default Home;
