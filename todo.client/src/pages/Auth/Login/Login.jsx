import "./login.scss";
import { useState } from "react";
import ToDoAPI from "../../../api/ToDoAPI";
import ApiConstants from "../../../constants/ApiConstants";
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
import LoginValidationSchema from "../../../validation/Auth/LoginValidationSchema";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home/overview";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleFormSubmission = async (data, e) => {
    e.preventDefault();
    try {
      const response = await ToDoAPI.post(
        ApiConstants.LOGIN_ENDPOINT,
        JSON.stringify({
          Email: email,
          Password: password,
        }),
        {
          headers: ApiConstants.CONTENT_TYPE_POST_REQUEST,
          withCredentials: true,
        }
      );
      const userObject = response?.data;
      const accessToken = response?.data?.token;
      setAuth({ userObject, accessToken });
      navigate(from, { replace: true });
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
  //persist
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <div
        className={
          localStorage.getItem("darkmode") === "true"
            ? "login-Page-Wrapper dark"
            : localStorage.getItem("lightmode") === "true"
            ? "login-Page-Wrapper light"
            : "login-Page-Wrapper dark"
        }
      >
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
            {/* Keep me signed in */}
            <div className="keepMeSigned-wrapper">
              <input
                type="checkbox"
                id="persist"
                onChange={togglePersist}
                checked={persist}
              />
              <label htmlFor="persist">Keep me signed in</label>
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
              <Link to="/auth/register"> Sign up using Email</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
