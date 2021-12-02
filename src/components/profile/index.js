import React, { useContext, useEffect, useState } from 'react';
import {
  validateEmail,
  validatePassword,
  validateText,
} from '../../helpers/validators';
import { useHistory } from 'react-router-dom';

import Button from '../button';
import Field from '../field';

import { MAIL_ICON, USER_ICON } from '../../constants/icon';
import { UserContext } from '../../App';

import './style.scss';

const Profile = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  const [aboutInput, setAboutInput] = useState('');
  const [nameValue, setNameValue] = useState('');

  const [showError, setShowError] = useState(false);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(anyOfFieldsHasError);
  }, [aboutInput, nameValue]);

  const goToAdminPage = () => {
    history.push('/admin');
  };

  const anyOfFieldsHasError = () => {
    return !validateEmail(aboutInput) || !validatePassword(nameValue);
  };

  const onChangeNameHandler = (event) => {
    setNameValue(event.target.value);
    setShowError(false);
  };

  const onChangeAboutInputHandler = (event) => {
    setAboutInput(event.target.value);
    setShowError(false);
  };

  //u can do map of that fields
  return (
    <div className="profile-page">
      <Field
        value={user.email}
        type="text"
        label="Email address"
        errorMessage="This Email is invalid"
        validationFunction={validateText}
        icon={MAIL_ICON}
        disabled
      />
      <Field
        label="FirstName"
        value={user.firstName}
        errorMessage="This Name is invalid"
        type="text"
        validationFunction={validateEmail}
        onChange={onChangeNameHandler}
        icon={USER_ICON}
      />
      <Field
        value={user.lastName}
        validationFunction={validateText}
        onChange={onChangeNameHandler}
        label="LastName"
        type="text"
        errorMessage="This Name is invalid"
        icon={USER_ICON}
      />
      <Field
        value={aboutInput}
        onChange={onChangeAboutInputHandler}
        label="About you"
        type="text"
        validationFunction={validateText}
        errorMessage="This About section must contain 128 letters minimum"
        isTextArea
        textAreaCols={50}
        textAreaRows={5}
      />
      <div className="profile-page__button-container">
        <Button
          text="Submit"
          primary
          classes="admin-content-container__button-container__button"
          disabled={hasError}
        />
        <Button
          text="Cancel"
          primary
          classes="admin-content-container__button-container__button"
          onClick={goToAdminPage}
        />
      </div>
      <div className="form-container__error">
        {showError && 'Invalid input'}
      </div>
    </div>
  );
};

export default Profile;
