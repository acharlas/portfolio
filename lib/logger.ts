import { OBSERVABILITY_ENDPOINT } from "@/lib/config";

type LogLevel = "error" | "info";

interface LogClientErrorOptions {
  message: string;
  error?: unknown;
  context?: Record<string, unknown>;
}

function buildPayload(
  level: LogLevel,
  options: LogClientErrorOptions & { timestamp: string }
) {
  return JSON.stringify({
    level,
    ...options,
  });
}

export async function logClientError(options: LogClientErrorOptions) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = buildPayload("error", {
    ...options,
    timestamp: new Date().toISOString(),
  });

  if (OBSERVABILITY_ENDPOINT) {
    try {
      const blob = new Blob([payload], { type: "application/json" });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(OBSERVABILITY_ENDPOINT, blob);
      } else {
        await fetch(OBSERVABILITY_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        });
      }
      return;
    } catch (sendError) {
      console.warn("Unable to send observability payload", sendError);
    }
  }

  console.error("[client-error]", options);
}
