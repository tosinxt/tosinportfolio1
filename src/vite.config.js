import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function collectBlogInputs() {
  const out = {};
  const blogRoot = path.join(__dirname, "blog");
  const blogIndex = path.join(blogRoot, "index.html");
  if (fs.existsSync(blogIndex)) {
    out.blog = blogIndex;
  }
  if (!fs.existsSync(blogRoot)) {
    return out;
  }
  for (const ent of fs.readdirSync(blogRoot, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    const idx = path.join(blogRoot, ent.name, "index.html");
    if (fs.existsSync(idx)) {
      const key = `blog_${ent.name.replace(/[^a-zA-Z0-9]/g, "_")}`;
      out[key] = idx;
    }
  }
  return out;
}

export default {
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        ...collectBlogInputs(),
      },
    },
  },
  envDir: "../",
};
