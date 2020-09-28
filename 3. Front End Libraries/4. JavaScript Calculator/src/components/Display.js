import React from 'react';

const Display = ({ expression, value }) => {
  let displayValue = <div id='value'>{value}</div>;

  if (value && value.length > 12) {
    displayValue = (
      <div id='value' className={'reduced-display-font'}>
        {value}
      </div>
    );
  }

  if (value && value.length > 20) {
    displayValue = (
      <div id='value' className={'highly-reduced-display-font'}>
        {value}
      </div>
    );
  }

  return (
    <div id='display'>
      <div id='expression'>{expression}</div>
      {displayValue}
    </div>
  );
};

export default Display;
