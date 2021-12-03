import axios from 'axios';
import { EDIT_USER, GET_USER_BY_ID } from '../constants/api';

export const userService = {
  getOneById: (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(GET_USER_BY_ID(id))
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  edit: (userId, user) => {
    return new Promise((resolve, reject) => {
      axios
        .put(EDIT_USER(userId), user)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error('Error on Update', error);
          reject(error);
        });
    });
  },
};
