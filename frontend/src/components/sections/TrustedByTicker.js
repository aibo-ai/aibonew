// Full-width client-logo marquee — its own section between the hero and
// "Our Practice", not confined to the hero's left column. Greyscale at
// .65 opacity, 40s linear loop, matching the Violet + Amber design spec.
const logos = [
  { name: 'ITC', src: '/logos/itc.png' },
  { name: 'Hansaplast', src: '/logos/hansaplast.png' },
  { name: 'ElasticRun', src: '/logos/elasticrun.png' },
  { name: 'OptimHire', src: '/logos/optimhire.png' },
  { name: 'Trudiance', src: '/logos/trudiance.png' },
  { name: 'Harmony', src: '/logos/harmony.png' },
  { name: 'Iluvia', src: '/logos/iluvia.png' },
  { name: 'Fego', src: '/logos/fego.png' },
  { name: 'vPersonalize', src: '/logos/vpersonalize.png' },
];

export default function TrustedByTicker() {
  const items = [...logos, ...logos];

  return (
    <section
      data-testid="hero-clients"
      className="flex items-center"
      style={{ background: '#fff', borderTop: '1px solid var(--border-clr)', borderBottom: '1px solid var(--border-clr)', padding: '26px 0', gap: 32, overflow: 'hidden' }}
    >
      <div
        className="flex-shrink-0"
        style={{ paddingLeft: 32, fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}
      >
        Trusted by
      </div>
      <div
        className="flex-1"
        style={{
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div className="flex items-center" style={{ gap: 56, width: 'max-content', animation: 'aibo-ticker 40s linear infinite' }}>
          {items.map((logo, i) => (
            <img
              key={`${logo.name}-${i}`}
              src={logo.src}
              alt={`${logo.name} logo`}
              loading="lazy"
              draggable={false}
              style={{ height: 34, width: 'auto', filter: 'grayscale(1)', opacity: 0.65, userSelect: 'none' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
