import React from 'react';

const TimerLengthControl = ({
  labelId,
  label,
  length,
  decrement,
  increment,
}) => {
  return (
    <div id='timer-length-control'>
      <h3 id={labelId}>{label}</h3>
      <div id='control-buttons'>
        <button id={decrement}>-</button>
        <p>{length}</p>
        <button id={increment}>+</button>
      </div>
    </div>
  );
};

export default TimerLengthControl;
