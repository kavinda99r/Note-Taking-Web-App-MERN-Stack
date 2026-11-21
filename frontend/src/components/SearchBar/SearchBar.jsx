import PropTypes from "prop-types";
import Icon from "../Icon/Icon";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <>
      <div className="ml-10 w-80 flex items-center px-4 bg-slate-100 rounded-md">
        <input
          type="text"
          placeholder="Search Notes"
          className="w-full text-xs bg-transparent py-[11px] outline-none"
          value={value}
          onChange={onChange}
        />

        {value && (
          <Icon name="x-lg" label="Clear search"
            className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
            onClick={onClearSearch}
          />
        )}

        <Icon name="search" label="Search"
          className="text-slate-400 cursor-pointer hover:text-black"
          onClick={handleSearch}
        />
      </div>
    </>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  handleSearch: PropTypes.func,
  onClearSearch: PropTypes.func
};

export default SearchBar;
