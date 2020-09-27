import React, { useState } from 'react';

import buttons from '../assets/buttons.js';

import Display from './Display.js';
import Button from './Button.js';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [displayExpression, setDisplayExpression] = useState('');

  const onInput = (value) => {
    if (value === 'C') {
      setDisplayValue('0');
      setDisplayExpression('');
      return;
    }

    if (value === '=') {
      setDisplayValue(eval(displayExpression + displayValue));
      setDisplayExpression('');
      return;
    }

    if (value === '+' || value === '-' || value === '*' || value === '/') {
      setDisplayExpression(displayExpression + displayValue + value);
      setDisplayValue('0');
      return;
    }

    if (displayValue === '0' && value !== '.') {
      setDisplayValue(value);
      return;
    }

    if (value === '.' && displayValue.includes('.')) return;

    setDisplayValue(displayValue + value);
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
