import { HomeTwoTone, EditTwoTone } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavHeader = () => {
  const [current, setCurrent] = useState("home");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<HomeTwoTone />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="research" icon={<EditTwoTone />}>
        <Link to="/research">Research</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavHeader;
