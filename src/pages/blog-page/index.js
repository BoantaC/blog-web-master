import React from 'react';

import { MENU_OPTIONS } from '../../constants/menu-options';

import MenuComponent from '../../components/generic-menu';
import AdminHeader from '../../components/admin-header-app';

import './style.scss';

export const BlogPage = () => {
  return (
    <div className="blog__page">
      <AdminHeader text="BLOG" />
      <div className="blog__page__container">
        <div className="admin-manager__menu">
          <MenuComponent
            menuClass="admin-menu__container"
            menuOptionClass="admin-menu__option"
            iconClass="admin-menu__icon"
            options={MENU_OPTIONS}
            textClass="admin-menu__text"
          />
        </div>
        <div className="blog-page-container__dashboard" />
        <div className="blog-page-container__profile-activities" />
      </div>
    </div>
  );
};

export default BlogPage;
