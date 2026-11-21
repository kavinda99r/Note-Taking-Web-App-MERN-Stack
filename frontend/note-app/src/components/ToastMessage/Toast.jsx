import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import { useEffect } from "react";

const Toast = ({ isShown, message, type, onclose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onclose();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onclose]);

  return (
    <div
      className={`absolute top-20 right-6 transition-all duration-400 ${
        isShown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
          type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
        } after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "delete" ? (
              <Icon name="trash" label="Delete" className="text-xl text-red-500" />
            ) : (
              <Icon name="check-lg" label="Success" className="text-xl text-green-500" />
            )}
          </div>

          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  isShown: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.string,
  onclose: PropTypes.func.isRequired
};

export default Toast;
