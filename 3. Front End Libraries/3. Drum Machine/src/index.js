import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import soundBank from './soundBank.js';
import DrumPad from './drumPad.js';
import randomColor from './randomColor.js';
import './index.css';

const App = () => {
  const [clipName, setClipName] = useState('Drum Machine');

  const displayClipName = (clipName) => {
    setClipName(clipName);
  };

  const padPressAnimation = (drumPad) => {
    drumPad.style.background = randomColor();
    drumPad.classList.add('active');
    setTimeout(() => {
      drumPad.style.background = '';
      drumPad.classList.remove('active');
    }, 150);
  };

  const onPadPress = (drumPad, clipName, audio) => {
    padPressAnimation(drumPad);
    displayClipName(clipName);
    audio.currentTime = 0;
    audio.play();
  };

  const onKeyPress = (e) => {
    const audioId = e.key.toUpperCase();
    const audio = document.getElementById(audioId);

    if (audio) {
      const drumPad = audio.parentNode;
      const clipName = drumPad.id;

      onPadPress(drumPad, clipName, audio);
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', onKeyPress);

    return () => {
      document.removeEventListener('keypress', onKeyPress);
    };
  });

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
              onPadPress={onPadPress}
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
