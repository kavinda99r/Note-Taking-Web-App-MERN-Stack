import PropTypes from "prop-types";
import Icon from "./Icon";
import { useState } from "react";

const PasswordInput = ({ value, onChange, placeholder, id, autoComplete = "current-password", required = false }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="password-field flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        value={value}
        id={id}
        autoComplete={autoComplete}
        required={required}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      {isShowPassword ? (
        <Icon name="eye" label="Hide password"
          className="text-primary cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <Icon name="eye-slash" label="Show password"
          className="text-slate-400 cursor-pointer"
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
