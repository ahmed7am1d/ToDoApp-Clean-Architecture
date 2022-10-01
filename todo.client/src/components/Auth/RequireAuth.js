import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import React from 'react'

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();
  return (

    auth?.user 
    // we used from location and replace so we want to save the previous location of the visited page by user so he is able to go back to it
    ? <Outlet/> : <Navigate to="/login" state={{from:location}} replace/>
  );
}

export default RequireAuth