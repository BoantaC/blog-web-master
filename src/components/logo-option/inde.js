import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';

export const LogoOption = ({
  logoClass,
  icon,
  text,
  textClasses,
  iconClass,
}) => {
  return (
    <div className={`${logoClass} logo-option-container`}>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={`logo-option-image ${iconClass}`}
        />
      )}
      <p className={textClasses}>{text}</p>
    </div>
  );
};

LogoOption.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.array,
  textClasses: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  logoClass: PropTypes.string,
};

export default LogoOption;
