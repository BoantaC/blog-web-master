import React, { useContext } from 'react';
import * as Proptypes from 'prop-types';
import { UserContext } from '../../App';

import LogoOption from '../logo-option/inde';

import { USER_ICON } from '../../constants/icon';

import './style.scss';

export const AdminHeader = ({ text, icon, textClasses }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="admin-header">
      <LogoOption
        logoClass="admin-header__logo"
        text={text}
        icon={icon}
        textClasses={`admin-header__title ${textClasses}`}
      />
      <LogoOption
        logoClass="admin-header__user-logged-in"
        text={user.firstName}
        icon={USER_ICON}
        textClasses={`admin-header__title ${textClasses}`}
      />
    </div>
  );
};

AdminHeader.propTypes = {
  text: Proptypes.string.isRequired,
  icon: Proptypes.array,
  textClasses: Proptypes.string,
};

export default AdminHeader;
