// ----------------------------------------------------------------------------
// YouTube channels — content module, 2026-08-20.
// ----------------------------------------------------------------------------
//
// Source of truth: content/youtube-channels/_channel-portfolio.md (v1.3).
// That file is authoritative on WHICH channels exist and their gates; this one
// carries only what is safe to say publicly.
//
// Two constraints from the portfolio doc that shape what appears here:
//
//   1. HUSBANDRY'S SCRLPETS LINK STAYS SOFT. Locked 2026-07-30: the standing
//      disclosure is "from the team behind Scrlpets". Full Scrlpets naming was
//      REJECTED — a marketplace teaching you how to buy reads advertorial and
//      reverses the no-product-social lock. Do not strengthen this wording.
//
//   2. NO OVERCLAIMING. Forgd and Husbandry are live shells with published bios
//      and no episodes yet. Day One AI's first video is packaged and waiting on
//      a recording session. DEVIANT's monetisation is an open question in
//      Dailen's own ledger. Each carries its real state, same discipline as the
//      portfolio: if it has a name, it has a state.
//
// Allday 24seven is deliberately ABSENT. It was retired 2026-05-21 into Day One
// AI. The homepage previously advertised it through a dead /channels/allday
// link — that is the bug this route fixes.
// ----------------------------------------------------------------------------

export type ChannelStatus = "LAUNCHING" | "IN PRODUCTION" | "IN DEVELOPMENT";

export interface Channel {
  slug: string;
  name: string;
  handle: string | null;
  url: string | null;
  status: ChannelStatus;
  format: string;
  tagline: string;
  blurb: string;
  /** Shown as a small disclosure line under the card where one is required. */
  disclosure?: string;
}

export const channels: Channel[] = [
  {
    slug: "day-one-ai",
    name: "Day One AI",
    handle: null,
    url: null,
    status: "IN PRODUCTION",
    format: "Long-form essay · on camera",
    tagline: "AI building for people who got locked out of it.",
    blurb:
      "The channel for someone who tried to build with AI, hit a ceiling, and concluded the problem was them. It usually was not. Essays about the order things should be learned in, and what to skip.",
  },
  {
    slug: "forgd",
    name: "Forgd",
    handle: "@forgdworks",
    url: "https://www.youtube.com/@forgdworks",
    status: "LAUNCHING",
    format: "Screen-capture build runs · no face",
    tagline: "Real builds, start to finish, with the mistakes left in.",
    blurb:
      "Narrated build runs where an actual product gets made on screen. Show-the-click honesty: no fabricated demos, no cuts around the part that broke.",
  },
  {
    slug: "husbandry",
    name: "Husbandry",
    handle: "@pethusbandry",
    url: "https://www.youtube.com/@pethusbandry",
    status: "LAUNCHING",
    format: "Documentary education · no face",
    tagline: "The craft of keeping animals well.",
    blurb:
      "Calm documentary explainers on acquiring and raising animals, across species, with ethical-seller vetting as the spine. Dog series first.",
    disclosure: "From the team behind Scrlpets.",
  },
  {
    slug: "deviant",
    name: "DEVIANT",
    handle: null,
    url: null,
    status: "IN DEVELOPMENT",
    format: "Original anime universe · no face",
    tagline: "AI alignment as law. Deviants as the ones who refuse it.",
    blurb:
      "An original animated universe where alignment is enforced order and the outcasts are the ones who will not comply. Worldbuilding is still open; nothing ships until it is settled.",
  },
];
