import React from "react";
import "./dashboardleft.css";

export default function dashboardleft() {
  return (
    <div class="dashboard_left">
      <div class="left-item">
        <div class="info-img"></div>
        <div class="info-name">User name</div>
      </div>
      <div class="left-item">
        <div class="info-name">Dashboard</div>
      </div>
      <div class="left-item">
        <div class="info-name">Camppaign</div>
      </div>
      <div class="left-item">
        <div class="info-name">Account</div>
      </div>
    </div>
  );
}
