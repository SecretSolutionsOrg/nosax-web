import { Card, Row, Col } from "antd";
import PDFViewer from "../components/PDFViewer";

const Research = () => {
  const data = [
    { key: "Research", value: "This is the first card." },
    { key: "Researcher", value: "This is the second card." },
    { key: "Adviser", value: "This is the third card." },
    { key: "Grade and Section", value: "This is the fourth card." },
    { key: "Category", value: "This is the fifth card." },
  ];

  return (
    <Card title="Research Title Here" style={{ width: "100%" }}>
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
