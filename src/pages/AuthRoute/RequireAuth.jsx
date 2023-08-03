import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const auth = sessionStorage.get("name") ? sessionStorage.get("name") : null;
  const location = useLocation();

  return auth !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
