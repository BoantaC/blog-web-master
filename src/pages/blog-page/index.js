import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { blogService } from '../../services/blog-service';
import AdminHeader from '../../components/header-app';

import './style.scss';

export const BlogPage = () => {
  const match = useRouteMatch();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    if (match.params.id) {
      getTheBlog(match.params.id);
    }
  }, []);

  const getTheBlog = (blogId) => {
    blogService
      .displayBlogById(blogId)
      .then((result) => {
        if (result?.success && blogId === result.data._id) {
          setBlog(result.data);
        } else {
        }
      })
      .catch(() => {});
  };

  return (
    <div className="blog__page">
      <AdminHeader text="BLOG" />
      <div className="blog__page__container" />
      <div className="blog__page__blog-container">
        <p className="blog__page__blog-container__title">{blog.title}</p>
        <p className="blog__page__blog-container__title">{blog.description}</p>
      </div>
    </div>
  );
};

export default BlogPage;
