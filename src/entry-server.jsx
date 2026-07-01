import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";

// Rendered at build time by scripts/prerender.mjs to bake each route's
// markup into a static index.html. The client (src/main.jsx) does a fresh
// createRoot().render() over this markup, so no hydration is required.
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );
}
