import { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  Card,
  notification,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
import { auth } from "../store/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const onFinish = async (values) => {
    const { email, password } = values;
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      openNotificationWithIcon("error", "Unsuccessful login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Row style={{ minHeight: "100vh" }} align="middle" justify="center">
        {/* Left Column - Logo */}
        <Col xs={24} md={10} style={{ textAlign: "center", padding: "20px" }}>
          <img
            src={logo}
            alt="App Logo"
            style={{ maxWidth: "60%", height: "auto" }}
          />
        </Col>

        {/* Right Column - login Form */}
        <Col xs={24} md={10}>
          <Card
            style={{ padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
          >
            <Title level={2} style={{ textAlign: "center" }}>
              Login
            </Title>
            <Form name="login" layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <div style={{ marginTop: 40 }}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                  >
                    Sign In
                  </Button>
                </Form.Item>
              </div>

              <Text style={{ display: "block", textAlign: "center" }}>
                Don&apos;t have an account?{" "}
                <Link to="/register">Register here</Link>
              </Text>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
