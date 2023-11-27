import React from "react";
import "./Account.css";
import Dashboardbanner from "../../components/Dashboard/banner/Dashboardbanner";
import Dashboardleft from "../../components/Dashboard/dashboard_left/dashboardleft";
import Dashboardright from "../../components/Dashboard/dashboard_right/Dashboaright";
import Dashboardheader from "../../components/Dashboard/header/Dashboardheader";

const Account = () => {
  <>
    <div className="container">
      <Dashboardbanner />
      <Dashboardheader />
      <div className="dashboard_body">
        <Dashboardleft />
        <Dashboardright />
      </div>
    </div>
  </>;
};

export default Account;
