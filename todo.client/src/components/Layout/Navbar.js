import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileIcon from "../../assets/images/262883343_743681627026575_2615310581595321543_n.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faCalendarWeek,
  faGear,
  faSignOut,
  faLessThan,
  faGreaterThan,
} from "@fortawesome/free-solid-svg-icons";
import emptyProfilePicture from "../../assets/images/emptyProfilePicture.png";
import QuotesAPI from "../../api/RandomQuotesAPI";
import ApiConstants from "../../constants/ApiConstants";
import useSideNavBarToggle from "../../hooks/useSideNavBarToggle";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import useDarkLightMode from "../../hooks/useDarkLightMode";

import "./navbar.scss";

const Navbar = () => {
  const { darkMode, setDarkMode, lightMode, setLightMode } = useDarkLightMode();
  const [randomQuotes, setRandomQuotes] = useState([]);
  const { collapseButtonClicked, setCollapseButtonClicked } =
    useSideNavBarToggle({});
  const logOut = useLogout();
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const userObject = useAuth()?.auth?.userObject;
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const loadQuotes = async () => {
    try {
      const quotesAPIResponse = await QuotesAPI.get(
        ApiConstants.RANDOM_QUOTES_ENDPOINT
      );
      const selectedQoutes = quotesAPIResponse?.data.filter((quote, index) => {
        return quote.text.length < 50;
      });
      await setRandomQuotes(selectedQoutes);
    } catch {}
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const signOut = async () => {
    await logOut();
    navigate("/auth/login");
  };

  const CollapseNav = () => {
    setCollapseButtonClicked(!collapseButtonClicked);
  };

  useEffect(() => {
    function handleResize() {
      setWinWidth(window.innerWidth);
      if (window.innerWidth < 800) {
        setCollapseButtonClicked(true);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [collapseButtonClicked]);

  return (
    <aside
      className={
        !collapseButtonClicked
          ? localStorage.getItem("darkmode") ==='true'
            ? "aside-nav-full dark"
            : localStorage.getItem("lightmode") === 'true'
            ? "aside-nav-full light"
            : "aside-nav-full dark"
          : localStorage.getItem("darkmode") === 'true'
          ? "aside-nav-collapsed dark"
          : localStorage.getItem("lightmode") === 'true'
          ? "aside-nav-collapsed light"
          : "aside-nav-collapsed dark"
      }
    >
      {currentPath.includes("settings") && winWidth > 800 && (
        <div className="arrowWrapper-settingsPage" onClick={CollapseNav}>
          <FontAwesomeIcon
            icon={!collapseButtonClicked ? faLessThan : faGreaterThan}
            className="arrow-icon"
          />
        </div>
      )}
      {!currentPath.includes("settings") && winWidth > 800 && (
        <div className="arrowWrapper" onClick={CollapseNav}>
          <FontAwesomeIcon
            icon={!collapseButtonClicked ? faLessThan : faGreaterThan}
            className="arrow-icon"
          />
        </div>
      )}

      {/* profile picture & user name  */}
      <div className="user-wrapper">
        <div className="user-image-wrapper">
          <img
            src={
              userObject?.profilePictureBytes
                ? `data:image/*;base64,${userObject?.profilePictureBytes}`
                : emptyProfilePicture
            }
          />
        </div>
        {!collapseButtonClicked && (
          <>
            <p>{userObject?.firstName} </p>
            <q className="quote">
              {randomQuotes[Math.floor(Math.random() * 150 + 1)]?.text}
            </q>
          </>
        )}
      </div>
      {/* Navigation */}
      <div className="navigation-wrapper">
        <div className="tasks-navigations-wrapper">
          {!collapseButtonClicked && (
            <p className="navigation-category-paragraph">Tasks</p>
          )}
          <ul>
            <li>
              <Link to="/home/overview" className="navigation-anchor">
                <FontAwesomeIcon icon={faListCheck} />
                {!collapseButtonClicked && "Home"}
              </Link>
            </li>
            <li>
              <Link to="/home/upcoming" className="navigation-anchor">
                <FontAwesomeIcon icon={faCalendarWeek} />
                {!collapseButtonClicked && "Upcoming tasks"}
              </Link>
            </li>
            {/* <li>
              <Link to="/home/monthlytasks" className="navigation-anchor">
                <FontAwesomeIcon icon={faCalendar} />
                {!collapseButtonClicked && "Monthly Tasks"}
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="settings-navigation-wrapper">
          {!collapseButtonClicked && (
            <p className="navigation-category-paragraph">Settings</p>
          )}
          <ul>
            <li>
              <Link
                to="/home/settings/account-settings"
                className="navigation-anchor"
              >
                <FontAwesomeIcon icon={faGear} />
                {!collapseButtonClicked && "Settings"}
              </Link>
            </li>
          </ul>
        </div>
        <div className="logout-navigation-wrapper" onClick={signOut}>
          <ul>
            <li>
              <FontAwesomeIcon icon={faSignOut} />
              {!collapseButtonClicked && "Logout"}
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
