import { puzzlesAndSolutions } from './puzzle-strings.js';
import SudokuSolver from './solver-algorithm.js';

const textArea = document.getElementById('text-input');
const sudokuGrid = document.querySelector('.grid');
const sudokuCells = document.querySelectorAll('.sudoku-input');
const solveButton = document.getElementById('solve-button');
const clearButton = document.getElementById('clear-button');
const error = document.getElementById('error-msg');

const solver = new SudokuSolver();

function fillSudoku(values) {
  error.textContent = '';
  values.forEach((value, i) => {
    if (values.length !== 81) {
      error.textContent = 'Error: Expected puzzle to be 81 characters long';
      return;
    }
    if (!value.match(/[0-9.]/)) {
      error.textContent = 'Error: Invalid input';
      return;
    }
    sudokuCells[i].value = value === '.' ? '' : value;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area

  textArea.value =
    puzzlesAndSolutions[
      Math.floor(Math.random() * puzzlesAndSolutions.length)
    ][0];

  fillSudoku(textArea.value.split(''));
});

textArea.addEventListener('input', (e) => {
  fillSudoku(e.currentTarget.value.split(''));
});

sudokuGrid.addEventListener('input', () => {
  let textString = '';
  error.textContent = '';

  sudokuCells.forEach((cell) => {
    if (!cell.value.match(/[0-9]/)) {
      if (cell.value === '') {
        textString = textString + '.';
        return;
      }
      textString = textString + '.';
      error.textContent = 'Error: Invalid input';
      return;
    }
    textString =
      textString + (cell.value.toString() === '' ? '.' : cell.value.toString());
  });

  textArea.value = textString;
});

solveButton.addEventListener('click', () => {
  if (error.textContent === '') {
    const result = solver.solve(textArea.value);

    if (result === 'No solution found') {
      error.textContent = 'Error: ' + result;
      return;
    }

    textArea.value = result;
    fillSudoku(result.split(''));
  }
});

clearButton.addEventListener('click', () => {
  error.textContent = '';
  textArea.value = '.'.repeat(81);
  fillSudoku(textArea.value.split(''));
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {};
} catch (e) {}
