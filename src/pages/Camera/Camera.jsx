import React, { useEffect, useRef } from "react";
import "./Camera.css";
import { Link } from "react-router-dom";
import back_btn from "../../assets/images/buttin-icon-shrunk (1).svg";
import take_pic from "../../assets/images/image 225 (Traced).svg";

const Camera = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied", err);
      }
    };
    enableStream();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="camera-page">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-feed"
      />

      <div className="camera-overlay">
        <h3 className="overlay-title">
          TO GET BETTER RESULTS MAKE SURE TO HAVE
        </h3>
        <p className="overlay-tips">
          NEUTRAL EXPRESSION <br /> FRONTAL POSE <br />
          ADEQUATE LIGHTING
        </p>
      </div>

      <div className="capture-wrapper">
        <span className="capture-text">TAKE PICTURE</span>
        <button className="capture-btn">
          <img className="capture-icon" src={take_pic} alt="" />
        </button>
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

export default Camera;
