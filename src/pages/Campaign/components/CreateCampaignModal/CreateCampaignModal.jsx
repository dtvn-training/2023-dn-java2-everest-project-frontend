import React from "react";
import { Form, Input, Upload, Select, Button, Image, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";
import { UploadOutlined } from "@ant-design/icons";

const CreateCampaignModal = ({ isModalOpen, handleOk, handleCancel }) => {
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
  const validateBidAmount = (_, value) => {
    if (isNaN(value)) {
      return Promise.reject("Bid amount must be a number!");
    }
    return Promise.resolve();
  };

  const [imageUrl, setImageUrl] = React.useState(null);

  const onFinish = (values) => {
    // Xử lý khi form được submit
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
      <Form form={form} {...formItemLayout} labelAlign="left">
        <Form.Item
          label="Name"
          name="name"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please input campaign name!",
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
        >
          <Input style={styledInput} />
        </Form.Item>
        <Form.Item
          label="Budget"
          name="Budget"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please input your Budget!",
            },
          ]}
        >
          <Input style={styledInput} />
        </Form.Item>
        <Form.Item
          label="Bid Amount"
          name="bidamount"
          className="custom-label-input"
          rules={[
            {
              required: true,
              message: "Please input your bid amount!",
            },
            {
              validator: validateBidAmount,
            },
          ]}
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
