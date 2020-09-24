import React, { useRef } from 'react';

const DrumPad = ({ button, clipName, clip, onPadPress }) => {
  const audio = useRef(null);
  const drumPad = useRef(null);

  const handleClick = () => {
    onPadPress(drumPad.current, clipName, audio.current);
  };

  return (
    <div
      ref={drumPad}
      id={clipName}
      className='drum-pad'
      onClick={() => handleClick()}
    >
      {button}
      <audio ref={audio} id={button} className='clip' src={clip} />
    </div>
  );
};

export default DrumPad;
