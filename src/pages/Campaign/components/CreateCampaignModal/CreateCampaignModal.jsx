import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Select, Button, Image, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";
import { UploadOutlined } from "@ant-design/icons";

const CreateCampaignModal = ({ isModalOpen, handleOk, handleCancel, submitData }) => {
  const [form] = useForm();
  const { Option } = Select;
  const styledInput = {
    marginLeft: "2.5em",
  };
  const roles = [
    {
      role_id: "1",
      role_name: "ACTIVE",
    },
    {
      role_id: "2",
      role_name: "INACTIVE",
    },
  ];
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const [isEmptyErrorDisplayed, setEmptyErrorDisplayed] = useState(false);

  const validateName = (_, value) => {
    const minLength = 2;
    const maxLength = 50;

    if (!value) {
      return Promise.reject("Please enter your name.");
    }

    if (value.length < minLength || value.length > maxLength) {
      return Promise.reject(`Name must be between ${minLength} and ${maxLength} characters.`);
    }

    const specialCharactersRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]{2,}$/;

    if (!specialCharactersRegex.test(value)) {
      return Promise.reject("Name cannot contain special characters");
    }

    return Promise.resolve();
  };
  const validateNumber = (_, value, msgReject, msgResolve, type) => {
    const minValue = 0;
    const maxValue = 10000000000;
    if (!value) {
      setEmptyErrorDisplayed(true);
      return Promise.reject(msgReject);
    }
    if (isNaN(value)) {
      setEmptyErrorDisplayed(false);
      return Promise.reject(msgResolve);
    }
    if (value < minValue) {
      return Promise.reject(`${type} must be a positive number`);
    }
    if (value > maxValue) {
      return Promise.reject(`${type} is too large`);
    }
    setEmptyErrorDisplayed(false);
    return Promise.resolve();
  };
  const [imageUrl, setImageUrl] = React.useState(null);

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const beforeUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };

    reader.readAsDataURL(file);

    return false; // Prevent default upload behavior
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <Modal
      title="Create Campaign"
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
          label="Name"
          name="name"
          className="custom-label-input"
          rules={[
            {
              required: false,
            },
            {
              validator: validateName,
            },
          ]}
          hasFeedback
        >
          <Input style={styledInput} />
        </Form.Item>
        <Form.Item
          label="User Status"
          name="userstatus"
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
          hasFeedback
        >
          <Input style={styledInput} />
        </Form.Item>
        <Form.Item
          label="Budget"
          name="Budget"
          className="custom-label-input"
          rules={[
            {
              required: false,
            },
            {
              validator: (_, value) =>
                validateNumber(_, value, "Please input your Budget!", "Budget must be a number!", "Budget"),
            },
          ]}
          hasFeedback
        >
          <Input style={styledInput} />
        </Form.Item>
        <Form.Item
          label="Bid Amount"
          name="bidamount"
          className="custom-label-input"
          rules={[
            {
              required: false,
            },
            {
              validator: (_, value) =>
                validateNumber(_, value, "Please input your bid amount!", "Bid amount must be a number!", "Bid amount"),
            },
          ]}
          hasFeedback
        >
          <Input style={styledInput} />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please input title!",
            },
          ]}
        >
          <Input style={styledInput} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          className="custom-label-input"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input style={styledInput} />
        </Form.Item>
        <Form.Item
          label="Creative Preview"
          name="createpreview"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please submit your image",
            },
          ]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            showUploadList={false} // Ẩn danh sách upload mặc định của Ant Design
            beforeUpload={beforeUpload}
          >
            <Button style={styledInput} icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>

        {imageUrl && (
          <Form.Item label="Preview Image">
            <Image src={imageUrl} alt="Uploaded" style={({ maxWidth: "100%" }, styledInput)} />
          </Form.Item>
        )}
        <Form.Item
          label="Final URL"
          name="final url"
          className="custom-label-input"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input style={styledInput} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCampaignModal;
