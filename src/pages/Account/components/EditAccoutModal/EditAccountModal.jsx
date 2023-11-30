import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import "./EditAccountModal.css";

const { Option } = Select;

const EditAccountModal = ({ isModalOpen, handleOk, handleCancel, initialData }) => {
  const [form] = useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData, form]);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const styledInput = {
    marginLeft: "2.5em",
  };
  const roles = [
    {
      role_id: "1",
      role_name: "ADMIN",
    },
    {
      role_id: "2",
      role_name: "DAC",
    },
  ];
  return (
    <Modal
      title="Edit Account"
      footer={[
        <div className="EditAccountModal-footer" key="footer">
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
      width={650}
    >
      <Form form={form} initialValues={initialData || {}} {...formItemLayout} labelAlign="left">
        <Form.Item
          label="First Name"
          name="firstname"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input style={styledInput} />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input style={styledInput} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          className="custom-label-input"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email address!",
            },
          ]}
        >
          <Input style={styledInput} />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please input your role!",
            },
          ]}
        >
          <Select style={styledInput}>
            {roles.map((role) => (
              <Option key={role.role_id} value={role.role_name}>
                {role.role_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input style={styledInput} />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input style={styledInput} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please input password!",
            },
          ]}
        >
          <Input type="password" style={styledInput} />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="confirm-password"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please reinput password!",
            },
          ]}
        >
          <Input type="password" style={styledInput} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAccountModal;
