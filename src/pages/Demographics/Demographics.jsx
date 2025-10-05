import React from "react";
import "./Demographics.css";
import { Link } from "react-router-dom";
import back_btn from "../../assets/images/buttin-icon-shrunk (1).svg";
import right_btn from "../../assets/images/buttin-icon-shrunk.svg";
import outer_line from "../../assets/images/rect-outer-line.svg";

const Demographics = ({ data }) => {
  return (
    <div className="demo-page">
      <div className="sub-header">A.I ANALYSIS</div>
      <h2 className="demo-title">DEMOGRAPHICS</h2>
      <h5 className="demo-sub-head">PREDICTED RACE AND AGE</h5>
      <h5 className="demo-wrong">
        If A.I estimate is wrong, select the correct one.
      </h5>

      <div className="container-grid">
        <div className="left-grid">
          <div className="left-box">
            <p className="demo-para">Southeast Asian</p>
            <h4 className="demo-sub-title">RACE</h4>
          </div>
          <div className="left-box">
            <p className="demo-para">10-19</p>
            <h4 className="demo-sub-title">AGE</h4>
          </div>
          <div className="left-box">
            <p className="demo-para">Male</p>
            <h4 className="demo-sub-title">SEX</h4>
          </div>
        </div>
        <div className="center-grid">
          <h1 className="center-title">Southeast Asian</h1>
        </div>
        <div className="right-grid"></div>
      </div>

      <div className="summary-btn">
        <Link to="/">
          <button className="proceed-button">
            HOME
            <img className="btn-img" src={right_btn} alt="" />
          </button>
        </Link>
      </div>

      <div className="back-btn">
        <Link to="/">
          <button className="back-button">
            <img className="btn-img" src={back_btn} alt="" />
            BACK
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Demographics;
