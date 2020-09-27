import React from 'react';

const Display = ({ expression, value }) => {
  return (
    <div id='display'>
      <div id='expression'>{expression}</div>
      <div id='value'>{value}</div>
    </div>
  );
};

export default Display;
