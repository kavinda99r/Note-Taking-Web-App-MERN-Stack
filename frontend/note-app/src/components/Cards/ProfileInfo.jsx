import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-3">
        <button
          className="text-sm text-slate-900 px-4 p-2 rounded-[3px] border-[1px] border-slate-900 hover:bg-gray-100 transition-all ease-in-out duration-200"
          onClick={onLogout}
        >
          Logout
        </button>

        <div>
          <p className="text-sm font-medium">{userInfo?.fullName}</p>
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-white font-medium bg-primary">
          {getInitials(userInfo?.fullName)}
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
