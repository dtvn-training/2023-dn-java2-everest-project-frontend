import { UploadOutlined } from "@ant-design/icons";
import { Button, Collapse, DatePicker, Form, Image, Input, Modal, Select, Upload, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import useCreateCampaign from "hooks/campaigns/useCreateCampaign";
import moment from "moment";
import { useState } from "react";
import "styles/Campaign/CreateCampaignModal.css";
import * as validators from "utils/validation";

const { Option } = Select;
const { Panel } = Collapse;

const CreateCampaignModal = ({ isModalOpen, handleOk, handleCancel, submitData }) => {
  const [form] = useForm();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  const handleStartDateChange = (value, date) => {
    if (date) {
      const formattedStartTimestamp = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ").toString();
      setStartDate(formattedStartTimestamp);
      setEndDate(endDate);
    }
  };
  const handleEndDateChange = (value, date) => {
    if (date) {
      const formattedEndTimestamp = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ").toString();
      setStartDate(startDate);
      setEndDate(formattedEndTimestamp);
    }
  };
  const { createCampaign } = useCreateCampaign();

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

      if (values.createpreview && values.createpreview.length > 0) {
        formData.append("file", values.createpreview[0].originFileObj);
      }

      formData.append("data", new Blob([JSON.stringify(campaignData)], { type: "application/json" }));

      console.log(formData);

      const response = await createCampaign(formData);
      if (response?.code === 400) {
        return message.error(response?.message);
      } else {
        message.success(response?.message);
        form.resetFields();
        handleCancel();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);
    return false;
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
                  validator: (_, value) => validators.validateName(value),
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
                    id="start-date-picker"
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder="Select Start Date"
                    onChange={handleStartDateChange}
                  />
                </Form.Item>
                <Form.Item label="End date" name="enddate">
                  <DatePicker
                    id="end-date-picker"
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder="Select End Date"
                    disabledDate={disabledEndDate}
                    disabledTime={(current, type) => disabledEndDateTime(current, type)}
                    onChange={handleEndDateChange}
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
                    validators.validateNumber(value, "Please input your Budget!", "Budget must be a number!", "Budget"),
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
                  validator: (_, value) => validators.validateBidAmount(value, form.getFieldValue("budget")),
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
                  validator: (_, value) => validators.validateTitle(value),
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
export default CreateCampaignModal;
