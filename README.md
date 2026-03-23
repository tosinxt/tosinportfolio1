### Updating projects

Featured work is driven by [`src/data/projects.js`](src/data/projects.js) (`primaryProjects` and `secondaryProjects`). The page count in the “FEATURED PROJECTS (N)” label is computed from the combined length. After editing, run `npm run dev` to preview.

### Blog (`/blog`)

Posts are Markdown files in [`src/content/blog/`](src/content/blog/). Each file needs YAML frontmatter:

- **`title`** (required) — post headline  
- **`date`** (required) — `YYYY-MM-DD` (used for sorting and display)  
- **`description`** (optional) — excerpt on the listing page; otherwise a short snippet is taken from the body  
- **`slug`** (optional) — URL segment under `/blog/`; defaults to the filename without `.md`

`npm run dev` and `npm run build` run [`scripts/build-blog.mjs`](scripts/build-blog.mjs) first, which generates [`src/blog/index.html`](src/blog/index.html) and `src/blog/<slug>/index.html` from [`src/blog/_layout.html`](src/blog/_layout.html). Edit the Markdown only; do not hand-edit the generated HTML.

Blog pages load [`src/js/blog.js`](src/js/blog.js) (GSAP + ScrollTrigger, no smooth-scroll): an intro sequence similar to the portfolio (header slide-down, horizontal rule scale, title rise) plus scroll-triggered fades for extra list items, post body, the pre-footer rule, and footer. **`prefers-reduced-motion: reduce`** disables motion and shows lines immediately.

### SEO

- **Homepage** ([`src/index.html`](src/index.html)): canonical URL, Open Graph, Twitter cards, `robots` / `author`, JSON-LD (`WebSite` + `Person`).
- **Blog** ([`src/blog/_layout.html`](src/blog/_layout.html) + [`scripts/build-blog.mjs`](scripts/build-blog.mjs)): per-page title/description/canonical, `og:type` (`website` on the index, `article` on posts), `article:published_time` / `modified_time` on posts, Twitter + `og:image` (default `https://tosinxt.com/profile.jpg`), JSON-LD (`Blog` or `BlogPosting`).
- **Crawl files**: [`src/public/robots.txt`](src/public/robots.txt) allows indexing and points to the sitemap. **`src/public/sitemap.xml`** is generated whenever the blog script runs (same command as dev/build), listing `/`, `/blog/`, and each post URL.

Ensure **`https://tosinxt.com/profile.jpg`** (and **`favicon.ico`**) resolve on production so previews and rich results work.

### Showing up on Google

Google does not index new sites instantly. Typical steps:

1. **Deploy** the site so `https://tosinxt.com/` and `https://tosinxt.com/sitemap.xml` return **200** publicly.
2. Open **[Google Search Console](https://search.google.com/search-console)** → add a **property** for `https://tosinxt.com` (URL-prefix or domain verification per Google’s instructions).
3. Under **Sitemaps**, submit **`https://tosinxt.com/sitemap.xml`**.
4. Use **URL inspection** → enter your homepage URL → **Request indexing** for important URLs (homepage, blog index, new posts).
5. Wait **days to a few weeks** for pages to appear for queries like `site:tosinxt.com` or your name; publishing content and **links from LinkedIn/GitHub** helps discovery.

Searching **`site:tosinxt.com`** in Google shows pages Google has indexed from your domain (empty until indexing completes).

### To kickstart the boilerplate, run the following commands:

```bash
yarn

yarn dev
```

### If you do not have yarn installed, delete the `yarn.lock` file and install via npm,

```bash
npm install

npm run dev
```

### Or install yarn:

```bash
npm install --global yarn
```
