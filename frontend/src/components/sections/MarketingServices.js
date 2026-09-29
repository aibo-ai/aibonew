import { useNavigate } from 'react-router-dom';
import SectionLabel from './SectionLabel';

const services = [
  {
    n: '01', tag: 'GEO', name: 'GEO', full: 'Generative Engine Optimisation', slug: 'geo',
    copy: 'Be the brand AI recommends. We structure your digital presence so ChatGPT, Perplexity, Google SGE and Bing Copilot cite, quote and recommend you.',
    stat: '+340%', statText: 'average AI citation rate increase',
  },
  {
    n: '02', tag: 'AEO', name: 'AEO', full: 'Answer Engine Optimisation', slug: 'aeo',
    copy: 'We structure your content to win featured snippets, People Also Ask boxes, and voice answers.',
    stat: '68%', statText: 'of queries expect a direct answer',
  },
  {
    n: '03', tag: 'SEO', name: 'SEO', full: 'Search Engine Optimisation', slug: 'seo',
    copy: 'The organic foundation everything builds on. Technical authority, keyword architecture, backlink equity — the infrastructure AI engines are trained on.',
    stat: '11×', statText: 'higher ROI than paid search',
  },
  {
    n: '04', tag: 'CONTENT', name: 'Content Marketing', full: 'Content that ranks, converts, and compounds', slug: 'content-marketing',
    copy: 'Long-form articles, thought leadership, case studies, FAQs, and video scripts — built equally for humans and AI engines.',
    stat: '3×', statText: 'more leads than outbound',
  },
];

export default function MarketingServices() {
  const navigate = useNavigate();
  return (
    <section id="marketing-services" data-testid="marketing-services-section" style={{ padding: '112px 32px', background: '#fff', borderTop: '1px solid var(--border-clr)' }}>
      <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 48 }}>
        <div className="flex flex-wrap items-end justify-between" style={{ gap: 32 }}>
          <div style={{ maxWidth: 700 }}>
            <SectionLabel text="Marketing Services" />
            <h2 data-testid="marketing-headline" style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
              Be the answer on every surface, <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>in every engine.</em>
            </h2>
          </div>
          <div className="flex items-center" style={{ gap: 18, maxWidth: 400, padding: '20px 24px', borderRadius: 16, background: 'var(--purple-light)' }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 52, fontWeight: 600, lineHeight: 0.9, color: 'var(--purple-dark)' }}>62%</div>
            <div data-testid="marketing-description" style={{ fontFamily: "'DM Sans'", fontWeight: 400, fontSize: 14.5, lineHeight: 1.45, color: 'var(--text-primary)' }}>
              of users now trust AI answers over page-1 links. Search has changed.
            </div>
          </div>
        </div>

        {/* Each card is a 4-row subgrid (label · name · copy · stat), so the
            dashed stat divider lines up across every card in a row no matter
            how long each card's copy is. */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 255px), 1fr))', gap: 16 }}>
          {services.map((s, i) => {
            const amberStat = i % 2 === 1;
            return (
              <button
                key={s.n}
                onClick={() => navigate(`/solutions/${s.slug}`)}
                className="text-left card-lift"
                style={{ display: 'grid', gridRow: 'span 4', gridTemplateRows: 'subgrid', rowGap: 14, alignContent: 'start', cursor: 'pointer', background: 'var(--off-white)', border: '1px solid var(--border-clr)', borderRadius: 16, padding: 26, color: 'var(--text-primary)' }}
              >
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12, color: 'var(--text-muted)' }}>{s.n} / {s.tag}</span>
                  <span className="flex items-center justify-center" style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid var(--border-clr)', color: 'var(--purple)' }}>&#8599;</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.5px' }}>{s.name}</div>
                  <div style={{ marginTop: 4, fontFamily: "'DM Sans'", fontSize: 13, color: 'var(--text-muted)' }}>{s.full}</div>
                </div>
                <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{s.copy}</p>
                <div style={{ alignSelf: 'start', marginTop: 16, paddingTop: 16, borderTop: amberStat ? '1px dashed var(--border-clr)' : '1px dashed var(--border-clr)' }}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 600, lineHeight: 1, color: amberStat ? 'var(--dark)' : 'var(--purple-dark)' }}>{s.stat}</div>
                  <div style={{ marginTop: 6, fontFamily: "'DM Sans'", fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>{s.statText}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="relative flex flex-wrap items-center justify-between" style={{ gap: 24, padding: '26px 30px', borderRadius: 16, background: 'var(--dark)', color: '#fff' }}>
          <div className="flex flex-wrap items-center" style={{ gap: 8, fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13, letterSpacing: '0.06em' }}>
            <span style={{ padding: '7px 12px', borderRadius: 999, background: 'rgba(255,255,255,.08)' }}>GEO</span>+
            <span style={{ padding: '7px 12px', borderRadius: 999, background: 'rgba(255,255,255,.08)' }}>AEO</span>+
            <span style={{ padding: '7px 12px', borderRadius: 999, background: 'rgba(255,255,255,.08)' }}>SEO</span>+
            <span style={{ padding: '7px 12px', borderRadius: 999, background: 'rgba(255,255,255,.08)' }}>CONTENT</span>
          </div>
          <div style={{ fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 16, lineHeight: 1.5, color: 'rgba(255,255,255,.75)', maxWidth: 470 }}>
            Run as one integrated system. Clients running all four see <b style={{ color: '#fff' }}>3&ndash;5&times; the return</b> of single-service engagements.
          </div>
        </div>
      </div>
    </section>
  );
}
