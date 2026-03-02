import { Navigate, Outlet } from 'react-router';
import { isTokenValid } from '../lib/tokenUtils';

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  if (!isTokenValid(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
