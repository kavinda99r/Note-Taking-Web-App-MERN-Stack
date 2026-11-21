import PropTypes from "prop-types";
import Icon from "./Icon";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import SearchBar from "./SearchBar";

const styles = `
.dashboard-header {
  display: grid;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
}
.dashboard-brand {
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: -1px;
  width: fit-content;
}
.dashboard-brand > span {
  display: grid;
  place-items: center;
  width: 37px;
  height: 39px;
  margin-right: 10px;
  border-radius: 11px 11px 11px 3px;
  background: var(--color-primary);
  color: var(--color-surface);
  font-size: 21px;
}
.dashboard-brand strong {
  color: var(--color-primary);
}
@media (max-width: 1250px) {
  .dashboard-header {
  padding-inline: 26px;
  gap: 25px;
  grid-template-columns: 190px minmax(180px, 1fr) auto;
}

}
@media (max-width: 900px) {
  .dashboard-header {
  grid-template-columns: auto minmax(180px, 1fr) auto;
  gap: 24px;
}

}
@media (max-width: 600px) {
  .dashboard-header {
  padding: 16px 18px;
}

}
@media (max-width: 600px) {
  .dashboard-brand {
  font-size: 23px;
}

}
.dashboard-header {
  width: min(1240px, calc(100% - 96px));
  margin-inline: auto;
  min-height: 80px;
  padding: 16px 0;
  grid-template-columns: 1fr minmax(240px, 480px) 1fr;
  gap: 30px;
  background: transparent;
}
@media (max-width: 1050px) {
  .dashboard-header {
  width: calc(100% - 56px);
}

}
@media (max-width: 1050px) {
  .dashboard-header {
  grid-template-columns: auto minmax(180px, 1fr) auto;
  gap: 28px;
}

}
@media (max-width: 600px) {
  .dashboard-header {
  grid-template-columns: 1fr auto;
  gap: 16px;
}

}
@media (max-width: 540px) {
  .dashboard-header {
  width: calc(100% - 36px);
}

}
.dashboard-header-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  justify-self: end;
}
@media (max-width: 600px) {
  .dashboard-header-actions {
  grid-column: 2;
  grid-row: 1;
  gap: 12px;
}

}
@media (max-width: 600px) {
  .dashboard-header-actions .button-primary {
  font-size: 13px;
}

}
@media (max-width: 600px) {
  .dashboard-header-spacer {
  display: none;
}

}
`;

const Navbar = ({ onSearchNote, handleClearSearch, onAddNote }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header className="dashboard-header">
      <style>{styles}</style>
      <Link to="/" className="dashboard-brand" aria-label="NoteSnap home"><span><Icon name="journal-text" /></span>Note<strong>Snap.</strong></Link>
      {onSearchNote ? <SearchBar value={searchQuery} onChange={({ target }) => { setSearchQuery(target.value); onSearchNote(target.value); }} handleSearch={() => onSearchNote(searchQuery)} onClearSearch={() => { setSearchQuery(""); handleClearSearch?.(); }} /> : <div className="dashboard-header-spacer" />}
      <div className="dashboard-header-actions">{onAddNote && <button className="button-primary" onClick={onAddNote}><Icon name="plus-lg" /> New note</button>}<ProfileInfo /></div>
    </header>
  );
};
Navbar.propTypes = { onSearchNote: PropTypes.func, handleClearSearch: PropTypes.func, onAddNote: PropTypes.func };
export default Navbar;
