import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { SideBarNavProvider } from "./context/SideNavBarProvider";
import "./styles/ant-design/antd.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // i REMOVED THE STRICT MODE SO EACH COPONENT DOES NOT LOAD TWITC
  // <React.StrictMode>
    <BrowserRouter>
      <SideBarNavProvider>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </SideBarNavProvider>
    </BrowserRouter>
  // {/* </React.StrictMode> */}
);
