import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import soundBank from './soundBank.js';
import DrumPad from './drumPad.js';
import './index.css';

const App = () => {
  const [clipName, setClipName] = useState('Drum Machine');

  const showName = (e) => {
    setClipName(e);
  };

  return (
    <div id='drum-machine'>
      <div id='display'>{clipName}</div>
      {soundBank.map((e) => {
        const audio = new Audio(e.clip);
        return (
          <DrumPad
            key={e.name}
            button={e.button}
            name={e.name}
            clip={e.clip}
            audio={audio}
            handleClick={showName}
          />
        );
      })}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
