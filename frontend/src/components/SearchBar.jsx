import PropTypes from "prop-types";
import Icon from "./Icon";
const SearchBar = ({
  value,
  onChange,
  handleSearch,
  onClearSearch
}) => <form className="flex items-center gap-3 py-0 px-[15px] min-h-[46px] bg-[#fffdf9] border border-border rounded-[10px] text-muted focus-within:border-focus focus-within:shadow-[0_0_0_3px_var(--color-primary-ring)] [&_input]:w-full [&_input]:min-w-0 [&_input]:outline-none [&_input]:bg-transparent [&_input]:text-ink [&_input]:text-[14px] [&_input]:py-3 [&_input::-webkit-search-cancel-button]:hidden [&_button]:p-1 [&_button]:text-[12px] max-[600px]:[grid-row:2] max-[600px]:[grid-column:1_/_-1]" role="search" onSubmit={event => {
  event.preventDefault();
  handleSearch();
}}>
    <Icon name="search" />
    <input type="search" aria-label="Search notes" placeholder="Search your thoughts…" value={value} onChange={onChange} />
    {value && <button type="button" aria-label="Clear search" onClick={onClearSearch}><Icon name="x-lg" /></button>}
  </form>;
SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  handleSearch: PropTypes.func,
  onClearSearch: PropTypes.func
};
export default SearchBar;
