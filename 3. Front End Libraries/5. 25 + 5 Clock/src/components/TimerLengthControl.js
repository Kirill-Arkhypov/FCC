import React from 'react';

const TimerLengthControl = ({
  id,
  labelId,
  label,
  minutes,
  decrementId,
  incrementId,
  decrement,
  increment,
  pause,
}) => {
  function handleClick(callback) {
    if (!pause) return;
    return callback;
  }
  return (
    <div id='timer-length-control'>
      <h3 id={labelId}>{label}</h3>
      <div id='control-buttons'>
        <button id={decrementId} onClick={handleClick(decrement)}>
          -
        </button>
        <p id={id}>{minutes}</p>
        <button id={incrementId} onClick={handleClick(increment)}>
          +
        </button>
      </div>
    </div>
  );
};

export default TimerLengthControl;
