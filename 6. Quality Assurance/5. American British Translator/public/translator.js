import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

const mode = document.getElementById('locale-select');
const translateButton = document.getElementById('translate-btn');
const clearButton = document.getElementById('clear-btn');
const textArea = document.getElementById('text-input');
const translatedDiv = document.getElementById('translated-sentence');
const errorDiv = document.getElementById('error-msg');

function toTerms(input, terms) {
  let result = input;
  Object.keys(terms).forEach((e) => {
    const regexp = `(?<!-)\\b${e}\\b(?!-)`;
    result = result.replace(
      new RegExp(regexp, 'i'),
      `<span class='highlight'>${terms[e]}</span>`
    );
  });
  return result;
}

function fromTerms(input, terms) {
  let result = input;
  Object.keys(terms).forEach((e) => {
    const regexp = `(?<!-)\\b${terms[e]}\\b(?!-)`;
    result = result.replace(
      new RegExp(regexp, 'i'),
      `<span class='highlight'>${e}</span>`
    );
  });
  return result;
}

function convertTitles(input, mode, titles) {
  let result = input;
  if (mode === 'american-to-british') {
    Object.keys(titles).forEach((e) => {
      result = result.replace(e, `<span class='highlight'>${titles[e]}</span>`);
    });
  } else {
    Object.keys(titles).forEach((e) => {
      const regexp = `\\b(${titles[e]})\\b`;
      result = result.replace(
        new RegExp(regexp),
        `<span class='highlight'>${e}</span>`
      );
    });
  }

  return result;
}

function convertTime(input, mode) {
  let result = input;

  const time = result.match(/([0-1]?[0-9]|2[0-3])[:|.][0-5][0-9]/g);
  if (time) {
    time.forEach((e) => {
      if (mode === 'american-to-british') {
        result = result.replace(
          e,
          `<span class='highlight'>${e.replace(':', '.')}</span>`
        );
      }
      {
        result = result.replace(
          e,
          `<span class='highlight'>${e.replace('.', ':')}</span>`
        );
      }
    });
  }
  return result;
}

function translate(input, mode, output, err) {
  err.innerText = '';
  if (input === '') {
    err.innerText = 'Error: No text to translate.';
    return;
  }

  let result = input;

  if (mode === 'american-to-british') {
    result = toTerms(result, americanOnly);
    result = toTerms(result, americanToBritishSpelling);
  } else {
    result = toTerms(result, britishOnly);
    result = fromTerms(result, americanToBritishSpelling);
  }

  result = convertTitles(result, mode, americanToBritishTitles);
  result = convertTime(result, mode);

  output.innerHTML = result;

  if (output.textContent === input) {
    output.textContent = 'Everything looks good to me!';
    return;
  }
}

function clear(input, output, err) {
  input.value = '';
  output.textContent = '';
  err.textContent = '';
}

translateButton.addEventListener('click', () => {
  translate(textArea.value, mode.value, translatedDiv, errorDiv);
});

clearButton.addEventListener('click', () => {
  clear(textArea, translatedDiv, errorDiv);
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = { translate, clear };
} catch (e) {}
