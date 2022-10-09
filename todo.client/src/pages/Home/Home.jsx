import React from "react";
import Navbar from "../../components/Layout/Navbar";
import { Outlet } from "react-router-dom";
import {Col} from "antd";
import "./home.scss"
import useSideNavBarToggle from "../../hooks/useSideNavBarToggle";
const Home = () => {
  const {collapseButtonClicked} = useSideNavBarToggle({});
  const mainClass = !collapseButtonClicked ? "main-content-wrapper main-content-ml-200" : "main-content-wrapper main-content-ml-20"
  return (
    <>
    
      <Navbar />
      <main className={mainClass}>
        <Outlet className="main-content"/>
      </main>
      {/* footer */}
    </>
  );
};
export default Home;
