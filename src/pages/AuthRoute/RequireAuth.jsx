import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const auth = sessionStorage.getItem("name")
    ? sessionStorage.getItem("name")
    : null;
  const location = useLocation();

  return auth !== null ? (
    children
  ) : (
    <Navigate to="/account/login" state={{ from: location.pathname }} replace />
  );
};

export default RequireAuth;
