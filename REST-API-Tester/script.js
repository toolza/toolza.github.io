document.getElementById('apiForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form submission

  const url = document.getElementById('url').value;
  const method = document.getElementById('method').value;
  const requestBody = document.getElementById('requestBody').value;
  const responseOutput = document.getElementById('responseOutput');
  const responseElement = document.getElementById('response');

  // Show loading state
  responseOutput.textContent = "Sending request...";
  responseElement.style.display = 'block';

  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add request body for POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      options.body = requestBody;
    }

    // Send the request
    const response = await fetch(url, options);

    // Parse the response
    const data = await response.json();
    responseOutput.textContent = JSON.stringify(data, null, 2); // Pretty-print JSON
  } catch (error) {
    responseOutput.textContent = `Error: ${error.message}`;
  }
});

// Show/hide request body field based on HTTP method
document.getElementById('method').addEventListener('change', function () {
  const requestBodyGroup = document.getElementById('requestBodyGroup');
  if (['POST', 'PUT', 'PATCH'].includes(this.value)) {
    requestBodyGroup.style.display = 'block';
  } else {
    requestBodyGroup.style.display = 'none';
  }
});
