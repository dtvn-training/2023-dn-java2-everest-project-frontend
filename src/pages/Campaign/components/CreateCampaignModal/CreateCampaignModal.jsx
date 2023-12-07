import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Select, Button, Image, Modal, Collapse } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";
import { UploadOutlined } from "@ant-design/icons";
import "./CreateCampaignModal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";

const { Option } = Select;
const { Panel } = Collapse;
const CreateCampaignModal = ({ isModalOpen, handleOk, handleCancel, submitData }) => {
  const [form] = useForm();
  const editFlag = false;

  const [startDate, setStartDate] = React.useState(setHours(setMinutes(new Date(), 0), 9));
  const [endDate, setEndDate] = React.useState(setHours(setMinutes(new Date(), 0), 18));

  const initialMinTime = editFlag ? setHours(setMinutes(new Date(), 0), 18) : setHours(setMinutes(new Date(), 0), 0);
  const [minTime, setMinTime] = React.useState(initialMinTime);
  const [maxTime, setMaxTime] = React.useState(setHours(setMinutes(new Date(), 59), 23));
  const styledInput = {
    marginLeft: "2.5em",
  };
  const userStatus = [
    {
      status_id: "1",
      status_name: "ACTIVE",
    },
    {
      status_id: "2",
      status_name: "INACTIVE",
    },
  ];
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const styledCollapse = { backgroundColor: "#468FAF", color: "#FFFFFF" };
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
  const validateTitle = (_, value) => {
    const minLength = 2;
    const maxLength = 50;
    if (!value) {
      return Promise.reject("Please enter your title.");
    }
    if (value.length < minLength || value.length > maxLength) {
      return Promise.reject(`Title must be between ${minLength} and ${maxLength} characters.`);
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
  const validateBidAmount = (_, value) => {
    const budgetFieldValue = form.getFieldValue("Budget");

    if (value && budgetFieldValue && parseFloat(value) > parseFloat(budgetFieldValue)) {
      return Promise.reject("Bid Amount must be less than or equal to Budget.");
    }

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
      <Collapse
        defaultActiveKey={["1"]}
        accordion
        expandIconPosition="right"
        style={styledCollapse}
        className="custom-collapse"
      >
        <Panel header={<div style={styledCollapse}>Details</div>} key="1">
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
                {userStatus.map((status) => (
                  <Option key={status.status_id} value={status.status_name}>
                    {status.status_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <Collapse
        defaultActiveKey={["2"]}
        accordion
        expandIconPosition="right"
        style={styledCollapse}
        className="custom-collapse"
      >
        <Panel header={<div style={styledCollapse}>Schedule</div>} key="2">
          <div className="schedule-panel-content">
            <div className="schedule-label">Schedule</div>
            <Form form={form} {...formItemLayout} labelAlign="left" onFinish={onFinish}>
              <div className="date-picker-container">
                <Form.Item label="Start date" name="startdate">
                  <DatePicker
                    selected={startDate}
                    showTimeSelect
                    onChange={(date) => {
                      if (date.getDate() === new Date().getDate()) {
                        setMinTime(setHours(setMinutes(new Date(), 0), 18));
                      } else {
                        setMinTime(setHours(setMinutes(new Date(), 0), 0));
                      }
                      setStartDate(date);
                    }}
                    minTime={editFlag ? minTime : false}
                    maxTime={editFlag ? maxTime : false}
                    timeIntervals={1}
                    dateFormat="yyyy-MM-dd hh:mm aa"
                    todayButton={"TODAY"}
                    className="custom-date-picker"
                  />
                </Form.Item>
                <Form.Item label="End date" name="enddate">
                  <DatePicker
                    selected={endDate}
                    showTimeSelect
                    onChange={(date) => {
                      setEndDate(date);
                    }}
                    minTime={editFlag ? minTime : false}
                    maxTime={editFlag ? maxTime : false}
                    timeIntervals={1}
                    dateFormat="yyyy-MM-dd hh:mm aa"
                    todayButton={"TODAY"}
                    className="custom-date-picker"
                  />
                </Form.Item>
              </div>
            </Form>
          </div>
        </Panel>
      </Collapse>
      <Collapse
        defaultActiveKey={["3"]}
        accordion
        expandIconPosition="right"
        style={styledCollapse}
        className="custom-collapse"
      >
        <Panel header={<div style={styledCollapse}>Budget</div>} key="3">
          <Form form={form} {...formItemLayout} labelAlign="left" onFinish={onFinish}>
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
          </Form>
        </Panel>
      </Collapse>
      <Collapse
        defaultActiveKey={["4"]}
        accordion
        expandIconPosition="right"
        style={styledCollapse}
        className="custom-collapse"
      >
        <Panel header={<div style={styledCollapse}>Bidding</div>} key="4">
          <Form form={form} {...formItemLayout} labelAlign="left" onFinish={onFinish}>
            <Form.Item
              label="Bid Amount"
              name="bidamount"
              className="custom-label-input"
              rules={[
                {
                  required: false,
                },
                {
                  validator: (_, value) => validateBidAmount(_, value),
                },
              ]}
              hasFeedback
            >
              <Input style={styledInput} />
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <Collapse
        defaultActiveKey={["5"]}
        accordion
        expandIconPosition="right"
        style={styledCollapse}
        className="custom-collapse"
      >
        <Panel header={<div style={styledCollapse}>Creative</div>} key="5">
          <Form form={form} {...formItemLayout} labelAlign="left" onFinish={onFinish}>
            <Form.Item
              label="Title"
              name="title"
              className="custom-label-input"
              rules={[
                {
                  required: false,
                },
                {
                  validator: validateTitle,
                },
              ]}
              hasFeedback
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
              <Upload showUploadList={false} beforeUpload={beforeUpload}>
                <Button style={styledInput} icon={<UploadOutlined />}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
            {imageUrl && (
              <Form.Item label="Preview Image">
                <div style={{ overflow: "hidden", marginLeft: "2.5em" }}>
                  <Image src={imageUrl} alt="Uploaded" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
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
        </Panel>
      </Collapse>
    </Modal>
  );
};
export default CreateCampaignModal;
