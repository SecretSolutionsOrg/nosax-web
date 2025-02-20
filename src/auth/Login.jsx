import { Row, Col, Form, Input, Button, Typography, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";

const { Title } = Typography;

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values: ", values);
    // Add Firebase login logic here
  };

  return (
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
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
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
                <Button type="primary" htmlType="submit" block>
                  Sign In
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
