import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Select, Button, Image, Modal, Collapse, DatePicker } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";
import { UploadOutlined } from "@ant-design/icons";
import "./EditCampaignModal.css";
import moment from "moment";
import useCreateCampaign from "../../../../hooks/campaigns/useCreateCampaign";

const { Option } = Select;
const { Panel } = Collapse;

const EditCampaignModal = ({ isModalOpen, handleOk, handleCancel, initialData }) => {
  const [form] = useForm();
  const [startDate, setStartDate] = useState(null);
  useEffect(() => {
    if (initialData) {
      const { name, userstatus, startdate, enddate, Budget, bidamount } = initialData;

      form.setFieldsValue({
        name,
        userstatus,
        startdate: moment(startdate),
        enddate: moment(enddate),
        Budget,
        bidamount,
        createpreview: [],
      });

      setStartDate(moment(startdate));
      setImageUrl(initialData.creativesDTO?.image || null);
    }
  }, [initialData, form]);
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

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const { createCampaign, isLoading, isError, error } = useCreateCampaign();

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
  const [imageUrl, setImageUrl] = useState(null);
  const onFinish = async (values) => {
    const campaignData = {
      campaignDTO: {
        name: values.name,
        startDate: moment(values.startdate.$d).format("YYYY-MM-DDTHH:mm:ssZ"),
        endDate: moment(values.enddate.$d).format("YYYY-MM-DDTHH:mm:ssZ"),
        budget: values.Budget,
        bidAmount: values.bidamount ? values.bidamount : 0,
        status: values.userstatus === "ACTIVE" ? true : false,
      },
      creativesDTO: {
        title: values.title,
        description: values.description,
        finalUrl: values.final_url,
      },
    };
    console.log("Received values:", values);
    try {
      const formData = new FormData();

      // Append image file to formData
      if (values.createpreview && values.createpreview.length > 0) {
        formData.append("file", values.createpreview[0].originFileObj);
      }
      // Add your form values to formData
      formData.append("data", JSON.stringify(campaignData));
      // Call the createCampaign function from the hook
      await createCampaign(formData);

      // Handle success if needed
    } catch (error) {
      // Handle error if needed
    }
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
      title="Edit Campaign"
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
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder="Select Start Date"
                    onChange={handleStartDateChange}
                  />
                </Form.Item>
                <Form.Item label="End date" name="enddate">
                  <DatePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder="Select End Date"
                    disabledDate={disabledEndDate}
                    disabledTime={(current, type) => disabledEndDateTime(current, type)}
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
              name="final_url"
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
export default EditCampaignModal;
