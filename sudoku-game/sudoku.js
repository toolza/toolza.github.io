/**
 * Sudoku Game Engine
 * Provides board generation, solver, uniqueness checks, and validation.
 */

// Helper to shuffle an array in-place (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Checks if a value can be placed at a given index on the board.
 * @param {Array<number>} board - 81-element flat array
 * @param {number} index - 0 to 80
 * @param {number} val - 1 to 9
 * @returns {boolean}
 */
function isValidMove(board, index, val) {
  const row = Math.floor(index / 9);
  const col = index % 9;

  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== col && board[row * 9 + c] === val) return false;
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== row && board[r * 9 + col] === val) return false;
  }

  // Check 3x3 box
  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const currRow = boxRowStart + r;
      const currCol = boxColStart + c;
      const currIdx = currRow * 9 + currCol;
      if (currIdx !== index && board[currIdx] === val) return false;
    }
  }

  return true;
}

/**
 * Backtracking solver that can count solutions up to a limit.
 * Used for solving and verifying uniqueness.
 * @param {Array<number>} board - 81-element board
 * @param {number} limit - maximum solutions to search for (default: 2)
 * @returns {Array<Array<number>>} list of found solution boards
 */
function solve(board, limit = 2) {
  const solutions = [];

  function backtrack(b, index) {
    if (solutions.length >= limit) return;

    // Find next empty cell
    while (index < 81 && b[index] !== 0) {
      index++;
    }

    // If reached end, we found a solution
    if (index === 81) {
      solutions.push([...b]);
      return;
    }

    // Try values 1 to 9
    for (let val = 1; val <= 9; val++) {
      if (isValidMove(b, index, val)) {
        b[index] = val;
        backtrack(b, index + 1);
        b[index] = 0; // undo
      }
    }
  }

  backtrack([...board], 0);
  return solutions;
}

/**
 * Generates a fully solved valid Sudoku board.
 * @returns {Array<number>} 81-element solved board
 */
function generateFullBoard() {
  const board = new Array(81).fill(0);

  function fill(index) {
    if (index === 81) return true;

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(numbers);

    for (const val of numbers) {
      if (isValidMove(board, index, val)) {
        board[index] = val;
        if (fill(index + 1)) return true;
        board[index] = 0; // backtrack
      }
    }
    return false;
  }

  fill(0);
  return board;
}

/**
 * Creates a Sudoku puzzle with a unique solution.
 * @param {string} difficulty - 'easy', 'medium', 'hard', 'expert'
 * @returns {{ puzzle: Array<number>, solution: Array<number> }}
 */
function generatePuzzle(difficulty) {
  const solution = generateFullBoard();
  const puzzle = [...solution];

  // Map difficulty to target number of clues to remove
  let targetRemoveCount;
  switch (difficulty) {
    case 'easy':
      targetRemoveCount = 38;
      break;
    case 'medium':
      targetRemoveCount = 47;
      break;
    case 'hard':
      targetRemoveCount = 53;
      break;
    case 'expert':
      targetRemoveCount = 58;
      break;
    default:
      targetRemoveCount = 45;
  }

  // Create list of all 81 positions and shuffle them
  const positions = Array.from({ length: 81 }, (_, i) => i);
  shuffle(positions);

  let removedCount = 0;
  for (const pos of positions) {
    if (removedCount >= targetRemoveCount) break;

    const temp = puzzle[pos];
    puzzle[pos] = 0; // try to remove

    // Check if solution remains unique
    const solutions = solve(puzzle, 2);
    if (solutions.length === 1) {
      // Uniqueness preserved, leave cell empty
      removedCount++;
    } else {
      // Multiple solutions found, restore cell value
      puzzle[pos] = temp;
    }
  }

  return { puzzle, solution };
}

/**
 * Analyzes the board for any errors (duplicate numbers in rows, columns, or boxes).
 * Returns a list of cell indices that contain errors.
 * @param {Array<number>} board - 81-element current board
 * @returns {Set<number>} Set of error indices
 */
function getErrors(board) {
  const errors = new Set();

  for (let i = 0; i < 81; i++) {
    const val = board[i];
    if (val === 0) continue;

    // Check if the current value violates Sudoku rules in relation to other cells
    if (!isValidMove(board, i, val)) {
      errors.add(i);
    }
  }

  return errors;
}

// Expose functions globally on the window object
window.SudokuEngine = {
  isValidMove,
  solve,
  generatePuzzle,
  getErrors
};
