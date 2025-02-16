document.getElementById('beautifyBtn').addEventListener('click', function () {
  const inputCode = document.getElementById('inputCode').value;
  const beautifiedCode = js_beautify(inputCode, {
    indent_size: 2,
    space_in_empty_paren: true,
  });
  document.getElementById('outputCode').textContent = beautifiedCode;
});

// Include the js-beautify library
// You can use a CDN or download the library
// CDN link: https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.7/beautify.min.js
// Add this script tag to your HTML file:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.7/beautify.min.js"></script>
