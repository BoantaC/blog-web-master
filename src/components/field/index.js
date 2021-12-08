import React, { useState } from 'react';
import * as Proptypes from 'prop-types';

import LogoOption from '../logo-option';

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
      <i
        onClick={() => {
          setVisibilityPassword(!visibilityPassword);
        }}
        className={`field__password-icon ${
          visibilityPassword ? ` fa fa-eye-slash` : `fa fa-eye`
        }`}
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
      <LogoOption
        textClasses="field__label"
        icon={icon}
        className="field__label"
        text={label}
      />
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
        {icon && <i className={`field__icon ${icon}`} />}
      </div>
      {_renderErrorMessage()}
    </div>
  );
};

Field.propTypes = {
  validationFunction: Proptypes.func,
  label: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
  errorMessage: Proptypes.string,
  textAreaRows: Proptypes.number,
  textAreaCols: Proptypes.number,
  fieldClass: Proptypes.string,
  isTextArea: Proptypes.bool,
  disabled: Proptypes.bool,
  onChange: Proptypes.func,
  value: Proptypes.string,
  icon: Proptypes.array,
};

export default Field;
