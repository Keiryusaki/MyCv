const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const inferredBasePath = process.env.GITHUB_ACTIONS === "true" && repoName ? `/${repoName}` : "";
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? inferredBasePath;

export const basePath = rawBasePath.endsWith("/") ? rawBasePath.slice(0, -1) : rawBasePath;

export function withBasePath(path: string) {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
