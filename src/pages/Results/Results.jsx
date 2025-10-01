import React from "react";
import { Link } from "react-router-dom";
import back_btn from "../../assets/images/buttin-icon-shrunk (1).svg";
import right_btn from "../../assets/images/buttin-icon-shrunk.svg";
import "./Results.css";

const Results = () => {
  return (
    <div className="results-page">
      <div className="sub-header">A.I ANALYSIS</div>
      <h5 className="results-sub-header">A.I HAS ESTIMATED THE FOLLOWING.</h5>
      <h5 className="results-sub-header">
        FIX ESTIMATED INFORMATION IF NEEDED.
      </h5>
       <div className="summary-btn">
      <Link to="/demographics">
        <button className="proceed-button">
          GET SUMMARY
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

export default Results;
