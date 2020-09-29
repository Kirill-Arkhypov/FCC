import React from 'react';

import './button.css';

const Button = ({ id, value, onClick }) => {
  return (
    <button id={id} onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

export default Button;
