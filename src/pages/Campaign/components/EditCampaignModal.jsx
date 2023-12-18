import { UploadOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Image, Input, Modal, Upload, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import useEditCampaign from "hooks/campaigns/useEditCampaign";
import moment from "moment";
import { useEffect, useState } from "react";
import "styles/Campaign/EditCampaignModal.css";
import * as validators from "utils/validation";
import DatePickerSection from "./Sections/DatePickerSection";
import FileUploadSection from "./Sections/FileUploadSection";
import FormSection from "./Sections/FormSection";
import StatusSelect from "./Sections/StatusSelect";

const { Panel } = Collapse;

const EditCampaignModal = ({ isModalOpen, handleOk, handleCancel, initialData }) => {
  const [form] = useForm();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    console.log("init", initialData);

    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData, form]);

  const { editCampaign } = useEditCampaign();

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
        startDate: moment(values.startDate.$d).format("YYYY-MM-DDTHH:mm:ssZ"),
        endDate: moment(values.endDate.$d).format("YYYY-MM-DDTHH:mm:ssZ"),
        budget: values.budget,
        bidAmount: values.bidamount ? values.bidamount : 0,
        status: values.status === "ACTIVE" ? true : false,
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

      const id = initialData.campaignId.toString();
      const token = window.localStorage.getItem("accessToken");
      const response = await editCampaign({ id, formData, token });
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
            <FormSection
              label="Name"
              name="name"
              rules={[{ required: false }, { validator: (_, value) => validators.validateName(value) }]}
            >
              <Input style={styledInput} />
            </FormSection>
            <StatusSelect
              label="User Status"
              name="status"
              options={userStatus}
              styledInput={styledInput}
              rules={[{ required: true, message: "Please choose status!" }]}
            />
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
                  name="startDate"
                  onChange={handleStartDateChange}
                  styledInput={styledInput}
                />
                <DatePickerSection
                  label="End date"
                  name="endDate"
                  disabledDate={disabledEndDate}
                  disabledTime={(current, type) => disabledEndDateTime(current, type)}
                  onChange={handleEndDateChange}
                  styledInput={styledInput}
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
              name="budget"
              rules={[
                { required: false },
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
              name="bidAmount"
              rules={[
                { required: false },
                { validator: (_, value) => validators.validateBidAmount(value, form.getFieldValue("budget")) },
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
              rules={[{ required: false }, { validator: (_, value) => validators.validateTitle(value) }]}
            >
              <Input style={styledInput} />
            </FormSection>
            <FormSection label="Description" name="description" rules={[{ required: false }]}>
              <Input style={styledInput} />
            </FormSection>
            <FileUploadSection
              label="Creative Preview"
              name="createpreview"
              rules={[{ required: true, message: "Please submit your image" }]}
              beforeUpload={beforeUpload}
              styledInput={styledInput}
            >
              <Upload showUploadList={false} beforeUpload={beforeUpload}>
                <Button style={styledInput} icon={<UploadOutlined />}>
                  Click to Upload
                </Button>
              </Upload>
            </FileUploadSection>
            {imageUrl && (
              <FormSection label="Preview Image">
                <div style={{ overflow: "hidden", marginLeft: "2.5em" }}>
                  <Image src={imageUrl} alt="Uploaded" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </FormSection>
            )}
            <FormSection label="Final URL" name="finalUrl" rules={[{ required: false }]}>
              <Input style={styledInput} />
            </FormSection>
          </Form>
        </Panel>
      </Collapse>
    </Modal>
  );
};
export default EditCampaignModal;
