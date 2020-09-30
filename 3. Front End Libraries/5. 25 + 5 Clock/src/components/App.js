import React, { useState, useEffect, useRef } from 'react';

import TimerLengthControl from './TimerLengthControl';
import Timer from './Timer';

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const [minutes, setMinutes] = useState(sessionLength);
  const [seconds, setSeconds] = useState(0);

  const [session, setSession] = useState(true);
  const [pause, setPause] = useState(true);

  const audio = useRef(null);

  useEffect(() => {
    session ? setMinutes(sessionLength) : setMinutes(breakLength);
    setSeconds(0);
  }, [session, sessionLength, breakLength]);

  useEffect(() => {
    if (!pause) {
      const interval = setInterval(() => {
        tick();
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  function decrement(value, setValue) {
    setValue(value - 1);
    if (value <= 1) setValue(1);
  }

  function increment(value, setValue) {
    setValue(value + 1);
    if (value >= 60) setValue(60);
  }

  function tick() {
    if (minutes === 0 && seconds === 1) audio.current.play();
    if (seconds === 0) {
      if (minutes === 0) {
        setSession(!session);
        return;
      }
      setMinutes(minutes - 1);
      setSeconds(59);
      return;
    }
    setSeconds(seconds - 1);
  }

  function reset() {
    setBreakLength(5);
    setSessionLength(25);
    setMinutes(25);
    setSeconds(0);
    setSession(true);
    setPause(true);
    audio.current.pause();
    audio.current.currentTime = 0;
  }

  return (
    <div id='container'>
      <h1 id='main-label'>25 + 5 Clock</h1>
      <div id='length-controllers'>
        <TimerLengthControl
          id={'break-length'}
          labelId={'break-label'}
          label={'Break Length'}
          minutes={breakLength}
          decrementId={'break-decrement'}
          incrementId={'break-increment'}
          decrement={() => decrement(breakLength, setBreakLength)}
          increment={() => increment(breakLength, setBreakLength)}
          pause={pause}
        />
        <TimerLengthControl
          id={'session-length'}
          labelId={'session-label'}
          label={'Session Length'}
          minutes={sessionLength}
          decrementId={'session-decrement'}
          incrementId={'session-increment'}
          decrement={() => decrement(sessionLength, setSessionLength)}
          increment={() => increment(sessionLength, setSessionLength)}
          pause={pause}
        />
      </div>
      <Timer
        session={session}
        pause={pause}
        minutes={minutes}
        seconds={seconds}
        startStop={() => setPause(!pause)}
        reset={() => reset()}
      />
      <audio
        id='beep'
        preload='auto'
        ref={audio}
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      />
    </div>
  );
};

export default App;
