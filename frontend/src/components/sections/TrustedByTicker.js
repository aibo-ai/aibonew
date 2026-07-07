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
//
// `invert = true` means the logo is essentially monochrome-dark (navy/black
// on transparent). We flip it to white so it reads against the dark hero.
// Multicolor / brand-color logos render natively and rely on their own fills.
const logos = [
  { name: 'ITC',        src: '/logos/itc.png',        h: 44, invert: true },
  { name: 'Hansaplast', src: '/logos/hansaplast.png', h: 46, invert: true },
  { name: 'ElasticRun', src: '/logos/elasticrun.png', h: 40, invert: true },
  { name: 'OptimHire',  src: '/logos/optimhire.png',  h: 32, invert: true },
  { name: 'Trudiance',  src: '/logos/trudiance.png',  h: 60, invert: true },
  { name: 'Harmony',    src: '/logos/harmony.png',    h: 58, invert: true },
  { name: 'Iluvia',     src: '/logos/iluvia.png',     h: 30, invert: true },
  { name: 'Fego',       src: '/logos/fego.png',       h: 46, invert: true },
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
            gap: 64,
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
                height: 72,
                minWidth: 130,
                padding: '0 8px',
              }}
            >
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
                  filter: logo.invert ? 'brightness(0) invert(1)' : 'none',
                  opacity: logo.invert ? 0.88 : 1,
                  userSelect: 'none',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
