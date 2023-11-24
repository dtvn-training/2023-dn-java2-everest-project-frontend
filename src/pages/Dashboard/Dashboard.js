import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Dashboardheader from "../../components/Dashboard/header/Dashboardheader";
import Dashboardright from "../../components/Dashboard/dashboard_right/Dashboaright";
import Dashboardleft from "../../components/Dashboard/dashboard_left/dashboardleft";
import Dashboardbanner from "../../components/Dashboard/banner/Dashboardbanner";
import "./Dashboard.css";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZ3V5ZW50aGllbm5oYW5AZ21haWwuY29tIiwiaWF0IjoxNzAwNzA0NjU0LCJleHAiOjE3MDA3OTEwNTR9.HctEiqnyzUus1eOPcMn_lLbgG519S1ODUS6s9NbGmyM";
        const response = await axios.get("/api/v1/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("1", response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <div class="container">
        <Dashboardbanner />
        <Dashboardheader />
        <div class="dashboard_body">
          <Dashboardleft />
          <Dashboardright />
        </div>
      </div>
    </>
  );
};
