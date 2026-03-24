import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function animateDividerLines() {
  gsap.utils
    .toArray(".blog-page__line:not(.blog-page__line--intro)")
    .forEach((el) => {
      const inner = el.querySelector(":scope > span");
      if (!inner) return;
      gsap.set(el, { autoAlpha: 1 });
      gsap.from(inner, {
        duration: 1.35,
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none none",
        },
        scaleX: 0,
        transformOrigin: el.classList.contains("blog-page__line--right")
          ? "right top"
          : "left top",
        ease: "power2.out",
      });
    });
}

function footerReveal() {
  const footer = document.querySelector(".blog-page__footer");
  if (!footer) return;
  gsap.from(footer, {
    scrollTrigger: {
      trigger: footer,
      start: "top 96%",
      toggleActions: "play none none none",
    },
    duration: 1.2,
    yPercent: 45,
    opacity: 0,
    ease: "power4.out",
  });
}

function init() {
  if (prefersReducedMotion) {
    gsap.set(".blog-page__line", { autoAlpha: 1 });
    return;
  }

  const ease = "power4.out";
  const tl = gsap.timeline({ defaults: { ease } });

  tl.from(".blog-page__header", {
    duration: 0.55,
    delay: 0.1,
    opacity: 0,
    yPercent: -100,
  });

  const introLine = document.querySelector(".blog-page__line--intro");
  if (introLine) {
    const inner = introLine.querySelector(":scope > span");
    if (inner) {
      gsap.set(introLine, { autoAlpha: 1 });
      tl.from(
        inner,
        {
          duration: 1.2,
          scaleX: 0,
          transformOrigin: "left top",
          ease: "power2.out",
        },
        "-=0.2"
      );
    }
  }

  tl.from(
    ".blog-page__list-title, .blog-page__intro, .blog-article__header, .blog-index__empty",
    {
      duration: 0.9,
      yPercent: 80,
      opacity: 0,
      stagger: 0.06,
    },
    "-=0.45"
  );

  const listItems = gsap.utils.toArray(".blog-index__item");
  if (listItems.length) {
    const first = listItems.slice(0, 3);
    const rest = listItems.slice(3);
    if (first.length) {
      tl.fromTo(
        first,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease,
          immediateRender: false,
        },
        "-=0.35"
      );
    }
    rest.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease,
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 91%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }

  const isPost = Boolean(
    document.querySelector(".blog-article__body") &&
      !document.querySelector(".blog-index__list")
  );
  if (isPost) {
    const body = document.querySelector(".blog-article__body");
    const back = document.querySelector(".blog-article__back");
    if (body) {
      gsap.from(body, {
        scrollTrigger: {
          trigger: body,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        duration: 1.15,
        yPercent: 32,
        opacity: 0,
        ease,
      });
    }
    if (back) {
      gsap.from(back, {
        scrollTrigger: {
          trigger: back,
          start: "top 94%",
          toggleActions: "play none none none",
        },
        duration: 1,
        yPercent: 35,
        opacity: 0,
        ease,
      });
    }
  }

  animateDividerLines();
  footerReveal();

  requestAnimationFrame(() => ScrollTrigger.refresh());
}

init();

window.addEventListener("load", () => ScrollTrigger.refresh());
