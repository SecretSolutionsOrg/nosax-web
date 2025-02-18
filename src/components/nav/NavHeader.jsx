import { HomeTwoTone, FileTextTwoTone, BookTwoTone } from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const NavHeader = () => {
  const location = useLocation();

  return (
    <Menu selectedKeys={[location.pathname]} mode="horizontal">
      <Menu.Item key="/" icon={<HomeTwoTone />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/research" icon={<FileTextTwoTone />}>
        <Link to="/research">Research</Link>
      </Menu.Item>
      <Menu.Item key="/library" icon={<BookTwoTone />}>
        <Link to="/library">Library</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavHeader;
