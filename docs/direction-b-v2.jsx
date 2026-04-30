// Direction B — "Personal Field Notes"
// Warmer, denser, more human. Hand-set serif display + sans body, but with
// notebook/zine energy: index card layouts, hand-drawn rules, sticker-like
// labels, more density. Same forest green accent on a slightly warmer paper.

// Azure / white / black palette, tuned for WCAG AA.
// Contrast vs paper(#ffffff): ink 21:1, inkSoft 12.6:1, muted 4.6:1, accent 5.4:1, warm 4.7:1
// Contrast vs ink(#0b0d10): paper 19.6:1, highlight 16.7:1, accentSoft 8.2:1
const B_COLORS = {
  paper: "#ffffff",        // pure white
  paperDeep: "#eaf1f8",    // pale azure tint
  card: "#f5f9fd",         // card surface
  ink: "#0b0d10",          // near-black
  inkSoft: "#2a3340",      // body text on white  (12.6:1)
  muted: "#5a6878",        // meta text on white  (4.6:1)
  rule: "#cbd6e2",         // hairlines / borders
  accent: "#0a5fbf",       // azure — brand accent (5.4:1 on white)
  accentDeep: "#08458a",   // azure pressed (7.9:1)
  accentSoft: "#7fb6f1",   // azure on dark (8.2:1 on ink)
  warm: "#b1361b",         // restrained accent (4.7:1 on white)
  highlight: "#cfe4fb",    // pale azure highlight band
};

const B_FONTS = {
  display: '"DM Serif Display", "Playfair Display", Georgia, serif',
  body: '"Inter", -apple-system, sans-serif',
  hand: '"Caveat", "Patrick Hand", cursive',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// A subtle paper-grain background filter
function BPaper({ children, style }) {
  return (
    <div style={{ background: B_COLORS.paper, position: "relative", ...style }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none", mixBlendMode: "multiply" }}>
        <defs>
          <pattern id="bgrain" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="0.5" fill="#000"/><circle cx="40" cy="60" r="0.4" fill="#000"/>
            <circle cx="80" cy="20" r="0.6" fill="#000"/><circle cx="100" cy="90" r="0.4" fill="#000"/>
            <circle cx="20" cy="100" r="0.5" fill="#000"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgrain)"/>
      </svg>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

// Tape sticker
function BTape({ rotation = -2, color = "#cfe4fb", style, children }) {
  return (
    <span style={{ display: "inline-block", padding: "3px 14px", background: color, transform: `rotate(${rotation}deg)`, fontFamily: B_FONTS.hand, fontSize: 18, color: B_COLORS.ink, boxShadow: "0 2px 4px rgba(0,0,0,0.08)", ...style }}>{children}</span>
  );
}

function BNav({ page, setPage }) {
  const items = [["home", "home"], ["posts", "writing"], ["speaking", "speaking"], ["about", "about + now"]];
  return (
    <header style={{ padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: B_COLORS.ink, color: B_COLORS.paper, position: "sticky", top: 0, zIndex: 10 }}>
      <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, color: B_COLORS.paper, padding: 0 }}>
        <span style={{ width: 28, height: 28, background: B_COLORS.accentSoft, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: B_FONTS.display, fontSize: 16, color: B_COLORS.ink, fontWeight: 700 }}>jm</span>
        <span style={{ fontFamily: B_FONTS.display, fontSize: 22, letterSpacing: "-0.01em" }}>jeremy meiss</span>
        <span style={{ fontFamily: B_FONTS.hand, fontSize: 18, color: B_COLORS.highlight, transform: "rotate(-3deg)", display: "inline-block" }}>(jerdog)</span>
      </button>
      <nav style={{ display: "flex", gap: 4 }}>
        {items.map(([k, label]) => (
          <button key={k} onClick={() => setPage(k)} style={{ background: page === k ? B_COLORS.accentSoft : "transparent", color: page === k ? B_COLORS.ink : B_COLORS.paper, border: "none", padding: "8px 16px", fontFamily: B_FONTS.body, fontSize: 13, fontWeight: 500, cursor: "pointer", borderRadius: 999 }}>{label}</button>
        ))}
      </nav>
    </header>
  );
}

function BFooter() {
  return (
    <footer style={{ padding: "32px 40px", background: B_COLORS.ink, color: B_COLORS.paper, marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
      <div>
        <div style={{ fontFamily: B_FONTS.hand, fontSize: 22, color: B_COLORS.highlight }}>thanks for reading.</div>
        <div style={{ fontFamily: B_FONTS.body, fontSize: 12, color: "#c8d4e2", marginTop: 8, lineHeight: 1.6 }}>this whole thing is hand-built in next.js, plain mdx, deployed on whatever cloud is least annoying this week.</div>
      </div>
      <div style={{ fontFamily: B_FONTS.body, fontSize: 12, lineHeight: 1.9, color: "#d8e3ee" }}>
        <div style={{ fontFamily: B_FONTS.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: B_COLORS.accentSoft, marginBottom: 8 }}>elsewhere</div>
        <div>github · linkedin · mastodon</div>
        <div>bluesky · rss · email</div>
      </div>
      <div style={{ fontFamily: B_FONTS.body, fontSize: 12, lineHeight: 1.9, color: "#d8e3ee" }}>
        <div style={{ fontFamily: B_FONTS.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: B_COLORS.accentSoft, marginBottom: 8 }}>side projects</div>
        <div>devopspartygames.com</div>
        <div>devopsdays kc</div>
      </div>
    </footer>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────
function BHome({ setPage, data }) {
  const { person, now, posts } = data;
  return (
    <BPaper>
      {/* Big intro card */}
      <section style={{ padding: "48px 40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 32 }}>
          <div style={{ background: B_COLORS.card, padding: "40px 44px", border: `1px solid ${B_COLORS.ink}`, position: "relative", boxShadow: "6px 6px 0 " + B_COLORS.ink }}>
            <BTape rotation={-3} style={{ position: "absolute", top: -14, left: 40 }}>hello</BTape>
            <BTape rotation={4} color={B_COLORS.highlight} style={{ position: "absolute", top: -14, right: 60 }}>field notes</BTape>
            <div style={{ fontFamily: B_FONTS.mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: B_COLORS.accent, marginTop: 8 }}>
              {person.role} · {person.company}
            </div>
            <h1 style={{ fontFamily: B_FONTS.display, fontSize: 92, lineHeight: 0.95, letterSpacing: "-0.025em", margin: "12px 0 16px", color: B_COLORS.ink, fontWeight: 400 }}>
              hi, i'm jeremy. i build <span style={{ position: "relative", display: "inline-block" }}>communities<svg width="100%" height="14" viewBox="0 0 400 14" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: -6 }}><path d="M2,8 Q100,2 200,7 T398,6" stroke={B_COLORS.warm} strokeWidth="3" fill="none" strokeLinecap="round"/></svg></span> for a living.
            </h1>
            <p style={{ fontFamily: B_FONTS.body, fontSize: 17, lineHeight: 1.6, color: B_COLORS.inkSoft, margin: "0 0 20px", maxWidth: 580 }}>
              {person.blurb} I write about the work, the metrics, and the very real human cost of pretending DevRel doesn't need either.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={() => setPage("posts")} style={{ background: B_COLORS.ink, color: B_COLORS.paper, border: "none", padding: "10px 18px", fontFamily: B_FONTS.body, fontSize: 13, fontWeight: 500, cursor: "pointer", borderRadius: 999 }}>read the writing</button>
              <button onClick={() => setPage("speaking")} style={{ background: "transparent", color: B_COLORS.ink, border: `1.5px solid ${B_COLORS.ink}`, padding: "10px 18px", fontFamily: B_FONTS.body, fontSize: 13, cursor: "pointer", borderRadius: 999 }}>book me to speak</button>
              <span style={{ fontFamily: B_FONTS.hand, fontSize: 22, color: B_COLORS.warm, transform: "rotate(-2deg)", display: "inline-block", marginLeft: 4 }}>← start here</span>
            </div>
          </div>

          {/* /now card */}
          <div style={{ background: B_COLORS.ink, color: B_COLORS.paper, padding: "32px 32px 28px", position: "relative", border: `1px solid ${B_COLORS.ink}`, boxShadow: "6px 6px 0 " + B_COLORS.accent }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16, paddingBottom: 12, borderBottom: `1px dashed ${B_COLORS.muted}` }}>
              <div>
                <div style={{ fontFamily: B_FONTS.display, fontSize: 32, lineHeight: 1, color: B_COLORS.highlight }}>/now</div>
                <div style={{ fontFamily: B_FONTS.hand, fontSize: 18, color: B_COLORS.accentSoft, marginTop: 2 }}>what i'm up to today-ish</div>
              </div>
              <div style={{ fontFamily: B_FONTS.mono, fontSize: 10, letterSpacing: "0.12em", color: B_COLORS.accentSoft, textAlign: "right", lineHeight: 1.6 }}>
                <div>{now.updated.toUpperCase()}</div>
                <div>{now.location.toUpperCase()}</div>
              </div>
            </div>
            {now.items.map((it, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: i < now.items.length - 1 ? `1px dashed #2a3340` : "none" }}>
                <div style={{ fontFamily: B_FONTS.mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: B_COLORS.accentSoft, marginBottom: 3 }}>{it.label}</div>
                <div style={{ fontFamily: B_FONTS.body, fontSize: 14, lineHeight: 1.5, color: "#e6edf5" }}>{it.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity feed strip — 3 cards mixing types */}
      <section style={{ padding: "32px 40px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
          <h2 style={{ fontFamily: B_FONTS.display, fontSize: 38, margin: 0, fontWeight: 400, letterSpacing: "-0.02em" }}>the feed.</h2>
          <span style={{ fontFamily: B_FONTS.hand, fontSize: 22, color: B_COLORS.muted }}>— posts, talks, coffee, repeat.</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { kind: "POST", title: posts[0].title, meta: posts[0].date, color: B_COLORS.card, rotate: -1, accent: B_COLORS.accent, click: () => setPage("post") },
            { kind: "TALK", title: "FOSDEM 2026 — Brussels", meta: "spoke · Feb 1", color: B_COLORS.highlight, rotate: 1.5, accent: B_COLORS.ink, click: () => setPage("speaking") },
            { kind: "COFFEE", title: "Yirgacheffe · V60", meta: "messenger coffee", color: B_COLORS.card, rotate: -0.5, accent: B_COLORS.warm },
            { kind: "POST", title: posts[1].title, meta: posts[1].date, color: B_COLORS.card, rotate: 0.8, accent: B_COLORS.accent, click: () => setPage("post") },
          ].map((c, i) => (
            <div key={i} onClick={c.click} style={{ background: c.color, padding: "18px 18px 16px", transform: `rotate(${c.rotate}deg)`, cursor: c.click ? "pointer" : "default", border: `1px solid ${B_COLORS.ink}`, boxShadow: "3px 3px 0 " + B_COLORS.ink, minHeight: 140, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ fontFamily: B_FONTS.mono, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: c.accent, fontWeight: 700 }}>· {c.kind} ·</div>
              <div style={{ fontFamily: B_FONTS.display, fontSize: 18, lineHeight: 1.15, color: B_COLORS.ink, marginTop: 8 }}>{c.title}</div>
              <div style={{ fontFamily: B_FONTS.hand, fontSize: 16, color: B_COLORS.muted, marginTop: 8 }}>{c.meta}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent posts list */}
      <section style={{ padding: "40px 40px 16px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
          <h2 style={{ fontFamily: B_FONTS.display, fontSize: 38, margin: 0, fontWeight: 400 }}>recent essays.</h2>
          <button onClick={() => setPage("posts")} style={{ fontFamily: B_FONTS.body, fontSize: 13, color: B_COLORS.accent, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>see them all →</button>
        </div>
        <div style={{ background: B_COLORS.card, border: `1px solid ${B_COLORS.ink}`, boxShadow: "4px 4px 0 " + B_COLORS.ink }}>
          {posts.slice(0, 4).map((p, i) => (
            <div key={p.slug} onClick={() => setPage("post")} style={{ padding: "18px 24px", borderBottom: i < 3 ? `1px dashed ${B_COLORS.paperDeep}` : "none", display: "grid", gridTemplateColumns: "60px 1fr 200px", gap: 20, alignItems: "center", cursor: "pointer" }}>
              <div style={{ fontFamily: B_FONTS.display, fontSize: 28, color: B_COLORS.muted, lineHeight: 1 }}>·{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div style={{ fontFamily: B_FONTS.display, fontSize: 22, lineHeight: 1.15, color: B_COLORS.ink }}>{p.title}</div>
                <div style={{ fontFamily: B_FONTS.body, fontSize: 13, color: B_COLORS.muted, marginTop: 4 }}>{p.tags.map(t => `#${t}`).join(" ")}</div>
              </div>
              <div style={{ fontFamily: B_FONTS.mono, fontSize: 10, letterSpacing: "0.12em", color: B_COLORS.muted, textAlign: "right", textTransform: "uppercase" }}>{p.date} · {p.readTime}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What I do strip */}
      <section style={{ padding: "40px 40px 16px" }}>
        <h2 style={{ fontFamily: B_FONTS.display, fontSize: 38, margin: "0 0 16px", fontWeight: 400 }}>what i actually do.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { t: "build devrel programs", b: "from scratch or from chaos. team design, motion plans, measurement, the works." },
            { t: "speak at your event", b: "keynotes, panels, fireside chats. devrel, devex, community, ADHD-fueled tangents." },
            { t: "advise & coach", b: "for early-stage teams or first-time DevRel leads. office hours by the half-day." },
          ].map((s, i) => (
            <div key={i} style={{ padding: "20px", background: i === 1 ? B_COLORS.ink : B_COLORS.card, color: i === 1 ? B_COLORS.paper : B_COLORS.ink, border: `1px solid ${B_COLORS.ink}` }}>
              <div style={{ fontFamily: B_FONTS.mono, fontSize: 10, letterSpacing: "0.16em", color: i === 1 ? B_COLORS.highlight : B_COLORS.accent, textTransform: "uppercase" }}>0{i + 1}</div>
              <div style={{ fontFamily: B_FONTS.display, fontSize: 26, lineHeight: 1.1, margin: "8px 0 10px" }}>{s.t}</div>
              <div style={{ fontFamily: B_FONTS.body, fontSize: 14, lineHeight: 1.55, opacity: 0.85 }}>{s.b}</div>
            </div>
          ))}
        </div>
      </section>
    </BPaper>
  );
}

// ─── POSTS INDEX ────────────────────────────────────────────────────
function BPosts({ setPage, data }) {
  const { posts } = data;
  const [filter, setFilter] = React.useState("all");
  const tags = ["all", "devrel", "devex", "community", "metrics", "speaking", "snark"];
  const filtered = filter === "all" ? posts : posts.filter(p => p.tags.includes(filter));
  return (
    <BPaper>
      <section style={{ padding: "48px 40px 24px" }}>
        <BTape rotation={-2} style={{ marginBottom: 12 }}>the writing</BTape>
        <h1 style={{ fontFamily: B_FONTS.display, fontSize: 84, lineHeight: 0.95, letterSpacing: "-0.025em", margin: "12px 0 16px", fontWeight: 400 }}>
          {posts.length} essays. some good, some <span style={{ position: "relative", display: "inline-block" }}>spicy.<svg width="100%" height="40" viewBox="0 0 200 40" preserveAspectRatio="none" style={{ position: "absolute", left: -8, top: -8, width: "calc(100% + 16px)" }}><path d="M10,30 Q50,2 100,18 T190,12 Q190,38 100,32 T10,30 Z" stroke={B_COLORS.warm} strokeWidth="2.5" fill="none"/></svg></span>
        </h1>
        <p style={{ fontFamily: B_FONTS.body, fontSize: 17, color: B_COLORS.inkSoft, maxWidth: 640, lineHeight: 1.55 }}>
          mostly devrel & devex, with regular detours into metrics, community, and the parts of leadership nobody wants to write about.
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 24 }}>
          {tags.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{ background: filter === t ? B_COLORS.accent : B_COLORS.card, color: filter === t ? B_COLORS.paper : B_COLORS.ink, border: `1px solid ${B_COLORS.ink}`, padding: "6px 14px", fontFamily: B_FONTS.body, fontSize: 12, cursor: "pointer", borderRadius: 999 }}>#{t}</button>
          ))}
        </div>
      </section>

      <section style={{ padding: "16px 40px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {filtered.map((p, i) => (
            <article key={p.slug} onClick={() => setPage("post")} style={{ background: i % 3 === 0 ? B_COLORS.ink : B_COLORS.card, color: i % 3 === 0 ? B_COLORS.paper : B_COLORS.ink, padding: "24px 28px 22px", border: `1px solid ${B_COLORS.ink}`, boxShadow: `4px 4px 0 ${i % 3 === 0 ? B_COLORS.warm : B_COLORS.ink}`, cursor: "pointer", display: "flex", flexDirection: "column", gap: 10, minHeight: 220 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: B_FONTS.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: i % 3 === 0 ? B_COLORS.highlight : B_COLORS.accent }}>
                <span>· essay {String(i + 1).padStart(3, "0")} ·</span><span>{p.readTime}</span>
              </div>
              <h3 style={{ fontFamily: B_FONTS.display, fontSize: 30, lineHeight: 1.05, letterSpacing: "-0.015em", margin: 0, fontWeight: 400 }}>{p.title}</h3>
              <p style={{ fontFamily: B_FONTS.body, fontSize: 14, lineHeight: 1.55, margin: 0, opacity: 0.85 }}>{p.excerpt}</p>
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 12, borderTop: i % 3 === 0 ? `1px dashed #3a4554` : `1px dashed ${B_COLORS.paperDeep}` }}>
                <div style={{ fontFamily: B_FONTS.body, fontSize: 12, opacity: 0.7 }}>{p.tags.map(t => `#${t}`).join(" ")}</div>
                <div style={{ fontFamily: B_FONTS.hand, fontSize: 18, color: i % 3 === 0 ? B_COLORS.highlight : B_COLORS.warm }}>{p.date} →</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </BPaper>
  );
}

// ─── POST ────────────────────────────────────────────────────────────
function BPost({ setPage, data }) {
  const post = data.posts[0];
  const body = data.featuredPostBody;
  return (
    <BPaper>
      <section style={{ padding: "32px 40px 24px" }}>
        <button onClick={() => setPage("posts")} style={{ background: "none", border: "none", fontFamily: B_FONTS.hand, fontSize: 20, color: B_COLORS.accent, cursor: "pointer", padding: 0 }}>← back to the writing</button>
      </section>

      <section style={{ padding: "0 40px 24px" }}>
        <div style={{ background: B_COLORS.card, border: `1px solid ${B_COLORS.ink}`, padding: "40px 48px 36px", boxShadow: "6px 6px 0 " + B_COLORS.ink, position: "relative" }}>
          <BTape rotation={-3} color={B_COLORS.warm} style={{ position: "absolute", top: -14, left: 32, color: B_COLORS.paper }}>essay № 47</BTape>
          <div style={{ fontFamily: B_FONTS.mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: B_COLORS.accent, marginBottom: 12 }}>{post.tags.map(t => `#${t}`).join("  ")} · {post.date} · {post.readTime}</div>
          <h1 style={{ fontFamily: B_FONTS.display, fontSize: 78, lineHeight: 0.95, letterSpacing: "-0.025em", margin: "0 0 20px", fontWeight: 400 }}>{post.title}</h1>
          <p style={{ fontFamily: B_FONTS.body, fontSize: 19, lineHeight: 1.55, color: B_COLORS.inkSoft, margin: 0, maxWidth: 720 }}>{post.excerpt}</p>
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: `1px dashed ${B_COLORS.paperDeep}` }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: B_COLORS.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: B_FONTS.display, fontSize: 18, color: B_COLORS.ink }}>jm</div>
            <div>
              <div style={{ fontFamily: B_FONTS.body, fontSize: 14, fontWeight: 600 }}>jeremy meiss</div>
              <div style={{ fontFamily: B_FONTS.body, fontSize: 12, color: B_COLORS.muted }}>director of devrel · onestream software</div>
            </div>
            <div style={{ marginLeft: "auto", fontFamily: B_FONTS.hand, fontSize: 22, color: B_COLORS.warm, transform: "rotate(-2deg)" }}>real take inside ↓</div>
          </div>
        </div>
      </section>

      <section style={{ padding: "16px 40px 24px", display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <article style={{ maxWidth: 720, paddingTop: 12 }}>
          {body.map((b, i) => {
            if (b.kind === "lede") return <p key={i} style={{ fontFamily: B_FONTS.display, fontSize: 26, lineHeight: 1.35, color: B_COLORS.ink, margin: "0 0 24px" }}>{b.text}</p>;
            if (b.kind === "h2") return (
              <h2 key={i} style={{ fontFamily: B_FONTS.display, fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.015em", margin: "44px 0 16px", fontWeight: 400, position: "relative", display: "inline-block" }}>
                {b.text}
                <span style={{ position: "absolute", left: -28, top: "50%", transform: "translateY(-50%)", fontFamily: B_FONTS.hand, fontSize: 28, color: B_COLORS.warm }}>§</span>
              </h2>
            );
            if (b.kind === "pullquote") return (
              <blockquote key={i} style={{ margin: "32px 0", padding: "28px 32px", background: B_COLORS.ink, color: B_COLORS.highlight, fontFamily: B_FONTS.display, fontSize: 28, lineHeight: 1.25, fontWeight: 400, transform: "rotate(-0.5deg)", boxShadow: "5px 5px 0 " + B_COLORS.warm, position: "relative" }}>
                <span style={{ fontFamily: B_FONTS.display, fontSize: 80, lineHeight: 0, verticalAlign: "-0.4em", marginRight: 6, color: B_COLORS.warm }}>“</span>{b.text}
              </blockquote>
            );
            if (b.kind === "list") return (
              <ul key={i} style={{ margin: "16px 0 24px", padding: 0, listStyle: "none", background: B_COLORS.card, border: `1px solid ${B_COLORS.ink}`, padding: "8px 24px" }}>
                {b.items.map((it, j) => (
                  <li key={j} style={{ fontFamily: B_FONTS.body, fontSize: 16, lineHeight: 1.6, color: B_COLORS.inkSoft, padding: "12px 0", borderBottom: j < b.items.length - 1 ? `1px dashed ${B_COLORS.paperDeep}` : "none", paddingLeft: 36, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 11, fontFamily: B_FONTS.hand, fontSize: 22, color: B_COLORS.warm }}>→</span>{it}
                  </li>
                ))}
              </ul>
            );
            return <p key={i} style={{ fontFamily: B_FONTS.body, fontSize: 17, lineHeight: 1.7, color: B_COLORS.inkSoft, margin: "0 0 20px" }}>{b.text}</p>;
          })}
          <div style={{ marginTop: 32, padding: "20px 0", borderTop: `2px solid ${B_COLORS.ink}`, borderBottom: `2px solid ${B_COLORS.ink}`, fontFamily: B_FONTS.hand, fontSize: 26, color: B_COLORS.warm }}>— jeremy, somewhere in kansas city</div>
        </article>

        <aside style={{ paddingTop: 16 }}>
          <div style={{ background: B_COLORS.card, border: `1px solid ${B_COLORS.ink}`, padding: "16px 20px", marginBottom: 16, position: "sticky", top: 80 }}>
            <div style={{ fontFamily: B_FONTS.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: B_COLORS.accent, marginBottom: 8 }}>contents</div>
            <div style={{ fontFamily: B_FONTS.body, fontSize: 13, lineHeight: 2 }}>
              <div style={{ color: B_COLORS.warm, fontWeight: 500 }}>→ the shift</div>
              <div>· what to actually measure</div>
              <div>· stop apologizing</div>
            </div>
            <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px dashed ${B_COLORS.paperDeep}` }}>
              <div style={{ fontFamily: B_FONTS.mono, fontSize: 10, letterSpacing: "0.14em", color: B_COLORS.muted, textTransform: "uppercase", marginBottom: 6 }}>reading progress</div>
              <div style={{ height: 6, background: B_COLORS.paperDeep }}><div style={{ width: "32%", height: "100%", background: B_COLORS.warm }} /></div>
              <div style={{ fontFamily: B_FONTS.hand, fontSize: 16, color: B_COLORS.muted, marginTop: 6 }}>~6 min to go</div>
            </div>
          </div>
        </aside>
      </section>

      <section style={{ padding: "24px 40px 0" }}>
        <h3 style={{ fontFamily: B_FONTS.display, fontSize: 30, margin: "0 0 12px", fontWeight: 400 }}>keep reading.</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {data.posts.slice(1, 4).map((p, i) => (
            <div key={p.slug} onClick={() => setPage("post")} style={{ background: B_COLORS.card, border: `1px solid ${B_COLORS.ink}`, padding: "16px 18px", cursor: "pointer", boxShadow: "3px 3px 0 " + B_COLORS.ink }}>
              <div style={{ fontFamily: B_FONTS.mono, fontSize: 10, color: B_COLORS.accent, letterSpacing: "0.14em", textTransform: "uppercase" }}>{p.date}</div>
              <div style={{ fontFamily: B_FONTS.display, fontSize: 20, lineHeight: 1.15, marginTop: 8, color: B_COLORS.ink }}>{p.title}</div>
            </div>
          ))}
        </div>
      </section>
    </BPaper>
  );
}

// ─── SPEAKING ────────────────────────────────────────────────────────
function BSpeaking({ data }) {
  const { talks } = data;
  return (
    <BPaper>
      <section style={{ padding: "48px 40px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 24, alignItems: "end" }}>
          <div>
            <BTape rotation={-3} color={B_COLORS.highlight}>on stage</BTape>
            <h1 style={{ fontFamily: B_FONTS.display, fontSize: 84, lineHeight: 0.95, letterSpacing: "-0.025em", margin: "16px 0 12px", fontWeight: 400 }}>
              i give the kind of talks that have <span style={{ background: B_COLORS.highlight, padding: "0 6px" }}>actual jokes</span>.
            </h1>
            <p style={{ fontFamily: B_FONTS.body, fontSize: 17, color: B_COLORS.inkSoft, lineHeight: 1.55, margin: 0, maxWidth: 580 }}>
              keynotes, conference talks, panels, podcasts. mostly devrel, devex, and community. occasionally squirrels.
            </p>
          </div>
          <div style={{ background: B_COLORS.ink, color: B_COLORS.paper, padding: "20px 22px", border: `1px solid ${B_COLORS.ink}`, transform: "rotate(1deg)" }}>
            <div style={{ fontFamily: B_FONTS.hand, fontSize: 22, color: B_COLORS.highlight }}>want me at your event?</div>
            <div style={{ fontFamily: B_FONTS.body, fontSize: 13, color: "#d8e3ee", lineHeight: 1.55, marginTop: 6 }}>i'll travel. send me a note about format, audience, and what you want them to walk away believing.</div>
            <button style={{ marginTop: 12, background: B_COLORS.warm, color: B_COLORS.paper, border: "none", padding: "8px 16px", fontFamily: B_FONTS.body, fontSize: 13, fontWeight: 500, cursor: "pointer", borderRadius: 999 }}>send the note →</button>
          </div>
        </div>
      </section>

      <section style={{ padding: "32px 40px 16px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 16 }}>
          <h2 style={{ fontFamily: B_FONTS.display, fontSize: 32, margin: 0, fontWeight: 400 }}>upcoming &amp; recent.</h2>
          <span style={{ fontFamily: B_FONTS.hand, fontSize: 20, color: B_COLORS.muted }}>{talks.length} this year-ish</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {talks.map((t, i) => {
            const upcoming = i < 2;
            return (
              <div key={i} style={{ background: upcoming ? B_COLORS.highlight : B_COLORS.card, border: `1px solid ${B_COLORS.ink}`, padding: "16px 18px", display: "grid", gridTemplateColumns: "60px 1fr 70px", gap: 14, alignItems: "center", boxShadow: upcoming ? "3px 3px 0 " + B_COLORS.ink : "none" }}>
                <div style={{ fontFamily: B_FONTS.display, fontSize: 16, lineHeight: 1.1, color: B_COLORS.ink, textAlign: "center", padding: "8px 4px", background: B_COLORS.paper, border: `1px solid ${B_COLORS.ink}` }}>{t.date.split(" ")[0]}<br/><span style={{ fontSize: 11, color: B_COLORS.muted }}>{t.date.split(" ")[1]}</span></div>
                <div>
                  <div style={{ fontFamily: B_FONTS.display, fontSize: 19, lineHeight: 1.15, color: B_COLORS.ink }}>{t.title}</div>
                  <div style={{ fontFamily: B_FONTS.body, fontSize: 12, color: B_COLORS.inkSoft, marginTop: 3 }}>{t.event}</div>
                </div>
                <div style={{ fontFamily: B_FONTS.mono, fontSize: 9, letterSpacing: "0.14em", color: upcoming ? B_COLORS.warm : B_COLORS.accent, textTransform: "uppercase", textAlign: "right", fontWeight: 700 }}>{upcoming ? "↑ next" : t.type}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ padding: "32px 40px 0" }}>
        <h2 style={{ fontFamily: B_FONTS.display, fontSize: 32, margin: "0 0 16px", fontWeight: 400 }}>topics i'll happily talk about.</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Building DevRel from scratch", "Measuring DevRel without OKR pain", "Developer Experience as a strategy", "Community, but not the cringe kind", "Mentorship & rebuilding civilisation", "ADHD in the technologist's life", "AI in CONTRIBUTING.md", "CI/CD interoperability"].map((t, i) => (
            <div key={i} style={{ padding: "8px 16px", background: i % 2 ? B_COLORS.ink : B_COLORS.card, color: i % 2 ? B_COLORS.paper : B_COLORS.ink, fontFamily: B_FONTS.body, fontSize: 13, border: `1px solid ${B_COLORS.ink}`, borderRadius: 999, transform: `rotate(${(i % 3 - 1) * 0.7}deg)` }}>{t}</div>
          ))}
        </div>
      </section>
    </BPaper>
  );
}

// ─── ABOUT (combined with /now extras) ──────────────────────────────
function BAbout({ data }) {
  const { person, reading, coffee } = data;
  return (
    <BPaper>
      <section style={{ padding: "48px 40px 16px", display: "grid", gridTemplateColumns: "5fr 7fr", gap: 32 }}>
        <div style={{ background: B_COLORS.card, border: `1px solid ${B_COLORS.ink}`, padding: 16, boxShadow: "5px 5px 0 " + B_COLORS.ink, transform: "rotate(-1deg)" }}>
          <div style={{ aspectRatio: "4/5", background: B_COLORS.paperDeep, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.3 }}><defs><pattern id="bphoto" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0,6 L6,0" stroke={B_COLORS.muted} strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#bphoto)"/></svg>
            <span style={{ position: "relative", fontFamily: B_FONTS.mono, fontSize: 11, letterSpacing: "0.14em", color: B_COLORS.muted, textTransform: "uppercase" }}>portrait · 4:5</span>
          </div>
          <div style={{ marginTop: 12, fontFamily: B_FONTS.hand, fontSize: 22, color: B_COLORS.warm, textAlign: "center" }}>jerdog, in the wild · 2025</div>
        </div>
        <div>
          <BTape rotation={-3}>about</BTape>
          <h1 style={{ fontFamily: B_FONTS.display, fontSize: 64, lineHeight: 0.98, letterSpacing: "-0.02em", margin: "16px 0 16px", fontWeight: 400 }}>almost 30 years in tech. still genuinely <span style={{ color: B_COLORS.warm, fontStyle: "italic" }}>likes</span> it.</h1>
          <p style={{ fontFamily: B_FONTS.body, fontSize: 16, lineHeight: 1.6, color: B_COLORS.inkSoft, margin: 0 }}>{person.longBio}</p>
          <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Director of DevRel @ OneStream", "ex CircleCI", "ex Solace", "ex Auth0", "ex XDA", "DevOpsDays KC organizer", "DevOpsPartyGames co-creator"].map((t, i) => (
              <span key={i} style={{ padding: "5px 12px", background: B_COLORS.card, border: `1px solid ${B_COLORS.ink}`, fontFamily: B_FONTS.body, fontSize: 12, borderRadius: 999 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Now block */}
      <section style={{ padding: "32px 40px 16px" }}>
        <div style={{ background: B_COLORS.ink, color: B_COLORS.paper, padding: "28px 32px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontFamily: B_FONTS.display, fontSize: 38, color: B_COLORS.highlight }}>/now <span style={{ fontFamily: B_FONTS.hand, fontSize: 22, color: B_COLORS.accentSoft, marginLeft: 8 }}>— what i'm actually doing</span></div>
            <div style={{ fontFamily: B_FONTS.mono, fontSize: 11, letterSpacing: "0.14em", color: B_COLORS.accentSoft }}>{data.now.updated.toUpperCase()}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
            {data.now.items.map((it, i) => (
              <div key={i} style={{ borderTop: `1px dashed ${B_COLORS.muted}`, paddingTop: 12 }}>
                <div style={{ fontFamily: B_FONTS.mono, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: B_COLORS.accentSoft, marginBottom: 6 }}>{it.label}</div>
                <div style={{ fontFamily: B_FONTS.body, fontSize: 13, lineHeight: 1.5, color: "#e6edf5" }}>{it.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bookshelf + Coffee log */}
      <section style={{ padding: "32px 40px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: B_COLORS.card, border: `1px solid ${B_COLORS.ink}`, padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
            <h2 style={{ fontFamily: B_FONTS.display, fontSize: 30, margin: 0, fontWeight: 400 }}>the shelf</h2>
            <span style={{ fontFamily: B_FONTS.hand, fontSize: 20, color: B_COLORS.muted }}>— what i'm reading</span>
          </div>
          {reading.map((b, i) => (
            <div key={i} style={{ padding: "10px 0", borderBottom: i < reading.length - 1 ? `1px dashed ${B_COLORS.paperDeep}` : "none", display: "grid", gridTemplateColumns: "30px 1fr 90px", gap: 12, alignItems: "baseline" }}>
              <div style={{ width: 24, height: 32, background: ["#0a5fbf", "#08458a", "#0b0d10", "#7fb6f1", "#cfe4fb", "#2a3340"][i % 6] }}/>
              <div>
                <div style={{ fontFamily: B_FONTS.display, fontSize: 17, lineHeight: 1.15 }}>{b.title}</div>
                <div style={{ fontFamily: B_FONTS.body, fontSize: 12, color: B_COLORS.muted, marginTop: 2 }}>{b.author}</div>
              </div>
              <div style={{ fontFamily: B_FONTS.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: b.state === "Reading" ? B_COLORS.warm : B_COLORS.accent, textAlign: "right" }}>{b.state}</div>
            </div>
          ))}
        </div>
        <div style={{ background: B_COLORS.card, border: `1px solid ${B_COLORS.ink}`, padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
            <h2 style={{ fontFamily: B_FONTS.display, fontSize: 30, margin: 0, fontWeight: 400 }}>the coffee log</h2>
            <span style={{ fontFamily: B_FONTS.hand, fontSize: 20, color: B_COLORS.muted }}>— in the cup, lately</span>
          </div>
          {coffee.map((c, i) => (
            <div key={i} style={{ padding: "12px 0", borderBottom: i < coffee.length - 1 ? `1px dashed ${B_COLORS.paperDeep}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                <div style={{ fontFamily: B_FONTS.display, fontSize: 17, lineHeight: 1.15 }}>{c.roaster} <span style={{ color: B_COLORS.warm, fontStyle: "italic" }}>· {c.origin}</span></div>
                <div style={{ fontFamily: B_FONTS.mono, fontSize: 10, color: B_COLORS.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>{c.method}</div>
              </div>
              <div style={{ fontFamily: B_FONTS.hand, fontSize: 18, color: B_COLORS.accent, marginTop: 4 }}>“{c.note}”</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "32px 40px 0" }}>
        <h2 style={{ fontFamily: B_FONTS.display, fontSize: 32, margin: "0 0 14px", fontWeight: 400 }}>say hi.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {person.socials.map((s, i) => (
            <a key={i} href={s.href} style={{ textDecoration: "none", color: B_COLORS.ink, padding: "16px 18px", background: B_COLORS.card, border: `1px solid ${B_COLORS.ink}`, transform: `rotate(${(i % 3 - 1) * 0.6}deg)`, boxShadow: "3px 3px 0 " + B_COLORS.ink }}>
              <div style={{ fontFamily: B_FONTS.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: B_COLORS.accent }}>{s.label}</div>
              <div style={{ fontFamily: B_FONTS.display, fontSize: 17, marginTop: 4 }}>{s.handle}</div>
            </a>
          ))}
        </div>
      </section>
    </BPaper>
  );
}

function DirectionBV2() {
  const [page, setPage] = React.useState("home");
  const data = window.JM_DATA;
  return (
    <div style={{ background: B_COLORS.paper, fontFamily: B_FONTS.body, minHeight: "100%" }}>
      <BNav page={page} setPage={setPage} />
      {page === "home" && <BHome setPage={setPage} data={data} />}
      {page === "posts" && <BPosts setPage={setPage} data={data} />}
      {page === "post" && <BPost setPage={setPage} data={data} />}
      {page === "speaking" && <BSpeaking data={data} />}
      {page === "about" && <BAbout data={data} />}
      <BFooter />
    </div>
  );
}

window.DirectionBV2 = DirectionBV2;
