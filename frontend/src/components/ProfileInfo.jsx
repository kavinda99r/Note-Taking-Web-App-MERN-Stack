import { Link } from "react-router-dom";
import Icon from "./Icon";

const styles = `
.dashboard-avatar {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  background: var(--color-soft);
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  border-radius: 50%;
  font-weight: 600;
}
.dashboard-account-link {
  justify-self: end;
  display: block;
  border-radius: 50%;
}
.dashboard-account-link:hover .dashboard-avatar {
  background: var(--color-highlight);
  border-color: var(--color-focus);
}
.dashboard-avatar {
  width: 42px;
  height: 42px;
}
@media (max-width: 600px) {
  .dashboard-account-link {
  grid-column: 2;
  grid-row: 1;
}

}
.dashboard-avatar {
  font-size: 22px;
}
`;

const ProfileInfo = () => (
  <Link to="/account" className="dashboard-account-link" aria-label="Open account settings" title="Account settings">
    <span className="dashboard-avatar">
      <style>{styles}</style><Icon name="person" /></span>
  </Link>
);
export default ProfileInfo;
