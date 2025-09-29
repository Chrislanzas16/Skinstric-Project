import React, { useState } from "react";
import "./Home.css";
import left_btn from "../../assets/images/buttin-icon-shrunk (1).svg";
import right_btn from "../../assets/images/buttin-icon-shrunk.svg";
import { Link } from "react-router-dom";

const Home = () => {
  const [isHovered, setIsHovered] = useState(null);
  return (
    <div className="home">
      <div className="home-grid">
        <div className="left-rail-container">
          <div
            className={`diamonds ${isHovered === "right" ? "faded" : ""}`}
          ></div>
          <button
            className={`left-button ${
              isHovered === "left" ? "isHovered" : ""
            } ${isHovered === "right" ? "faded" : ""}`}
            onMouseEnter={() => setIsHovered("left")}
            onMouseLeave={() => setIsHovered(null)}
          >
            <img className="left-img" src={left_btn} alt="" />
            <span className="left-text"> Discover A.I</span>
          </button>
        </div>

        <h1
          className={`home-title
            ${isHovered === "left" ? "shift-right" : ""}
            ${isHovered === "right" ? "shift-left" : ""}`}
        >
          Sophisticated skincare
        </h1>

        <div className="right-rail-container">
          <div
            className={`diamonds ${isHovered === "left" ? "faded" : ""}`}
          ></div>
          <Link to="/login">
          <button
            className={`right-button ${
              isHovered === "right" ? "isHovered" : ""
            } ${isHovered === "left" ? "faded" : ""}`}
            onMouseEnter={() => setIsHovered("right")}
            onMouseLeave={() => setIsHovered(null)}
          >
            <span className="right-text"> TAKE TEST</span>
            <img className="right-img" src={right_btn} alt="" />
          </button>
          </Link>
        </div>

        <p className="home-para">
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
      </div>
    </div>
  );
};

export default Home;
