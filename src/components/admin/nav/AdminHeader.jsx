import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Typography } from "antd";
import logo from "../../../assets/logo.png";
import gnhs from "../../../assets/gnhs.png";

const { Link } = Typography;

const AdminHeader = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        background: "#fff",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={logo} alt="Logo" style={{ height: "40px" }} />
        <div className="logout-link">
          <Link
            onClick={handleLogout}
            style={{ cursor: "pointer", color: "#d9534f", fontWeight: "bold" }}
          >
            Logout
          </Link>
        </div>
      </div>

      <img src={gnhs} alt="GNHS" style={{ height: "40px" }} />

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .logout-link {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AdminHeader;
