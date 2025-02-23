import { Navigate } from "react-router-dom";
import { auth } from "../../store/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import PropTypes from "prop-types";

const ProtectedAuth = ({ children }) => {
  const [user] = useAuthState(auth);
  return user ? <Navigate to="/" replace /> : children;
};

ProtectedAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedAuth;
