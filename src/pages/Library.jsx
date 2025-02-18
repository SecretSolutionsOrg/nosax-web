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
      title: "Researchers",
      dataIndex: "researchers",
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
      researchers: "Janjan, Bryn, Igme",
      adviser: "Maam",
      tags: ["saved"],
    },
    {
      key: "2",
      name: "Research #2",
      researchers: "Ayong, Airven",
      adviser: "Sir",
      tags: ["saved"],
    },
    {
      key: "3",
      name: "Research #3",
      researchers: "Kobe, Mike",
      adviser: "Maam/Sir",
      tags: ["saved"],
    },
    {
      key: "4",
      name: "Research #4",
      researchers: "Janjan, Bryn, Igme",
      adviser: "Maam",
      tags: ["saved"],
    },
    {
      key: "5",
      name: "Research #5",
      researchers: "Ayong, Airven",
      adviser: "Sir",
      tags: ["saved"],
    },
    {
      key: "6",
      name: "Research #6",
      researchers: "Kobe, Mike",
      adviser: "Maam/Sir",
      tags: ["saved"],
    },
    {
      key: "7",
      name: "Research #7",
      researchers: "Janjan, Bryn, Igme",
      adviser: "Maam",
      tags: ["saved"],
    },
    {
      key: "8",
      name: "Research #8",
      researchers: "Ayong, Airven",
      adviser: "Sir",
      tags: ["saved"],
    },
    {
      key: "9",
      name: "Research #9",
      researchers: "Kobe, Mike",
      adviser: "Maam/Sir",
      tags: ["saved"],
    },
    {
      key: "10",
      name: "Research #10",
      researchers: "Janjan, Bryn, Igme",
      adviser: "Maam",
      tags: ["saved"],
    },
    {
      key: "11",
      name: "Research #11",
      researchers: "Ayong, Airven",
      adviser: "Sir",
      tags: ["saved"],
    },
    {
      key: "12",
      name: "Research #12",
      researchers: "Kobe, Mike",
      adviser: "Maam/Sir",
      tags: ["saved"],
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card title="Personal Library" style={{ width: "100%" }}>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: "max-content" }}
        />
      </Card>
    </div>
  );
};

export default Library;
