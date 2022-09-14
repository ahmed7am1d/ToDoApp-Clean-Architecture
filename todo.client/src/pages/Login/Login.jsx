import React from "react";
import { Col, Row } from "antd";
import "./login.scss";

const Login = () => {
  return (
    <Row>
      <Col span={12}>
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
            <div class="first-last-name-wrapper">
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
              <input type="submit"/>
            </div>
          </form>
        </div>
      </Col>
      <Col span={12}></Col>
    </Row>
  );
};
export default Login;
