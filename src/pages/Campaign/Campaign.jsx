import React, { useState, useEffect } from "react";
import "./Campaign.css";
import Dashboardbanner from "../../components/Dashboard/banner/Dashboardbanner";
import Dashboardheader from "../../components/Dashboard/header/Dashboardheader";
import Dashboardleft from "../../components/Dashboard/dashboard_left/dashboardleft";
import CreateCampaignModal from "./components/CreateCampaignModal/CreateCampaignModal";
import { Table, Input, Button, Modal } from "antd";
import { useSearchCampaign } from "../../hooks/campaigns/useSearchCampaign";
import moment from "moment";

const Campaign = () => {
  const [editModal, setEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
  });
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");
  const { data: fetchCampaigns, isFetching } = useSearchCampaign(
    searchText,
    pagination.pageSize,
    pagination.current - 1
  );
  useEffect(() => {
    if (fetchCampaigns) {
      setTotal(fetchCampaigns?.data?.totalElements || 0);
    }
  }, [fetchCampaigns]);
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination({
      ...pagination,
      pageSize: pagination.pageSize || 3,
      current: pagination.current || 1,
    });
  };

  const columns = [
    {
      title: "Campaign Name",
      dataIndex: "name",
      key: "campaignname",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              border: `2px solid ${record.status ? "green" : "red"}`,
              backgroundColor: "transparent",
            }}
          />
        </div>
      ),
    },
    {
      title: "Used Amount",
      dataIndex: "usedAmount",
      key: "usedamount",
      align: "center",
      render: (_, record) => <div>{`¥ ${record.usedAmount}`}</div>,
    },
    {
      title: "Usage Rate",
      dataIndex: "usageRate",
      key: "usagerate",
      align: "center",
      render: (_, record) => <div>{` ${record.usageRate}%`}</div>,
    },
    {
      title: "budget",
      dataIndex: "budget",
      key: "budget",
      align: "center",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startdate",
      align: "center",
      render: (_, record) => <div>{moment.utc(record.startDate).format("YYYY-MM-DD HH:mm")}</div>,
    },
    {
      title: "End date",
      dataIndex: "endDate",
      key: "enddate",
      align: "center",
      render: (_, record) => <div>{moment.utc(record.endDate).format("YYYY-MM-DD HH:mm")}</div>,
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
              <Button
                onClick={() => setEditModal(true)}
                type="default"
                style={{ backgroundColor: "#468FAF", color: "#fff", width: "150px" }}
              >
                Create Campaign
              </Button>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={fetchCampaigns?.data?.content || []}
            loading={isFetching}
            pagination={{
              ...pagination,
              total: total,
              showSizeChanger: false,
              showQuickJumper: false,
              onChange: (page) => {
                setPagination({ ...pagination, current: page });
              },
              style: {
                display: "flex",
                justifyContent: "center",
              },
            }}
            onChange={handleTableChange}
          />
        </div>
      </div>
      <CreateCampaignModal
        isModalOpen={editModal}
        handleOk={() => {}}
        handleCancel={() => {
          setEditModal(!editModal);
        }}
      />
    </div>
  );
};

export default Campaign;
