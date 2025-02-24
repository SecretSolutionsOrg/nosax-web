import { useEffect, useState } from "react";
import { Avatar, List, Skeleton } from "antd";
import { FilePdfTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { db } from "../../store/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

const SeniorHigh = () => {
  const [loading, setLoading] = useState(true);
  const [researches, setResearches] = useState([]);

  useEffect(() => {
    const fetchResearches = async () => {
      const researchRef = collection(db, "researches");
      const q = query(
        researchRef,
        where("grade_section", "in", [
          "Grade 11 - STEM",
          "Grade 11 - ABM",
          "Grade 11 - Humms",
          "Grade 11 - GAS",
          "Grade 11 - Arts and Design",
          "Grade 11 - ICT",
          "Grade 11 - Sports Track",
          "Grade 12 - STEM",
          "Grade 12 - ABM",
          "Grade 12 - Humms",
          "Grade 12 - GAS",
          "Grade 12 - Arts and Design",
          "Grade 12 - ICT",
          "Grade 12 - Sports Track",
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

export default SeniorHigh;
