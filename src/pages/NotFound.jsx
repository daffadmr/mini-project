import React from "react";
import Auth from "../utils/Auth";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-[80vh] flex items-center justify-center flex-col">
      <h1 className="text-9xl">404</h1>
      <p className="text-2xl">Page not found</p>
      {Auth.isAuthorization() && (
        <Link to="/dashboard" className="text-md">
          Back to Dashboard
        </Link>
      )}
      <Link to="/" className="py-2 text-md">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
