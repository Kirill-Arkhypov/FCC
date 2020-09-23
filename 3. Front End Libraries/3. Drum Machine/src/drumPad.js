import React, { useRef } from 'react';

const DrumPad = ({ button, clipName, clip, displayClipName }) => {
  const audio = useRef(null);

  const handleClick = () => {
    audio.current.currentTime = 0;
    audio.current.play();
    displayClipName(clipName);
  };

  return (
    <div id={clipName} className='drum-pad' onClick={() => handleClick()}>
      {button}
      <audio ref={audio} id={button} className='clip' src={clip} />
    </div>
  );
};

export default DrumPad;
