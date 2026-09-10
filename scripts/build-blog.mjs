import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");
const CONTENT_DIR = path.join(SRC, "content", "blog");
const BLOG_DIR = path.join(SRC, "blog");
const LAYOUT_PATH = path.join(BLOG_DIR, "_layout.html");
const SITE_ORIGIN = "https://tosinxt.com";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/profile.jpg`;
const PUBLIC_DIR = path.join(SRC, "public");

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

function toDateKey(raw) {
  if (raw instanceof Date && !Number.isNaN(raw.getTime())) {
    return raw.toISOString().slice(0, 10);
  }
  if (typeof raw === "string" && raw.trim()) {
    const d = new Date(raw);
    if (!Number.isNaN(d.getTime())) {
      return d.toISOString().slice(0, 10);
    }
    return raw.trim();
  }
  return new Date(0).toISOString().slice(0, 10);
}

function toSortTime(raw) {
  if (raw instanceof Date && !Number.isNaN(raw.getTime())) {
    return raw.getTime();
  }
  if (typeof raw === "string" && raw.trim()) {
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? 0 : d.getTime();
  }
  return 0;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeJsonLd(obj) {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

function writeSitemap(posts) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const lastmodHome = new Date().toISOString().slice(0, 10);
  const urlRows = [
    `  <url>
    <loc>${SITE_ORIGIN}/</loc>
    <lastmod>${lastmodHome}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
    `  <url>
    <loc>${SITE_ORIGIN}/blog/</loc>
    <lastmod>${lastmodHome}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`,
    `  <url>
    <loc>${SITE_ORIGIN}/about/</loc>
    <lastmod>${lastmodHome}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    ...posts.map(
      (p) => `  <url>
    <loc>${SITE_ORIGIN}/blog/${encodeURIComponent(p.slug)}/</loc>
    <lastmod>${p.dateStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    ),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlRows.join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml, "utf8");
}

function cleanGeneratedBlog() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    return;
  }
  for (const ent of fs.readdirSync(BLOG_DIR, { withFileTypes: true })) {
    const full = path.join(BLOG_DIR, ent.name);
    if (ent.isDirectory()) {
      fs.rmSync(full, { recursive: true, force: true });
    } else if (ent.name === "index.html") {
      fs.unlinkSync(full);
    }
  }
}

function applyLayout(template, vars) {
  let out = template;
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{{${k}}}`).join(v);
  }
  return out;
}

function readLayout() {
  if (!fs.existsSync(LAYOUT_PATH)) {
    throw new Error(`Missing layout: ${LAYOUT_PATH}`);
  }
  return fs.readFileSync(LAYOUT_PATH, "utf8");
}

function loadPosts() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    return [];
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(CONTENT_DIR, f));

  const posts = [];

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const slug =
      (typeof data.slug === "string" && data.slug.trim()) ||
      path.basename(file, ".md");
    const title = data.title;
    if (!title) {
      console.warn(`[build-blog] Skip (no title): ${file}`);
      continue;
    }
    const sortTime = toSortTime(data.date);
    const dateStr = data.date != null ? toDateKey(data.date) : "";
    if (!dateStr || sortTime === 0) {
      console.warn(`[build-blog] Skip (missing or invalid date): ${file}`);
      continue;
    }
    const description =
      typeof data.description === "string" && data.description.trim()
        ? data.description.trim()
        : content.replace(/[#*`_[\]]/g, "").slice(0, 160).trim() + "…";
    const subtitle =
      typeof data.subtitle === "string" && data.subtitle.trim()
        ? data.subtitle.trim()
        : "";
    const tags = Array.isArray(data.tags)
      ? data.tags.map((t) => String(t).trim()).filter(Boolean)
      : [];
    const faqs = Array.isArray(data.faqs)
      ? data.faqs
          .map((f) => ({
            q: typeof f?.q === "string" ? f.q.trim() : "",
            a: typeof f?.a === "string" ? f.a.trim() : "",
          }))
          .filter((f) => f.q && f.a)
      : [];
    const relatedRaw = Array.isArray(data.related)
      ? data.related.map((s) => String(s).trim()).filter(Boolean)
      : [];
    const htmlBody = md.render(content);
    posts.push({
      slug,
      title,
      sortTime,
      dateStr,
      description,
      subtitle,
      tags,
      faqs,
      relatedRaw,
      htmlBody,
    });
  }

  posts.sort((a, b) => b.sortTime - a.sortTime);
  return posts;
}

function writePostPages(template, posts) {
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  for (const post of posts) {
    const dir = path.join(BLOG_DIR, post.slug);
    fs.mkdirSync(dir, { recursive: true });
    const canonical = `${SITE_ORIGIN}/blog/${post.slug}/`;
    const isoDate = `${post.dateStr}T12:00:00.000Z`;
    const articleMeta = `
    <meta property="article:published_time" content="${escapeHtml(isoDate)}" />
    <meta property="article:modified_time" content="${escapeHtml(isoDate)}" />`;
    const blogPostingLd = {
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      headline: post.title,
      alternativeHeadline: post.subtitle || undefined,
      description: post.description,
      keywords: post.tags?.length ? post.tags : undefined,
      datePublished: isoDate,
      dateModified: isoDate,
      url: canonical,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
      author: {
        "@type": "Person",
        name: "Oluwatosin Alli",
        url: `${SITE_ORIGIN}/`,
      },
      publisher: {
        "@type": "Person",
        name: "Oluwatosin Alli",
      },
      image: DEFAULT_OG_IMAGE,
    };
    const faqPageLd = post.faqs?.length
      ? {
          "@type": "FAQPage",
          "@id": `${canonical}#faq`,
          mainEntity: post.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }
      : null;
    const breadcrumbLd = {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_ORIGIN}/blog/` },
        { "@type": "ListItem", position: 3, name: post.title, item: canonical },
      ],
    };
    const jsonLd = safeJsonLd({
      "@context": "https://schema.org",
      "@graph": faqPageLd
        ? [blogPostingLd, faqPageLd, breadcrumbLd]
        : [blogPostingLd, breadcrumbLd],
    });
    const articleTags =
      post.tags?.length
        ? `\n${post.tags
            .slice(0, 8)
            .map((t) => `    <meta property="article:tag" content="${escapeHtml(t)}" />`)
            .join("\n")}`
        : "";
    const faqHtml = post.faqs?.length
      ? `
        <section class="blog-article__faq" aria-labelledby="faq-heading">
          <h2 id="faq-heading">Quick answers</h2>
          ${post.faqs
            .map(
              (f) => `
          <div class="blog-article__faq-item">
            <h3>${escapeHtml(f.q)}</h3>
            <p>${escapeHtml(f.a)}</p>
          </div>`
            )
            .join("")}
        </section>`
      : "";
    const relatedPosts = (post.relatedRaw || [])
      .map((s) => bySlug.get(s))
      .filter(Boolean);
    const relatedHtml = relatedPosts.length
      ? `
        <section class="blog-article__related" aria-labelledby="related-heading">
          <h2 id="related-heading">Related reading</h2>
          <ul>
            ${relatedPosts
              .map(
                (r) =>
                  `<li><a href="/blog/${encodeURIComponent(r.slug)}/">${escapeHtml(r.title)}</a></li>`
              )
              .join("")}
          </ul>
        </section>`
      : "";
    const breadcrumbHtml = `
      <nav class="blog-article__breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/blog/">Blog</a> / <span>${escapeHtml(post.title)}</span>
      </nav>`;
    const main = `
    <main class="blog-page__main">
      <article class="blog-article">
        ${breadcrumbHtml}
        <header class="blog-article__header">
          <h1 class="blog-article__title">${escapeHtml(post.title)}</h1>
          ${
            post.subtitle
              ? `<p class="blog-article__subtitle">${escapeHtml(post.subtitle)}</p>`
              : ""
          }
          <time class="blog-article__date" datetime="${escapeHtml(post.dateStr)}">${escapeHtml(post.dateStr)}</time>
          <p class="blog-article__lede">${escapeHtml(post.description)}</p>
        </header>
        <div class="blog-article__body">${post.htmlBody}</div>
        ${faqHtml}
        ${relatedHtml}
        <p class="blog-article__back"><a href="/blog/">← All posts</a></p>
      </article>
    </main>`;

    const html = applyLayout(template, {
      TITLE: escapeHtml(`${post.title} — Blog — Oluwatosin Alli`),
      DESCRIPTION: escapeHtml(post.description),
      CANONICAL: escapeHtml(canonical),
      OG_TYPE: "article",
      OG_IMAGE: escapeHtml(DEFAULT_OG_IMAGE),
      ARTICLE_META: articleMeta + articleTags,
      JSON_LD: jsonLd,
      STYLESHEET_HREF: "../../scss/blog.scss",
      SCRIPT_SRC: "../../js/blog.js",
      MAIN: main,
    });

    fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
  }
}

function writeIndex(template, posts) {
  const canonical = `${SITE_ORIGIN}/blog/`;
  const listDesc =
    "Writing from Oluwatosin Alli on engineering, building products, and technology.";
  const items = posts
    .map(
      (p) => `
      <li class="blog-index__item">
        <a class="blog-index__link" href="/blog/${encodeURI(p.slug)}/">${escapeHtml(p.title)}</a>
        <time class="blog-index__time" datetime="${escapeHtml(p.dateStr)}">${escapeHtml(p.dateStr)}</time>
        <p class="blog-index__excerpt">${escapeHtml(p.description)}</p>
      </li>`
    )
    .join("");

  const main =
    posts.length === 0
      ? `<main class="blog-page__main">
      <h1 class="blog-page__list-title">Blog</h1>
      <p class="blog-index__empty">No posts yet. Add Markdown files under <code>src/content/blog/</code>.</p>
    </main>`
      : `<main class="blog-page__main">
      <h1 class="blog-page__list-title">Blog</h1>
      <p class="blog-page__intro">${escapeHtml(listDesc)}</p>
      <ul class="blog-index__list">${items}</ul>
    </main>`;

  const jsonLd = safeJsonLd({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog — Oluwatosin Alli",
    description: listDesc,
    url: canonical,
    publisher: {
      "@type": "Person",
      name: "Oluwatosin Alli",
      url: `${SITE_ORIGIN}/`,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      alternativeHeadline: p.subtitle || undefined,
      url: `${SITE_ORIGIN}/blog/${p.slug}/`,
      datePublished: `${p.dateStr}T12:00:00.000Z`,
      keywords: p.tags?.length ? p.tags : undefined,
    })),
  });

  const html = applyLayout(template, {
    TITLE: escapeHtml("Blog — Oluwatosin Alli"),
    DESCRIPTION: escapeHtml(listDesc),
    CANONICAL: escapeHtml(canonical),
    OG_TYPE: "website",
    OG_IMAGE: escapeHtml(DEFAULT_OG_IMAGE),
    ARTICLE_META: "",
    JSON_LD: jsonLd,
    STYLESHEET_HREF: "../scss/blog.scss",
    SCRIPT_SRC: "../js/blog.js",
    MAIN: main,
  });

  fs.writeFileSync(path.join(BLOG_DIR, "index.html"), html, "utf8");
}

function main() {
  const template = readLayout();
  cleanGeneratedBlog();
  const posts = loadPosts();
  writeIndex(template, posts);
  writePostPages(template, posts);
  writeSitemap(posts);
  console.log(
    `[build-blog] Wrote blog index + ${posts.length} post page(s), sitemap.xml under src/public/`
  );
}

main();
