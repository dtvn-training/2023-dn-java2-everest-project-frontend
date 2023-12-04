import React, { useState } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import "./CreateAccountModal.css";
import { nameRegex, addressRegex, emailRegex, phoneRegex } from "../../../../utils/RegularExpression";
import useCreateAccount from "../../../../hooks/accounts/useCreateAccount";

const { Option } = Select;
const CreateAccountModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const [form] = useForm();
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
  const { createAccount } = useCreateAccount();
  const showSuccessMessage = () => {
    message.success("Account created successfully");
  };
  const onFinish = async (values) => {
    try {
      console.log(values);
      const requestData = {
        email: values.email,
        password: values.password,
        firstname: values.firstname,
        lastname: values.lastname,
        role: values.role,
        address: values.address,
        phone: values.phone,
      };
      const response = await createAccount(requestData);
      console.log("request", requestData);
      if (response?.code === 400) {
        return message.error(response?.message);
      }
      form.resetFields();
      showSuccessMessage();
      handleOk();
    } catch (error) {
      console.error("Error creating account", error);
      // Handle error if needed
    }
  };

  return (
    <Modal
      title="Create Account"
      footer={[
        <div className="CreateAccountModal-footer" key="footer">
          <Button
            key="cancel"
            onClick={() => {
              form.resetFields();
              handleCancel();
            }}
          >
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
      <Form form={form} {...formItemLayout} labelAlign="left" onFinish={onFinish}>
        <Form.Item
          label="First Name"
          name="firstname"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
            {
              message: "Please input a valid first name!",
              pattern: nameRegex,
            },
          ]}
          hasFeedback
        >
          <Input style={styledInput} onBlur={() => form.validateFields(["firstname"])} />
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
            {
              message: "Please input a valid last name!",
              pattern: nameRegex,
            },
          ]}
          hasFeedback
        >
          <Input style={styledInput} onBlur={() => form.validateFields(["lastname"])} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please input an email!",
            },
            {
              message: "Please input a valid email!",
              pattern: emailRegex,
            },
          ]}
          hasFeedback
        >
          <Input style={styledInput} onBlur={() => form.validateFields(["email"])} />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please choose a role!",
            },
          ]}
          hasFeedback
        >
          <Select style={styledInput} onBlur={() => form.validateFields(["role"])}>
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
              message: "Please input an address!",
            },
            {
              message: "Please input an valid address!",
              pattern: addressRegex,
            },
          ]}
          hasFeedback
        >
          <Input style={styledInput} onBlur={() => form.validateFields(["address"])} />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please input a phone number!",
            },
            {
              message: "Please input a valid phone number!",
              pattern: phoneRegex,
            },
          ]}
          hasFeedback
        >
          <Input style={styledInput} onBlur={() => form.validateFields(["phone"])} />
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
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.resolve(); // No validation if the field is empty
                }
                const minLength = 8;
                const hasDigit = /\d/.test(value);
                const hasUpperCase = /[A-Z]/.test(value);
                const hasSpecialChar = /[@#$%^&+=!]/.test(value);
                const hasSpace = /\s/.test(value);
                const startsWithSpace = /^\s/.test(value);
                const endsWithSpace = /\s$/.test(value);

                if (value.length < minLength) {
                  return Promise.reject("Password must be at least 8 characters long");
                }
                if (!hasDigit) {
                  return Promise.reject("Password must contain at least one digit");
                }
                if (!hasUpperCase) {
                  return Promise.reject("Password must have at least one capital letter");
                }
                if (!hasSpecialChar) {
                  return Promise.reject("Password must contain at least one special character (@#$%^&+=!)");
                }
                if (hasSpace) {
                  return Promise.reject("Password must not contain space characters");
                }
                if (startsWithSpace || endsWithSpace) {
                  return Promise.reject("Passwords cannot begin or end with a space character");
                }

                return Promise.resolve();
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password type="password" style={styledInput} onBlur={() => form.validateFields(["password"])} />
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
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.resolve(); // No validation if the field is empty
                }
                const minLength = 8;
                const hasDigit = /\d/.test(value);
                const hasUpperCase = /[A-Z]/.test(value);
                const hasSpecialChar = /[@#$%^&+=!]/.test(value);
                const hasSpace = /\s/.test(value);
                const startsWithSpace = /^\s/.test(value);
                const endsWithSpace = /\s$/.test(value);

                if (value.length < minLength) {
                  return Promise.reject("Password must be at least 8 characters long");
                }
                if (!hasDigit) {
                  return Promise.reject("Password must contain at least one digit");
                }
                if (!hasUpperCase) {
                  return Promise.reject("Password must have at least one capital letter");
                }
                if (!hasSpecialChar) {
                  return Promise.reject("Password must contain at least one special character (@#$%^&+=!)");
                }
                if (hasSpace) {
                  return Promise.reject("Password must not contain space characters");
                }
                if (startsWithSpace || endsWithSpace) {
                  return Promise.reject("Passwords cannot begin or end with a space character");
                }

                const originalPassword = getFieldValue("password");

                if (value === originalPassword) {
                  return Promise.resolve();
                }

                return Promise.reject("Passwords do not match");
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            type="password"
            style={styledInput}
            onBlur={() => form.validateFields(["confirm-password"])}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAccountModal;
