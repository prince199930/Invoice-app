import React from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../utils/auth.js"; // adjust the path as needed
import { notify } from "../../utils/utils.js";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    notify("Logout successful! Redirecting to home page...", "success");
    navigate("/"); 
  };

  return (
    <header className="bg-gray-900 text-white shadow-md p-4 flex justify-between items-center">
      {/* Logo / App Name */}
      <div className="text-xl font-bold tracking-wide">
        Invoice<span className="text-red-500">Pro</span>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 transition text-white font-medium px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
