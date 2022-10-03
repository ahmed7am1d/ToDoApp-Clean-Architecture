import React from "react";
import Navbar from "../../components/Layout/Navbar";
import { Outlet } from "react-router-dom";
import "./home.scss"
const Home = () => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      {/* footer */}
    </>
  );
};
export default Home;
