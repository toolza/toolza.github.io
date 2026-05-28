import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(__dirname, "public");
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body is too large."));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
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

async function handleGenerate(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Use POST for /api/generate." });
  }

  try {
    const {
      accountId: rawAccountId,
      apiToken,
      model = "google/veo-3",
      prompt,
      duration,
      aspect_ratio,
      resolution,
      generate_audio
    } = JSON.parse(await readBody(req));

    const accountId = normalizeAccountId(rawAccountId);

    if (!accountId || !apiToken) {
      return sendJson(res, 400, { error: "Cloudflare account ID and API token are required." });
    }

    if (!/^[a-f0-9]{32}$/i.test(accountId)) {
      return sendJson(res, 400, {
        error:
          "Invalid Cloudflare Account ID. Use the 32-character account ID from the Cloudflare dashboard URL or Workers AI REST API page."
      });
    }

    if (!prompt || prompt.trim().length < 3) {
      return sendJson(res, 400, { error: "Write a prompt with at least 3 characters." });
    }

    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${modelPath(model)}`;
    const startedAt = Date.now();
    const cloudflareResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiToken}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt.trim(),
        duration,
        aspect_ratio,
        resolution,
        generate_audio: Boolean(generate_audio)
      })
    });

    const contentType = cloudflareResponse.headers.get("content-type") || "";
    const raw = contentType.includes("application/json")
      ? await cloudflareResponse.json()
      : await cloudflareResponse.text();

    if (!cloudflareResponse.ok) {
      const cloudflareMessage =
        raw?.errors?.[0]?.message ||
        raw?.messages?.[0]?.message ||
        raw?.error ||
        "Cloudflare returned an error.";
      return sendJson(res, cloudflareResponse.status, {
        error: cloudflareMessage,
        cloudflare: raw
      });
    }

    const result = raw?.result ?? raw;
    const videoUrl =
      result?.video ||
      result?.output?.video ||
      result?.data?.video ||
      result?.video_url ||
      null;

    return sendJson(res, 200, {
      ok: true,
      elapsedMs: Date.now() - startedAt,
      videoUrl,
      state: result?.state || raw?.state || "Completed",
      result,
      cloudflare: raw
    });
  } catch (error) {
    return sendJson(res, 500, {
      error: error instanceof Error ? error.message : "Unexpected server error."
    });
  }
}

async function handleStatic(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const requestedPath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const filePath = normalize(join(publicDir, requestedPath));

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(filePath);
    res.writeHead(200, {
      "content-type": mimeTypes[extname(filePath)] || "application/octet-stream"
    });
    res.end(file);
  } catch {
    const fallback = await readFile(join(publicDir, "index.html"));
    res.writeHead(200, { "content-type": mimeTypes[".html"] });
    res.end(fallback);
  }
}

createServer((req, res) => {
  if (req.url?.startsWith("/api/generate")) {
    handleGenerate(req, res);
    return;
  }

  handleStatic(req, res);
}).listen(port, host, () => {
  console.log(`Veo 3 generator running at http://${host}:${port}`);
});
