const form = document.querySelector("#generatorForm");
const promptInput = document.querySelector("#prompt");
const charCount = document.querySelector("#charCount");
const statusEl = document.querySelector("#connectionStatus");
const responseJson = document.querySelector("#responseJson");
const videoPlayer = document.querySelector("#videoPlayer");
const emptyState = document.querySelector("#emptyState");
const downloadLink = document.querySelector("#downloadLink");
const generateButton = document.querySelector("#generateButton");
const elapsedTime = document.querySelector("#elapsedTime");
const modelSelect = document.querySelector("#model");
const modelBadge = document.querySelector("#modelBadge");
const accountInput = document.querySelector("#accountId");
const tokenInput = document.querySelector("#apiToken");
const rememberInput = document.querySelector("#rememberCredentials");
const toggleToken = document.querySelector("#toggleToken");
const copyResponse = document.querySelector("#copyResponse");

const samplePrompts = [
  "A cinematic macro shot of a glass hummingbird forming from rain droplets on a mossy branch, golden hour light, shallow depth of field",
  "A futuristic metro station under Mumbai during monsoon season, reflective floors, neon signage, commuters moving in slow motion",
  "An elegant product video of a matte black electric scooter gliding through a quiet coastal road at sunrise, realistic camera movement",
  "A vertical social video of a chef tossing noodles over a blue flame in a tiny night-market stall, energetic handheld footage"
];

const storedCredentials = JSON.parse(localStorage.getItem("veo3.credentials") || "{}");
accountInput.value = storedCredentials.accountId || "";
tokenInput.value = storedCredentials.apiToken || "";
rememberInput.checked = Boolean(storedCredentials.accountId && storedCredentials.apiToken);

function setStatus(text, tone = "neutral") {
  statusEl.textContent = text;
  statusEl.dataset.tone = tone;
}

function normalizeAccountId(value) {
  const raw = String(value || "").trim();
  const dashboardMatch = raw.match(/\/([a-f0-9]{32})(?:\/|$)/i);
  return dashboardMatch ? dashboardMatch[1] : raw;
}

function modelPath(model) {
  return String(model || "google/veo-3")
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function extractVideoUrl(payload) {
  const result = payload?.result ?? payload;
  return (
    result?.video ||
    result?.output?.video ||
    result?.data?.video ||
    result?.video_url ||
    result?.url ||
    null
  );
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

function updateCharCount() {
  charCount.textContent = `${promptInput.value.length} characters`;
}

function setLoading(isLoading) {
  document.body.classList.toggle("is-loading", isLoading);
  generateButton.disabled = isLoading;
  generateButton.querySelector("span:last-child").textContent = isLoading ? "Generating..." : "Generate Video";
}

function setVideo(url) {
  if (!url) {
    videoPlayer.hidden = true;
    emptyState.hidden = false;
    downloadLink.href = "#";
    downloadLink.classList.add("disabled");
    return;
  }

  videoPlayer.src = url;
  videoPlayer.hidden = false;
  emptyState.hidden = true;
  downloadLink.href = url;
  downloadLink.classList.remove("disabled");
}

function persistCredentials() {
  if (!rememberInput.checked) {
    localStorage.removeItem("veo3.credentials");
    return;
  }

  localStorage.setItem(
    "veo3.credentials",
    JSON.stringify({
      accountId: accountInput.value.trim(),
      apiToken: tokenInput.value.trim()
    })
  );
}

function formPayload() {
  const data = new FormData(form);
  return {
    accountId: normalizeAccountId(accountInput.value),
    apiToken: tokenInput.value.trim(),
    model: data.get("model"),
    prompt: data.get("prompt"),
    duration: data.get("duration"),
    aspect_ratio: data.get("aspect_ratio"),
    resolution: data.get("resolution"),
    generate_audio: document.querySelector("#generateAudio").checked
  };
}

promptInput.addEventListener("input", updateCharCount);
modelSelect.addEventListener("change", () => {
  modelBadge.textContent = modelSelect.value;
});

document.querySelector("#samplePrompt").addEventListener("click", () => {
  const prompt = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
  promptInput.value = prompt;
  updateCharCount();
  promptInput.focus();
});

toggleToken.addEventListener("click", () => {
  const isPassword = tokenInput.type === "password";
  tokenInput.type = isPassword ? "text" : "password";
  toggleToken.textContent = isPassword ? "Hide token" : "Show token";
});

copyResponse.addEventListener("click", async () => {
  await navigator.clipboard.writeText(responseJson.textContent);
  copyResponse.textContent = "Copied";
  window.setTimeout(() => {
    copyResponse.textContent = "Copy JSON";
  }, 1200);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  persistCredentials();
  setLoading(true);
  setStatus("Calling Cloudflare", "active");
  setVideo(null);
  responseJson.textContent = "{}";
  elapsedTime.textContent = "Running...";

  const startedAt = performance.now();
  try {
    const payload = formPayload();

    if (!/^[a-f0-9]{32}$/i.test(payload.accountId)) {
      throw new Error("Invalid Cloudflare Account ID. Use the 32-character ID from your Cloudflare dashboard URL.");
    }

    if (!payload.apiToken) {
      throw new Error("Cloudflare API token is required.");
    }

    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(
      payload.accountId
    )}/ai/run/${modelPath(payload.model)}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${payload.apiToken}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        prompt: payload.prompt.trim(),
        duration: payload.duration,
        aspect_ratio: payload.aspect_ratio,
        resolution: payload.resolution,
        generate_audio: payload.generate_audio
      })
    });

    const responsePayload = await readCloudflareResponse(response);
    const videoUrl = extractVideoUrl(responsePayload);
    responseJson.textContent = JSON.stringify(responsePayload, null, 2);

    if (!response.ok) {
      const cloudflareMessage =
        responsePayload?.errors?.[0]?.message ||
        responsePayload?.messages?.[0]?.message ||
        responsePayload?.error ||
        "Cloudflare returned an error.";
      throw new Error(cloudflareMessage);
    }

    setVideo(videoUrl);
    setStatus(videoUrl ? "Video ready" : "Response received", videoUrl ? "success" : "neutral");
    elapsedTime.textContent = `${((performance.now() - startedAt) / 1000).toFixed(1)}s`;
  } catch (error) {
    setStatus("Generation failed", "error");
    elapsedTime.textContent = "Error";
    responseJson.textContent = JSON.stringify(
      {
        error: error instanceof Error ? error.message : "Generation failed.",
        hint:
          error instanceof TypeError
            ? "If this says Failed to fetch, the browser may be blocking Cloudflare's API with CORS. A backend or Cloudflare Worker proxy is then required."
            : undefined
      },
      null,
      2
    );
  } finally {
    setLoading(false);
  }
});

updateCharCount();
