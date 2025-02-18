import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import NavHeader from "./nav/NavHeader";
import NavFooter from "./nav/NavFooter";

const { Content } = Layout;

const Container = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <NavHeader />

      {/* Page Content */}
      <Content style={{ padding: "20px" }}>
        <Outlet />
      </Content>

      {/* Footer */}
      <NavFooter />
    </Layout>
  );
};

export default Container;
