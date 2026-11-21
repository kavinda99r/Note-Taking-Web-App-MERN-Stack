import PropTypes from "prop-types";
import Icon from "./Icon";
const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => (
  <form className="dashboard-search" role="search" onSubmit={(event) => { event.preventDefault(); handleSearch(); }}>
    <Icon name="search" />
    <input type="search" aria-label="Search notes" placeholder="Search your thoughts…" value={value} onChange={onChange} />
    {value && <button type="button" aria-label="Clear search" onClick={onClearSearch}><Icon name="x-lg" /></button>}
  </form>
);
SearchBar.propTypes = { value: PropTypes.string, onChange: PropTypes.func, handleSearch: PropTypes.func, onClearSearch: PropTypes.func };
export default SearchBar;
