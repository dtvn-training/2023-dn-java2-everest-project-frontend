import React from "react";
import "./dashboardleft.css";
import { Link } from "react-router-dom";

const dashboardleft = () => {
  return (
    <div className="dashboard_left">
      <div className="left-item">
        <div className="info-img"></div>
        <div className="info-name">User name</div>
      </div>
      <Link to="/dashboard" className="left-item">
        <div className="info-name">Dashboard</div>
      </Link>
      <Link to="/campaign" className="left-item">
        <div className="info-name">Camppaign</div>
      </Link>
      <Link to="/account" className="left-item">
        <div className="info-name">Account</div>
      </Link>
    </div>
  );
};

export default dashboardleft;
