import React from 'react';
import PropTypes from 'prop-types';

const RenderImg = ({ alt, className, src, width, height }) => {
  return (
    <img
      className={className}
      src={src}
      width={width}
      height={height}
      alt={alt}
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
};

RenderImg.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

RenderImg.defaultProps = {
  alt: '',
  className: '',
  width: '100%',
  height: '100%',
};

export default RenderImg;
