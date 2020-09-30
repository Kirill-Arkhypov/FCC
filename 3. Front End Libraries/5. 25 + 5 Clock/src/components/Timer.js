import React from 'react';

const Timer = ({ session, minutes, seconds }) => {
  return (
    <div id='timer'>
      <h2 id='timer-label'>{session ? 'Session' : 'Break'}</h2>
      <p id='time-left'>{`${minutes}:${seconds === 0 ? '00' : seconds}`}</p>
      <div id='timer-buttons'>
        <button id='start_stop'>start/stop</button>
        <button id='reset'>reset</button>
      </div>
    </div>
  );
};

export default Timer;
