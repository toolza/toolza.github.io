document.addEventListener('DOMContentLoaded', function () {
  const tweetUrlInput = document.getElementById('tweet-url');
  const downloadBtn = document.getElementById('download-btn');
  const resultDiv = document.getElementById('result');

  downloadBtn.addEventListener('click', async () => {
    const tweetUrl = tweetUrlInput.value.trim();

    if (!tweetUrl) {
      resultDiv.textContent = "Please enter a valid Tweet URL.";
      return;
    }

    try {
      resultDiv.textContent = "Fetching video...";

      // Use a third-party API to get the video URL
      const apiUrl = `https://twitsave.com/info?url=${encodeURIComponent(tweetUrl)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.video_url) {
        resultDiv.innerHTML = `<a href="${data.video_url}" download="twitter_video.mp4">Click here to download the video</a>`;
      } else {
        resultDiv.textContent = "No video found in this Tweet.";
      }
    } catch (error) {
      resultDiv.textContent = "An error occurred. Please try again.";
      console.error(error);
    }
  });
});
