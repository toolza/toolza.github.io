document.getElementById('colorPicker').addEventListener('input', function () {
  const color = this.value; // Get the selected color in HEX format
  const hexCode = document.getElementById('hexCode');
  const rgbCode = document.getElementById('rgbCode');
  const hslCode = document.getElementById('hslCode');

  // Update HEX code
  hexCode.textContent = color.toUpperCase();

  // Convert HEX to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  rgbCode.textContent = `rgb(${r}, ${g}, ${b})`;

  // Convert RGB to HSL
  const hsl = rgbToHsl(r, g, b);
  hslCode.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
});

// Helper function to convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // Achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Copy to clipboard functionality
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', function () {
    const targetId = this.getAttribute('data-clipboard-target');
    const targetElement = document.querySelector(targetId);
    const textToCopy = targetElement.textContent;

    // Copy text to clipboard
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert(`Copied: ${textToCopy}`);
      })
      .catch(() => {
        alert('Failed to copy text.');
      });
  });
});
