document.addEventListener('DOMContentLoaded', function () {
  const urlInput = document.getElementById('url-input');
  const analyzeBtn = document.getElementById('analyze-btn');
  const resultsDiv = document.getElementById('results');

  analyzeBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();

    if (!url) {
      alert('Please enter a valid URL.');
      return;
    }

    try {
      resultsDiv.innerHTML = '<p>Analyzing...</p>';

      // Fetch the webpage content
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      const htmlContent = data.contents;

      // Parse the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');

      // Analyze SEO elements
      const title = doc.querySelector('title')?.innerText || 'Not found';
      const metaDescription = doc.querySelector('meta[name="description"]')?.content || 'Not found';
      const h1Tags = doc.querySelectorAll('h1').length;
      const h2Tags = doc.querySelectorAll('h2').length;
      const h3Tags = doc.querySelectorAll('h3').length;
      const images = doc.querySelectorAll('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.alt).length;
      const links = doc.querySelectorAll('a');
      const internalLinks = Array.from(links).filter(link => link.href.includes(url)).length;
      const externalLinks = links.length - internalLinks;
      const wordCount = doc.body.innerText.trim().split(/\s+/).length;

      // Display results
      resultsDiv.innerHTML = `
                <div class="result-item">
                    <h3>Title Tag</h3>
                    <p>${title}</p>
                </div>
                <div class="result-item">
                    <h3>Meta Description</h3>
                    <p>${metaDescription}</p>
                </div>
                <div class="result-item">
                    <h3>Headings</h3>
                    <p>H1: ${h1Tags}, H2: ${h2Tags}, H3: ${h3Tags}</p>
                </div>
                <div class="result-item">
                    <h3>Images</h3>
                    <p>Total Images: ${images.length}, Images without Alt: ${imagesWithoutAlt}</p>
                </div>
                <div class="result-item">
                    <h3>Links</h3>
                    <p>Internal Links: ${internalLinks}, External Links: ${externalLinks}</p>
                </div>
                <div class="result-item">
                    <h3>Word Count</h3>
                    <p>${wordCount} words</p>
                </div>
            `;
    } catch (error) {
      resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  });
});
