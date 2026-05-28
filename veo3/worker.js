const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type",
  "access-control-max-age": "86400"
};

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function modelPath(model) {
  return String(model || "google/veo-3")
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function normalizeAccountId(value) {
  const raw = String(value || "").trim();
  const dashboardMatch = raw.match(/\/([a-f0-9]{32})(?:\/|$)/i);
  return dashboardMatch ? dashboardMatch[1] : raw;
}

async function readCloudflareResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: text.slice(0, 600) || "Cloudflare returned a non-JSON response." };
  }
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return json({ error: "Use POST to generate a video." }, 405);
    }

    try {
      const body = await request.json();
      const accountId = normalizeAccountId(env.CLOUDFLARE_ACCOUNT_ID || body.accountId);
      const apiToken = env.CLOUDFLARE_API_TOKEN;

      if (!/^[a-f0-9]{32}$/i.test(accountId)) {
        return json({ error: "Invalid Cloudflare Account ID." }, 400);
      }

      if (!apiToken) {
        return json({ error: "Missing CLOUDFLARE_API_TOKEN Worker secret." }, 500);
      }

      if (!body.prompt || body.prompt.trim().length < 3) {
        return json({ error: "Prompt must be at least 3 characters." }, 400);
      }

      const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(
        accountId
      )}/ai/run/${modelPath(body.model)}`;

      const cloudflareResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiToken}`,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          prompt: body.prompt.trim(),
          duration: body.duration || "6s",
          aspect_ratio: body.aspect_ratio || "16:9",
          resolution: body.resolution || "720p",
          generate_audio: Boolean(body.generate_audio)
        })
      });

      const payload = await readCloudflareResponse(cloudflareResponse);
      return json(payload, cloudflareResponse.status);
    } catch (error) {
      return json(
        { error: error instanceof Error ? error.message : "Unexpected Worker error." },
        500
      );
    }
  }
};
