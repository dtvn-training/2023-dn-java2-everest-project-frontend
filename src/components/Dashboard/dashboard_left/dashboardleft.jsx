import React from "react";
import "./dashboardleft.css";

export default function dashboardleft() {
  return (
    <div className="dashboard_left">
      <div className="left-item">
        <div className="info-img"></div>
        <div className="info-name">User name</div>
      </div>
      <div className="left-item">
        <div className="info-name">Dashboard</div>
      </div>
      <div className="left-item">
        <div className="info-name">Camppaign</div>
      </div>
      <div className="left-item">
        <div className="info-name">Account</div>
      </div>
    </div>
  );
}
