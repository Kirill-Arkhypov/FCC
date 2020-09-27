import React from 'react';

const Button = ({ id, value, onClick }) => {
  const handleClick = (value) => {
    onClick(value);
  };

  return (
    <button id={id} onClick={() => handleClick(value)}>
      {value}
    </button>
  );
};

export default Button;
