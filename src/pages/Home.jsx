import { Card, Divider } from "antd";
import SeniorHigh from "../components/home/SeniorHigh";
import JuniorHigh from "../components/home/JuiorHigh";

const Home = () => {
  return (
    <div>
      <Card title="Senior High" style={{ width: "100%" }}>
        <SeniorHigh />
      </Card>
      <Divider />
      <Card title="Junior High" style={{ width: "100%" }}>
        <JuniorHigh />
      </Card>
    </div>
  );
};

export default Home;
