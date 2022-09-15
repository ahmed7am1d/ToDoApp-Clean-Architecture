import React from "react";
import { Col, Row } from "antd";
import {
  ContactsFilled,
  ContactsOutlined,
  MailOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import "./login.scss";
import ToDoPicture from "../../assets/images/Todo-list.png";
import { useState } from "react";
import ShowHidePasswordIcon from "../../components/Login/ShowHidePasswordIcon";

const Login = () => {
  const [isShowPasswordClicked, setIsShowPasswordClicked] = useState(false);
  const handleShowPassword = () => {};

  return (
    <>
      <h1 className="login-headerTitle">Be Productive, Be Successful</h1>
      <Row>
        <Col xs={24} sm={14} lg={12} className="login-column">
          <div className="login-wrapper">
            <div className="login-header-wrapper">
              <p>START FOR FREE - Be More Productive</p>
              <h1>
                Create new account<span>.</span>
              </h1>
              <p>
                Already A Member? <a href="https://google.com">Log in</a>
              </p>
            </div>

            <form className="login-form-inputs-wrapper">
              <div className="first-last-name-wrapper">
                <div className="first-name-wrapper">
                  <span>First Name:</span>
                  <input type="text" className="firstname" />
                  <ContactsOutlined />
                </div>
                <div className="last-name-wrapper">
                  <span>Last Name:</span>
                  <input type="text" className="lastname" />
                  <ContactsOutlined />
                </div>
              </div>
              <div className="email-wrapper">
                <span>Email:</span>
                <input type="email" className="email" />
                <MailOutlined />
              </div>
              <div className="password-wrapper">
                <span>Password:</span>
                <input
                  type={isShowPasswordClicked ? "text" : "password"}
                  className="password"
                />

                <ShowHidePasswordIcon
                  showPasswordState={{isShowPasswordClicked, setIsShowPasswordClicked}}
                />

                {/* <EyeOutlined/>
                <EyeInvisibleOutlined /> */}
              </div>
              <div className="buttons-wrapper">
                <input type="submit" />
              </div>
            </form>
          </div>
        </Col>
        <Col xs={24} sm={8} lg={12} className="image-column">
          <div className="image-wrapper">
            <img src={ToDoPicture} className="todo-image" alt="ToDo" />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Login;
