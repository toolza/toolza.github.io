// Function to load header and footer
function loadHeaderFooter() {
  // Load Header
  fetch('../../header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
    });

  // Load Footer
  fetch('../../footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', loadHeaderFooter);
