import React from 'react';

const Timer = ({ session, pause, minutes, seconds, startStop, reset }) => {
  const min = minutes.toString();
  const sec = seconds.toString();

  return (
    <div id='timer'>
      <h2 id='timer-label'>{session ? 'Session' : 'Break'}</h2>
      <p id='time-left' className={minutes < 1 ? 'alert' : ''}>
        {`${min.length === 1 ? '0' + min : min}:${
          sec.length === 1 ? '0' + sec : sec
        }`}
      </p>
      <div id='timer-buttons'>
        <button id='start_stop' onClick={startStop}>
          {pause ? 'start' : 'stop'}
        </button>
        <button id='reset' onClick={reset}>
          reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
