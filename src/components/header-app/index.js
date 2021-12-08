import React, { useContext } from 'react';
import * as Proptypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import LogoOption from '../logo-option';
import { UserContext } from '../../App';

import './style.scss';

export const AdminHeader = ({ icon, textClasses }) => {
  const history = useHistory();

  const goToHomePage = () => {
    history.push('');
  };

  const { user } = useContext(UserContext);
  return (
    <>
      <div className="header__wrapper">
        <div className="header">
          <LogoOption
            logoClass="header__logo"
            text={`${user.firstName} ${user.lastName}` || ''}
            icon={icon}
            textClasses={`header__title ${textClasses}`}
          />
          <div className="header__wrapper__menu-container">
            <i className={`fa fa-home logo-option-image `} />
            <i className={`fa fa-envelope logo-option-image `} />
            <div className="divider" />
            <div className="social-media-menu-container">
              <i className={`logo-option-image fa fa-facebook-square`} />
              <i className={`logo-option-image fa fa-instagram`} />
              <i className={`logo-option-image fa fa-linkedin`} />
            </div>
          </div>
        </div>
      </div>

      {/*Mobile version*/}
      <div className="header-mobile__wrapper">
        <div className="header-mobile">
          <LogoOption
            logoClass="header-mobile__logo"
            text={`${user.firstName} ${user.lastName}` || ''}
            icon={icon}
            textClasses={`header-mobile__title ${textClasses}`}
          />
          <i
            className={`fa fa-bars logo-option-image header-mobile__menu-icon`}
          />
        </div>
      </div>
    </>
  );
};

AdminHeader.propTypes = {
  text: Proptypes.string.isRequired,
  icon: Proptypes.array,
  textClasses: Proptypes.string,
};

export default AdminHeader;
