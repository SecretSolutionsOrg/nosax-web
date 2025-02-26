import { useState, useEffect } from "react";
import { Card, Button, List, Typography, Row, Col, notification } from "antd";
import { db } from "../../store/firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { supabase } from "../../store/superbaseClient";

const Admin = () => {
  const [researchRequests, setResearchRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  useEffect(() => {
    const fetchUnpublishedResearch = async () => {
      setLoading(true);
      try {
        const researchRef = collection(db, "researches");
        const q = query(researchRef, where("status", "==", "unpublished"));
        const snapshot = await getDocs(q);

        const researchData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = { id: doc.id, ...doc.data() };

            if (data.file) {
              const { data: urlData } = supabase.storage
                .from("pdfs")
                .getPublicUrl(data.file);

              data.pdfUrl = urlData?.publicUrl || null;
            } else {
              data.pdfUrl = null;
            }

            return data;
          })
        );

        setResearchRequests(researchData);
      } catch (error) {
        console.error("Error fetching research requests:", error);
      }
      setLoading(false);
    };

    fetchUnpublishedResearch();
  }, []);

  const handleRequest = async (id, action) => {
    const newStatus = action === "Accepted" ? "published" : "rejected";

    try {
      const researchDoc = doc(db, "researches", id);
      await updateDoc(researchDoc, { status: newStatus });

      setResearchRequests(researchRequests.filter((req) => req.id !== id));
      openNotificationWithIcon(
        "success",
        `Research ${action.toLowerCase()} successfully!`
      );
    } catch (error) {
      console.error(`Error updating research:`, error);
      openNotificationWithIcon("error", "Unsuccessful action");
    }
  };

  return (
    <>
      {contextHolder}
      <Row gutter={[16, 16]} justify="center" style={{ padding: 16 }}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card
            title="Research Requests"
            style={{ width: "100%" }}
            loading={loading}
          >
            <List
              dataSource={researchRequests}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                    display: "flex",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Typography.Text strong>{item.title}</Typography.Text>
                    <br />
                    <Typography.Text type="secondary">
                      Researcher: {item.researchers}
                    </Typography.Text>
                    <br />
                    <Typography.Text type="secondary">
                      Adviser: {item.adviser}
                    </Typography.Text>
                    <br />
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View PDF
                    </a>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      justifyContent:
                        window.innerWidth > 768 ? "flex-end" : "flex-start",
                      width: "100%",
                    }}
                  >
                    <Button
                      key={`accept-${item.id}`}
                      type="primary"
                      onClick={() => handleRequest(item.id, "Accepted")}
                    >
                      Accept
                    </Button>
                    <Button
                      key={`reject-${item.id}`}
                      danger
                      onClick={() => handleRequest(item.id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Admin;
