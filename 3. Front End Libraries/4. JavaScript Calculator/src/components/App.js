import React, { useState, useEffect } from 'react';

import buttons from '../assets/buttons';
import compute from '../assets/computationalLogic';

import Display from './Display/Display';
import Button from './Button/Button';

const App = () => {
  const [currentOperand, setCurrentOperand] = useState('0');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operator, setOperator] = useState('');

  const [displayValue, setDisplayValue] = useState(currentOperand);
  const [displayExpression, setDisplayExpression] = useState('');

  useEffect(() => {
    if (displayExpression.length > 28) {
      setDisplayExpression('«' + displayExpression.slice(-27));
    }
  }, [displayExpression]);

  function reset() {
    setCurrentOperand('0');
    setPreviousOperand('');
    setOperator('');
    setDisplayValue('0');
    setDisplayExpression('');
  }

  function equals() {
    if (!operator) return;

    setDisplayValue(
      compute(currentOperand || displayValue, previousOperand, operator)
    );
    setPreviousOperand(currentOperand || previousOperand);
    setDisplayExpression('');
    setCurrentOperand('');
    setPreviousOperand('');
    setOperator('');
  }

  function backSpace() {
    if (displayValue.length === 2 && displayValue.includes('-')) {
      setDisplayValue('0');
      if (currentOperand) setCurrentOperand('0');
      return;
    }

    setDisplayValue(displayValue.slice(0, -1) || '0');
    if (currentOperand) setCurrentOperand(currentOperand.slice(0, -1) || '0');
  }

  function plusMinus() {
    if (displayValue === '0') return;

    displayValue.includes('-')
      ? setDisplayValue(displayValue.slice(1))
      : setDisplayValue('-' + displayValue);
    if (currentOperand) {
      currentOperand.includes('-')
        ? setCurrentOperand(currentOperand.slice(1))
        : setCurrentOperand('-' + currentOperand);
    }
  }

  function handleOperation(value) {
    if (!currentOperand && operator) {
      setOperator(value);
      setDisplayExpression(displayExpression.slice(0, -2) + ' ' + value);
      return;
    }

    if ((currentOperand || displayValue) && previousOperand && operator) {
      const result = compute(displayValue, previousOperand, operator);

      setDisplayValue(result);
      setPreviousOperand(result);
      setCurrentOperand('');
      setOperator(value);
      setDisplayExpression(
        displayExpression + ' ' + currentOperand + ' ' + value
      );
      return;
    }

    setPreviousOperand(currentOperand || displayValue);
    setDisplayExpression((currentOperand || displayValue) + ' ' + value);
    setCurrentOperand('');
    setOperator(value);
  }

  function handleInput(value) {
    if (displayValue === '0' && value !== '.') {
      setCurrentOperand(value);
      setDisplayValue(value);
      return;
    }

    if (currentOperand === '' && value === '.') {
      setCurrentOperand('0.');
      setDisplayValue('0.');
      return;
    }

    if (value === '.' && displayValue.includes('.')) return;

    if (currentOperand.length < 12) {
      setCurrentOperand(currentOperand + value);
      setDisplayValue(currentOperand + value);
    }
  }

  const onInput = (value) => {
    switch (value) {
      case 'C':
        reset();
        break;

      case '=':
        equals();
        break;

      case '←':
        backSpace();
        break;

      case '±':
        plusMinus();
        break;

      case '+':
      case '-':
      case '*':
      case '/':
        handleOperation(value);
        break;

      default:
        handleInput(value);
        return;
    }
  };

  return (
    <div id='calculator'>
      <Display expression={displayExpression} value={displayValue} />
      <div id='buttons'>
        {buttons.map(({ id, value }) => {
          return <Button key={id} id={id} value={value} onClick={onInput} />;
        })}
      </div>
    </div>
  );
};

export default App;
