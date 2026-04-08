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

  const events = [
    {
      day: '04', month: 'APR 2026', name: 'Voltage Underground',
      venue: 'Tresor Keller, Berlin', city: 'Berlin, DE', genre: 'Techno',
    },
    {
      day: '09', month: 'APR 2026', name: 'Parallax — Open Rave',
      venue: 'Chlor* Club, Vienna', city: 'Vienna, AT', genre: 'Psytrance',
    },
    {
      day: '12', month: 'APR 2026', name: 'Signal Path Festival',
      venue: 'Patronaat, Haarlem', city: 'Haarlem, NL', genre: 'Techno · Psytrance',
    },
    {
      day: '17', month: 'APR 2026', name: 'Depth Ritual II',
      venue: 'Shelter, Amsterdam', city: 'Amsterdam, NL', genre: 'Dark Techno',
    },
    {
      day: '19', month: 'APR 2026', name: 'Resonance Kollektiv',
      venue: 'OT301, Amsterdam', city: 'Amsterdam, NL', genre: 'Industrial',
    },
    {
      day: '24', month: 'APR 2026', name: 'Meridian Spring Rave',
      venue: 'Paradiso, Amsterdam', city: 'Amsterdam, NL', genre: 'Techno · Acid',
    },
    {
      day: '30', month: 'APR 2026', name: 'Convergence Festival',
      venue: 'Gashouder, Amsterdam', city: 'Amsterdam, NL', genre: 'Techcno · Ambient',
    },
    {
      day: '05', month: 'MAY 2026', name: 'Echoes Madrid',
      venue: 'Fabrik, Madrid', city: 'Madrid, ES', genre: 'Psytrance · Techno',
    },
  ];
  return ( {0 /* Place rest of content below */ } );
};


export default Home;
