import { Avatar } from "@material-ui/core";
import {
  ArrowDropDown,
  Notifications,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logoutStart } from "../../Aurhcontext/AuthAction";
import { AuthContext } from "../../Aurhcontext/Authcontext";
import "./Header.scss";
function Header() {
  const [isScrooled, setisScrooled] = useState(false);
  const {dispatch}   =  useContext(AuthContext)
  window.onscroll = () => {
    setisScrooled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrooled ? "header scrolled" : "header"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />

          <Link to='/'   className="links">
            {" "}
            <span>Home Page</span>
          </Link>
          <Link to='/series'  className="links">
            {" "}
            <span>Series</span>
          </Link>
          <Link to="movies"  className="links">
            {" "}
            <span>Movies</span>
          </Link>
          <Link   className="links">
            {" "}
            <span>New and Populer </span>
          </Link>
          <Link  className="links">
            {" "}
            <span>MyList</span>
          </Link>
        </div>
        <div className="right">
          <SearchOutlined className="header__icons" />
          <span>KID</span>
          <Notifications className="header__icons" />
          <Avatar className="img" />
          <div className="header__profile">
            <ArrowDropDown className="header__icons" />
            <div className="option">
              <span>settings</span>
              <span onClick={(e)=>dispatch(logoutStart())} >logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
