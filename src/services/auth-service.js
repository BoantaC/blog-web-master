import { validateEmail, validatePassword } from '../helpers/validators';
import axios from 'axios';
import { AUTH_LOGIN } from '../constants/api';

export const authService = {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      if (validateEmail(username) && validatePassword(password)) {
        const body = {
          username: username,
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
