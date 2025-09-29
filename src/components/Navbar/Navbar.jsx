import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <button className="navbtn">SKINSTRIC</button>
        </Link>
        <h5>[ INTRO ]</h5>
      </div>
      <div className="navbar-right">
        <button className="btn-right">ENTER CODE</button>
      </div>
    </div>
  );
};

export default Navbar;
