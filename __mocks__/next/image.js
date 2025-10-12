const React = require("react");

const NextImage = ({ src, alt, fill: _fill, ...props }) => {
  return <img src={src} alt={alt} {...props} />;
};

module.exports = NextImage;
module.exports.default = NextImage;
module.exports.__esModule = true;
