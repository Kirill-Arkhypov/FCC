import React from 'react';

const TimeLengthController = ({
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
  return (
    <div id='timer-length-controller'>
      <h3 id={labelId}>{label}</h3>
      <div id='control-buttons'>
        <button
          id={decrementId}
          disabled={pause ? '' : 'disabled'}
          onClick={decrement}
        >
          -
        </button>
        <p id={id}>{minutes}</p>
        <button
          id={incrementId}
          disabled={pause ? '' : 'disabled'}
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default TimeLengthController;
