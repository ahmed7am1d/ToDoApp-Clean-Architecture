import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import {Spin,Space} from 'antd'
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);


    return () => isMounted = false;

  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${auth?.accessToken}`);
  }, [isLoading]);

  return (
    <>{!persist ?
       <Outlet /> 
       : isLoading
        ? <Space size="large" align="center" className="bigSpin-loader"> <Spin size="large" /></Space>
        : <Outlet />}</>
  );
};

export default PersistLogin;
