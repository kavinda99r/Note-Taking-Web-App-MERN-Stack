import PropTypes from "prop-types";
import Icon from "./Icon";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import SearchBar from "./SearchBar";
const Navbar = ({
  onSearchNote,
  handleClearSearch,
  onAddNote
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  return <header className="grid items-center [border-bottom:1px_solid_var(--color-border)] w-[min(1240px,_calc(100%_-_96px))] mx-auto min-h-20 py-4 px-0 grid-cols-[1fr_minmax(240px,_480px)_1fr] gap-[30px] bg-transparent max-[1050px]:w-[calc(100%_-_56px)] max-[1050px]:grid-cols-[auto_minmax(180px,_1fr)_auto] max-[1050px]:gap-7 max-[600px]:grid-cols-[1fr_auto] max-[600px]:gap-4 max-[540px]:w-[calc(100%_-_36px)]">
      <Link to="/" className="flex items-center text-[25px] font-bold tracking-[-1px] w-fit [&_>_span]:grid [&_>_span]:place-items-center [&_>_span]:w-[37px] [&_>_span]:h-[39px] [&_>_span]:mr-2.5 [&_>_span]:rounded-[11px_11px_11px_3px] [&_>_span]:bg-primary [&_>_span]:text-surface [&_>_span]:text-[21px] [&_strong]:text-primary max-[600px]:text-[23px]" aria-label="NoteSnap home"><span><Icon name="journal-text" /></span>Note<strong>Snap.</strong></Link>
      {onSearchNote ? <SearchBar value={searchQuery} onChange={({
      target
    }) => {
      setSearchQuery(target.value);
      onSearchNote(target.value);
    }} handleSearch={() => onSearchNote(searchQuery)} onClearSearch={() => {
      setSearchQuery("");
      handleClearSearch?.();
    }} /> : <div className="max-[600px]:hidden" />}
      <div className="flex items-center justify-end gap-[18px] justify-self-end max-[600px]:[grid-column:2] max-[600px]:[grid-row:1] max-[600px]:gap-3 max-[600px]:[&_.button-primary]:text-[13px]">{onAddNote && <button className="button-primary" onClick={onAddNote}><Icon name="plus-lg" /> New note</button>}<ProfileInfo /></div>
    </header>;
};
Navbar.propTypes = {
  onSearchNote: PropTypes.func,
  handleClearSearch: PropTypes.func,
  onAddNote: PropTypes.func
};
export default Navbar;
