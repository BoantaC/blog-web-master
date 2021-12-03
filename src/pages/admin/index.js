import React, { useContext } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import AdminHeader from '../../components/admin-header-app';
import MenuComponent from '../../components/generic-menu';
import BlogsList from '../../components/blogs-list';
import Profile from '../../components/profile';

import { UserContext } from '../../App';
import { BLOG_ICON, PROFILE_ICON } from '../../constants/icon';

import './style.scss';

export const AdminPage = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { user } = useContext(UserContext);

  const goToBlogPage = () => {
    history.push('/blog');
  };

  const goToProfile = () => {
    history.push(`/admin/profile/${user._id}`);
  };

  const MENU_ACTIONS = [
    {
      icon: BLOG_ICON,
      onClick: goToBlogPage,
      label: 'Blog',
    },
    {
      icon: PROFILE_ICON,
      onClick: goToProfile,
      label: 'Profile',
    },
  ];

  return (
    <div className="admin-manager__page">
      <AdminHeader text="ADMIN MANAGER" />
      <div className="admin-manager__container">
        <div className="admin-manager__menu">
          <MenuComponent
            menuClass="admin-menu__container"
            menuOptionClass="admin-menu__option"
            iconClass="admin-menu__icon"
            options={MENU_ACTIONS}
            textClass="admin-menu__text"
          />
        </div>
        <div className="admin-manager__manage-posts">
          <Switch>
            <Route path={`${path}/profile`} component={Profile} />
            <Route path={`${path}`} component={BlogsList} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
