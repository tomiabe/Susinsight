import { NextResponse } from "next/server";

type HealthStatus = "ok" | "degraded";

function withTimeout(ms: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

export async function GET() {
  const startedAt = Date.now();
  const wpUrl = process.env.WORDPRESS_GRAPHQL_URL || "";
  const useWordPress = process.env.USE_WORDPRESS_CONTENT === "true";
  const headlessKey = process.env.HEADLESS_FETCH_KEY;
  const previewToken = process.env.WP_PREVIEW_TOKEN;

  let wpReachable = false;
  let wpLatencyMs: number | null = null;
  let wpStatusCode: number | null = null;

  if (useWordPress && wpUrl) {
    const pingStart = Date.now();
    try {
      const response = await fetch(wpUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(headlessKey ? { "x-susinsight-headless-key": headlessKey } : {}),
          ...(previewToken ? { authorization: `Bearer ${previewToken}` } : {})
        },
        body: JSON.stringify({
          query: "query HealthProbe { generalSettings { title } }"
        }),
        signal: withTimeout(4000)
      });

      wpStatusCode = response.status;
      wpReachable = response.ok;
      wpLatencyMs = Date.now() - pingStart;
    } catch {
      wpReachable = false;
      wpLatencyMs = Date.now() - pingStart;
    }
  }

  const status: HealthStatus =
    useWordPress && wpUrl && !wpReachable ? "degraded" : "ok";

  return NextResponse.json(
    {
      status,
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      mode: {
        useWordPressContent: useWordPress,
        hasWordPressUrl: Boolean(wpUrl)
      },
      services: {
        wordpressGraphql: {
          configured: Boolean(wpUrl),
          reachable: useWordPress ? wpReachable : null,
          statusCode: wpStatusCode,
          latencyMs: wpLatencyMs
        }
      },
      durationMs: Date.now() - startedAt
    },
    {
      status: status === "ok" ? 200 : 503,
      headers: {
        "cache-control": "no-store"
      }
    }
  );
}
