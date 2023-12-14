import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import "./Campaign.css";
import Dashboardbanner from "../../components/Dashboard/banner/Dashboardbanner";
import Dashboardheader from "../../components/Dashboard/header/Dashboardheader";
import Dashboardleft from "../../components/Dashboard/dashboard_left/dashboardleft";
import CreateCampaignModal from "./components/CreateCampaignModal/CreateCampaignModal";
import { Table, Input, Button, Modal, DatePicker, message } from "antd";
import { useSearchCampaign } from "../../hooks/campaigns/useSearchCampaign";
import moment from "moment";
import "moment-timezone";
import { useDeleteCampaign } from "../../hooks/campaigns/useDeteleCampaign";
import EditCampaignModal from "./components/EditCampaignModal/EditCampaignModal";

const Campaign = () => {
  const [modals, SetModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { mutateAsync } = useDeleteCampaign();

  const disabledEndDate = (current) => {
    return startDate ? current && current < moment(startDate).endOf("day") : false;
  };

  const disabledEndDateTime = (current, type) => {
    if (type === "start") {
      return false;
    }

    if (!startDate) {
      return true;
    }

    const endOfDay = moment(startDate).endOf("day");

    return current && current < endOfDay;
  };

  const debouncedSetSearchAndDate = debounce((text, start, end) => {
    if (start && !end) {
      setSearchText(null);
      setStartDate(start);
      setEndDate(null);
    } else if (!start && end) {
      setSearchText(null);
      setStartDate(null);
      setEndDate(end);
    } else if (start && end) {
      setSearchText(text);
      setStartDate(start);
      setEndDate(end);
    } else {
      setSearchText(text);
      setStartDate(null);
      setEndDate(null);
    }
  }, 1500);
  const handleStartDateChange = (value, date) => {
    if (date) {
      const formattedStartTimestamp = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ").toString();
      setStartDate(formattedStartTimestamp);
      debouncedSetSearchAndDate(searchText, formattedStartTimestamp, endDate);
    } else {
      debouncedSetSearchAndDate(searchText, null, endDate);
    }
  };

  const handleEndDateChange = (value, date) => {
    if (date) {
      const formattedEndTimestamp = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ").toString();
      debouncedSetSearchAndDate(searchText, startDate, formattedEndTimestamp);
    } else {
      debouncedSetSearchAndDate(searchText, startDate, null);
    }
  };
  const handleSearchInputChange = (e) => {
    debouncedSetSearchAndDate(e.target.value, startDate, endDate);
  };
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
    startDate,
    endDate,
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
  const handleEdit = (record) => {
    setEditModal(true);
    setSelectedRecord(record);
  };

  const handleDelete = async (record) => {
    // Add your delete logic here
    Modal.confirm({
      title: "Confirmination",
      content: "Please confirm that you want to delete everything.",
      okText: "Delete",
      okButtonProps: {
        style: { backgroundColor: "#F7685B", color: "white" },
      },
      onOk: async () => {
        try {
          console.log(record.campaignId);
          await mutateAsync({ id: record.campaignId });
          message.success("Campaign Deleted Successfully");
        } catch (error) {
          console.error("Error deleting campaign", error);
        }
      },
      className: "DeleteAccountModal-footer",
    });
  };

  const columns = [
    {
      title: "Campaign Name",
      dataIndex: "name",
      key: "campaignname",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10 }}>
          <div>
            <img className="campaign-img" src={`${record.imgUrl}`}></img>
          </div>
          <div>{`${record.name}`}</div>
        </div>
      ),
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
      render: (_, record) => <div>{moment(record.startDate).tz(moment.tz.guess()).format("YYYY-MM-DD HH:mm")}</div>,
    },
    {
      title: "End date",
      dataIndex: "endDate",
      key: "enddate",
      align: "center",
      render: (_, record) => <div>{moment(record.endDate).tz(moment.tz.guess()).format("YYYY-MM-DD HH:mm")}</div>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 250,
      render: (_, record) => (
        <div>
          <Button type="default" onClick={() => handleEdit(record)} className="edit-button">
            Edit
          </Button>{" "}
          <Button type="default" onClick={() => handleDelete(record)} className="delete-button">
            Delete
          </Button>
        </div>
      ),
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
              <div className="date-picker">
                <div className="date-picker-label">Start Date:</div>
                <DatePicker
                  id="start-date-picker"
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select Start Date"
                  onChange={handleStartDateChange}
                />
                <div className="date-picker-label">End Date:</div>
                <DatePicker
                  id="end-date-picker"
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select End Date"
                  disabledDate={disabledEndDate}
                  disabledTime={(current, type) => disabledEndDateTime(current, type)}
                  onChange={handleEndDateChange}
                />
              </div>
            </div>
            <div className="campaign-header__function">
              <Input
                type="text"
                style={{ backgroundColor: "#C4C4C4", color: "#000", width: "14em" }}
                placeholder="Search..."
                className="custom-input"
                onChange={handleSearchInputChange}
              />
              <div className="campaign-function-button">
                <Button type="default" style={{ backgroundColor: "#468FAF", color: "#fff", width: "150px" }}>
                  Export CSV
                </Button>
                <Button
                  onClick={() => SetModal(true)}
                  type="default"
                  style={{ backgroundColor: "#468FAF", color: "#fff", width: "150px" }}
                >
                  Create Campaign
                </Button>
              </div>
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
        isModalOpen={modals}
        handleOk={() => {}}
        handleCancel={() => {
          SetModal(!modals);
        }}
      />
      <EditCampaignModal
        isModalOpen={editModal}
        handleOk={() => {}}
        handleCancel={() => {
          SetModal(false);
          setEditModal(false);
          setSelectedRecord(null);
        }}
        initialData={selectedRecord}
      />
    </div>
  );
};

export default Campaign;
