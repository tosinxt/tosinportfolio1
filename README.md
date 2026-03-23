### Updating projects

Featured work is driven by [`src/data/projects.js`](src/data/projects.js) (`primaryProjects` and `secondaryProjects`). The page count in the “FEATURED PROJECTS (N)” label is computed from the combined length. After editing, run `npm run dev` to preview.

### Blog (`/blog`)

Posts are Markdown files in [`src/content/blog/`](src/content/blog/). Each file needs YAML frontmatter:

- **`title`** (required) — post headline  
- **`date`** (required) — `YYYY-MM-DD` (used for sorting and display)  
- **`description`** (optional) — excerpt on the listing page; otherwise a short snippet is taken from the body  
- **`slug`** (optional) — URL segment under `/blog/`; defaults to the filename without `.md`

`npm run dev` and `npm run build` run [`scripts/build-blog.mjs`](scripts/build-blog.mjs) first, which generates [`src/blog/index.html`](src/blog/index.html) and `src/blog/<slug>/index.html` from [`src/blog/_layout.html`](src/blog/_layout.html). Edit the Markdown only; do not hand-edit the generated HTML.

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
