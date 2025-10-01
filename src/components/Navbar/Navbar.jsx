import React from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
 let section = "INTRO"
 if (location.pathname === "/results" || location.pathname === "/demographics"){
  section = "ANALYSIS";
 }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <button className="navbtn">SKINSTRIC</button>
        </Link>
        <h5>[ {section} ]</h5>
      </div>
      <div className="navbar-right">
        <button className="btn-right">ENTER CODE</button>
      </div>
    </div>
  );
};

export default Navbar;
