import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Radio,
  Card,
  Row,
  Col,
  Typography,
  notification,
} from "antd";
import logo from "../assets/logo.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { registerUser } from "../store/user";
import { auth } from "../store/firebase-config";
import { Link, useNavigate } from "react-router-dom";

const { Option } = Select;
const { Text } = Typography;

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

const Register = () => {
  const [role, setRole] = useState("student");
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);

    const { email, name, age, gender, grade_section, lrn, deped_id, password } =
      values;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email,
        name,
        age: Number(age),
        gender,
        role,
        isAdmin: false,
        ...(role === "student" ? { grade_section, lrn } : { deped_id }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await registerUser(user.uid, userData);
      navigate("/");
    } catch (error) {
      console.error("Error register user:", error);
      openNotificationWithIcon("error", "Unsuccessful new registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "#E3F2FD",
        }}
      >
        <Row
          gutter={[16, 16]}
          align="middle"
          style={{ width: "100%", maxWidth: "1000px" }}
        >
          {/* Logo */}
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
                padding: "10px",
              }}
            />
          </Col>

          {/* Form */}
          <Col xs={24} md={12}>
            <Card style={{ width: "100%" }}>
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Register As"
                  name="role"
                  initialValue="student"
                >
                  <Radio.Group onChange={(e) => setRole(e.target.value)}>
                    <Radio value="student">Student</Radio>
                    <Radio value="teacher">Teacher</Radio>
                  </Radio.Group>
                </Form.Item>

                {/* Two-column layout for wider screens */}
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Please enter your email!" },
                        {
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Fullname"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your fullname!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Age"
                      name="age"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your age!",
                        },
                        {
                          type: "number",
                          min: 1,
                          message: "Age must be a positive number!",
                        },
                      ]}
                    >
                      <InputNumber type="number" min={1} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Gender"
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "Please select your gender!",
                        },
                      ]}
                    >
                      <Select>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {role === "student" ? (
                    <>
                      <Col xs={24} md={12}>
                        <Form.Item
                          label="Grade & Section"
                          name="grade_section"
                          rules={[
                            {
                              required: true,
                              message: "Please select your grade and section!",
                            },
                          ]}
                        >
                          <Select placeholder="Select Grade & Section">
                            {gradeSections.map((grade) => (
                              <Option key={grade} value={grade}>
                                {grade}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col xs={24} md={12}>
                        <Form.Item
                          label="LRN"
                          name="lrn"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your LRN!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </>
                  ) : (
                    <Col xs={24}>
                      <Form.Item
                        label="DepEd ID"
                        name="deped_id"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your DepEd ID!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  )}

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Confirm Password"
                      name="confirm_password"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Passwords do not match!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                </Row>

                <div style={{ marginTop: 40 }}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                    >
                      Register
                    </Button>
                  </Form.Item>
                </div>

                <Text style={{ display: "block", textAlign: "center" }}>
                  Already have an account? <Link to="/login">Login here</Link>
                </Text>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Register;
