// import { puzzlesAndSolutions } from './puzzle-strings.js';

const textArea = document.getElementById('text-input');
const sudokuGrid = document.querySelector('.grid');
const sudokuCells = document.querySelectorAll('.sudoku-input');
const error = document.getElementById('error-msg');

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
    '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

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

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {};
} catch (e) {}
