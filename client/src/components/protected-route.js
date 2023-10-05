import { useAuth } from "context/auth-context";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};
