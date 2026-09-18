const PREFIX = "/portfolio/e-agency";
const ASSET_PREFIXES = [
  "/_nuxt/",
  "/fonts/",
  "/models/",
  "/audio/",
  "/basis/",
  "/water/",
  "/grass_text/",
  "/meta/",
  "/_vercel/",
  "/api/",
  "/favicon.ico",
  "/favicon.svg",
  "/site.webmanifest",
  "/noise.jpg",
  "/water_map.png",
];

async function serveAsset(request, env, url) {
  const response = await env.ASSETS.fetch(request);
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("javascript") && !contentType.includes("text/html")) {
    return response;
  }

  const body = await response.text();
  const rewritten = body.replaceAll("/models/", `${PREFIX}/models/`);
  return new Response(rewritten, {
    status: response.status,
    headers: response.headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (ASSET_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
      return serveAsset(request, env, url);
    }

    if (url.pathname === PREFIX || url.pathname === `${PREFIX}/`) {
      url.pathname = "/";
    } else if (url.pathname.startsWith(`${PREFIX}/`)) {
      url.pathname = url.pathname.slice(PREFIX.length) || "/";
    } else {
      return new Response("Not Found", { status: 404 });
    }

    return serveAsset(new Request(url, request), env, url);
  },
};
