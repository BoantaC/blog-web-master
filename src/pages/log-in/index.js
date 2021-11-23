import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { MAIL_ICON, PASSWORD_ICON } from '../../constants/icon';
import { authService } from '../../services/auth-service';

import { validateEmail, validatePassword } from '../../helpers/validators';
import Field from '../../components/field';
import Button from '../../components/button';

import './style.scss';

export const LogInPage = () => {
  const history = useHistory();
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [showErrorLogin, setShowErrorLogin] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(anyOfFieldsHasError);
  }, [usernameInputValue, passwordInputValue]);

  const anyOfFieldsHasError = () => {
    return (
      !validateEmail(usernameInputValue) ||
      !validatePassword(passwordInputValue)
    );
  };

  const onChangeUsernameInputHandler = (event) => {
    setUsernameInputValue(event.target.value);
    setShowErrorLogin(false);
  };

  const onChangePasswordInputHandler = (event) => {
    setPasswordInputValue(event.target.value);
    setShowErrorLogin(false);
  };

  const onLogin = () => {
    authService
      .login(usernameInputValue, passwordInputValue)
      .then((result) => {
        if (result?.success) {
          history.push('/admin');
        } else {
          setShowErrorLogin(true);
        }
      })
      .catch(() => {
        setShowErrorLogin(true);
      });
  };

  return (
    <div className="home-container">
      <div className="form-container">
        <Field
          value={usernameInputValue}
          onChange={onChangeUsernameInputHandler}
          label="Email address"
          type="text"
          icon={MAIL_ICON}
          validationFunction={validateEmail}
          errorMessage="This Email is invalid"
        />
        <Field
          value={passwordInputValue}
          onChange={onChangePasswordInputHandler}
          label="Password"
          type="password"
          icon={PASSWORD_ICON}
          validationFunction={validatePassword}
          errorMessage="This password is not valid"
        />

        <div className="form-container__login-error">
          {showErrorLogin && 'Invalid Credentials'}
        </div>
        <div className="form-container__actions">
          <Button disabled={hasError} onClick={onLogin} primary text="Submit" />
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
