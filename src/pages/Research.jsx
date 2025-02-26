import { useEffect, useState } from "react";
import { Card, Row, Col, Spin, notification } from "antd";
import { useLocation } from "react-router-dom";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../store/firebase-config";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import PDFViewer from "../components/PDFViewer";
import { supabase } from "../store/superbaseClient";

const Research = () => {
  const [api, contextHolder] = notification.useNotification();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const researchId = queryParams.get("id");

  const [research, setResearch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const currentUser = auth.currentUser;

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  useEffect(() => {
    const fetchResearch = async () => {
      if (!researchId) return;

      const researchRef = doc(db, "researches", researchId);
      const researchSnap = await getDoc(researchRef);

      if (researchSnap.exists()) {
        let researchData = researchSnap.data();

        if (researchData.file) {
          const { data: urlData } = supabase.storage
            .from("pdfs")
            .getPublicUrl(researchData.file);

          researchData = {
            ...researchData,
            pdfUrl: urlData?.publicUrl || null,
          };
        }

        setResearch(researchData);
      }

      if (currentUser) {
        const libraryRef = doc(
          db,
          "library",
          `${currentUser.uid}_${researchId}`
        );
        const librarySnap = await getDoc(libraryRef);
        setIsSaved(librarySnap.exists());
      }

      setLoading(false);
    };

    fetchResearch();
  }, [researchId, currentUser]);

  const handleToggleLibrary = async () => {
    if (!currentUser) return;

    const libraryRef = doc(db, "library", `${currentUser.uid}_${researchId}`);

    if (isSaved) {
      await deleteDoc(libraryRef);
      setIsSaved(false);
      openNotificationWithIcon("success", "Removed to your library");
    } else {
      await setDoc(libraryRef, {
        userId: currentUser.uid,
        researchId: researchId,
      });
      setIsSaved(true);
      openNotificationWithIcon("success", "Added to your library");
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!research) {
    return (
      <Card title="Research Not Found" style={{ width: "100%" }}>
        <p>No research details available.</p>
      </Card>
    );
  }

  const data = [
    { key: "Researcher", value: research.researchers ?? "Unknown Researcher" },
    { key: "Adviser", value: research.adviser ?? "Unknown Adviser" },
    {
      key: "Grade and Section",
      value: research.grade_section ?? "Unknown Grade and Section",
    },
    { key: "Category", value: research.category ?? "Unknown Category" },
  ];

  return (
    <>
      {contextHolder}
      <Card
        title={
          <>
            {isSaved ? (
              <HeartFilled
                style={{ color: "red", marginRight: 8, cursor: "pointer" }}
                onClick={handleToggleLibrary}
              />
            ) : (
              <HeartOutlined
                style={{ marginRight: 8, cursor: "pointer" }}
                onClick={handleToggleLibrary}
              />
            )}
            {research.title}
          </>
        }
        style={{ width: "100%" }}
      >
        <Row gutter={[16, 16]}>
          {data.map((item) => (
            <Col key={item.key} xs={24} sm={12}>
              <Card title={item.key} size="small">
                <p>{item.value}</p>
              </Card>
            </Col>
          ))}
        </Row>

        <PDFViewer title={research.title} file={research.pdfUrl} />
      </Card>
    </>
  );
};

export default Research;
