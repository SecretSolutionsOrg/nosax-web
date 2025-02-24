import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { List, Skeleton, Avatar, Spin, Card } from "antd";
import { FilePdfTwoTone } from "@ant-design/icons";
import { db } from "../store/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore"; // Removed unused `query`

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const [researchList, setResearchList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearch = async () => {
      setLoading(true);
      try {
        const researchRef = collection(db, "researches");
        const q = query(researchRef, where("status", "==", "published"));
        const snapshot = await getDocs(q);

        const researchData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredResults = researchData.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setResearchList(filteredResults);
      } catch (error) {
        console.error("Error fetching research:", error);
      }
      setLoading(false);
    };

    if (searchQuery) {
      fetchResearch();
    }
  }, [searchQuery]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Search Results for &quot;{searchQuery}&quot;</h2>
      {loading ? (
        <Spin
          size="large"
          style={{ display: "block", textAlign: "center", marginTop: 50 }}
        />
      ) : (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={researchList}
          renderItem={(item) => (
            <Card style={{ marginBottom: 16 }}>
              <List.Item
                actions={[
                  <Link
                    key="list-loadmore-view"
                    to={`/research?id=${item.id}`}
                    onClick={() => navigate(`/research?id=${item.id}`)}
                  >
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
                    description={
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>
                          <strong>Researcher:</strong> {item.researchers}
                        </span>
                        <span>
                          <strong>Adviser:</strong> {item.adviser}
                        </span>
                      </div>
                    }
                  />
                </Skeleton>
              </List.Item>
            </Card>
          )}
        />
      )}
    </div>
  );
};

export default SearchResult;
