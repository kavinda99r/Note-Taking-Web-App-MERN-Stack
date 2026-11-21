import { Link } from "react-router-dom";
import Icon from "./Icon";
const ProfileInfo = () => <Link to="/account" className="justify-self-end block rounded-full [&:hover_.dashboard-avatar]:bg-highlight [&:hover_.dashboard-avatar]:border-focus max-[600px]:[grid-column:2] max-[600px]:[grid-row:1]" aria-label="Open account settings" title="Account settings">
    <span className="dashboard-avatar shrink-0 grid place-items-center bg-soft border border-border text-primary rounded-full font-semibold w-[42px] h-[42px] text-[22px]"><Icon name="person" /></span>
  </Link>;
export default ProfileInfo;
