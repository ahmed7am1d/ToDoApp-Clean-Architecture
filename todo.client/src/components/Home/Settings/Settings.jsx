import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Row, Col } from "antd";
import {
  UserOutlined,
  LockOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import "./settings.scss";
import { useEffect } from "react";
import useDarkLightMode from '../../../hooks/useDarkLightMode'
const AccountSettings = () => {
  const {darkMode,setDarkMode,lightMode,setLightMode} = useDarkLightMode();

  //Navigation on click of nav items
  const navigate = useNavigate();
  const handleNavigationClick = (e, navigateTo) => {
    switch (navigateTo) {
      case "AS":
        navigate(`/home/settings/account-settings`);
        break;

      case "SS":
        navigate(`/home/settings/security-settings`);
        break;

      case "APS":
        navigate("/home/settings/appearance-settings");
        break;

      default:
        break;
    }
  };
  useEffect(()=> {
    
  },[lightMode,darkMode])
  return (
    <>
      <Row
        className={
          localStorage.getItem("darkmode") === "true"
            ? "settings-wrapper dark"
            : localStorage.getItem("lightmode") === "true"
            ? "settings-wrapper light"
            : "settings-wrapper dark"
        }
      >
        {/* Navbar */}
        <Col span={5}>
          <nav>
            <div className="header-wrapper">
              <h3>Settings</h3>
            </div>

            <div
              className="account-settings-wrapper"
              onClick={(e) => handleNavigationClick(e, "AS")}
            >
              <div className="icon-wrapper">
                <UserOutlined />
              </div>
              <div className="title-description-wrapper">
                <h5>Account settings</h5>
                <p>
                  Here you can manage your public account information, such as
                  name and phone number.
                </p>
              </div>
            </div>

            <div
              className="security-settings-wrapper"
              onClick={(e) => handleNavigationClick(e, "SS")}
            >
              <div className="icon-wrapper">
                <LockOutlined />
              </div>
              <div className="title-description-wrapper">
                <h5>Security settings</h5>
                <p>
                  Here you can manage your security settings, such as password
                  and email address.
                </p>
              </div>
            </div>

            <div
              className="appearance-settings-wrapper"
              onClick={(e) => handleNavigationClick(e, "APS")}
            >
              <div className="icon-wrapper">
                <BgColorsOutlined />
              </div>
              <div className="title-description-wrapper">
                <h5>Appearance settings</h5>
                <p>
                  Choose your favorite UI, don't worry all settings will be
                  remembered.
                </p>
              </div>
            </div>
          </nav>
        </Col>
        {/* Outlet - Account settings - Security - Appearance  */}
        <Col span={19} className="account-settings-outlet">
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default AccountSettings;
