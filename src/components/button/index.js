import React from 'react';
import * as Proptypes from 'prop-types';
import { cx } from '../../helpers/class-names';

import './style.scss';

export const Button = ({ classes, text, onClick, primary, secondary, disabled }) => {
  return (
    <div
      className={cx({
        'button-container': true,
        'primary-button': primary,
        'secondary-button': secondary,
        'disabled-button': disabled,
        [classes]: true
      })}
      onClick={onClick}
    >
      <p className="button-name">{text}</p>
    </div>
  );
};

Button.propTypes = {
  primary: Proptypes.bool,
  secondary: Proptypes.bool,
  disabled: Proptypes.bool,
  text: Proptypes.string.isRequired,
  onClick: Proptypes.func,
};

export default Button;
