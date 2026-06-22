// Build-time prerenderer. Runs after `vite build` (client) and
// `vite build --config vite.config.ssr.js` (server). For each route it
// renders the React tree to static markup, bakes it (plus correct per-route
// <title>/canonical/description) into the client index.html template, and
// writes a real .html file. On GitHub Pages `/privacy` then resolves to
// `privacy.html` with HTTP 200 instead of falling through to 404.html.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ssrEntry = resolve(root, "dist-ssr/entry-server.mjs");

const ORIGIN = "https://sixseeds.org";

// One source of truth for which routes get a static file + their SEO head.
// `file` is relative to dist/. "/" overwrites the root index.html.
const ROUTES = [
  {
    path: "/",
    file: "index.html",
    title: "Six Seeds | Growth Between Sundays",
    description:
      "Turn your Sunday sermon into a week of daily devotions. Six Seeds keeps your congregation rooted in your voice and your lens on Scripture, all week long.",
  },
  {
    path: "/about",
    file: "about.html",
    title: "About | Six Seeds",
    description:
      "Learn about Six Seeds and the team building tools that turn Sunday sermons into a week of daily devotions.",
  },
  {
    path: "/inquire",
    file: "inquire.html",
    title: "Inquire | Six Seeds",
    description:
      "Bring Six Seeds to your church. Get in touch to learn how sermon-driven daily devotions work for your congregation.",
  },
  {
    path: "/privacy",
    file: "privacy.html",
    title: "Privacy Policy | Six Seeds",
    description:
      "Read the Six Seeds privacy policy to learn how we collect, use, and protect your information.",
  },
  {
    path: "/terms",
    file: "terms.html",
    title: "Terms &amp; Conditions | Six Seeds",
    description:
      "Read the Six Seeds terms and conditions governing use of our platform and applications.",
  },
  {
    path: "/tools/delete-account",
    file: "tools/delete-account.html",
    title: "Account Deletion | Six Seeds",
    description:
      "How to delete your Six Seeds account and what happens to your personal data when you do.",
  },
];

const { render } = await import(pathToFileURL(ssrEntry).href);

const template = readFileSync(resolve(dist, "index.html"), "utf-8");

const ROOT_MARKER = '<div id="root"></div>';
if (!template.includes(ROOT_MARKER)) {
  throw new Error(`prerender: could not find ${ROOT_MARKER} in dist/index.html`);
}

const escAttr = (s) => s.replace(/"/g, "&quot;");

for (const route of ROUTES) {
  const canonical = ORIGIN + (route.path === "/" ? "/" : route.path);
  const appHtml = render(route.path);

  let html = template;

  // Per-route <title> + canonical + description, injected at the title tag.
  const head = [
    `<title>${route.title}</title>`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="description" content="${escAttr(route.description)}" />`,
  ].join("\n        ");
  html = html.replace(/<title>[\s\S]*?<\/title>/, head);

  // Point og:url at the canonical URL for this page (home keeps the apex).
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonical}" />`,
  );

  // Bake the rendered markup into #root.
  html = html.replace(ROOT_MARKER, `<div id="root">${appHtml}</div>`);

  const outPath = resolve(dist, route.file);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`prerendered ${route.path} -> dist/${route.file}`);
}

// The server bundle is only needed during prerender; keep it out of the
// deployed artifact.
rmSync(resolve(root, "dist-ssr"), { recursive: true, force: true });
console.log("prerender: done");
