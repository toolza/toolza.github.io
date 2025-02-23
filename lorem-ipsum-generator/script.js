document.getElementById('loremForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  const amount = document.getElementById('amount').value;
  const type = document.getElementById('type').value;
  const loremTextElement = document.getElementById('loremText');
  const outputElement = document.getElementById('output');

  // Generate Lorem Ipsum text
  let loremText = '';
  if (type === 'paragraphs') {
    loremText = generateParagraphs(amount);
  } else if (type === 'sentences') {
    loremText = generateSentences(amount);
  } else if (type === 'words') {
    loremText = generateWords(amount);
  }

  // Display the generated text
  loremTextElement.textContent = loremText;
  outputElement.style.display = 'block';
});

function generateParagraphs(count) {
  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  let paragraphs = '';
  for (let i = 0; i < count; i++) {
    paragraphs += lorem + '\n\n';
  }
  return paragraphs.trim();
}

function generateSentences(count) {
  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  const sentences = lorem.split('. ');
  let result = '';
  for (let i = 0; i < count; i++) {
    result += sentences[i % sentences.length] + '. ';
  }
  return result.trim();
}

function generateWords(count) {
  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  const words = lorem.split(' ');
  let result = '';
  for (let i = 0; i < count; i++) {
    result += words[i % words.length] + ' ';
  }
  return result.trim();
}
