import React from "react";
import { useState, useEffect } from "react";
import axios from "../../api/axiosClient";
import Dashboardheader from "../../components/Dashboard/header/Dashboardheader";
import Dashboardleft from "../../components/Dashboard/dashboard_left/dashboardleft";
import Dashboardbanner from "../../components/Dashboard/banner/Dashboardbanner";
import "./Dashboard.css";
import moment from "moment";
import { useSearchCampaign } from "../../hooks/campaigns/useSearchCampaign";
import { Table, Input, Button, Modal, DatePicker } from "antd";
import { debounce } from "lodash";

const onChange = (value, dateString) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};
const onOk = (value) => {
  console.log("onOk: ", value);
};
const Dashboard = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
  const debouncedSetSearchText = debounce((text) => setSearchText(text), 1500);

  useEffect(() => {
    if (fetchCampaigns) {
      setTotal(fetchCampaigns?.data?.totalElements || 0);
    }
  }, [fetchCampaigns]);
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null); // Reset end date when start date changes
  };

  const disabledEndDate = (current) => {
    // Disable dates before the selected start date
    return current && startDate && current < startDate.endOf("day");
  };
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
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
      align: "center",
      render: (_, record) => <div>{`¥ ${record.budget}`}</div>,
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
          <div className="dashboard-header">
            <div>
              <Input
                type="text"
                style={{ backgroundColor: "#C4C4C4", color: "#000", width: "14em" }}
                placeholder="Search..."
                className="custom-input"
                onChange={(e) => debouncedSetSearchText(e.target.value)}
              />
            </div>
            <div className="dashboard-header__function">
              <div className="date-picker-label">Start Date:</div>
              <DatePicker
                style={{ marginRight: "10px" }}
                showTime={{ format: "HH:mm" }}
                value={startDate}
                onChange={handleStartDateChange}
                placeholder="Select Start Date"
              />

              <div className="date-picker-label">End Date:</div>
              <DatePicker
                style={{ marginRight: "10px" }}
                showTime={{ format: "HH:mm" }}
                value={endDate}
                onChange={(date) => setEndDate(date)}
                disabledDate={disabledEndDate}
                placeholder="Select End Date"
              />
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
    </div>
  );
};
export default Dashboard;
