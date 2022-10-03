import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth({});
  const location = useLocation();

  return auth?.userObject ? (
    // we used from location and replace so we want to save the previous location of the visited page by user so he is able to go back to it
    <Outlet />
  ) : (
    // from location => this saves the current location that user was in and in next location (/auth/login) can remember and access the previous location 
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
