import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../store/firebase-config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";

const ProtectedAdmin = ({ children }) => {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (user) {
      const checkAdmin = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setIsAdmin(userDoc.exists() && userDoc.data().isAdmin);
      };
      checkAdmin();
    }
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;
  if (isAdmin === false) return <Navigate to="/" replace />;
  if (isAdmin === true) return children;

  return null;
};

ProtectedAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedAdmin;
