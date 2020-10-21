/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
let Solver;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require('../public/sudoku-solver.js');
  });

  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates
    // the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', (done) => {
      const input = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

      const textArea = document.getElementById('text-input');
      const sudokuCells = document.querySelectorAll('.sudoku-input');
      const errorDiv = document.getElementById('error-msg');

      textArea.value =
        input[Math.floor(Math.random() * input.length)] + '.'.repeat(80);

      Solver.fillSudoku(textArea.value.split(''), sudokuCells, errorDiv);

      assert.equal(sudokuCells[0].value, textArea.value.charAt(0));

      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', (done) => {
      const input = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

      const textArea = document.getElementById('text-input');
      const sudokuCells = document.querySelectorAll('.sudoku-input');
      const errorDiv = document.getElementById('error-msg');

      textArea.value = '.'.repeat(81);

      sudokuCells[0].value = input[Math.floor(Math.random() * input.length)];
      textArea.value = Solver.updateTextArea(sudokuCells, errorDiv);

      assert.equal(textArea.value.charAt(0), sudokuCells[0].value);

      done();
    });
  });

  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku
    // grid and the text area
    test('Function clearInput()', (done) => {
      const textArea = document.getElementById('text-input');
      const sudokuCells = document.querySelectorAll('.sudoku-input');
      const errorDiv = document.getElementById('error-msg');

      textArea.value =
        '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      Solver.fillSudoku(textArea.value.split(''), sudokuCells, errorDiv);

      Solver.clear(textArea, sudokuCells, errorDiv);

      let testString = '';
      sudokuCells.forEach((e) => {
        testString = testString + e.value;
      });

      assert.equal(textArea.value, '.'.repeat(81));
      assert.equal(testString, '');

      done();
    });

    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input))', (done) => {
      const textArea = document.getElementById('text-input');
      const sudokuCells = document.querySelectorAll('.sudoku-input');
      const errorDiv = document.getElementById('error-msg');

      const input =
        '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const result =
        '769235418851496372432178956174569283395842761628713549283657194516924837947381625';

      textArea.value = input;

      Solver.fillSudoku(textArea.value.split(''), sudokuCells, errorDiv);

      textArea.value = Solver.solve(input, errorDiv);

      Solver.fillSudoku(textArea.value.split(''), sudokuCells, errorDiv);

      let testString = '';
      sudokuCells.forEach((e) => {
        testString = testString + (e.value === '' ? '.' : e.value);
      });

      assert.equal(textArea.value, result);
      assert.equal(testString, result);

      done();
    });
  });
});
