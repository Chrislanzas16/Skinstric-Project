import React from "react";
import "./Home.css";
import left_btn from "../../assets/images/buttin-icon-shrunk (1).svg";
import right_btn from "../../assets/images/buttin-icon-shrunk.svg";
import left_arrow from "../../assets/images/Rectangle 2779.svg";
import right_arrow from "../../assets/images/Rectangle 2778.svg";

const Home = () => {
  return (
    <div className="home">
      <div className="home-grid">
        <div className="left-rail-container">
          <div className="diamond"></div>
          <button className="left-button">
            <img className="left-img" src={left_btn} alt="" />
            <span className="left-text"> Discover A.I</span>
          </button>
        </div>

        <h1 className="home-title">Sophisticated skincare</h1>

        <div className="right-rail-container">
          <div className="diamond"></div>
          <button className="right-button">
            <span className="right-text"> TAKE TEST</span>
            <img src={right_btn} alt="" />
          </button>
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
