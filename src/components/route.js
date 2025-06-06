import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "@aws-amplify/auth"; // ✅ moved to top

const DEV_MODE = true; // toggle for testing

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (DEV_MODE) {
        setAuthenticated(true);
      } else {
        try {
          await getCurrentUser(); // only runs if DEV_MODE is false
          setAuthenticated(true);
        } catch {
          setAuthenticated(false);
        }
      }
    };

    checkAuth();
  }, []);

  if (authenticated === null) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
