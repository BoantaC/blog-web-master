import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { MAIL_ICON, PASSWORD_ICON } from '../../constants/icon';
import { authService } from '../../services/auth-service';
import { UserContext } from '../../App';

import { validateEmail, validatePassword } from '../../helpers/validators';

import Button from '../../components/button';

import Field from '../../components/field';

import './style.scss';

export const LogInPage = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const [passwordInputValue, setPasswordInputValue] =
    useState('Parola123@....');
  const [emailInputValue, setEmailInputValue] = useState(
    'ing.boanta.ciprian@gmail.com'
  );

  const [showErrorLogin, setShowErrorLogin] = useState(false);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(anyOfFieldsHasError);
  }, [emailInputValue, passwordInputValue]);

  const anyOfFieldsHasError = () => {
    return (
      !validateEmail(emailInputValue) || !validatePassword(passwordInputValue)
    );
  };

  const onChangeEmailInputHandler = (event) => {
    setEmailInputValue(event.target.value);
    setShowErrorLogin(false);
  };

  const onChangePasswordInputHandler = (event) => {
    setPasswordInputValue(event.target.value);
    setShowErrorLogin(false);
  };

  const onLogin = () => {
    authService
      .login(emailInputValue, passwordInputValue)
      .then((result) => {
        if (result?.success) {
          setUser(result.data);
          // We need that when the user refreshes the page and is logged in, to keep it, so we store this in localstorage based on his id
          localStorage.setItem('userId', result.data._id);
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
          value={emailInputValue}
          onChange={onChangeEmailInputHandler}
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

        <div className="form-container__error">
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
