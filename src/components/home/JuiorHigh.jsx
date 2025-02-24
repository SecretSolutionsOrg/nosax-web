import { useEffect, useState } from "react";
import { Avatar, List, Skeleton } from "antd";
import { FilePdfTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { db } from "../../store/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

const JuniorHigh = () => {
  const [loading, setLoading] = useState(true);
  const [researches, setResearches] = useState([]);

  useEffect(() => {
    const fetchResearches = async () => {
      const researchRef = collection(db, "researches");
      const q = query(
        researchRef,
        where("grade_section", "in", [
          "Grade 7 - STE",
          "Grade 8 - STE",
          "Grade 9 - STE",
          "Grade 10 - STE",
          "Grade 10 - GENERAL",
        ])
      );
      const querySnapshot = await getDocs(q);

      const researchList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setResearches(researchList);
      setLoading(false);
    };

    fetchResearches();
  }, []);

  return (
    <List
      className="demo-loadmore-list"
      loading={loading}
      itemLayout="horizontal"
      dataSource={researches}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Link key="list-loadmore-view" to={`/research?id=${item.id}`}>
              View
            </Link>,
          ]}
        >
          <Skeleton avatar title={false} loading={loading} active>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: "white" }}
                  icon={<FilePdfTwoTone />}
                />
              }
              title={item.title}
              description={item.researchers || "Unknown Researchers"}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default JuniorHigh;
