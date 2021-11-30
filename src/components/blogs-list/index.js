import React, { useEffect, useState,  } from 'react';
import { useHistory } from 'react-router-dom';
import { BLOG_POSTS_TABLE_HEADERS } from '../../pages/admin/table-config';
import { DELETE_ICON, EDIT_ICON } from '../../constants/icon';
import { blogService } from '../../services/blog-service';

import TableComponent from '../table';
import Button from '../button';

const BlogsList = () => {
  const history = useHistory();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    blogService
      .getAll()
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

  const onDeleteBlog = (blog) => {
    blogService
      .delete(blog._id)
      .then((result) => {
        if (result?.success) {
          getAll();
        } else {
          console.log('Error at deleting the blog');
        }
      })
      .catch(() => {});
  };

  const onEditBlog = (blog) => {
    history.push(`/admin/blog/edit/${blog._id}`);
  };

  const onAddPost = () => {
    history.push('/admin/blog/create');
  };

  const BLOG_TABLE_ACTIONS = [
    {
      title: 'Edit Blog',
      onClick: onEditBlog,
      icon: EDIT_ICON,
    },
    {
      title: 'Delete Blog',
      onClick: onDeleteBlog,
      icon: DELETE_ICON,
    },
  ];

  return (
    <>
      <div className="admin-manager__blogs-container">
        <TableComponent
          actions={BLOG_TABLE_ACTIONS}
          tableHeaders={BLOG_POSTS_TABLE_HEADERS}
          entities={blogs}
        />
      </div>
      <div className="admin-manager__button-container">
        <Button secondary text="Add post" onClick={onAddPost} />
      </div>
    </>
  );
};

export default BlogsList;
