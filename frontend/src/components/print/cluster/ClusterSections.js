// Section variants for the Print-room sub-service (cluster) pages.
// Each section takes the cluster data + its layout config (see clusterConfig.js)
// and renders the design variant the artboard picked.
import { Link } from "react-router-dom";
import { Crumb, BookButton, TextLink, SecHead, Statement, ArrowUpRight } from "@/components/print";
import { splitHeadline } from "@/lib/splitHeadline";
import "./cluster.css";

const two = (n) => String(n).padStart(2, "0");

/** Split a headline into the design's two beats, using the configured second beat when it matches. */
export function beats(text, pay) {
  const t = (text || "").trim();
  if (pay && t.endsWith(pay) && t.length > pay.length) {
    return { lead: t.slice(0, -pay.length).trim().replace(/\s+—$/, ","), pay };
  }
  const s = splitHeadline(t);
  return { lead: s.a.trim(), pay: s.b.trim() };
}

/* ───────────────────────────── HERO ───────────────────────────── */

function HeroBox({ data, cfg }) {
  if (!data.statBadge) {
    return (
      <div className="inside">
        <p className="lbl">What&rsquo;s inside:</p>
        <ul>
          {data.deepDive.pillars.slice(0, 3).map((p) => <li key={p.title}>{p.title}</li>)}
        </ul>
      </div>
    );
  }
  if (cfg.stat) {
    return (
      <div className={`statbox${cfg.long ? " long" : ""}`}>
        <p className="stat-n">{cfg.stat}</p>
        <p className="stat-c">{data.statBadge}</p>
      </div>
    );
  }
  return <div className="claimbox"><p className="claim">{data.statBadge}</p></div>;
}

export function ClusterHero({ data, cfg, pillar, pillarShort, page }) {
  const h = beats(data.h1, cfg.pay);
  const v = cfg.hero;
  const img = (
    <img
      className={v === 6 ? undefined : "print"}
      src={cfg.heroImg.src}
      width={cfg.heroImg.w}
      height={cfg.heroImg.h}
      alt={cfg.alt || ""}
      fetchPriority="high"
    />
  );
  const box = <HeroBox data={data} cfg={cfg} />;
  const kicker = <p className="kicker">{pillarShort} · {data.subLabel}</p>;
  const h1 = (
    <h1 className="display h1s" id="h-hero">
      <span className="beat">{h.lead}</span> <span className="beat pay">{h.pay}</span>
    </h1>
  );
  const lead = <p className="lead">{data.heroBody}</p>;
  const actions = (
    <div className="actions">
      <BookButton page={page} placement="hero" />
      <TextLink to={`/solutions/${pillar}`}>All {pillarShort} services</TextLink>
    </div>
  );

  let body;
  if (v === 3) {
    body = (
      <div className="row hero-b">
        <div className="hb-head">{kicker}{h1}</div>
        <figure className="dev">{img}</figure>
        <div className="hb-lead">{lead}{actions}</div>
        <div className="hb-stat">{box}</div>
      </div>
    );
  } else if (v === 5) {
    body = (
      <>
        <div className="row hero-s">
          <div className="hs-head">{kicker}{h1}</div>
          <div className="hs-side">{lead}{actions}</div>
        </div>
        <figure className="strip">
          {img}
          <div className={`sheet ${cfg.sheet || "mid"}`}>{box}</div>
        </figure>
      </>
    );
  } else if (v === 2) {
    body = (
      <div className="row hero-row">
        <div className="hero-copy">{kicker}{h1}{lead}{actions}{box}</div>
        <figure className="dev">{img}</figure>
      </div>
    );
  } else if (v === 6) {
    body = (
      <div className="row hero-row">
        <div className="hero-copy">{kicker}{h1}{lead}{actions}</div>
        <figure className="sheetfig">{img}{box}</figure>
      </div>
    );
  } else {
    body = (
      <div className="row hero-row">
        <div className="hero-copy">{kicker}{h1}{lead}{actions}</div>
        <figure className="dev">{img}{box}</figure>
      </div>
    );
  }

  return (
    <section className={`hero hv${v}`} aria-labelledby="h-hero">
      <div className="wrap">
        <Crumb items={[
          { label: "Home", to: "/" },
          { label: "Solutions" },
          { label: pillarShort, to: `/solutions/${pillar}` },
          { label: data.subLabel },
        ]} />
        {body}
      </div>
    </section>
  );
}

/* ──────────────────────────── PROBLEM ──────────────────────────── */

export function ClusterProblem({ data, cfg }) {
  const v = cfg.problem;
  const dd = data.deepDive;
  const titled = !!data.problemTitle;
  // With a problem title the question and framing read as two paragraphs;
  // otherwise the question is the sub-heading and the framing the paragraph.
  const paras = titled ? [dd.question, dd.framing] : [dd.framing];
  const pp = (cls = "pp") => <div className={cls}>{paras.filter(Boolean).map((t) => <p key={t.slice(0, 32)}>{t}</p>)}</div>;
  const name = <h2 className="sec-name" id="h-problem">The problem</h2>;
  const why = "Why it breaks.";
  const stmt = <h3 className="statement">{titled ? data.problemTitle : why}</h3>;
  const q = !titled && <h4>{dd.question}</h4>;
  const spot = cfg.spotImg && (
    <img className="spot" src={cfg.spotImg.src} width={cfg.spotImg.w} height={cfg.spotImg.h} loading="lazy" alt="" />
  );
  // Problem 4 and 6 promote the question to the statement and print "Why it breaks." small above it.
  const bigStmt = <h3 className="statement">{titled ? data.problemTitle : dd.question}</h3>;
  const ph = !titled && <p className="pwhy">{why}</p>;

  let inner;
  switch (v) {
    case 0:
      inner = (
        <>
          <div className="row">
            <h2 className="sec-name side" id="h-problem">The problem</h2>
            <div className="main">{stmt}</div>
          </div>
          <div className="problem">{q || <h4>{data.problemTitle}</h4>}{pp()}</div>
        </>
      );
      break;
    case 1:
      inner = (
        <div className="row">
          <div className="side">{name}{spot}</div>
          <div className="main">{stmt}<div className="pq">{q}{pp()}</div></div>
        </div>
      );
      break;
    case 2:
      inner = (
        <div className="row">
          <div className="pspot">{spot}</div>
          <div className="ptext">{name}{stmt}{q}{pp()}</div>
        </div>
      );
      break;
    case 4:
      inner = <div className="pc">{spot}{name}{ph}{bigStmt}{pp()}</div>;
      break;
    case 5:
      inner = (
        <div className="pcard">
          <div className="pt">{name}{stmt}{q}{pp()}</div>
          <div className="pspot">{spot}</div>
        </div>
      );
      break;
    case 6:
      inner = (
        <div className="row">
          <div className="pbig">{name}{bigStmt}</div>
          <div className="pspot">{spot}</div>
          {ph}
          {pp(titled ? "pp wide" : "pp")}
        </div>
      );
      break;
    default: // 3
      inner = (
        <div className="row">
          <div className="pl">{name}{stmt}{spot}</div>
          <div className="pright">{q}{pp()}</div>
        </div>
      );
  }
  const ink = v === 2 ? "dark ink-plum" : v === 6 ? "dark ink-mid" : "paper-white";
  return (
    <section className={`sec ${ink} pb${v}`} id="problem" aria-labelledby="h-problem">
      <div className="wrap">{inner}</div>
    </section>
  );
}

/* ───────────────────────────── WORK ───────────────────────────── */

export function ClusterWork({ data, cfg }) {
  const v = cfg.work;
  const items = data.deepDive.pillars || [];
  const res = (w, ar = true) => w.human && <p className={ar ? "res ar" : "res"}>{w.human}</p>;

  if (v === 6) {
    return (
      <section className="sec wv6" id="work" aria-labelledby="h-work">
        <div className="wrap">
          <div className="row">
            <div className="wl">
              <h2 className="sec-name" id="h-work">What we do</h2>
              <Statement lead="The work," pay="in detail." />
            </div>
            <div className="wr">
              {items.map((w, i) => (
                <article className="witem" key={w.title}>
                  <p className="n">{two(i + 1)}</p><h4>{w.title}</h4><p className="wd">{w.technical}</p>{res(w)}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  let list;
  if (v === 1) {
    list = (
      <div className="notes">
        {items.map((w, i) => (
          <article className="note" key={w.title}>
            <p className="wn">{two(i + 1)}</p><h4>{w.title}</h4><p className="wd">{w.technical}</p>{res(w, false)}
          </article>
        ))}
      </div>
    );
  } else if (v === 3) {
    list = (
      <div className="wcards">
        {items.map((w, i) => (
          <article className="wcard" key={w.title}>
            <p className="n">{two(i + 1)}</p><h4>{w.title}</h4><p className="wd">{w.technical}</p>{res(w, false)}
          </article>
        ))}
      </div>
    );
  } else if (v === 4) {
    list = (
      <div className="walt">
        {items.map((w, i) => (
          <article key={w.title}>
            <p className="wn">{i + 1}</p><h4>{w.title}</h4><p className="wd">{w.technical}</p>{res(w)}
          </article>
        ))}
      </div>
    );
  } else if (v === 5) {
    list = (
      <div className="wcols">
        {items.map((w, i) => (
          <article className="wcol" key={w.title}>
            <p className="wn">{two(i + 1)}</p><h4>{w.title}</h4><p className="wd">{w.technical}</p>{res(w)}
          </article>
        ))}
      </div>
    );
  } else {
    list = (
      <div className="wrows">
        {items.map((w, i) => (
          <article className="wrow" key={w.title}>
            <p className="wn">{two(i + 1)}</p><h4>{w.title}</h4><p className="wd">{w.technical}</p>{res(w)}
          </article>
        ))}
      </div>
    );
  }
  return (
    <section className={`sec wv${v}${v === 5 ? " dark ink-plum" : ""}`} id="work" aria-labelledby="h-work">
      <div className="wrap">
        <SecHead id="h-work" name="What we do" lead="The work," pay="in detail." />
        {list}
      </div>
    </section>
  );
}

/* ─────────────────────────── FRAMEWORK ─────────────────────────── */

// "Week 5" -> {a:5,b:5}; "Weeks 3–6" -> {a:3,b:6}; "Ongoing" / "Continuous" / "Retainer" -> null
function weeks(tf) {
  const m = (tf || "").match(/weeks?\s+(\d+)(?:\s*[–-]\s*(\d+))?/i);
  if (!m) return null;
  return { a: +m[1], b: m[2] ? +m[2] : +m[1] };
}

function Gantt({ phases }) {
  const spans = phases.map((p) => weeks(p.timeframe));
  const max = Math.max(1, ...spans.filter(Boolean).map((s) => s.b));
  const open = spans.some((s) => !s);
  const cols = max + (open ? 2 : 0);
  const grid = { gridTemplateColumns: `repeat(${cols},minmax(0,1fr))` };
  return (
    <div className="gantt">
      <div className="grow gaxis" aria-hidden="true">
        <p className="gt">Week</p>
        <div className="gbar" style={grid}>
          {Array.from({ length: max }, (_, i) => <span key={i}>{i + 1}</span>)}
          {open && <span style={{ gridColumn: `${max + 1}/${max + 3}` }}>Ongoing</span>}
        </div>
      </div>
      {phases.map((p, i) => {
        const s = spans[i];
        return (
          <article className="grow" key={p.name}>
            <div className="gt">
              <p className="n">Phase {two(p.num || i + 1)} · {p.timeframe}</p>
              <h4>{p.name}</h4>
              <p className="td">{p.body}</p>
            </div>
            <div className="gbar lane" style={grid} aria-hidden="true">
              {s
                ? <span className="bar" style={{ gridColumn: `${s.a}/${s.b + 1}` }} />
                : <span className="bar open" style={{ gridColumn: `${max + 1}/${max + 3}` }}>→</span>}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ClusterFramework({ data, cfg }) {
  const v = cfg.frame;
  const phases = data.blueprint?.phases || [];
  const h2 = data.blueprint?.h2;
  const head = h2
    ? (/^Our 4-Phase /.test(h2) ? { lead: "Our 4-Phase", pay: h2.replace(/^Our 4-Phase /, "") } : beats(h2))
    : { lead: "Four phases,", pay: "week by week." };
  const label = (p, i) => <><span>Phase</span>{two(p.num || i + 1)}</>;

  let list;
  if (v === 4) {
    list = <Gantt phases={phases} />;
  } else if (v === 1) {
    list = (
      <div className="frame">
        {phases.map((p, i) => (
          <article className="fphase" key={p.name}>
            <p className="n">Phase {two(p.num || i + 1)} · {p.timeframe}</p><h4>{p.name}</h4><p className="td">{p.body}</p>
          </article>
        ))}
      </div>
    );
  } else if (v === 3) {
    list = (
      <div className="stairs">
        {phases.map((p, i) => (
          <article className="stair" key={p.name}>
            <p className="sn">{label(p, i)}</p><p className="tw">{p.timeframe}</p><h4>{p.name}</h4><p className="td">{p.body}</p>
          </article>
        ))}
      </div>
    );
  } else if (v === 5) {
    list = (
      <div className="nums">
        {phases.map((p, i) => (
          <article className="num" key={p.name}>
            <p className="bn">{label(p, i)}</p><p className="tw">{p.timeframe}</p><h4>{p.name}</h4><p className="td">{p.body}</p>
          </article>
        ))}
      </div>
    );
  } else if (v === 6) {
    list = (
      <div className="tiles">
        {phases.map((p, i) => (
          <article className="tile" key={p.name}>
            <p className="sn">{label(p, i)}</p><p className="tw">{p.timeframe}</p><h4>{p.name}</h4><p className="td">{p.body}</p>
          </article>
        ))}
      </div>
    );
  } else {
    list = (
      <div className="track">
        {phases.map((p, i) => (
          <article className="tstep" key={p.name}>
            <p className="tw">Phase {two(p.num || i + 1)} · {p.timeframe}</p>
            <div className="tdot" aria-hidden="true" />
            <h4>{p.name}</h4><p className="td">{p.body}</p>
          </article>
        ))}
      </div>
    );
  }
  return (
    <section className={`sec fv${v} ${v === 5 ? "dark ink-mid" : "paper-white"}`} id="framework" aria-labelledby="h-frame">
      <div className="wrap">
        <SecHead id="h-frame" name="Our framework" lead={head.lead} pay={head.pay} />
        {list}
      </div>
    </section>
  );
}

/* ───────────────────── EXTRA (Reddit / Quora / Wikipedia) ───────────────────── */

export function ClusterExtra({ extra, cfg }) {
  if (!extra) return null;
  const x = cfg.extra || { variant: extra.failures ? "x2" : "x1", ink: "paper-white" };
  const h = beats(extra.h2, x.pay);
  const paras = extra.paragraphs || [];
  return (
    <section className={`sec ${x.ink} ${x.variant}`} aria-labelledby="h-extra">
      <div className="wrap">
        <SecHead id="h-extra" name={extra.label} lead={h.lead} pay={h.pay} />
        {extra.failures ? (
          <div className="row">
            <div className="main">
              {paras.map((t) => <p className="xlead" key={t.slice(0, 32)}>{t}</p>)}
              <div className="xitems">
                {extra.failures.map((t, i) => (
                  <div className="xitem" key={t.slice(0, 32)}><p className="wn">{two(i + 1)}</p><p className="xd">{t}</p></div>
                ))}
              </div>
              {(extra.after || []).map((t) => <p className="xclose" key={t.slice(0, 32)}>{t}</p>)}
            </div>
          </div>
        ) : (
          <div className="row">
            {paras.map((t) => (
              <p className="main xp" key={t.slice(0, 32)}>{x.variant === "x3" ? <span>{t}</span> : t}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────── RELATED ──────────────────────────── */

export function ClusterRelated({ items, cfg }) {
  if (!items.length) return null;
  const v = cfg.related;
  const grid = `related${items.length === 1 ? " one" : ""}`;
  let list;
  if (v === 3) {
    list = (
      <div className="rrows">
        {items.map((r) => (
          <article className="rrow" key={r.key}>
            <p className="n">{r.kind}</p><h4>{r.label}</h4><p className="rd">{r.note}</p>
            <TextLink to={r.to}>Read more</TextLink>
          </article>
        ))}
      </div>
    );
  } else if (v === 6) {
    list = (
      <div className={grid}>
        {items.map((r, i) => (
          <article className="ticket" key={r.key}>
            <div className="stub"><p className="n">{r.kind}</p><p className="tk">{two(i + 1)}</p></div>
            <div className="perf" aria-hidden="true" />
            <div className="tb"><h4>{r.label}</h4><p className="rd">{r.note}</p><TextLink to={r.to}>Read more</TextLink></div>
          </article>
        ))}
      </div>
    );
  } else if (v === 2) {
    list = (
      <div className={grid}>
        {items.map((r) => (
          <article className="rel" key={r.key}>
            <div className="rtop">
              <p className="n">{r.kind}</p>
              <Link className="icon-link" to={r.to} aria-label={`Read more: ${r.label}`}><ArrowUpRight /></Link>
            </div>
            <h4>{r.label}</h4>
            <div className="rb"><p>{r.note}</p></div>
          </article>
        ))}
      </div>
    );
  } else {
    list = (
      <div className={grid}>
        {items.map((r) => (
          <article className="rel" key={r.key}>
            <p className="n">{r.kind}</p><h4>{r.label}</h4>
            <div className="rb"><p>{r.note}</p><TextLink to={r.to}>Read more</TextLink></div>
          </article>
        ))}
      </div>
    );
  }
  return (
    <section className={`sec rv${v}`} id="related" aria-labelledby="h-rel">
      <div className="wrap">
        <SecHead id="h-rel" name="Related services" lead="Works best" pay="together." />
        {list}
        <p className="modular">modular: start here, plug in the rest ↓</p>
      </div>
    </section>
  );
}
