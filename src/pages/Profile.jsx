import { useEffect, useState } from "react";
import { Card, Row, Col, Table, Tag, Divider, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../store/firebase-config";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [researches, setResearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser(userSnap.data());
          fetchResearchData(currentUser.uid);
        }
      }
      setLoading(false);
    };

    const fetchResearchData = async (uid) => {
      const researchRef = collection(db, "researches");
      const q = query(researchRef, where("uploader", "==", uid));
      const querySnapshot = await getDocs(q);

      const researchData = querySnapshot.docs.map((doc) => ({
        key: doc.id,
        title: doc.data().title,
        researcher: doc.data().researchers,
        adviser: doc.data().adviser,
        status: ["published"],
      }));

      setResearches(researchData);
    };

    fetchUserData();
  }, []);

  const dataStudent = [
    { key: "Email", value: user?.email ?? "This is the first card." },
    { key: "Name", value: user?.name ?? "This is the second card." },
    { key: "Age", value: user?.age ?? "This is the third card." },
    {
      key: "Gender",
      value: user?.gender.toUpperCase() ?? "This is the fourth card.",
    },
    {
      key: "Grade and Section",
      value: user?.grade_section ?? "This is the fifth card.",
    },
    { key: "LRN", value: user?.lrn ?? "This is the sixth card." },
  ];

  const dataTeacher = [
    { key: "Email", value: user?.email ?? "This is the first card." },
    { key: "Name", value: user?.name ?? "This is the second card." },
    { key: "Age", value: user?.age ?? "This is the third card." },
    {
      key: "Gender",
      value: user?.gender.toUpperCase() ?? "This is the fourth card.",
    },
    { key: "DepEd ID", value: user?.deped_id ?? "This is the fifth card." },
  ];

  const columns = [
    {
      title: "Research",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link
          to={`/research?id=${record.key}`}
          onClick={() => navigate(`/research?id=${record.key}`)}
        >
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

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <>
      {user?.role === "student" && (
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
            dataSource={researches}
            scroll={{ x: "max-content" }}
          />
        </Card>
      )}

      {user?.role === "teacher" && (
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
            dataSource={researches}
            scroll={{ x: "max-content" }}
          />
        </Card>
      )}
    </>
  );
};

export default Profile;
