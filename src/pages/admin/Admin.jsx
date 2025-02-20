import { useState } from "react";
import { Card, Button, List, Typography, Select, Row, Col } from "antd";

const { Option } = Select;

const Admin = () => {
  const isSuperAdmin = true;
  const [admins, setAdmins] = useState([
    "admin1@example.com",
    "admin2@example.com",
  ]);
  const [newAdmin, setNewAdmin] = useState("");
  const [researchRequests, setResearchRequests] = useState([
    {
      id: 1,
      title: "AI in Healthcare",
      researcher: "John Doe",
      adviser: "Dr. Smith",
      pdfLink: "/pdf/trial.pdf",
    },
    {
      id: 2,
      title: "Blockchain Security",
      researcher: "Jane Roe",
      adviser: "Dr. Johnson",
      pdfLink: "/pdf/trial.pdf",
    },
  ]);

  const addAdmin = () => {
    if (newAdmin) {
      setAdmins([...admins, newAdmin]);
      setNewAdmin("");
    }
  };

  const removeAdmin = (admin) => {
    setAdmins(admins.filter((a) => a !== admin));
  };

  const handleRequest = (id, action) => {
    setResearchRequests(researchRequests.filter((req) => req.id !== id));
    console.log(`${action} request with ID: ${id}`);
  };

  return (
    <Row gutter={[16, 16]} justify="center" style={{ padding: 16 }}>
      {isSuperAdmin && (
        <Col xs={24} sm={24} md={12} lg={12}>
          {/* Admin Management Card */}
          <Card title="Manage Admins" style={{ width: "100%" }}>
            <Select
              style={{ width: "100%", marginBottom: 10 }}
              placeholder="Select or enter an admin email"
              value={newAdmin}
              onChange={setNewAdmin}
              showSearch
            >
              {admins.map((admin, index) => (
                <Option key={index} value={admin}>
                  {admin}
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              onClick={addAdmin}
              style={{ width: "100%", marginBottom: 10 }}
            >
              Add Admin
            </Button>
            <List
              dataSource={admins}
              renderItem={(admin, index) => (
                <List.Item
                  key={index}
                  style={{ justifyContent: "center" }}
                  actions={[
                    <Button
                      key={`remove-${index}`}
                      onClick={() => removeAdmin(admin)}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  {admin}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      )}
      <Col
        xs={24}
        sm={24}
        md={isSuperAdmin ? 12 : 24}
        lg={isSuperAdmin ? 12 : 24}
      >
        {/* Research Requests Card */}
        <Card title="Research Requests" style={{ width: "100%" }}>
          <List
            dataSource={researchRequests}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                  display: "flex",
                }}
              >
                <div style={{ flex: 1 }}>
                  <Typography.Text strong>{item.title}</Typography.Text>
                  <br />
                  <Typography.Text type="secondary">
                    Researcher: {item.researcher}
                  </Typography.Text>
                  <br />
                  <Typography.Text type="secondary">
                    Adviser: {item.adviser}
                  </Typography.Text>
                  <br />
                  <a
                    href={item.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    justifyContent: isSuperAdmin
                      ? "flex-start"
                      : window.innerWidth > 768
                      ? "flex-end"
                      : "flex-start",
                    width: "100%",
                  }}
                >
                  <Button
                    key={`accept-${item.id}`}
                    type="primary"
                    onClick={() => handleRequest(item.id, "Accepted")}
                  >
                    Accept
                  </Button>
                  <Button
                    key={`reject-${item.id}`}
                    danger
                    onClick={() => handleRequest(item.id, "Rejected")}
                  >
                    Reject
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Admin;
