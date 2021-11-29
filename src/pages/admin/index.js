import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  DELETE_ICON,
  EDIT_ICON,
  TITLE_MAIN_MENU_ICON,
} from '../../constants/icon';
import { BLOG_POSTS_TABLE_HEADERS } from './table-config';
import { ADMIN_MENU } from '../../constants/menu-options';
import { blogService } from '../../services/blog-service';

import MenuComponent from '../../components/generic-menu';
import Button from '../../components/button';
import AdminHeader from '../../components/admin-header-app';

import TableComponent from '../../components/table';

import './style.scss';

export const AdminPage = () => {
  const history = useHistory();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const onEditBlog = (blog) => {
    history.push(`/admin/blog/edit/${blog._id}`);
    console.log(blog);
    // blogService
    //   // .getBlogById(blog._id)
    //   .edit(blog._id)
    //   .then((result) => {
    //     if (result?.success) {
    //       // console.log(blog)
    //     } else {
    //       console.log('Error at deleting the blog');
    //     }
    //   })
    //   .catch(() => {});
  };

  const onDeleteBlog = (blog) => {
    blogService
      .deleteBlog(blog._id)
      .then((result) => {
        if (result?.success) {
          getAll();
        } else {
          console.log('Error at deleting the blog');
        }
      })
      .catch(() => {});
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
      .catch((error) => {
        // console.log('Error at getting the blog posts', error);
      });
  };

  return (
    <div className="admin-container">
      <AdminHeader text="Admin page" icon={TITLE_MAIN_MENU_ICON} />
      <div className="managing-container">
        <MenuComponent menuClass="admin-menu" options={ADMIN_MENU} />
        <div className="admin-manage-posts">
          <div className="button-container">
            <Button
              href={'http://localhost:3000/admin/create'}
              secondary
              text="Add post"
              onClick={onAddPost}
            />
          </div>
          <div className="manage-posts-container">
            <TableComponent
              actions={BLOG_TABLE_ACTIONS}
              tableHeaders={BLOG_POSTS_TABLE_HEADERS}
              entities={blogs}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
