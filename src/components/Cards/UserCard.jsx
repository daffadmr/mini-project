import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ avatar, username }) => {
  return (
    <div className="px-5 md:px-0">
      <div className="user-card rounded-lg border border-slate-300 p-10 flex flex-col items-center gap-3 bg-white">
        <div className="overflow-hidden w-36 h-36 rounded-full">
          <img
            src={avatar === null ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : avatar}
            alt="Profile"
            className="object-cover h-36 w-36"
          />
        </div>

        <h1>
          Halo, <span>{username}</span>
        </h1>
        <Link
          to={"/dashboard/create"}
          className="text-white text-sm bg-gray-800 border border-transparent hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 disabled:hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700 dark:disabled:hover:bg-gray-800 group flex h-min items-center justify-center p-3 text-center font-medium focus:z-10 rounded-lg"
        >
          Buat diari
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
