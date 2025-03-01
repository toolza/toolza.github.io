document.getElementById('compareBtn').addEventListener('click', compareTexts);

// Function to read file content
function readFile(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsText(file);
}

// Function to compare texts
function compareTexts() {
  const text1 = document.getElementById('text1').value;
  const text2 = document.getElementById('text2').value;
  const file1 = document.getElementById('file1').files[0];
  const file2 = document.getElementById('file2').files[0];

  // If files are uploaded, read their content
  if (file1 && file2) {
    readFile(file1, (content1) => {
      readFile(file2, (content2) => {
        displayDiff(content1, content2);
      });
    });
  } else if (text1 && text2) {
    // If text is entered manually, compare directly
    displayDiff(text1, text2);
  } else {
    alert('Please enter text or upload files to compare.');
  }
}

// Function to display differences using Diff2Html
function displayDiff(text1, text2) {
  // Compute the differences using the diff library
  const differences = Diff.diffLines(text1, text2);

  // Convert the differences into a unified diff format
  const unifiedDiff = Diff.createPatch('text', text1, text2, 'Text 1', 'Text 2');

  // Render the differences using Diff2Html
  const diffHtml = Diff2Html.html(unifiedDiff, {
    inputFormat: 'diff',
    showFiles: false,
    matching: 'lines',
    outputFormat: 'side-by-side',
  });

  document.getElementById('diffOutput').innerHTML = diffHtml;
}
