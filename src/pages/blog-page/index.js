import React from 'react';

import { TITLE_MAIN_MENU_ICON } from '../../constants/icon';
import { MENU_OPTIONS } from '../../constants/menu-options';

import MenuComponent from '../../components/generic-menu';
import AdminHeader from '../../components/admin-header-app';

import './style.scss';

export const BlogPage = () => {
  return (
    <div className="blog-page">
      <div className="blog-page-container">
        <div className="blog-page-container__main-menu-container">
          <AdminHeader text="Blog" icon={TITLE_MAIN_MENU_ICON} />
          <MenuComponent options={MENU_OPTIONS} />
        </div>
      </div>
      <div className="blog-page-container__dashboard" />
      <div className="blog-page-container__profile-activities" />
    </div>
  );
};

export default BlogPage;
