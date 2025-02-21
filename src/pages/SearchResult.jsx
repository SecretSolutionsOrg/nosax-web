import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { List, Skeleton, Avatar, Spin, Card } from "antd";
import { FilePdfTwoTone } from "@ant-design/icons";
// import { firestore } from "../firebaseConfig";
// import { collection, query, where, getDocs } from "firebase/firestore";

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";
  const [researchList, setResearchList] = useState([]);
  const [loading, setLoading] = useState(true);

  // for txt
  useEffect(() => {
    const fetchResearch = async () => {
      setLoading(true);
      try {
        const response = await fetch("/src/assets/research.txt");
        const text = await response.text();
        const data = text.split("\n").map((line) => {
          const [title, researcher, adviser] = line.split("|");
          return {
            title: title.trim(),
            researcher: researcher?.trim(),
            adviser: adviser?.trim(),
          };
        });

        const filteredData = data.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResearchList(filteredData);
      } catch (error) {
        console.error("Error fetching research:", error);
      }
      setLoading(false);
    };
    if (searchQuery) {
      fetchResearch();
    }
  }, [searchQuery]);

  // // For firebase
  // useEffect(() => {
  //   const fetchResearch = async () => {
  //     setLoading(true);
  //     try {
  //       const q = query(
  //         collection(firestore, "research"),
  //         where("title", ">=", searchQuery),
  //         where("title", "<=", searchQuery + "\uf8ff")
  //       );
  //       const querySnapshot = await getDocs(q);
  //       const results = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setResearchList(results);
  //     } catch (error) {
  //       console.error("Error fetching research:", error);
  //     }
  //     setLoading(false);
  //   };
  //   if (searchQuery) {
  //     fetchResearch();
  //   }
  // }, [searchQuery]);

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
                    to={`/research/${encodeURIComponent(item.title)}`}
                    onClick={() =>
                      navigate(`/research/${encodeURIComponent(item.title)}`)
                    }
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
                          <strong>Researcher:</strong> {item.researcher}
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
