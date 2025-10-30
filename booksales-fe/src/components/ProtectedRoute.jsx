import { Navigate, useLocation } from "react-router-dom";
import { getToken, getUser } from "../_service/auth";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = getToken();
  const user = getUser();
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const ok = allowedRoles.includes(user.role);
    if (!ok) {
      // Jika role tidak cocok, arahkan ke dashboard admin
      return <Navigate to="/admin" replace />;
    }
  }

  return children;
}
