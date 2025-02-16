document.addEventListener('DOMContentLoaded', function() {
  const monthYearElement = document.getElementById('current-month-year');
  const prevMonthButton = document.getElementById('prev-month');
  const nextMonthButton = document.getElementById('next-month');
  const monthSelect = document.getElementById('month-select');
  const yearSelect = document.getElementById('year-select');
  const jumpToDateButton = document.getElementById('jump-to-date');
  const calendarGrid = document.querySelector('.calendar-grid');

  let currentDate = new Date();

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    monthYearElement.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
    monthSelect.value = month;
    yearSelect.value = year;

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    calendarGrid.innerHTML = '';

    // Render days of the week
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.textContent = day;
      calendarGrid.appendChild(dayElement);
    });

    // Fill in the days
    for (let i = 0; i < startingDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.classList.add('day', 'empty');
      calendarGrid.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.textContent = day;

      if (year === new Date().getFullYear() && month === new Date().getMonth() && day === new Date().getDate()) {
        dayElement.classList.add('today');
      }

      calendarGrid.appendChild(dayElement);
    }
  }

  prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  jumpToDateButton.addEventListener('click', () => {
    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(yearSelect.value);
    currentDate = new Date(selectedYear, selectedMonth, 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
});
