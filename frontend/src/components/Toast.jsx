import PropTypes from "prop-types";
import Icon from "./Icon";
import { useEffect } from "react";

const styles = `
.dashboard-toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 18px;
  border: 1px solid var(--color-border);
  border-radius: 11px;
  background: white;
  box-shadow: 0 12px 36px #263c4b20;
  z-index: 200;
  max-width: calc(100vw - 32px);
  color: var(--color-primary);
  font-size: 14px;
}
.dashboard-toast.is-error {
  color: var(--color-danger);
  border-color: var(--color-danger-border);
}
.dashboard-toast > button {
  padding: 5px;
  color: var(--color-muted);
  margin-left: 8px;
}
@media (max-width: 600px) {
  .dashboard-toast {
  right: 16px;
  bottom: 16px;
}

}
`;

const Toast = ({ isShown, message, type, onclose }) => {
  useEffect(() => {
    if (!isShown) return;
    const timer = setTimeout(onclose, 4000);
    return () => clearTimeout(timer);
  }, [isShown, message, onclose]);
  if (!isShown) return null;
  return <div className={`dashboard-toast${type === "error" ? " is-error" : ""}`} role={type === "error" ? "alert" : "status"}><Icon name={type === "error" ? "exclamation-circle" : type === "delete" ? "trash" : "check2-circle"} /><style>{styles}</style><p>{message}</p><button onClick={onclose} aria-label="Dismiss notification"><Icon name="x-lg" /></button></div>;
};
Toast.propTypes = { isShown: PropTypes.bool, message: PropTypes.string, type: PropTypes.string, onclose: PropTypes.func.isRequired };
export default Toast;
