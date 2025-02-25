import { useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminHeader from "./nav/AdminHeader";
import NavFooter from "../nav/NavFooter";

const { Content } = Layout;

const AdminLayout = () => {
  const [padding, setPadding] = useState("50px");

  useEffect(() => {
    const handleResize = () => {
      setPadding(window.innerWidth < 768 ? "20px" : "50px");
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#E3F2FD" }}>
      {/* Navigation Bar */}
      <AdminHeader />

      {/* Page Content */}
      <Content style={{ padding }}>
        <Outlet />
      </Content>

      {/* Footer */}
      <NavFooter />
    </Layout>
  );
};

export default AdminLayout;
