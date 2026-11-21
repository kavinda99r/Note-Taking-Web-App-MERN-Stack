import PropTypes from "prop-types";
import Icon from "./Icon";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import SearchBar from "./SearchBar";
const Navbar = ({ onSearchNote, handleClearSearch, onAddNote }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header className="dashboard-header">
      <Link to="/" className="dashboard-brand" aria-label="NoteSnap home"><span><Icon name="journal-text" /></span>Note<strong>Snap.</strong></Link>
      {onSearchNote ? <SearchBar value={searchQuery} onChange={({ target }) => { setSearchQuery(target.value); onSearchNote(target.value); }} handleSearch={() => onSearchNote(searchQuery)} onClearSearch={() => { setSearchQuery(""); handleClearSearch?.(); }} /> : <div className="dashboard-header-spacer" />}
      <div className="dashboard-header-actions">{onAddNote && <button className="dashboard-primary" onClick={onAddNote}><Icon name="plus-lg" /> New note</button>}<ProfileInfo /></div>
    </header>
  );
};
Navbar.propTypes = { onSearchNote: PropTypes.func, handleClearSearch: PropTypes.func, onAddNote: PropTypes.func };
export default Navbar;
