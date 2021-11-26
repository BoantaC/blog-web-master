import { validateEmail, validatePassword } from '../helpers/validators';
import { AUTH_LOGIN } from '../constants/api';
import axios from 'axios';

export const authService = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      if (validateEmail(email) && validatePassword(password)) {
        const body = {
          email: email,
          password: password,
        };

        axios
          .post(AUTH_LOGIN, body)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.error('Error on login:', error);
            reject(error);
          });
      } else {
        reject('Invalid Credentials');
      }
    });
  },
};
