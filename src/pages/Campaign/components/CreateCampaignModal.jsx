import { Button, Collapse, Form, Image, Input, Modal, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import useCreateCampaign from "hooks/campaigns/useCreateCampaign";
import moment from "moment";
import { useState } from "react";
import "styles/Campaign/CreateCampaignModal.css";
import * as validators from "utils/validation";
import DatePickerSection from "./Sections/DatePickerSection";
import FileUploadSection from "./Sections/FileUploadSection";
import FormSection from "./Sections/FormSection";
import StatusSelect from "./Sections/StatusSelect";

const { Panel } = Collapse;

const CreateCampaignModal = ({ isModalOpen, handleOk, handleCancel, submitData }) => {
  const [form] = useForm();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

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
            <FormSection label="Name" name="name" rules={[{ validator: (_, value) => validators.validateName(value) }]}>
              <Input style={styledInput} />
            </FormSection>
            <StatusSelect label="User Status" name="userstatus" options={userStatus} styledInput={styledInput} />
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
                <DatePickerSection
                  label="Start date"
                  name="startdate"
                  onChange={handleStartDateChange}
                  disabledDate={disabledEndDate}
                  disabledTime={(current, type) => disabledEndDateTime(current, type)}
                />
                <DatePickerSection
                  label="End date"
                  name="enddate"
                  disabledDate={disabledEndDate}
                  disabledTime={(current, type) => disabledEndDateTime(current, type)}
                  onChange={handleEndDateChange}
                />
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
            <FormSection
              label="Budget"
              name="Budget"
              rules={[
                {
                  validator: (_, value) =>
                    validators.validateNumber(value, "Please input your Budget!", "Budget must be a number!", "Budget"),
                },
              ]}
            >
              <Input style={styledInput} />
            </FormSection>
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
            <FormSection
              label="Bid Amount"
              name="bidamount"
              rules={[
                {
                  validator: (_, value) => validators.validateBidAmount(value, form.getFieldValue("budget")),
                },
              ]}
            >
              <Input style={styledInput} />
            </FormSection>
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
            <FormSection
              label="Title"
              name="title"
              rules={[{ validator: (_, value) => validators.validateTitle(value) }]}
            >
              <Input style={styledInput} />
            </FormSection>
            <FormSection label="Description" name="description">
              <Input style={styledInput} />
            </FormSection>
            <FileUploadSection label="Creative Preview" name="createpreview" beforeUpload={beforeUpload} />
            {imageUrl && (
              <Form.Item label="Preview Image">
                <div style={{ overflow: "hidden", marginLeft: "2.5em" }}>
                  <Image
                    src={imageUrl}
                    alt="Uploaded"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Form.Item>
            )}
            <FormSection label="Final URL" name="final_url">
              <Input style={styledInput} />
            </FormSection>
          </Form>
        </Panel>
      </Collapse>
    </Modal>
  );
};
export default CreateCampaignModal;
