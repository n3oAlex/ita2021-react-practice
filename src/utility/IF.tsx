import PropTypes from "prop-types";

export const IF = ({ condition, children }) => {
  if (!condition) return null;
  return <>{children}</>;
};

IF.propTypes = {
  condition: PropTypes.bool,
  children: PropTypes.node,
};
