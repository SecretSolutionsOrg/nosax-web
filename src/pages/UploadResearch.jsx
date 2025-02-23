import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Select,
  Card,
  Space,
  Divider,
  Row,
  Col,
  notification,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { addResearch } from "../store/research";

const { Option } = Select;

const UploadResearch = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const gradeSections = [
    "Grade 7 - STE",
    "Grade 8 - STE",
    "Grade 9 - STE",
    "Grade 10 - STE",
    "Grade 10 - GENERAL",
    "Grade 11 - STEM",
    "Grade 11 - ABM",
    "Grade 11 - Humms",
    "Grade 11 - GAS",
    "Grade 11 - Arts and Design",
    "Grade 11 - ICT",
    "Grade 11 - Sports Track",
    "Grade 12 - STEM",
    "Grade 12 - ABM",
    "Grade 12 - Humms",
    "Grade 12 - GAS",
    "Grade 12 - Arts and Design",
    "Grade 12 - ICT",
    "Grade 12 - Sports Track",
  ];

  const categories = [
    "Life Science",
    "Applied Science",
    "Robotics",
    "Software",
    "Mathematical and Computational",
  ];

  const handleFileChange = ({ file }) => {
    if (file.type !== "application/pdf") {
      message.error("Only PDF files are allowed!");
      form.setFields([{ name: "pdf", errors: ["Please upload a PDF file."] }]);
      return;
    }

    setFile(file);
    form.setFields([{ name: "pdf", errors: [] }]);
  };

  const handleSubmit = async (values) => {
    if (!file) {
      form.setFields([{ name: "pdf", errors: ["Please upload a PDF file."] }]);
      return;
    }

    setLoading(true);

    try {
      const researchData = {
        title: values.title,
        researchers: values.researchers.map((a) => a.researcher).join(", "),
        adviser: values.adviser,
        gradeSection: values.gradeSection,
        category: values.category,
        file: file.name,
      };

      await addResearch(researchData);

      openNotificationWithIcon("success", "Successful research upload");
      form.resetFields();
      setFile(null);
    } catch (error) {
      console.error("Error adding research:", error);
      openNotificationWithIcon("error", "Unsuccessful research upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Card title="Upload Research" style={{ width: "100%" }}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter the title" }]}
              >
                <Input placeholder="Enter research title" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Grade & Section"
                name="gradeSection"
                rules={[
                  { required: true, message: "Please select grade & section" },
                ]}
              >
                <Select placeholder="Select grade & section">
                  {gradeSections.map((gs) => (
                    <Option key={gs} value={gs}>
                      {gs}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Adviser"
                name="adviser"
                rules={[
                  { required: true, message: "Please enter adviser name" },
                ]}
              >
                <Input placeholder="Enter adviser name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select placeholder="Select a category">
                  {categories.map((cat) => (
                    <Option key={cat} value={cat}>
                      {cat}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Divider orientation="center">Researchers</Divider>
              <div style={{ textAlign: "center" }}>
                <Form.List name="researchers" initialValue={[{}]}>
                  {(fields, { add, remove }) => (
                    <div style={{ marginBottom: 16 }}>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{
                            display: "flex",
                            marginBottom: 8,
                            justifyContent: "center",
                          }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "researcher"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter researcher name",
                              },
                            ]}
                            style={{ width: "100%" }}
                          >
                            <Input
                              placeholder="Enter researcher name"
                              style={{ textAlign: "center" }}
                            />
                          </Form.Item>
                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              onClick={() => remove(name)}
                              style={{
                                color: "red",
                                fontSize: "16px",
                                cursor: "pointer",
                              }}
                            />
                          )}
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Researcher
                      </Button>
                    </div>
                  )}
                </Form.List>
              </div>
            </Col>

            <Col xs={24} sm={12}>
              <Divider orientation="center">Upload PDF</Divider>
              <div style={{ textAlign: "center" }}>
                <Form.Item
                  name="pdf"
                  rules={[
                    { required: true, message: "Please upload a pdf file" },
                  ]}
                >
                  <Upload
                    beforeUpload={(file) => {
                      if (file.type !== "application/pdf") {
                        message.error("You can only upload PDF files!");
                        return Upload.LIST_IGNORE;
                      }
                      return false;
                    }}
                    accept=".pdf"
                    maxCount={1}
                    onChange={handleFileChange}
                  >
                    <Button type="dashed" icon={<UploadOutlined />}>
                      Click to Upload
                    </Button>
                  </Upload>
                </Form.Item>
              </div>
            </Col>
          </Row>

          <Divider />
          <div style={{ textAlign: "center" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default UploadResearch;
