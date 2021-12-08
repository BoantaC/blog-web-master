import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AdminHeader from '../../components/header-app';

import { blogService } from '../../services/blog-service';
import {
  SECTION_FEATURED_TITLE,
  SECTION_RECENT_TITLE,
} from '../../constants/text-constants';

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

  const _renderBlogs = (renders) => {
    return (
      <div className="blogs-page__blog">
        {blogs?.length ? (
          blogs.slice(0, renders).map((blog, index) => (
            <div
              onClick={() => onShowBlog(blog._id)}
              className="blogs-page__blog__container"
              key={index}
            >
              <p className="blogs-page__blog__title">{blog.title}</p>
              <p className="blogs-page__blog__description">
                {blog.description}
              </p>
              <div className="blogs-page__blog__action">
                <p className="blogs-page__blog__action__read-more">
                  {'Read more'}
                </p>
                <i
                  className={`blogs-page__blog__action__share-icon fas fa-draw-polygon`}
                />
              </div>
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
    <>
      <div className="blogs-page">
        <AdminHeader text="Ciprian Boanta" />
        <div className="blogs-page__container__wrapper">
          <div className="blogs-page__container">
            <p className="blogs-page__container__title">
              {SECTION_FEATURED_TITLE}
            </p>
            <div className="blogs-page__container__divider" />
            {_renderBlogs(2)}
            <p className="blogs-page__container__title">
              {SECTION_RECENT_TITLE}
            </p>
            <div className="blogs-page__container__divider" />
            {_renderBlogs()}
          </div>
        </div>
      </div>
      <div className="mobile-blogs-page">
        <AdminHeader text="Ciprian Boanta" />
        <div className="mobile-blogs-container">
          <div className="mobile-blogs-container__menu-container">
            <i className={`mobile-blogs-container__logo fa fa-home`} />
            <i className={`mobile-blogs-container__logo fa fa-envelope`} />{' '}
            <div className="mobile-blogs-container__divider" />
            <i
              className={`mobile-blogs-container__logo fa fa-facebook-square`}
            />
            <i className={`mobile-blogs-container__logo fa fa-instagram`} />
            <i className={`mobile-blogs-container__logo fa fa-linkedin`} />
          </div>
        </div>
      </div>
    </>
  );
};

Blogs.propTypes = {
  blogsOptions: PropTypes.array.isRequired,
};

export default Blogs;
