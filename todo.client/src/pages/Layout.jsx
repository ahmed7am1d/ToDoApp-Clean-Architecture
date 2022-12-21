import { Outlet } from "react-router-dom";
import React from "react";
import "../styles/mainlayout/main.scss";
import useDarkLightMode from "../hooks/useDarkLightMode";

const Layout = () => {
  const { darkMode, setDarkMode, lightMode, setLightMode } = useDarkLightMode();
  return (
    <main
      className={
        localStorage.getItem("darkmode") === "true"
          ? "App dark"
          : localStorage.getItem("lightmode") === 'true'
          ? "App light"
          : "App dark"
      }
    >
      {/* All the component will be rendered inside this layout thanks to Outlet */}
      <Outlet />
    </main>
  );
};

export default Layout;
