import { useState } from "react";
import { Form, Input, Select, Button, Radio, Card, Row, Col } from "antd";
import logo from "../assets/logo.png";

const { Option } = Select;

const Register = () => {
  const [role, setRole] = useState("student");

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Row
        gutter={[16, 16]}
        align="middle"
        style={{ width: "100%", maxWidth: "1000px" }}
      >
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
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Card style={{ width: "100%" }}>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Register As" name="role" initialValue="student">
                <Radio.Group onChange={(e) => setRole(e.target.value)}>
                  <Radio value="student">Student</Radio>
                  <Radio value="teacher">Teacher</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Age"
                name="age"
                rules={[{ required: true, message: "Please enter your age!" }]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
              >
                <Select>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>

              {role === "student" ? (
                <>
                  <Form.Item
                    label="Grade & Section"
                    name="grade_section"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your grade and section!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="LRN"
                    name="lrn"
                    rules={[
                      { required: true, message: "Please enter your LRN!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </>
              ) : (
                <Form.Item
                  label="DepEd ID"
                  name="deped_id"
                  rules={[
                    { required: true, message: "Please enter your DepEd ID!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirm_password"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <div style={{ marginTop: 40 }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Register
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
