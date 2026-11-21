import PropTypes from "prop-types";
const Icon = ({
  name,
  label,
  className = "",
  onClick
}) => {
  const glyph = <i className={`bi bi-${name}`} aria-hidden="true" />;
  return onClick ? <button type="button" aria-label={label} className={`inline-flex items-center justify-center ${className}`} onClick={onClick}>
      {glyph}
    </button> : <span aria-hidden="true" className={`inline-flex items-center justify-center ${className}`}>{glyph}</span>;
};
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};
export default Icon;
