import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Row, Col } from "antd";
import {
  UserOutlined,
  LockOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import "./settings.scss";

const AccountSettings = () => {

  
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

  return (
    <>
      <Row className="settings-wrapper">
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
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
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
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
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
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
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
