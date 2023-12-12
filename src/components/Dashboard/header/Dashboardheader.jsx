import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboardheader.css";

const Dashboardheader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Navigate to the home page
    navigate("/");
  };
  return (
    <div className="header-container">
      <div></div>
      <div>LOGO</div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboardheader;
