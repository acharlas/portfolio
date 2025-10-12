export const CONTACT_API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT ||
  "https://portfolio-backend-three-umber.vercel.app/api/send-email";

export const CONTACT_MOBILE_BREAKPOINT = 768;

export const CONTACT_RATE_LIMIT_MS = 30_000;

export const OBSERVABILITY_ENDPOINT =
  process.env.NEXT_PUBLIC_OBSERVABILITY_ENDPOINT || "";
