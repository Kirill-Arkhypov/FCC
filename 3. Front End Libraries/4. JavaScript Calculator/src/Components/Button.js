import React from 'react';

const Button = ({ id, value, handleClick }) => {
  return (
    <button id={id} onClick={() => handleClick(value)}>
      {value}
    </button>
  );
};

export default Button;
