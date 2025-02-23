document.getElementById('qrForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  const qrText = document.getElementById('qrText').value;
  const qrOutput = document.getElementById('qrOutput');
  const qrCodeElement = document.getElementById('qrCode');
  const downloadBtn = document.getElementById('downloadBtn');

  // Clear previous QR code
  qrCodeElement.innerHTML = '';

  // Generate new QR code
  const qrCode = new QRCode(qrCodeElement, {
    text: qrText,
    width: 200,
    height: 200,
  });

  // Show the QR code and download button
  qrOutput.style.display = 'block';
  downloadBtn.style.display = 'inline-block';

  // Add download functionality
  downloadBtn.addEventListener('click', function () {
    const canvas = qrCodeElement.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qrcode.png';
    link.click();
  });
});
