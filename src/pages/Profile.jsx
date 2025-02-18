import { Card, Row, Col, Table, Tag, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const dataStudent = [
    { key: "Username", value: "This is the first card." },
    { key: "Name", value: "This is the second card." },
    { key: "Grade and Section", value: "This is the fourth card." },
    { key: "LRN", value: "This is the fifth card." },
  ];

  const dataTeacher = [
    { key: "Username", value: "This is the first card." },
    { key: "Name", value: "This is the second card." },
    { key: "LRN", value: "This is the fifth card." },
  ];

  const columns = [
    {
      title: "Research",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Link to="/research" onClick={() => navigate("/research")}>
          {text}
        </Link>
      ),
    },
    {
      title: "Researcher",
      dataIndex: "researcher",
      key: "researchers",
    },
    {
      title: "Adviser",
      dataIndex: "adviser",
      key: "adviser",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            return (
              <Tag color="green" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "Research #1",
      researcher: "Janjan, Bryn, Igme",
      adviser: "Maam",
      tags: ["published"],
    },
    {
      key: "2",
      name: "Research #2",
      researcher: "Ayong, Airven",
      adviser: "Sir",
      tags: ["published"],
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Card title="Profile Student" style={{ width: "100%" }}>
          <Row gutter={[16, 16]}>
            {dataStudent.map((item) => (
              <Col key={item.key} xs={24} sm={12}>
                <Card title={item.key} size="small">
                  <p>{item.value}</p>
                </Card>
              </Col>
            ))}
          </Row>
          <Divider orientation="left">Published Papers</Divider>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: "max-content" }}
          />
        </Card>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Card title="Profile Teacher" style={{ width: "100%" }}>
          <Row gutter={[16, 16]}>
            {dataTeacher.map((item) => (
              <Col key={item.key} xs={24} sm={12}>
                <Card title={item.key} size="small">
                  <p>{item.value}</p>
                </Card>
              </Col>
            ))}
          </Row>
          <Divider orientation="left">Published Papers</Divider>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: "max-content" }}
          />
        </Card>
      </div>
    </>
  );
};

export default Profile;
