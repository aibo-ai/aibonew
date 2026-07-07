import { useEffect, useRef } from 'react';

/**
 * TrustedByTicker
 * Infinite, seamless horizontal marquee of client logos.
 * Duplicates the logo array so the animation loops without a visible seam.
 * Pauses on hover for user readability.
 */

// Logo order requested by the client:
// 1. ITC   2. Hansaplast   3. ElasticRun   4. OptimHire
// 5. Trudiance   6. Harmony   7. Iluvia   8. Fego
// Missing artwork for Trudiance / Iluvia / Fego is rendered as a text-only
// wordmark so the ticker mechanic is complete; swap-in when logos land.
const logos = [
  { name: 'ITC',        src: '/logos/itc.png',        h: 44 },
  { name: 'Hansaplast', src: '/logos/hansaplast.png', h: 40 },
  { name: 'ElasticRun', src: '/logos/elasticrun.png', h: 34 },
  { name: 'OptimHire',  src: '/logos/optimhire.webp', h: 30 },
  { name: 'Trudiance',  src: null,                    h: 34 },
  { name: 'Harmony',    src: '/logos/harmony.png',    h: 52 },
  { name: 'Iluvia',     src: null,                    h: 34 },
  { name: 'Fego',       src: null,                    h: 34 },
];

export default function TrustedByTicker() {
  const trackRef = useRef(null);

  // Adjust animation duration proportional to combined logo count so speed
  // stays consistent as more logos are added.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // ~4.5s per logo — slow and readable
    el.style.setProperty('--ticker-duration', `${logos.length * 4.5}s`);
  }, []);

  const items = [...logos, ...logos]; // duplicated for seamless loop

  return (
    <div data-testid="hero-clients" style={{ marginTop: 8 }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: 16,
        }}
      >
        Trusted by
      </div>

      <div
        className="ticker-viewport"
        aria-label="Client logo carousel"
        style={{
          position: 'relative',
          overflow: 'hidden',
          maskImage:
            'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
          padding: '4px 0',
        }}
      >
        <div
          ref={trackRef}
          className="ticker-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            width: 'max-content',
            animation: 'aibo-ticker var(--ticker-duration, 36s) linear infinite',
          }}
        >
          {items.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              title={logo.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                height: 60,
                minWidth: logo.src ? 132 : 96,
                padding: '10px 22px',
                background: 'rgba(255,255,255,0.94)',
                borderRadius: 10,
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  loading="lazy"
                  draggable={false}
                  style={{
                    height: logo.h,
                    maxHeight: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    userSelect: 'none',
                  }}
                />
              ) : (
                <span
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 20,
                    fontWeight: 500,
                    color: '#1a1330',
                    letterSpacing: '-0.3px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
