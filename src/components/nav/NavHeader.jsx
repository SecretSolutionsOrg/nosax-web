import {
  HomeTwoTone,
  FileTextTwoTone,
  BookTwoTone,
  ProfileTwoTone,
  MenuOutlined,
  SearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Drawer, Button, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { auth } from "../../store/firebase-config";
import { signOut } from "firebase/auth";

const NavHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => setVisible(false);

  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/search?query=${value}`);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = (
    <Menu
      selectedKeys={[location.pathname]}
      mode={isMobile ? "vertical" : "horizontal"}
      onClick={handleClose}
      style={
        !isMobile
          ? {
              flex: 1,
              justifyContent: "flex-start",
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
      <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
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
      {!isMobile && (
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onPressEnter={(e) => handleSearch(e.target.value)}
          style={{ width: "250px", marginLeft: "10px" }}
        />
      )}
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
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onPressEnter={(e) => handleSearch(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            {menuItems}
          </Drawer>
        </div>
      ) : (
        menuItems
      )}
      <img src={logo} alt="Logo" style={{ height: "40px" }} />
    </div>
  );
};

export default NavHeader;
