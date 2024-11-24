import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { IoHome } from "react-icons/io5";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  // Determine if the current path is login or signup
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="bg-white flex items-center justify-between px-20 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">
        <span className="text-primary">Note</span>Snap
      </h2>
      {isAuthPage && (
        <Link to="/">
          <button className="flex  items-center gap-2 text-slate-900 border-[1px] border-slate-900 rounded-[4px] py-1 px-3 hover:bg-slate-100 transition-all ease-in-out duration-200">
            <IoHome />
            Home
          </button>
        </Link>
      )}

      {/* Conditionally render SearchBar only if not on the login or signup page */}
      {!isAuthPage && (
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
