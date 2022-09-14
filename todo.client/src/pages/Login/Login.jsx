import React from "react";
import { Col, Row } from "antd";
import "./login.scss";
import ToDoPicture from "../../assets/images/Todo-list.png";

const Login = () => {
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
                <input type="text" className="firstname" />
                <input type="text" className="lastname" />
              </div>
              <div className="email-wrapper">
                <input type="email" className="email" />
              </div>
              <div className="password-wrapper">
                <input type="password" className="password" />
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
