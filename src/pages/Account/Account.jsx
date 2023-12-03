import React, { useEffect, useState } from "react";
import "./Account.css";
import Dashboardbanner from "../../components/Dashboard/banner/Dashboardbanner";
import Dashboardleft from "../../components/Dashboard/dashboard_left/dashboardleft";
import Dashboardheader from "../../components/Dashboard/header/Dashboardheader";
import { Space, Table, Tag, Input, Button, Modal, message } from "antd";
import CreateAccountModal from "./components/CreateAccountModal/CreateAccountModal";
import EditAccountModal from "./components/EditAccoutModal/EditAccountModal";
import { useFetchAccounts } from "../../hooks/accounts/useFetchAccounts";
import { useDeleteAccount } from "../../hooks/accounts/useDeleteAccount";
import { useSearchAccounts } from "../../hooks/accounts/useSearchAccounts";

const Account = () => {
  const [modals, SetModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
  });
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");

  const { mutateAsync } = useDeleteAccount();
  const { data: fetchAccounts, isFetching } = useSearchAccounts(
    searchText,
    pagination.pageSize,
    pagination.current - 1
  );

  useEffect(() => {
    if (fetchAccounts) {
      setTotal(fetchAccounts?.data?.totalElements || 0);
    }
  }, [fetchAccounts]);

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
          await mutateAsync({ id: record.accountId });
          message.success("Account deleted successfully!");
        } catch (error) {
          console.error("Error deleting account", error);
        }
      },
      className: "DeleteAccountModal-footer",
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "accountId",
      key: "accountId",
      align: "center",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      align: "center",
      render: (_, record) => <span>{`${record.firstname} ${record.lastname}`}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div>
          <Button
            type="default"
            onClick={() => handleEdit(record)}
            style={{ backgroundColor: "#468FAF", color: "#fff" }}
          >
            Edit
          </Button>{" "}
          <Button
            type="default"
            onClick={() => handleDelete(record)}
            style={{ backgroundColor: "#468FAF", color: "#fff" }}
          >
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
          <div className="account-header">
            <div>
              <Input
                type="text"
                style={{ backgroundColor: "#C4C4C4", color: "#000", width: "14em" }}
                placeholder="Search..."
                className="custom-input"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="account-header__function">
              <Button type="default" style={{ backgroundColor: "#468FAF", color: "#fff", width: "130px" }}>
                Export CSV
              </Button>
              <Button
                type="default"
                onClick={() => SetModal(true)}
                style={{ backgroundColor: "#468FAF", color: "#fff", width: "130px" }}
              >
                Create Account
              </Button>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={fetchAccounts?.data?.content || []}
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
      <CreateAccountModal
        isModalOpen={modals}
        handleOk={() => {}}
        handleCancel={() => {
          SetModal(!modals);
        }}
      />
      <EditAccountModal
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

export default Account;
