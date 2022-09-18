import React from "react";
import { Col, Row ,Form,Input} from "antd";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jwtToken, setJwtToken] = useState("");

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

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5133/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        PhoneNumber: "123456789",
      }),
    }).then(async (response) => {
      await response.json().then((data)=>{
        //console.log(data.token);
        localStorage.setItem("jwtToken", data.token);
      })
    });
  };
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

            <form
              className="login-form-inputs-wrapper"
              onSubmit={handleRegisterSubmit}
            >
              <div className="first-last-name-wrapper">
                <div className="first-name-wrapper">
                  <span><b className="required-field">*</b> First Name:</span>
                  <input
                    type="text"
                    className="firstname"
                    value={firstName}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <ContactsOutlined />
                </div>
                <div className="last-name-wrapper">
                  <span><b className="required-field">*</b> Last Name:</span>
                  <input
                    type="text"
                    className="lastname"
                    value={lastName}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <ContactsOutlined />
                </div>
              </div>
              <div className="email-wrapper">
                <span><b className="required-field">*</b> Email:</span>
                <input
                  type="email"
                  className="email"
                  value={email}
                  onChange={(e) => handleInputChange(e)}
                />
                <MailOutlined />
              </div>
              <div className="password-wrapper">
                <span><b className="required-field">*</b> Password:</span>
                <input
                  type={isShowPasswordClicked ? "text" : "password"}
                  value={password}
                  onChange={(e) => handleInputChange(e)}
                  className="password"
                />

                <ShowHidePasswordIcon
                  showPasswordState={{
                    isShowPasswordClicked,
                    setIsShowPasswordClicked,
                  }}
                />
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
