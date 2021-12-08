import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export const LogoOption = ({
  textClasses,
  text,
  icon,
  logoClass,
  iconClass,
}) => {
  return (
    <div className={`${logoClass} logo-option-container`}>
      {icon && (
        <i className={`logo-option-container__image ${iconClass} ${icon}`} />
      )}
      <p className={textClasses}>{text}</p>
    </div>
  );
};

LogoOption.propTypes = {
  textClasses: PropTypes.string,
  text: PropTypes.string.isRequired,
  icon: PropTypes.array,
  logoClass: PropTypes.string,
  iconClass: PropTypes.string,
};

export default LogoOption;
