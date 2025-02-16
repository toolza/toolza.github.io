let display = document.getElementById('display');
let buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    let value = button.getAttribute('data-value');

    if (value === 'C') {
      display.value = '';
    } else if (value === 'DEL') {
      display.value = display.value.slice(0, -1);
    } else if (value === '=') {
      try {
        display.value = eval(display.value);
      } catch (error) {
        display.value = 'Error';
      }
    } else {
      display.value += value;
    }
  });
});
