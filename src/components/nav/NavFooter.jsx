import { Layout } from "antd";

const { Footer } = Layout;

const NavFooter = () => {
  return (
    <Footer
      style={{ textAlign: "center", background: "#f0f2f5", padding: "20px" }}
    >
      © {new Date().getFullYear()} Nosax. All rights reserved.
    </Footer>
  );
};

export default NavFooter;
