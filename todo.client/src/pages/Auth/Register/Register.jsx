import React from "react";
import { Col, Row, message } from "antd";
import { ContactsOutlined, MailOutlined } from "@ant-design/icons";
import "./register.scss";
import ToDoPicture from "../../../assets/images/Todo-list.svg";
import ToDoPictureLight from "../../../assets/images/ToDoLight.svg";
import { useState } from "react";
import ShowHidePasswordIcon from "../../../components/Auth/ShowHidePasswordIcon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RegisterValidationSchema from "../../../validation/Auth/RegisterValidationSchema";
import axios from "../../../api/ToDoAPI";
import ApiConstants from "../../../constants/ApiConstants";
import { Link } from "react-router-dom";

const Register = () => {
  const [isShowPasswordClicked, setIsShowPasswordClicked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameInputError, setFirstNameInputError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [lastNameInputError, setLastNameInputError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [emailInputError, setEmailInputError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [passwordInputError, setPasswordInputError] = useState({
    isError: false,
    errorMessage: "",
  });

  const clearInputFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const handleInputChange = (e) => {
    const { className, value } = e.target;
    switch (className) {
      case "firstname":
        setFirstName(value);
        break;
      case "lastname":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterValidationSchema()),
  });

  const handleRegisterSubmit = async (e) => {
    try {
      const response = await axios.post(
        ApiConstants.REGISTER_ENDPOINT,
        JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Password: password,
          PhoneNumber: "123456789",
        }),
        {
          headers: ApiConstants.CONTENT_TYPE_POST_REQUEST,
        }
      );
      message.success(
        "You are registered successfully, Please Login to access your to do list :)"
      );
      clearInputFields();
    } catch (error) {
      if (error?.response) {
        message.error("No server response, please try again later");
      } else {
        error.response.data.errors
          ? Object.keys(error.response.data.errors).forEach((key, index) => {
              key === "FirstName" &&
                setFirstNameInputError({
                  isError: true,
                  errorMessage: error.response.data.errors[key][0],
                });
              key === "LastName" &&
                setLastNameInputError({
                  isError: true,
                  errorMessage: error.response.data.errors[key][0],
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
      <div
        className={
          localStorage.getItem("darkmode") === "true"
            ? "register-page-wrapper dark"
            : localStorage.getItem("lightmode") === "true"
            ? "register-page-wrapper light"
            : "register-page-wrapper dark"
        }
      >
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
                  Already A Member? <Link to="/auth/login">Log in</Link>
                </p>
              </div>

              <form
                className="login-form-inputs-wrapper"
                onSubmit={handleSubmit(handleRegisterSubmit)}
              >
                <div className="first-last-name-wrapper">
                  <div className="first-name-wrapper">
                    <span>
                      <b className="required-field">*</b> First Name:
                    </span>
                    <input
                      {...register("firstName")}
                      type="text"
                      className="firstname"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <ContactsOutlined />
                    {firstNameInputError.isError && (
                      <span className="validation-error-input">
                        {firstNameInputError.errorMessage}
                      </span>
                    )}
                    {errors.firstName && (
                      <span className="validation-error-input">
                        {errors.firstName?.message}
                      </span>
                    )}
                  </div>
                  <div className="last-name-wrapper">
                    <span>
                      <b className="required-field">*</b> Last Name:
                    </span>
                    <input
                      {...register("lastName")}
                      type="text"
                      className="lastname"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <ContactsOutlined />
                    {lastNameInputError.isError && (
                      <span className="validation-error-input">
                        {lastNameInputError.errorMessage}
                      </span>
                    )}
                    {errors.lastName && (
                      <span className="validation-error-input">
                        {errors.lastName?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="email-wrapper">
                  <span>
                    <b className="required-field">*</b> Email:
                  </span>
                  <input
                    {...register("email")}
                    type="email"
                    className="email"
                    name="email"
                    value={email}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <MailOutlined />
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
                <div className="password-wrapper">
                  <span>
                    <b className="required-field">*</b> Password:
                  </span>
                  <input
                    {...register("password")}
                    type={isShowPasswordClicked ? "text" : "password"}
                    value={password}
                    className="password"
                    onChange={(e) => handleInputChange(e)}
                    name="password"
                  />

                  <ShowHidePasswordIcon
                    showPasswordState={{
                      isShowPasswordClicked,
                      setIsShowPasswordClicked,
                    }}
                  />
                  {passwordInputError.isError && (
                    <span className="validation-error-input">
                      {passwordInputError.errorMessage}
                    </span>
                  )}
                  {errors.password && (
                    <span className="validation-error-input">
                      {errors.password?.message}
                    </span>
                  )}
                </div>
                <div className="buttons-wrapper">
                  <input type="submit" />
                </div>
              </form>
            </div>
          </Col>
          <Col xs={24} sm={8} lg={12} className="image-column">
            <div className="image-wrapper-rg">
              <img
                src={
                  localStorage.getItem("darkmode") === "true"
                    ? ToDoPicture
                    : localStorage.getItem("lightmode") === "true"
                    ? ToDoPictureLight
                    : ToDoPicture
                }
                className="todo-image"
                alt="ToDo"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Register;
