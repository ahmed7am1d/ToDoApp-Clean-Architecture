import React from "react";
import Navbar from "../../components/Layout/Navbar";
import { Outlet } from "react-router-dom";
import { Col } from "antd";
import "./home.scss";
import useSideNavBarToggle from "../../hooks/useSideNavBarToggle";
import { TaskPrioritiesProvider } from "../../context/TaskPrioritiesProvider";
import { TaskProgressesProvider } from "../../context/TaskProgressesProvider";
const Home = () => {
  const { collapseButtonClicked } = useSideNavBarToggle({});
  const mainClass = !collapseButtonClicked
    ? "main-content-wrapper main-content-ml-200"
    : "main-content-wrapper main-content-ml-20";
  return (
    <>
      <TaskProgressesProvider>
        <TaskPrioritiesProvider>
          <Navbar />
          <main className={mainClass}>
            <Outlet className="main-content" />
          </main>
          {/* footer */}
        </TaskPrioritiesProvider>
      </TaskProgressesProvider>
    </>
  );
};
export default Home;
