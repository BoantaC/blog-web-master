import React from 'react';
import * as Proptypes from 'prop-types';
import { cx } from '../../helpers/class-names';

import './style.scss';

export const Button = ({
  classes,
  text,
  onClick,
  primary,
  secondary,
  disabled,
}) => {
  return (
    <div
      className={cx({
        'button-container': true,
        'secondary-button': secondary,
        'disabled-button': disabled,
        'primary-button': primary,
        [classes]: true,
      })}
      onClick={onClick}
    >
      <p className="button-name">{text}</p>
    </div>
  );
};

Button.propTypes = {
  text: Proptypes.string.isRequired,
  classes: Proptypes.string,
  disabled: Proptypes.bool,
  onclick: Proptypes.func,
  primary: Proptypes.bool,
  secondary: Proptypes.bool,
  onClick: Proptypes.func,
};

export default Button;
