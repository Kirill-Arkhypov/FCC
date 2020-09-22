import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import soundBank from './soundBank.js';
import DrumPad from './drumPad.js';
import './index.css';

const App = () => {
  const [clipName, setClipName] = useState('Drum Machine');

  const displayClipName = (clipName) => {
    setClipName(clipName);
  };

  useEffect(() => {
    const onKeyPress = (e) => {
      const audioId = e.key.toUpperCase();
      const audio = document.getElementById(audioId);
      const clipName = audio.parentNode.id;

      if (audio) {
        audio.play();
        displayClipName(clipName);
      }
    };

    document.addEventListener('keypress', onKeyPress);

    return () => {
      document.removeEventListener('keypress', onKeyPress);
    };
  }, []);

  return (
    <div id='drum-machine'>
      <div id='display'>{clipName}</div>
      <div className='container'>
        {soundBank.map(({ name, button, clip }) => {
          return (
            <DrumPad
              key={name}
              button={button}
              clipName={name}
              clip={clip}
              displayClipName={displayClipName}
            />
          );
        })}
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
