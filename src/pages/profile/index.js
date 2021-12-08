import React, { useContext, useEffect, useState } from 'react';
import { validateText } from '../../helpers/validators';
import { useHistory } from 'react-router-dom';

import { userService } from '../../services/user-service';
import { UserContext } from '../../App';

import Button from '../../components/button';
import Field from '../../components/field';

import './style.scss';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const [userForm, setUserForm] = useState(DEFAULT_FIELDS_INPUT);
  const [showError, setShowError] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setUserForm({
      firstName: user.firstName || DEFAULT_FIELDS_INPUT.firstName,
      lastName: user.lastName || DEFAULT_FIELDS_INPUT.lastName,
      about: user.about || DEFAULT_FIELDS_INPUT.about,
      email: user.email || DEFAULT_FIELDS_INPUT.email,
    });
  }, [user]);

  const onFormChange = (value, property) => {
    console.log(value);
    setUserForm({ ...userForm, [property]: value });
    setHasError({ ...hasError, [property]: false });
  };

  useEffect(() => {
    setHasError(anyOfFieldsHasError);
  }, [userForm]);

  const goToAdminPage = () => {
    history.push('/admin');
  };

  const anyOfFieldsHasError = () => {
    return !validateText(userForm);
  };

  const onUpdate = () => {
    delete userForm.email;

    userService
      .edit(user._id, userForm)
      .then((result) => {
        if (result?.success && result.data._id === user._id) {
          setUser({ ...user, ...userForm });
          goToAdminPage();
        } else {
          setShowError(true);
          goToAdminPage();
        }
      })
      .catch(() => {
        setShowError(true);
      });
  };

  return (
    <div className="profile-page">
      <Field
        value={userForm.email}
        type="text"
        label="Email address"
        icon={`fa fa-envelope`}
        validationFunction={validateText}
        disabled
      />
      <Field
        label="First name"
        value={userForm.firstName}
        errorMessage="This Name is invalid"
        type="text"
        validationFunction={validateText}
        onChange={(v) => onFormChange(v, 'firstName')}
        icon={`fa fa-user`}
      />
      <Field
        label="Last name"
        value={userForm.lastName}
        errorMessage="This Name is invalid"
        type="text"
        validationFunction={validateText}
        onChange={(p) => onFormChange(p, 'lastName')}
        icon={`fa fa-user`}
      />
      <Field
        label="About you"
        value={userForm.about}
        errorMessage="This About section must contain 128 letters minimum"
        type="text"
        onChange={(p) => onFormChange(p, 'about')}
        validationFunction={validateText}
        isTextArea
        textAreaCols={50}
        textAreaRows={5}
      />
      <div className="profile-page__button-container">
        <Button
          text="Update"
          primary
          classes="profile-page__button-container__button"
          disabled={hasError}
          onClick={onUpdate}
        />
        <Button
          text="Cancel"
          primary
          classes="profile-page__button-container__button"
          onClick={goToAdminPage}
        />
      </div>
      <div className="form-container__error">
        {showError && 'Invalid input'}
      </div>
    </div>
  );
};

const DEFAULT_FIELDS_INPUT = {
  firstName: '',
  lastName: '',
  about: '',
  email: '',
};

export default Profile;
