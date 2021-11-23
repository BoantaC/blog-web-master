const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = (email) => {
  if (!email?.length) {
    return false;
  }

  return EMAIL_REGEX.test(String(email).toLowerCase());
};

const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/;

export const validatePassword = (password) => {
  if (!password?.length) {
    return false;
  }

  return PASSWORD_REGEX.test(String(password));
};

const regExp = /[!0-9@#$%^&*()_+\-=[\]{};':"\\|,<>/?]/;

export const validateText = (name) => {
  return regExp.test(String(name).toLowerCase());
};
