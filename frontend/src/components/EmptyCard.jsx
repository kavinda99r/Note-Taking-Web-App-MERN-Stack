import PropTypes from "prop-types";
import Icon from "./Icon";

const EmptyCard = ({ icon, message }) => (
  <div className="flex flex-col items-center justify-center h-[550px]">
    <Icon name={icon} className="text-[140px] opacity-30" />
    <p className="w-1/2 text-sm font-medium text-gray-400 text-center leading-7 mt-5 mb-20">{message}</p>
  </div>
);

EmptyCard.propTypes = {
  icon: PropTypes.string.isRequired,
  message: PropTypes.string
};

export default EmptyCard;
