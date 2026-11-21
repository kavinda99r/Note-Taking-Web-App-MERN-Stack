import PropTypes from "prop-types";
import Icon from "./Icon";
import { useEffect } from "react";
const Toast = ({
  isShown,
  message,
  type,
  onclose
}) => {
  useEffect(() => {
    if (!isShown) return;
    const timer = setTimeout(onclose, 4000);
    return () => clearTimeout(timer);
  }, [isShown, message, onclose]);
  if (!isShown) return null;
  return <div className={`fixed right-6 bottom-6 flex items-center gap-3 py-[15px] px-[18px] border border-border rounded-[11px] bg-white shadow-[0_12px_36px_#263c4b20] z-[200] max-w-[calc(100vw_-_32px)] text-primary text-[14px] [&.is-error]:text-danger [&.is-error]:border-danger-border [&_>_button]:p-[5px] [&_>_button]:text-muted [&_>_button]:ml-2 max-[600px]:right-4 max-[600px]:bottom-4 ${type === "error" ? "is-error" : ""}`} role={type === "error" ? "alert" : "status"}><Icon name={type === "error" ? "exclamation-circle" : type === "delete" ? "trash" : "check2-circle"} /><p>{message}</p><button onClick={onclose} aria-label="Dismiss notification"><Icon name="x-lg" /></button></div>;
};
Toast.propTypes = {
  isShown: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.string,
  onclose: PropTypes.func.isRequired
};
export default Toast;
