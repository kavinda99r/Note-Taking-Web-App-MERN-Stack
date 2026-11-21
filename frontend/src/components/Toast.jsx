import PropTypes from "prop-types";
import Icon from "./Icon";
import { useEffect } from "react";
const Toast = ({ isShown, message, type, onclose }) => {
  useEffect(() => {
    if (!isShown) return;
    const timer = setTimeout(onclose, 4000);
    return () => clearTimeout(timer);
  }, [isShown, message, onclose]);
  if (!isShown) return null;
  return <div className={`dashboard-toast${type === "error" ? " is-error" : ""}`} role={type === "error" ? "alert" : "status"}><Icon name={type === "error" ? "exclamation-circle" : type === "delete" ? "trash" : "check2-circle"} /><p>{message}</p><button onClick={onclose} aria-label="Dismiss notification"><Icon name="x-lg" /></button></div>;
};
Toast.propTypes = { isShown: PropTypes.bool, message: PropTypes.string, type: PropTypes.string, onclose: PropTypes.func.isRequired };
export default Toast;
