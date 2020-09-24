import React, { useState, useEffect } from 'react';

import soundBank from '../assets/soundBank.js';
import randomColor from '../assets/randomColor.js';

import Display from './Display.js';
import DrumPad from './DrumPad.js';

import '../index.css';

const App = () => {
  const [clipName, setClipName] = useState('Drum Machine');

  const padPressAnimation = (node) => {
    node.style.background = randomColor();
    node.style.transform = 'scale(0.98)';
    setTimeout(() => {
      node.style.background = '';
      node.style.transform = '';
    }, 150);
  };

  const onPadPress = (drumPad, clipName, audio) => {
    padPressAnimation(drumPad);
    setClipName(clipName);
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
      <div className='container'>
        <Display clipName={clipName} />
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

export default App;
