/**
 * Parth Sudoku - Application Controller
 * Handles UI interactions, state management, timer, history, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  const { generatePuzzle, getErrors } = window.SudokuEngine;

  // ==========================================================================
  // DOM ELEMENTS
  // ==========================================================================
  const boardEl = document.getElementById('sudoku-board');
  const timerDisplay = document.getElementById('timer-display');
  const difficultyDisplay = document.getElementById('current-difficulty');
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const startOverlay = document.getElementById('start-overlay');
  const btnStart = document.getElementById('btn-start');
  
  // Modals
  const dialogDifficulty = document.getElementById('dialog-difficulty');
  const dialogPaused = document.getElementById('dialog-paused');
  const dialogWon = document.getElementById('dialog-won');
  const dialogStats = document.getElementById('dialog-stats');
  
  // Game control buttons
  const btnUndo = document.getElementById('btn-undo');
  const btnRedo = document.getElementById('btn-redo');
  const btnPencil = document.getElementById('btn-pencil');
  const btnHint = document.getElementById('btn-hint');
  const btnErase = document.getElementById('btn-erase');
  const btnPause = document.getElementById('btn-pause');
  const btnResume = document.getElementById('btn-resume');
  const btnNewGame = document.getElementById('btn-new-game');
  const btnWonNewGame = document.getElementById('btn-won-new-game');
  const btnStats = document.getElementById('btn-stats');
  const btnResetStats = document.getElementById('btn-reset-stats');

  // Keypad
  const keypadButtons = document.querySelectorAll('.keypad-btn[data-num]');
  
  // Fireworks Canvas
  const canvas = document.getElementById('fireworks-canvas');
  const ctx = canvas.getContext('2d');

  // ==========================================================================
  // STATE VARIABLES
  // ==========================================================================
  let board = new Array(81).fill(0);
  let solution = new Array(81).fill(0);
  let clues = new Array(81).fill(false);
  let pencilMarks = Array.from({ length: 81 }, () => new Set());
  
  // History stack for Undo/Redo
  let history = [];
  let historyIndex = -1;
  
  let selectedIdx = -1;
  let currentDifficulty = 'medium';
  let pencilMode = false;
  let isPaused = false;
  let isWon = false;
  
  let secondsElapsed = 0;
  let timerInterval = null;
  let fireworksAnimationId = null;
  let particles = [];
  let fireworks = [];

  // SVGs for Theme Toggle
  const SUN_SVG = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>`;

  const MOON_SVG = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>`;

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  
  // Theme Setup
  const storedTheme = localStorage.getItem('parth_sudoku_theme') || 'dark';
  document.body.setAttribute('data-theme', storedTheme);
  btnThemeToggle.innerHTML = storedTheme === 'dark' ? SUN_SVG : MOON_SVG;

  // Build the cell grid in the DOM (exactly once)
  function createBoardDOM() {
    boardEl.innerHTML = '';
    for (let i = 0; i < 81; i++) {
      const cell = document.createElement('div');
      cell.classList.add('sudoku-cell');
      cell.setAttribute('role', 'gridcell');
      cell.setAttribute('tabindex', '0');
      cell.dataset.index = i;
      
      // Main value span
      const valSpan = document.createElement('span');
      valSpan.classList.add('cell-value');
      cell.appendChild(valSpan);
      
      // Pencil notes grid
      const notesContainer = document.createElement('div');
      notesContainer.classList.add('pencil-notes');
      for (let n = 1; n <= 9; n++) {
        const note = document.createElement('span');
        note.classList.add('pencil-note');
        note.dataset.note = n;
        note.textContent = n;
        notesContainer.appendChild(note);
      }
      cell.appendChild(notesContainer);
      
      // Cell click handler
      cell.addEventListener('click', (e) => {
        if (isPaused || isWon) return;
        selectCell(i);
      });
      
      boardEl.appendChild(cell);
    }
  }

  createBoardDOM();
  updateBoardUI(); // Show empty grid initially

  // ==========================================================================
  // GAME CONTROLLER ACTIONS
  // ==========================================================================

  function initNewGame(difficulty) {
    stopTimer();
    stopFireworks();
    startOverlay.classList.add('hidden');
    
    currentDifficulty = difficulty;
    difficultyDisplay.textContent = difficulty;
    
    // Generate board
    const puzzleData = generatePuzzle(difficulty);
    board = [...puzzleData.puzzle];
    solution = [...puzzleData.solution];
    clues = puzzleData.puzzle.map(x => x !== 0);
    pencilMarks = Array.from({ length: 81 }, () => new Set());
    
    // Reset state variables
    selectedIdx = -1;
    pencilMode = false;
    btnPencil.classList.remove('active');
    isPaused = false;
    isWon = false;
    secondsElapsed = 0;
    
    // Initialize history
    history = [{
      board: [...board],
      pencilMarks: pencilMarks.map(set => new Set(set))
    }];
    historyIndex = 0;
    
    // Record game play in stats
    recordStatsPlay();
    
    updateTimerDisplay();
    updateBoardUI();
    startTimer();
  }

  // Related cells logic (same row, col, or box)
  function isRelated(idx1, idx2) {
    if (idx1 === idx2 || idx1 === -1 || idx2 === -1) return false;
    
    const r1 = Math.floor(idx1 / 9);
    const c1 = idx1 % 9;
    const b1 = Math.floor(r1 / 3) * 3 + Math.floor(c1 / 3);
    
    const r2 = Math.floor(idx2 / 9);
    const c2 = idx2 % 9;
    const b2 = Math.floor(r2 / 3) * 3 + Math.floor(c2 / 3);
    
    return r1 === r2 || c1 === c2 || b1 === b2;
  }

  function selectCell(index) {
    selectedIdx = index;
    updateBoardUI();
  }

  // ==========================================================================
  // RENDER & UI UPDATES
  // ==========================================================================
  
  function updateBoardUI() {
    const cells = boardEl.querySelectorAll('.sudoku-cell');
    const errors = getErrors(board);
    const selectedVal = selectedIdx !== -1 ? board[selectedIdx] : 0;
    
    cells.forEach((cell, idx) => {
      const val = board[idx];
      const valSpan = cell.querySelector('.cell-value');
      
      // Update cell content
      if (val !== 0) {
        valSpan.textContent = val;
        valSpan.style.display = 'block';
        cell.querySelector('.pencil-notes').style.display = 'none';
      } else {
        valSpan.textContent = '';
        valSpan.style.display = 'none';
        const notesGrid = cell.querySelector('.pencil-notes');
        notesGrid.style.display = 'grid';
        
        // Update individual notes visibility
        const noteSpans = notesGrid.querySelectorAll('.pencil-note');
        noteSpans.forEach(span => {
          const n = parseInt(span.dataset.note, 10);
          if (pencilMarks[idx].has(n)) {
            span.classList.add('visible');
          } else {
            span.classList.remove('visible');
          }
        });
      }
      
      // Reset classes
      cell.className = 'sudoku-cell';
      
      // Base classes
      if (clues[idx]) {
        cell.classList.add('original');
      } else if (val !== 0) {
        cell.classList.add('user-input');
      }
      
      // Interactive/State classes
      if (idx === selectedIdx) {
        cell.classList.add('selected');
      } else if (isRelated(idx, selectedIdx)) {
        cell.classList.add('highlighted');
      }
      
      if (val !== 0 && val === selectedVal && idx !== selectedIdx) {
        cell.classList.add('same-number');
      }
      
      if (errors.has(idx)) {
        cell.classList.add('error');
      }
    });

    // Update Action Button States
    btnUndo.disabled = historyIndex <= 0;
    btnRedo.disabled = historyIndex >= history.length - 1;
    btnHint.disabled = selectedIdx === -1 || clues[selectedIdx] || board[selectedIdx] !== 0;
    btnErase.disabled = selectedIdx === -1 || clues[selectedIdx] || (board[selectedIdx] === 0 && pencilMarks[selectedIdx].size === 0);

    // Update Keypad buttons highlighting
    keypadButtons.forEach(btn => {
      const num = parseInt(btn.dataset.num, 10);
      if (selectedVal === num) {
        btn.classList.add('highlighted-key');
      } else {
        btn.classList.remove('highlighted-key');
      }
    });
  }

  // ==========================================================================
  // INPUT HANDLING (DIGITS, NOTES, ERASING)
  // ==========================================================================

  function handleInput(val) {
    if (selectedIdx === -1 || clues[selectedIdx]) return;

    if (pencilMode) {
      // Toggle note
      const marks = pencilMarks[selectedIdx];
      if (marks.has(val)) {
        marks.delete(val);
      } else {
        marks.add(val);
      }
      // If we put notes in, we clear the main value
      board[selectedIdx] = 0;
    } else {
      // Enter main value
      board[selectedIdx] = val;
      // Clear notes in this cell
      pencilMarks[selectedIdx].clear();
      
      // Auto-clear corresponding notes in same row, column, and box
      clearRelatedPencilMarks(selectedIdx, val);
    }

    saveToHistory();
    updateBoardUI();
    checkWinCondition();
  }

  function clearRelatedPencilMarks(idx, val) {
    const row = Math.floor(idx / 9);
    const col = idx % 9;
    const boxRowStart = Math.floor(row / 3) * 3;
    const boxColStart = Math.floor(col / 3) * 3;

    for (let i = 0; i < 81; i++) {
      const currRow = Math.floor(i / 9);
      const currCol = i % 9;
      const currBoxRow = Math.floor(currRow / 3) * 3;
      const currBoxCol = Math.floor(currCol / 3) * 3;

      if (currRow === row || currCol === col || (currBoxRow === boxRowStart && currBoxCol === boxColStart)) {
        pencilMarks[i].delete(val);
      }
    }
  }

  function eraseCell() {
    if (selectedIdx === -1 || clues[selectedIdx]) return;

    board[selectedIdx] = 0;
    pencilMarks[selectedIdx].clear();
    
    saveToHistory();
    updateBoardUI();
  }

  function getHint() {
    if (selectedIdx === -1 || clues[selectedIdx] || board[selectedIdx] !== 0) return;

    const correctVal = solution[selectedIdx];
    board[selectedIdx] = correctVal;
    pencilMarks[selectedIdx].clear();
    clearRelatedPencilMarks(selectedIdx, correctVal);

    saveToHistory();
    updateBoardUI();
    checkWinCondition();
  }

  // ==========================================================================
  // HISTORY SYSTEM (UNDO / REDO)
  // ==========================================================================

  function saveToHistory() {
    // If we've undone items and are now writing new states, truncate future history
    if (historyIndex < history.length - 1) {
      history = history.slice(0, historyIndex + 1);
    }

    history.push({
      board: [...board],
      pencilMarks: pencilMarks.map(set => new Set(set))
    });
    
    historyIndex++;
  }

  function undo() {
    if (historyIndex > 0) {
      historyIndex--;
      const prevState = history[historyIndex];
      board = [...prevState.board];
      pencilMarks = prevState.pencilMarks.map(set => new Set(set));
      updateBoardUI();
    }
  }

  function redo() {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      const nextState = history[historyIndex];
      board = [...nextState.board];
      pencilMarks = nextState.pencilMarks.map(set => new Set(set));
      updateBoardUI();
    }
  }

  // ==========================================================================
  // TIMER MECHANICS
  // ==========================================================================

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (!isPaused && !isWon) {
        secondsElapsed++;
        updateTimerDisplay();
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    const mins = Math.floor(secondsElapsed / 60);
    const secs = secondsElapsed % 60;
    
    const displayMins = mins < 10 ? '0' + mins : mins;
    const displaySecs = secs < 10 ? '0' + secs : secs;
    
    timerDisplay.innerHTML = `${displayMins}<span class="timer-colon">:</span>${displaySecs}`;
  }

  function togglePause() {
    if (isWon) return;
    
    isPaused = !isPaused;
    if (isPaused) {
      boardEl.classList.add('paused');
      btnPause.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg> Resume
      `;
      dialogPaused.showModal();
    } else {
      boardEl.classList.remove('paused');
      btnPause.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg> Pause
      `;
      dialogPaused.close();
    }
  }

  // ==========================================================================
  // WIN CONDITION & LOCAL STATS
  // ==========================================================================

  function checkWinCondition() {
    // Check if board is complete and correct
    const isComplete = board.every((val, idx) => val === solution[idx]);
    if (isComplete && !isWon) {
      handleWin();
    }
  }

  function handleWin() {
    isWon = true;
    stopTimer();
    
    // Save victory stats
    const isNewRecord = recordStatsWin(currentDifficulty, secondsElapsed);
    
    // Render won dialog elements
    document.getElementById('won-difficulty').textContent = currentDifficulty;
    
    const mins = Math.floor(secondsElapsed / 60);
    const secs = secondsElapsed % 60;
    document.getElementById('won-time').textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    const recordMsg = document.getElementById('new-record-msg');
    recordMsg.style.display = isNewRecord ? 'block' : 'none';
    
    // Trigger fireworks and show modal
    startFireworks();
    dialogWon.showModal();
  }

  // ==========================================================================
  // LOCAL STORAGE STATISTICS
  // ==========================================================================

  function getStats() {
    const defaultStats = {
      played: 0,
      won: 0,
      bestTimes: {
        easy: null,
        medium: null,
        hard: null,
        expert: null
      }
    };
    try {
      const statsJson = localStorage.getItem('parth_sudoku_stats');
      return statsJson ? JSON.parse(statsJson) : defaultStats;
    } catch (e) {
      return defaultStats;
    }
  }

  function saveStats(stats) {
    localStorage.setItem('parth_sudoku_stats', JSON.stringify(stats));
  }

  function recordStatsPlay() {
    const stats = getStats();
    stats.played += 1;
    saveStats(stats);
  }

  function recordStatsWin(difficulty, time) {
    const stats = getStats();
    stats.won += 1;
    
    let isNewRecord = false;
    const currentBest = stats.bestTimes[difficulty];
    if (currentBest === null || time < currentBest) {
      stats.bestTimes[difficulty] = time;
      isNewRecord = true;
    }
    
    saveStats(stats);
    return isNewRecord;
  }

  function renderStatsModal() {
    const stats = getStats();
    document.getElementById('stats-played').textContent = stats.played;
    document.getElementById('stats-won').textContent = stats.won;
    
    const formatTime = (seconds) => {
      if (seconds === null) return '--:--';
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };
    
    document.getElementById('best-easy').textContent = formatTime(stats.bestTimes.easy);
    document.getElementById('best-medium').textContent = formatTime(stats.bestTimes.medium);
    document.getElementById('best-hard').textContent = formatTime(stats.bestTimes.hard);
    document.getElementById('best-expert').textContent = formatTime(stats.bestTimes.expert);
  }

  // ==========================================================================
  // EVENT LISTENERS & UI TRIGGERS
  // ==========================================================================

  // Theme Toggle click listener
  btnThemeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('parth_sudoku_theme', newTheme);
    btnThemeToggle.innerHTML = newTheme === 'dark' ? SUN_SVG : MOON_SVG;
  });

  // Action Buttons
  btnUndo.addEventListener('click', undo);
  btnRedo.addEventListener('click', redo);
  
  btnPencil.addEventListener('click', () => {
    pencilMode = !pencilMode;
    btnPencil.classList.toggle('active', pencilMode);
  });
  
  btnHint.addEventListener('click', getHint);
  btnErase.addEventListener('click', eraseCell);
  
  btnPause.addEventListener('click', togglePause);
  btnResume.addEventListener('click', togglePause);

  // Start Screen Button Trigger
  btnStart.addEventListener('click', () => {
    dialogDifficulty.showModal();
  });

  // New Game Trigger
  btnNewGame.addEventListener('click', () => {
    dialogDifficulty.showModal();
  });

  // Dialog new game triggers
  btnWonNewGame.addEventListener('click', () => {
    dialogWon.close();
    dialogDifficulty.showModal();
  });

  // Difficulty selection clicks
  const diffButtons = dialogDifficulty.querySelectorAll('.difficulty-option');
  diffButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedDiff = btn.dataset.diff;
      dialogDifficulty.close();
      initNewGame(selectedDiff);
    });
  });

  // Stats Buttons
  btnStats.addEventListener('click', () => {
    renderStatsModal();
    dialogStats.showModal();
  });

  btnResetStats.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your statistics? This cannot be undone.')) {
      localStorage.removeItem('parth_sudoku_stats');
      renderStatsModal();
    }
  });

  // Keypad clicks
  keypadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isPaused || isWon) return;
      const num = parseInt(btn.dataset.num, 10);
      handleInput(num);
    });
  });

  // ==========================================================================
  // KEYBOARD CONTROLS (ARROW NAVIGATION, INPUTS)
  // ==========================================================================
  
  document.addEventListener('keydown', (e) => {
    if (isPaused || isWon) return;
    
    // Ignore keyboard shortcuts if modal dialogs are open
    if (document.querySelector('dialog[open]')) return;

    const key = e.key;

    // Movement (Arrow navigation)
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      e.preventDefault();
      if (selectedIdx === -1) {
        selectedIdx = 0;
      } else {
        let row = Math.floor(selectedIdx / 9);
        let col = selectedIdx % 9;
        
        switch (key) {
          case 'ArrowUp': row = (row - 1 + 9) % 9; break;
          case 'ArrowDown': row = (row + 1) % 9; break;
          case 'ArrowLeft': col = (col - 1 + 9) % 9; break;
          case 'ArrowRight': col = (col + 1) % 9; break;
        }
        selectedIdx = row * 9 + col;
      }
      updateBoardUI();
      // Auto focus cell element in DOM
      const targetCell = boardEl.querySelector(`.sudoku-cell[data-index="${selectedIdx}"]`);
      if (targetCell) targetCell.focus();
      return;
    }

    // Number Inputs (1-9)
    if (key >= '1' && key <= '9') {
      const val = parseInt(key, 10);
      handleInput(val);
      return;
    }

    // Erase (Backspace, Delete, '0')
    if (key === 'Backspace' || key === 'Delete' || key === '0') {
      e.preventDefault();
      eraseCell();
      return;
    }

    // Note Mode toggle ('n', 'N')
    if (key === 'n' || key === 'N') {
      pencilMode = !pencilMode;
      btnPencil.classList.toggle('active', pencilMode);
      return;
    }

    // Hint Mode ('h', 'H')
    if (key === 'h' || key === 'H') {
      getHint();
      return;
    }

    // Undo / Redo (standard Ctrl/Cmd+Z, Ctrl/Cmd+Y)
    if ((e.ctrlKey || e.metaKey) && (key === 'z' || key === 'Z')) {
      e.preventDefault();
      if (e.shiftKey) {
        redo();
      } else {
        undo();
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && (key === 'y' || key === 'Y')) {
      e.preventDefault();
      redo();
      return;
    }
    
    // Deselect (Escape)
    if (key === 'Escape') {
      selectedIdx = -1;
      updateBoardUI();
      return;
    }
  });

  // ==========================================================================
  // FIREWORKS CANVAS ANIMATION SYSTEM
  // ==========================================================================

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = Math.random() * 2 + 1;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.015;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.07; // gravity
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.alpha -= this.decay;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  class Firework {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height;
      this.targetY = Math.random() * (canvas.height * 0.5) + canvas.height * 0.1;
      this.speed = Math.random() * 4 + 7;
      const targetX = Math.random() * (canvas.width * 0.6) + canvas.width * 0.2;
      this.angle = Math.atan2(this.targetY - this.y, targetX - this.x);
      this.vx = Math.cos(this.angle) * this.speed;
      this.vy = Math.sin(this.angle) * this.speed;
      this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
      this.exploded = false;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // Explode when starting to fall or reaching target height
      if (this.vy >= 0 || this.y <= this.targetY) {
        this.explode();
        this.exploded = true;
      }
    }
    
    explode() {
      const count = 50 + Math.floor(Math.random() * 30);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(this.x, this.y, this.color));
      }
    }
    
    draw() {
      if (this.exploded) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function animateFireworks() {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.2)'; // blend with background dark color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (Math.random() < 0.04 && fireworks.length < 5) {
      fireworks.push(new Firework());
    }
    
    fireworks = fireworks.filter(f => {
      f.update();
      f.draw();
      return !f.exploded;
    });
    
    particles = particles.filter(p => {
      p.update();
      p.draw();
      return p.alpha > 0;
    });
    
    fireworksAnimationId = requestAnimationFrame(animateFireworks);
  }

  function startFireworks() {
    canvas.style.display = 'block';
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    fireworks = [];
    particles = [];
    if (!fireworksAnimationId) {
      animateFireworks();
    }
  }

  function stopFireworks() {
    canvas.style.display = 'none';
    if (fireworksAnimationId) {
      cancelAnimationFrame(fireworksAnimationId);
      fireworksAnimationId = null;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.removeEventListener('resize', resizeCanvas);
  }

  // Ensure modal close stops fireworks
  dialogWon.addEventListener('close', stopFireworks);
});
