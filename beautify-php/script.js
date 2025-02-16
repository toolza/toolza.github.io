// script.js
document.getElementById('beautifyBtn').addEventListener('click', function () {
  const inputCode = document.getElementById('inputCode').value;
  const language = document.getElementById('languageSelector').value;
  let beautifiedCode = '';

  // Beautify based on selected language
  switch (language) {
    case 'php':
      beautifiedCode = beautifyPHP(inputCode);
      break;
    case 'javascript':
      beautifiedCode = js_beautify(inputCode, { indent_size: 4 });
      break;
    case 'html':
      beautifiedCode = html_beautify(inputCode, { indent_size: 4 });
      break;
    case 'css':
      beautifiedCode = css_beautify(inputCode, { indent_size: 4 });
      break;
    default:
      beautifiedCode = inputCode;
  }

  // Display the beautified code with syntax highlighting
  const outputCodeElement = document.getElementById('outputCode');
  outputCodeElement.textContent = beautifiedCode;
  outputCodeElement.className = `language-${language}`;
  Prism.highlightElement(outputCodeElement);
});

// Copy to Clipboard
document.getElementById('copyBtn').addEventListener('click', function () {
  const outputCode = document.getElementById('outputCode').textContent;
  navigator.clipboard.writeText(outputCode).then(() => {
    alert('Code copied to clipboard!');
  });
});

// Download as .php file
document.getElementById('downloadBtn').addEventListener('click', function () {
  const outputCode = document.getElementById('outputCode').textContent;
  const blob = new Blob([outputCode], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'beautified_code.php';
  a.click();
  URL.revokeObjectURL(url);
});

// Custom PHP beautifier function
function beautifyPHP(code) {
  let formattedCode = code
    .replace(/\{/g, ' {\n')
    .replace(/\}/g, '\n}\n')
    .replace(/\;/g, ';\n')
    .replace(/\n\s*\n/g, '\n');

  let indentLevel = 0;
  formattedCode = formattedCode
    .split('\n')
    .map(line => {
      line = line.trim();
      if (line.endsWith('}')) {
        indentLevel--;
      }
      const indentedLine = '    '.repeat(indentLevel) + line;
      if (line.endsWith('{')) {
        indentLevel++;
      }
      return indentedLine;
    })
    .join('\n');

  return formattedCode;
}
