import React from 'react';
import PropTypes from 'prop-types';
import LogoOption from '../logo-option/inde';

import './style.scss';

export const MenuComponent = ({ options, menuClass }) => {
  const _renderOptions = (options) => {
    return (
      <div className={`${menuClass}`}>
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

  return <div>{_renderOptions(options)} </div>;
};

MenuComponent.propTypes = {
  options: PropTypes.array.isRequired,
  menuClass: PropTypes.string,
};

export default MenuComponent;
