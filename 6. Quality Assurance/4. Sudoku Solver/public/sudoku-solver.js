import { puzzlesAndSolutions } from './puzzle-strings.js';
import SudokuSolver from './solver-algorithm.js';

const textArea = document.getElementById('text-input');
const sudokuGrid = document.querySelector('.grid');
const sudokuCells = document.querySelectorAll('.sudoku-input');
const solveButton = document.getElementById('solve-button');
const clearButton = document.getElementById('clear-button');
const error = document.getElementById('error-msg');

const solver = new SudokuSolver();

function fillSudoku(values, sudoku, errorDiv) {
  errorDiv.textContent = '';
  values.forEach((value, i) => {
    if (values.length !== 81) {
      errorDiv.textContent = 'Error: Expected puzzle to be 81 characters long';
      return;
    }
    if (!value.match(/[0-9.]/)) {
      errorDiv.textContent = 'Error: Invalid input';
      return;
    }
    sudoku[i].value = value === '.' ? '' : value;
  });
}

function updateTextArea(cells, errorDiv) {
  errorDiv.textContent = '';
  let textString = '';

  cells.forEach((cell) => {
    if (!cell.value.match(/[0-9]/)) {
      if (cell.value === '') {
        textString = textString + '.';
        return;
      }
      textString = textString + '.';
      errorDiv.textContent = 'Error: Invalid input';
      return;
    }
    textString =
      textString + (cell.value.toString() === '' ? '.' : cell.value.toString());
  });

  return textString;
}

function solve(puzzle, errorDiv) {
  if (errorDiv.textContent === '') {
    const result = solver.solve(puzzle);

    if (result === 'No solution found') {
      errorDiv.textContent = 'Error: ' + result;
      return;
    }

    return result;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area

  textArea.value =
    puzzlesAndSolutions[
      Math.floor(Math.random() * puzzlesAndSolutions.length)
    ][0];

  fillSudoku(textArea.value.split(''), sudokuCells, error);
});

textArea.addEventListener('input', (e) => {
  fillSudoku(e.currentTarget.value.split(''), sudokuCells, error);
});

sudokuGrid.addEventListener('input', () => {
  textArea.value = updateTextArea(sudokuCells, error);
});

solveButton.addEventListener('click', () => {
  textArea.value = solve(textArea.value, error);
  fillSudoku(textArea.value.split(''), sudokuCells, error);
});

clearButton.addEventListener('click', () => {
  textArea.value = '.'.repeat(81);
  fillSudoku(textArea.value.split(''), sudokuCells, error);
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = { fillSudoku, updateTextArea, solve };
} catch (e) {}
