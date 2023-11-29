import React, { useState } from "react";
import "./Account.css";
import Dashboardbanner from "../../components/Dashboard/banner/Dashboardbanner";
import Dashboardleft from "../../components/Dashboard/dashboard_left/dashboardleft";
import Dashboardheader from "../../components/Dashboard/header/Dashboardheader";
import { Space, Table, Tag, Input, Button, Modal } from "antd";
import CreateAccountModal from "./components/CreateAccountModal/CreateAccountModal";
import EditAccountModal from "./components/EditAccoutModal/EditAccountModal";

const Account = () => {
  const [modals, SetModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const data = [
    {
      accountId: 1,
      firstname: "PhamPham1Pham1",
      lastname: "Anh Quyet",
      email: "quyet@mail.com",
      role: "ADMIN",
      address: "Nghe An",
      phone: "0123456789",
    },
    {
      accountId: 2,
      firstname: "Pham",
      lastname: "Anh Quyet",
      email: "thiennhan@gmail.com",
      role: "ADMIN",
      address: "Nghe An",
      phone: "0123456789",
    },
    {
      accountId: 2,
      firstname: "Nguyen",
      lastname: "Thien Nhan",
      email: "thiennhan@gmail.com",
      role: "ADMIN",
      address: "Nghe An",
      phone: "0123456789",
    },
    {
      accountId: 2,
      firstname: "Nhan",
      lastname: "Nguyen Thien",
      email: "thiennhan@gmail.com",
      role: "ADMIN",
      address: "Nghe An",
      phone: "0123456789",
    },
    {
      accountId: 2,
      firstname: "Pham",
      lastname: "Anh Quyet",
      email: "thiennhan@gmail.com",
      role: "ADMIN",
      address: "Nghe An",
      phone: "0123456789",
    },
    {
      accountId: 2,
      firstname: "Pham",
      lastname: "Anh Quyet",
      email: "thiennhan@gmail.com",
      role: "ADMIN",
      address: "Nghe An",
      phone: "0123456789",
    },
    {
      accountId: 2,
      firstname: "Pham",
      lastname: "Anh Quyet",
      email: "thiennhan@gmail.com",
      role: "ADMIN",
      address: "Nghe An",
      phone: "0123456789",
    },
    {
      accountId: 2,
      firstname: "Pham",
      lastname: "Anh Quyet",
      email: "thiennhan@gmail.com",
      role: "ADMIN",
      address: "Nghe An",
      phone: "0123456789",
    },
    {
      accountId: 2,
      firstname: "Pham",
      lastname: "Anh Quyet",
      email: "thiennhan@gmail.com",
      role: "ADMIN",
      address: "Nghe An",
      phone: "0123456789",
    },
    {
      accountId: 2,
      firstname: "Pham",
      lastname: "Anh Quyet",
      email: "thiennhan@gmail.com",
      role: "ADMIN",
      address: "Nghe An",
      phone: "0123456789",
    },
    {
      accountId: 2,
      firstname: "Pham",
      lastname: "Anh Quyet",
      email: "thiennhan@gmail.com",
      role: "ADMIN",
      address: "Nghe An",
      phone: "0123456789",
    },
    {
      accountId: 2,
      firstname: "Pham",
      lastname: "Anh Quyet",
      email: "thiennhan@gmail.com",
      role: "ADMIN",
      address: "Nghe An",
      phone: "0123456789",
    },
  ];

  const handleEdit = (record) => {
    setEditModal(true);
    setSelectedRecord(record);
  };

  const handleDelete = (record) => {
    // Add your delete logic here
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this record?",
      okText: "Delete",
      onOk: () => {
        // Implement your delete logic here
        console.log("Deleted", record);
      },
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "accountId",
      key: "accountId",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (_, record) => <span>{`${record.firstname} ${record.lastname}`}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
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
      <CreateAccountModal isModalOpen={modals} handleOk={() => {}} handleCancel={() => SetModal(!modals)} />
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
