import React from "react";
import { Form, Input, message } from "antd";
import "./securitysettings.scss";
import useAuth from "../../../hooks/useAuth";
import UpdatePersonalPasswordValidationSchema from "../../../validation/User/UpdatePersonalPasswordValidationSchema";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useState } from "react";
import { useEffect } from "react";
import ApiConstants from "../../../constants/ApiConstants";
import useLogout from "../../../hooks/useLogout";

const SecuritySettings = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const userObject = auth?.userObject;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState(" ");
  const [isPasswordsDuplicated, setIsPasswordsDuplicated] = useState(false);
  const [updatePasswordForm] = Form.useForm();
  const logout = useLogout();

  const yupSync = {
    async validator({ field }, value) {
      await UpdatePersonalPasswordValidationSchema().validateSyncAt(field, {
        [field]: value,
      });
    },
  };

  const handleUpdatePasswordFormSubmission = (e) => {
    if (currentPassword === newPassword) {
      setIsPasswordsDuplicated(true);
      return false;
    }

    const updatePasswordRequest = {
      id: userObject.id,
      password: e.password,
      newPassword: e.newPassword,
    };

    const updateUserPassword = async () => {
      try {
        const response = await axiosPrivate.put(
          ApiConstants.UPDATE_PERSONAL_PASSWORD,
          JSON.stringify(updatePasswordRequest)
        );
        console.log(response);
        if (response?.status === 200) {
          message.success(
            "Your password updated successfully, you will be forwarded to login again."
          );
          setTimeout(() => {
            logout();
          }, 3500);
        }
      } catch (e) {
        console.error(typeof e.response.data?.errors);
        if (e.response.data?.errors) {
          const errorsObject = e.response.data?.errors;
          const keys = Object.keys(e.response.data?.errors);
          keys.forEach((key, index) => {
            message.error(errorsObject[key]);
          });
        } else {
          message.error("Server or unexpected error :(");
        }
      }
    };

    updateUserPassword();
  };

  const handlePasswordChange = (e) => {
    if (e.target.id === "password") {
      setCurrentPassword(e.target.value);
    } else if (e.target.id === "newPassword") {
      setNewPassword(e.target.value);
    }
  };

  useEffect(() => {
    if (currentPassword !== newPassword) {
      setIsPasswordsDuplicated(false);
    }
    if (currentPassword === newPassword) {
      setIsPasswordsDuplicated(true);
    }
  }, [currentPassword, newPassword]);

  return (
    <>
      <div
        className={
          localStorage.getItem("darkmode") === "true"
            ? "security-settings-page-wrapper dark"
            : localStorage.getItem("lightmode") === "true"
            ? "security-settings-page-wrapper light"
            : "security-settings-page-wrapper dark"
        }
      >
        <h1>Security settings</h1>
        <Form
          form={updatePasswordForm}
          onFinish={handleUpdatePasswordFormSubmission}
        >
          <div className="information-security-wrapper">
            <h3>Profile</h3>
            <p>Don't share this information with anyone !!</p>
          </div>

          <div className="password-wrapper">
            <div className="write-password-wrapper">
              <p>Current Password:</p>
              <Form.Item rules={[yupSync]} name="password">
                <Input.Password onChange={(e) => handlePasswordChange(e)} />
              </Form.Item>
            </div>
            <div className="new-password-wrapper">
              <p>New Password:</p>
              <Form.Item rules={[yupSync]} name="newPassword">
                <Input.Password onChange={(e) => handlePasswordChange(e)} />
              </Form.Item>
            </div>
          </div>
          {isPasswordsDuplicated && (
            <div className="error-message-both">
              <p>New password and current password can not be the same !</p>
            </div>
          )}

          <div className="email-wrapper">
            <p>Your Email:</p>
            <p>
              Currently you are not able to change your email, system will add
              this feature soon.
            </p>
            <input type="email" value={userObject?.email} disabled />
          </div>

          <div className="save-cancel-wrapper">
            <button type="submit">Save</button>
            <button>Cancel</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SecuritySettings;
