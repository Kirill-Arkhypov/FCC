import React, { useState, useEffect, useRef } from 'react';

import TimeLengthController from './TimeLengthController';
import Timer from './Timer';

const alarmSound =
  'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav';

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const [minutes, setMinutes] = useState(sessionLength);
  const [seconds, setSeconds] = useState(0);

  const [session, setSession] = useState(true);
  const [pause, setPause] = useState(true);

  const audio = useRef(null);

  useEffect(() => {
    if (session) {
      setMinutes(sessionLength);
      setSeconds(0);
    }
  }, [session, sessionLength]);

  useEffect(() => {
    if (!session) {
      setMinutes(breakLength);
      setSeconds(0);
    }
  }, [session, breakLength]);

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

  function tick() {
    if (minutes === 0 && seconds === 1) {
      setSession(!session);
      audio.current.play();
      return;
    }

    if (seconds === 0) {
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
        <TimeLengthController
          id={'break-length'}
          labelId={'break-label'}
          label={'Break Length'}
          minutes={breakLength}
          decrementId={'break-decrement'}
          incrementId={'break-increment'}
          decrement={() => setBreakLength(breakLength - 1)}
          increment={() => setBreakLength(breakLength + 1)}
          pause={pause}
        />
        <TimeLengthController
          id={'session-length'}
          labelId={'session-label'}
          label={'Session Length'}
          minutes={sessionLength}
          decrementId={'session-decrement'}
          incrementId={'session-increment'}
          decrement={() => setSessionLength(sessionLength - 1)}
          increment={() => setSessionLength(sessionLength + 1)}
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
      <audio id='beep' preload='auto' ref={audio} src={alarmSound} />
    </div>
  );
};

export default App;
