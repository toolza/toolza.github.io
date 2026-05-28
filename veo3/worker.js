// worker.js
const corsHeaders = {
	"access-control-allow-origin": "*",
	"access-control-allow-methods": "GET, POST, OPTIONS",
	"access-control-allow-headers": "content-type",
};

function json(payload, status = 200) {
	return new Response(JSON.stringify(payload), {
		status,
		headers: {
			...corsHeaders,
			"content-type": "application/json",
		}
	});
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// Health Check
		if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
			return json({
				status: "ok",
				message: "Veo 3 Worker is running",
				worker: "veo3-generator-proxy"
			});
		}

		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers: corsHeaders });
		}

		// Only allow POST
		if (request.method !== "POST") {
			return json({ error: "Method not allowed" }, 405);
		}

		try {
			const body = await request.json();

			if (!body.prompt) {
				return json({ error: "Prompt is required" }, 400);
			}

			const accountId = env.CLOUDFLARE_ACCOUNT_ID;
			const apiToken = env.CLOUDFLARE_API_TOKEN;

			if (!apiToken) return json({ error: "Missing API Token" }, 500);
			if (!accountId) return json({ error: "Missing Account ID" }, 400);

			const model = body.model || "@google/veo-3";

			const response = await fetch(
				`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
				{
					method: "POST",
					headers: {
						"Authorization": `Bearer ${apiToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						prompt: body.prompt,
						duration: body.duration || "6s",
						aspect_ratio: body.aspect_ratio || "16:9",
						resolution: body.resolution || "720p",
						generate_audio: body.generate_audio !== undefined ? body.generate_audio : false,
					}),
				}
			);

			const result = await response.json();
			return json(result, response.status);

		} catch (error) {
			return json({ error: error.message }, 500);
		}
	}
};