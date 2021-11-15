import React, { useState } from 'react';
import * as Proptypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  INVISIBLE_PASSWORD_ICON,
  VISIBLE_PASSWORD_ICON,
} from '../../constants/icon';

import './style.scss';

export const Field = ({
  onChange,
  usernameText,
  type,
  icon,
  value,
  validationFunction,
  errorMessage,
}) => {
  const [visibilityPassword, setVisibilityPassword] = useState(false);

  const _renderPasswordEye = () => {
    return type === 'password' ? (
      <FontAwesomeIcon
        onClick={() => {
          setVisibilityPassword(!visibilityPassword);
        }}
        icon={
          visibilityPassword ? INVISIBLE_PASSWORD_ICON : VISIBLE_PASSWORD_ICON
        }
        className="field__password-icon"
      />
    ) : (
      ''
    );
  };

  const _renderErrorMessage = () => {
    return (
      value.length !== 0 &&
      validationFunction(value) !== undefined &&
      !validationFunction(value) &&
      errorMessage && (
        <span className="field__error-msg">
          {errorMessage || 'Invalid Input'}
        </span>
      )
    );
  };

  return (
    <div className="field">
      <p className="field__label">{usernameText}</p>
      <div className="field__container">
        <input
          className="field__input"
          type={
            type !== 'password'
              ? 'text'
              : visibilityPassword === true
              ? 'password'
              : 'text'
          }
          placeholder={usernameText}
          onChange={onChange}
          value={value}
        />

        {_renderPasswordEye()}
        <FontAwesomeIcon className="field__icon" icon={icon} />
      </div>
      {_renderErrorMessage()}
    </div>
  );
};

Field.propTypes = {
  onChange: Proptypes.func,
  usernameText: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
  icon: Proptypes.array,
  value: Proptypes.string.isRequired,
  validationFunction: Proptypes.func.isRequired,
  errorMessage: Proptypes.string.isRequired,
};

export default Field;
