import PropTypes from "prop-types";
import Icon from "./Icon";
import { useState } from "react";

const styles = `
.password-toggle {
  color: var(--color-muted);
}
`;


const PasswordInput = ({ value, onChange, placeholder, id, autoComplete = "current-password", required = false }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="password-field">
      <style>{styles}</style>
      <input
        value={value}
        id={id}
        autoComplete={autoComplete}
        required={required}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}

      />

      {isShowPassword ? (
        <Icon name="eye" label="Hide password"
          className="text-primary cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <Icon name="eye-slash" label="Show password"
          className="password-toggle cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  );
};

PasswordInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  autoComplete: PropTypes.string,
  required: PropTypes.bool
};

export default PasswordInput;
