document.getElementById('urlForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form submission

  const longUrl = document.getElementById('longUrl').value;
  const resultElement = document.getElementById('result');
  const shortUrlElement = document.getElementById('shortUrl');

  // Show loading state
  shortUrlElement.textContent = "Generating...";
  resultElement.style.display = 'block';

  try {
    // Use TinyURL API to generate short URL
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
    if (!response.ok) throw new Error("Failed to generate short URL");

    const shortUrl = await response.text();
    shortUrlElement.textContent = shortUrl;
    shortUrlElement.href = shortUrl;
  } catch (error) {
    shortUrlElement.textContent = "Error: Unable to generate short URL.";
    shortUrlElement.href = "#";
    console.error(error);
  }
});
