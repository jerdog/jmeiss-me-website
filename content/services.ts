/** "What I actually do" services strip on the home page. */

export interface Service {
  number: string;
  title: string;
  body: string;
  /** Optional CTA link (e.g. mailto, contact form). */
  href?: string;
}

export const services: Service[] = [
  {
    number: "01",
    title: "Build DevRel programs",
    body: "From scratch or from chaos. Team design, motion plans, measurement, the works.",
  },
  {
    number: "02",
    title: "Speak at your event",
    body: "Keynotes, panels, fireside chats. DevRel, DevEx, community, ADHD-fueled tangents.",
    href: "/speaking",
  },
  {
    number: "03",
    title: "Advise & coach",
    body: "For early-stage teams or first-time DevRel leads. Office hours by the half-day.",
  },
];
