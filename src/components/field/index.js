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
  label,
  type,
  icon,
  value,
  validationFunction,
  errorMessage,
  fieldClass,
  isTextArea,
  textAreaRows,
  textAreaCols,
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
      <span className="field__error-msg">
        {value.length !== 0 &&
        validationFunction(value) !== undefined &&
        !validationFunction(value) &&
        errorMessage
          ? errorMessage || 'Invalid Input'
          : ''}
      </span>
    );
  };

  return (
    <div className="field">
      <p className="field__label">{label}</p>
      <div className="field__container">
        {isTextArea ? (
          <textarea
            cols={textAreaCols}
            rows={textAreaRows}
            className={`field__input ${fieldClass}`}
            placeholder={label}
            onChange={onChange}
            value={value}
          />
        ) : (
          <input
            className={`field__input ${fieldClass}`}
            type={
              type !== 'password'
                ? 'text'
                : visibilityPassword === true
                ? 'password'
                : 'text'
            }
            placeholder={label}
            onChange={onChange}
            value={value}
          />
        )}
        {_renderPasswordEye()}
        {icon && <FontAwesomeIcon className="field__icon" icon={icon} />}
      </div>
      {_renderErrorMessage()}
    </div>
  );
};

Field.propTypes = {
  onChange: Proptypes.func,
  label: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
  icon: Proptypes.array,
  value: Proptypes.string.isRequired,
  validationFunction: Proptypes.func,
  errorMessage: Proptypes.string,
  isTextArea: Proptypes.bool,
  textAreaRows: Proptypes.number,
  textAreaCols: Proptypes.number,
};

export default Field;
