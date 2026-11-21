import { Link } from "react-router-dom";
import Icon from "./Icon";
const ProfileInfo = () => (
  <Link to="/account" className="dashboard-account-link" aria-label="Open account settings" title="Account settings">
    <span className="dashboard-avatar"><Icon name="person" /></span>
  </Link>
);
export default ProfileInfo;
