import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';

export const LogoOption = ({ height, width, icon, text, textClasses }) => {
  return (
    <div
      className="logo-option-container"
      style={{ height: `${height}px`, width: `${width}` }}
    >
        <FontAwesomeIcon icon={icon} className="logo-option-image" />
      <p className={textClasses}>{text}</p>
    </div>
  );
};

LogoOption.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  textClasses: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

LogoOption.defaultProps = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default LogoOption;
