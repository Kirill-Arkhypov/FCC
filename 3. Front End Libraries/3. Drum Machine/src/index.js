import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import soundBank from './soundBank.js';
import DrumPad from './drumPad.js';
import './index.css';

const colors = ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4'];
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

const App = () => {
  const [clipName, setClipName] = useState('Drum Machine');

  const displayClipName = (clipName) => {
    setClipName(clipName);
  };

  useEffect(() => {
    const onKeyPress = (e) => {
      const audioId = e.key.toUpperCase();
      const audio = document.getElementById(audioId);

      if (audio) {
        const clipName = audio.parentNode.id;
        const drumPad = audio.parentNode;

        // drumPad.style.color = '#000';
        drumPad.style.background = randomColor();
        drumPad.style.transform = 'scale(0.98)';
        setTimeout(() => {
          // drumPad.style.color = '#fff';
          drumPad.style.background = '#000';
          drumPad.style.transform = 'scale(1)';
        }, 150);

        audio.currentTime = 0;
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
