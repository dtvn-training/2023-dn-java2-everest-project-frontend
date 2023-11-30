import React, { useState, useEffect } from "react";
import "./Campaign.css";
import Dashboardbanner from "../../components/Dashboard/banner/Dashboardbanner";
import Dashboardheader from "../../components/Dashboard/header/Dashboardheader";
import Dashboardleft from "../../components/Dashboard/dashboard_left/dashboardleft";
import CreateCampaignModal from "./components/CreateCampaignModal/CreateCampaignModal";
import { Space, Table, Tag, Input, Button, Modal } from "antd";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
const Campaign = () => {
  const [modals, SetModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState(null);
  // const data = [
  //   {
  //     campaignname: "Campaign 1",
  //     status: "true",
  //     usagerate: "0.5%",
  //     budget: "100000",
  //     startdate: "2024-12-01 10:00",
  //     enddate: "2024-12-01 10:00",
  //   },
  // ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://65682b389927836bd9742d04.mockapi.io/api/v1/accounts/campaign");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const columns = [
    {
      title: "Campaign Name",
      dataIndex: "campaignname",
      key: "campaignname",
      // render: (_, record) => <span>{`${record.firstname} ${record.lastname}`}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Usage Rate",
      dataIndex: "usagerate",
      key: "usagerate",
    },
    {
      title: "budget",
      dataIndex: "budget",
      key: "budget",
    },
    {
      title: "Start Date",
      dataIndex: "startdate",
      key: "startdate",
    },
    {
      title: "End date",
      dataIndex: "enddate",
      key: "enddate",
    },
  ];

  return (
    <div className="container">
      <Dashboardbanner />
      <Dashboardheader />
      <div className="dashboard_body">
        <Dashboardleft />
        <div className="content">
          <div className="campaign-header">
            <div>
              <Input
                type="text"
                style={{ backgroundColor: "#C4C4C4", color: "#000", width: "14em" }}
                placeholder="Search..."
                className="custom-input"
              />
            </div>
            <div className="account-header__function">
              <Button type="default" style={{ backgroundColor: "#468FAF", color: "#fff", width: "150px" }}>
                Export CSV
              </Button>
              <Button type="default" style={{ backgroundColor: "#468FAF", color: "#fff", width: "150px" }}>
                Create Campaign
              </Button>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 3,
              style: {
                display: "flex",
                justifyContent: "center",
              },
            }}
          />
        </div>
      </div>
      <CreateCampaignModal
        isModalOpen={true}
        handleOk={() => {}}
        handleCancel={() => {
          SetModal(!modals);
        }}
      />
    </div>
  );
};

export default Campaign;
