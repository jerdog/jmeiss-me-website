// Shared content for both design directions.
// Lifted/inspired from jmeiss.me — a personal site for Jeremy Meiss,
// DevRel & DevEx leader currently at OneStream Software.

window.JM_DATA = {
  person: {
    name: "Jeremy Meiss",
    handle: "@IAmJerdog",
    role: "Director of DevRel",
    company: "OneStream Software",
    location: "Kansas City, MO",
    tagline: "DevRel & DevEx leader. Coffee evangelist. ADHD-fueled technologist.",
    blurb: "I help companies build communities, programs, and experiences that developers actually like. Almost 30 years in tech, last decade-plus in Developer Relations and Developer Experience.",
    longBio: "Currently Director of Developer Relations at OneStream Software. Previously CircleCI, Solace, Auth0, and XDA. Co-creator of DevOpsPartyGames, organizer of DevOpsDays Kansas City, and an international speaker on Developer Relations, Community, Developer Productivity, and Developer Experience.",
    socials: [
      { label: "GitHub", handle: "jerdog", href: "#" },
      { label: "LinkedIn", handle: "jeremymeiss", href: "#" },
      { label: "Mastodon", handle: "@jerdog@hachyderm.io", href: "#" },
      { label: "Bluesky", handle: "@jmeiss.me", href: "#" },
      { label: "RSS", handle: "/index.xml", href: "#" },
    ],
  },

  now: {
    updated: "April 22, 2026",
    location: "Kansas City",
    items: [
      { label: "Working on", text: "Building out the DevRel program at OneStream — measurement, scaled events, and a community playbook." },
      { label: "Writing", text: "A 6-part series on what DevRel looks like for the next 5 years." },
      { label: "Speaking", text: "Heading to KubeCon EU in Amsterdam, then DevOpsDays KC in September (organizing)." },
      { label: "Reading", text: "“The Staff Engineer's Path” by Tanya Reilly. Slow-going but worth it." },
      { label: "Drinking", text: "A washed Ethiopia Yirgacheffe from Messenger Coffee. V60, 1:16." },
    ],
  },

  posts: [
    {
      slug: "devrel-bottom-line",
      title: "DevRel Is a Practice — and a Bottom-Line Function",
      date: "March 12, 2026",
      readTime: "9 min",
      tags: ["devrel", "metrics", "strategy"],
      excerpt: "DevRel is a practice, a discipline, that builds community with developers. It's also a way to directly impact the bottom line for a company. If you're willing to start tracking, and start measuring.",
      featured: true,
    },
    {
      slug: "devex-tools-platforms",
      title: "DevEx Lives or Dies by Your Tools",
      date: "February 18, 2026",
      readTime: "8 min",
      tags: ["devex", "devops", "tools"],
      excerpt: "DevEx is a factor throughout the development process and is influenced by chosen tools, technologies, and platforms. It also directly impacts how well our DevOps practices are implemented.",
    },
    {
      slug: "ide-evolution",
      title: "From ed(1) to Cursor: Why DevEx Got Us Here",
      date: "January 30, 2026",
      readTime: "5 min",
      tags: ["devex", "history", "ide"],
      excerpt: "The text-based editors of before are a far cry from today's sophisticated IDEs, and ‘developer experience’ is one of the biggest reasons why.",
    },
    {
      slug: "okrs-and-devrel",
      title: "OKRs Suck. So How Do We Measure DevRel?",
      date: "December 4, 2025",
      readTime: "7 min",
      tags: ["devrel", "metrics", "snark"],
      excerpt: "Crunching numbers is hard. And OKRs suck. So that means we can forget about DevRel metrics, right? Well, let's chat about that.",
    },
    {
      slug: "cicd-interop",
      title: "CI/CD Interoperability and the Future of DevEx",
      date: "November 11, 2025",
      readTime: "6 min",
      tags: ["devex", "ci-cd", "devops"],
      excerpt: "A successful DevEx focuses on eliminating obstacles that hinder a developer from achieving success. Interoperability is the lever.",
    },
    {
      slug: "first-90-days",
      title: "The First 90 Days as a New DevRel Lead",
      date: "October 2, 2025",
      readTime: "11 min",
      tags: ["devrel", "leadership", "community"],
      excerpt: "Whether you're the first DevRel, joining a new team, or taking over an existing one — these are the first actions I take.",
    },
    {
      slug: "community-bubble",
      title: "Don't Build Community in a Bubble",
      date: "August 19, 2025",
      readTime: "5 min",
      tags: ["community", "devrel"],
      excerpt: "Community is hard. It just is. There. I said it. Why would you ever make it harder by building yours in a bubble?",
    },
    {
      slug: "giving-someone-elses-talk",
      title: "On Giving Someone Else's Talk",
      date: "June 28, 2025",
      readTime: "4 min",
      tags: ["speaking", "community"],
      excerpt: "Preparing a talk is daunting. Giving someone else's talk takes that to a whole new level.",
    },
  ],

  // Long-form content for the article view.
  featuredPostBody: [
    { kind: "lede", text: "DevRel is a practice. It is a discipline. It is the part of your company that, when done well, builds the kind of trust with developers that no amount of paid acquisition will ever buy you." },
    { kind: "p", text: "But here is the uncomfortable part: it is also a bottom-line function. It can — and should — show up in pipeline, in retention, in product feedback loops, in hiring. The discomfort comes from the fact that we have spent a decade arguing it shouldn't have to prove that. We were wrong." },
    { kind: "h2", text: "The shift" },
    { kind: "p", text: "For most of the last ten years, DevRel teams have lived in a strange middle: not Marketing, not Product, not Engineering, but answering to all three depending on the week. That is changing. Companies have stopped asking what DevRel is and started asking what it returns." },
    { kind: "pullquote", text: "If you can't draw a line from a community moment to a business outcome, someone else will draw it for you — and you won't like the line they draw." },
    { kind: "p", text: "The good news: the line is real. The bad news: drawing it requires the one thing most DevRel folks resist — measurement." },
    { kind: "h2", text: "What to actually measure" },
    { kind: "p", text: "I divide DevRel metrics into three buckets, and I'd argue this works whether you're a team of one or a team of thirty:" },
    { kind: "list", items: [
      "Reach — who knows you exist and how that's trending",
      "Resonance — who's engaging, returning, and doing the work for you",
      "Revenue-adjacent signals — accounts touched by community before they showed up in pipeline",
    ]},
    { kind: "p", text: "The third bucket is the one most teams are missing. It is also the one that quietly justifies your headcount in every reorg conversation." },
    { kind: "h2", text: "Stop apologizing for the work" },
    { kind: "p", text: "I have watched too many DevRel leads frame their value defensively — as if the existence of the function were a favor a CFO might withdraw. Don't. The community you are building is real. The trust is real. The revenue impact is real. Measure it. Show it. Repeat." },
  ],

  talks: [
    { date: "May 2026", title: "Confessions of an ADHD-fueled Technologist 🐿️", event: "DevRelCon London", type: "Keynote" },
    { date: "Mar 2026", title: "Writing the AI Section of Your CONTRIBUTING.md", event: "FOSDEM 2026", type: "Talk" },
    { date: "Feb 2026", title: "DevEx Is Central to DevOps Success", event: "State of Open Con", type: "Talk" },
    { date: "Nov 2025", title: "High-Performing Engineering Teams and the Holy Grail", event: "All Day DevOps", type: "Talk" },
    { date: "Sep 2025", title: "Streamlining DevEx: CI/CD Standardization", event: "DevOpsDays KC", type: "Talk" },
    { date: "Jul 2025", title: "Mentorship, or How to Rebuild Civilisation From Scratch", event: "DevOpsDays Tel Aviv", type: "Keynote" },
    { date: "Apr 2025", title: "What Even Is DevRel in 2025?", event: "DevRelCon SF", type: "Panel" },
    { date: "Feb 2025", title: "The Metrics Conversation", event: "DevRelX Summit", type: "Talk" },
  ],

  reading: [
    { title: "The Staff Engineer's Path", author: "Tanya Reilly", state: "Reading" },
    { title: "Working in Public", author: "Nadia Eghbal", state: "Reading" },
    { title: "Building a Second Brain", author: "Tiago Forte", state: "Finished" },
    { title: "Team Topologies", author: "Skelton & Pais", state: "Finished" },
    { title: "Accelerate", author: "Forsgren, Humble & Kim", state: "Finished" },
    { title: "Crucial Conversations", author: "Patterson et al.", state: "Re-reading" },
  ],

  coffee: [
    { roaster: "Messenger Coffee", origin: "Yirgacheffe, Ethiopia", method: "V60", note: "Bright, jasmine, lemon zest" },
    { roaster: "Onyx", origin: "Geisha, Panama", method: "Aeropress", note: "Splurge. Worth it." },
    { roaster: "Thou Mayest", origin: "Honduras", method: "Chemex", note: "Daily driver" },
    { roaster: "PT's Coffee", origin: "House Blend", method: "Espresso", note: "Local KC love" },
  ],
};
