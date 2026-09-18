const PREFIX = "/portfolio/e-agency";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === PREFIX || url.pathname === `${PREFIX}/`) {
      url.pathname = "/";
    } else if (url.pathname.startsWith(`${PREFIX}/`)) {
      url.pathname = url.pathname.slice(PREFIX.length) || "/";
    } else {
      return new Response("Not Found", { status: 404 });
    }

    return env.ASSETS.fetch(new Request(url, request));
  },
};
