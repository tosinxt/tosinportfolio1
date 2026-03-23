import {
  PROJECT_COUNT,
  primarySequence,
  secondarySequence,
} from "../data/projects";

const SHARE_ICON = `<span class="share-icon"><svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.337 7.845l-7.173 7.173-1.178-1.179 7.172-7.172H5.837V5h9.166v9.167h-1.666V7.845z" fill="#777"/></svg></span>`;

function createLine(side) {
  const wrap = document.createElement("span");
  wrap.className = `home__projects__line ${side}`;
  const inner = document.createElement("span");
  wrap.appendChild(inner);
  return wrap;
}

/**
 * @param {import('../data/projects').ProjectStep} step
 */
function createProject(step) {
  const row = document.createElement("div");
  row.className =
    "home__projects__project" + (step.rowClass ? ` ${step.rowClass}` : "");

  const labelWrap = document.createElement("div");
  labelWrap.className = "home__projects__project__label";
  const labelInner = document.createElement("div");
  labelInner.className = step.featured ? "label__inner label-1" : "label__inner";

  if (step.featured && step.featuredSubtitle) {
    const p1 = document.createElement("p");
    p1.innerHTML = `FEATURED <br /> PROJECTS (${PROJECT_COUNT})`;
    const p2 = document.createElement("p");
    p2.innerHTML = step.featuredSubtitle;
    labelInner.append(p1, p2);
  } else {
    const p = document.createElement("p");
    p.innerHTML = step.labelHtml;
    labelInner.appendChild(p);
  }
  labelWrap.appendChild(labelInner);
  row.appendChild(labelWrap);

  const titleLink = document.createElement("a");
  titleLink.href = step.url;
  titleLink.target = "_blank";
  titleLink.rel = "noopener noreferrer";
  titleLink.className = "home__projects__project__link";

  const h1 = document.createElement("h1");
  h1.className = "home__projects__project__title";
  h1.dataset.scroll = "";
  h1.dataset.scrollDirection = "horizontal";
  h1.dataset.scrollSpeed = step.scrollSpeed;

  const inlineOvh = document.createElement("span");
  inlineOvh.className = "inline-ovh";
  const titleMain = document.createElement("div");
  titleMain.className = `title__main ${step.titleMain}`;

  const slideUp = document.createElement("span");
  slideUp.className = "slide-up";
  slideUp.dataset.content = step.title;
  slideUp.setAttribute("aria-hidden", "true");

  titleMain.append(slideUp, document.createTextNode(step.title));
  inlineOvh.appendChild(titleMain);
  h1.appendChild(inlineOvh);
  titleLink.appendChild(h1);
  row.appendChild(titleLink);

  const projectLink = document.createElement("div");
  projectLink.className = "project__link";
  const cta = document.createElement("a");
  cta.href = step.url;
  cta.target = "_blank";
  cta.rel = "noopener noreferrer";
  cta.className = "c-button";
  cta.innerHTML = `<span class="c-link"><span class="c-link__inner"><span>${step.cta} ${SHARE_ICON}</span></span></span>`;
  projectLink.appendChild(cta);
  row.appendChild(projectLink);

  return row;
}

/**
 * @param {(import('../data/projects').LineStep | import('../data/projects').ProjectStep)[]} sequence
 */
function renderSequence(container, sequence) {
  sequence.forEach((item) => {
    if (item.type === "line") {
      container.appendChild(createLine(item.side));
    } else {
      container.appendChild(createProject(item));
    }
  });
}

export function renderPortfolioProjects() {
  const primary = document.getElementById("js-projects-primary");
  const secondary = document.getElementById("js-projects-secondary");
  if (!primary || !secondary) return;
  renderSequence(primary, primarySequence);
  renderSequence(secondary, secondarySequence);
}
