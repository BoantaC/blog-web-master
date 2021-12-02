import axios from 'axios';
import { GET_USER_BY_ID } from '../constants/api';

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
};
