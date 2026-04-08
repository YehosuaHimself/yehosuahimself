import React, { useEffect, useRef } from 'react';
import { usePageContext } from '../context/PageContext';
import './Landing.css';

const Landing = () => {
  const canvasRef = useRef(null);
  const { goPage } = usePageContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animated gold wave effect
    const drawWaves = () => {
      time += 0.003;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(160, 104, 32, 0.08)';

      const waves = 3;
      for (let w = 0; w < waves; w++) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 10) {
          const y =
            canvas.height / 2 +
            Math.sin((x * 0.005 + time + w * 2) / (w + 1)) * 60 +
            Math.cos((x * 0.003 - time * 0.7 + w) / (w + 2)) * 40;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      }

      animationId = requestAnimationFrame(drawWaves);
    };

    drawWaves();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleTileClick = (page) => {
    goPage(page);
  };

  return (
    <div id="pg-landing" role="main" aria-label="Landing page">
      {/* Background with user-provided hero image */}
      <div
        className="land-bg"
        role="img"
        aria-label="YEHOSUA HIMSELF atmospheric background"
        style={{
          backgroundImage: `url('/images/image-1.webp')`,
        }}
      />

      {/* Dark overlay gradient */}
      <div className="land-overlay" />

      {/* Animated canvas waves */}
      <canvas
        ref={canvasRef}
        id="landCanvas"
        aria-hidden="true"
        className="land-canvas"
      />

      {/* Hero content */}
      <div className="land-content">
        <div className="land-title-block">
          <h1 className="land-name">
            YEHOSUA<br />
            <em>HIMSELF</em>
          </h1>
          <p className="land-tagline land-roles-gold">
            DJ&nbsp;&nbsp;·&nbsp;&nbsp;PRODUCER&nbsp;&nbsp;·&nbsp;&nbsp;SONIC WANDERER
          </p>
          <p className="land-hook">
            Electronic DJ walks by foot 10,000&thinsp;km over the Alp Mountains, and across Europe
          </p>
        </div>

        {/* Navigation tiles with glassmorphism */}
        <div className="land-tiles">
          {/* Tile 1: Home */}
          <button
            className="land-tile"
            onClick={() => handleTileClick('home')}
            aria-label="Go to Home page"
          >
            <span className="land-tile-num">01 ——</span>
            <div className="land-tile-tag">Experience</div>
            <div className="land-tile-title">Home</div>
            <p className="land-tile-desc">The complete world of YEHOSUA HIMSELF.</p>
            <div className="land-tile-audience">Fans · General Public · Bookers</div>
            <span className="land-tile-arrow">↗</span>
            <div className="land-tile-ghost">I</div>
          </button>

          {/* Tile 2: Label */}
          <button
            className="land-tile"
            onClick={() => handleTileClick('label')}
            aria-label="Go to Label page"
          >
            <span className="land-tile-num">02 ——</span>
            <div className="land-tile-tag">The Label</div>
            <div className="land-tile-title">
              Sound of God<br />
              Recordings
            </div>
            <p className="land-tile-desc">Independent electronic music label.</p>
            <div className="land-tile-audience">DJs · Producers · Industry · Outlets</div>
            <span className="land-tile-arrow">↗</span>
            <div className="land-tile-ghost">II</div>
          </button>

          {/* Tile 3: EPK */}
          <button
            className="land-tile"
            onClick={() => handleTileClick('epk')}
            aria-label="Go to EPK page"
          >
            <span className="land-tile-num">03 ——</span>
            <div className="land-tile-tag">Press Kit</div>
            <div className="land-tile-title">
              EPK<br />
              2026
            </div>
            <p className="land-tile-desc">Electronic Press Kit</p>
            <div className="land-tile-audience">Bookers · Press · Promoters</div>
            <span className="land-tile-arrow">↗</span>
            <div className="land-tile-ghost">III</div>
          </button>
        </div>
      </div>
    </div>
  +}

export default Landing;
