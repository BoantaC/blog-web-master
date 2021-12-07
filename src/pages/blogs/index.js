import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import AdminHeader from '../../components/header-app';

import { blogService } from '../../services/blog-service';

import './style.scss';

export const Blogs = () => {
  const [blogs, setBlogs] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    getAllBlogsDisplayed();
  }, []);

  const onShowBlog = (id) => {
    history.push(`/client/blog/${id}`);
  };

  const getAllBlogsDisplayed = () => {
    blogService
      .getAllBlogsDisplayed()
      .then((result) => {
        if (result?.success) {
          setBlogs(result.data);
        } else {
          console.log('No blog posts found');
        }
      })
      .catch(() => {
        console.log('Error at getting the blog posts');
      });
  };

  const _renderBlogs = () => {
    return (
      <div className="blogs-page__client-manager-container">
        {blogs?.length ? (
          blogs.map((blog, index) => (
            <div
              onClick={() => onShowBlog(blog._id)}
              className="blogs-page__client-manager-container__div"
              key={index}
            >
              <p className="blogs-page__client-manager-container__paragraphs">
                {blog.title}
              </p>
              <p className="blogs-page__client-manager-container__paragraphs">
                {blog.description}
              </p>
            </div>
          ))
        ) : blogs?.length === 0 ? (
          <div>No blog posts</div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  };

  return (
    <div className="blogs-page">
      <AdminHeader text="Client Blogs" />
      <div className="blogs-page__container">{_renderBlogs()}</div>
    </div>
  );
};

Blogs.propTypes = {
  blogsOptions: PropTypes.array.isRequired,
};

export default Blogs;
