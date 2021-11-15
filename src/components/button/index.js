import React from 'react';

import './style.scss';

export const Button = ({ text }) => {
  return (
    <div className="button">
      <p className="button__name">{text}</p>
    </div>
  );
};

export default Button;
