import React from "react";
import "./login.scss";
import { useState } from "react";
import axios from "../../api/axios";
import ApiConstants from "../../constants/ApiConstants";
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleSquareFilled,MailOutlined, FacebookFilled, TwitterCircleFilled,SecurityScanOutlined} from "@ant-design/icons";
const Login = () => {
  return (
    <>
      <div className="login-form-wrapper">
        <form className="form-wrapper">
          <h2>Login</h2>
          <div className="email-input-wrapper">
            <input type="email" placeholder="Type your email" />
            <MailOutlined />
          </div>
          <div className="password-input-wrapper">
            <input type="password" placeholder="Type your password" />
            <SecurityScanOutlined />
          </div>
          <div className="forgot-password-wrapper">
            <a href="#">Forgot Password?</a>
          </div>
          <div className="login-button-wrapper">
            <button type="submit" className="login-button">Login</button>
          </div>
          <div className="signup-wrapper">
            <p>Or sign up using:</p>
            <div className="sign-up-icons-wrapper">
              <GoogleSquareFilled className="google-icon"/>
              <FacebookFilled className="facebook-icon"/>
              <TwitterCircleFilled className="twitter-icon"/>
            </div>
          </div>

          <div className="sign-up-email-wrapper">
            <p>Don't have an account?</p>
            <a href="#"> Sign up using Email</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
