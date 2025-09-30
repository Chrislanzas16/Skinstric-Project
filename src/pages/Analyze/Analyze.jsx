import React from "react";
import { Link } from "react-router-dom";
import back_btn from "../../assets/images/buttin-icon-shrunk (1).svg";
import scan_img from "../../assets/images/shutter.svg";
import scan_black from "../../assets/images/sgutter-bg.svg";
import access_gallery from "../../assets/images/gallery.svg";
import "./Analyze.css";

const Analyze = () => {
  return (
    <div>
      <div className="sub-header">TO START ANALYSIS</div>

      <div className="analyze-page">
        <div className="container">
          <div className="cameras">
            <div className="spin-stack" aria-hidden="true">
              <div className="diamond d1"></div>
              <div className="diamond d2"></div>
              <div className="diamond d3"></div>
            </div>
            <button className="camera-access">
              <img className="shutter-blk" src={scan_black} alt="" />
              <img className="shutter" src={scan_img} alt="" />
            </button>
            <p className="img-para left">
              ALLOW A.I <br /> TO SCAN YOUR FACE
            </p>
          </div>

          <div className="cameras">
            <div className="spin-stack" aria-hidden="true">
              <div className="diamond d1"></div>
              <div className="diamond d2"></div>
              <div className="diamond d3"></div>
            </div>
            <button className="camera-access">
              <img className="gallery-img" src={access_gallery} alt="" />
            </button>
            <p className="img-para right">
              ALLOW A.I <br />
              ACCESS GALLERY
            </p>
          </div>
        </div>
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

export default Analyze;
