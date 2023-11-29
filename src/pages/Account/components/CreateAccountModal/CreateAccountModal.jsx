import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import "./CreateAccountModal.css";

const CreateAccountModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const [form] = useForm();

  return (
    <Modal
      title="Create Account"
      footer={[
        <div className="CreateAccountModal-footer" key="footer">
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        </div>,
      ]}
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        initialValues={{
          firstname: "PhamPham1Pham1",
          lastname: "Anh Quyet",
          email: "quyet@mail.com",
          role: "ADMIN",
          address: "Nghe An",
          phone: "0123456789",
        }}
      >
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email address!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[
            {
              required: true,
              message: "Please input your role!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAccountModal;
