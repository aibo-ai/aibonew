// Sections of the "Print room" solutions pillar page. One template for all six
// pillars; per-page differences come from pillarConfig.js and pillar.css.
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BookButton, Crumb, Quote, SecHead, TextLink } from "@/components/print";
import "./pillar.css";

const pad = (i) => String(i + 1).padStart(2, "0");
const COUNT_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];

// "+340% (6-month average)" -> { n: "+340%", sub: "(6-month average)" };
// a unit word right after the number stays with it ("4 hours (was 3 days)").
export function splitResult(result) {
  const m = (result || "").match(/^(\S+(?:\s(?:hours?|hrs|min|mo|pts|wk))?)(?:\s+(.+))?$/);
  return m ? { n: m[1], sub: m[2] } : { n: result };
}

/* ── Hero: crumb, kicker, h1, lead, actions, printed figure, practice list ── */
export function PillarHero({ cfg, data, clusters, slug, page }) {
  const practice = data.type === "technology" ? "Technology" : "Marketing";
  const heroStat = data.whyNow.stats[data.whyNow.stats.length - 1];
  const { cls, img } = cfg.hero;
  const bigstat = heroStat && (
    <div className="bigstat stat">
      <p className="stat-n">{heroStat.num}</p>
      <p className="stat-c">{heroStat.label}</p>
    </div>
  );

  return (
    <section className="hero" aria-labelledby="h-hero">
      <div className="wrap">
        <Crumb items={[{ label: "Home", to: "/" }, { label: "Solutions" }, { label: cfg.short }]} />
        <div className="row hero-row">
          <div className="hero-copy">
            <p className="kicker">{practice} &middot; {data.pageTitle}</p>
            <h1 className="display" id="h-hero">{data.headline}</h1>
            <p className="lead">{data.subheadline}</p>
            <div className="actions">
              <BookButton page={page} placement="hero" />
              <TextLink to="/case-studies">View Case Studies</TextLink>
            </div>
          </div>
          {img ? (
            <figure className={cls}>
              <img className={img.print ? "print" : undefined} src={img.src} width={img.w} height={img.h} fetchPriority="high" alt={img.alt} />
              {bigstat}
            </figure>
          ) : (
            heroStat && (
              <div className={`${cls} stat`}>
                <p className="stat-n">{heroStat.num}</p>
                <p className="stat-c">{heroStat.label}</p>
              </div>
            )
          )}
        </div>
        {clusters.length > 0 && (
          <div className="practice">
            <p className="plabel"><b>{clusters.length} services</b>in this practice</p>
            <div className="plist">
              {clusters.map((c, i) => (
                <Link key={c.slug} to={`/solutions/${slug}/${c.slug}`}>
                  <span className="n">{pad(i)}</span>{c.subLabel} <ArrowRight />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Why this matters: the same numbers, printed six different ways ── */
function WhyItems({ variant, stats, img }) {
  switch (variant) {
    case "rings":
      return (
        <div className="ring-four">
          {stats.map((s) => (
            <div className="ring" key={s.label}><p className="stat-n">{s.num}</p><p className="stat-c">{s.label}</p></div>
          ))}
        </div>
      );
    case "boxes":
      return (
        <div className="boxes">
          {stats.map((s, i) => (
            <div className="box" key={s.label}>
              <p className="n">{pad(i)} &middot; Answer box</p>
              <p className="stat-n">{s.num}</p>
              <p className="stat-c">{s.label}</p>
            </div>
          ))}
        </div>
      );
    case "strata":
      return (
        <div className="strata">
          {img && <img src={img.src} width={img.w} height={img.h} loading="lazy" alt={img.alt} />}
          <div className="strata-in">
            {stats.map((s, i) => (
              <div className="stat" style={{ "--k": i }} key={s.label}>
                <p className="n">{pad(i)}</p>
                <p className="stat-n">{s.num}</p>
                <p className="stat-c">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "sheets":
      return (
        <div className="sheets">
          {stats.map((s, i) => (
            <div className="sheet" key={s.label}>
              <p className="n">{pad(i)}</p>
              <div><p className="stat-n">{s.num}</p><p className="stat-c">{s.label}</p></div>
            </div>
          ))}
        </div>
      );
    case "floors":
      return (
        <div className="floors">
          {stats.map((s, i) => (
            <div className="floor" key={s.label}>
              <p className="n">{pad(i)}</p>
              <p className="stat-n">{s.num}</p>
              <p className="stat-c">{s.label}</p>
            </div>
          ))}
        </div>
      );
    case "arc":
    default:
      return (
        <div className="arc">
          {stats.map((s, i) => (
            <div className="stat" key={s.label}>
              <p className="n">{pad(i)}</p>
              <p className="stat-n">{s.num}</p>
              <p className="stat-c">{s.label}</p>
            </div>
          ))}
        </div>
      );
  }
}

export function PillarWhy({ cfg, data }) {
  const all = data.whyNow.stats;
  const stats = cfg.whySkipHero ? all.slice(0, -1) : all;
  return (
    <section className="sec paper-white" id="why" aria-labelledby="h-why">
      <div className="wrap">
        <SecHead id="h-why" name="Why this matters" lead="The shift," pay={`in ${COUNT_WORDS[stats.length] || stats.length} numbers.`} />
        <WhyItems variant={cfg.why} stats={stats} img={cfg.whyImg} />
      </div>
    </section>
  );
}

/* ── GEO / AEO: anonymized audit card ── */
export function PillarAudit({ audit }) {
  if (!audit) return null;
  return (
    <section className="sec" id="audit" aria-labelledby="h-audit">
      <div className="wrap">
        <SecHead id="h-audit" name={audit.name} lead={audit.lead} pay={audit.pay}>
          <p className="intro">{audit.intro}</p>
        </SecHead>
        <div className="card audit-card">
          <div className="audit-stats">
            {audit.stats.map((s) => (
              <div className="stat" key={s.c}><p className="stat-n">{s.n}</p><p className="stat-c">{s.c}</p></div>
            ))}
          </div>
          <h4 className="audit-bars-title">{audit.barsTitle}</h4>
          <div className="bars">
            {audit.bars.map((b) => (
              <div className="bar" key={b.label}>
                <span>{b.label}</span>
                <div className="bar-track"><div className={b.leader ? "bar-fill leader" : "bar-fill"} style={{ width: `${b.width}%` }} /></div>
                <span className="bar-val">{b.val}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="audit-note">{audit.note}</p>
      </div>
    </section>
  );
}

/* ── What we do: sub-service cards ── */
export function PillarServices({ cfg, data, slug }) {
  const cards = data.deepDiveCards || [];
  if (cards.length === 0) return null;
  return (
    <section className="sec" id="stack" aria-labelledby="h-stack">
      <div className="wrap">
        <SecHead id="h-stack" name="What we do" lead={`A complete ${cfg.short} stack,`} pay="run end-to-end." />
        <div className="svcs">
          {cards.map((c, i) => (
            <article className="svc" key={c.slug}>
              <div className="svc-top">
                <span className="n">{pad(i)} / Service</span>
                <Link className="icon-link" to={`/solutions/${slug}/${c.slug}`} aria-label={c.title}><ArrowUpRight /></Link>
              </div>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
              {c.stat && <p className="proof">{c.stat}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Our approach: intro + without/with comparison ── */
export function PillarApproach({ data, headline }) {
  const { without, with: withUs } = data.comparison;
  return (
    <section className="sec paper-white" id="approach" aria-labelledby="h-approach">
      <div className="wrap">
        <SecHead id="h-approach" name="Our approach" lead={headline.a.trim()} pay={headline.b}>
          {data.intro.body.slice(0, 2).map((t) => <p className="intro" key={t.slice(0, 32)}>{t}</p>)}
        </SecHead>
        <div className="vs">
          <div className="lose">
            <h4>{without.title}</h4>
            <ul>{without.items.map((t) => <li key={t}><span className="g" aria-hidden="true">&#10005;</span>{t}</li>)}</ul>
          </div>
          <div className="win">
            <h4 className="win">{withUs.title}</h4>
            <ul>{withUs.items.map((t) => <li key={t}><span className="g" aria-hidden="true">&#10003;</span>{t}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Our process: phases ── */
export function PillarProcess({ data }) {
  return (
    <section className="sec" id="process" aria-labelledby="h-process">
      <div className="wrap">
        <SecHead id="h-process" name="Our process" lead="From first audit" pay="to cited default." />
        <div className="phases">
          {data.process.steps.map((s, i) => (
            <article className="phase" key={s.title}>
              <div className="ph-n"><b>{pad(i)}</b>{s.timeframe && <span>{s.timeframe}</span>}</div>
              <div className="ph-t"><h4>{s.title}</h4></div>
              <div className="ph-d">{s.body}{s.deliverable && <b>{s.deliverable}</b>}</div>
            </article>
          ))}
        </div>
        <p className="then">&#10022; Then: review, optimise, and double down. &#10022;</p>
      </div>
    </section>
  );
}

/* ── Proven outcomes + testimonial ── */
export function PillarOutcomes({ data }) {
  const { metrics, testimonial } = data.results;
  return (
    <section className="sec" id="outcomes" aria-labelledby="h-out">
      <div className="wrap">
        <SecHead id="h-out" name="Proven outcomes" lead="Results that" pay="compound." />
        <div className="outcomes">
          {metrics.map((m) => {
            const r = splitResult(m.result);
            return (
              <div className="stat" key={m.metric}>
                <p className="stat-n">{r.n}</p>
                {r.sub && <p className="stat-sub">{r.sub}</p>}
                <p className="stat-c">{m.metric}</p>
              </div>
            );
          })}
        </div>
        {testimonial && (
          <Quote text={`“${testimonial.quote}”`} role={testimonial.author} initials={testimonial.initials} />
        )}
      </div>
    </section>
  );
}

/* ── Deliverables ── */
export function PillarDeliverables({ data }) {
  return (
    <section className="sec paper-white" id="deliverables" aria-labelledby="h-deliv">
      <div className="wrap">
        <SecHead id="h-deliv" name={data.deliverables.label || "The Deliverables"} lead="What you" pay="walk away with." />
        <div className="deliv">
          {data.deliverables.cards.map((c, i) => (
            <article key={c.title}><p className="n">{pad(i)}</p><h4>{c.title}</h4><p>{c.body}</p></article>
          ))}
        </div>
      </div>
    </section>
  );
}
