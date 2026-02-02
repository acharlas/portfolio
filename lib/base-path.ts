const ENV_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;
const FALLBACK_BASE_PATH =
  process.env.NODE_ENV === "production" ? "/portfolio" : "";

const normalizeBasePath = (value: string) => {
  if (!value || value === "/") return "";
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.replace(/\/$/, "");
};

export const BASE_PATH = normalizeBasePath(
  ENV_BASE_PATH ?? FALLBACK_BASE_PATH
);

export const ASSET_PREFIX = BASE_PATH ? `${BASE_PATH}/` : "";

const normalizePath = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;

export const withBasePath = (path: string) => {
  const normalized = normalizePath(path);
  return BASE_PATH ? `${BASE_PATH}${normalized}` : normalized;
};
