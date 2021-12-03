import React, { useState } from 'react';
import * as Proptypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  INVISIBLE_PASSWORD_ICON,
  VISIBLE_PASSWORD_ICON,
} from '../../constants/icon';

import './style.scss';

export const Field = ({
  validationFunction,
  errorMessage,
  textAreaRows,
  textAreaCols,
  fieldClass,
  isTextArea,
  disabled,
  onChange,
  label,
  value,
  type,
  icon,
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
        {validationFunction(value) !== undefined &&
        !validationFunction(value) &&
        errorMessage
          ? errorMessage || 'Invalid Input'
          : ''}
      </span>
    );
  };

  return (
    <div className={`field ${fieldClass}`}>
      <p className="field__label">{label}</p>
      <div className="field__container">
        {isTextArea ? (
          <textarea
            cols={textAreaCols}
            rows={textAreaRows}
            className="field__input"
            placeholder={label}
            onChange={(e) => onChange(e.target.value)}
            value={value}
          />
        ) : (
          <input
            disabled={disabled}
            className={`field__input`}
            type={
              type !== 'password'
                ? 'text'
                : visibilityPassword === true
                ? 'password'
                : 'text'
            }
            placeholder={label}
            onChange={(e) => onChange(e.target.value)}
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
  label: Proptypes.string.isRequired,
  value: Proptypes.string,
  validationFunction: Proptypes.func,
  type: Proptypes.string.isRequired,
  errorMessage: Proptypes.string,
  textAreaRows: Proptypes.number,
  textAreaCols: Proptypes.number,
  isTextArea: Proptypes.bool,
  onChange: Proptypes.func,
  icon: Proptypes.array,
};

Field.defaultProps = {
  validationFunction: () => {},
};

export default Field;
