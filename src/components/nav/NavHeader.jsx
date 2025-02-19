import {
  HomeTwoTone,
  FileTextTwoTone,
  BookTwoTone,
  ProfileTwoTone,
  MenuOutlined,
} from "@ant-design/icons";
import { Menu, Drawer, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";

const NavHeader = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => setVisible(false);

  const menuItems = (
    <Menu
      selectedKeys={[location.pathname]}
      mode={isMobile ? "vertical" : "horizontal"}
      onClick={handleClose}
      style={
        !isMobile
          ? {
              flex: 1,
              justifyContent: "flex-end",
              display: "inline-flex",
              borderBottom: "none",
            }
          : {}
      }
    >
      <Menu.Item key="/" icon={<HomeTwoTone />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/upload-research" icon={<FileTextTwoTone />}>
        <Link to="/upload-research">Upload Research</Link>
      </Menu.Item>
      <Menu.Item key="/library" icon={<BookTwoTone />}>
        <Link to="/library">Library</Link>
      </Menu.Item>
      <Menu.Item key="/profile" icon={<ProfileTwoTone />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        background: "#fff",
      }}
    >
      <img src={logo} alt="Logo" style={{ height: "40px" }} />
      {isMobile ? (
        <div>
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setVisible(true)}
          />
          <Drawer
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <img src={logo} alt="Logo" style={{ height: "40px" }} />
              </div>
            }
            placement="left"
            closable={true}
            onClose={handleClose}
            open={visible}
          >
            {menuItems}
          </Drawer>
        </div>
      ) : (
        menuItems
      )}
    </div>
  );
};

export default NavHeader;
