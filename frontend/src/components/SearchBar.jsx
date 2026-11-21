import PropTypes from "prop-types";
import Icon from "./Icon";

const styles = `
.dashboard-search {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 15px;
  min-height: 46px;
  background: var(--color-soft);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  color: var(--color-muted);
}
.dashboard-search:focus-within {
  border-color: var(--color-focus);
  box-shadow: 0 0 0 3px var(--color-primary-ring);
}
.dashboard-search input {
  width: 100%;
  min-width: 0;
  outline: none;
  background: transparent;
  color: var(--color-ink);
  font-size: 14px;
  padding-block: 12px;
}
.dashboard-search input::-webkit-search-cancel-button {
  display: none;
}
.dashboard-search button {
  padding: 4px;
  font-size: 12px;
}
@media (max-width: 600px) {
  .dashboard-search {
  grid-row: 2;
  grid-column: 1 / -1;
}

}
`;

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => (
  <form className="dashboard-search" role="search" onSubmit={(event) => { event.preventDefault(); handleSearch(); }}>
    <style>{styles}</style>
    <Icon name="search" />
    <input type="search" aria-label="Search notes" placeholder="Search your thoughts…" value={value} onChange={onChange} />
    {value && <button type="button" aria-label="Clear search" onClick={onClearSearch}><Icon name="x-lg" /></button>}
  </form>
);
SearchBar.propTypes = { value: PropTypes.string, onChange: PropTypes.func, handleSearch: PropTypes.func, onClearSearch: PropTypes.func };
export default SearchBar;
