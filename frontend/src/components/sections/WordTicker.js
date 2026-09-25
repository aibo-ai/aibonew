import { useEffect, useRef } from 'react';

/**
 * WordTicker
 * Infinite, seamless horizontal marquee of plain-text words (industries,
 * categories, etc.) — the text equivalent of TrustedByTicker's logo strip.
 * Reuses the same `aibo-ticker` keyframe already defined in index.css.
 */
export default function WordTicker({ label, words }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.setProperty('--ticker-duration', `${words.length * 2.2}s`);
  }, [words.length]);

  const items = [...words, ...words];

  return (
    <div>
      {label && (
        <div
          className="text-center"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: 20,
          }}
        >
          {label}
        </div>
      )}
      <div
        className="ticker-viewport"
        aria-hidden="true"
        style={{
          position: 'relative',
          overflow: 'hidden',
          maskImage:
            'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div
          ref={trackRef}
          className="ticker-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 48,
            width: 'max-content',
            animation: 'aibo-ticker var(--ticker-duration, 30s) linear infinite',
          }}
        >
          {items.map((word, i) => (
            <span
              key={`${word}-${i}`}
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: i % 2 === 0 ? 'normal' : 'italic',
                fontWeight: i % 2 === 0 ? 600 : 300,
                fontSize: 22,
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
