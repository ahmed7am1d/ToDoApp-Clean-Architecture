import React from "react";
import "./appearancesettings.scss";
import DarkthemeThumbnail from "../../../assets/images/DarkRedUI.png";
import LightThemeThumbnail from "../../../assets/images/LightUI.png";
import useDarkLightMode from "../../../hooks/useDarkLightMode";
import { useState } from "react";
const AppearanceSettings = () => {
  const { darkMode, setDarkMode, lightMode, setLightMode } = useDarkLightMode();

  const handleChangingTheUITheme = (e) => {
    switch (e.target.name) {
      case "lightUI":
        //[0]- Check if the light mode is active (disable it)
        if (darkMode && localStorage.getItem("darkmode")) {
          setDarkMode(false);
          localStorage.setItem("darkmode", false);
        }
        //[1]- Set local storage for darkmode and context
        localStorage.setItem("lightmode", true);
        setLightMode(true);
        break;
      case "darkUI":
        //[0]- Check if the light mode is active (disable it)
        if (lightMode && localStorage.getItem("lightmode")) {
          setLightMode(false);
          localStorage.setItem("lightmode", false);
        }
        //[1]- Set local storage for darkmode and context
        localStorage.setItem("darkmode", true);
        setDarkMode(true);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div
        className={
          localStorage.getItem("darkmode") === "true"
            ? "appearance-settings-page-wrapper dark"
            : localStorage.getItem("lightmode") === "true"
            ? "appearance-settings-page-wrapper light"
            : "appearance-settings-page-wrapper dark"
        }
      >
        <div className="header">
          <h1>Appearance settings</h1>
          <p>Change how UI looks and feels in your browser.</p>
        </div>

        <div className="themes-wrapper">
          <div
            className={localStorage.getItem('darkmode') === "true"  ? "darkred-wrapper active" : "darkred-wrapper"}
            name="darkUI"
            onClick={(e) => handleChangingTheUITheme(e)}
          >
            <div className="image-wrapper-as">
              <img
                alt="darkred thumbnail"
                name="darkUI"
                src={DarkthemeThumbnail}
              />
            </div>
            <div className="theme-title">
              <p>Dark red.</p>
            </div>
          </div>
          <div
            className={
              localStorage.getItem("lightmode") === "true"
                ? "lightblue-wrapper active"
                : "lightblue-wrapper"
            }
            name="lightUI"
            onClick={(e) => handleChangingTheUITheme(e)}
          >
            <div className="image-wrapper-as">
              <img
                alt="Lightblue thumbnail"
                name="lightUI"
                src={LightThemeThumbnail}
              />
            </div>
            <div className="theme-title">
              <p>Light blue.</p>
            </div>
          </div>
        </div>

 
      </div>
    </>
  );
};

export default AppearanceSettings;
