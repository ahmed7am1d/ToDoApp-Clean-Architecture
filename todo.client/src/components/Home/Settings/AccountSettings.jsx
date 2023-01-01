import React, { useState } from "react";
import { Form, message } from "antd";
import "./accountsettings.scss";
import useAuth from "../../../hooks/useAuth";
import emptyProfilePicture from "../../../assets/images/emptyProfilePicture.png";
import fileToBase64 from "../../../Utils/FileUtil";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import UpdatePersonalInfoValidationSchema from "../../../validation/User/UpdatePersonalInfoValidationSchema";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ApiConstants from "../../../constants/ApiConstants";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import { useEffect } from "react";

const AccountSettings = () => {
  const { auth, setAuth } = useAuth();
  const userObject = auth?.userObject;
  const axiosPrivate = useAxiosPrivate();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageBytes, setSelectedImageBytes] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);
  //Handle Image changing
  const imageChange = async (e) => {
    if (e.target.files[0]) {
      setImageRemoved(false);
      const base64ImageNotFormatted = await fileToBase64(e.target.files[0]);
      const base64ImageFormatted = base64ImageNotFormatted.slice(
        base64ImageNotFormatted.indexOf(",") + 1,
        base64ImageNotFormatted.length
      );
      setSelectedImageBytes(base64ImageFormatted);
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    setImageRemoved(true);
    setSelectedImage("");
  };


  //Handle saving new information
  const yupSync = {
    async validator({ field }, value) {
      await UpdatePersonalInfoValidationSchema().validateSyncAt(field, {
        [field]: value,
      });
    },
  };
  const [updatePersonalInfoForm] = Form.useForm();

  const handleSaveNewPersonalInfoSave = (e) => {
    let profilePictureBytesTemp = "";

    if (selectedImage === "" && imageRemoved) {
      profilePictureBytesTemp = "";
    } else if (
      selectedImage === "" &&
      !userObject.profilePictureBytes &&
      userObject.profilePictureBytes.length === 0
    ) {
      profilePictureBytesTemp = "";
    } else if (
      selectedImage === "" &&
      userObject.profilePictureBytes &&
      userObject.profilePictureBytes.length !== 0
    ) {
      profilePictureBytesTemp = userObject.profilePictureBytes;
    } else if (selectedImage && !imageRemoved) {
      profilePictureBytesTemp = selectedImageBytes;
    }
    const personalInfoToUpdate = {
      id: userObject.id,
      firstName: e.firstName,
      lastName: e.lastName,
      phoneNumber: e?.phoneNumber,
      profilePictureBytes: profilePictureBytesTemp,
    };
    const updatePersonalInfo = async () => {
      const controller = new AbortController();

      try {
        const response = await axiosPrivate.put(
          ApiConstants.UPDATE_PERSONAL_INFO,
          JSON.stringify(personalInfoToUpdate),
          {
            signal: controller.signal,
          }
        );
        if (response?.status === 200) {
          message.success("Information updated successfully.");
          setAuth((prev) => ({
            ...prev,
            userObject: {
              ...prev.userObject,
              profilePictureBytes: response?.data?.profilePictureBytes,
              firstName: response?.data?.firstName,
              phoneNumber: response?.data?.phoneNumber,
              lastName: response?.data?.lastName,
            },
          }));
        }
        //navigate to login or refresh the page
      } catch (err) {
        console.error(err);
      }
    };
    updatePersonalInfo();
  };



  return (
    <div
      className={
        localStorage.getItem("darkmode") === "true"
          ? "account-settings-page-wrapper dark"
          : localStorage.getItem("lightmode") === "true"
          ? "account-settings-page-wrapper light"
          : "account-settings-page-wrapper dark"
      }
    >
      <h1>Account settings</h1>
      <Form
        form={updatePersonalInfoForm}
        onFinish={(e) => handleSaveNewPersonalInfoSave(e)}
      >
        <div className="information-security-wrapper">
          <h3>Profile</h3>
          <p>
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div className="profile-picture-wrapper">
          <div className="image-wrapper">
            <img
              src={
                selectedImage !== ""
                  ? URL.createObjectURL(selectedImage)
                  : userObject?.profilePictureBytes && !imageRemoved
                  ? "data:image/jpeg;base64," + userObject?.profilePictureBytes
                  : emptyProfilePicture
              }
              alt="Profile pic"
            />
          </div>
          <div className="button-wrapper">
            <label
              htmlFor="profile-picture-upload"
              className="custom-file-upload"
            >
              Change
            </label>
            <Form.Item name="profilePicture" initialValue={selectedImage}>
              <input
                type="file"
                name="file-uploader"
                className="change-profilepic-button"
                accept="image/*"
                id="profile-picture-upload"
                onInput={(e) => imageChange(e)}
              />
            </Form.Item>
            <button
              className="remove-profilepic-button"
              onClick={(e) => removeImage(e)}
            >
              Remove
            </button>
          </div>
        </div>

        <div className="first-last-name-wrapper">
          <div className="firstname-wrapper">
            <p>First name:</p>
            <Form.Item
              rules={[yupSync]}
              name="firstName"
              initialValue={userObject?.firstName}
            >
              <input />
            </Form.Item>
          </div>
          <div className="lastname-wrapper">
            <p>Last name:</p>
            <Form.Item name="lastName" initialValue={userObject?.lastName}>
              <input />
            </Form.Item>
          </div>
        </div>

        <div className="about-me-wrapper">
          <p>A message to yourself:</p>
          <textarea />
          <p>A simple message to your self, treat yourself well !</p>
        </div>

        <div className="phoneNumber-wrapper">
          <p>Phone Number:</p>
          <Form.Item
            rules={[yupSync]}
            name="phoneNumber"
            initialValue={userObject.phoneNumber}
          >
            <PhoneInput
              dropdownStyle={{ color: "black" }}
              inputStyle={{ color: "black" }}
              placeholder="Enter Phone Number"
              country="cz"
            />
          </Form.Item>
        </div>

        <div className="save-cancel-wrapper">
          <button type="submit">Save</button>
          <button>Cancel</button>
        </div>
      </Form>
    </div>
  );
};

export default AccountSettings;
