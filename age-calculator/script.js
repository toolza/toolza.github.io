document.getElementById('ageCalculatorForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  // Get the birthdate input
  const birthdate = new Date(document.getElementById('birthdate').value);
  const today = new Date();

  // Calculate age
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDifference = today.getMonth() - birthdate.getMonth();
  const dayDifference = today.getDate() - birthdate.getDate();

  // Adjust age if birthday hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  // Calculate months and days
  let months = today.getMonth() - birthdate.getMonth();
  if (months < 0 || (months === 0 && dayDifference < 0)) {
    months += 12;
  }

  let days = today.getDate() - birthdate.getDate();
  if (days < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
    months--;
  }

  // Display the result
  const resultElement = document.getElementById('ageResult');
  resultElement.innerHTML = `
    <strong>${age}</strong> years, <strong>${months}</strong> months, and <strong>${days}</strong> days
  `;

  // Show the result section
  document.getElementById('result').style.display = 'block';
});
