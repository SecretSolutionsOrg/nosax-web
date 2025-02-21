import { Card, Row, Col, Table, Tag, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const dataStudent = [
    { key: "Username", value: "This is the first card." },
    { key: "Name", value: "This is the second card." },
    { key: "Age", value: "This is the third card." },
    { key: "Gender", value: "This is the fourth card." },
    { key: "Grade and Section", value: "This is the fifth card." },
    { key: "LRN", value: "This is the sixth card." },
  ];

  const dataTeacher = [
    { key: "Username", value: "This is the first card." },
    { key: "Name", value: "This is the second card." },
    { key: "Age", value: "This is the third card." },
    { key: "Gender", value: "This is the fourth card." },
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
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
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
      status: ["published"],
    },
    {
      key: "2",
      name: "Research #2",
      researcher: "Ayong, Airven",
      adviser: "Sir",
      status: ["published"],
    },
  ];

  return (
    <>
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
      <br />
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
    </>
  );
};

export default Profile;
