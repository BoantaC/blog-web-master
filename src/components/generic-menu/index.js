import React from 'react';
import PropTypes from 'prop-types';
import LogoOption from '../logo-option';

import './style.scss';

export const MenuComponent = ({
  options,
  menuClass,
  menuOptionClass,
  textClass,
  iconClass,
}) => {
  const _renderOptions = (options) => {
    return (
      <div className={`${menuClass}`}>
        {options.map((option, index) => (
          <div
            onClick={() => option.onClick()}
            key={index}
            className={`${menuOptionClass} main-menu__option`}
          >
            <LogoOption
              icon={option.icon}
              textClasses={`${textClass} main-menu__option__text`}
              text={option.label}
              iconClass={iconClass}
            />
          </div>
        ))}
      </div>
    );
  };

  return <div>{_renderOptions(options)} </div>;
};

MenuComponent.propTypes = {
  options: PropTypes.array.isRequired,
  menuClass: PropTypes.string,
  menuOptionClass: PropTypes.string,
  textClass: PropTypes.string,
  iconClass: PropTypes.string,
};

export default MenuComponent;
