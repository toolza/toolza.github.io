document.addEventListener('DOMContentLoaded', function () {
  const timerDisplay = document.getElementById('timer');
  const minutesInput = document.getElementById('minutes');
  const secondsInput = document.getElementById('seconds');
  const startBtn = document.getElementById('start-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const resumeBtn = document.getElementById('resume-btn');
  const resetBtn = document.getElementById('reset-btn');
  const beepSound = document.getElementById('beep');

  let timer;
  let timeLeft = 0;
  let isPaused = false;
  let initialTime = 0;

  // Update the timer display
  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  // Start the timer
  function startTimer() {
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    timeLeft = minutes * 60 + seconds;
    initialTime = timeLeft;

    if (timeLeft <= 0) {
      alert('Please enter a valid time.');
      return;
    }

    updateDisplay();
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;

    timer = setInterval(() => {
      if (!isPaused) {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
          clearInterval(timer);
          beepSound.play();
          startBtn.disabled = false;
          pauseBtn.disabled = true;
          resumeBtn.disabled = true;
          resetBtn.disabled = true;
        }
      }
    }, 1000);
  }

  // Pause the timer
  function pauseTimer() {
    isPaused = true;
    pauseBtn.disabled = true;
    resumeBtn.disabled = false;
  }

  // Resume the timer
  function resumeTimer() {
    isPaused = false;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
  }

  // Reset the timer
  function resetTimer() {
    clearInterval(timer);
    timeLeft = initialTime;
    updateDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    resetBtn.disabled = true;
    isPaused = false;
  }

  // Event listeners
  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resumeBtn.addEventListener('click', resumeTimer);
  resetBtn.addEventListener('click', resetTimer);
});
