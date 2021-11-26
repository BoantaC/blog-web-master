import { validateText } from '../helpers/validators';
import { CREATE_BLOG } from '../constants/api';
import axios from 'axios';

export const blogPostService = {
  createBlog: (title, description) => {
    return new Promise((resolve, reject) => {
      if (validateText(title) && validateText(description)) {
        const body = {
          title: title,
          description: description,
        };

        axios
          .post(CREATE_BLOG, body)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.error('Error on create title and description', error);
            reject(error);
          });
      } else {
        reject('invalid inputs');
      }
    });
  },
};
