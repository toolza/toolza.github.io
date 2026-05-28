// veo3/worker.js
const corsHeaders = {
	"access-control-allow-origin": "*",
	"access-control-allow-methods": "POST, OPTIONS, GET",
	"access-control-allow-headers": "content-type",
	"access-control-max-age": "86400"
};

function json(payload, status = 200) {
	return new Response(JSON.stringify(payload), {
		status,
		headers: {
			...corsHeaders,
			"content-type": "application/json; charset=utf-8"
		}
	});
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// Health check
		if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
			return json({ status: "ok", message: "Veo 3 Proxy is running" });
		}

		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers: corsHeaders });
		}

		if (request.method !== "POST") {
			return json({ error: "Method not allowed. Use POST." }, 405);
		}

		try {
			const body = await request.json();

			if (!body.prompt) {
				return json({ error: "Prompt is required" }, 400);
			}

			const accountId = env.CLOUDFLARE_ACCOUNT_ID || body.accountId;
			const apiToken = env.CLOUDFLARE_API_TOKEN;

			if (!apiToken) {
				return json({ error: "Missing CLOUDFLARE_API_TOKEN secret" }, 500);
			}
			if (!accountId) {
				return json({ error: "Account ID is required" }, 400);
			}

			const model = body.model || "google/veo-3";
			const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;

			const cfResponse = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${apiToken}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					prompt: body.prompt,
					duration: body.duration || "6s",
					aspect_ratio: body.aspect_ratio || "16:9",
					resolution: body.resolution || "720p",
					generate_audio: body.generate_audio || false
				})
			});

			const result = await cfResponse.json();
			return json(result, cfResponse.status);

		} catch (err) {
			return json({ error: err.message }, 500);
		}
	}
};