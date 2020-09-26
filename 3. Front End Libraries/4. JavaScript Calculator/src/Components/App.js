import React, { useState } from 'react';

import buttons from '../assets/buttons.js';

import Display from './Display.js';
import Button from './Button.js';

const App = () => {
  const [displayValue, setDisplayValue] = useState(0);

  return (
    <div id='calculator'>
      <Display value={displayValue} />
      <div id='buttons'>
        {buttons.map(({ id, value }) => {
          return (
            <Button
              key={id}
              id={id}
              value={value}
              handleClick={setDisplayValue}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
