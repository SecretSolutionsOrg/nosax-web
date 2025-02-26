import { useEffect, useState } from "react";
import { Card, Table, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "../store/firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

const Library = () => {
  const [libraryData, setLibraryData] = useState([]);
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibrary = async () => {
      if (!currentUser) return;

      const libraryRef = collection(db, "library");
      const q = query(libraryRef, where("userId", "==", currentUser.uid));
      const librarySnap = await getDocs(q);

      const researchData = await Promise.all(
        librarySnap.docs.map(async (docSnap) => {
          const researchRef = doc(db, "researches", docSnap.data().researchId);
          const researchSnap = await getDoc(researchRef);
          return researchSnap.exists()
            ? { id: docSnap.data().researchId, ...researchSnap.data() }
            : null;
        })
      );

      setLibraryData(researchData.filter((item) => item !== null));
    };

    fetchLibrary();
  }, [currentUser, libraryData]);

  const columns = [
    {
      title: "Research",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link
          to={`/research?id=${record.id}`}
          onClick={() => navigate(`/research?id=${record.id}`)}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Researcher",
      dataIndex: "researchers",
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
      render: () => (
        <Tag color="green" key="saved">
          SAVED
        </Tag>
      ),
    },
  ];

  return (
    <Card title="Personal Library" style={{ width: "100%" }}>
      <Table
        columns={columns}
        dataSource={libraryData}
        scroll={{ x: "max-content" }}
      />
    </Card>
  );
};

export default Library;
