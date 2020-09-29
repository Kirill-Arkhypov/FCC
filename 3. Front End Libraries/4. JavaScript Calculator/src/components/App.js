import React, { useState } from 'react';

import buttons from '../assets/buttons';
import compute from '../assets/computationalLogic';

import Display from './Display';
import Button from './Button';

const App = () => {
  const [currentOperand, setCurrentOperand] = useState('0');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operator, setOperator] = useState('');

  const [displayValue, setDisplayValue] = useState(currentOperand);
  const [displayExpression, setDisplayExpression] = useState('');

  if (displayExpression.length > 28) {
    setDisplayExpression('«' + displayExpression.slice(-27));
  }

  const onInput = (value) => {
    if (value === 'C') {
      setCurrentOperand('0');
      setPreviousOperand('');
      setOperator('');
      setDisplayValue('0');
      setDisplayExpression('');
      return;
    }

    if (value === '=') {
      if (!operator) return;
      setDisplayValue(
        compute(
          parseFloat(currentOperand || displayValue),
          parseFloat(previousOperand),
          operator
        )
      );
      setPreviousOperand(currentOperand || previousOperand);
      setDisplayExpression('');
      setCurrentOperand('');
      setOperator('');
      return;
    }

    if (value === '+' || value === '-' || value === '*' || value === '/') {
      if (!currentOperand && operator) {
        if (operator !== '-' && value === '-') {
          displayValue.includes('-')
            ? setDisplayValue(displayValue.slice(1))
            : setDisplayValue(value + displayValue);
          return;
        }

        setOperator(value);
        setDisplayExpression(displayExpression.slice(0, -2) + ' ' + value);
        return;
      }

      if ((currentOperand || displayValue) && previousOperand && operator) {
        const result = compute(
          parseFloat(displayValue),
          parseFloat(previousOperand),
          operator
        );

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
      return;
    }

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
