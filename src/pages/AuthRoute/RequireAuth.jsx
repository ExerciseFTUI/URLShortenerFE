import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const auth = sessionStorage.getItem("name")
    ? sessionStorage.getItem("name")
    : null;
  const location = useLocation();

  if (auth === null) {
    sessionStorage.setItem(
      "error",
      "Want to discover the full potential of our platform? Log in now and let the fun begin!"
    );
  }

  return auth !== null ? (
    children
  ) : (
    <Navigate to="/account/login" state={{ from: location.pathname }} replace />
  );
};

export default RequireAuth;
