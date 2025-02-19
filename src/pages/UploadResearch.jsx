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
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { app } from "../firebaseConfig"; // Ensure Firebase is initialized

const { Option } = Select;

// const storage = getStorage(app);
// const db = getFirestore(app);

const UploadResearch = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [strands, setStrands] = useState([]);

  const levels = {
    "Grade 7": ["STE"],
    "Grade 8": ["STE"],
    "Grade 9": ["STE"],
    "Grade 10": ["STE", "GENERAL"],
    "Grade 11": [
      "STEM",
      "ABM",
      "Humms",
      "GAS",
      "Arts and Design",
      "ICT",
      "Sports Track",
    ],
    "Grade 12": [
      "STEM",
      "ABM",
      "Humms",
      "GAS",
      "Arts and Design",
      "ICT",
      "Sports Track",
    ],
  };

  const categories = [
    "Life Science",
    "Applied Science",
    "Robotics",
    "Software",
    "Mathematical and Computational",
  ];

  const handleLevelChange = (level) => {
    setStrands(levels[level] || []);
    form.setFieldsValue({ strand: undefined });
  };

  const handleFileChange = ({ file }) => {
    if (file.status === "done") {
      setFile(file.originFileObj);
      form.setFields([{ name: "pdf", errors: [] }]);
    }
  };

  // const uploadPDF = async (file) => {
  //   const storageRef = ref(storage, `research_papers/${file.name}`);
  //   await uploadBytes(storageRef, file);
  //   return getDownloadURL(storageRef);
  // };

  const handleSubmit = async (values) => {
    console.log(values);

    if (!file) {
      form.setFields([{ name: "pdf", errors: ["Please upload a PDF file."] }]);
      return;
    }

    setLoading(true);

    try {
      // const pdfURL = await uploadPDF(file);
      // const researchData = {
      //   title: values.title,
      //   researchers: values.researchers.map((a) => a.researcher).join(", "),
      //   adviser: values.adviser,
      //   level: values.level,
      //   strand: values.strand,
      //   category: values.category,
      //   pdfURL,
      //   timestamp: new Date(),
      // };

      // await addDoc(collection(db, "research"), researchData);
      message.success("Research added successfully!");
      form.resetFields();
      setFile(null);
      setStrands([]);
    } catch (error) {
      console.error("Error adding research:", error);
      message.error("Failed to add research.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Upload Research" style={{ width: "100%" }}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter research title" />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Adviser"
              name="adviser"
              rules={[{ required: true, message: "Please enter adviser name" }]}
            >
              <Input placeholder="Enter adviser name" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
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

          <Col xs={24} sm={12}>
            <Form.Item
              label="Level"
              name="level"
              rules={[{ required: true, message: "Please select a level" }]}
            >
              <Select placeholder="Select a level" onChange={handleLevelChange}>
                {Object.keys(levels).map((lvl) => (
                  <Option key={lvl} value={lvl}>
                    {lvl}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Strand"
              name="strand"
              rules={[{ required: true, message: "Please select a strand" }]}
            >
              <Select placeholder="Select a strand" disabled={!strands.length}>
                {strands.map((str) => (
                  <Option key={str} value={str}>
                    {str}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

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
                  beforeUpload={() => false}
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
  );
};

export default UploadResearch;
