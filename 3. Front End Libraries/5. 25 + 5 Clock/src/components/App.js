import React from 'react';

import TimerLengthControl from './TimerLengthControl';
import Timer from './Timer';

const App = () => {
  return (
    <div id='container'>
      <h1 id='main-label'>25 + 5 Clock</h1>
      <div id='length-controllers'>
        <TimerLengthControl
          labelId={'break-label'}
          label={'Break Length'}
          length={5}
          decrement={'break-decrement'}
          increment={'break-increment'}
        />
        <TimerLengthControl
          labelId={'session-label'}
          label={'Session Length'}
          length={25}
          decrement={'session-decrement'}
          increment={'session-increment'}
        />
      </div>
      <Timer session={true} minutes={25} seconds={0} />
    </div>
  );
};

export default App;
