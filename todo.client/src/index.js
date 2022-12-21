import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { SideBarNavProvider } from "./context/SideNavBarProvider";
import { DarkLightModeProvider } from "./context/DarkLightModeProvider";
import "./styles/ant-design/antd.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // i REMOVED THE STRICT MODE SO EACH COPONENT DOES NOT LOAD TWITC
  // <React.StrictMode>
  <BrowserRouter>
    <DarkLightModeProvider>
      <SideBarNavProvider>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </SideBarNavProvider>
    </DarkLightModeProvider>
  </BrowserRouter>
  // {/* </React.StrictMode> */}
);
