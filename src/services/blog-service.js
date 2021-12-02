import {
  DELETE_BLOG,
  EDIT_BLOG,
  GET_ALL_BLOGS,
  CREATE_BLOG,
  GET_BLOG,
} from '../constants/api';
import axios from 'axios';

export const blogService = {
  create: (body) => {
    return new Promise((resolve, reject) => {
      axios
        .post(CREATE_BLOG, body)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error('Error on create title and description', error);
          reject(error);
        });
    });
  },

  getById: (blogId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${GET_BLOG}/${blogId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error('Error at getting the blog', error);
          reject(error);
        });
    });
  },

  edit: (blogId, blog) => {
    return new Promise((resolve, reject) => {
      axios
        .put(EDIT_BLOG(blogId), blog)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error('Error on create title and description', error);
          reject(error);
        });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      axios
        .get(GET_ALL_BLOGS)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error('Error at getting all the blog posts', error);
          reject(error);
        });
    });
  },

  delete: (blogId) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(DELETE_BLOG(blogId))
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error('Error deleting this blog', error);
          reject(error);
        });
    });
  },
};
