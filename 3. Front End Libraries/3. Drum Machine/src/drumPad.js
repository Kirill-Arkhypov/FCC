import React, { useEffect } from 'react';

const DrumPad = ({ button, name, clip, handleClick, audio, onKeyPress }) => {
  const onClick = (e) => {
    audio.play();
    handleClick(e);
  };

  onKeyPress = (e) => {
    if (e.key === button.toLowerCase()) {
      onClick(name);
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', onKeyPress);

    return () => {
      document.removeEventListener('keypress', onKeyPress);
    };
  });

  return (
    <figure className='drum-pad'>
      <button onClick={() => onClick(name)}>{button}</button>
      <audio src={clip}></audio>
    </figure>
  );
};

export default DrumPad;
