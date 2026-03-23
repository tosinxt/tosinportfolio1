/** @typedef {{ type: 'line', side: 'left' | 'right' }} LineStep */
/** @typedef {{
 *   type: 'project',
 *   featured?: boolean,
 *   featuredSubtitle?: string,
 *   url: string,
 *   labelHtml: string,
 *   title: string,
 *   titleMain: 'left' | 'right',
 *   scrollSpeed: string,
 *   rowClass?: '' | 'right',
 *   cta: 'Visit Site' | 'View Project',
 * }} ProjectStep */

/** @type {ProjectStep[]} */
const primaryProjects = [
  {
    type: "project",
    featured: true,
    featuredSubtitle:
      "FULL-STACK DEVELOPMENT / <br /> E-COMMERCE / PAYMENT INTEGRATION",
    url: "https://themanorrestaurant.org/",
    labelHtml: "",
    title: "The Manor Restaurant — COMPREHENSIVE RESTAURANT MANAGEMENT",
    titleMain: "right",
    scrollSpeed: "8",
    rowClass: "",
    cta: "Visit Site",
  },
  {
    type: "project",
    url: "https://paystack-terminal.netlify.app/terminal/4",
    labelHtml: "UI DEVELOPMENT / <br /> PRODUCT ENGINEERING",
    title: "PAYSTACK TERMINAL — MORE THAN A POS",
    titleMain: "left",
    scrollSpeed: "-8",
    rowClass: "",
    cta: "Visit Site",
  },
  {
    type: "project",
    url: "https://2022.madebynull.com/",
    labelHtml: "ART DIRECTION / <br /> CREATIVE DEVELOPMENT",
    title: "STUDIO NULL — RADIO NULL REWIND 2022",
    titleMain: "right",
    scrollSpeed: "10",
    rowClass: "right",
    cta: "Visit Site",
  },
  {
    type: "project",
    url: "https://fayemi.design/",
    labelHtml: "3D EXPLORATION / <br /> CREATIVE DEVELOPMENT",
    title: "GRP 256 — FOLIO FOR VISUAL DESIGNER",
    titleMain: "left",
    scrollSpeed: "-8",
    rowClass: "right",
    cta: "Visit Site",
  },
  {
    type: "project",
    url: "https://nbu-web.webxiel.com",
    labelHtml: "EDUCATION / <br /> SCHOOL MANAGEMENT",
    title: "NIGERIAN BRITISH UNIVERSITY — SCHOOL MANAGEMENT SYSTEM",
    titleMain: "left",
    scrollSpeed: "-8",
    rowClass: "",
    cta: "View Project",
  },
  {
    type: "project",
    url: "https://doyenacademy.com.ng/",
    labelHtml: "EDUCATION / <br /> LEARNING MANAGEMENT",
    title: "DOYEN ACADEMY — LEARNING MANAGEMENT SYSTEM",
    titleMain: "right",
    scrollSpeed: "10",
    rowClass: "",
    cta: "View Project",
  },
  {
    type: "project",
    url: "https://memoraapp.co",
    labelHtml: "SOCIAL MEDIA / <br /> REAL-TIME PLATFORM",
    title: "MEMORA — NEXT-GEN SOCIAL PLATFORM",
    titleMain: "left",
    scrollSpeed: "8",
    rowClass: "right",
    cta: "View Project",
  },
  {
    type: "project",
    url: "https://hustlrs.ng/",
    labelHtml: "MARKETPLACE / <br /> TASK AUCTION PLATFORM",
    title: "HUSTLRS — TASK AUCTION PLATFORM",
    titleMain: "right",
    scrollSpeed: "-8",
    rowClass: "",
    cta: "View Project",
  },
  {
    type: "project",
    url: "https://pictoshot.io",
    labelHtml: "BLOCKCHAIN / <br /> NFT MARKETPLACE",
    title: "PICTOSHOT — NFT MARKETPLACE",
    titleMain: "left",
    scrollSpeed: "8",
    rowClass: "right",
    cta: "View Project",
  },
  {
    type: "project",
    url: "https://zypherassets.com",
    labelHtml: "FINANCE / <br /> INVESTMENT PLATFORM",
    title: "ZYPHER ASSETS — INVESTMENT PLATFORM",
    titleMain: "right",
    scrollSpeed: "-8",
    rowClass: "",
    cta: "View Project",
  },
];

/** @type {ProjectStep[]} */
const secondaryProjects = [
  {
    type: "project",
    url: "https://paystack-terminal.netlify.app/terminal/4",
    labelHtml: "GAME (WEB) / <br /> CREATIVE DEVELOPMENT",
    title: "TERMINAL DASH — WEB-BASED GAME",
    titleMain: "right",
    scrollSpeed: "-8",
    rowClass: "",
    cta: "Visit Site",
  },
  {
    type: "project",
    url: "https://toe-portfolio.netlify.app/",
    labelHtml: "CREATIVE DEVELOPMENT / <br /> PORTFOLIO EXPLORATION",
    title: "Toe arts — portfolio for s.owonte",
    titleMain: "left",
    scrollSpeed: "8",
    rowClass: "",
    cta: "Visit Site",
  },
  {
    type: "project",
    url: "https://kortyeo.madebynull.com/",
    labelHtml: "ART DIRECTION / <br /> CREATIVE DEVELOPMENT",
    title: "KORTY EO — A FANSITE FOR KORTY",
    titleMain: "right",
    scrollSpeed: "-8",
    rowClass: "",
    cta: "Visit Site",
  },
];

/**
 * Matches original markup: line left, (project + line right/left)*, closing line left.
 * @param {ProjectStep[]} projects
 */
function buildPrimarySequence(projects) {
  /** @type {(LineStep | ProjectStep)[]} */
  const out = [{ type: "line", side: "left" }];
  for (let i = 0; i < projects.length; i++) {
    out.push(projects[i]);
    if (i === projects.length - 1) {
      out.push({ type: "line", side: "left" });
    } else {
      out.push({ type: "line", side: i % 2 === 0 ? "right" : "left" });
    }
  }
  return out;
}

/**
 * Matches original: opening line right, then alternating, closing line left.
 * @param {ProjectStep[]} projects
 */
function buildSecondarySequence(projects) {
  /** @type {(LineStep | ProjectStep)[]} */
  const out = [{ type: "line", side: "right" }];
  for (let i = 0; i < projects.length; i++) {
    out.push(projects[i]);
    if (i === projects.length - 1) {
      out.push({ type: "line", side: "left" });
    } else {
      out.push({ type: "line", side: i % 2 === 0 ? "left" : "right" });
    }
  }
  return out;
}

export const PROJECT_COUNT = primaryProjects.length + secondaryProjects.length;

/** @type {(LineStep | ProjectStep)[]} */
export const primarySequence = buildPrimarySequence(primaryProjects);

/** @type {(LineStep | ProjectStep)[]} */
export const secondarySequence = buildSecondarySequence(secondaryProjects);
