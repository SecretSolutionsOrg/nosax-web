import { Card, Table, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Library = () => {
  const navigate = useNavigate();

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
      status: ["saved"],
    },
    {
      key: "2",
      name: "Research #2",
      researcher: "Ayong, Airven",
      adviser: "Sir",
      status: ["saved"],
    },
    {
      key: "3",
      name: "Research #3",
      researcher: "Kobe, Mike",
      adviser: "Maam/Sir",
      status: ["saved"],
    },
    {
      key: "4",
      name: "Research #4",
      researcher: "Janjan, Bryn, Igme",
      adviser: "Maam",
      status: ["saved"],
    },
    {
      key: "5",
      name: "Research #5",
      researcher: "Ayong, Airven",
      adviser: "Sir",
      status: ["saved"],
    },
    {
      key: "6",
      name: "Research #6",
      researcher: "Kobe, Mike",
      adviser: "Maam/Sir",
      status: ["saved"],
    },
    {
      key: "7",
      name: "Research #7",
      researcher: "Janjan, Bryn, Igme",
      adviser: "Maam",
      status: ["saved"],
    },
    {
      key: "8",
      name: "Research #8",
      researcher: "Ayong, Airven",
      adviser: "Sir",
      status: ["saved"],
    },
    {
      key: "9",
      name: "Research #9",
      researcher: "Kobe, Mike",
      adviser: "Maam/Sir",
      status: ["saved"],
    },
    {
      key: "10",
      name: "Research #10",
      researcher: "Janjan, Bryn, Igme",
      adviser: "Maam",
      status: ["saved"],
    },
    {
      key: "11",
      name: "Research #11",
      researcher: "Ayong, Airven",
      adviser: "Sir",
      status: ["saved"],
    },
    {
      key: "12",
      name: "Research #12",
      researcher: "Kobe, Mike",
      adviser: "Maam/Sir",
      status: ["saved"],
    },
  ];

  return (
    <Card title="Personal Library" style={{ width: "100%" }}>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
      />
    </Card>
  );
};

export default Library;
