import { Navigate } from "react-router-dom";
import { getToken } from "./auth";

export default function PrivateRoute({ children }) {
  const isAuthenticated = getToken();
  if (isAuthenticated) {
    return children;
  }
  return <Navigate to="/login" />;
}
