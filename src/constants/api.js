export const AUTH_LOGIN = `http://localhost:8081/api/user/auth/login`;

export const CREATE_BLOG = `http://localhost:8081/api/blog`;

export const GET_ALL_BLOGS = `http://localhost:8081/api/blog/get-all`;

export const GET_BLOG = `http://localhost:8081/api/blog`;

export const DELETE_BLOG = (blogId) =>
  `http://localhost:8081/api/blog/${blogId}`;

export const EDIT_BLOG = (blogId) => `http://localhost:8081/api/blog/${blogId}`;
