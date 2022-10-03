import React from "react";
import ProfileIcon from "../../assets/images/262883343_743681627026575_2615310581595321543_n.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faCalendarWeek,
  faCalendar,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./navbar.scss";
import QuotesAPI from "../../api/RandomQuotesAPI";
import ApiConstants from "../../constants/ApiConstants";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const [randomQuotes,setRandomQuotes] = useState([]);
  const loadQuotes = async () => {
    try {
      const quotesAPIResponse = await QuotesAPI.get(
        ApiConstants.RANDOM_QUOTES_ENDPOINT
      );
      //console.log(quotesAPIResponse?.data[( Math.floor((Math.random() * 1000) + 1))].text);
        const selectedQoutes = quotesAPIResponse?.data.filter((quote,index) => {
          return quote.text.length < 50;
        })
        console.log(selectedQoutes[0].text);
        await setRandomQuotes(selectedQoutes);
    } catch {}

  
  };
  useEffect(()=>{
    loadQuotes();
  },[])
  
  return (
    <aside>
      {/* profile picture & user name  */}
      <div className="user-wrapper">
        <div className="user-image-wrapper">
          <img src={ProfileIcon} />
        </div>
        <p>Al-Doori </p>
        <q className="quote">{randomQuotes[( Math.floor((Math.random() * 150) + 1))]?.text}</q>
      </div>
      {/* Navigation */}
      <div className="navigation-wrapper">
        <div className="tasks-navigations-wrapper">
          <p className="navigation-category-paragraph">Tasks</p>
          <ul>
            <li>
              <Link to="/home/dailytasks" className="navigation-anchor">
                <FontAwesomeIcon icon={faListCheck} />
                Daily Tasks
              </Link>
            </li>
            <li>
              <Link to="/home/weeklytasks" className="navigation-anchor">
                <FontAwesomeIcon icon={faCalendarWeek} />
                Weekly Tasks
              </Link>
            </li>
            <li>
              <Link to="/home/monthlytasks" className="navigation-anchor">
                <FontAwesomeIcon icon={faCalendar} />
                Monthly Tasks
              </Link>
            </li>
          </ul>
        </div>
        <div className="settings-navigation-wrapper">
          <p className="navigation-category-paragraph">Settings</p>
          <ul>
            <li>
              <Link to="/home/accountsettings" className="navigation-anchor">
                <FontAwesomeIcon icon={faGear} />
                Account Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
