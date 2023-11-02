import PropTypes from "prop-types";

const Form = ({ label, value, onChange, placeholder, error, icon }) => {
  return (
    <form className="formTotal">
      <label className="sub_title">{label}</label>
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className={error ? "errorTotal" : ""}
      />
      <img src={icon} className="dollarIcon" alt="icon" />
      {error && <small className="error-message">enter only numbers</small>}
    </form>
  );
};
Form.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
};

export { Form };
