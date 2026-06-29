/** GitHub Pages subpath; empty string for localhost and root deployments. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const routes = {
  home: "/",
  projects: "/projects",
  work: "/work",
  resume: "/resume",
  contact: "/contact",
  philosophy: "/philosophy",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

export function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  );
}

/** True for in-app routes (not external URLs or static asset paths). */
export function isAppRoute(href: string): boolean {
  if (!href.startsWith("/") || isExternalHref(href)) return false;
  const path = href.split(/[?#]/)[0];
  return Object.values(routes).some(
    (route) => path === route || path === `${route}/`
  );
}

/** Prefix a static asset or plain-anchor path with the deployment base path. */
export function withBasePath(path: string): string {
  if (!path.startsWith("/") || !basePath) return path;
  return `${basePath}${path}`;
}
