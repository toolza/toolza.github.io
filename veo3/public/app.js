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
const apiBase = window.location.protocol === "file:" ? "http://127.0.0.1:3000" : "";

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
    accountId: accountInput.value.trim(),
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
    const response = await fetch(`${apiBase}/api/generate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formPayload())
    });
    const payload = await response.json();
    responseJson.textContent = JSON.stringify(payload, null, 2);

    if (!response.ok) {
      throw new Error(payload.error || "Generation failed.");
    }

    setVideo(payload.videoUrl);
    setStatus(payload.videoUrl ? "Video ready" : "Response received", payload.videoUrl ? "success" : "neutral");
    elapsedTime.textContent = `${((payload.elapsedMs || performance.now() - startedAt) / 1000).toFixed(1)}s`;
  } catch (error) {
    setStatus("Generation failed", "error");
    elapsedTime.textContent = "Error";
    responseJson.textContent = JSON.stringify(
      { error: error instanceof Error ? error.message : "Generation failed." },
      null,
      2
    );
  } finally {
    setLoading(false);
  }
});

updateCharCount();
