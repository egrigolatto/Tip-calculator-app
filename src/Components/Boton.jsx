import PropTypes from "prop-types";

const Boton = ({ selected, onClick, percentage }) => {
  return (
    <button className={selected ? "selected" : ""} onClick={onClick}>
      {percentage}%
    </button>
  );
};
Boton.propTypes = {
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  percentage: PropTypes.number.isRequired,
};

export { Boton };
