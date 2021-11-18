import React from 'react';
import * as Proptypes from 'prop-types';

import LogoOption from '../logo-option/inde';

import './style.scss';

export const AdminHeader = ({ text, icon, textClasses }) => {
  return (
    <div className="admin-header">
      <LogoOption
        logoClass="admin-header__logo"
        text={text}
        icon={icon}
        textClasses={`admin-header__title ${textClasses}`}
      />
    </div>
  );
};

AdminHeader.propTypes = {
  text: Proptypes.string.isRequired,
  icon: Proptypes.string,
  textClasses: Proptypes.string,
};

export default AdminHeader;
