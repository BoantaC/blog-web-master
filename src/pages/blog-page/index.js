import React from 'react';
import LogoOption from '../../components/logo-option/inde';
import { TITLE_MAIN_MENU_ICON } from '../../constants/icon';
import { menuOptions } from '../../constants/main-menu-options';

import './style.scss';

export const BlogPage = () => {
  const _renderOptions = (options) => {
    return (
      <div className="main-menu">
        {options.map((option, index) => (
          <div className="main-menu__option">
            <LogoOption
              textClasses={'main-menu__option__text'}
              key={index}
              icon={option.icon}
              text={option.label}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="blog-page">
      <div className="blog-page-container">
        <div className="blog-page-container__main-menu-container">
          <div className="logo-container">
            <LogoOption
              text="CONFIDENTIAL"
              icon={TITLE_MAIN_MENU_ICON}
              textClasses="main-menu__title"
            />
          </div>
          {_renderOptions(menuOptions)}
        </div>
      </div>
      <div className="blog-page-container__dashboard" />
      <div className="blog-page-container__profile-activities" />
    </div>
  );
};

export default BlogPage;
