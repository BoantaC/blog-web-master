import React, { useState } from 'react';

import { MAIL_ICON, PASSWORD_ICON } from '../../constants/icon';

import { validateEmail, validatePassword } from '../../helpers/validators';
import Field from '../../components/field';
import Button from '../../components/button';

import './style.scss';

export const LogInPage = () => {
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');

  const onChangeUsernameInputHandler = (event) => {
    setUsernameInputValue(event.target.value);
  };

  const onChangePasswordInputHandler = (event) => {
    setPasswordInputValue(event.target.value);
  };

  return (
    <div className="home-container">
      <div className="form-container">
        <Field
          value={usernameInputValue}
          onChange={onChangeUsernameInputHandler}
          usernameText="Email address"
          type="text"
          icon={MAIL_ICON}
          validationFunction={validateEmail}
          errorMessage="This Email is invalid"
        />
        <Field
          value={passwordInputValue}
          onChange={onChangePasswordInputHandler}
          usernameText="Password"
          type="password"
          icon={PASSWORD_ICON}
          validationFunction={validatePassword}
          errorMessage="This password is not valid"
        />
        <Button text="Submit" />
      </div>
    </div>
  );
};

export default LogInPage;
