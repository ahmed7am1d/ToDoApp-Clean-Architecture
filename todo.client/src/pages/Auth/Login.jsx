import React from "react";
import "./login.scss";
import { useState } from "react";
import axios from "../../api/axios";
import ApiConstants from "../../constants/ApiConstants";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  GoogleSquareFilled,
  MailOutlined,
  FacebookFilled,
  TwitterCircleFilled,
  SecurityScanOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { useForm } from "react-hook-form";
import LoginValidationSchema from "../../validation/Auth/LoginValidationSchema";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [token, setJwtToken] = useState('');
  const [emailInputError, setEmailInputError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [passwordInputError, setPasswordInputError] = useState({
    isError: false,
    errorMessage: "",
  });

  //yup front-end validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidationSchema()),
  });

  //handle input chnages
  const handleInputChange = (e) => {
    const { className, value } = e.target;
    switch (className) {
      case "emailInput":
        setEmail(value);
        break;
      case "passwordInput":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  //handle submission of the form
  const handleFormSubmission = async (e) => {
    try {
      const response = await axios.post(
        ApiConstants.LOGIN_ENDPOINT,
        JSON.stringify({
          Email: email,
          Password: password,
        }),
        {
          headers: ApiConstants.CONTENT_TYPE_POST_REQUEST,
        }
      );

      //const roles = ;
      setUser(JSON.stringify(response.data));
      setJwtToken(JSON.stringify(response?.data?.token));
      setAuth({ user, password, token });
      console.log(auth);
      message.success("You are successfully logged in");
    } catch (error) {
      if (!error.response.data) {
        message.error("No server response, please try again later");
      } else {
        console.log(error);
        error.response.data.errors
          ? Object.keys(error.response.data.errors).forEach((key, index) => {
              key === "Authentication.InvalidCredentials" &&
                message.error({
                  content: error.response.data.errors[key][0],
                  className: "error-pop-up-message",
                });
              key === "Email" &&
                setEmailInputError({
                  isError: true,
                  errorMessage: error.response.data.errors[key][0],
                });
              key === "Password" &&
                setPasswordInputError({
                  isError: true,
                  errorMessage: error.response.data.errors[key][0],
                });
            })
          : message.error({
              content: error.response.data.title,
              className: "error-pop-up-message",
            });
      }
    }
  };

  return (
    <>
      <div className="login-form-wrapper">
        <form
          className="form-wrapper"
          onSubmit={handleSubmit(handleFormSubmission)}
        >
          <h2>Login</h2>
          <div className="email-input-wrapper">
            <input
              {...register("email")}
              type="email"
              placeholder="Type your email"
              className="emailInput"
              name="email"
              onChange={(e) => handleInputChange(e)}
            />
            <MailOutlined className="mail-icon" />
            {emailInputError.isError && (
              <span className="validation-error-input">
                {emailInputError.errorMessage}
              </span>
            )}
            {errors.email && (
              <span className="validation-error-input">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="password-input-wrapper">
            <input
              {...register("password")}
              type="password"
              placeholder="Type your password"
              name="password"
              className="passwordInput"
              onChange={(e) => handleInputChange(e)}
            />
            <SecurityScanOutlined />
            {passwordInputError.isError && (
              <span className="validation-error-input">
                {password.errorMessage}
              </span>
            )}
            {errors.password && (
              <span className="validation-error-input">
                {errors.password?.message}
              </span>
            )}
          </div>
          <div className="forgot-password-wrapper">
            <a href="#">Forgot Password?</a>
          </div>
          <div className="login-button-wrapper">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
          <div className="signup-wrapper">
            <p>Or sign up using:</p>
            <div className="sign-up-icons-wrapper">
              <GoogleSquareFilled className="google-icon" />
              <FacebookFilled className="facebook-icon" />
              <TwitterCircleFilled className="twitter-icon" />
            </div>
          </div>

          <div className="sign-up-email-wrapper">
            <p>Don't have an account?</p>
            <a href="/register"> Sign up using Email</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
