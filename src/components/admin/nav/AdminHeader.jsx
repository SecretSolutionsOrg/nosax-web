import logo from "../../../assets/logo.png";

const AdminHeader = () => {
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
      <img src={logo} alt="Logo" style={{ height: "40px" }} />
    </div>
  );
};

export default AdminHeader;
