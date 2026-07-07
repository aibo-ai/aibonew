import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getClustersForPillar } from '@/data/clusterPagesData';

/**
 * ClusterLinksBar
 * Small horizontal rectangular tabs that appear directly under a pillar page's
 * hero. Each tab is hyperlinked to a cluster (sub-service) page for that pillar.
 * Kept intentionally compact so it doesn't disturb the existing pillar layout.
 */
export default function ClusterLinksBar({ pillarSlug }) {
  const clusters = getClustersForPillar(pillarSlug);
  if (!clusters || clusters.length === 0) return null;

  return (
    <section
      aria-label="Deep-dive services in this pillar"
      style={{
        background: 'var(--white)',
        borderBottom: '1px solid var(--border-clr)',
        padding: '20px 40px',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1100 }}>
        <div
          className="flex items-center flex-wrap gap-3"
          style={{ rowGap: 10 }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--purple-dark)',
              marginRight: 6,
              whiteSpace: 'nowrap',
            }}
          >
            Deep-Dive Services
          </span>
          {clusters.map((c) => (
            <Link
              key={c.slug}
              to={`/solutions/${c.pillar}/${c.slug}`}
              className="cluster-chip"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'var(--purple-light)',
                border: '1px solid rgba(124,59,237,0.28)',
                borderRadius: 6,
                padding: '8px 14px',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--purple-dark)',
                textDecoration: 'none',
                lineHeight: 1.3,
                transition: 'background 0.18s, color 0.18s, border-color 0.18s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--purple)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--purple)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--purple-light)';
                e.currentTarget.style.color = 'var(--purple-dark)';
                e.currentTarget.style.borderColor = 'rgba(124,59,237,0.28)';
              }}
            >
              {c.subLabel}
              <ArrowRight size={12} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
