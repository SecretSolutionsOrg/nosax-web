import { Card, Row, Col } from "antd";
import { useLocation } from "react-router-dom";
import PDFViewer from "../components/PDFViewer";

const Research = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const title = queryParams.get("title") || "Unknown Title";

  const data = [
    {
      key: "Researcher",
      value: queryParams.get("researcher") || "Unknown Researcher",
    },
    { key: "Adviser", value: queryParams.get("adviser") || "Unknown Adviser" },
    {
      key: "Grade and Section",
      value: queryParams.get("gradeSection") || "Unknown Grade and Section",
    },
    {
      key: "Category",
      value: queryParams.get("category") || "Unknown Category",
    },
  ];

  return (
    <Card title={title} style={{ width: "100%" }}>
      <Row gutter={[16, 16]}>
        {data.map((item) => (
          <Col key={item.key} xs={24} sm={12}>
            <Card title={item.key} size="small">
              <p>{item.value}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <PDFViewer title={data[0].value} file="/pdf/trial.pdf" />
    </Card>
  );
};

export default Research;
